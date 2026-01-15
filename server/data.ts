// 가상 DB (메모리)

// ============================================
// 연도
// ============================================
export const years = [
  { yearId: '2024', yearNm: '2024년' },
  { yearId: '2025', yearNm: '2025년' },
]

// ============================================
// 부서 (parentId로 상하관계 표현)
// ============================================
export const departments = [
  { deptId: 'DEPT001', deptNm: 'UX/UI본부', parentId: null },
  { deptId: 'DEPT002', deptNm: '개발팀', parentId: 'DEPT001' },
  { deptId: 'DEPT003', deptNm: '디자인팀', parentId: 'DEPT001' },
  { deptId: 'DEPT004', deptNm: '기획팀', parentId: 'DEPT001' },
]

// ============================================
// 부서원 (parentId: 상사, deptId: 소속부서)
// ============================================
export const members = [
  { memberId: 'EMP001', memberNm: '최세운', deptId: 'DEPT001', position: '본부장', parentId: null },
  { memberId: 'EMP002', memberNm: '이찬용', deptId: 'DEPT002', position: '팀장', parentId: 'EMP001' },
  { memberId: 'EMP003', memberNm: '김현지', deptId: 'DEPT002', position: '팀원', parentId: 'EMP002' },
  { memberId: 'EMP004', memberNm: '정유진', deptId: 'DEPT002', position: '팀원', parentId: 'EMP002' },
  { memberId: 'EMP005', memberNm: '박디자인', deptId: 'DEPT003', position: '팀장', parentId: 'EMP001' },
]

// ============================================
// KPI (연도 + 부서원별)
// ============================================
export const kpiList = [
  { kpiId: 'KPI001', kpiNm: '프로젝트 완료율', weight: 30, score: 85, year: '2024', memberId: 'EMP002' },
  { kpiId: 'KPI002', kpiNm: '코드 품질 점수', weight: 40, score: 92, year: '2024', memberId: 'EMP002' },
  { kpiId: 'KPI003', kpiNm: '버그 수정률', weight: 30, score: 88, year: '2024', memberId: 'EMP003' },
  { kpiId: 'KPI004', kpiNm: '고객 만족도', weight: 50, score: 75, year: '2023', memberId: 'EMP005' },
  { kpiId: 'KPI005', kpiNm: '매출 목표', weight: 50, score: 80, year: '2023', memberId: 'EMP001' },
]
