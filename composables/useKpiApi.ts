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
  const fetchSaveKpi = (data: { kpiNm: string; weight: number; year: string; targetValue?: number; unit?: string }) => {
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
  const fetchDeleteKpi = (kpiId: string) => {
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
  const fetchUpdateKpi = (data: { kpiId: string; kpiNm: string; weight: number; score: number }) => {
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

  // ============================================
  // Objective API
  // ============================================

  // Objective 목록 조회 (kpiId 선택)
  const fetchObjList = (kpiId?: string) => {
    const params = new URLSearchParams()
    if (kpiId) {
      params.append('kpiId', kpiId)
    }

    return useApi('/api/okr/obj-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    })
  }

  // Objective 저장
  const fetchSaveObj = (data: { kpiId?: string; objNm: string }) => {
    const params = new URLSearchParams()
    if (data.kpiId) {
      params.append('kpiId', data.kpiId)
    }
    params.append('objNm', data.objNm)

    return useApi('/api/okr/obj-save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    })
  }

  // ============================================
  // Key Result API
  // ============================================

  // Key Result 목록 조회 (objId 선택)
  const fetchKrList = (objId?: string) => {
    const params = new URLSearchParams()
    if (objId) {
      params.append('objId', objId)
    }

    return useApi('/api/okr/kr-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    })
  }

  // Key Result 저장
  const fetchSaveKr = (data: { objId: string; krNm: string; targetValue: number; actualValue: number }) => {
    const params = new URLSearchParams()
    params.append('objId', data.objId)
    params.append('krNm', data.krNm)
    params.append('targetValue', String(data.targetValue))
    params.append('actualValue', String(data.actualValue))

    return useApi('/api/okr/kr-save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    })
  }

  return {
    // KPI
    fetchKpiList, fetchSaveKpi, fetchDeleteKpi, fetchUpdateKpi,
    // Objective
    fetchObjList, fetchSaveObj,
    // Key Result
    fetchKrList, fetchSaveKr
  }
}
