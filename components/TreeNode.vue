<script setup lang="ts">
// Props 정의
const props = defineProps<{
  user: {
    userId: string
    userNm: string
    position: string
    parentId: string | null
  }
  allUsers: any[]
  selectedUserId: string
}>()

// Emit 정의
const emit = defineEmits<{
  select: [userId: string]
}>()

// 하위자 찾기
const children = computed(() => {
  return props.allUsers.filter(u => u.parentId === props.user.userId)
})

// 클릭 시 선택
const handleClick = () => {
  emit('select', props.user.userId)
}
</script>

<template>
  <div class="tree-node">
    <!-- 현재 노드 -->
    <div
      class="tree-item"
      :class="{ active: selectedUserId === user.userId }"
      @click="handleClick"
    >
      <span class="tree-name">{{ user.userNm }}</span>
      <span class="tree-position">{{ user.position }}</span>
    </div>

    <!-- 하위 노드 (재귀) -->
    <div v-if="children.length > 0" class="tree-children">
      <TreeNode
        v-for="child in children"
        :key="child.userId"
        :user="child"
        :all-users="allUsers"
        :selected-user-id="selectedUserId"
        @select="emit('select', $event)"
      />
    </div>
  </div>
</template>
