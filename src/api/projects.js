/**
 * 项目管理 API
 */
import { get, post, put, del } from './request'

/**
 * 获取所有项目
 */
export async function getProjects() {
  try {
    const res = await get('/api/projects')
    return res.data || res || []
  } catch (error) {
    console.error('获取项目列表失败:', error)
    return []
  }
}

/**
 * 添加项目
 */
export async function addProject(data) {
  const res = await post('/api/projects', data)
  return res.data || res
}

/**
 * 更新项目
 */
export async function updateProject(id, data) {
  const res = await put(`/api/projects/${id}`, data)
  return res.data || res
}

/**
 * 删除项目
 */
export async function deleteProject(id) {
  return del(`/api/projects/${id}`)
}
