/**
 * Mock 数据存储
 * 当后端不可用时使用 localStorage 持久化数据
 */

const STORAGE_KEY = 'portfolio_data'

// 默认数据
const defaultData = {
  profile: {
    _id: 'profile_1',
    name: 'Fernoa',
    education: '本科在读',
    politicalStatus: '团员',
    birthDate: '2004.11.13',
    bio: '热爱前端技术，正在探索全栈开发领域。喜欢将创意转化为可交互的数字产品，对用户体验和界面设计有敏锐的感知。熟练运用 HTML/CSS/JavaScript 与 Vue 框架，可独立完成响应式页面搭建、组件化开发与交互逻辑实现；熟悉若依框架，具备基础的前后端协同开发能力。擅长借助 AI 工具辅助需求梳理、代码编写与项目优化，能高效推进从原型到部署的完整开发流程。在校期间参与实训项目与多个个人作品开发，兼具扎实的技术基础与快速学习能力。我的个人简历网站，前端用 Vue 3 搭建页面、Tailwind CSS 快速实现响应式样式，后端通过 Express 接口与 Prisma + MySQL 实现数据管理，完成了个人信息、项目与奖项的增删改查功能，实现了从数据存储到前端展示的完整流程。',
    tags: ['前端开发者', '全栈探索', '测试工程师'],
    contact: {
      wechat: 'Seren450',
      email: 'yanqing@outlook.com',
      github: 'github.com/zhangyalanzyl',
      phone: '17377665272'
    },
    skills: [
      { name: 'Vue', level: 85 },
      { name: 'React', level: 70 },
      { name: 'JS', level: 80 },
      { name: 'CSS', level: 75 },
      { name: 'Node', level: 60 },
      { name: 'Python', level: 55 }
    ],
    certifications: [
      { title: '英语四级证书' },
      { title: '计算机二级 MS Office' },
      { title: '计算机三级数据库' }
    ]
  },
  resumeUrl: null,
  projects: [
    {
      _id: 'proj_1',
       "title": "有机蔬菜管理系统",
    "cover": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
    "techStack": ["Spring Boot", "Vue 2", "Element UI", "MyBatis-Plus", "MySQL"],
    "github": "https://github.com/yanmo18/vegetable-system",
    "features": [
      "基于 RuoYi-Vue 框架二次开发，快速构建企业级后台",
      "完整的 RBAC 权限体系，支持用户、角色、菜单精细化管理",
      "覆盖生鲜行业订购、库存、订单全流程业务",
      "前后端分离架构，支持单机与集群部署"
      ],
      screenshots: []
    },
    {
      _id: 'proj_2',
      "title": "建筑工程可视化管理平台",
    "cover": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    "techStack": ["Vue 3", "TypeScript", "ECharts-GL", "Ant Design Vue", "Pinia"],
    "github": "https://github.com/yanmo18/structure-system",
    "features": [
      "ECharts-GL 实现 3D 地球可视化，展示全球项目分布",
      "多维度数据看板：进度、成本、质量、环境实时监控",
      "图表联动响应，支持筛选条件动态刷新数据",
      "TypeScript 类型校验 + Pinia 状态管理，提升代码健壮性"
      ],
      screenshots: []
    },
    {
      _id: 'proj_3',
       "title": "个人简历网站后端服务",
    "cover": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    "techStack": ["Express", "Prisma ORM", "JWT", "MySQL"],
    "github": "https://github.com/yanmo18/my-portfolio-backend",
    "features": [
      "Prisma ORM 实现类型安全，自动防止 SQL 注入",
      "JWT 无状态认证，Token 7 天过期支持自动刷新",
      "bcryptjs 密码加密存储，保障用户数据安全",
      "RESTful API 设计，覆盖简历、作品、奖项 CRUD"
      ],
      screenshots: []
    },
    {
      _id: 'proj_4',
      "title": "个人简历网站前端",
    "cover": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    "techStack": ["Vue 3", "Tailwind CSS", "Vue Router", "Axios"],
    "github": "https://github.com/yanmo18/my-portfolio",
    "features": [
      "Vue 3 Composition API 组合式开发，代码结构清晰",
      "Tailwind CSS 原子化样式，快速构建响应式布局",
      "集成 AI 面试助手功能，提供个性化面试指导",
      "国际化支持（vue-i18n），可切换中英文展示"
      ],
      screenshots: []
    },
    {
      _id: 'proj_5',
      "title": "移动端记账 App",
      "cover": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
      "techStack": ["React Native", "Expo", "Firebase", "Charts"],
      "github": "https://github.com/zhangyalanzyl/expense-tracker",
      "features": [
        "语音快速记账",
        '智能账单分类',
        '预算提醒推送',
        '数据导出分享'
      ],
      screenshots: []
    },
   
  ],
  awards: [
    {
      "_id": "award_1",
      "title": "第十一届全国大学生数字媒体科技作品及创意竞赛",
      "level": "国家级三等奖",
      "category": "数字媒体"
    },
     {
      "_id": "award_2",
      "title": "第十一届全国大学生数字媒体科技作品及创意竞赛",
      "level": "省级二等奖",
      "category": "数字媒体"
    },
    {
      "_id": "award_3",
      "title": "英语四级",
      "level": "国家级",
      "category": "语言能力"
    },
    {
      "_id": "award_4",
      "title": "计算机二级 MS Office",
      "level": "国家级",
      "category": "专业技能"
    },
    {
      "_id": "award_5",
      "title": "计算机三级数据库",
      "level": "国家级",
      "category": "专业技能"
    },
    {
      "_id": "award_6",
      "title": "普通话二级甲等",
      "level": "国家级",
      "category": "语言能力"
    },
    {
      "_id": "award_7",
      "title": "驾驶证",
      "level": "国家级",
      "category": "技能能力"
    }
  ],
  experience: [
    {
      _id: 'exp_1',
      period: '2023.09 - 2024.06',
      organization: '计算机学院学生会',
      role: '前端开发负责人',
      description: '负责学院官网及活动页面的前端开发，主导完成了迎新系统、毕业季专题等多个项目。'
    },
    {
      _id: 'exp_2',
      period: '2023.06 - 2023.08',
      organization: '极客工作室',
      role: '前端开发实习生',
      description: '参与企业内部管理系统开发，负责数据可视化模块及用户交互优化。'
    },
    {
      _id: 'exp_3',
      period: '2022.09 - 2023.06',
      organization: 'Web 应用开发课程组',
      role: '课程助教',
      description: '协助老师完成实验课教学，指导同学们完成 Vue/React 项目实战。'
    }
  ],
  resume: null
}

// 初始化存储
export function initStorage() {
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData))
  }
}

// 获取数据
export function getData() {
  initStorage()
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : defaultData
}

// 保存数据
export function saveData(data) {
  initStorage()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// 重置为默认数据
export function resetData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData))
}

// 生成唯一 ID
export function generateId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

export { defaultData }
