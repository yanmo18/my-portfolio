/**
 * 个人信息 API
 */
import { get, put } from './request'

/**
 * 获取个人信息
 */
export async function getProfile() {
  try {
    const res = await get('/api/profile')
    return res.data || res
  } catch (error) {
    // 返回默认数据
    return {
      name: '张雅岚',
      education: '本科在读',
      politicalStatus: '群众',
      birthDate: '2004.11.13',
      bio: '热爱前端技术，正在探索全栈开发领域。喜欢将创意转化为可交互的数字产品，对用户体验和界面设计有敏锐的感知。',
      tags: ['前端开发者', '全栈探索', '测试工程师'],
      contact: {
        wechat: 'zyl20041113',
        email: 'zhangyalanzyl@outlook.com',
        github: 'github.com/zhangyalanzyl'
      },
      skills: [
        { name: 'Vue', level: 85 },
        { name: 'React', level: 70 },
        { name: 'JS', level: 80 },
        { name: 'CSS', level: 75 },
        { name: 'Node', level: 60 },
        { name: 'Python', level: 55 }
      ]
    }
  }
}

/**
 * 更新个人信息
 */
export async function updateProfile(data) {
  return put('/api/profile', data)
}
