<script setup lang="ts">
import { onMounted } from 'vue'
import { useStoreState, useStoreActions } from './composables/useStore'

// 상태
const { kpiList, loading, selectedYear, selectedDept, selectedUser, formKpiNm, formWeight, formDeleteId, deptList, userList } = useStoreState()

// 메서드
const { getList, getDeptList, getUserList, addKpi, removeKpi } = useStoreActions()

onMounted(getList)
onMounted(getDeptList)
onMounted(getUserList)
</script>

<template>
  <div class="container">
    <h1>KPI 실습</h1>

    <!-- 검색 -->
    <div class="search-box">
      <select v-model="selectedYear">
        <option value="2024">2024년</option>
        <option value="2023">2023년</option>
      </select>
      <select v-model="selectedDept">
        <option v-for="dept in deptList" :key="dept.deptId" :value="dept.deptId">
          {{ dept.deptNm }}
        </option>
      </select>
      <select v-model="selectedUser">
        <option v-for="user in userList" :key="user.userId" :value="user.userId">
          {{ user.userNm }}
        </option>
      </select>
      <button @click="getList">조회</button>
    </div>

    <!-- 목록 -->
    <h2>목록 (POST)</h2>
    <p v-if="loading">로딩중...</p>
    <ul v-else>
      <li v-for="kpi in kpiList" :key="kpi.kpiId">
        [{{ kpi.kpiId }}] {{ kpi.kpiNm }} - {{ kpi.weight }}% ({{ kpi.score }}점)
      </li>
      <li v-if="kpiList.length === 0">데이터 없음</li>
    </ul>

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
  </div>
</template>

<style lang="scss">
@import './assets/styles/main.scss';
</style>
