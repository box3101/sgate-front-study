// POST /api/kpi/list - KPI 목록 조회
import { kpiList } from '~/server/data'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // URLSearchParams 파싱
  const params = new URLSearchParams(body)
  const findYear = params.get('findYear')

  console.log('[API] POST /api/kpi/list - findYear:', findYear)

  return {
    resultCode: 'SUCCESS',
    resultMsg: '조회 완료',
    data: kpiList,
    totalCount: kpiList.length
  }
})
