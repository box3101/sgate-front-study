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
const deleteKpiId = ref('')

// ============================================
// API
// ============================================
const { fetchKpiList, saveKpi, deleteKpiApi } = useKpiApi()

// ============================================
// Export - State
// ============================================
export const useStore = () => {
  return {
    kpiList,
    loading,
    selectedYear,
    newKpiNm,
    newWeight,
    deleteKpiId,
  }
}

// ============================================
// Export - Actions
// ============================================
export const useStoreAction = () => {
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

  const deleteKpi = async (kpiId: string) => {
    await deleteKpiApi(kpiId)
    await loadList(selectedYear.value)
  }

  return {
    loadList,
    addKpi,
    deleteKpi
  }
}