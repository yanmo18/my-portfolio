/**
 * 奖项证书 API
 */
import { get, post, put, del } from './request'

/**
 * 获取所有奖项
 */
export async function getAwards() {
  try {
    const res = await get('/api/awards')
    return res.data || res || []
  } catch (error) {
    console.error('获取奖项列表失败:', error)
    return []
  }
}

/**
 * 添加奖项
 */
export async function addAward(data) {
  const res = await post('/api/awards', data)
  return res.data || res
}

/**
 * 更新奖项
 */
export async function updateAward(id, data) {
  const res = await put(`/api/awards/${id}`, data)
  return res.data || res
}

/**
 * 删除奖项
 */
export async function deleteAward(id) {
  return del(`/api/awards/${id}`)
}
