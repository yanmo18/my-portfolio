<template>
  <div class="min-h-screen bg-[#FAF8F5]">

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

    <!-- 左侧固定信息卡片 - 垂直居中 - 不规则切角 -->
    <aside class="hidden md:block fixed left-6 top-1/2 -translate-y-1/2 w-1/4 max-w-72 min-w-56 z-40">
      <div class="relative bg-white p-5 shadow-lg hover:shadow-xl transition-all duration-300">
        <!-- 不规则切角装饰 -->
        <div class="absolute top-0 right-0 w-12 h-12 overflow-hidden">
          <div class="absolute top-0 right-0 w-16 h-16 bg-[#FAF8F5] transform rotate-45 -translate-x-6 -translate-y-6"></div>
        </div>
        <!-- 左侧装饰线 -->
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#e63946] via-[#e63946] to-transparent rounded-l-2xl"></div>
        
        <!-- 头像 -->
        <div class="flex justify-center mb-3">
          <div class="w-20 h-20 rounded-full border-2 border-[#e63946] p-1 hover:scale-105 transition-transform duration-300">
            <img src="/张雅岚202302030319.jpg" :alt="profile.name" class="w-full h-full rounded-full object-cover" />
          </div>
        </div>

        <!-- 姓名 -->
        <div class="text-center mb-2">
          <h1 class="text-base font-bold text-black">{{ profile.name }}</h1>
          <span class="text-[#e63946] text-xs">前端开发者</span>
        </div>

        <!-- 分割线 -->
        <div class="w-full h-px bg-gray-200 my-3"></div>

        <!-- 基本信息 -->
        <div class="space-y-1.5 text-xs mb-3">
          <div class="flex justify-between"><span class="text-black font-medium">学历</span><span class="text-gray-400">{{ profile.education }}</span></div>
          <div class="flex justify-between"><span class="text-black font-medium">政治面貌</span><span class="text-gray-400">{{ profile.politicalStatus }}</span></div>
          <div class="flex justify-between"><span class="text-black font-medium">出生日期</span><span class="text-gray-400">2004.11.13</span></div>
        </div>

        <!-- 分割线 -->
        <div class="w-full h-px bg-gray-200 my-3"></div>

        <!-- 联系方式 -->
        <div class="space-y-1 text-xs mb-3">
          <div class="flex items-center gap-2 text-gray-500">
            <span class="text-[#e63946]">💬</span>
            <span class="truncate">{{ profile.contact?.wechat }}</span>
          </div>
          <div class="flex items-center gap-2 text-gray-500">
            <span class="text-[#e63946]">📧</span>
            <span class="truncate">{{ profile.contact?.email }}</span>
          </div>
          <div class="flex items-center gap-2 text-gray-500">
            <span class="text-[#e63946]">🐙</span>
            <a :href="'https://' + profile.contact?.github" target="_blank" class="hover:text-[#e63946] truncate">{{ profile.contact?.github }}</a>
          </div>
        </div>

        <!-- 分割线 -->
        <div class="w-full h-px bg-gray-200 my-3"></div>

        <!-- 技能 -->
        <div class="mb-3">
          <h3 class="text-black font-bold text-xs mb-2">Skills</h3>
          <div class="grid grid-cols-3 gap-2">
            <div v-for="skill in profile.skills" :key="skill.name" class="flex flex-col items-center">
              <div class="relative w-9 h-9">
                <svg class="w-9 h-9 -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="24" fill="none" stroke="#eee" stroke-width="3" />
                  <circle cx="28" cy="28" r="24" fill="none" stroke="#e63946" stroke-width="3" stroke-linecap="round" :stroke-dasharray="150.8" :stroke-dashoffset="150.8 - (150.8 * skill.level / 100)" class="transition-all duration-1000" />
                </svg>
                <span class="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#e63946]">{{ skill.level }}%</span>
              </div>
              <span class="text-xs text-black mt-0.5">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <!-- 下载简历按钮 -->
        <button 
          v-if="resumeUrl"
          @click="downloadResume"
          class="w-full bg-[#e63946] text-white py-2 rounded-lg font-bold text-xs hover:bg-[#d62839] transition-colors flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>
          {{ $t('hero.downloadResume') }}
        </button>
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
    <main class="md:ml-80 md:mr-24 pt-16 md:pt-0">
      <div class="p-4 md:p-8 space-y-6 md:space-y-8">

        <!-- 关于我 -->
        <section id="about" ref="aboutRef" class="scroll-mt-10 transition-all duration-700"
          :class="aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'">
          <div class="bg-white rounded-2xl p-6 md:p-10 border border-gray-200">
            <h2 class="text-3xl md:text-5xl font-bold text-black mb-2">{{ $t('about.title') }}</h2>
            <div class="w-12 md:w-16 h-1 bg-[#e63946] rounded mb-6 md:mb-8"></div>
            <p class="text-gray-600 text-sm md:text-lg leading-relaxed">{{ profile.bio }}</p>
          </div>
        </section>

        <!-- 获奖证书 -->
        <section id="awards" ref="awardsRef" class="scroll-mt-10 transition-all duration-700"
          :class="awardsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'">
          <div class="bg-white rounded-2xl p-6 md:p-10 border border-gray-200">
            <h2 class="text-3xl md:text-5xl font-bold text-black mb-2">{{ $t('nav.awards') }}</h2>
            <div class="w-12 md:w-16 h-1 bg-[#e63946] rounded mb-6 md:mb-8"></div>
            <div class="space-y-3 md:space-y-4">
              <div 
                v-for="(award, index) in awards" :key="award._id"
                :ref="el => setAwardRef(el, index)"
                class="rounded-xl p-4 md:p-6 border border-gray-100 flex items-start gap-3 md:gap-4 pl-4 md:pl-6 bg-gray-50 transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
                :style="{ transitionDelay: `${index * 100}ms` }"
                :class="getAwardVisible(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
              >
                <div class="w-2 h-2 rounded-full bg-[#e63946] mt-2 shrink-0"></div>
                <div>
                  <h3 class="text-black font-bold text-sm md:text-lg">{{ award.title }}</h3>
                  <p class="text-[#e63946] text-xs md:text-sm mt-1">{{ award.level }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 项目展示 -->
        <section id="projects" ref="projectsRef" class="scroll-mt-10 transition-all duration-700"
          :class="projectsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'">
          <div class="bg-white rounded-2xl p-6 md:p-10 border border-gray-200">
            <h2 class="text-3xl md:text-5xl font-bold text-black mb-2">{{ $t('nav.projects') }}</h2>
            <div class="w-12 md:w-16 h-1 bg-[#e63946] rounded mb-6 md:mb-8"></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div 
                v-for="(project, index) in projects" :key="project._id"
                @click="selectedProject = project"
                :ref="el => setProjectRef(el, index)"
                class="rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group border border-gray-200"
                :style="{ transitionDelay: `${index * 100}ms` }"
                :class="getProjectVisible(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
              >
                <div class="h-32 md:h-40 bg-gray-100 overflow-hidden">
                  <img 
                    v-if="project.cover" 
                    :src="project.cover" 
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-3xl md:text-4xl font-bold">
                    {{ project.title?.charAt(0) }}
                  </div>
                </div>
                <div class="p-3 md:p-5">
                  <h3 class="text-black font-bold text-sm md:text-base mb-2">{{ project.title }}</h3>
                  <div class="flex flex-wrap gap-1">
                    <span 
                      v-for="tech in project.techStack" :key="tech"
                      class="text-xs px-1.5 md:px-2 py-0.5 rounded bg-red-50 text-[#e63946]"
                    >{{ tech }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 校园经历 -->
        <section id="experience" ref="experienceRef" class="scroll-mt-10 transition-all duration-700"
          :class="experienceVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'">
          <div class="bg-white rounded-2xl p-6 md:p-10 border border-gray-200">
            <h2 class="text-3xl md:text-5xl font-bold text-black mb-2">{{ $t('nav.experience') }}</h2>
            <div class="w-12 md:w-16 h-1 bg-[#e63946] rounded mb-6 md:mb-8"></div>
            <div class="relative pl-6 md:pl-8">
              <div class="absolute left-0 top-2 bottom-2 w-0.5 bg-[#e63946]"></div>
              <div class="space-y-4 md:space-y-6">
                <div v-for="(exp, index) in experience" :key="exp._id" class="relative"
                  :ref="el => setExpRef(el, index)"
                  :class="getExpVisible(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'">
                  <div class="absolute -left-6 md:-left-8 top-1 w-3 h-3 rounded-full bg-[#e63946] border-2 border-white -translate-x-[5px] transition-all duration-300 hover:scale-125"></div>
                  <div class="rounded-xl p-4 md:p-6 border border-gray-200 transition-all duration-500 hover:shadow-lg bg-gray-50">
                    <span class="text-[#e63946] text-xs md:text-sm font-medium">{{ exp.period }}</span>
                    <h3 class="text-black font-bold text-base md:text-lg mt-1">{{ exp.organization }}</h3>
                    <p class="text-gray-600 text-xs md:text-sm">{{ exp.role }}</p>
                    <p class="text-gray-400 text-xs md:text-sm mt-1">{{ exp.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 联系方式 -->
        <section id="contact" ref="contactRef" class="scroll-mt-10 transition-all duration-700"
          :class="contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'">
          <div class="bg-white rounded-2xl p-6 md:p-10 border border-gray-200">
            <h2 class="text-3xl md:text-5xl font-bold text-black mb-2">{{ $t('nav.contact') }}</h2>
            <div class="w-12 md:w-16 h-1 bg-[#e63946] rounded mb-6 md:mb-8"></div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <!-- GitHub -->
              <a 
                :href="'https://' + profile.contact?.github" 
                target="_blank"
                class="group flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:border-[#e63946] hover:shadow-lg transition-all duration-300"
              >
                <div class="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center mb-3 group-hover:border-[#e63946] group-hover:bg-[#e63946] transition-all duration-300">
                  <svg class="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <h3 class="text-xs font-bold text-black mb-1">GitHub</h3>
                <p class="text-xs text-gray-400 break-all text-center leading-tight">{{ profile.contact?.github || '-' }}</p>
              </a>
              <!-- 邮箱 -->
              <a 
                :href="'mailto:' + profile.contact?.email" 
                target="_blank"
                class="group flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:border-[#e63946] hover:shadow-lg transition-all duration-300"
              >
                <div class="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center mb-3 group-hover:border-[#e63946] group-hover:bg-[#e63946] transition-all duration-300">
                  <svg class="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 class="text-xs font-bold text-black mb-1">Email</h3>
                <p class="text-xs text-gray-400 break-all text-center leading-tight">{{ profile.contact?.email || '-' }}</p>
              </a>
              <!-- 微信 -->
              <button 
                @click="copyWechat"
                class="group flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:border-[#e63946] hover:shadow-lg transition-all duration-300"
              >
                <div class="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center mb-3 group-hover:border-[#e63946] group-hover:bg-[#e63946] transition-all duration-300">
                  <svg class="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
                <h3 class="text-xs font-bold text-black mb-1">WeChat</h3>
                <p class="text-xs text-gray-400">{{ showWechatCopied ? '已复制!' : '点击复制' }}</p>
              </button>
              <!-- 手机 -->
              <a 
                :href="'tel:' + profile.contact?.phone" 
                class="group flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:border-[#e63946] hover:shadow-lg transition-all duration-300"
              >
                <div class="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center mb-3 group-hover:border-[#e63946] group-hover:bg-[#e63946] transition-all duration-300">
                  <svg class="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <h3 class="text-xs font-bold text-black mb-1">Phone</h3>
                <p class="text-xs text-gray-400 break-all text-center leading-tight">{{ profile.contact?.phone || '-' }}</p>
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
import { getProfile, getProjects, getAwards, getExperience, getResume } from '@/api'

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

const aboutVisible = ref(false)
const awardsVisible = ref(false)
const projectsVisible = ref(false)
const experienceVisible = ref(false)
const contactVisible = ref(false)

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

const getAwardVisible = (index) => awardItemVisible[index] ?? false
const getProjectVisible = (index) => projectItemVisible[index] ?? false
const getExpVisible = (index) => expItemVisible[index] ?? false

const profile = ref({})
const projects = ref([])
const awards = ref([])
const experience = ref([])
const selectedProject = ref(null)
const activeSection = ref('about')
const showBackToTop = ref(false)
const resumeUrl = ref('')

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
  
  const [profileData, projectsData, awardsData, experienceData, resumeData] = await Promise.all([
    getProfile(),
    getProjects(),
    getAwards(),
    getExperience(),
    getResume()
  ])
  profile.value = profileData
  projects.value = projectsData
  awards.value = awardsData
  experience.value = experienceData
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
