// KPI API 함수
import { useApi } from './useApi'

export const useKpiApi = () => {

  // 조회 (GET 역할)
  const fetchKpiList = (findYear: string) => {
    const params = new URLSearchParams()
    params.append('findYear', findYear)

    return useApi('/api/kpi/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    })
  }

  // 저장 (POST)
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

  // 삭제
  const deleteKpiApi = (kpiId: string) => {
    const params = new URLSearchParams()
    params.append('kpiId', kpiId)

    return useApi('/api/kpi/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    })
  }

  return { fetchKpiList, saveKpi, deleteKpiApi }
}
