// ============================================
// 5단계: 서버 API (server/api/kpi/delete.ts)
// ============================================
import { kpiList } from '~/server/data'

export default defineEventHandler(async (event) => {

  // 1. 프론트에서 보낸 데이터 받기
  const body = await readBody(event)  // "kpiId=KPI001"

  // 2. 문자열을 파싱해서 값 추출
  const params = new URLSearchParams(body)
  //TODO: 파라미터 파싱 (kpiId) 추출 "KPI001"

  // 3. 배열에서 해당 항목 찾기
  const index = kpiList.findIndex(item => item.kpiId === kpiId)

  // 4. 찾으면 삭제
  if (index !== -1) {
    //  TODO: slice 메서드 사용해서 제거
    return { resultCode: 'SUCCESS', resultMsg: '삭제완료' }
  }

  // 5. 못 찾으면 실패
  return { resultCode: 'FAIL', resultMsg: '해당 KPI 없음' }
})
