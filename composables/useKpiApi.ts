// KPI API 함수
import { useApi } from './useApi'

export const useKpiApi = () => {

  // 조회
  const fetchKpiList = (findYear: string) => {
    const params = new URLSearchParams()
    params.append('findYear', findYear)

    return useApi('/api/kpi/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    })
  }

  // 저장
  const saveKpi = (data: { kpiNm: string; weight: number; year: string }) => {
    const params = new URLSearchParams()
    params.append('kpiNm', data.kpiNm)
    params.append('weight', String(data.weight))
    params.append('year', data.year)

    return useApi('/api/kpi/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    })
  }

  return { fetchKpiList, saveKpi }
}
