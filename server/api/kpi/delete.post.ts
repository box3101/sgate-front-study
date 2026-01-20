// server/api/kpi/delete.post.ts
import { kpiList } from '~/server/data'

export default defineEventHandler(async (event) => {
  // 1. 프론트에서 보낸 body 받기
  const body = await readBody(event)

  // 2. 파라미터 파싱
  const params = new URLSearchParams(body)
  const kpiId = params.get('kpiId')  // 'kpiId' 받기

  // 3. 콘솔 로그 (디버깅용)
  console.log('[API] POST /api/kpi/delete - kpiId:', kpiId)

  // 4. 유효성 검사 (kpiId 없으면 에러)
  if (!kpiId) {
    return {
      resultCode: 'FAIL',
      resultMsg: 'KPI ID가 필요합니다.'
    }
  }

  // 5. 삭제할 항목 찾기
  const index = kpiList.findIndex(item => item.kpiId === kpiId)

  // 6. 못 찾으면 에러
  if (index === -1) {
    return {
      resultCode: 'FAIL',
      resultMsg: '해당 KPI를 찾을 수 없습니다.'
    }
  }

  // 7. 배열에서 삭제
  const deleted = kpiList.splice(index, 1)

  // 8. 응답 반환
  return {
    resultCode: 'SUCCESS',  // 성공 코드
    resultMsg: '삭제 완료',  // 메시지
    data: deleted[0]  // 삭제된 데이터 반환
  }
})