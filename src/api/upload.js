/**
 * 简历管理 API
 * 优先使用后端 API，后端不可用时使用 localStorage 模拟
 */
import { getData, saveData } from './mockData'

const API_BASE = 'https://yfusw1tpgp.sealoshzh.site'

// 检查后端是否可用
async function checkBackend() {
  try {
    const res = await fetch(`${API_BASE}/get-profile`)
    return res.ok
  } catch {
    return false
  }
}

/**
 * 获取简历 URL
 * @returns {Promise<string|null>}
 */
export async function getResume() {
  const available = await checkBackend()
  if (!available) {
    return getData().resumeUrl || null
  }

  try {
    const res = await fetch(`${API_BASE}/get-resume`)
    if (res.ok) {
      const data = await res.json()
      return data.url || data.data?.url || null
    }
    return null
  } catch (error) {
    console.error('获取简历失败:', error)
    return null
  }
}

/**
 * 上传简历
 * @param {File} file - 文件
 * @returns {Promise<string>} 简历 URL
 */
export async function uploadResume(file) {
  const available = await checkBackend()
  
  if (!available) {
    // Mock: 使用 base64 存储到 localStorage
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const url = e.target.result
        const allData = getData()
        allData.resumeUrl = url
        saveData(allData)
        resolve(url)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_BASE}/upload-resume`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) throw new Error('上传失败')

    const res = await response.json()
    return res.url || res.data?.url
  } catch (error) {
    console.error('简历上传失败:', error)
    throw error
  }
}

/**
 * 通用图片上传
 * @param {File} file - 图片文件
 * @returns {Promise<string>} 图片 URL
 */
export async function uploadImage(file) {
  const available = await checkBackend()
  
  if (!available) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_BASE}/upload-image`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) throw new Error('上传失败')

    const res = await response.json()
    return res.url || res.data?.url
  } catch (error) {
    console.error('图片上传失败:', error)
    throw error
  }
}
