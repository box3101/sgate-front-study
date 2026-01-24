// 가상 DB (메모리)

// KPI 목록
export const kpiList: any[] = [
  { kpiId: 'KPI001', kpiNm: '프로젝트 완료율', weight: 30, score: 85, year: '2024' },
  { kpiId: 'KPI002', kpiNm: '코드 품질 점수', weight: 40, score: 92, year: '2024' },
  { kpiId: 'KPI003', kpiNm: '버그 수정률', weight: 30, score: 88, year: '2024' },
  { kpiId: 'KPI004', kpiNm: '고객 만족도', weight: 50, score: 75, year: '2023' },
  { kpiId: 'KPI005', kpiNm: '매출 목표', weight: 50, score: 80, year: '2023' },
]

// Objective 목록 (KPI 연계는 선택사항)
export const objectiveList: any[] = [
  // KPI 연계 Objective
  { objId: 'OBJ001', kpiId: 'KPI001', objNm: 'Q1 프로젝트 일정 준수' },
  { objId: 'OBJ002', kpiId: 'KPI001', objNm: 'Q2 프로젝트 품질 향상' },
  { objId: 'OBJ003', kpiId: 'KPI002', objNm: '코드 리뷰 문화 정착' },
  // 독립 Objective (KPI 연계 없음)
  { objId: 'OBJ004', kpiId: '', objNm: '팀 역량 강화' },
  { objId: 'OBJ005', kpiId: '', objNm: '업무 환경 개선' },
]

// Key Result 목록 (Objective에 연계)
export const keyResultList: any[] = [
  // OBJ001 (Q1 프로젝트 일정 준수)
  { krId: 'KR001', objId: 'OBJ001', krNm: '주간 보고서 제출률 100%', targetValue: 100, actualValue: 95 },
  { krId: 'KR002', objId: 'OBJ001', krNm: '마일스톤 일정 준수율 90%', targetValue: 90, actualValue: 88 },
  // OBJ002 (Q2 프로젝트 품질 향상)
  { krId: 'KR003', objId: 'OBJ002', krNm: '테스트 커버리지 80% 달성', targetValue: 80, actualValue: 75 },
  // OBJ003 (코드 리뷰 문화 정착)
  { krId: 'KR004', objId: 'OBJ003', krNm: 'PR 리뷰 24시간 내 완료', targetValue: 100, actualValue: 92 },
  { krId: 'KR005', objId: 'OBJ003', krNm: '코드 리뷰 참여율 100%', targetValue: 100, actualValue: 85 },
  // OBJ004 (팀 역량 강화 - 독립)
  { krId: 'KR006', objId: 'OBJ004', krNm: '기술 세미나 월 2회 진행', targetValue: 24, actualValue: 18 },
  { krId: 'KR007', objId: 'OBJ004', krNm: '외부 교육 참석률 80%', targetValue: 80, actualValue: 90 },
]

// ID 자동 생성용 카운터
let objIdCounter = 6
let krIdCounter = 8

export const generateObjId = () => {
  return `OBJ${String(objIdCounter++).padStart(3, '0')}`
}

export const generateKrId = () => {
  return `KR${String(krIdCounter++).padStart(3, '0')}`
}
