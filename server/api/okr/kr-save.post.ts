// POST /api/okr/kr-save - Key Result 저장
import { keyResultList, generateKrId } from '~/server/data'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const params = new URLSearchParams(body)

  const newKr = {
    krId: generateKrId(),
    objId: params.get('objId') || '',  // Objective 연계
    krNm: params.get('krNm') || '',
    targetValue: Number(params.get('targetValue')) || 0,
    actualValue: Number(params.get('actualValue')) || 0
  }

  keyResultList.push(newKr)

  return {
    resultCode: 'SUCCESS',
    resultMsg: '저장 완료',
    data: newKr
  }
})
