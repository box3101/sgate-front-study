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

  return { fetchKpiList };
};
