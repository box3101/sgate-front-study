// ============================================
// 가상 DB (메모리)
// ============================================

// 부서 목록
export const deptList = [
  { deptId: 'DEPT001', deptNm: '개발팀' },
  { deptId: 'DEPT002', deptNm: '영업팀' },
  { deptId: 'DEPT003', deptNm: '인사팀' },
]

// 구성원 목록
export const userList = [
  // 개발팀
  { userId: 'USER001', userNm: '김개발', deptId: 'DEPT001' },
  { userId: 'USER002', userNm: '이프론트', deptId: 'DEPT001' },
  // 영업팀
  { userId: 'USER003', userNm: '박영업', deptId: 'DEPT002' },
  { userId: 'USER004', userNm: '최세일', deptId: 'DEPT002' },
  // 인사팀
  { userId: 'USER005', userNm: '정인사', deptId: 'DEPT003' },
  { userId: 'USER006', userNm: '강채용', deptId: 'DEPT003' },
]

// KPI 목록
export const kpiList = [
  // ============================================
  // 2024년
  // ============================================

  // 김개발 (개발팀) - 2024
  { kpiId: 'KPI001', kpiNm: '프로젝트 완료율', weight: 40, score: 85, userId: 'USER001', year: '2024' },
  { kpiId: 'KPI002', kpiNm: '코드 품질 점수', weight: 30, score: 92, userId: 'USER001', year: '2024' },
  { kpiId: 'KPI003', kpiNm: '버그 수정률', weight: 30, score: 88, userId: 'USER001', year: '2024' },

  // 이프론트 (개발팀) - 2024
  { kpiId: 'KPI004', kpiNm: 'UI 개발 완료율', weight: 50, score: 90, userId: 'USER002', year: '2024' },
  { kpiId: 'KPI005', kpiNm: '화면 성능 개선', weight: 50, score: 78, userId: 'USER002', year: '2024' },

  // 박영업 (영업팀) - 2024
  { kpiId: 'KPI006', kpiNm: '신규 계약 건수', weight: 40, score: 95, userId: 'USER003', year: '2024' },
  { kpiId: 'KPI007', kpiNm: '매출 목표 달성', weight: 60, score: 80, userId: 'USER003', year: '2024' },

  // 최세일 (영업팀) - 2024
  { kpiId: 'KPI008', kpiNm: '고객 미팅 횟수', weight: 50, score: 100, userId: 'USER004', year: '2024' },
  { kpiId: 'KPI009', kpiNm: '제안서 작성', weight: 50, score: 85, userId: 'USER004', year: '2024' },

  // 정인사 (인사팀) - 2024
  { kpiId: 'KPI010', kpiNm: '채용 완료율', weight: 50, score: 70, userId: 'USER005', year: '2024' },
  { kpiId: 'KPI011', kpiNm: '교육 진행 건수', weight: 50, score: 90, userId: 'USER005', year: '2024' },

  // 강채용 (인사팀) - 2024
  { kpiId: 'KPI012', kpiNm: '면접 진행 건수', weight: 60, score: 88, userId: 'USER006', year: '2024' },
  { kpiId: 'KPI013', kpiNm: '합격률', weight: 40, score: 75, userId: 'USER006', year: '2024' },

  // ============================================
  // 2023년
  // ============================================

  // 김개발 (개발팀) - 2023
  { kpiId: 'KPI014', kpiNm: '레거시 시스템 개선', weight: 50, score: 80, userId: 'USER001', year: '2023' },
  { kpiId: 'KPI015', kpiNm: '신규 기능 개발', weight: 50, score: 75, userId: 'USER001', year: '2023' },

  // 이프론트 (개발팀) - 2023
  { kpiId: 'KPI016', kpiNm: '반응형 웹 구현', weight: 60, score: 85, userId: 'USER002', year: '2023' },
  { kpiId: 'KPI017', kpiNm: '접근성 개선', weight: 40, score: 70, userId: 'USER002', year: '2023' },

  // 박영업 (영업팀) - 2023
  { kpiId: 'KPI018', kpiNm: '분기 매출 달성', weight: 70, score: 90, userId: 'USER003', year: '2023' },
  { kpiId: 'KPI019', kpiNm: '신규 거래처 확보', weight: 30, score: 85, userId: 'USER003', year: '2023' },

  // 최세일 (영업팀) - 2023
  { kpiId: 'KPI020', kpiNm: '기존 고객 유지율', weight: 50, score: 95, userId: 'USER004', year: '2023' },
  { kpiId: 'KPI021', kpiNm: '클레임 처리율', weight: 50, score: 88, userId: 'USER004', year: '2023' },

  // 정인사 (인사팀) - 2023
  { kpiId: 'KPI022', kpiNm: '퇴사율 감소', weight: 60, score: 65, userId: 'USER005', year: '2023' },
  { kpiId: 'KPI023', kpiNm: '복리후생 만족도', weight: 40, score: 80, userId: 'USER005', year: '2023' },

  // 강채용 (인사팀) - 2023
  { kpiId: 'KPI024', kpiNm: '채용 프로세스 개선', weight: 50, score: 72, userId: 'USER006', year: '2023' },
  { kpiId: 'KPI025', kpiNm: '온보딩 만족도', weight: 50, score: 82, userId: 'USER006', year: '2023' },
]
