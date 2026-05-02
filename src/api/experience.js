/**
 * 在校经历 API
 */
import { get, post, put, del } from './request'

/**
 * 获取所有经历
 */
export async function getExperience() {
  try {
    const res = await get('/api/experience')
    return res.data || res || []
  } catch (error) {
    console.error('获取经历列表失败:', error)
    return []
  }
}

/**
 * 添加经历
 */
export async function addExperience(data) {
  const res = await post('/api/experience', data)
  return res.data || res
}

/**
 * 更新经历
 */
export async function updateExperience(id, data) {
  const res = await put(`/api/experience/${id}`, data)
  return res.data || res
}

/**
 * 删除经历
 */
export async function deleteExperience(id) {
  return del(`/api/experience/${id}`)
}
