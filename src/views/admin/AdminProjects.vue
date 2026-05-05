<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold text-black">项目管理</h2>
      <button @click="openAddModal" class="bg-[#e63946] text-white px-4 py-2 rounded-lg hover:bg-[#d62839] transition-colors flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        添加项目
      </button>
    </div>

    <!-- 项目列表 -->
    <div class="grid grid-cols-2 gap-6">
      <div 
        v-for="project in projects" :key="project._id"
        class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
      >
        <div class="h-40 bg-gray-100 overflow-hidden">
          <img v-if="project.cover" loading="lazy" :src="project.cover" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-5xl font-bold">
            {{ project.title?.charAt(0) }}
          </div>
        </div>
        <div class="p-5">
          <h3 class="font-bold text-lg mb-2">{{ project.title }}</h3>
          <div class="flex flex-wrap gap-1.5 mb-4">
            <span v-for="tech in project.techStack" :key="tech" class="text-xs px-2 py-0.5 rounded bg-red-50 text-[#e63946]">
              {{ tech }}
            </span>
          </div>
          <div class="flex gap-2">
            <button @click="openEditModal(project)" class="flex-1 text-sm border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition-colors">编辑</button>
            <button @click="confirmDelete(project)" class="flex-1 text-sm border border-red-300 text-red-500 rounded-lg py-2 hover:bg-red-50 transition-colors">删除</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="projects.length === 0 && !loading" class="text-center py-20">
      <p class="text-gray-400 text-lg">暂无项目，点击上方按钮添加</p>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="text-center py-20">
      <p class="text-gray-400">加载中...</p>
    </div>

    <!-- 添加/编辑弹窗 -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="closeModal">
      <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold">{{ isEditing ? '编辑项目' : '添加项目' }}</h3>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">项目名称</label>
            <input v-model="formData.title" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" placeholder="请输入项目名称" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">技术栈（逗号分隔）</label>
            <input v-model="techStackInput" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" placeholder="Vue, React, Node.js" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">封面图片</label>
            <div class="flex items-center gap-3">
              <div 
                class="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#e63946] transition-colors overflow-hidden"
                @click="coverInput?.click()"
                @dragover.prevent
                @drop.prevent="handleCoverDrop"
              >
                <img v-if="coverPreview" :src="coverPreview" class="w-full h-full object-cover" />
                <div v-else class="text-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-xs">点击上传</span>
                </div>
              </div>
              <div v-if="coverPreview" class="flex-1">
                <p class="text-sm text-gray-500 mb-1">已选择图片</p>
                <button @click="clearCover" class="text-sm text-red-500 hover:text-red-600">清除图片</button>
              </div>
              <div v-else class="flex-1 text-sm text-gray-500">
                支持 JPG、PNG、GIF 格式<br/>
                自动上传到云端
              </div>
            </div>
            <input 
              ref="coverInput"
              type="file" 
              accept="image/*" 
              class="hidden" 
              @change="handleCoverSelect"
            />
          </div>
          <div class="text-sm text-gray-500 -mt-2">提示：也可以直接输入图片URL</div>
          <div>
            <label class="block text-sm font-medium mb-2">GitHub链接</label>
            <input v-model="formData.github" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" placeholder="https://github.com/..." />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">项目特点（每行一条）</label>
            <textarea v-model="featuresInput" rows="4" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" placeholder="1. 特点一&#10;2. 特点二"></textarea>
          </div>
        </div>
        <div class="p-6 border-t flex justify-end gap-3">
          <button @click="closeModal" class="px-4 py-2 border rounded-lg hover:bg-gray-50">取消</button>
          <button @click="saveProject" class="px-4 py-2 bg-[#e63946] text-white rounded-lg hover:bg-[#d62839]">保存</button>
        </div>
      </div>
    </div>

    <!-- 删除确认弹窗 -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">确认删除</h3>
        <p class="text-gray-600 mb-6">确定要删除项目「{{ deleteTarget?.title }}」吗？此操作不可撤销。</p>
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
import { ref, computed, onMounted } from 'vue'
import { getProjects, addProject, updateProject, deleteProject, testBackend } from '@/api'

const projects = ref([])
const loading = ref(true)
const showModal = ref(false)
const showDeleteConfirm = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const deleteTarget = ref(null)
const coverPreview = ref('')
const coverInput = ref(null)
const uploadingCover = ref(false)

const formData = ref({
  title: '',
  cover: '',
  github: ''
})

const techStackInput = ref('')
const featuresInput = ref('')

const techStack = computed(() => 
  techStackInput.value.split(',').map(s => s.trim()).filter(Boolean)
)

const features = computed(() => 
  featuresInput.value.split('\n').map(s => s.replace(/^\d+\.\s*/, '').trim()).filter(Boolean)
)

const loadProjects = async () => {
  loading.value = true
  projects.value = await getProjects()
  loading.value = false
}

const openAddModal = () => {
  isEditing.value = false
  editingId.value = null
  formData.value = { title: '', cover: '', github: '' }
  techStackInput.value = ''
  featuresInput.value = ''
  coverPreview.value = ''
  showModal.value = true
}

const openEditModal = (project) => {
  isEditing.value = true
  editingId.value = project._id
  formData.value = { ...project }
  techStackInput.value = project.techStack?.join(', ') || ''
  featuresInput.value = project.features?.map((f, i) => `${i + 1}. ${f}`).join('\n') || ''
  coverPreview.value = project.cover || ''
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveProject = async () => {
  const data = {
    ...formData.value,
    techStack: techStack.value,
    features: features.value
  }
  
  try {
    if (isEditing.value) {
      await updateProject(editingId.value, data)
    } else {
      await addProject(data)
    }
    closeModal()
    loadProjects()
    showSuccess.value = true
    setTimeout(() => { showSuccess.value = false }, 3000)
  } catch (error) {
    console.error('保存失败:', error)
  }
}

const showSuccess = ref(false)

// 处理封面图片选择
const handleCoverSelect = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  
  uploadingCover.value = true
  try {
    const url = await uploadImageToCloud(file)
    formData.value.cover = url
    coverPreview.value = url
  } catch (error) {
    console.error('上传失败:', error)
    alert('图片上传失败，请重试')
  } finally {
    uploadingCover.value = false
  }
}

// 处理拖拽上传
const handleCoverDrop = async (e) => {
  const file = e.dataTransfer.files?.[0]
  if (!file || !file.type.startsWith('image/')) {
    alert('请拖拽图片文件')
    return
  }
  
  uploadingCover.value = true
  try {
    const url = await uploadImageToCloud(file)
    formData.value.cover = url
    coverPreview.value = url
  } catch (error) {
    console.error('上传失败:', error)
    alert('图片上传失败，请重试')
  } finally {
    uploadingCover.value = false
  }
}

// 清除封面
const clearCover = () => {
  formData.value.cover = ''
  coverPreview.value = ''
  if (coverInput.value) coverInput.value.value = ''
}

// 上传图片到图床
const uploadImageToCloud = async (file) => {
  return new Promise((resolve, reject) => {
    // 检查文件大小（限制 3MB）
    if (file.size > 3 * 1024 * 1024) {
      alert('图片大小不能超过 3MB')
      reject(new Error('图片太大'))
      return
    }
    
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        // 压缩图片
        const compressed = await compressImage(e.target.result)
        resolve(compressed)
      } catch (err) {
        // 压缩失败就用原图
        resolve(e.target.result)
      }
    }
    reader.onerror = () => {
      reject(new Error('读取文件失败'))
    }
    reader.readAsDataURL(file)
  })
}

// 压缩图片
const compressImage = async (dataUrl) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // 最大宽度/高度 800px
      let { width, height } = img
      const maxSize = 800
      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = (height / width) * maxSize
          width = maxSize
        } else {
          width = (width / height) * maxSize
          height = maxSize
        }
      }
      
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)
      
      // 压缩为 70% 质量
      resolve(canvas.toDataURL('image/jpeg', 0.7))
    }
    img.src = dataUrl
  })
}

const confirmDelete = (project) => {
  deleteTarget.value = project
  showDeleteConfirm.value = true
}

const doDelete = async () => {
  try {
    await deleteProject(deleteTarget.value._id)
    showDeleteConfirm.value = false
    deleteTarget.value = null
    loadProjects()
    showSuccess.value = true
    setTimeout(() => { showSuccess.value = false }, 3000)
  } catch (error) {
    console.error('删除失败:', error)
  }
}

onMounted(async () => {
  await testBackend() // 先测试后端连接
  loadProjects()
})
</script>
