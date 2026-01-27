// POST /api/kpi/detail - KPI 상세 조회 (연계 OKR Key Result 포함)
import { kpiList, okrKeyResultList } from '~/server/data'

export default defineEventHandler(async (event) => {

  // 1. 프론트에서 보낸 body 받기
  const body = await readBody(event)

  // 2. 파라미터 파싱
  const params = new URLSearchParams(body)
  const kpiId = params.get('kpiId')

  // 3. KPI 정보 찾기
  const kpi = kpiList.find(item => item.kpiId === kpiId)

  // 4. 연계된 OKR Key Result 필터링
  const keyResults = okrKeyResultList.filter(kr => kr.kpiId === kpiId)

  // 5. 응답 반환
  if (kpi) {
    return {
      resultCode: 'SUCCESS',
      resultMsg: '조회 완료',
      data: {
        kpi,              // KPI 상세 정보
        keyResults        // 연계된 Key Result 목록
      }
    }
  }

  return {
    resultCode: 'FAIL',
    resultMsg: '해당 KPI를 찾을 수 없습니다.'
  }
})
