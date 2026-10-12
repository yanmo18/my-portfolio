/**
 * 线上首页使用的内置简历数据，不请求云后端。
 * 更新内容后请提高 DATA_VERSION，以覆盖访客过期的 localStorage。
 */

const STORAGE_KEY = 'portfolio_data'
const DATA_VERSION = 8

const defaultData = {
  version: DATA_VERSION,
  profile: {
    _id: 'profile_1',
    name: '张雅岚',
    education: '27届本科-软件工程',
    politicalStatus: '团员',
    birthDate: '2004.11.13',
    bio: '软件工程在读，方向 Vue 全栈前端，并具备 ToB 项目实施与交付经验。习惯把需求推进成可运行、可交接的成品。\n暑期在亿信安泰独立负责「会员商城与门店运营系统」全链路：需求沟通、功能梳理、微信小程序 + Vue 管理端 + Express/MySQL 联调验收，并输出对接/交接文档与上线资料清单。\n另有国外医疗 Web 静态页（HTML/CSS/Astro）短期交付经验；独立完成作品集 fernoa.top（Vue 3 + Express + Prisma + MySQL）并公网部署。\n善用 Cursor 等 AI 工具提升交付效率，沟通协调稳定、执行力强。可全职青岛实习，求职方向覆盖前端开发与软件实施。',
    tags: ['Vue全栈前端', '项目实施', '独立交付'],
    contact: {
      wechat: 'Seren450',
      email: 'moyan548@foxmail.com',
      github: 'github.com/yanmo18',
      phone: '17377665272'
    },
    skills: [
      { name: 'Vue 3', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'HTML/CSS', level: 80 },
      { name: 'uni-app / 小程序', level: 72 },
      { name: 'Tailwind CSS', level: 72 },
      { name: 'Node.js / Express', level: 65 },
      { name: 'MySQL', level: 62 },
      { name: 'Prisma', level: 55 },
      { name: 'Git', level: 70 },
      { name: 'Cursor / AI 交付', level: 78 }
    ],
    certifications: [
      { title: '英语四级 CET-4' },
      { title: '计算机二级 MS Office' },
      { title: '计算机三级数据库' },
      { title: '普通话二甲' }
    ]
  },
  resumeUrl: null,
  projects: [
    {
      _id: 'proj_1',
      title: '会员商城与门店运营系统',
      badge: '实习项目',
      period: '2026.07 – 2026.09',
      role: '前端全栈 · 独立交付',
      summary: '亿信安泰 ToB 会员商城与门店运营全链路：小程序 + 管理后台 + 后端 API，覆盖会员、商城、核销预约收银与多角色工作台。',
      cover: '/projects/mall/1.jpg',
      techStack: ['uni-app', '微信小程序', 'Vue 管理端', 'Node/Express', 'MySQL', 'RBAC'],
      github: '',
      repoNote: '公司内部项目，未公开仓库',
      features: [
        '亿信安泰实习（2026.07–2026.09）：独立负责 ToB 全链路交付',
        '交付微信小程序 + 管理后台 + 后端 API：会员、商城、门店核销/预约/收银、多角色工作台',
        '管理后台对接 48+ 业务模块与 RBAC；输出需求/对接/交接/测试文档',
        '梳理上线依赖（域名、云资源、微信支付等），主链达可本地验收与预发条件'
      ],
      screenshots: ['/projects/mall/1.jpg', '/projects/mall/2.jpg', '/projects/mall/3.jpg']
    },
    {
      _id: 'proj_2',
      title: '个人作品集网站',
      badge: '独立项目',
      period: '2025 – 至今',
      role: '独立开发 · 部署维护',
      summary: 'fernoa.top 个人作品集：前台展示 + 管理后台，Vue 3 + Express + Prisma + MySQL，支持中英切换与数据维护。',
      cover: '/projects/portfolio/1.jpg',
      techStack: ['Vue 3', 'Vite', 'Tailwind CSS', 'Express', 'Prisma', 'MySQL', 'JWT'],
      github: 'https://github.com/yanmo18/my-portfolio',
      features: [
        '独立开发并部署 fernoa.top：前台展示 + 管理后台维护',
        'Vue 3 组合式 API + Tailwind 响应式与中英切换',
        'Express + Prisma + MySQL：JWT 鉴权与项目/奖项/经历 CRUD',
        '接口三级降级：后端不可用时仍用内置数据保证首页可用'
      ],
      screenshots: ['/projects/portfolio/1.jpg', '/projects/portfolio/2.jpg', '/projects/portfolio/3.jpg']
    },
    {
      _id: 'proj_3',
      title: '国外医疗 Web 静态页面',
      badge: '兼职项目',
      period: '2026.06（约 2 周）',
      role: '前端兼职 · 静态页交付',
      summary: '按 Figma 用 HTML/CSS/Astro 还原并交付约 10 个国外医疗订单相关静态页面，统一版式与组件风格。',
      cover: '/projects/medical/1.jpg',
      techStack: ['HTML', 'CSS', 'Astro', 'Figma'],
      github: '',
      repoNote: '兼职交付项目',
      features: [
        '兼职（2026.06，约 2 周）：国外医疗订单相关 Web 页面',
        '按 Figma 用 HTML/CSS/Astro 完成约 10 个静态页面还原与交付',
        '统一版式、间距与组件风格，保证多页可验收',
        '短期项目制协作，按时交付并对接验收反馈'
      ],
      screenshots: ['/projects/medical/1.jpg', '/projects/medical/2.jpg', '/projects/medical/3.jpg']
    },
    {
      _id: 'proj_4',
      title: '有机蔬菜管理系统',
      badge: '校内实训',
      period: '校内实训',
      role: '前后端分离 · RuoYi 二次开发',
      summary: '基于 RuoYi-Vue 的企业级后台：RBAC 与订购/库存/订单流程，支持单机部署。',
      cover: '/projects/vegetable/1.jpg',
      techStack: ['Spring Boot', 'Vue 2', 'Element UI', 'MyBatis-Plus', 'MySQL'],
      github: 'https://github.com/yanmo18/vegetable-system',
      features: [
        '校内实训：基于 RuoYi-Vue 二次开发的企业级后台',
        'RBAC：用户、角色、菜单分级管理',
        '覆盖订购、库存、订单等业务流程',
        '前后端分离，支持单机部署'
      ],
      screenshots: ['/projects/vegetable/1.jpg', '/projects/vegetable/2.jpg', '/projects/vegetable/3.jpg']
    }
  ],
  awards: [
    {
      _id: 'award_1',
      title: '全国大学生数字媒体竞赛 ·《维度警报：3540年的回声》',
      level: '全国总决赛三等奖',
      category: '数字媒体'
    },
    {
      _id: 'award_2',
      title: '全国大学生数字媒体竞赛 ·《维度警报：3540年的回声》',
      level: '山东省赛区二等奖',
      category: '数字媒体'
    },
    {
      _id: 'award_3',
      title: '大学英语四级 CET-4',
      level: '国家级',
      category: '语言能力'
    },
    {
      _id: 'award_4',
      title: '计算机二级 MS Office',
      level: '国家级',
      category: '专业技能'
    },
    {
      _id: 'award_5',
      title: '计算机三级数据库',
      level: '国家级',
      category: '专业技能'
    },
    {
      _id: 'award_6',
      title: '普通话二甲',
      level: '国家级',
      category: '语言能力'
    }
  ],
  experience: [
    {
      _id: 'exp_1',
      period: '2026.07 - 2026.09',
      organization: '亿信安泰',
      role: '前端全栈实习 · 项目交付',
      tag: '实习',
      highlight: true,
      description: '独立负责「会员商城与门店运营」ToB 全链路：需求沟通、小程序/管理后台/后端联调验收，输出对接与交接文档，并同步客户侧上线资料清单。'
    },
    {
      _id: 'exp_2',
      period: '2026.06（约 2 周）',
      organization: '国外医疗 Web 页面',
      role: '前端兼职',
      tag: '兼职',
      highlight: true,
      description: '根据 Figma 使用 HTML/CSS/Astro 完成约 10 个医疗订单相关静态页面还原与交付，按设计规范保证多页风格统一、可验收。'
    },
    {
      _id: 'exp_3',
      period: '2025.03 - 至今',
      organization: '学工部',
      role: '副部长',
      description: '负责 2025 级迎新数据统计与整理，完成新生信息核对 500+；参与两届校运动会开幕相关组织工作，习惯多线程事务推进与责任闭环。'
    },
    {
      _id: 'exp_4',
      period: '2024.03 - 2024.12',
      organization: '校心理健康节活动组',
      role: '志愿者',
      description: '参与心理健康节系列活动志愿服务，对接参与学生 300+，负责现场组织与协调。'
    },
    {
      _id: 'exp_5',
      period: '2023.09 - 2024.06',
      organization: '校学生会外联部',
      role: '外联干事',
      description: '参与校园晚会等活动的物资筹备与现场执行，锻炼跨部门沟通与落地能力。'
    }
  ],
  resume: null
}

export function initStorage() {
  try {
    const existing = localStorage.getItem(STORAGE_KEY)
    if (!existing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData))
      return
    }
    const parsed = JSON.parse(existing)
    if (parsed.version !== DATA_VERSION) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData))
    }
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData))
  }
}

export function getData() {
  initStorage()
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    const parsed = data ? JSON.parse(data) : null
    if (!parsed || parsed.version !== DATA_VERSION) return defaultData
    return parsed
  } catch {
    return defaultData
  }
}

export function saveData(data) {
  const next = { ...data, version: DATA_VERSION }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function resetData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData))
}

export function generateId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11)
}

export { defaultData, DATA_VERSION }
