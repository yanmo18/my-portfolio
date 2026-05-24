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
    bio: '    热爱前端技术，专注于 Vue 生态，正在向全栈方向拓展。喜欢把创意变成看得见、可交互的数字产品。\n    熟练运用 HTML/CSS/JavaScript 与 Vue 框架，可独立完成响应式页面搭建、组件化开发与交互逻辑实现；熟悉若依框架，具备基础的前后端协同开发能力。擅长借助 AI 工具辅助需求梳理、代码编写与项目优化，能高效推进从原型到部署的完整开发流程。在校期间参与实训项目与多个个人作品开发，兼具扎实的技术基础与快速学习能力。\n    我的个人简历网站是技术栈的综合实践：前端用 Vue 3 + Tailwind CSS 构建，后端用 Express + Prisma ORM + MySQL 实现数据管理，打通了从数据存储到前端展示的完整流程。\n    认真、负责、爱琢磨——这是身边朋友对我的评价。能一步步把想法变成可交互的产品，是我认为最有成就感的事。也是我坚持在前端方向的动力。INFJ 的特质让我习惯从全局视角思考问题——不只是写功能，更会想「这个交互用户用起来顺不顺手」「这个模块后续好不好维护」。认真负责、不懂就问、喜欢复盘总结，这些习惯让我在校期间能配合团队高效协作完成多个实训项目，也让我有信心快速融入未来的工作环境。',
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
    "cover": "/01.png",
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
    "cover": "/03.png",
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
    "cover": "/02.png",
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
    "cover": "/04.png",
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
      period: '2025.03 - 至今',
      organization: '学工部',
      role: '副部',
      description: '协助老师处理学生事务，负责迎新季新生信息核对与录入工作，确保 200+ 新生数据准确无误。'
    },
    {
      _id: 'exp_2',
      period: '2024.03 - 2024.12',
      organization: '校心理健康节活动组	',
      role: '志愿者',
      description: '参与校园心理健康节活动，负责物资管理及分发，服务 100+ 参与学生，保障活动顺利开展。'
    },
    {
      _id: 'exp_3',
      period: '2023.09 - 2024.06',
      organization: '校学生会外联部',
      role: '外联干事',
      description: '参与校级学生组织联络工作，多次参与跨院系联席会议，锻炼沟通协作能力。'
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
