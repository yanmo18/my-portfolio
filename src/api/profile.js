/**
 * 个人信息 API
 */
import { get, put } from './request'

/**
 * 获取个人信息
 */
export async function getProfile() {
  try {
    const res = await get('/get-profile')
    return res.data || res
  } catch (error) {
    // 返回默认数据
    return {
      name: '张雅岚',
      education: '潍坊科技学院 · 软件工程 · 2027届',
      politicalStatus: '团员',
      birthDate: '2004.11.13',
      bio: '软件工程在读，方向 Vue 全栈前端，并具备 ToB 项目实施与交付经验。',
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
        { name: 'Node.js / Express', level: 65 },
        { name: 'MySQL', level: 62 },
        { name: 'Git', level: 70 }
      ]
    }
  }
}

/**
 * 更新个人信息（包含简历 URL）
 */
export async function updateProfile(data) {
  return put('/update-profile', data)
}
