<script setup lang="ts">
import { computed } from 'vue'

// Props
const props = defineProps<{
  members: any[]
  loginMemberId?: string  // 로그인 사용자 ID (하이라이트용)
}>()

// 로그인 사용자인지 확인
const isLoginUser = (memberId: string) => {
  return props.loginMemberId === memberId
}

// Emit
const emit = defineEmits<{
  (e: 'select', member: any): void
}>()

// 평면 배열 → 트리 구조 변환
const buildTree = (items: any[], parentId: string | null = null): any[] => {
  return items
    .filter(item => item.parentId === parentId)
    .map(item => ({
      ...item,
      children: buildTree(items, item.memberId)
    }))
}

// 목록 내 최상위 노드 찾기 (parentId가 목록에 없는 노드들)
const findRootNodes = (items: any[]): any[] => {
  const memberIds = items.map(m => m.memberId)
  return items.filter(item => !memberIds.includes(item.parentId))
}

// 트리 데이터 (목록 내 최상위 노드부터 시작)
const treeData = computed(() => {
  const items = props.members
  const roots = findRootNodes(items)

  // 각 루트 노드에 children 추가
  const buildFromRoots = (rootNodes: any[]): any[] => {
    return rootNodes.map(root => ({
      ...root,
      children: buildTree(items, root.memberId)
    }))
  }

  return buildFromRoots(roots)
})

// 부서명 가져오기 (deptId → deptNm)
const getDeptName = (deptId: string) => {
  const deptMap: Record<string, string> = {
    'GRP_001': 'UX그룹',
    'DIV_001': 'UI/UX본부',
    'TEAM_001': '개발팀',
    'TEAM_002': '디자인팀',
    'TEAM_003': '기획팀',
    'PART_001': '프론트파트',
    'PART_002': '백엔드파트',
  }
  return deptMap[deptId] || ''
}

// 클릭 핸들러
const handleClick = (member: any) => {
  emit('select', member)
}
</script>

<template>
  <div class="org-tree">
    <ul class="tree-root">
      <!-- 재귀 컴포넌트 대신 template 재귀 사용 -->
      <template v-for="node in treeData" :key="node.memberId">
        <li class="tree-node">
          <span
            :class="['node-content', { 'login-user': isLoginUser(node.memberId) }]"
            @click="handleClick(node)"
          >
            {{ node.memberNm }} ({{ node.position }})
            <span v-if="isLoginUser(node.memberId)" class="me-badge">★ 나</span>
            <small v-if="getDeptName(node.deptId)"> - {{ getDeptName(node.deptId) }}</small>
          </span>

          <!-- 자식 노드 (1depth) -->
          <ul v-if="node.children?.length" class="tree-children">
            <li v-for="child1 in node.children" :key="child1.memberId" class="tree-node">
              <span
                :class="['node-content', { 'login-user': isLoginUser(child1.memberId) }]"
                @click="handleClick(child1)"
              >
                {{ child1.memberNm }} ({{ child1.position }})
                <span v-if="isLoginUser(child1.memberId)" class="me-badge">★ 나</span>
                <small v-if="getDeptName(child1.deptId)"> - {{ getDeptName(child1.deptId) }}</small>
              </span>

              <!-- 자식 노드 (2depth) -->
              <ul v-if="child1.children?.length" class="tree-children">
                <li v-for="child2 in child1.children" :key="child2.memberId" class="tree-node">
                  <span
                    :class="['node-content', { 'login-user': isLoginUser(child2.memberId) }]"
                    @click="handleClick(child2)"
                  >
                    {{ child2.memberNm }} ({{ child2.position }})
                    <span v-if="isLoginUser(child2.memberId)" class="me-badge">★ 나</span>
                    <small v-if="getDeptName(child2.deptId)"> - {{ getDeptName(child2.deptId) }}</small>
                  </span>

                  <!-- 자식 노드 (3depth) -->
                  <ul v-if="child2.children?.length" class="tree-children">
                    <li v-for="child3 in child2.children" :key="child3.memberId" class="tree-node">
                      <span
                        :class="['node-content', { 'login-user': isLoginUser(child3.memberId) }]"
                        @click="handleClick(child3)"
                      >
                        {{ child3.memberNm }} ({{ child3.position }})
                        <span v-if="isLoginUser(child3.memberId)" class="me-badge">★ 나</span>
                        <small v-if="getDeptName(child3.deptId)"> - {{ getDeptName(child3.deptId) }}</small>
                      </span>

                      <!-- 자식 노드 (4depth) -->
                      <ul v-if="child3.children?.length" class="tree-children">
                        <li v-for="child4 in child3.children" :key="child4.memberId" class="tree-node">
                          <span
                            :class="['node-content', { 'login-user': isLoginUser(child4.memberId) }]"
                            @click="handleClick(child4)"
                          >
                            {{ child4.memberNm }} ({{ child4.position }})
                            <span v-if="isLoginUser(child4.memberId)" class="me-badge">★ 나</span>
                          </span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
.org-tree {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.tree-root {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tree-children {
  list-style: none;
  padding-left: 24px;
  margin: 0;
  border-left: 1px dashed #ccc;
}

.tree-node {
  position: relative;
  padding: 4px 0;
}

.tree-children > .tree-node::before {
  content: '';
  position: absolute;
  left: -24px;
  top: 12px;
  width: 20px;
  height: 1px;
  background: #ccc;
}

.node-content {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.node-content:hover {
  background: #e3f2fd;
}

.node-content.login-user {
  background: #4caf50;
  color: white;
  font-weight: bold;
}

.node-content.login-user:hover {
  background: #388e3c;
}

.me-badge {
  margin-left: 4px;
  font-size: 12px;
  color: #ffeb3b;
}

.node-content small {
  color: #666;
}

.node-content.login-user small {
  color: rgba(255, 255, 255, 0.8);
}
</style>
