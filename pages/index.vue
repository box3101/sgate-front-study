<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStoreState, useStoreActions } from '~/composables/useStore'

// 상태
const { kpiList, loading, selectedYear, formKpiNm, formWeight, formDeleteId, formUpdateId, formUpdateNm, formUpdateWeight, formUpdateScore, selectedKpi } = useStoreState()

// 메서드
const { getList, addKpi, removeKpi, updateKpiData } = useStoreActions()

// 타이머 예시 (정리 안 함 - 나쁜 예시!)
const count = ref(0)

onMounted(() => {
  getList()

  // 1초마다 카운트 증가 (정리 안 함!)
  setInterval(() => {
    count.value++
    console.log('타이머 실행 중...', count.value)
  }, 1000)
})
</script>

<template>
  <div class="container">
    <h1>KPI 실습 (메인 페이지)</h1>

    <!-- 타이머 테스트 (정리 안 함!) -->
    <p>카운트: {{ count }} (콘솔 확인!)</p>

    <!-- 테스트 페이지 이동 -->
    <NuxtLink to="/test">테스트 페이지로 이동</NuxtLink>

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

    <!-- 추가 -->
    <h2>추가 (POST)</h2>
    <div class="form-row">
      <input v-model="formKpiNm" placeholder="KPI명" />
      <input v-model.number="formWeight" type="number" placeholder="가중치" />
      <button @click="addKpi">저장</button>
    </div>

    <!-- 삭제 -->
    <h2>삭제 (POST)</h2>
    <div class="form-row">
      <input v-model="formDeleteId" placeholder="KPI ID (예: KPI001)" />
      <button @click="removeKpi">삭제</button>
    </div>

    <!-- 수정 -->
    <h2>수정 (POST)</h2>
    <div class="form-row">
      <input v-model="formUpdateId" placeholder="KPI ID" />
      <input v-model="formUpdateNm" placeholder="KPI명" />
      <input v-model="formUpdateWeight" type="number" placeholder="가중치" />
      <input v-model="formUpdateScore" type="number" placeholder="점수" />
      <button @click="updateKpiData">수정</button>
    </div>
  </div>
</template>
