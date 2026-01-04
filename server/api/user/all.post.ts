// 전체 userList 반환 (필터 없이)
  import { userList } from '~/server/data'

  export default defineEventHandler(async () => {
    return {
      resultCode: 'SUCCESS',
      data: userList,
    }
  })