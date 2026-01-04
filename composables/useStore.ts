import { ref } from 'vue'
import { useKpiApi } from './useKpiApi'

// ============================================
// 상태 (ref)
// ============================================
const kpiList = ref<any[]>([])
const loading = ref(false)
const selectedYear = ref('2024')

// 폼 상태
const formKpiNm = ref('')
const formWeight = ref(0)
const formDeleteId = ref('')

// ============================================
// API
// ============================================
const { fetchKpiList, saveKpi, deleteKpi } = useKpiApi()

export const useStore = () => {

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
    // 폼 초기화
    formKpiNm.value = ''
    formWeight.value = 0
    // 목록 새로고침
    await getList()
  }

  // 삭제
  const removeKpi = async () => {
    await deleteKpi(formDeleteId.value)
    // 폼 초기화
    formDeleteId.value = ''
    // 목록 새로고침
    await getList()
  }

  return {
    // 상태
    kpiList,
    loading,
    selectedYear,
    formKpiNm,
    formWeight,
    formDeleteId,
    // 메서드
    getList,
    addKpi,
    removeKpi
  }
}
