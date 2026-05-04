/**
 * 简历管理 API
 * 使用 profile 表的 resumeUrl 字段存储简历
 */
import { getProfile, updateProfile } from './index.js'
import { getData, saveData } from './mockData'

let cachedResumeUrl = null

/**
 * 获取简历 URL
 * @returns {Promise<string|null>}
 */
export async function getResume() {
  try {
    // 先尝试从 profile 获取
    const profile = await getProfile()
    if (profile?.resumeUrl) {
      cachedResumeUrl = profile.resumeUrl
      return profile.resumeUrl
    }
    return null
  } catch (error) {
    console.error('获取简历失败:', error)
    // 降级到 localStorage
    const data = getData()
    return data.resumeUrl || null
  }
}

/**
 * 上传简历（更新 profile 的 resumeUrl 字段）
 * @param {File} file - 文件
 * @returns {Promise<string>} 简历 URL
 */
export async function uploadResume(file) {
  // 转为 base64
  const base64 = await fileToBase64(file)
  const resumeUrl = `data:${file.type};base64,${base64}`

  try {
    // 获取当前 profile
    const profile = await getProfile()
    
    // 更新 profile，添加 resumeUrl
    await updateProfile({
      ...profile,
      resumeUrl: resumeUrl
    })
    
    cachedResumeUrl = resumeUrl
    return resumeUrl
  } catch (error) {
    console.error('简历上传到服务器失败，保存到本地:', error)
    // 降级到 localStorage
    const data = getData()
    data.resumeUrl = resumeUrl
    saveData(data)
    return resumeUrl
  }
}

/**
 * 文件转 Base64
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
