<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold text-black">奖项证书</h2>
      <button @click="openAddModal" class="bg-[#e63946] text-white px-4 py-2 rounded-lg hover:bg-[#d62839] transition-colors flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        添加奖项
      </button>
    </div>

    <!-- 奖项列表 -->
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left text-sm font-bold text-gray-600">奖项名称</th>
            <th class="px-6 py-4 text-left text-sm font-bold text-gray-600">级别</th>
            <th class="px-6 py-4 text-right text-sm font-bold text-gray-600">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="award in awards" :key="award._id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-[#e63946]"></span>
                {{ award.title }}
              </div>
            </td>
            <td class="px-6 py-4 text-gray-600">{{ award.level }}</td>
            <td class="px-6 py-4 text-right">
              <button @click="openEditModal(award)" class="text-[#e63946] hover:underline mr-4">编辑</button>
              <button @click="confirmDelete(award)" class="text-red-500 hover:underline">删除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 空状态 -->
      <div v-if="awards.length === 0 && !loading" class="text-center py-12">
        <p class="text-gray-400">暂无奖项记录</p>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="text-center py-12">
        <p class="text-gray-400">加载中...</p>
      </div>
    </div>

    <!-- 添加/编辑弹窗 -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="closeModal">
      <div class="bg-white rounded-2xl w-full max-w-md">
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold">{{ isEditing ? '编辑奖项' : '添加奖项' }}</h3>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">奖项名称</label>
            <input v-model="formData.title" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" placeholder="请输入奖项名称" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">级别/描述</label>
            <input v-model="formData.level" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" placeholder="如：国家级、省级、校级" />
          </div>
        </div>
        <div class="p-6 border-t flex justify-end gap-3">
          <button @click="closeModal" class="px-4 py-2 border rounded-lg hover:bg-gray-50">取消</button>
          <button @click="saveAward" class="px-4 py-2 bg-[#e63946] text-white rounded-lg hover:bg-[#d62839]">保存</button>
        </div>
      </div>
    </div>

    <!-- 删除确认弹窗 -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">确认删除</h3>
        <p class="text-gray-600 mb-6">确定要删除奖项「{{ deleteTarget?.title }}」吗？</p>
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
import { getAwards, addAward, updateAward, deleteAward, testBackend } from '@/api'

const awards = ref([])
const loading = ref(true)
const showModal = ref(false)
const showDeleteConfirm = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const deleteTarget = ref(null)

const formData = ref({
  title: '',
  level: ''
})

const loadAwards = async () => {
  loading.value = true
  awards.value = await getAwards()
  loading.value = false
}

const openAddModal = () => {
  isEditing.value = false
  editingId.value = null
  formData.value = { title: '', level: '' }
  showModal.value = true
}

const openEditModal = (award) => {
  isEditing.value = true
  editingId.value = award._id
  formData.value = { ...award }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveAward = async () => {
  try {
    if (isEditing.value) {
      await updateAward(editingId.value, formData.value)
    } else {
      await addAward(formData.value)
    }
    closeModal()
    loadAwards()
    showSuccess.value = true
    setTimeout(() => { showSuccess.value = false }, 3000)
  } catch (error) {
    console.error('保存失败:', error)
  }
}

const showSuccess = ref(false)

const confirmDelete = (award) => {
  deleteTarget.value = award
  showDeleteConfirm.value = true
}

const doDelete = async () => {
  try {
    await deleteAward(deleteTarget.value._id)
    showDeleteConfirm.value = false
    deleteTarget.value = null
    loadAwards()
    showSuccess.value = true
    setTimeout(() => { showSuccess.value = false }, 3000)
  } catch (error) {
    console.error('删除失败:', error)
  }
}

onMounted(async () => {
  await testBackend()
  loadAwards()
})
</script>
