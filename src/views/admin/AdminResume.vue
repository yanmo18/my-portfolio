<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold text-black">简历管理</h2>
    </div>

    <div class="bg-white rounded-2xl p-8 shadow-lg">
      <div class="text-center">
        <!-- 当前简历状态 -->
        <div v-if="resumeUrl" class="mb-8">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            简历已上传
          </div>
          <p class="text-gray-500 mb-4">{{ resumeName }}</p>
        </div>

        <!-- 上传区域 -->
        <div 
          class="border-2 border-dashed rounded-2xl p-12 mb-8 transition-colors"
          :class="isDragging ? 'border-[#e63946] bg-red-50' : 'border-gray-300 hover:border-[#e63946]'"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleDrop"
        >
          <input ref="fileInput" type="file" accept=".pdf" class="hidden" @change="handleFileSelect" />
          <div class="cursor-pointer" @click="$refs.fileInput.click()">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="text-lg text-gray-600 mb-2">
              <span class="text-[#e63946]">点击上传</span> 或拖拽 PDF 文件到此处
            </p>
            <p class="text-sm text-gray-400">支持 PDF 格式，大小不超过 10MB</p>
          </div>
        </div>

        <!-- 上传按钮 -->
        <button 
          @click="uploadResume" 
          :disabled="!selectedFile || uploading"
          class="bg-[#e63946] text-white px-8 py-3 rounded-lg hover:bg-[#d62839] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
        >
          <svg v-if="uploading" class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ uploading ? '上传中...' : '上传简历' }}
        </button>

        <!-- 上传进度 -->
        <div v-if="uploading" class="mt-4 w-64 mx-auto">
          <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-[#e63946] transition-all duration-300" :style="{ width: `${uploadProgress}%` }"></div>
          </div>
          <p class="text-sm text-gray-500 mt-2">{{ uploadProgress }}%</p>
        </div>
      </div>
    </div>

    <!-- 提示信息 -->
    <div class="mt-6 p-4 bg-blue-50 rounded-xl">
      <h4 class="font-medium text-blue-700 mb-2">上传说明</h4>
      <ul class="text-sm text-blue-600 space-y-1">
        <li>• 请上传 PDF 格式的简历文件</li>
        <li>• 文件大小建议不超过 10MB</li>
        <li>• 上传后会在首页左侧栏显示下载按钮</li>
        <li>• 多次上传会替换原有简历</li>
      </ul>
    </div>

    <!-- 成功提示 -->
    <div v-if="showSuccess" class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
      上传成功！
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { uploadResume as uploadResumeApi } from '@/api'

const fileInput = ref(null)
const selectedFile = ref(null)
const resumeUrl = ref('')
const resumeName = ref('')
const uploading = ref(false)
const uploadProgress = ref(0)
const isDragging = ref(false)
const showSuccess = ref(false)

const handleFileSelect = (e) => {
  const file = e.target.files[0]
  if (file) {
    validateAndSetFile(file)
  }
}

const handleDrop = (e) => {
  isDragging.value = false
  const file = e.dataTransfer.files[0]
  if (file && file.type === 'application/pdf') {
    validateAndSetFile(file)
  }
}

const validateAndSetFile = (file) => {
  if (file.size > 10 * 1024 * 1024) {
    alert('文件大小不能超过 10MB')
    return
  }
  selectedFile.value = file
}

const uploadResume = async () => {
  if (!selectedFile.value) return

  uploading.value = true
  uploadProgress.value = 0

  // 模拟上传进度
  const progressInterval = setInterval(() => {
    uploadProgress.value = Math.min(uploadProgress.value + 10, 90)
  }, 200)

  try {
    const result = await uploadResumeApi(selectedFile.value)
    const resumeData = result.data || result
    resumeUrl.value = resumeData.url || resumeData
    resumeName.value = selectedFile.value.name
    uploadProgress.value = 100
    
    showSuccess.value = true
    setTimeout(() => { showSuccess.value = false }, 3000)
    
    // 清空已选文件
    selectedFile.value = null
    if (fileInput.value) fileInput.value.value = ''
    
    // 3秒后自动跳转到首页
    setTimeout(() => {
      window.location.href = '/'
    }, 2000)
  } catch (error) {
    console.error('上传失败:', error)
    alert('上传失败，请重试')
  } finally {
    clearInterval(progressInterval)
    uploading.value = false
    uploadProgress.value = 0
  }
}
</script>
