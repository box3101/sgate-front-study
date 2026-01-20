<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from './composables/useStore'

const { kpiList, loading, selectedIds, loadList, addKpi, toggleSelect, deleteSelected } = useStore()

// 검색 조건
const selectedYear = ref('2024')

// 폼 상태
const newKpiNm = ref('')
const newWeight = ref(0)

// 조회
const handleSearch = () => {
  loadList(selectedYear.value)
}

// 저장
const handleSave = async () => {
  await addKpi(newKpiNm.value, newWeight.value, selectedYear.value)
  newKpiNm.value = ''
  newWeight.value = 0
}

// 삭제
const handleDelete = async () => {
  if (selectedIds.value.length === 0) {
    alert('삭제할 항목을 선택해주세요.')
    return
  }
  await deleteSelected(selectedYear.value)
}

// 좋아요 기능
onMounted(handleSearch)

const likes = ref(0)

const addLike = () => {
  likes.value++
}

const removeLike = () => {
  if (likes.value > 0) {
    likes.value--
  }
}

// 글자수 카운터
const content = ref('')

// 로그아웃 로그인
const isLoggedIn = ref(false)
const userName = ref('김현지')
const login = () => { isLoggedIn.value = true }
const logout = () => { isLoggedIn.value = false }

// 아코디언
const openQ1 = ref(false)
const openQ2 = ref(false)
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
    <button @click="handleDelete">선택 삭제</button>
    <p v-if="loading">로딩중...</p>
    <ul v-else>
      <li v-for="kpi in kpiList" :key="kpi.kpiId">
        <input
          type="checkbox"
          :checked="selectedIds.includes(kpi.kpiId)"
          @change="toggleSelect(kpi.kpiId)"
        />
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

    <!-- ==================================== -->
    <!-- 좋아요 기능 -->
    <div class="mt-30">
      <div style="display: flex; gap: 5px;">
        <button @click="addLike">👍 좋아요</button>
        <button @click="removeLike">👎 취소</button>
      </div>
      <p>좋아요: {{ likes }}개</p>
      <p>{{ likes > 10 ? '🔥 인기글!' : '일반글' }}</p>
    </div>


    <!-- 글자 수 카운터 -->
    <div class="mt-30">
      <textarea v-model="content" placeholder="내용 입력 (최대 100자)" maxlength="100"></textarea>
      <p>{{ content.length }} / 100자</p>
      <p v-if="content.length >= 80" style="color: red;">⚠️ 거의 다 찼습니다!</p>
    </div>

    <!-- 로그아웃 로그인 -->
    <div class="mt-30">
      <div v-if="isLoggedIn">
        <p>👋 환영합니다, {{ userName }}님!</p>
        <button @click="logout">로그아웃</button>
      </div>
      <div v-else>
        <p>로그인이 필요합니다</p>
        <button @click="login">로그인</button>
      </div>
    </div>

    <!-- 아코디언 -->
    <div class="mt-30">
      <h3>자주 묻는 질문</h3>
      <div>
        <button @click="openQ1 = !openQ1">Q1. Vue란? {{ openQ1 ? '▲' : '▼' }}</button>
        <div v-show="openQ1">A1. UI 프레임워크입니다.</div>
      </div>
      <div class="mt-10">
        <button @click="openQ2 = !openQ2">Q2. ref vs reactive? {{ openQ2 ? '▲' : '▼' }}</button>
        <div v-show="openQ2">A2. ref는 모든 타입, reactive는 객체 전용</div>
      </div>
    </div>
    <!-- ==================================== -->

  </div>
</template>

<style lang="scss">
@import './assets/styles/main.scss';
.mt-30{
  margin-top: 30px;
}
.mt-10{
  margin-top: 10px;
}
</style>
