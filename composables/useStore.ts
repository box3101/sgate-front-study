import { ref } from 'vue'
import { useKpiApi } from './useKpiApi'

// 상태
const kpiList = ref<any[]>([])
const loading = ref(false)

// API
const { fetchKpiList, saveKpi } = useKpiApi()

export const useStore = () => {

  // 조회
  const loadList = async () => {
    loading.value = true
    const result = await fetchKpiList('2024')
    kpiList.value = result.data
    loading.value = false
  }

  // 저장
  const addKpi = async (kpiNm: string, weight: number) => {
    await saveKpi({ kpiNm, weight })
    await loadList()
  }

  return {
    kpiList,
    loading,
    loadList,
    addKpi
  }
}
