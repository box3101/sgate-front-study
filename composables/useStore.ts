import { ref, computed } from 'vue'
import { useKpiApi } from './useKpiApi'
import { years, departments, members, kpiList as kpiData } from '~/server/data'
import { getVisibleMembers, getMemberTreeData, getDirectParent, getDescendants, getDeptDescendants } from '~/utils/treeUtils'

// ============================================
// 상태 (ref)
// ============================================
const kpiList = ref<any[]>([])
const loading = ref(false)
const selectedYear = ref('2024')
const selectedDept = ref('')  // 선택된 부서
const selectedMember = ref('')  // 선택된 부서원

// 로그인 사용자 (기본: 정유진)
const loginMemberId = ref('EMP005')

// 상태추가
const selectedKpi = ref<any>(null)

// ============================================
// Computed (파생 상태)
// ============================================

// 내 하위 팀만 필터링 (본부장+: 내 부서 아래 TEAM_만)
const filteredDepartments = computed(() => {
  const myDeptId = loginMember.value?.deptId
  if (!myDeptId) return []

  // 내 부서 + 내 부서의 모든 하위 부서
  const myDeptDescendants = getDeptDescendants(myDeptId)
  const myDeptScope = [myDeptId, ...myDeptDescendants.map(d => d.deptId)]

  // 그 중에서 TEAM_ 레벨만 표시
  return departments.filter(dept =>
    dept.deptId.startsWith('TEAM_') &&
    myDeptScope.includes(dept.deptId)
  )
})

// 로그인 사용자가 볼 수 있는 부서원 (트리용)
const visibleMembers = computed(() => {
  return getVisibleMembers(loginMemberId.value)
})

// 로그인 사용자 트리 데이터
const loginTreeData = computed(() => {
  return getMemberTreeData(loginMemberId.value)
})

// 로그인 사용자 정보
const loginMember = computed(() => {
  return members.find(m => m.memberId === loginMemberId.value)
})

// 로그인 사용자가 팀원인지 (안내 메시지용)
const isTeamMember = computed(() => {
  return loginMember.value?.position === '팀원'
})

// 로그인 사용자가 본부장급 이상인지 (부서 Select 표시)
const isDivisionHead = computed(() => {
  const headPositions = ['전무', '본부장']
  return headPositions.includes(loginMember.value?.position || '')
})

// 로그인 사용자가 파트장급 이상인지 (부서원 Select 표시)
const isPartLeaderOrAbove = computed(() => {
  const leaderPositions = ['전무', '본부장', '팀장', '파트장']
  return leaderPositions.includes(loginMember.value?.position || '')
})

// 부서 Select 표시 여부 (본부장+ 만 표시)
const canSelectDept = computed(() => isDivisionHead.value)

// 부서원 Select 표시 여부 (파트장+ 만 표시, 내 하위만)
const canSelectMember = computed(() => isPartLeaderOrAbove.value)

// 부서원 Select에 표시할 멤버 (내 하위만, 본인 제외)
const filteredMembers = computed(() => {
  // 내가 볼 수 있는 범위에서 본인과 상위자 제외 = 내 하위만
  const myDescendants = visibleMembers.value.filter(m =>
    m.memberId !== loginMemberId.value &&  // 본인 제외
    m.parentId !== null &&                  // 최상위 제외
    !getAncestorIds().includes(m.memberId)  // 상위자 제외
  )

  // 부서 선택 시 해당 부서 + 하위 파트 멤버만
  if (selectedDept.value) {
    const teamId = selectedDept.value
    const partIds = departments
      .filter(dept => dept.parentId === teamId)
      .map(dept => dept.deptId)
    const validDeptIds = [teamId, ...partIds]
    return myDescendants.filter(member => validDeptIds.includes(member.deptId))
  }

  return myDescendants
})

// 상위자 ID 목록 (헬퍼)
const getAncestorIds = () => {
  const parent = getDirectParent(loginMemberId.value)
  return parent ? [parent.memberId] : []
}

// ============================================
// API
// ============================================
const { fetchKpiList } = useKpiApi()

// ============================================
// 상태만 가져오기
// ============================================
export const useStoreState = () => {
  return {
    // Mock 데이터 (셀렉트 옵션용)
    years,
    departments,           // 전체 부서
    filteredDepartments,   // 팀만 (TEAM_)
    members,               // 전체 부서원
    filteredMembers,       // 선택된 팀의 부서원만
    // 로그인 관련
    loginMemberId,         // 로그인 사용자 ID
    loginMember,           // 로그인 사용자 정보
    visibleMembers,        // 로그인 사용자가 볼 수 있는 부서원
    loginTreeData,         // 로그인 사용자 트리 데이터
    isTeamMember,          // 팀원 여부
    isDivisionHead,        // 본부장급 이상 여부
    canSelectDept,         // 부서 Select 표시 여부
    canSelectMember,       // 부서원 Select 표시 여부
    // 상태
    kpiList,
    loading,
    selectedYear,
    selectedDept,
    selectedMember,
    selectedKpi
  }
}

// ============================================
// 메서드만 가져오기
// ============================================
export const useStoreActions = () => {

  // 검색 버튼 클릭 시 - Select Box 기준 필터링
  const getList = () => {
    loading.value = true

    let result = [...kpiData]

    // 1. 연도 필터
    if (selectedYear.value) {
      result = result.filter(kpi => kpi.year === selectedYear.value)
    }

    // 2. 팀원인 경우 → 본인 KPI만
    if (isTeamMember.value) {
      result = result.filter(kpi => kpi.memberId === loginMemberId.value)
    }
    // 3. 부서원 필터 (직접 선택된 경우)
    else if (selectedMember.value) {
      result = result.filter(kpi => kpi.memberId === selectedMember.value)
    }
    // 4. 부서 필터 (부서원 미선택, 부서만 선택된 경우)
    else if (selectedDept.value) {
      // 해당 팀 + 하위 파트의 모든 부서원 ID 수집
      const teamId = selectedDept.value
      const partIds = departments
        .filter(dept => dept.parentId === teamId)
        .map(dept => dept.deptId)
      const validDeptIds = [teamId, ...partIds]
      const memberIds = members
        .filter(m => validDeptIds.includes(m.deptId))
        .map(m => m.memberId)

      result = result.filter(kpi => memberIds.includes(kpi.memberId))
    }

    kpiList.value = result
    loading.value = false
  }

  // 트리 클릭 시 - 특정 부서원의 KPI 조회
  const getKpiByMember = (memberId: string) => {
    loading.value = true

    // 연도 필터는 유지하면서 해당 부서원의 KPI만 조회
    let result = [...kpiData]

    if (selectedYear.value) {
      result = result.filter(kpi => kpi.year === selectedYear.value)
    }

    result = result.filter(kpi => kpi.memberId === memberId)

    kpiList.value = result
    loading.value = false
  }

  return {
    getList,
    getKpiByMember
  }
}
