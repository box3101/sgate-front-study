<script setup lang="ts">
import { ref } from 'vue'
import { useStoreState, useStoreActions } from '~/composables/useStore'

const emit = defineEmits<{
  close: []
  save: []
}>()

const { selectedYear } = useStoreState()
const { addKpi } = useStoreActions()

// 폼 데이터
const form = ref({
  kpiNm: '',
  weight: 0,
  targetValue: 0,
  unit: '%'
})

// 단위 옵션
const unitOptions = ['%', '건', '원', '점']

// 저장 중 상태
const saving = ref(false)

// 저장
const handleSave = async () => {
  // 유효성 검사
  if (!form.value.kpiNm.trim()) {
    alert('KPI명을 입력하세요.')
    return
  }
  if (form.value.weight <= 0) {
    alert('가중치는 0보다 커야 합니다.')
    return
  }

  saving.value = true

  try {
    await addKpi(
      form.value.kpiNm,
      form.value.weight,
      selectedYear.value,
      form.value.targetValue,
      form.value.unit
    )
    emit('save')
  } catch (e) {
    alert('저장 중 오류가 발생했습니다.')
    console.error(e)
  } finally {
    saving.value = false
  }
}

// 배경 클릭 시 닫기
const handleBackdropClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    emit('close')
  }
}
</script>

<template>
  <div class="modal-backdrop" @click="handleBackdropClick">
    <div class="modal">
      <div class="modal-header">
        <h2>KPI 등록</h2>
        <button class="close-btn" @click="emit('close')">×</button>
      </div>

      <div class="modal-body">
        <div class="form-group">
          <label>KPI명 <span class="required">*</span></label>
          <input v-model="form.kpiNm" placeholder="예: 프로젝트 완료율" />
        </div>

        <div class="form-group">
          <label>가중치 <span class="required">*</span></label>
          <input v-model.number="form.weight" type="number" placeholder="0" />
        </div>

        <div class="form-group">
          <label>목표값</label>
          <input v-model.number="form.targetValue" type="number" placeholder="0" />
        </div>

        <div class="form-group">
          <label>단위</label>
          <select v-model="form.unit">
            <option v-for="unit in unitOptions" :key="unit" :value="unit">
              {{ unit }}
            </option>
          </select>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-cancel" @click="emit('close')">취소</button>
        <button class="btn-save" :disabled="saving" @click="handleSave">
          {{ saving ? '저장중...' : '저장' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;

  h2 {
    margin: 0;
    font-size: 18px;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;

    &:hover {
      color: #333;
    }
  }
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    font-size: 14px;

    .required {
      color: #e74c3c;
    }
  }

  input, select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #3498db;
    }
  }
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 20px;
  border-top: 1px solid #eee;

  button {
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
  }

  .btn-cancel {
    background: #f5f5f5;
    border: 1px solid #ddd;
    color: #666;

    &:hover {
      background: #eee;
    }
  }

  .btn-save {
    background: #3498db;
    border: none;
    color: white;

    &:hover {
      background: #2980b9;
    }

    &:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }
  }
}
</style>
