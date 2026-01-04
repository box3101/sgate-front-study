// ============================================
// 가상 DB (메모리)
// ============================================

// 부서 목록
export const deptList = [
  { deptId: 'DEPT001', deptNm: '개발팀' },
  { deptId: 'DEPT002', deptNm: '영업팀' },
  { deptId: 'DEPT003', deptNm: '인사팀' },
]

// 구성원 목록 (조직도 트리 구조)
export const userList = [
  // 경영진
  { userId: 'USER000', userNm: '김갑산', deptNm: '경영진', position: '사장', parentId: null },
  { userId: 'USER001', userNm: '홍덕기', deptNm: '경영진', position: '그룹장', parentId: 'USER000' },

  // 개발팀
  { userId: 'USER002', userNm: '최세운', deptNm: '개발팀', position: '본부장', parentId: 'USER001' },
  { userId: 'USER003', userNm: '이찬용', deptNm: '개발팀', position: '팀장', parentId: 'USER002' },
  { userId: 'USER004', userNm: '김한나', deptNm: '개발팀', position: '팀원', parentId: 'USER003' },
  { userId: 'USER005', userNm: '김디디', deptNm: '개발팀', position: '팀원', parentId: 'USER003' },

  // 영업팀
  { userId: 'USER006', userNm: '박영수', deptNm: '영업팀', position: '팀장', parentId: 'USER002' },
  { userId: 'USER007', userNm: '이영희', deptNm: '영업팀', position: '팀원', parentId: 'USER006' },
  { userId: 'USER008', userNm: '정민수', deptNm: '영업팀', position: '팀원', parentId: 'USER006' },
]

// KPI 목록
export const kpiList = [
  // ============================================
  // 2024년
  // ============================================

  // 김갑산 (사장) - 2024
  { kpiId: 'KPI001', kpiNm: '그룹 매출 목표 달성', weight: 60, score: 92, userId: 'USER000', year: '2024' },
  { kpiId: 'KPI002', kpiNm: '경영 혁신 지표', weight: 40, score: 88, userId: 'USER000', year: '2024' },

  // 홍덕기 (그룹장) - 2024
  { kpiId: 'KPI003', kpiNm: '사업부 총괄 성과', weight: 50, score: 90, userId: 'USER001', year: '2024' },
  { kpiId: 'KPI004', kpiNm: '전략 과제 달성률', weight: 50, score: 85, userId: 'USER001', year: '2024' },

  // 최세운 (본부장) - 2024
  { kpiId: 'KPI005', kpiNm: '사업부 목표 달성률', weight: 50, score: 90, userId: 'USER002', year: '2024' },
  { kpiId: 'KPI006', kpiNm: '조직 관리 평가', weight: 50, score: 85, userId: 'USER002', year: '2024' },

  // 이찬용 (팀장) - 2024
  { kpiId: 'KPI007', kpiNm: '프로젝트 완료율', weight: 40, score: 88, userId: 'USER003', year: '2024' },
  { kpiId: 'KPI008', kpiNm: '팀 성과 관리', weight: 30, score: 82, userId: 'USER003', year: '2024' },
  { kpiId: 'KPI009', kpiNm: '코드 품질 점수', weight: 30, score: 90, userId: 'USER003', year: '2024' },

  // 김한나 (팀원) - 2024
  { kpiId: 'KPI010', kpiNm: 'UI 개발 완료율', weight: 50, score: 85, userId: 'USER004', year: '2024' },
  { kpiId: 'KPI011', kpiNm: '화면 성능 개선', weight: 50, score: 78, userId: 'USER004', year: '2024' },

  // 김디디 (팀원) - 2024
  { kpiId: 'KPI012', kpiNm: 'API 개발 완료율', weight: 50, score: 92, userId: 'USER005', year: '2024' },
  { kpiId: 'KPI013', kpiNm: '버그 수정률', weight: 50, score: 88, userId: 'USER005', year: '2024' },

  // 박영수 (영업팀장) - 2024
  { kpiId: 'KPI014', kpiNm: '팀 매출 목표 달성', weight: 60, score: 95, userId: 'USER006', year: '2024' },
  { kpiId: 'KPI015', kpiNm: '신규 거래처 확보', weight: 40, score: 80, userId: 'USER006', year: '2024' },

  // 이영희 (팀원) - 2024
  { kpiId: 'KPI016', kpiNm: '고객 미팅 횟수', weight: 50, score: 100, userId: 'USER007', year: '2024' },
  { kpiId: 'KPI017', kpiNm: '제안서 작성', weight: 50, score: 85, userId: 'USER007', year: '2024' },

  // 정민수 (팀원) - 2024
  { kpiId: 'KPI018', kpiNm: '계약 성사율', weight: 60, score: 75, userId: 'USER008', year: '2024' },
  { kpiId: 'KPI019', kpiNm: '고객 만족도', weight: 40, score: 88, userId: 'USER008', year: '2024' },

  // ============================================
  // 2023년
  // ============================================

  // 김갑산 (사장) - 2023
  { kpiId: 'KPI020', kpiNm: '연간 경영 목표', weight: 60, score: 85, userId: 'USER000', year: '2023' },
  { kpiId: 'KPI021', kpiNm: '투자 수익률', weight: 40, score: 80, userId: 'USER000', year: '2023' },

  // 홍덕기 (그룹장) - 2023
  { kpiId: 'KPI022', kpiNm: '부서 통합 관리', weight: 50, score: 82, userId: 'USER001', year: '2023' },
  { kpiId: 'KPI023', kpiNm: '비용 절감 달성', weight: 50, score: 78, userId: 'USER001', year: '2023' },

  // 최세운 (본부장) - 2023
  { kpiId: 'KPI024', kpiNm: '연간 사업 목표', weight: 60, score: 82, userId: 'USER002', year: '2023' },
  { kpiId: 'KPI025', kpiNm: '인력 운영 효율', weight: 40, score: 78, userId: 'USER002', year: '2023' },

  // 이찬용 (팀장) - 2023
  { kpiId: 'KPI026', kpiNm: '레거시 시스템 개선', weight: 50, score: 80, userId: 'USER003', year: '2023' },
  { kpiId: 'KPI027', kpiNm: '신규 기능 개발', weight: 50, score: 75, userId: 'USER003', year: '2023' },

  // 김한나 (팀원) - 2023
  { kpiId: 'KPI028', kpiNm: '반응형 웹 구현', weight: 60, score: 85, userId: 'USER004', year: '2023' },
  { kpiId: 'KPI029', kpiNm: '접근성 개선', weight: 40, score: 70, userId: 'USER004', year: '2023' },

  // 김디디 (팀원) - 2023
  { kpiId: 'KPI030', kpiNm: 'DB 최적화', weight: 50, score: 88, userId: 'USER005', year: '2023' },
  { kpiId: 'KPI031', kpiNm: '보안 취약점 개선', weight: 50, score: 90, userId: 'USER005', year: '2023' },

  // 박영수 (영업팀장) - 2023
  { kpiId: 'KPI032', kpiNm: '분기 매출 달성', weight: 70, score: 90, userId: 'USER006', year: '2023' },
  { kpiId: 'KPI033', kpiNm: '고객 유지율', weight: 30, score: 85, userId: 'USER006', year: '2023' },

  // 이영희 (팀원) - 2023
  { kpiId: 'KPI034', kpiNm: '신규 고객 발굴', weight: 50, score: 72, userId: 'USER007', year: '2023' },
  { kpiId: 'KPI035', kpiNm: '클레임 처리율', weight: 50, score: 88, userId: 'USER007', year: '2023' },

  // 정민수 (팀원) - 2023
  { kpiId: 'KPI036', kpiNm: '영업 교육 이수', weight: 40, score: 95, userId: 'USER008', year: '2023' },
  { kpiId: 'KPI037', kpiNm: '월간 활동 보고', weight: 60, score: 80, userId: 'USER008', year: '2023' },
]
