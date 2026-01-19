// POST /api/kpi/list - KPI 목록 조회
import { kpiList } from '~/server/data'

export default defineEventHandler(async (event) => {

  // 1. 프론트에서 보낸 body 받기
  const body = await readBody(event)

  // 2. 파라미터 파싱
  const params = new URLSearchParams(body)
  const findYear = params.get('findYear')

  // 3. DB 조회 (findYear로 필터링)
  const result = kpiList.filter(kpi => kpi.year === findYear)


  // 4. 응답 반환
  return {
    resultCode: 'SUCCESS',
    resultMsg: '조회 완료',
    data: result,
    totalCount: result.length
  }
})
