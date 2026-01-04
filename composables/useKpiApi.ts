// KPI API 함수
import { useApi } from './useApi'

export const useKpiApi = () => {

  // GET(POST) - 목록 조회
  const fetchKpiList = (findYear: string) => {
    const params = new URLSearchParams()
    params.append('findYear', findYear)

    return useApi('/api/kpi/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    })
  }

  // POST - 저장
  const saveKpi = (data: { kpiNm: string; weight: number }) => {
    const params = new URLSearchParams()
    params.append('kpiNm', data.kpiNm)
    params.append('weight', String(data.weight))

    return useApi('/api/kpi/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    })
  }

  return { fetchKpiList, saveKpi }
}
