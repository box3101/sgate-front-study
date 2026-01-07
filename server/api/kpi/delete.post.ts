import { kpiList } from '~/server/data'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const params = new URLSearchParams(body)
  const kpiId = params.get('kpiId')  // 1. 뭘 받아야 할까?

  // 2. kpiList에서 해당 kpiId 제외하고 필터링
  // 힌트: kpiList = kpiList.filter(???)
  const result = kpiList.filter(kpi => kpi.kpiId !== kpiId)

  return {
    resultCode: 'SUCCESS',  // 3. 성공 코드
    resultMsg: '삭제완료'    // 4. 메시지
  }
})