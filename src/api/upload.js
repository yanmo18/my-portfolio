/**
 * 简历管理 API
 */
import { API_BASE } from './request'

/**
 * 上传简历 PDF
 * @param {File} file - PDF 文件
 * @returns {Promise<string>} 简历 URL
 */
export async function uploadResume(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_BASE}/api/resume/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('简历上传失败')
  }

  const res = await response.json()
  return res.url || res.data?.url
}

/**
 * 通用图片上传
 * @param {File} file - 图片文件
 * @returns {Promise<string>} 图片 URL
 */
export async function uploadImage(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_BASE}/api/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('图片上传失败')
  }

  const res = await response.json()
  return res.url || res.data?.url
}
