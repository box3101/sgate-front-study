// POST /api/kpi/delete - KPI 삭제
import { kpiList } from '~/server/data'

export default defineEventHandler(async (event) => {

  // 1. 프론트에서 보낸 body 받기
  const body = await readBody(event)

  // 2. 파라미터 파싱
  const params = new URLSearchParams(body)
  const kpiId = params.get('kpiId')

  // 3. DB 조회 (kpiId로 필터링)
  const index = kpiList.findIndex(kpi => kpi.kpiId === kpiId)
  if (index !== -1) {
    kpiList.splice(index, 1)  // 원본 배열에서 삭제
  }

  console.log('[API] kpiId:', kpiId, '→', kpiList.length, '건 삭제')

  // 4. 응답 반환
  return {
    data: kpiList,
    resultCode: 'SUCCESS',
    resultMsg: '삭제 완료',
  }
})
