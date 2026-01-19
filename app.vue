<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStoreState } from './composables/useStore'
import { useStoreActions } from './composables/useStore'

const { kpiList, loading, selectedYear, newKpiNm, newWeight , deleteKpiId } = useStoreState()

const { loadList, addKpi, deleteKpi } = useStoreActions()

// 조회
const handleSearch = () => {
  loadList(selectedYear.value)
}

// 저장
const handleSave = () => {
  addKpi(newKpiNm.value, newWeight.value, selectedYear.value)
  newKpiNm.value = ''
  newWeight.value = 0
}

// 삭제
const handleDelete = () => {
  deleteKpi(deleteKpiId.value)
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
    </div>

    <!-- 목록 -->
    <h2>목록 조회 (POST)</h2>
    <p v-if="loading">로딩중...</p>
    <ul v-else>
      <li v-for="kpi in kpiList" :key="kpi.kpiId">
        {{ kpi.kpiNm }} - {{ kpi.weight }}% ({{ kpi.score }}점)
      </li>
      <li v-if="kpiList.length === 0">데이터 없음</li>
    </ul>

    <!-- 추가 -->
    <h2>KPI 추가 (POST)</h2>
    <div class="form-row">
      <input v-model="newKpiNm" placeholder="KPI명" />
      <input v-model.number="newWeight" type="number" placeholder="가중치" />
      <button @click="handleSave">저장</button>
    </div>

    <!-- 삭제 -->
    <h2>KPI 삭제 (DELETE)</h2>
    <div class="form-row">
      <input v-model="deleteKpiId" placeholder="KPI ID" />
      <button @click="handleDelete">삭제</button>
    </div>
  </div>
</template>

<style lang="scss">
@import './assets/styles/main.scss';
</style>
