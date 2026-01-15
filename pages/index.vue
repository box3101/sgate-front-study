<script setup lang="ts">
import { onMounted } from 'vue'
import { useStoreState, useStoreActions } from '~/composables/useStore'

// 상태 + Mock 데이터
const {
  years,        // 연도 목록
  departments,  // 부서 목록
  kpiList,
  loading,
  selectedYear,
  selectedDept,  // 선택된 부서
  selectedKpi
} = useStoreState()

// 메서드
const { getList } = useStoreActions()

onMounted(() => {
  getList()
})
</script>

<template>
  <div class="container">
    <h1>KPI 실습 (메인 페이지)</h1>

    <!-- 검색 -->
    <div class="search-box">
      <select v-model="selectedYear">
        <option value="2024">2024년</option>
        <option value="2023">2023년</option>
      </select>
      <button @click="getList">조회</button>
    </div>

    <!-- 목록 -->
    <h2>목록 (POST)</h2>
    <p v-if="loading">로딩중...</p>
    <ul v-else>
      <li v-for="kpi in kpiList" :key="kpi.kpiId" @click="selectedKpi = kpi">
        [{{ kpi.kpiId }}] {{ kpi.kpiNm }} - {{ kpi.weight }}% ({{ kpi.score }}점)
      </li>
      <li v-if="kpiList.length === 0">데이터 없음</li>
    </ul>
    <div v-if="selectedKpi">
      [{{ selectedKpi.kpiId }}] {{ selectedKpi.kpiNm }} - {{ selectedKpi.weight }}% ({{ selectedKpi.score }}점)
    </div>
    <div v-else>
      <p>선택된 데이터 없음</p>
    </div>
  </div>
</template>
