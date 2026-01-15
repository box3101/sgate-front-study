import { members, departments } from '~/server/data'

// ============================================
// 타입 정의
// ============================================
type Member = typeof members[0]
type Department = typeof departments[0]

// ============================================
// 부서원 트리 함수
// ============================================

/**
 * 직속 상위자 라인 조회 (재귀) - 전체 라인
 * 정유진 → [김전무, 최세운, 이찬용, 김현지]
 */
export const getAncestors = (memberId: string): Member[] => {
  const member = members.find(m => m.memberId === memberId)
  if (!member?.parentId) return []

  const parent = members.find(m => m.memberId === member.parentId)
  if (!parent) return []

  return [...getAncestors(parent.memberId), parent]
}

/**
 * 직속 상위자 1명만 조회
 * 정유진 → [김현지]
 */
export const getDirectParent = (memberId: string): Member | null => {
  const member = members.find(m => m.memberId === memberId)
  if (!member?.parentId) return null

  return members.find(m => m.memberId === member.parentId) || null
}

/**
 * 하위 직원 전체 조회 (재귀)
 * 이찬용 → [김현지, 정유진, 박백엔드]
 */
export const getDescendants = (memberId: string): Member[] => {
  const children = members.filter(m => m.parentId === memberId)
  return children.flatMap(child => [child, ...getDescendants(child.memberId)])
}

/**
 * 동료 조회 (같은 상사를 둔 사람들)
 * 김현지 → [박백엔드]
 */
export const getSiblings = (memberId: string): Member[] => {
  const member = members.find(m => m.memberId === memberId)
  if (!member?.parentId) return []

  return members.filter(m =>
    m.parentId === member.parentId && m.memberId !== memberId
  )
}

/**
 * 특정 부서원 기준 트리 데이터 생성
 */
export const getMemberTreeData = (selectedMemberId: string) => {
  const selectedMember = members.find(m => m.memberId === selectedMemberId)
  if (!selectedMember) return null

  return {
    ancestors: getAncestors(selectedMemberId),      // 상위 라인
    current: selectedMember,                         // 현재 선택된 사람
    siblings: getSiblings(selectedMemberId),         // 동료
    descendants: getDescendants(selectedMemberId),   // 하위 직원
  }
}

/**
 * 로그인 사용자가 볼 수 있는 모든 부서원 (전체 상위 라인)
 * (본인 + 전체 상위 라인 + 동료 + 하위 전체)
 */
export const getVisibleMembersAll = (loginMemberId: string): Member[] => {
  const data = getMemberTreeData(loginMemberId)
  if (!data) return []

  return [
    ...data.ancestors,
    data.current,
    ...data.siblings,
    ...data.descendants,
  ]
}

/**
 * 로그인 사용자가 볼 수 있는 부서원 (동료 제외)
 * 직속 상위자 1명 + 본인 + 내 하위만
 *
 * 핵심 규칙:
 * - 동료(같은 레벨)는 트리에 안 보임
 * - 내 하위 라인만 트리에 보임
 *
 * 예시 (김현지 파트장):
 * 이찬용 (팀장)  ← 직속 상위자
 *   └── 김현지 ★ (파트장) ← 본인
 *       └── 정유진 (팀원) ← 내 하위
 * (박백엔드 파트장은 안 보임 - 동료이므로)
 */
export const getVisibleMembers = (loginMemberId: string): Member[] => {
  const member = members.find(m => m.memberId === loginMemberId)
  if (!member) return []

  const result: Member[] = []

  // 1. 직속 상위자 1명
  const parent = getDirectParent(loginMemberId)
  if (parent) {
    result.push(parent)
  }

  // 2. 본인
  result.push(member)

  // 3. 내 하위 직원만 (동료는 제외!)
  const descendants = getDescendants(loginMemberId)
  result.push(...descendants)

  return result
}

// ============================================
// 부서 트리 함수
// ============================================

/**
 * 상위 부서 라인 조회
 */
export const getDeptAncestors = (deptId: string): Department[] => {
  const dept = departments.find(d => d.deptId === deptId)
  if (!dept?.parentId) return []

  const parent = departments.find(d => d.deptId === dept.parentId)
  if (!parent) return []

  return [...getDeptAncestors(parent.deptId), parent]
}

/**
 * 하위 부서 전체 조회
 */
export const getDeptDescendants = (deptId: string): Department[] => {
  const children = departments.filter(d => d.parentId === deptId)
  return children.flatMap(child => [child, ...getDeptDescendants(child.deptId)])
}

// ============================================
// 콘솔 테스트용 출력 함수
// ============================================

/**
 * 트리 시각화 출력
 */
export const printTree = (loginMemberId: string) => {
  const data = getMemberTreeData(loginMemberId)
  if (!data) {
    console.log('❌ 사용자를 찾을 수 없습니다.')
    return
  }

  const { ancestors, current, siblings, descendants } = data
  const allMembers = [...ancestors, current, ...siblings, ...descendants]

  console.log('\n' + '='.repeat(50))
  console.log(`🔐 로그인: ${current.memberNm} (${current.position})`)
  console.log('='.repeat(50))

  // 트리 출력 함수
  const printNode = (memberId: string, depth: number = 0, isLast: boolean = true) => {
    const member = allMembers.find(m => m.memberId === memberId)
    if (!member) return

    const indent = '    '.repeat(depth)
    const branch = isLast ? '└── ' : '├── '
    const marker = member.memberId === loginMemberId ? ' ★ (나)' : ''
    console.log(`${indent}${branch}${member.memberNm} (${member.position})${marker}`)

    // 자식 노드 출력
    const children = allMembers.filter(m => m.parentId === memberId)
    children.forEach((child, idx) => {
      printNode(child.memberId, depth + 1, idx === children.length - 1)
    })
  }

  // 최상위 노드부터 시작
  const rootMember = ancestors.length > 0 ? ancestors[0] : current
  const rootMarker = rootMember.memberId === loginMemberId ? ' ★ (나)' : ''
  console.log(`${rootMember.memberNm} (${rootMember.position})${rootMarker}`)

  const rootChildren = allMembers.filter(m => m.parentId === rootMember.memberId)
  rootChildren.forEach((child, idx) => {
    printNode(child.memberId, 0, idx === rootChildren.length - 1)
  })

  console.log('')
  console.log('📊 요약:')
  console.log(`   상위: ${ancestors.map(a => a.memberNm).join(' → ') || '없음'}`)
  console.log(`   동료: ${siblings.map(s => s.memberNm).join(', ') || '없음'}`)
  console.log(`   하위: ${descendants.map(d => d.memberNm).join(', ') || '없음'}`)
  console.log('')
}
