/**
 * 简历管理 API
 * 使用 Laf 云函数存储简历
 */
import { getData, saveData } from './mockData'

const API_BASE = 'https://yfusw1tpgp.sealoshzh.site'

/**
 * 获取简历 URL
 * @returns {Promise<string|null>}
 */
export async function getResume() {
  try {
    const res = await fetch(`${API_BASE}/get-resume`)
    if (res.ok) {
      const data = await res.json()
      if (data.success && data.url) {
        return data.url
      }
    }
  } catch (error) {
    console.error('获取简历失败:', error)
  }
  // 降级到 localStorage
  const data = getData()
  return data.resumeUrl || null
}

/**
 * 上传简历到 Laf
 * @param {File} file - 文件
 * @returns {Promise<string>} 简历 URL
 */
export async function uploadResume(file) {
  const base64 = await fileToBase64(file)
  const resumeUrl = `data:${file.type};base64,${base64}`

  try {
    const res = await fetch(`${API_BASE}/upload-resume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: resumeUrl })
    })
    
    if (res.ok) {
      const data = await res.json()
      if (data.success) {
        return resumeUrl
      }
    }
    throw new Error('上传失败')
  } catch (error) {
    console.error('简历上传到服务器失败，保存到本地:', error)
    // 同时保存到 localStorage 作为备份
    const data = getData()
    data.resumeUrl = resumeUrl
    saveData(data)
    return resumeUrl
  }
}

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
