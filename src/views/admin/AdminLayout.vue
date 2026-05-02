<template>
  <div class="min-h-screen bg-[#FAF8F5]">
    <!-- 顶部导航 -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-black">管理后台</h1>
        <router-link to="/" class="text-[#e63946] hover:underline flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          返回首页
        </router-link>
      </div>
    </header>

    <div class="flex max-w-7xl mx-auto px-6 py-6">
      <!-- 右侧固定导航栏 - 悬浮在背景上 -->
      <nav class="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1">
        <!-- 垂直虚线 + 菱形标记 -->
        <div class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0">
          <div class="w-px h-full bg-gray-300 border-dashed"></div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#e63946] rotate-45"></div>
        </div>
        
        <!-- 导航图标 -->
        <router-link 
          v-for="item in menuItems" :key="item.path"
          :to="item.path"
          class="relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
          :class="$route.path === item.path 
            ? 'bg-[#e63946] text-white shadow-lg scale-110' 
            : 'bg-white text-gray-500 hover:bg-[#e63946] hover:text-white shadow'"
          :title="item.label"
        >
          <span class="text-lg">{{ item.icon }}</span>
        </router-link>
      </nav>

      <!-- 中间内容卡片 -->
      <main class="flex-1 min-w-0">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
const menuItems = [
  { path: '/admin/projects', label: '项目管理', icon: '📁' },
  { path: '/admin/profile', label: '个人信息', icon: '👤' },
  { path: '/admin/awards', label: '奖项证书', icon: '🏆' },
  { path: '/admin/experience', label: '在校经历', icon: '📅' },
  { path: '/admin/resume', label: '简历管理', icon: '📄' }
]
</script>
