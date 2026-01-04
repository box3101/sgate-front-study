// POST /api/kpi/save - KPI 저장
import { kpiList } from '~/server/data'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // URLSearchParams 파싱
  const params = new URLSearchParams(body)
  const kpiNm = params.get('kpiNm')
  const weight = params.get('weight')

  console.log('[API] POST /api/kpi/save - kpiNm:', kpiNm, 'weight:', weight)

  // 새 KPI 추가
  const newKpi = {
    kpiId: `KPI${String(kpiList.length + 1).padStart(3, '0')}`,
    kpiNm: kpiNm || '',
    weight: Number(weight) || 0,
    score: 0
  }
  kpiList.push(newKpi)

  return {
    resultCode: 'SUCCESS',
    resultMsg: '저장 완료',
    data: newKpi
  }
})
