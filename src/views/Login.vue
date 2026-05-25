<template>
  <div 
    class="min-h-screen bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center"
    @mousemove="handleMouseMove"
    ref="containerRef"
  >
  <!-- 最外层 容器，@mousemove 监听鼠标移动事件,ref绑定一个引用，方便获取元素信息 -->
    <!-- 动态边框背景 -->
    <div class="login-wrapper">
      <div 
        class="border-frame"
        :style="{
          transform: `translate(${mouseOffset.x * 0.02}px, ${mouseOffset.y * 0.02}px)`
        }"
      >
        <div class="corner tl"></div>
        <div class="corner tr"></div>
        <div class="corner bl"></div>
        <div class="corner br"></div>
      </div>
      
      <!-- 登录卡片 -->
      <div 
        class="login-card"
        :style="{
          transform: `translate(${mouseOffset.x * 0.01}px, ${mouseOffset.y * 0.01}px)`
        }"
      >
        <div class="gradient-border">
          <div class="card-content">
            <!-- 标题 -->
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 class="text-2xl font-bold text-gray-800" style="font-family: 'Georgia', serif;">管理后台</h1>
              <p class="text-gray-500 text-sm mt-2">请输入管理员凭证登录</p>
            </div>

            <!-- 登录表单 -->
            <form @submit.prevent="handleLogin" class="space-y-5">
              <!-- 用户名 -->
              <div class="relative">
                <input
                  v-model="form.username"
                  type="text"
                  placeholder="用户名"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                />
              </div>

              <!-- 密码 -->
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="密码"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all pr-12"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>

              <!-- 错误提示 -->
              <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>

              <!-- 登录按钮 -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading" class="flex items-center justify-center gap-2">
                  <svg class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  登录中...
                </span>
                <span v-else>登 录</span>
              </button>
            </form>

            <!-- 返回首页 -->
            <div class="mt-6 text-center">
              <router-link 
                to="/" 
                class="text-gray-500 hover:text-red-500 text-sm transition-colors flex items-center justify-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回首页
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 背景装饰 -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute diamond-float-1 w-3 h-3 bg-red-400/20 rotate-45" style="top: 10%; left: 5%;"></div>
      <div class="absolute diamond-float-2 w-2 h-2 bg-red-500/30 rotate-45" style="top: 20%; right: 10%;"></div>
      <div class="absolute diamond-float-3 w-4 h-4 bg-red-400/15 rotate-45" style="top: 60%; left: 8%;"></div>
      <div class="absolute diamond-float-1 w-2 h-2 bg-red-500/25 rotate-45" style="top: 80%; right: 5%;"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  username: '',
  password: ''
})

const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const mouseOffset = ref({ x: 0, y: 0 })
const containerRef = ref(null)

// 管理员凭证（简单硬编码，实际可用环境变量）
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'Fernoa@2024'
}

let animationFrame = null

const handleMouseMove = (e) => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    mouseOffset.value = {
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2
    }
  }
}

const handleLogin = async () => {
  error.value = ''
  
  if (!form.username || !form.password) {
    error.value = '请输入用户名和密码'
    return
  }

  loading.value = true

  // 模拟登录请求
  await new Promise(resolve => setTimeout(resolve, 800))

  if (form.username === ADMIN_CREDENTIALS.username && form.password === ADMIN_CREDENTIALS.password) {
    localStorage.setItem('admin_token', 'authenticated')
    router.push('/admin')
  } else {
    error.value = '用户名或密码错误'
  }

  loading.value = false
}

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>

<style scoped>
.login-wrapper {
  position: relative;
  width: 420px;
  height: 520px;
  padding: 20px;
}

/* 双层镂空边框容器 */
.border-frame {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 外层 - 红色边框 */
.border-frame::before {
  content: '';
  position: absolute;
  width: 450px;
  height: 550px;
  border: 3px solid transparent;
  border-top-color: #e63946;
  border-right-color: #e63946;
  border-bottom-color: #c1121f;
  border-left-color: #c1121f;
  border-radius: 20px;
  animation: rotateOuter 20s linear infinite;
  filter: drop-shadow(0 0 8px rgba(230, 57, 70, 0.4));
}

/* 内层 - 橙色边框 */
.border-frame::after {
  content: '';
  position: absolute;
  width: 380px;
  height: 490px;
  border: 3px solid transparent;
  border-top-color: #61d4f4;
  border-right-color: #61d9f4;
  border-bottom-color: #5192e7;
  border-left-color: #5179e7;
  border-radius: 16px;
  animation: rotateInner 15s linear infinite reverse;
  filter: drop-shadow(0 0 8px rgba(166, 97, 244, 0.4));
}

@keyframes rotateOuter {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes rotateInner {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 四角装饰 - 镂空边框样式 */
.corner {
  position: absolute;
  width: 28px;
  height: 28px;
  border: 3px solid #e63946;
  background: transparent;
  z-index: 10;
  animation: cornerColorShift 10s linear infinite;
}

@keyframes cornerColorShift {
  0% { border-color: #e63946; }
  33% { border-color: #c1121f; }
  66% { border-color: #ff6b6b; }
  100% { border-color: #e63946; }
}

.corner.tl { top: -3px; left: -3px; border-right: none; border-bottom: none; border-radius: 10px 0 0 0; }
.corner.tr { top: -3px; right: -3px; border-left: none; border-bottom: none; border-radius: 0 10px 0 0; }
.corner.bl { bottom: -3px; left: -3px; border-right: none; border-top: none; border-radius: 0 0 0 10px; }
.corner.br { bottom: -3px; right: -3px; border-left: none; border-top: none; border-radius: 0 0 10px 0; }

/* 登录卡片 */
.login-card {
  position: relative;
  z-index: 1;
  transition: transform 0.15s ease-out;
}

.gradient-border {
  background: white;
  border-radius: 20px;
  padding: 2px;
  box-shadow: 0 10px 40px -10px rgba(230, 57, 70, 0.15), 
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.card-content {
  background: white;
  border-radius: 18px;
  padding: 40px;
}

/* 输入框焦点效果 */
input:focus {
  box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.1);
}

/* 背景菱形动画 */
.diamond-float-1 { animation: float1 6s ease-in-out infinite; }
.diamond-float-2 { animation: float2 8s ease-in-out infinite; }
.diamond-float-3 { animation: float3 7s ease-in-out infinite; }

@keyframes float1 {
  0%, 100% { transform: translateY(0) rotate(45deg); }
  50% { transform: translateY(-20px) rotate(45deg); }
}

@keyframes float2 {
  0%, 100% { transform: translateY(0) rotate(45deg); }
  50% { transform: translateY(-15px) rotate(45deg); }
}

@keyframes float3 {
  0%, 100% { transform: translateY(0) rotate(45deg); }
  50% { transform: translateY(-25px) rotate(45deg); }
}
</style>
