import { ref } from 'vue'
import { useKpiApi } from './useKpiApi'

// 상태
const kpiList = ref<any[]>([])
const loading = ref(false)

// API
const { fetchKpiList, saveKpi, deleteKpi: deleteKpiApi } = useKpiApi()

// 선택된 항목
const selectedIds = ref<string[]>([])

export const useStore = () => {

  // 조회
  const loadList = async (year: string) => {
    loading.value = true
    const result = await fetchKpiList(year)
    kpiList.value = result.data
    loading.value = false
  }

  // 저장
  const addKpi = async (kpiNm: string, weight: number, year: string) => {
    await saveKpi({ kpiNm, weight, year })
    await loadList(year)
  }

  // 선택 토글
  const toggleSelect = (kpiId: string) => {
    const idx = selectedIds.value.indexOf(kpiId)
    if (idx === -1) {
      selectedIds.value.push(kpiId)
    } else {
      selectedIds.value.splice(idx, 1)
    }
  }

  // 삭제
  const deleteSelected = async (year: string) => {
    for (const kpiId of selectedIds.value) {
      await deleteKpiApi(kpiId)
    }
    selectedIds.value = []
    await loadList(year)
  }

  return {
    kpiList,
    loading,
    selectedIds,
    loadList,
    addKpi,
    toggleSelect,
    deleteSelected
  }
}
