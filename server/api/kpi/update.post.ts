import { kpiList } from "~/server/data";

export default defineEventHandler(async (event) => {
	// 1. body 받기
	const body = await readBody(event);

  // 2. 파라미터 파싱
  const params = new URLSearchParams(body)
  const kpiId = params.get('kpiId')
  const kpiNm = params.get('kpiNm')
  const weight = params.get('weight')
  const score = params.get('score')


  // 3. kpiList에서 찾아서 수정
  // 1. 위치 찾기
  const index = kpiList.findIndex(kpi => kpi.kpiId === kpiId);

  // 2. 찾았으면 수정
  if (index !== -1) {
    kpiList[index].kpiNm = kpiNm || ''
    kpiList[index].weight = Number(weight) || 0
    kpiList[index].score = Number(score) || 0
  }
  // 4. 응답 반환
  return {
    resultCode: 'SUCCESS',
    resultMsg: '수정 완료',
    data: kpiList // 수정된 전체 목록
  }
});
