<script setup lang="ts">
import { onMounted } from 'vue'
import { useStoreState, useStoreActions } from './composables/useStore'

// 상태
const { kpiList, loading, selectedYear, selectedUser, formKpiNm, formWeight, formDeleteId, userList } = useStoreState()

// 메서드
const { getList, getAllUsers, addKpi, removeKpi } = useStoreActions()

// 최상위 유저 (parentId가 null인 사람)
const rootUsers = computed(() => {
  return userList.value.filter(user => user.parentId === null)
})

// 트리에서 유저 선택 시
const selectUser = (userId: string) => {
  selectedUser.value = userId
  getList()
}

async function init() {
  await getAllUsers()
  if (userList.value.length > 0) {
    selectedUser.value = userList.value[0].userId
    await getList()
  }
}
onMounted(init)
</script>

<template>
  <div class="layout">
    <!-- 사이드바: 조직도 트리 -->
    <aside class="sidebar">
      <h3>조직도</h3>
      <div class="tree">
        <TreeNode
          v-for="user in rootUsers"
          :key="user.userId"
          :user="user"
          :all-users="userList"
          :selected-user-id="selectedUser"
          @select="selectUser"
        />
      </div>
    </aside>

    <!-- 메인 컨텐츠 -->
    <main class="content">
      <h1>KPI 실습</h1>

      <!-- 검색 -->
      <div class="search-box">
        <select v-model="selectedYear">
          <option value="2024">2024년</option>
          <option value="2023">2023년</option>
        </select>
        <button @click="getList">조회</button>
      </div>

      <!-- 목록 -->
      <h2>KPI 목록</h2>
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
    </main>
  </div>
</template>

<style lang="scss">
@import './assets/styles/main.scss';
</style>
