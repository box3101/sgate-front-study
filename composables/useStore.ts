import { ref } from 'vue'
import { useKpiApi } from './useKpiApi'

// ============================================
// State
// ============================================
const kpiList = ref<any[]>([])
const loading = ref(false)
const selectedYear = ref('2024')
const newKpiNm = ref('')
const newWeight = ref(0)

// 삭제
// TODO:삭제할 변수 작성
const deleteKpiId = ref('')

// 수정용 상태 변수
const editKpiId = ref('')     // 수정할 KPI ID
const editKpiNm = ref('')     // 수정할 이름
const editWeight = ref(0)     // 수정할 가중치
const editScore = ref(0)      // 수정할 점수

// KPI 상세 조회용 상태 변수
const selectedKpi = ref<any>(null)           // 선택된 KPI 정보
const okrKeyResultList = ref<any[]>([])      // 연계된 OKR Key Result 목록

// ============================================
// API
// ============================================
const { fetchKpiList, saveKpi, deleteKpiApi, updateKpiApi, fetchKpiDetail } = useKpiApi()

// ============================================
// Export - State
// ============================================
export const useStoreState = () => {
  return {
    kpiList,
    loading,
    selectedYear,
    newKpiNm,
    newWeight,
    // 수정용
    editKpiId,
    editKpiNm,
    editWeight,
    editScore,
    deleteKpiId,
    // KPI 상세 조회용
    selectedKpi,
    okrKeyResultList,
  }
}

// ============================================
// Export - Actions
// ============================================
export const useStoreActions = () => {
  const loadList = async (year: string) => {
    loading.value = true
    const result = await fetchKpiList(selectedYear.value)
    kpiList.value = result.data
    loading.value = false
  }

  const addKpi = async (kpiNm: string, weight: number, year: string) => {
    await saveKpi({ kpiNm, weight, year })
    await loadList(year)
  }

  // 삭제
  const deleteKpi = async (kpiId: string) => {
    await deleteKpiApi(kpiId)
    await loadList(selectedYear.value)
  }

  // 수정
  const updateKpiAction = async () => {
    // 1. API 호출
    await updateKpiApi({
      kpiId: editKpiId.value,
      kpiNm: editKpiNm.value,
      weight: editWeight.value,
      score: editScore.value
    })

    // 2. 목록 새로고침
    await loadList(selectedYear.value)

    // 3. 입력값 초기화
    editKpiId.value = ''
    editKpiNm.value = ''
    editWeight.value = 0
    editScore.value = 0
  }

  // KPI 상세 조회 (연계 OKR Key Result 포함)
  const selectKpi = async (kpiId: string) => {
    const result = await fetchKpiDetail(kpiId)

    if (result.resultCode === 'SUCCESS') {
      selectedKpi.value = result.data.kpi
      okrKeyResultList.value = result.data.keyResults
    }
  }

  // 선택 해제 (초기화)
  const clearSelection = () => {
    selectedKpi.value = null
    okrKeyResultList.value = []
  }

  return {
    loadList,
    addKpi,
    deleteKpi,
    updateKpiAction,
    selectKpi,
    clearSelection,
  }
}