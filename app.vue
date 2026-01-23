<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStoreState } from './composables/useStore'
import { useStoreActions } from './composables/useStore'

const { kpiList, loading, selectedYear } = useStoreState()

const { loadList } = useStoreActions()

// 모달 상태
const showModal = ref(false)

// 조회
const handleSearch = () => {
  loadList(selectedYear.value)
}

// 모달에서 저장 완료 시
const handleSaveComplete = () => {
  showModal.value = false
  loadList(selectedYear.value)
}

onMounted(() => {
  loadList(selectedYear.value)
})

</script>

<template>
  <div class="container">
    <h1>KPI 실습</h1>

    <!-- 검색 조건 -->
    <div class="search-box">
      <select v-model="selectedYear">
        <option value="2024">2024년</option>
        <option value="2023">2023년</option>
      </select>
      <button @click="handleSearch">조회</button>
      <button @click="showModal = true">KPI 등록</button>
    </div>

    <!-- 목록 -->
    <h2>목록 조회</h2>
    <p v-if="loading">로딩중...</p>
    <ul v-else>
      <li v-for="kpi in kpiList" :key="kpi.kpiId">
        {{ kpi.kpiNm }} - {{ kpi.weight }}% ({{ kpi.score }}점)
      </li>
      <li v-if="kpiList.length === 0">데이터 없음</li>
    </ul>

    <!-- KPI 등록 모달 -->
    <KpiModal
      v-if="showModal"
      @close="showModal = false"
      @save="handleSaveComplete"
    />
  </div>
</template>

<style lang="scss">
@import './assets/styles/main.scss';
</style>
