<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStoreState } from './composables/useStore'
import { useStoreActions } from './composables/useStore'

const { kpiList, loading, selectedYear, newKpiNm, newWeight, editKpiId, editKpiNm, editWeight, editScore, deleteKpiId, selectedKpi, okrKeyResultList } = useStoreState()

const { loadList, addKpi, updateKpiAction, deleteKpi, selectKpi, clearSelection } = useStoreActions()

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
  // 2. TODO: 작성
  deleteKpi(deleteKpiId.value)
}

// 수정
const handleUpdate = () => {
  updateKpiAction()
}

// KPI 클릭 - 상세 조회
const handleSelectKpi = (kpiId: string) => {
  selectKpi(kpiId)
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
    <h2>목록 조회 (POST) - 클릭하면 OKR Key Result 표시</h2>
    <p v-if="loading">로딩중...</p>
    <ul v-else class="kpi-list">
      <li
        v-for="kpi in kpiList"
        :key="kpi.kpiId"
        @click="handleSelectKpi(kpi.kpiId)"
        :class="{ active: selectedKpi?.kpiId === kpi.kpiId }"
      >
        {{ kpi.kpiNm }} - {{ kpi.weight }}% ({{ kpi.score }}점)
      </li>
      <li v-if="kpiList.length === 0">데이터 없음</li>
    </ul>

    <!-- 선택된 KPI의 OKR Key Result 목록 -->
    <div v-if="selectedKpi" class="detail-section">
      <h3>📊 {{ selectedKpi.kpiNm }} - Key Results</h3>
      <button @click="clearSelection" class="close-btn">닫기</button>

      <table class="kr-table">
        <thead>
          <tr>
            <th>Key Result</th>
            <th>목표</th>
            <th>실적</th>
            <th>달성률</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="kr in okrKeyResultList" :key="kr.krId">
            <td>{{ kr.krNm }}</td>
            <td>{{ kr.targetValue }}</td>
            <td>{{ kr.actualValue }}</td>
            <td>{{ Math.round(kr.actualValue / kr.targetValue * 100) }}%</td>
          </tr>
          <tr v-if="okrKeyResultList.length === 0">
            <td colspan="4">연계된 Key Result가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>

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
        <!-- 1.TODO: v-model 작성 -->
      <input v-model="deleteKpiId" placeholder="KPI ID" />
      <button @click="handleDelete">삭제</button>
    </div>

    <!-- 수정 -->
    <h2>KPI 수정 (UPDATE)</h2>
    <div class="form-row">
      <input v-model="editKpiId" placeholder="KPI ID" />
      <input v-model="editKpiNm" placeholder="KPI명" />
      <input v-model.number="editWeight" type="number" placeholder="가중치" />
      <input v-model.number="editScore" type="number" placeholder="점수" />
      <button @click="handleUpdate">수정</button>
    </div>
  </div>
</template>

<style lang="scss">
@import './assets/styles/main.scss';
</style>
