import { DB } from '@lafjs/cloud'

// 插入默认数据（运行一次即可）
export async function initData() {
  const db = DB
  
  // 1. 插入个人信息
  await db.collection('profile').insertOne({
    name: 'Fernoa',
    education: '本科在读',
    politicalStatus: '团员',
    birthDate: '2004.11.13',
    bio: '热爱前端技术，正在探索全栈开发领域。喜欢将创意转化为可交互的数字产品，对用户体验和界面设计有敏锐的感知。',
    tags: ['前端开发者', '全栈探索'],
    contact: {
      wechat: 'Seren450',
      email: 'yanqing@outlook.com',
      github: 'github.com/yanmo18',
      phone: '17377665272'
    },
    skills: [
      { name: 'Vue', level: 85 },
      { name: 'React', level: 70 },
      { name: 'JavaScript', level: 80 },
      { name: 'CSS', level: 75 },
      { name: 'Node.js', level: 60 },
      { name: 'Python', level: 55 }
    ],
    certifications: [
      { title: '英语四级证书' },
      { title: '计算机二级 MS Office' }
    ]
  })
  console.log('✓ 个人信息已插入')

  // 2. 插入示例项目
  await db.collection('projects').insertMany([
    {
      title: '智能简历管理系统',
      cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      techStack: ['Vue3', 'Node.js', 'MongoDB', 'TailwindCSS'],
      github: 'https://github.com/yanmo18/resume-manager',
      features: ['AI 智能匹配', '实时预览', '多模板切换', '数据可视化']
    },
    {
      title: '电商后台监控系统',
      cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      techStack: ['React', 'ECharts', 'Python', 'FastAPI'],
      github: 'https://github.com/yanmo18/ecommerce-dashboard',
      features: ['订单追踪', '销售报表', '库存预警', '用户行为热力图']
    },
    {
      title: '个人博客系统',
      cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop',
      techStack: ['Vue3', 'Vite', 'Markdown', 'GitHub Pages'],
      github: 'https://github.com/yanmo18/blog',
      features: ['Markdown 编辑', '代码高亮', '评论系统', 'SEO 优化']
    }
  ])
  console.log('✓ 项目数据已插入')

  // 3. 插入示例奖项
  await db.collection('awards').insertMany([
    { title: '校级程序设计大赛', level: '二等奖' },
    { title: '优秀学生干部', level: '校级' }
  ])
  console.log('✓ 奖项数据已插入')

  // 4. 插入示例经历
  await db.collection('experience').insertMany([
    {
      period: '2022.09 - 2024.06',
      organization: '计算机学院学生会',
      role: '技术部干事',
      description: '负责学院官网维护，活动海报设计，参与多场校园活动技术支持'
    },
    {
      period: '2023.06 - 2024.01',
      organization: '前端开发工作室',
      role: '成员',
      description: '参与团队项目开发，学习 Vue、React 等主流框架，与成员协作完成多个实战项目'
    }
  ])
  console.log('✓ 经历数据已插入')

  return { success: true, message: '所有默认数据已插入' }
}

// 运行
initData()
