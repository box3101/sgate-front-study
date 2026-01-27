// POST /api/okr/obj-list - Objective 목록 조회
import { objectiveList, kpiList } from '~/server/data'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const params = new URLSearchParams(body)
  const kpiId = params.get('kpiId')  // 특정 KPI의 Objective만 조회 (선택)

  let result = objectiveList

  // kpiId가 있으면 해당 KPI의 Objective만 필터링
  if (kpiId) {
    result = objectiveList.filter(obj => obj.kpiId === kpiId)
  }

  // KPI 이름 붙여서 반환
  const data = result.map(obj => {
    const kpi = kpiList.find(k => k.kpiId === obj.kpiId)
    return {
      ...obj,
      kpiNm: kpi?.kpiNm || '-'
    }
  })

  return {
    resultCode: 'SUCCESS',
    resultMsg: '조회 완료',
    data,
    totalCount: data.length
  }
})
