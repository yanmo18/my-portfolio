<template>
  <div class="flex min-h-screen bg-[#f5f0eb]">
    <!-- 左侧固定栏 -->
    <aside class="w-1/4 min-w-[300px] shrink-0 p-6 sticky top-0 h-screen overflow-y-auto flex items-center">
      <div class="bg-white rounded-2xl p-8 w-full flex flex-col items-center shadow-sm">
        
        <!-- 头像 -->
        <div class="w-32 h-32 rounded-full border-2 border-[#e63946] p-1 mb-5">
          <img src="/张雅岚202302030319.jpg" :alt="profile.name" class="w-full h-full rounded-full object-cover" />
        </div>

        <!-- 姓名 -->
        <h1 class="text-xl font-bold text-black mb-1">{{ profile.name }}</h1>

        <!-- 身份标签 -->
        <div class="flex items-center gap-2 mb-4">
          <span class="text-[#e63946] text-sm font-light">前端开发者</span>
          <span class="w-px h-4 bg-[#e63946]"></span>
          <span class="text-[#e63946] text-sm font-light">全栈探索</span>
          <span class="w-px h-4 bg-[#e63946]"></span>
          <span class="text-[#e63946] text-sm font-light">测试工程师</span>
        </div>

        <!-- 分割线 -->
        <div class="w-full h-px bg-gray-200 mb-5"></div>

        <!-- 基本信息 -->
        <div class="w-full space-y-3 mb-6 text-sm">
          <div class="flex justify-between"><span class="text-black font-medium">学历:</span><span class="text-gray-400">{{ profile.education }}</span></div>
          <div class="flex justify-between"><span class="text-black font-medium">政治面貌:</span><span class="text-gray-400">{{ profile.politicalStatus }}</span></div>
          <div class="flex justify-between"><span class="text-black font-medium">出生日期:</span><span class="text-gray-400">2004.11.13</span></div>
        </div>

        <!-- 联系方式 -->
        <div class="w-full mb-6 space-y-2 text-sm">
          <div class="flex items-center gap-2 text-gray-500"><span class="text-[#e63946]">💬</span><span>{{ profile.contact?.wechat || '微信' }}</span></div>
          <div class="flex items-center gap-2 text-gray-500"><span class="text-[#e63946]">📧</span><span>{{ profile.contact?.email || '邮箱' }}</span></div>
          <div class="flex items-center gap-2 text-gray-500"><span class="text-[#e63946]">🐙</span><a :href="'https://' + profile.contact?.github" target="_blank" class="hover:text-[#e63946] transition-colors">{{ profile.contact?.github || 'GitHub' }}</a></div>
        </div>

        <!-- 技能环形进度 -->
        <div class="w-full mb-6">
          <h3 class="text-black font-bold text-sm mb-4">Skills</h3>
          <div class="grid grid-cols-3 gap-4">
            <div v-for="skill in profile.skills" :key="skill.name" class="flex flex-col items-center">
              <div class="relative w-14 h-14">
                <svg class="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="24" fill="none" stroke="#eee" stroke-width="3" />
                  <circle cx="28" cy="28" r="24" fill="none" stroke="#e63946" stroke-width="3" stroke-linecap="round" :stroke-dasharray="150.8" :stroke-dashoffset="150.8 - (150.8 * skill.level / 100)" class="transition-all duration-1000" />
                </svg>
                <span class="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#e63946]">{{ skill.level }}%</span>
              </div>
              <span class="text-xs text-black mt-1">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <!-- 下载简历按钮 -->
        <button class="w-full bg-[#e63946] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#d62839] transition-colors flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>
          {{ $t('hero.downloadResume') }}
        </button>
      </div>
    </aside>

    <!-- 右侧主内容区 -->
    <main class="flex-1 relative">
      <!-- 中英文切换 -->
      <div class="fixed top-6 right-16 z-50">
        <button 
          @click="toggleLang" 
          class="px-4 py-1.5 rounded-full border border-gray-300 text-sm text-gray-500 hover:border-[#e63946] hover:text-[#e63946] transition-colors"
        >
          {{ locale === 'zh' ? 'EN' : '中' }}
        </button>
      </div>

      <div class="px-16 py-20 space-y-32">

        <!-- 关于我 -->
        <section id="about" class="scroll-mt-10">
          <h2 class="text-5xl font-bold text-black mb-2">{{ $t('about.title') }}</h2>
          <div class="w-16 h-1 bg-[#e63946] rounded mb-8"></div>
          <div class="bg-white rounded-2xl p-8 shadow-sm">
            <p class="text-gray-600 text-lg leading-relaxed">{{ profile.bio }}</p>
          </div>
        </section>

        <!-- 获奖证书 -->
        <section id="awards" class="scroll-mt-10">
          <h2 class="text-5xl font-bold text-black mb-2">{{ $t('nav.awards') }}</h2>
          <div class="w-16 h-1 bg-[#e63946] rounded mb-8"></div>
          <div class="space-y-4">
            <div 
              v-for="award in awards" :key="award._id"
              class="bg-white rounded-xl p-6 shadow-sm flex items-start gap-4 pl-6 border-l-4 border-[#e63946]"
            >
              <div>
                <h3 class="text-black font-bold text-lg">{{ award.title }}</h3>
                <p class="text-gray-500 text-sm mt-1">{{ award.level }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 项目展示 -->
        <section id="projects" class="scroll-mt-10">
          <h2 class="text-5xl font-bold text-black mb-2">{{ $t('nav.projects') }}</h2>
          <div class="w-16 h-1 bg-[#e63946] rounded mb-8"></div>
          <div class="grid grid-cols-3 gap-6">
            <div 
              v-for="project in projects" :key="project._id"
              @click="selectedProject = project"
              class="bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div class="h-40 bg-gray-100 overflow-hidden">
                <img 
                  v-if="project.cover" 
                  :src="project.cover" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-4xl font-bold">
                  {{ project.title?.charAt(0) }}
                </div>
              </div>
              <div class="p-5">
                <h3 class="text-black font-bold mb-2">{{ project.title }}</h3>
                <div class="flex flex-wrap gap-1.5">
                  <span 
                    v-for="tech in project.techStack" :key="tech"
                    class="text-xs px-2 py-0.5 rounded bg-red-50 text-[#e63946]"
                  >{{ tech }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 校园经历 -->
        <section id="experience" class="scroll-mt-10">
          <h2 class="text-5xl font-bold text-black mb-2">{{ $t('nav.experience') }}</h2>
          <div class="w-16 h-1 bg-[#e63946] rounded mb-8"></div>
          <div class="relative pl-8">
            <div class="absolute left-0 top-2 bottom-2 w-0.5 bg-[#e63946]"></div>
            <div class="space-y-6">
              <div v-for="exp in experience" :key="exp._id" class="relative">
                <div class="absolute -left-8 top-1 w-3 h-3 rounded-full bg-[#e63946] border-2 border-[#f5f0eb] -translate-x-[5px]"></div>
                <div class="bg-white rounded-xl p-6 shadow-sm">
                  <span class="text-[#e63946] text-sm font-medium">{{ exp.period }}</span>
                  <h3 class="text-black font-bold text-lg mt-1">{{ exp.organization }}</h3>
                  <p class="text-gray-600 text-sm">{{ exp.role }}</p>
                  <p class="text-gray-400 text-sm mt-1">{{ exp.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 联系方式 -->
        <section id="contact" class="scroll-mt-10 pb-20">
          <h2 class="text-5xl font-bold text-black mb-2">{{ $t('nav.contact') }}</h2>
          <div class="w-16 h-1 bg-[#e63946] rounded mb-8"></div>
          <div class="bg-white rounded-2xl p-8 shadow-sm flex gap-12">
            <div class="flex items-center gap-3">
              <span class="text-2xl">💬</span>
              <div>
                <p class="text-xs text-gray-400">微信</p>
                <p class="text-black">{{ profile.contact?.wechat || '-' }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-2xl">📧</span>
              <div>
                <p class="text-xs text-gray-400">邮箱</p>
                <p class="text-black">{{ profile.contact?.email || '-' }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-2xl">🐙</span>
              <div>
                <p class="text-xs text-gray-400">GitHub</p>
                <a :href="'https://' + profile.contact?.github" target="_blank" class="text-black hover:text-[#e63946] transition-colors">{{ profile.contact?.github || '-' }}</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- 项目详情弹窗 -->
    <div 
      v-if="selectedProject" 
      @click.self="selectedProject = null"
      class="fixed inset-0 bg-black/40 z-40 flex items-center justify-center backdrop-blur-sm"
    >
      <div class="bg-[#1a1a1a] rounded-2xl border border-[#e63946] shadow-[0_0_30px_rgba(230,57,70,0.2)] max-w-2xl w-full mx-4 relative overflow-hidden">
        <button @click="selectedProject = null" class="absolute top-4 right-4 text-white/70 hover:text-white text-2xl">&times;</button>
        
        <div class="p-8">
          <h2 class="text-2xl font-bold text-white mb-3">{{ selectedProject.title }}</h2>
          
          <div class="flex items-center gap-2 mb-5">
            <span class="text-[#e63946]">✦</span>
            <div class="flex-1 h-px bg-[#e63946]"></div>
            <span class="text-[#e63946]">✦</span>
          </div>

          <div class="flex flex-wrap gap-2 mb-5">
            <span 
              v-for="tech in selectedProject.techStack" :key="tech"
              class="px-3 py-1 rounded-full text-sm border border-[#e63946] text-white"
            >{{ tech }}</span>
          </div>

          <div v-if="selectedProject.screenshots?.length" class="flex gap-3 mb-5 overflow-x-auto">
            <img 
              v-for="(img, i) in selectedProject.screenshots" :key="i"
              :src="img" 
              class="h-32 rounded-lg object-cover shrink-0"
            />
          </div>

          <div class="bg-[#2a2a2a] rounded-lg p-5 mb-5">
            <ul class="space-y-2">
              <li 
                v-for="(feature, i) in selectedProject.features" :key="i"
                class="text-gray-300 text-sm"
              >{{ i + 1 }}. {{ feature }}</li>
            </ul>
          </div>

          <a 
            v-if="selectedProject.github"
            :href="selectedProject.github" 
            target="_blank"
            class="inline-flex items-center gap-2 bg-[#e63946] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#d62839] transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </div>

    <!-- 右侧电梯导航 -->
    <nav class="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4">
      <button 
        v-for="item in navItems" :key="item.id"
        @click="scrollTo(item.id)"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="activeSection === item.id ? 'bg-[#e63946] scale-125 ring-2 ring-[#e63946]/30' : 'bg-gray-400 hover:bg-[#e63946]'"
        :title="item.label"
      ></button>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })
const toggleLang = () => { locale.value = locale.value === 'zh' ? 'en' : 'zh' }

const API_BASE = 'https://yfusw1tpgp.sealoshzh.site'
const profile = ref({})
const projects = ref([])
const awards = ref([])
const experience = ref([])
const selectedProject = ref(null)
const activeSection = ref('about')

const navItems = [
  { id: 'about', label: '关于我' },
  { id: 'awards', label: '获奖证书' },
  { id: 'projects', label: '项目展示' },
  { id: 'experience', label: '校园经历' },
  { id: 'contact', label: '联系方式' }
]

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const handleScroll = () => {
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
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  const [profileRes, projectsRes, awardsRes, expRes] = await Promise.all([
    fetch(`${API_BASE}/get-profile`).then(r => r.json()),
    fetch(`${API_BASE}/get-projects`).then(r => r.json()),
    fetch(`${API_BASE}/get-awards`).then(r => r.json()),
    fetch(`${API_BASE}/get-experience`).then(r => r.json())
  ])
  if (profileRes.code === 0) profile.value = profileRes.data
  if (projectsRes.code === 0) projects.value = projectsRes.data
  if (awardsRes.code === 0) awards.value = awardsRes.data
  if (expRes.code === 0) experience.value = expRes.data
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>