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
  const saveKpi = (data: { kpiNm: string; weight: number; year: string; targetValue?: number; unit?: string }) => {
    const params = new URLSearchParams()
    params.append('kpiNm', data.kpiNm)
    params.append('weight', String(data.weight))
    params.append('year', data.year)
    if (data.targetValue !== undefined) {
      params.append('targetValue', String(data.targetValue))
    }
    if (data.unit) {
      params.append('unit', data.unit)
    }

    return useApi('/api/kpi/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    })
  }

  // 삭제
  const deleteKpiApi = (kpiId: string) => {
    const params = new URLSearchParams()
    //TODO: 파라미터 작성 (kpiId)
    params.append('kpiId', kpiId)

    return useApi('/api/kpi/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    })
  }

  // 수정
  const updateKpiApi = (data: { kpiId: string; kpiNm: string; weight: number; score: number }) => {
    // 1. 빈 상자 만들기
    const params = new URLSearchParams()

    // 2. 물건 넣기
    params.append('kpiId', data.kpiId)
    params.append('kpiNm', data.kpiNm)
    params.append('weight', String(data.weight))  // 숫자는 String()으로 변환
    params.append('score', String(data.score))

    // 3. 포장해서 보내기
    return useApi('/api/kpi/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()  // "kpiId=KPI001&kpiNm=...&weight=30&score=85"
    })
  }

  return { fetchKpiList, saveKpi, deleteKpiApi, updateKpiApi }
}
