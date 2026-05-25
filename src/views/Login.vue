<template>
  <div class="login-page" ref="pageRef">
    <!-- 旋转线条背景 -->
    <div class="rotating-rings" :style="ringsStyle">
      <div class="ring ring-outer" :style="outerRingStyle"></div>
      <div class="ring ring-middle" :style="middleRingStyle"></div>
      <div class="ring ring-inner" :style="innerRingStyle"></div>
    </div>

    <!-- 登录卡片 -->
    <div 
      class="login-card" 
      :style="cardStyle"
      @mouseenter="handleMouseEnter"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
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
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('admin')
const password = ref('')
const error = ref('')

// 鼠标位置
const mouseX = ref(0)
const mouseY = ref(0)
const isHovering = ref(false)
const pageRef = ref(null)

// 卡片偏移
const cardOffset = ref({ x: 0, y: 0 })

// 渐变色角度（用于旋转变色）
const hueAngle = ref(0)
let hueAnimation = null

// 渐变色计算
const gradientStyle = computed(() => {
  const baseAngle = hueAngle.value
  const intensity = isHovering.value ? 1.5 : 1
  return {
    outerRing: `
      linear-gradient(${baseAngle}deg, 
        #e63946 0%, 
        #ff6b6b 25%, 
        #e63946 50%, 
        #c1121f 75%, 
        #e63946 100%)
    `,
    middleRing: `
      linear-gradient(${baseAngle + 120}deg, 
        #f4a261 0%, 
        #ffd166 33%, 
        #f4a261 66%, 
        #e76f51 100%)
    `,
    innerRing: `
      linear-gradient(${baseAngle + 240}deg, 
        #e63946 0%, 
        #ff9a9e 30%, 
        #e63946 60%, 
        #c1121f 100%)
    `
  }
})

// 鼠标跟随效果
const handleMouseEnter = () => {
  isHovering.value = true
  // 开始颜色动画
  if (!hueAnimation) {
    const animate = () => {
      hueAngle.value = (hueAngle.value + 1) % 360
      hueAnimation = requestAnimationFrame(animate)
    }
    animate()
  }
}

const handleMouseMove = (e) => {
  if (!pageRef.value) return
  
  const rect = pageRef.value.getBoundingClientRect()
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  mouseX.value = (e.clientX - rect.left - centerX) / centerX
  mouseY.value = (e.clientY - rect.top - centerY) / centerY

  // 卡片跟随偏移
  const maxOffset = 15
  cardOffset.value = {
    x: mouseX.value * maxOffset,
    y: mouseY.value * maxOffset
  }
}

const handleMouseLeave = () => {
  isHovering.value = false
  cardOffset.value = { x: 0, y: 0 }
  // 停止颜色动画
  if (hueAnimation) {
    cancelAnimationFrame(hueAnimation)
    hueAnimation = null
  }
}

// 卡片样式
const cardStyle = computed(() => ({
  transform: `translate(${cardOffset.value.x}px, ${cardOffset.value.y}px)`,
  transition: isHovering.value ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
}))

// 外层圆环样式
const outerRingStyle = computed(() => ({
  width: '520px',
  height: '520px',
  background: gradientStyle.value.outerRing,
  animation: isHovering.value ? 'rotate-outer 15s linear infinite' : 'rotate-outer 25s linear infinite'
}))

// 中层圆环样式
const middleRingStyle = computed(() => ({
  width: '460px',
  height: '460px',
  background: gradientStyle.value.middleRing,
  animation: isHovering.value ? 'rotate-middle 20s linear infinite reverse' : 'rotate-middle 30s linear infinite reverse'
}))

// 内层圆环样式
const innerRingStyle = computed(() => ({
  width: '400px',
  height: '400px',
  background: gradientStyle.value.innerRing,
  animation: isHovering.value ? 'rotate-inner 18s linear infinite' : 'rotate-inner 28s linear infinite'
}))

// 背景整体偏移
const ringsStyle = computed(() => ({
  transform: `translate(${cardOffset.value.x * 0.3}px, ${cardOffset.value.y * 0.3}px)`,
  transition: 'transform 0.15s ease-out'
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
  position: relative;
  overflow: hidden;
}

/* 旋转线条背景 */
.rotating-rings {
  position: absolute;
  width: 600px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease-out;
}

.ring {
  position: absolute;
  border-radius: 50%;
  border: 3px solid transparent;
  background-clip: padding-box;
  opacity: 0.85;
  filter: drop-shadow(0 0 8px rgba(230, 57, 70, 0.3));
}

/* 外层 - 红色系 */
.ring-outer {
  border: 3px solid;
  background-clip: border-box;
}

/* 中层 - 橙色系 */
.ring-middle {
  border: 3px solid;
  background-clip: border-box;
}

/* 内层 - 红色渐变 */
.ring-inner {
  border: 3px solid;
  background-clip: border-box;
}

@keyframes rotate-outer {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotate-middle {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotate-inner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 登录卡片 */
.login-card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;
  text-align: center;
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
@media (max-width: 600px) {
  .login-card {
    padding: 30px 24px;
  }

  .rotating-rings {
    width: 400px;
    height: 400px;
  }

  .ring-outer {
    width: 360px;
    height: 360px;
  }

  .ring-middle {
    width: 310px;
    height: 310px;
  }

  .ring-inner {
    width: 260px;
    height: 260px;
  }
}
</style>
