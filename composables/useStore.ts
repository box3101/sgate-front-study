import { ref } from 'vue'
import { useKpiApi } from './useKpiApi'

// 상태
const kpiList = ref<any[]>([])
const loading = ref(false)

// API
const { fetchKpiList, saveKpi } = useKpiApi()

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

  return {
    kpiList,
    loading,
    loadList,
    addKpi
  }
}
