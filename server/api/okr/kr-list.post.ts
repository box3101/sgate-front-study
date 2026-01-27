// POST /api/okr/kr-list - Key Result 목록 조회
import { keyResultList, objectiveList } from '~/server/data'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const params = new URLSearchParams(body)
  const objId = params.get('objId')  // 특정 Objective의 KR만 조회 (선택)

  let result = keyResultList

  // objId가 있으면 해당 Objective의 KR만 필터링
  if (objId) {
    result = keyResultList.filter(kr => kr.objId === objId)
  }

  // Objective 이름 붙여서 반환
  const data = result.map(kr => {
    const obj = objectiveList.find(o => o.objId === kr.objId)
    return {
      ...kr,
      objNm: obj?.objNm || '-'
    }
  })

  return {
    resultCode: 'SUCCESS',
    resultMsg: '조회 완료',
    data,
    totalCount: data.length
  }
})
