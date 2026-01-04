// KPI API 함수
import { useApi } from './useApi'

export const useKpiApi = () => {

  // 조회 (GET 역할)
  const fetchKpiList = (findYear: string, userId: string) => {
    const params = new URLSearchParams()
    params.append('findYear', findYear)
    params.append('userId', userId)

    return useApi('/api/kpi/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    })
  }

  // 부서 목록 조회 (GET 역할)
 const fetchDeptList = () => {
    return useApi('/api/dept/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: ''
    })
 }
  // 구성원 목록 조회 (GET 역할)
  const fetchUserList = (selectedDept: string) => {
    const params = new URLSearchParams()
    params.append('selectedDept', selectedDept)

    return useApi('/api/user/list', {
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

  // 삭제 (POST)
  const deleteKpi = (kpiId: string) => {
    const params = new URLSearchParams()
    params.append('kpiId', kpiId)

    return useApi('/api/kpi/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    })
  }

  return { fetchKpiList, fetchDeptList, fetchUserList, saveKpi, deleteKpi }
}
