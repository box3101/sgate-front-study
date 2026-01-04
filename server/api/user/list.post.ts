// POST /api/uset/list
import { userList } from '~/server/data'

export default defineEventHandler(async (event) => {

  // 1. 프론트에서 보낸 body 받기
  const body = await readBody(event)

  // 2. 파라미터 파싱
  const params = new URLSearchParams(body)
  const deptNm = params.get('deptNm')

  // 1. DB 조회 (구성원 목록 조회)
  const result = userList.filter(user => user.deptNm === deptNm)

  console.log('[API] 구성원 목록 조회' + deptNm + '→' + result.length + '건')

  // 2. 응답 반환
  return {
    resultCode: 'SUCCESS',
    resultMsg: '구성원 목록 조회 완료',
    data: result,
  }
})
