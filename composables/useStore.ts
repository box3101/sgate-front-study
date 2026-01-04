import { ref } from 'vue'
import { useKpiApi } from './useKpiApi'

// ============================================
// 상태 (ref)
// ============================================
const kpiList = ref<any[]>([])
const loading = ref(false)
const selectedYear = ref('2024')
const formKpiNm = ref('')
const formWeight = ref(0)
const formDeleteId = ref('')

// 부서 목록
const deptList = ref<any[]>([])
const selectedDept = ref('')

// 구성원 목록
const userList = ref<any[]>([])
const selectedUser = ref('')

// ============================================
// API
// ============================================
const { fetchKpiList, fetchDeptList, fetchUserList, saveKpi, deleteKpi } = useKpiApi()

// ============================================
// 상태만 가져오기
// ============================================
export const useStoreState = () => {
  return {
    kpiList,
    loading,
    selectedYear,
    formKpiNm,
    formWeight,
    formDeleteId,
    deptList,
    selectedDept,
    userList,
    selectedUser,
  }
}

// ============================================
// 메서드만 가져오기
// ============================================
export const useStoreActions = () => {

  // 조회
  const getList = async () => {
    loading.value = true
    const result = await fetchKpiList(selectedYear.value, selectedUser.value)
    kpiList.value = result.data
    loading.value = false
  }

  // 부서 목록 조회
  const getDeptList = async () => {
    loading.value = true
    const result = await fetchDeptList()
    deptList.value = result.data
    selectedDept.value = deptList.value[0]?.deptNm || ''
    loading.value = false
  }

  // 구성원 목록 조회
  const getUserList = async () => {
    loading.value = true
    const result = await fetchUserList(selectedDept.value)
    userList.value = result.data
    selectedUser.value = userList.value[0]?.userId || ''
    loading.value = false
  }

  // 저장
  const addKpi = async () => {
    await saveKpi({
      kpiNm: formKpiNm.value,
      weight: formWeight.value,
      year: selectedYear.value
    })
    formKpiNm.value = ''
    formWeight.value = 0
    await getList()
  }

  // 삭제
  const removeKpi = async () => {
    await deleteKpi(formDeleteId.value)
    formDeleteId.value = ''
    await getList()
  }

  return {
    getList,
    addKpi,
    removeKpi,
    getDeptList,
    getUserList,
  }
}
