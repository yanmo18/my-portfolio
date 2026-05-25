<template>
  <div class="login-page" ref="pageRef" @mousemove="handleMouseMove">
    <!-- 旋转方框背景 -->
    <div class="gradient-border" :style="gradientBorderStyle">
      <div class="inner-content">
        <!-- 登录卡片 -->
        <div class="login-card">
          <!-- 锁形图标 -->
          <div class="icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="white" stroke-width="2"/>
              <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="white" stroke-width="2" stroke-linecap="round"/>
              <circle cx="12" cy="16" r="1.5" fill="white"/>
            </svg>
          </div>

          <!-- 标题 -->
          <h2 class="title">管理后台</h2>
          <p class="subtitle">请输入管理员凭证登录</p>

          <!-- 输入框 -->
          <form @submit.prevent="handleLogin">
            <div class="input-group">
              <input
                v-model="username"
                type="text"
                placeholder="用户名"
                class="input"
              />
            </div>
            <div class="input-group">
              <input
                v-model="password"
                type="password"
                placeholder="密码"
                class="input"
              />
            </div>

            <!-- 错误提示 -->
            <p v-if="error" class="error">{{ error }}</p>

            <!-- 登录按钮 -->
            <button type="submit" class="login-btn">登录</button>
          </form>

          <!-- 返回首页 -->
          <router-link to="/" class="back-link">
            <span class="back-arrow">←</span>
            返回首页
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('admin')
const password = ref('')
const error = ref('')

// 鼠标位置
const mouseX = ref(50)
const mouseY = ref(50)
const pageRef = ref(null)

// 旋转角度
const rotation = ref(0)
let animationId = null

onMounted(() => {
  const animate = () => {
    rotation.value = (rotation.value + 0.5) % 360
    animationId = requestAnimationFrame(animate)
  }
  animate()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})

const handleMouseMove = (e) => {
  if (!pageRef.value) return
  
  const rect = pageRef.value.getBoundingClientRect()
  mouseX.value = ((e.clientX - rect.left) / rect.width) * 100
  mouseY.value = ((e.clientY - rect.top) / rect.height) * 100
}

const gradientBorderStyle = computed(() => ({
  background: `conic-gradient(
    from ${rotation.value}deg,
    #e63946 0deg,
    #ff6b6b 90deg,
    #e63946 180deg,
    #c1121f 270deg,
    #e63946 360deg
  )`,
  '--mouse-x': `${mouseX.value}%`,
  '--mouse-y': `${mouseY.value}%`
}))

const handleLogin = () => {
  error.value = ''
  
  if (username.value !== 'admin') {
    error.value = '用户名不正确'
    return
  }
  
  if (password.value !== 'Fernoa@2024') {
    error.value = '密码不正确'
    return
  }

  localStorage.setItem('isAuthenticated', 'true')
  router.push('/admin')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background-color: #faf7f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow: hidden;
  perspective: 1000px;
}

/* 旋转渐变边框容器 */
.gradient-border {
  position: relative;
  padding: 3px;
  border-radius: 20px;
  animation: rotate-gradient 8s linear infinite;
  box-shadow: 
    0 0 40px rgba(230, 57, 70, 0.2),
    0 0 80px rgba(230, 57, 70, 0.1);
  transform-style: preserve-3d;
}

@keyframes rotate-gradient {
  from {
    background: conic-gradient(
      from 0deg,
      #e63946 0deg,
      #ff6b6b 90deg,
      #e63946 180deg,
      #c1121f 270deg,
      #e63946 360deg
    );
  }
  to {
    background: conic-gradient(
      from 360deg,
      #e63946 0deg,
      #ff6b6b 90deg,
      #e63946 180deg,
      #c1121f 270deg,
      #e63946 360deg
    );
  }
}

/* 内容区域 */
.inner-content {
  background: #faf7f5;
  border-radius: 17px;
  padding: 40px;
}

/* 登录卡片 */
.login-card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  text-align: center;
  transform: translate(
    calc((var(--mouse-x) - 50%) * -0.03px),
    calc((var(--mouse-y) - 50%) * -0.03px)
  );
  transition: transform 0.15s ease-out;
}

/* 锁形图标 */
.icon-wrapper {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #e63946, #c1121f);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 4px 15px rgba(230, 57, 70, 0.3);
}

.icon-wrapper svg {
  width: 32px;
  height: 32px;
}

/* 标题 */
.title {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px;
}

.subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 30px;
}

/* 输入框 */
.input-group {
  margin-bottom: 16px;
}

.input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 15px;
  color: #1a1a1a;
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.input::placeholder {
  color: #9ca3af;
}

.input:focus {
  outline: none;
  border-color: #e63946;
  box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.1);
}

/* 错误提示 */
.error {
  color: #e63946;
  font-size: 13px;
  margin: 0 0 16px;
  text-align: left;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #e63946, #c1121f);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  margin-bottom: 20px;
}

.login-btn:hover {
  background: linear-gradient(135deg, #c1121f, #a4131e);
  transform: translateY(-1px);
}

.login-btn:active {
  transform: translateY(0);
}

/* 返回链接 */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.back-link:hover {
  color: #e63946;
}

.back-arrow {
  font-size: 16px;
}

/* 响应式 */
@media (max-width: 500px) {
  .inner-content {
    padding: 20px;
  }
  
  .login-card {
    padding: 30px 24px;
  }
}
</style>
