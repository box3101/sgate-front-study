// 가상 DB (메모리)

// ============================================
// 연도
// ============================================
export const years = [
  { yearId: '2024', yearNm: '2024년' },
  { yearId: '2025', yearNm: '2025년' },
]

// ============================================
// 부서 (접두어로 레벨 구분)
// GRP_ : 그룹 (전무)
// DIV_ : 본부 (본부장)
// TEAM_: 팀 (팀장)
// PART_: 파트 (파트장)
// ============================================
export const departments = [
  { deptId: 'GRP_001', deptNm: 'UX그룹', parentId: null },
  { deptId: 'DIV_001', deptNm: 'UI/UX본부', parentId: 'GRP_001' },
  { deptId: 'TEAM_001', deptNm: '개발팀', parentId: 'DIV_001' },
  { deptId: 'TEAM_002', deptNm: '디자인팀', parentId: 'DIV_001' },
  { deptId: 'TEAM_003', deptNm: '기획팀', parentId: 'DIV_001' },
  { deptId: 'PART_001', deptNm: '프론트파트', parentId: 'TEAM_001' },
  { deptId: 'PART_002', deptNm: '백엔드파트', parentId: 'TEAM_001' },
]

// ============================================
// 부서원 (parentId: 상사, deptId: 소속부서)
// ============================================
export const members = [
  { memberId: 'EMP001', memberNm: '김전무', deptId: 'GRP_001', position: '전무', parentId: null },
  { memberId: 'EMP002', memberNm: '최세운', deptId: 'DIV_001', position: '본부장', parentId: 'EMP001' },
  { memberId: 'EMP003', memberNm: '이찬용', deptId: 'TEAM_001', position: '팀장', parentId: 'EMP002' },
  { memberId: 'EMP004', memberNm: '김현지', deptId: 'PART_001', position: '파트장', parentId: 'EMP003' },
  { memberId: 'EMP005', memberNm: '정유진', deptId: 'PART_001', position: '팀원', parentId: 'EMP004' },
  { memberId: 'EMP006', memberNm: '박백엔드', deptId: 'PART_002', position: '파트장', parentId: 'EMP003' },
  { memberId: 'EMP007', memberNm: '박디자인', deptId: 'TEAM_002', position: '팀장', parentId: 'EMP002' },
  { memberId: 'EMP008', memberNm: '이디자인', deptId: 'TEAM_002', position: '팀원', parentId: 'EMP007' },
  { memberId: 'EMP009', memberNm: '김기획', deptId: 'TEAM_003', position: '팀장', parentId: 'EMP002' },
  { memberId: 'EMP010', memberNm: '이기획', deptId: 'TEAM_003', position: '팀원', parentId: 'EMP009' },
]

// ============================================
// KPI (연도 + 부서원별)
// ============================================
export const kpiList = [
  // 이찬용 (팀장) - 개발팀
  { kpiId: 'KPI001', kpiNm: '프로젝트 완료율', weight: 30, score: 85, year: '2024', memberId: 'EMP003' },
  { kpiId: 'KPI002', kpiNm: '팀 생산성 향상', weight: 40, score: 90, year: '2024', memberId: 'EMP003' },
  // 김현지 (파트장) - 프론트파트
  { kpiId: 'KPI003', kpiNm: '코드 품질 점수', weight: 40, score: 92, year: '2024', memberId: 'EMP004' },
  { kpiId: 'KPI004', kpiNm: 'UI 컴포넌트 개발', weight: 30, score: 88, year: '2024', memberId: 'EMP004' },
  // 정유진 (팀원) - 프론트파트
  { kpiId: 'KPI005', kpiNm: '버그 수정률', weight: 30, score: 88, year: '2024', memberId: 'EMP005' },
  // 박백엔드 (파트장) - 백엔드파트
  { kpiId: 'KPI006', kpiNm: 'API 응답속도 개선', weight: 50, score: 95, year: '2024', memberId: 'EMP006' },
  // 박디자인 (팀장) - 디자인팀
  { kpiId: 'KPI007', kpiNm: '고객 만족도', weight: 50, score: 75, year: '2024', memberId: 'EMP007' },
  { kpiId: 'KPI008', kpiNm: 'UI/UX 개선', weight: 30, score: 82, year: '2024', memberId: 'EMP007' },
  // 이디자인 (팀원) - 디자인팀
  { kpiId: 'KPI009', kpiNm: '디자인 시안 완성', weight: 40, score: 90, year: '2024', memberId: 'EMP008' },
  // 김기획 (팀장) - 기획팀
  { kpiId: 'KPI010', kpiNm: '기획서 작성', weight: 50, score: 85, year: '2024', memberId: 'EMP009' },
  // 이기획 (팀원) - 기획팀
  { kpiId: 'KPI011', kpiNm: '시장 조사', weight: 40, score: 78, year: '2024', memberId: 'EMP010' },
  // 최세운 (본부장) - 2023년
  { kpiId: 'KPI012', kpiNm: '매출 목표', weight: 50, score: 80, year: '2023', memberId: 'EMP002' },
  { kpiId: 'KPI013', kpiNm: '조직 관리', weight: 30, score: 88, year: '2023', memberId: 'EMP002' },
  // 최세운 (본부장) - 2024년
  { kpiId: 'KPI014', kpiNm: '본부 성과', weight: 60, score: 92, year: '2024', memberId: 'EMP002' },
]
