<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from './composables/useStore'

const { kpiList, loading, loadList, addKpi } = useStore()

// 폼 상태
const newKpiNm = ref('')
const newWeight = ref(0)

// 저장
const handleSave = async () => {
  await addKpi(newKpiNm.value, newWeight.value)
  newKpiNm.value = ''
  newWeight.value = 0
}

onMounted(loadList)
</script>

<template>
  <div class="container">
    <h1>KPI 실습</h1>

    <!-- 목록 -->
    <h2>목록 조회 (POST)</h2>
    <p v-if="loading">로딩중...</p>
    <ul v-else>
      <li v-for="kpi in kpiList" :key="kpi.kpiId">
        {{ kpi.kpiNm }} - {{ kpi.weight }}% ({{ kpi.score }}점)
      </li>
    </ul>

    <!-- 추가 -->
    <h2>KPI 추가 (POST)</h2>
    <div class="form-row">
      <input v-model="newKpiNm" placeholder="KPI명" />
      <input v-model.number="newWeight" type="number" placeholder="가중치" />
      <button @click="handleSave">저장</button>
    </div>
  </div>
</template>

<style lang="scss">
@import './assets/styles/main.scss';
</style>
