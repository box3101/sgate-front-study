// POST /api/dept/list - 부서 목록 조회
import { deptList } from '~/server/data'

export default defineEventHandler(async (event) => {

  // 1. DB 조회 (부서 목록 조회)
  const result = deptList

  console.log('[API] 부서 목록 조회')

  // 2. 응답 반환
  return {
    resultCode: 'SUCCESS',
    resultMsg: '부서 목록 조회 완료',
    data: result,
  }
})
