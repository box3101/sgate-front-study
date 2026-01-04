<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStoreState, useStoreActions } from './composables/useStore'
import TreeNode from './components/TreeNode.vue'

// 상태
const { kpiList, loading, selectedYear, selectedDept, selectedUser, formKpiNm, formWeight, formDeleteId, deptList, allUserList, userList } = useStoreState()

// 메서드
const { getList, getDeptList, getUserList, getAllUserList, addKpi, removeKpi } = useStoreActions()

// 조회 확정용 (조회 버튼 클릭 시에만 변경)
const confirmedUser = ref('USER002')

// 트리 루트 (confirmedUser 기준) - allUserList 사용
const rootUsers = computed(() => {
  const currentUser = allUserList.value.find(u => u.userId === confirmedUser.value)
  const parentId = currentUser?.parentId

  if (!parentId) {
    return allUserList.value.filter(u => u.userId === confirmedUser.value)
  }

  return allUserList.value.filter(u => u.userId === parentId)
})

// 조회 버튼 클릭 시
const handleSearch = () => {
  confirmedUser.value = selectedUser.value
  getList()
}

// 트리에서 유저 클릭 시
const selectUser = (userId: string) => {
  selectedUser.value = userId
  confirmedUser.value = userId
  getList()
}

async function init() {
  await getDeptList()
  await getAllUserList()
  await getUserList()
  selectedUser.value = 'USER002'
  confirmedUser.value = 'USER002'
  await getList()
}
onMounted(init)
</script>

<template>
  <div class="layout">
    <!-- 사이드바: 조직도 트리 -->
    <aside class="sidebar">
      <h3>조직도</h3>
      <div class="tree">
        <TreeNode v-for="user in rootUsers" :key="user.userId" :user="user" :all-users="allUserList" :selected-user-id="selectedUser" @select="selectUser" />
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
        <select v-model="selectedDept" @change="getUserList">
          <option v-for="dept in deptList" :key="dept.deptNm" :value="dept.deptNm">
            {{ dept.deptNm }}
          </option>
        </select>
        <select v-model="selectedUser">
          <option v-for="user in userList" :key="user.userId" :value="user.userId">
            {{ user.userNm }}
          </option>
        </select>
        <button @click="handleSearch">조회</button>
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
