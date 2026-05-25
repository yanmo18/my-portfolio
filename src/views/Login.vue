<template>
  <div class="login-page">
    <!-- 旋转线条背景 -->
    <div class="rotating-rings">
      <div class="ring ring-outer"></div>
      <div class="ring ring-inner"></div>
    </div>

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
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('admin')
const password = ref('')
const error = ref('')

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
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring {
  position: absolute;
  border: 2px solid;
  opacity: 0.6;
}

/* 外层 - 红色，45° 倾斜 */
.ring-outer {
  width: 380px;
  height: 380px;
  border-color: #e63946;
  transform: rotate(45deg);
  animation: rotate-outer 25s linear infinite;
}

/* 内层 - 橙色，-30° 倾斜，更慢 */
.ring-inner {
  width: 320px;
  height: 320px;
  border-color: #f4a261;
  transform: rotate(-30deg);
  animation: rotate-inner 35s linear infinite;
}

/* 外层反向旋转 */
@keyframes rotate-outer {
  from {
    transform: rotate(45deg);
  }
  to {
    transform: rotate(405deg);
  }
}

/* 内层正向旋转，更慢 */
@keyframes rotate-inner {
  from {
    transform: rotate(-30deg);
  }
  to {
    transform: rotate(330deg);
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
  transition: background 0.2s;
  margin-bottom: 20px;
}

.login-btn:hover {
  background: linear-gradient(135deg, #c1121f, #a4131e);
}

.login-btn:active {
  transform: none;
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
@media (max-width: 480px) {
  .login-card {
    padding: 30px 24px;
  }

  .rotating-rings {
    width: 350px;
    height: 350px;
  }

  .ring-outer {
    width: 280px;
    height: 280px;
  }

  .ring-inner {
    width: 230px;
    height: 230px;
  }
}
</style>
