import { ref } from 'vue'
import { useKpiApi } from './useKpiApi'

// ============================================
// State
// ============================================
const kpiList = ref<any[]>([])
const loading = ref(false)
const selectedYear = ref('2024')

// KPI 관련
const newKpiNm = ref('')
const newWeight = ref(0)
const deleteKpiId = ref('')
const editKpiId = ref('')
const editKpiNm = ref('')
const editWeight = ref(0)
const editScore = ref(0)

// OKR 관련
const objList = ref<any[]>([])           // Objective 전체 목록
const krList = ref<any[]>([])            // Key Result 목록
const selectedKpi = ref<any>(null)       // 선택된 KPI
const selectedObj = ref<any>(null)       // 선택된 Objective

// ============================================
// API
// ============================================
const {
  fetchKpiList, fetchSaveKpi, fetchDeleteKpi, fetchUpdateKpi,
  fetchObjList, fetchSaveObj,
  fetchKrList, fetchSaveKr
} = useKpiApi()

// ============================================
// Export - State
// ============================================
export const useStoreState = () => {
  return {
    kpiList,
    loading,
    selectedYear,
    // KPI 관련
    newKpiNm,
    newWeight,
    editKpiId,
    editKpiNm,
    editWeight,
    editScore,
    deleteKpiId,
    // OKR 관련
    objList,
    krList,
    selectedKpi,
    selectedObj,
  }
}

// ============================================
// Export - Actions
// ============================================
export const useStoreActions = () => {

  // ============================================
  // KPI Actions
  // ============================================
  const loadKpiList = async (year: string) => {
    loading.value = true
    const result = await fetchKpiList(year)
    kpiList.value = result.data
    loading.value = false
  }

  const addKpi = async (kpiNm: string, weight: number, year: string) => {
    await fetchSaveKpi({ kpiNm, weight, year })
    await loadKpiList(year)
  }

  const deleteKpi = async (kpiId: string) => {
    await fetchDeleteKpi(kpiId)
    await loadKpiList(selectedYear.value)
  }

  const updateKpi = async () => {
    await fetchUpdateKpi({
      kpiId: editKpiId.value,
      kpiNm: editKpiNm.value,
      weight: editWeight.value,
      score: editScore.value
    })
    await loadKpiList(selectedYear.value)
    editKpiId.value = ''
    editKpiNm.value = ''
    editWeight.value = 0
    editScore.value = 0
  }

  // KPI 선택 (필터링 용도, Objective 목록은 전체 유지)
  const selectKpi = (kpi: any) => {
    selectedKpi.value = kpi
    selectedObj.value = null  // Objective 선택 해제
    krList.value = []         // KR 목록 초기화
  }

  // ============================================
  // Objective Actions
  // ============================================
  const loadObjList = async (kpiId?: string) => {
    const result = await fetchObjList(kpiId)
    if (result.resultCode === 'SUCCESS') {
      objList.value = result.data
    }
  }

  const addObj = async (data: { kpiId?: string; objNm: string }) => {
    await fetchSaveObj(data)
    // 저장 후 전체 목록 새로고침
    await loadObjList()
  }

  // Objective 선택 → 연관 Key Result 조회
  const selectObj = async (obj: any) => {
    selectedObj.value = obj

    // 해당 Objective의 Key Result 조회
    const result = await fetchKrList(obj.objId)
    if (result.resultCode === 'SUCCESS') {
      krList.value = result.data
    }
  }

  // ============================================
  // Key Result Actions
  // ============================================
  const loadKrList = async (objId?: string) => {
    const result = await fetchKrList(objId)
    if (result.resultCode === 'SUCCESS') {
      krList.value = result.data
    }
  }

  const addKr = async (data: { objId: string; krNm: string; targetValue: number; actualValue: number }) => {
    await fetchSaveKr(data)
    // 저장 후 목록 새로고침
    if (selectedObj.value) {
      await loadKrList(selectedObj.value.objId)
    }
  }

  // ============================================
  // 초기화
  // ============================================
  const clearSelection = () => {
    selectedKpi.value = null
    selectedObj.value = null
    objList.value = []
    krList.value = []
  }

  return {
    // KPI
    loadKpiList,
    addKpi,
    deleteKpi,
    updateKpi,
    selectKpi,
    // Objective
    loadObjList,
    addObj,
    selectObj,
    // Key Result
    loadKrList,
    addKr,
    // 기타
    clearSelection
  }
}
