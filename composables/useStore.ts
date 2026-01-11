import { ref } from 'vue'
import { useKpiApi } from './useKpiApi'

// ============================================
// 상태 (ref)
// ============================================
const kpiList = ref<any[]>([])
const loading = ref(false)
const selectedYear = ref('2024')
const formKpiNm = ref('')
const formWeight = ref(0)

// 삭제
const formDeleteId = ref('')

// 수정
const formUpdateId = ref('')
const formUpdateNm = ref('')
const formUpdateWeight = ref(0)
const formUpdateScore = ref(0)

// 상태추가
const selectedKpi = ref<any>(null)

// ============================================
// API
// ============================================
const { fetchKpiList, saveKpi, deleteKpi, updateKpi } = useKpiApi()

// ============================================
// 상태만 가져오기
// ============================================
export const useStoreState = () => {
  return {
    kpiList,
    loading,
    selectedYear,
    formKpiNm,
    formWeight,
    formDeleteId,
    formUpdateId,
    formUpdateNm,
    formUpdateWeight,
    formUpdateScore,
    selectedKpi
  }
}

// ============================================
// 메서드만 가져오기
// ============================================
export const useStoreActions = () => {

  // 조회
  const getList = async () => {
    loading.value = true
    const result = await fetchKpiList(selectedYear.value)
    kpiList.value = result.data
    loading.value = false
  }

  // 저장
  const addKpi = async () => {
    await saveKpi({
      kpiNm: formKpiNm.value,
      weight: formWeight.value,
      year: selectedYear.value
    })
    formKpiNm.value = ''
    formWeight.value = 0
    await getList()
  }

  // 삭제
  const removeKpi = async () => {
    await deleteKpi({ kpiId: formDeleteId.value })
    formDeleteId.value = ''
    await getList()
  }

  // 수정
  const updateKpiData = async () => {
    await updateKpi({ kpiId: formUpdateId.value, kpiNm: formUpdateNm.value, weight: formUpdateWeight.value, score: formUpdateScore.value })
    formUpdateId.value = ''
    formUpdateNm.value = ''
    formUpdateWeight.value = 0
    formUpdateScore.value = 0
    await getList()
  }


  return {
    getList,
    addKpi,
    removeKpi,
    updateKpiData
  }
}
