// 가상 DB (메모리)
export const kpiList = [
  { kpiId: 'KPI001', kpiNm: '프로젝트 완료율', weight: 30, score: 85, year: '2024' },
  { kpiId: 'KPI002', kpiNm: '코드 품질 점수', weight: 40, score: 92, year: '2024' },
  { kpiId: 'KPI003', kpiNm: '버그 수정률', weight: 30, score: 88, year: '2024' },
  { kpiId: 'KPI004', kpiNm: '고객 만족도', weight: 50, score: 75, year: '2023' },
  { kpiId: 'KPI005', kpiNm: '매출 목표', weight: 50, score: 80, year: '2023' },
]

/*
 KPI002
 const index = 1
 [배열].splice(시작값, 삭제개수)
 kipList.splice(1 , 1)
*/

// OKR Key Result 데이터 (KPI와 1:N 관계)
export const okrKeyResultList = [
  // KPI001 - 프로젝트 완료율에 연계된 Key Results
  {
    krId: 'KR001',
    kpiId: 'KPI001',
    krNm: '분기별 프로젝트 3건 완료',
    targetValue: 3,
    actualValue: 2
  },
  {
    krId: 'KR002',
    kpiId: 'KPI001',
    krNm: '일정 준수율 95% 달성',
    targetValue: 95,
    actualValue: 90
  },
  // KPI002 - 코드 품질 점수에 연계된 Key Results
  {
    krId: 'KR003',
    kpiId: 'KPI002',
    krNm: '코드 커버리지 80% 이상',
    targetValue: 80,
    actualValue: 85
  },
  {
    krId: 'KR004',
    kpiId: 'KPI002',
    krNm: '버그 발생률 5% 이하',
    targetValue: 5,
    actualValue: 3
  },

  // KPI003 - 버그 수정률에 연계된 Key Results
  {
    krId: 'KR005',
    kpiId: 'KPI003',
    krNm: '크리티컬 버그 24시간 내 해결',
    targetValue: 100,
    actualValue: 95
  },
  {
    krId: 'KR006',
    kpiId: 'KPI003',
    krNm: '월간 버그 해결 50건',
    targetValue: 50,
    actualValue: 48
  },

  // KPI004 - 고객 만족도에 연계된 Key Results (2023)
  {
    krId: 'KR007',
    kpiId: 'KPI004',
    krNm: 'NPS 점수 70점 이상',
    targetValue: 70,
    actualValue: 65
  },

  // KPI005 - 매출 목표에 연계된 Key Results (2023)
  {
    krId: 'KR008',
    kpiId: 'KPI005',
    krNm: '신규 계약 10건 달성',
    targetValue: 10,
    actualValue: 8
  },
]
