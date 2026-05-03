<template>
  <div class="min-h-screen bg-[#FAF8F5] relative overflow-hidden">
    
    <!-- 浮动菱形装饰 -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute diamond-float-1 w-3 h-3 bg-red-400/30 rotate-45" style="top: 5%; left: 2%;"></div>
      <div class="absolute diamond-float-2 w-2 h-2 bg-red-500/40 rotate-45" style="top: 12%; right: 5%;"></div>
      <div class="absolute diamond-float-3 w-4 h-4 bg-red-400/20 rotate-45" style="top: 20%; left: 4%;"></div>
      <div class="absolute diamond-float-1 w-2 h-2 bg-red-500/30 rotate-45" style="top: 28%; right: 3%;"></div>
      <div class="absolute diamond-float-2 w-3 h-3 bg-red-400/25 rotate-45" style="top: 35%; left: 6%;"></div>
      <div class="absolute diamond-float-3 w-2 h-2 bg-red-500/35 rotate-45" style="top: 42%; right: 6%;"></div>
      <div class="absolute diamond-float-1 w-4 h-4 bg-red-400/15 rotate-45" style="top: 50%; left: 2%;"></div>
      <div class="absolute diamond-float-2 w-2 h-2 bg-red-500/25 rotate-45" style="top: 58%; right: 4%;"></div>
      <div class="absolute diamond-float-3 w-3 h-3 bg-red-400/30 rotate-45" style="top: 65%; left: 5%;"></div>
      <div class="absolute diamond-float-1 w-2 h-2 bg-red-500/20 rotate-45" style="top: 72%; right: 7%;"></div>
      <div class="absolute diamond-float-2 w-3 h-3 bg-red-400/25 rotate-45" style="top: 80%; right: 3%;"></div>
      <div class="absolute diamond-float-3 w-2 h-2 bg-red-500/30 rotate-45" style="bottom: 10%; left: 3%;"></div>
      <div class="absolute diamond-float-1 w-4 h-4 bg-red-400/20 rotate-45" style="bottom: 18%; right: 5%;"></div>
      <div class="absolute diamond-float-2 w-2 h-2 bg-red-500/35 rotate-45" style="bottom: 25%; left: 7%;"></div>
      <div class="absolute diamond-float-3 w-3 h-3 bg-red-400/25 rotate-45" style="top: 8%; left: 10%;"></div>
      <div class="absolute diamond-float-1 w-2 h-2 bg-red-500/30 rotate-45" style="top: 18%; right: 12%;"></div>
      <div class="absolute diamond-float-2 w-3 h-3 bg-red-400/20 rotate-45" style="top: 38%; left: 3%;"></div>
      <div class="absolute diamond-float-3 w-2 h-2 bg-red-500/25 rotate-45" style="top: 48%; right: 8%;"></div>
      <div class="absolute diamond-float-1 w-4 h-4 bg-red-400/30 rotate-45" style="top: 55%; left: 8%;"></div>
      <div class="absolute diamond-float-2 w-2 h-2 bg-red-500/35 rotate-45" style="top: 68%; right: 12%;"></div>
      <div class="absolute diamond-float-3 w-3 h-3 bg-red-400/25 rotate-45" style="top: 78%; left: 4%;"></div>
      <div class="absolute diamond-float-1 w-2 h-2 bg-red-500/20 rotate-45" style="bottom: 8%; right: 10%;"></div>
      <div class="absolute diamond-float-2 w-3 h-3 bg-red-400/30 rotate-45" style="bottom: 30%; left: 10%;"></div>
      <div class="absolute diamond-float-3 w-2 h-2 bg-red-500/25 rotate-45" style="top: 15%; left: 6%;"></div>
    </div>

    <!-- 移动端顶部导航 -->
    <header class="md:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-50 px-4 py-3 flex items-center justify-between">
      <h1 class="font-bold text-lg">{{ profile.name || '张雅岚' }}</h1>
      <div class="flex items-center gap-3">
        <button @click="toggleLang" class="px-3 py-1 text-sm border border-gray-300 rounded-full">
          {{ locale === 'zh' ? 'EN' : '中' }}
        </button>
        <button @click="showMobileNav = true" class="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>

    <!-- 移动端遮罩 -->
    <div v-if="showMobileNav" @click="showMobileNav = false" class="md:hidden fixed inset-0 bg-black/50 z-40"></div>

    <!-- 移动端抽屉 -->
    <aside 
      class="md:hidden fixed left-0 top-0 h-full w-72 z-50 transition-transform duration-300"
      :class="showMobileNav ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="bg-white h-full shadow-2xl p-6 overflow-y-auto">
        <button @click="showMobileNav = false" class="mb-4 text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div class="flex flex-col items-center">
          <div class="w-28 h-28 rounded-full border-2 border-[#e63946] p-1 mb-4">
            <img src="/张雅岚202302030319.jpg" :alt="profile.name" class="w-full h-full rounded-full object-cover" />
          </div>
          <h1 class="text-lg font-bold text-black mb-1">{{ profile.name }}</h1>
          <span class="text-[#e63946] text-sm mb-4">前端开发者</span>
          <div class="w-full h-px bg-gray-200 mb-4"></div>
          <div class="w-full space-y-2 text-sm">
            <div class="flex justify-between"><span class="text-black font-medium">学历:</span><span class="text-gray-400">{{ profile.education }}</span></div>
            <div class="flex justify-between"><span class="text-black font-medium">政治面貌:</span><span class="text-gray-400">{{ profile.politicalStatus }}</span></div>
          </div>
        </div>
      </div>
    </aside>

    <!-- 左侧固定信息卡片 -->
    <aside class="hidden md:block fixed left-14 top-1/2 -translate-y-1/2 w-[364px] h-[600px] z-40">
      <div class="bg-white rounded-2xl shadow-lg h-full flex flex-col border border-gray-100" style="box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);">
        
        <!-- 头像区域 -->
        <div class="pt-5 pb-3 px-6 bg-white shrink-0">
          <div class="flex justify-center mb-2">
            <div class="w-24 h-24 rounded-full border-4 border-red-400 p-0.5 hover:scale-105 hover:border-red-500 transition-all duration-300 shadow-md overflow-hidden">
              <img loading="lazy" :src="'/张雅岚202302030319.jpg'" :alt="profile.name + '的头像'" class="w-full h-full rounded-full object-cover" />
            </div>
          </div>
          <div class="text-center">
            <h1 class="text-xl font-bold text-gray-800">{{ profile.name }}</h1>
            <span class="inline-block mt-1 px-2.5 py-0.5 bg-gradient-to-r from-red-400 to-red-500 text-white text-xs rounded-full">前端开发者</span>
          </div>
        </div>

        <!-- 基本信息区域 -->
        <div class="px-6 space-y-2">
          <!-- 基础信息 -->
          <div>
            <div class="w-full h-px bg-gray-200 mb-2"></div>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between items-center">
                <span class="text-gray-500">学历</span>
                <span class="text-gray-700 font-medium">{{ profile.education }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-500">政治面貌</span>
                <span class="text-gray-700 font-medium">{{ profile.politicalStatus }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-500">出生日期</span>
                <span class="text-gray-700 font-medium">2004.11.13</span>
              </div>
            </div>
          </div>

          <!-- 联系方式 -->
          <div>
            <div class="w-full h-px bg-gray-200 mb-2"></div>
            <div class="space-y-1.5 text-xs">
              <div class="flex items-center gap-2 text-gray-600">
                <span class="w-4 text-center shrink-0">💬</span>
                <span class="truncate">{{ profile.contact?.wechat || 'Seren450' }}</span>
              </div>
              <div class="flex items-center gap-2 text-gray-600">
                <span class="w-4 text-center shrink-0">📧</span>
                <span class="truncate">yanqing@outlook.com</span>
              </div>
              <div class="flex items-center gap-2 text-gray-600">
                <span class="w-4 text-center shrink-0">📱</span>
                <span class="truncate">17377665272</span>
              </div>
              <div class="flex items-center gap-2 text-gray-600">
                <span class="w-4 text-center shrink-0">🐙</span>
                <span class="truncate">github.com/zhangyalanzyl</span>
              </div>
            </div>
          </div>

          <!-- 技能区域 -->
          <div>
            <div class="w-full h-px bg-gray-200 mb-2"></div>
            <div class="overflow-hidden">
              <div class="flex animate-marquee whitespace-nowrap">
                <span 
                  v-for="skill in profile.skills" 
                  :key="skill.name + '-1'"
                  class="inline-flex items-center px-3 py-1 bg-gradient-to-r from-red-400 to-red-500 text-white text-xs font-medium rounded-full mr-2"
                >
                  {{ skill.name }}
                </span>
                <!-- 重复一份实现无缝滚动 -->
                <span 
                  v-for="skill in profile.skills" 
                  :key="skill.name + '-2'"
                  class="inline-flex items-center px-3 py-1 bg-gradient-to-r from-red-400 to-red-500 text-white text-xs font-medium rounded-full mr-2"
                >
                  {{ skill.name }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 下载简历按钮 -->
        <div class="px-6 pt-5 pb-3 bg-white shrink-0">
          <button 
            v-if="resumeUrl"
            @click="downloadResume"
            class="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg font-medium text-sm hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>
            {{ $t('hero.downloadResume') }}
          </button>
          <router-link 
            v-else
            to="/admin/resume"
            class="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg font-medium text-sm hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
            上传简历
          </router-link>
        </div>
      </div>
    </aside>

    <!-- 右侧固定导航栏 - 悬浮在背景上 -->
    <nav class="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1">
      <!-- 垂直虚线 + 菱形标记 -->
      <div class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0">
        <div class="w-px h-full bg-gray-300 border-dashed"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#e63946] rotate-45"></div>
      </div>
      
      <!-- 导航图标 -->
      <button 
        v-for="(item, index) in navItems" :key="item.id"
        @click="scrollTo(item.id)"
        class="relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
        :class="activeSection === item.id 
          ? 'bg-[#e63946] text-white shadow-lg scale-110' 
          : 'bg-white text-gray-500 hover:bg-[#e63946] hover:text-white shadow'"
        :title="item.label"
      >
        <span class="text-lg">{{ item.icon }}</span>
      </button>

      <!-- 分隔线 -->
      <div class="w-full h-px bg-gray-200 my-2"></div>

      <!-- 设置按钮 -->
      <router-link 
        to="/admin"
        class="relative z-10 w-10 h-10 rounded-full bg-white text-gray-500 flex items-center justify-center shadow hover:bg-gray-100 transition-colors"
        title="管理后台"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </router-link>

      <!-- 语言切换 -->
      <button 
        @click="toggleLang"
        class="relative z-10 w-10 h-10 rounded-full bg-white text-gray-500 flex items-center justify-center shadow hover:bg-gray-100 transition-colors"
        title="切换语言"
      >
        <span class="text-xs font-bold">{{ locale === 'zh' ? 'EN' : '中' }}</span>
      </button>

      <!-- 后端连接状态 -->
      <div class="relative z-10 w-10 h-10 rounded-full flex items-center justify-center" :title="backendStatus === 'success' ? '后端已连接' : backendStatus === 'failed' ? '使用本地数据' : '连接中...'">
        <span v-if="backendStatus === 'success'" class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
        <span v-else-if="backendStatus === 'failed'" class="w-3 h-3 rounded-full bg-yellow-500"></span>
        <span v-else class="w-3 h-3 rounded-full bg-gray-400 animate-pulse"></span>
      </div>

      <!-- 回到顶部 -->
      <button 
        v-if="showBackToTop"
        @click="scrollToTop"
        class="relative z-10 w-10 h-10 rounded-full bg-white text-gray-500 flex items-center justify-center shadow hover:bg-gray-100 transition-all duration-300"
        title="回到顶部"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </nav>

    <!-- 右侧电梯导航（移动端显示在内容底部） -->
    <nav class="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg">
      <button 
        v-for="item in navItems" :key="item.id"
        @click="scrollTo(item.id)"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="activeSection === item.id ? 'bg-[#e63946] scale-125' : 'bg-gray-400 hover:bg-[#e63946]'"
      ></button>
    </nav>

    <!-- 中间主内容区 -->
    <main class="md:ml-[420px] md:mr-24 pt-16 md:pt-0">
      <div class="p-4 md:p-8 space-y-6 md:space-y-8">

        <!-- 关于我 -->
        <section id="about" ref="aboutRef" class="scroll-mt-10 transition-all duration-700"
          :class="aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'">
          <div class="bg-white rounded-2xl p-6 md:p-10 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-500">
            <h2 class="text-2xl md:text-4xl font-bold text-gray-800 mb-2" style="font-family: 'Georgia', serif;">{{ $t('about.title') }}</h2>
            <div class="w-12 md:w-16 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded mb-6 md:mb-8"></div>
            <p class="text-gray-600 text-sm md:text-base leading-relaxed">{{ profile.bio }}</p>
          </div>
        </section>

        <!-- 获奖证书 -->
        <section id="awards" ref="awardsRef" class="scroll-mt-10 transition-all duration-700"
          :class="awardsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'">
          <div class="bg-white rounded-2xl p-6 md:p-10 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-500">
            <h2 class="text-2xl md:text-4xl font-bold text-gray-800 mb-2" style="font-family: 'Georgia', serif;">{{ $t('nav.awards') }}</h2>
            <div class="w-12 md:w-16 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded mb-6 md:mb-8"></div>
            <div v-if="awards.length > 0" class="space-y-3 md:space-y-4">
              <div 
                v-for="(award, index) in awards" :key="award._id"
                :ref="el => setAwardRef(el, index)"
                class="rounded-xl p-4 md:p-6 border border-gray-100 flex items-start gap-3 md:gap-4 pl-4 md:pl-6 bg-gray-50 transition-all duration-500 hover:shadow-md hover:-translate-y-1 hover:bg-white group"
                :style="{ transitionDelay: `${index * 100}ms` }"
                :class="getAwardVisible(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              >
                <div class="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-600 mt-1 shrink-0 group-hover:scale-110 transition-transform"></div>
                <div>
                  <h3 class="text-gray-800 font-bold text-sm md:text-base group-hover:text-red-600 transition-colors">{{ award.title }}</h3>
                  <p class="text-red-500 text-xs md:text-sm mt-1">{{ award.level }}</p>
                </div>
              </div>
            </div>
            <p v-else class="text-gray-400 text-center py-8">暂无获奖证书</p>
          </div>
        </section>

        <!-- 项目展示 -->
        <section id="projects" ref="projectsRef" class="scroll-mt-10 transition-all duration-700"
          :class="projectsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'">
          <div class="bg-white rounded-2xl p-6 md:p-10 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-500">
            <h2 class="text-2xl md:text-4xl font-bold text-gray-800 mb-2" style="font-family: 'Georgia', serif;">{{ $t('nav.projects') }}</h2>
            <div class="w-12 md:w-16 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded mb-6 md:mb-8"></div>
            <div v-if="projects.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div 
                v-for="(project, index) in projects" :key="project._id"
                @click="selectedProject = project"
                :ref="el => setProjectRef(el, index)"
                class="rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group border border-gray-200 hover:border-red-200 hover:bg-red-50/30"
                :style="{ transitionDelay: `${index * 100}ms` }"
                :class="getProjectVisible(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
              >
                <div class="h-32 md:h-40 bg-gray-100 overflow-hidden relative">
                  <img 
                    v-if="project.cover" 
                    loading="lazy"
                    :src="project.cover" 
                    :alt="project.title + '项目封面'"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center text-red-200 text-3xl md:text-4xl font-bold">
                    {{ project.title?.charAt(0) }}
                  </div>
                </div>
                <div class="p-3 md:p-5">
                  <h3 class="text-gray-800 font-bold text-sm md:text-base mb-2 group-hover:text-red-600 transition-colors">{{ project.title }}</h3>
                  <div class="flex flex-wrap gap-1">
                    <span 
                      v-for="tech in project.techStack" :key="tech"
                      class="text-xs px-1.5 md:px-2 py-0.5 rounded bg-red-50 text-red-500"
                    >{{ tech }}</span>
                  </div>
                </div>
              </div>
            </div>
            <p v-else class="text-gray-400 text-center py-8">暂无项目</p>
          </div>
        </section>

        <!-- 校园经历 -->
        <section id="experience" ref="experienceRef" class="scroll-mt-10 transition-all duration-700"
          :class="experienceVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'">
          <div class="bg-white rounded-2xl p-6 md:p-10 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-500">
            <h2 class="text-2xl md:text-4xl font-bold text-gray-800 mb-2" style="font-family: 'Georgia', serif;">{{ $t('nav.experience') }}</h2>
            <div class="w-12 md:w-16 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded mb-6 md:mb-8"></div>
            <div v-if="experience.length > 0" class="relative pl-6 md:pl-8">
              <div class="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-red-400 to-red-600"></div>
              <div class="space-y-4 md:space-y-6">
                <div v-for="(exp, index) in experience" :key="exp._id" class="relative"
                  :ref="el => setExpRef(el, index)"
                  :class="getExpVisible(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'">
                  <div class="absolute -left-6 md:-left-8 top-1 w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-600 border-2 border-white -translate-x-[5px] transition-all duration-300 hover:scale-125"></div>
                  <div class="rounded-xl p-4 md:p-6 border border-gray-200 transition-all duration-500 hover:shadow-md bg-gray-50 hover:bg-white">
                    <span class="text-red-500 text-xs md:text-sm font-medium">{{ exp.period }}</span>
                    <h3 class="text-gray-800 font-bold text-base md:text-lg mt-1">{{ exp.organization }}</h3>
                    <p class="text-gray-600 text-xs md:text-sm">{{ exp.role }}</p>
                    <p class="text-gray-400 text-xs md:text-sm mt-1">{{ exp.description }}</p>
                  </div>
                </div>
              </div>
            </div>
            <p v-else class="text-gray-400 text-center py-8">暂无校园经历</p>
          </div>
        </section>

        <!-- 联系方式 -->
        <section id="contact" ref="contactRef" class="scroll-mt-10 transition-all duration-700"
          :class="contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
          <div class="bg-white rounded-2xl p-6 md:p-10 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-500">
            <h2 class="text-2xl md:text-4xl font-bold text-gray-800 mb-2" style="font-family: 'Georgia', serif;">{{ $t('nav.contact') }}</h2>
            <div class="w-12 md:w-16 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded mb-6 md:mb-8"></div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <!-- GitHub -->
              <a 
                :href="'https://' + profile.contact?.github" 
                target="_blank"
                class="group flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fadeInUp bg-white hover:bg-red-50/30"
                style="animation-delay: 0ms"
              >
                <div class="w-14 h-14 rounded-full border-2 border-gray-200 flex items-center justify-center mb-3 group-hover:border-red-400 group-hover:bg-red-50 group-hover:scale-110 transition-all duration-300">
                  <svg class="w-6 h-6 text-gray-500 group-hover:text-red-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <h3 class="text-sm font-bold text-gray-700 mb-1 group-hover:text-red-500 transition-colors">GitHub</h3>
                <p class="text-xs text-gray-400 break-all text-center leading-tight">{{ profile.contact?.github }}</p>
              </a>
              <!-- 邮箱 -->
              <a 
                :href="'mailto:' + profile.contact?.email" 
                target="_blank"
                class="group flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fadeInUp bg-white hover:bg-red-50/30"
                style="animation-delay: 100ms"
              >
                <div class="w-14 h-14 rounded-full border-2 border-gray-200 flex items-center justify-center mb-3 group-hover:border-red-400 group-hover:bg-red-50 group-hover:scale-110 transition-all duration-300">
                  <svg class="w-6 h-6 text-gray-500 group-hover:text-red-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 class="text-sm font-bold text-gray-700 mb-1 group-hover:text-red-500 transition-colors">Email</h3>
                <p class="text-xs text-gray-400 break-all text-center leading-tight">{{ profile.contact?.email }}</p>
              </a>
              <!-- 微信 -->
              <button 
                @click="copyWechat"
                class="group flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fadeInUp w-full bg-white hover:bg-red-50/30"
                style="animation-delay: 200ms"
              >
                <div class="w-14 h-14 rounded-full border-2 border-gray-200 flex items-center justify-center mb-3 group-hover:border-red-400 group-hover:bg-red-50 group-hover:scale-110 transition-all duration-300">
                  <svg class="w-6 h-6 text-gray-500 group-hover:text-red-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
                <h3 class="text-sm font-bold text-gray-700 mb-1 group-hover:text-red-500 transition-colors">WeChat</h3>
                <p class="text-xs text-gray-400 group-hover:text-red-500 transition-colors">{{ showWechatCopied ? '已复制!' : '点击复制' }}</p>
              </button>
              <!-- 手机 -->
              <a 
                :href="'tel:' + profile.contact?.phone" 
                class="group flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fadeInUp bg-white hover:bg-red-50/30"
                style="animation-delay: 300ms"
              >
                <div class="w-14 h-14 rounded-full border-2 border-gray-200 flex items-center justify-center mb-3 group-hover:border-red-400 group-hover:bg-red-50 group-hover:scale-110 transition-all duration-300">
                  <svg class="w-6 h-6 text-gray-500 group-hover:text-red-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <h3 class="text-sm font-bold text-gray-700 mb-1 group-hover:text-red-500 transition-colors">Phone</h3>
                <p class="text-xs text-gray-400 break-all text-center leading-tight">17377665272</p>
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>

    <!-- 项目详情弹窗 -->
    <div 
      v-if="selectedProject" 
      @click.self="selectedProject = null"
      class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm"
    >
      <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 relative overflow-hidden shadow-2xl">
        <button @click="selectedProject = null" class="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl">&times;</button>
        
        <div class="p-8">
          <h2 class="text-2xl font-bold text-black mb-3">{{ selectedProject.title }}</h2>
          
          <div class="flex items-center gap-2 mb-5">
            <span class="text-[#e63946]">✦</span>
            <div class="flex-1 h-px bg-[#e63946]"></div>
            <span class="text-[#e63946]">✦</span>
          </div>

          <div class="flex flex-wrap gap-2 mb-5">
            <span 
              v-for="tech in selectedProject.techStack" :key="tech"
              class="px-3 py-1 rounded-full text-sm border border-[#e63946] text-[#e63946]"
            >{{ tech }}</span>
          </div>

          <div v-if="selectedProject.screenshots?.length" class="flex gap-3 mb-5 overflow-x-auto">
            <img 
              v-for="(img, i) in selectedProject.screenshots" :key="i"
              :src="img" 
              class="h-32 rounded-lg object-cover shrink-0"
            />
          </div>

          <div class="bg-gray-50 rounded-lg p-5 mb-5">
            <ul class="space-y-2">
              <li 
                v-for="(feature, i) in selectedProject.features" :key="i"
                class="text-gray-600 text-sm"
              >{{ i + 1 }}. {{ feature }}</li>
            </ul>
          </div>

          <a 
            v-if="selectedProject.github"
            :href="selectedProject.github" 
            target="_blank"
            class="inline-flex items-center gap-2 bg-[#e63946] text-black px-6 py-2.5 rounded-lg font-medium hover:bg-[#d62839] transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { getProfile, getProjects, getAwards, getExperience, getResume, testBackend } from '@/api'

const { locale } = useI18n({ useScope: 'global' })
const toggleLang = () => { locale.value = locale.value === 'zh' ? 'en' : 'zh' }

// 移动端导航
const showMobileNav = ref(false)

// 复制微信
const showWechatCopied = ref(false)
const copyWechat = async () => {
  const wechat = profile.value.contact?.wechat || 'zyl20041113'
  await navigator.clipboard.writeText(wechat)
  showWechatCopied.value = true
  setTimeout(() => { showWechatCopied.value = false }, 2000)
}

// 滚动动画状态
const aboutRef = ref(null)
const awardsRef = ref(null)
const projectsRef = ref(null)
const experienceRef = ref(null)
const contactRef = ref(null)

const aboutVisible = ref(true)
const awardsVisible = ref(true)
const projectsVisible = ref(true)
const experienceVisible = ref(true)
const contactVisible = ref(true)

const awardRefs = reactive([])
const projectRefs = reactive([])
const expRefs = reactive([])

const awardItemVisible = reactive({})
const projectItemVisible = reactive({})
const expItemVisible = reactive({})

const setAwardRef = (el, index) => {
  if (el) awardRefs[index] = el
}

const setProjectRef = (el, index) => {
  if (el) projectRefs[index] = el
}

const setExpRef = (el, index) => {
  if (el) expRefs[index] = el
}

const getAwardVisible = (index) => awardItemVisible[index] ?? true
const getProjectVisible = (index) => projectItemVisible[index] ?? true
const getExpVisible = (index) => expItemVisible[index] ?? true

const profile = ref({})
const projects = ref([])
const awards = ref([])
const experience = ref([])
const selectedProject = ref(null)
const activeSection = ref('about')
const showBackToTop = ref(false)
const resumeUrl = ref('')
const backendStatus = ref('connecting')

// 下载简历
const downloadResume = () => {
  if (resumeUrl.value) {
    const link = document.createElement('a')
    link.href = resumeUrl.value
    link.download = 'resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

const navItems = [
  { id: 'about', label: '关于我', icon: '👤' },
  { id: 'awards', label: '获奖证书', icon: '🏆' },
  { id: 'projects', label: '项目展示', icon: '📁' },
  { id: 'experience', label: '校园经历', icon: '📅' },
  { id: 'contact', label: '联系方式', icon: '💬' }
]

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  showMobileNav.value = false
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  // 更新当前活跃区域
  for (const item of navItems) {
    const el = document.getElementById(item.id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 200 && rect.bottom > 200) {
        activeSection.value = item.id
        break
      }
    }
  }
  
  // 显示/隐藏回到顶部按钮
  showBackToTop.value = window.scrollY > 500
}

// 观察器
let observers = []

const createObserver = (el, callback, options = {}) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '-50px', ...options }
  )
  observer.observe(el)
  observers.push(observer)
}

const observeSection = (el, visibleKey) => {
  if (!el) return
  createObserver(el, () => {
    visibleKey.value = true
  })
}

const observeItem = (el, index, visibleObj) => {
  if (!el) return
  createObserver(
    el,
    () => {
      setTimeout(() => {
        visibleObj[index] = true
      }, index * 100)
    },
    { threshold: 0.1 }
  )
}

const setupAnimations = () => {
  observeSection(aboutRef.value, aboutVisible)
  observeSection(awardsRef.value, awardsVisible)
  observeSection(projectsRef.value, projectsVisible)
  observeSection(experienceRef.value, experienceVisible)
  observeSection(contactRef.value, contactVisible)
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  
  // 测试后端连接
  const status = await testBackend()
  backendStatus.value = status
  
  const [profileData, projectsData, awardsData, experienceData, resumeData] = await Promise.all([
    getProfile(),
    getProjects(),
    getAwards(),
    getExperience(),
    getResume()
  ])
  profile.value = profileData
  projects.value = projectsData?.filter(p => p.title) || []
  awards.value = awardsData?.filter(a => a.title) || []
  experience.value = experienceData?.filter(e => e.period) || []
  if (resumeData?.url) {
    resumeUrl.value = resumeData.url
  }

  await nextTick()
  setTimeout(setupAnimations, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  observers.forEach((obs) => obs.disconnect())
})
</script>
