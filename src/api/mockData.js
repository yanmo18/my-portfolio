/**
 * Mock 数据存储
 * 当后端不可用时使用 localStorage 持久化数据
 */

const STORAGE_KEY = 'portfolio_data'

// 默认数据
const defaultData = {
  profile: {
    _id: 'profile_1',
    name: '张雅岚',
    education: '本科在读',
    politicalStatus: '团员',
    birthDate: '2004.11.13',
    bio: '热爱前端技术，正在探索全栈开发领域。喜欢将创意转化为可交互的数字产品，对用户体验和界面设计有敏锐的感知。',
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
    ]
  },
  projects: [
    {
      _id: 'proj_1',
      title: '智能简历管理系统',
      cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      techStack: ['Vue3', 'Node.js', 'MongoDB', 'TailwindCSS'],
      github: 'https://github.com/zhangyalanzyl/resume-manager',
      features: [
        '基于 AI 的简历智能匹配',
        '实时预览编辑效果',
        '多模板一键切换',
        '数据可视化统计分析'
      ],
      screenshots: []
    },
    {
      _id: 'proj_2',
      title: '电商后台监控系统',
      cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      techStack: ['React', 'ECharts', 'Python', 'FastAPI'],
      github: 'https://github.com/zhangyalanzyl/ecommerce-dashboard',
      features: [
        '实时订单数据追踪',
        '多维度销售报表',
        '库存预警自动化',
        '用户行为热力图'
      ],
      screenshots: []
    },
    {
      _id: 'proj_3',
      title: '个人博客系统',
      cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop',
      techStack: ['Vue3', 'Vite', 'Markdown', 'GitHub Pages'],
      github: 'https://github.com/zhangyalanzyl/blog',
      features: [
        'Markdown 实时编辑',
        '代码高亮语法支持',
        '评论系统集成',
        'SEO 优化配置'
      ],
      screenshots: []
    },
    {
      _id: 'proj_4',
      title: '在线协作白板',
      cover: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      techStack: ['React', 'Socket.io', 'Canvas', 'Express'],
      github: 'https://github.com/zhangyalanzyl/collab-whiteboard',
      features: [
        '多人实时同步绘制',
        '多种画笔工具',
        '历史版本回溯',
        '实时语音讨论'
      ],
      screenshots: []
    },
    {
      _id: 'proj_5',
      title: '移动端记账 App',
      cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      techStack: ['React Native', 'Expo', 'Firebase', 'Charts'],
      github: 'https://github.com/zhangyalanzyl/expense-tracker',
      features: [
        '语音快速记账',
        '智能账单分类',
        '预算提醒推送',
        '数据导出分享'
      ],
      screenshots: []
    },
    {
      _id: 'proj_6',
      title: '自动化测试平台',
      cover: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop',
      techStack: ['Python', 'Selenium', 'Pytest', 'Docker'],
      github: 'https://github.com/zhangyalanzyl/test-platform',
      features: [
        '可视化测试用例编排',
        '定时自动执行',
        '失败自动重试机制',
        '测试报告自动生成'
      ],
      screenshots: []
    }
  ],
  awards: [
    {
      _id: 'award_1',
      title: '第十一届「中国软件杯」大学生软件设计大赛',
      level: '国家级二等奖'
    },
    {
      _id: 'award_2',
      title: '蓝桥杯全国软件和信息技术专业人才大赛',
      level: '省级二等奖'
    },
    {
      _id: 'award_3',
      title: '「畅想杯」智慧中国无人车专项赛',
      level: '校级二等奖'
    },
    {
      _id: 'award_4',
      title: '「挑战杯」中国大学生创业计划竞赛',
      level: '校级铜奖'
    },
    {
      _id: 'award_5',
      title: '大学生创新创业训练计划项目',
      level: '国家级立项'
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
