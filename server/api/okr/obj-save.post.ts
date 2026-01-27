// POST /api/okr/obj-save - Objective 저장
import { objectiveList, generateObjId } from '~/server/data'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const params = new URLSearchParams(body)

  const newObj = {
    objId: generateObjId(),
    kpiId: params.get('kpiId') || '',  // KPI 연계 (선택)
    objNm: params.get('objNm') || ''
  }

  objectiveList.push(newObj)

  return {
    resultCode: 'SUCCESS',
    resultMsg: '저장 완료',
    data: newObj
  }
})
