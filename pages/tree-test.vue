<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { members } from '~/server/data'
import { getMemberTreeData, printTree } from '~/utils/treeUtils'

// 로그인 사용자 선택
const loginMemberId = ref('EMP005')  // 기본: 정유진

// 선택된 사용자 기준 트리 데이터
const treeData = computed(() => getMemberTreeData(loginMemberId.value))

// 콘솔에 트리 출력
watch(loginMemberId, (newId) => {
  printTree(newId)
}, { immediate: true })
</script>

<template>
  <div class="test-container">
    <h1>🌳 트리 유틸리티 테스트</h1>

    <!-- 로그인 사용자 선택 -->
    <div class="login-select">
      <label>로그인 사용자 선택:</label>
      <select v-model="loginMemberId">
        <option v-for="member in members" :key="member.memberId" :value="member.memberId">
          {{ member.memberNm }} ({{ member.position }})
        </option>
      </select>
    </div>

    <div v-if="treeData" class="result-grid">
      <!-- 현재 사용자 -->
      <div class="card current">
        <h3>👤 현재 (로그인)</h3>
        <div class="member-item highlight">
          {{ treeData.current.memberNm }} ({{ treeData.current.position }})
        </div>
      </div>

      <!-- 상위 라인 -->
      <div class="card ancestors">
        <h3>⬆️ 상위 라인 ({{ treeData.ancestors.length }}명)</h3>
        <div v-if="treeData.ancestors.length === 0" class="empty">없음</div>
        <div v-else class="ancestor-chain">
          <div
            v-for="(ancestor, idx) in treeData.ancestors"
            :key="ancestor.memberId"
            class="member-item"
          >
            {{ ancestor.memberNm }} ({{ ancestor.position }})
            <span v-if="idx < treeData.ancestors.length - 1" class="arrow">→</span>
          </div>
        </div>
      </div>

      <!-- 동료 -->
      <div class="card siblings">
        <h3>↔️ 동료 ({{ treeData.siblings.length }}명)</h3>
        <div v-if="treeData.siblings.length === 0" class="empty">없음</div>
        <div v-for="sibling in treeData.siblings" :key="sibling.memberId" class="member-item">
          {{ sibling.memberNm }} ({{ sibling.position }})
        </div>
      </div>

      <!-- 하위 직원 -->
      <div class="card descendants">
        <h3>⬇️ 하위 직원 ({{ treeData.descendants.length }}명)</h3>
        <div v-if="treeData.descendants.length === 0" class="empty">없음</div>
        <div v-for="desc in treeData.descendants" :key="desc.memberId" class="member-item">
          {{ desc.memberNm }} ({{ desc.position }})
        </div>
      </div>
    </div>

    <div class="console-hint">
      💡 F12 개발자도구 Console 탭에서 트리 시각화를 확인하세요!
    </div>
  </div>
</template>

<style scoped>
.test-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.login-select {
  margin-bottom: 24px;
  padding: 16px;
  background: #e3f2fd;
  border-radius: 8px;
}

.login-select label {
  margin-right: 12px;
  font-weight: bold;
}

.login-select select {
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #2196f3;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.card {
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.card h3 {
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.card.current {
  background: #fff3e0;
  border-color: #ff9800;
}

.card.ancestors {
  background: #e8f5e9;
  border-color: #4caf50;
}

.card.siblings {
  background: #f3e5f5;
  border-color: #9c27b0;
}

.card.descendants {
  background: #e3f2fd;
  border-color: #2196f3;
}

.member-item {
  padding: 8px 12px;
  margin: 4px 0;
  background: white;
  border-radius: 4px;
  display: inline-block;
}

.member-item.highlight {
  font-weight: bold;
  font-size: 18px;
}

.ancestor-chain {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
}

.arrow {
  margin: 0 4px;
  color: #4caf50;
  font-weight: bold;
}

.empty {
  color: #999;
  font-style: italic;
}

.console-hint {
  margin-top: 24px;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  text-align: center;
  color: #666;
}
</style>
