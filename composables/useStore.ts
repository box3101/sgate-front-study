import { ref, computed } from 'vue'
import { useKpiApi } from './useKpiApi'
import { years, departments, members } from '~/server/data'

// ============================================
// 상태 (ref)
// ============================================
const kpiList = ref<any[]>([])
const loading = ref(false)
const selectedYear = ref('2024')
const selectedDept = ref('')  // 선택된 부서
const selectedMember = ref('')  // 선택된 부서원

// 상태추가
const selectedKpi = ref<any>(null)

// ============================================
// API
// ============================================
const { fetchKpiList } = useKpiApi()

// ============================================
// 상태만 가져오기
// ============================================
export const useStoreState = () => {
  return {
    // Mock 데이터 (셀렉트 옵션용)
    years,
    departments,
    members,
    // 상태
    kpiList,
    loading,
    selectedYear,
    selectedDept,
    selectedMember,
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

  return {
    getList
  }
}
