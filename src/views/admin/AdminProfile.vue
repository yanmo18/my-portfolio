<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold text-black">个人信息</h2>
      <button @click="saveProfile" :disabled="saving" class="bg-[#e63946] text-white px-4 py-2 rounded-lg hover:bg-[#d62839] transition-colors flex items-center gap-2 disabled:opacity-50">
        <svg v-if="saving" class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ saving ? '保存中...' : '保存修改' }}
      </button>
    </div>

    <div class="bg-white rounded-2xl p-8 shadow-lg space-y-8">
      <!-- 基本信息 -->
      <div>
        <h3 class="text-lg font-bold mb-4 border-b pb-2">基本信息</h3>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium mb-2">姓名</label>
            <input v-model="formData.name" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">学历</label>
            <input v-model="formData.education" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">政治面貌</label>
            <input v-model="formData.politicalStatus" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">出生日期</label>
            <input v-model="formData.birthDate" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" />
          </div>
        </div>
      </div>

      <!-- 自我介绍 -->
      <div>
        <h3 class="text-lg font-bold mb-4 border-b pb-2">自我介绍</h3>
        <textarea v-model="formData.bio" rows="4" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent"></textarea>
      </div>

      <!-- 联系方式 -->
      <div>
        <h3 class="text-lg font-bold mb-4 border-b pb-2">联系方式</h3>
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium mb-2">微信</label>
            <input v-model="formData.contact.wechat" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">邮箱</label>
            <input v-model="formData.contact.email" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">电话</label>
            <input v-model="formData.contact.phone" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">GitHub</label>
            <input v-model="formData.contact.github" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" />
          </div>
        </div>
      </div>

      <!-- 技能 -->
      <div>
        <h3 class="text-lg font-bold mb-4 border-b pb-2">技能</h3>
        <div class="space-y-3">
          <div v-for="(skill, index) in formData.skills" :key="index" class="flex items-center gap-4">
            <input v-model="skill.name" type="text" placeholder="技能名称" class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" />
            <button @click="removeSkill(index)" class="text-red-500 hover:text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button @click="addSkill" class="text-[#e63946] hover:underline flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            添加技能
          </button>
        </div>
      </div>

      <!-- 获奖证书 -->
      <div>
        <h3 class="text-lg font-bold mb-4 border-b pb-2">获奖证书</h3>
        <div class="space-y-3">
          <div v-for="(cert, index) in formData.certifications" :key="index" class="flex items-center gap-4">
            <input v-model="cert.title" type="text" placeholder="证书名称，如：英语四级证书" class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e63946] focus:border-transparent" />
            <button @click="removeCertification(index)" class="text-red-500 hover:text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button @click="addCertification" class="text-[#e63946] hover:underline flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            添加证书
          </button>
        </div>
      </div>
    </div>

    <!-- 成功提示 -->
    <div v-if="showSuccess" class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
      保存成功！
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProfile, updateProfile, testBackend } from '@/api'

const formData = ref({
  name: '',
  education: '',
  politicalStatus: '',
  birthDate: '',
  bio: '',
  contact: {
    wechat: '',
    email: '',
    phone: '',
    github: ''
  },
  skills: [],
  certifications: []
})

const saving = ref(false)
const showSuccess = ref(false)

const addSkill = () => {
  formData.value.skills.push({ name: '' })
}

const removeSkill = (index) => {
  formData.value.skills.splice(index, 1)
}

const addCertification = () => {
  formData.value.certifications.push({ title: '' })
}

const removeCertification = (index) => {
  formData.value.certifications.splice(index, 1)
}

const saveProfile = async () => {
  saving.value = true
  try {
    await updateProfile(formData.value)
    showSuccess.value = true
    setTimeout(() => { showSuccess.value = false }, 3000)
  } catch (error) {
    console.error('保存失败:', error)
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await testBackend()
  const data = await getProfile()
  formData.value = {
    name: data.name || '',
    education: data.education || '',
    politicalStatus: data.politicalStatus || '',
    birthDate: data.birthDate || '',
    bio: data.bio || '',
    contact: {
      wechat: data.contact?.wechat || '',
      email: data.contact?.email || '',
      phone: data.contact?.phone || '',
      github: data.contact?.github || ''
    },
    skills: data.skills || [],
    certifications: data.certifications || []
  }
})
</script>
