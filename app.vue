<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStoreState, useStoreActions } from './composables/useStore'

const {
  kpiList, loading, selectedYear,
  objList, krList, selectedKpi, selectedObj
} = useStoreState()

const {
  loadKpiList, selectKpi,
  loadObjList, selectObj
} = useStoreActions()

// 모달 상태
const showKpiModal = ref(false)
const showObjModal = ref(false)
const showKrModal = ref(false)

// 디버깅
const handleOpenObjModal = () => {
  console.log('Objective 등록 버튼 클릭')
  showObjModal.value = true
  console.log('showObjModal:', showObjModal.value)
}

// 조회
const handleSearch = () => {
  loadKpiList(selectedYear.value)
  loadObjList()  // 전체 Objective 조회
}

// KPI 클릭
const handleSelectKpi = (kpi: any) => {
  selectKpi(kpi)
}

// Objective 클릭
const handleSelectObj = (obj: any) => {
  selectObj(obj)
}

// 모달 저장 완료
const handleKpiSaveComplete = () => {
  showKpiModal.value = false
  loadKpiList(selectedYear.value)
}

const handleObjSaveComplete = () => {
  showObjModal.value = false
  loadObjList()
}

const handleKrSaveComplete = () => {
  showKrModal.value = false
}

onMounted(() => {
  loadKpiList(selectedYear.value)
  loadObjList()
})
</script>

<template>
  <div class="container">
    <h1>KPI / OKR 관리</h1>

    <!-- 검색 조건 -->
    <div class="search-box">
      <select v-model="selectedYear">
        <option value="2024">2024년</option>
        <option value="2023">2023년</option>
      </select>
      <button @click="handleSearch">조회</button>
      <button @click="showKpiModal = true">KPI 등록</button>
      <button @click="handleOpenObjModal">Objective 등록</button>
    </div>

    <!-- 3단 레이아웃 -->
    <div class="three-column">

      <!-- 1열: KPI 목록 -->
      <div class="column">
        <h2>KPI 목록</h2>
        <p v-if="loading">로딩중...</p>
        <ul v-else class="item-list">
          <li
            v-for="kpi in kpiList"
            :key="kpi.kpiId"
            @click="handleSelectKpi(kpi)"
            :class="{ active: selectedKpi?.kpiId === kpi.kpiId }"
          >
            {{ kpi.kpiNm }}
          </li>
          <li v-if="kpiList.length === 0" class="empty">데이터 없음</li>
        </ul>
      </div>

      <!-- 2열: Objective 목록 -->
      <div class="column">
        <div class="column-header">
          <h2>Objective 목록</h2>
        </div>
        <ul class="item-list">
          <li
            v-for="obj in objList"
            :key="obj.objId"
            @click="handleSelectObj(obj)"
            :class="{ active: selectedObj?.objId === obj.objId }"
          >
            <span class="obj-name">{{ obj.objNm }}</span>
            <span class="obj-kpi">{{ obj.kpiNm }}</span>
          </li>
          <li v-if="objList.length === 0" class="empty">
            {{ selectedKpi ? 'Objective 없음' : '전체 Objective' }}
          </li>
        </ul>
      </div>

      <!-- 3열: Key Result 목록 -->
      <div class="column">
        <div class="column-header">
          <h2>Key Result 목록</h2>
          <button v-if="selectedObj" @click="showKrModal = true">KR 추가</button>
        </div>
        <ul class="item-list" v-if="selectedObj">
          <li v-for="kr in krList" :key="kr.krId" class="kr-item">
            <span class="kr-name">{{ kr.krNm }}</span>
            <span class="kr-value">{{ kr.actualValue }} / {{ kr.targetValue }}</span>
          </li>
          <li v-if="krList.length === 0" class="empty">Key Result 없음</li>
        </ul>
        <p v-else class="hint">Objective를 선택하세요</p>
      </div>

    </div>

    <!-- KPI 등록 모달 -->
    <KpiModal
      v-if="showKpiModal"
      @close="showKpiModal = false"
      @save="handleKpiSaveComplete"
    />

    <!-- Objective 등록 모달 -->
    <ObjModal
      v-if="showObjModal"
      @close="showObjModal = false"
      @save="handleObjSaveComplete"
    />

    <!-- Key Result 등록 모달 -->
    <KrModal
      v-if="showKrModal"
      @close="showKrModal = false"
      @save="handleKrSaveComplete"
    />
  </div>
</template>

<style lang="scss">
@import './assets/styles/main.scss';
</style>
