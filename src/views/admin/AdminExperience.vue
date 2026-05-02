<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold text-black">在校经历</h2>
      <button @click="openAddModal" class="bg-[#e63946] text-white px-4 py-2 rounded-lg hover:bg-[#d62839] transition-colors flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        添加经历
      </button>
    </div>

    <!-- 经历时间线 -->
    <div class="relative pl-8">
      <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-[#e63946]"></div>
      <div class="space-y-8">
        <div v-for="(exp, index) in experience" :key="exp._id" class="relative">
          <div class="absolute -left-8 top-1 w-4 h-4 rounded-full bg-[#e63946] border-4 border-[#FAF8F5] -translate-x-[5px]"></div>
          <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow ml-4">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[#e63946] text-sm font-medium">{{ exp.period }}</span>
                <h3 class="font-bold text-lg mt-1">{{ exp.organization }}</h3>
                <p class="text-gray-600 mt-1">{{ exp.role }}</p>
                <p class="text-gray-400 text-sm mt-2">{{ exp.description }}</p>
              </div>
              <div class="flex gap-2">
                <button @click="openEditModal(exp)" class="text-[#e63946] hover:underline text-sm">编辑</button>
                <button @click="confirmDelete(exp)" class="text-red-500 hover:underline text-sm">删除</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="experience.length === 0 && !loading" class="text-center py-12 ml-4">
        <p class="text-gray-400">暂无经历记录</p>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="text-center py-12 ml-4">
        <p class="text-gray-400">加载中...</p>
      </div>
    </div>

    <!-- 添加/编辑弹窗 -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="closeModal">
      <div class="bg-white rounded-2xl w-full max-w-lg">
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold">{{ isEditing ? '编辑经历' : '添加经历' }}</h3>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">时间段</label>
            <input v-model="formData.period" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" placeholder="如：2022.09 - 2024.06" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">组织/机构</label>
            <input v-model="formData.organization" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" placeholder="如：计算机学院学生会" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">职位/角色</label>
            <input v-model="formData.role" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" placeholder="如：前端开发负责人" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">描述</label>
            <textarea v-model="formData.description" rows="3" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" placeholder="简要描述工作内容和成就"></textarea>
          </div>
        </div>
        <div class="p-6 border-t flex justify-end gap-3">
          <button @click="closeModal" class="px-4 py-2 border rounded-lg hover:bg-gray-50">取消</button>
          <button @click="saveExperience" class="px-4 py-2 bg-[#e63946] text-white rounded-lg hover:bg-[#d62839]">保存</button>
        </div>
      </div>
    </div>

    <!-- 删除确认弹窗 -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">确认删除</h3>
        <p class="text-gray-600 mb-6">确定要删除经历「{{ deleteTarget?.organization }}」吗？</p>
        <div class="flex justify-end gap-3">
          <button @click="showDeleteConfirm = false" class="px-4 py-2 border rounded-lg hover:bg-gray-50">取消</button>
          <button @click="doDelete" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">删除</button>
        </div>
      </div>
    </div>

    <!-- 成功提示 -->
    <Transition name="fade">
      <div v-if="showSuccess" class="fixed top-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        操作成功！
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getExperience, addExperience, updateExperience, deleteExperience } from '@/api'

const experience = ref([])
const loading = ref(true)
const showModal = ref(false)
const showDeleteConfirm = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const deleteTarget = ref(null)

const formData = ref({
  period: '',
  organization: '',
  role: '',
  description: ''
})

const loadExperience = async () => {
  loading.value = true
  experience.value = await getExperience()
  loading.value = false
}

const openAddModal = () => {
  isEditing.value = false
  editingId.value = null
  formData.value = { period: '', organization: '', role: '', description: '' }
  showModal.value = true
}

const openEditModal = (exp) => {
  isEditing.value = true
  editingId.value = exp._id
  formData.value = { ...exp }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveExperience = async () => {
  try {
    if (isEditing.value) {
      await updateExperience(editingId.value, formData.value)
    } else {
      await addExperience(formData.value)
    }
    closeModal()
    loadExperience()
    showSuccess.value = true
    setTimeout(() => { showSuccess.value = false }, 3000)
  } catch (error) {
    console.error('保存失败:', error)
  }
}

const showSuccess = ref(false)

const confirmDelete = (exp) => {
  deleteTarget.value = exp
  showDeleteConfirm.value = true
}

const doDelete = async () => {
  try {
    await deleteExperience(deleteTarget.value._id)
    showDeleteConfirm.value = false
    deleteTarget.value = null
    loadExperience()
    showSuccess.value = true
    setTimeout(() => { showSuccess.value = false }, 3000)
  } catch (error) {
    console.error('删除失败:', error)
  }
}

onMounted(() => {
  loadExperience()
})
</script>
