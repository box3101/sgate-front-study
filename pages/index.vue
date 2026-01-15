<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useStoreState, useStoreActions } from '~/composables/useStore'

// 상태 + Mock 데이터
const {
  years,               // 연도 목록
  filteredDepartments, // 팀 목록 (TEAM_만)
  members,             // 전체 부서원 (로그인 선택용)
  filteredMembers,     // 선택된 팀의 부서원만
  // 로그인 관련
  loginMemberId,       // 로그인 사용자 ID
  loginMember,         // 로그인 사용자 정보
  visibleMembers,      // 로그인 사용자가 볼 수 있는 부서원 (트리용)
  isTeamMember,        // 팀원 여부 (안내 메시지용)
  canSelectDept,       // 부서 Select 표시 여부 (팀원만 숨김)
  canSelectMember,     // 부서원 Select 표시 여부 (본부장+ 만 표시)
  // 상태
  kpiList,
  loading,
  selectedYear,
  selectedDept,        // 선택된 부서
  selectedMember,      // 선택된 부서원
  selectedKpi
} = useStoreState()

// 메서드
const { getList, getKpiByMember } = useStoreActions()

// 부서 변경 시 부서원 선택 초기화
watch(selectedDept, () => {
  selectedMember.value = ''
})

// 트리에서 선택된 부서원 (Select Box와 별개)
const selectedTreeMember = ref<any>(null)

// 트리에서 부서원 선택 시 → 해당 부서원 KPI 조회, Select Box는 유지
const handleTreeSelect = (member: any) => {
  selectedTreeMember.value = member
  getKpiByMember(member.memberId)  // KPI 조회!
}

onMounted(() => {
  getList()
})
</script>

<template>
  <div class="page-container">
    <!-- 왼쪽: 조직도 트리 -->
    <aside class="sidebar">
      <!-- 로그인 사용자 선택 -->
      <div class="login-box">
        <label>🔐 로그인:</label>
        <select v-model="loginMemberId">
          <option v-for="member in members" :key="member.memberId" :value="member.memberId">
            {{ member.memberNm }} ({{ member.position }})
          </option>
        </select>
      </div>

      <h3>조직도 (내가 볼 수 있는 범위)</h3>
      <OrgTree
        :members="visibleMembers"
        :login-member-id="loginMemberId"
        @select="handleTreeSelect"
      />
    </aside>

    <!-- 오른쪽: 메인 컨텐츠 -->
    <main class="main-content">
      <h1>KPI 실습 (메인 페이지)</h1>

      <!-- 검색 필터 -->
      <div class="search-box">
        <!-- 연도 -->
        <select v-model="selectedYear">
          <option value="">연도 선택</option>
          <option v-for="year in years" :key="year.yearId" :value="year.yearId">
            {{ year.yearNm }}
          </option>
        </select>

        <!-- 부서 (팀원만 숨김: 파트장/팀장/본부장+ 표시) -->
        <select v-if="canSelectDept" v-model="selectedDept">
          <option value="">부서 선택</option>
          <option v-for="dept in filteredDepartments" :key="dept.deptId" :value="dept.deptId">
            {{ dept.deptNm }}
          </option>
        </select>

        <!-- 부서원 (본부장+ 만 표시) -->
        <select v-if="canSelectMember" v-model="selectedMember">
          <option value="">부서원 선택</option>
          <option v-for="member in filteredMembers" :key="member.memberId" :value="member.memberId">
            {{ member.memberNm }} ({{ member.position }})
          </option>
        </select>

        <button @click="getList">조회</button>
      </div>

      <!-- 팀원 안내 메시지 -->
      <div v-if="isTeamMember" class="team-member-notice">
        💡 팀원은 본인의 KPI만 조회할 수 있습니다.
      </div>

      <!-- 목록 -->
      <h2>KPI 목록</h2>
      <p v-if="loading">로딩중...</p>
      <ul v-else>
        <li v-for="kpi in kpiList" :key="kpi.kpiId" @click="selectedKpi = kpi">
          [{{ kpi.kpiId }}] {{ kpi.kpiNm }} - {{ kpi.weight }}% ({{ kpi.score }}점)
        </li>
        <li v-if="kpiList.length === 0">데이터 없음</li>
      </ul>

      <!-- 트리에서 선택된 부서원 정보 -->
      <div v-if="selectedTreeMember" class="tree-selected">
        <h3>📌 트리 선택: {{ selectedTreeMember.memberNm }} ({{ selectedTreeMember.position }})</h3>
        <p>부서: {{ selectedTreeMember.deptId }}</p>
        <button @click="selectedTreeMember = null">선택 해제</button>
      </div>

      <!-- 선택된 KPI -->
      <div v-if="selectedKpi" class="selected-kpi">
        <h3>선택된 KPI</h3>
        [{{ selectedKpi.kpiId }}] {{ selectedKpi.kpiNm }} - {{ selectedKpi.weight }}% ({{ selectedKpi.score }}점)
      </div>
    </main>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  gap: 24px;
  padding: 16px;
  min-height: 100vh;
}

.sidebar {
  width: 320px;
  flex-shrink: 0;
}

.login-box {
  margin-bottom: 16px;
  padding: 12px;
  background: #e8f5e9;
  border-radius: 8px;
  border: 1px solid #4caf50;
}

.login-box label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.login-box select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #4caf50;
}

.sidebar h3 {
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #333;
  font-size: 14px;
}

.main-content {
  flex: 1;
}

.search-box {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-box select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 140px;
}

.search-box button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-box button:hover {
  background: #0056b3;
}

.team-member-notice {
  padding: 12px 16px;
  background: #fff8e1;
  border: 1px solid #ffc107;
  border-radius: 8px;
  margin-bottom: 16px;
  color: #856404;
}

.tree-selected {
  margin-top: 20px;
  padding: 16px;
  background: #fff3e0;
  border-radius: 8px;
  border-left: 4px solid #ff9800;
}

.tree-selected h3 {
  margin: 0 0 8px 0;
}

.tree-selected button {
  margin-top: 8px;
  padding: 4px 12px;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.selected-kpi {
  margin-top: 20px;
  padding: 16px;
  background: #e3f2fd;
  border-radius: 8px;
}
</style>
