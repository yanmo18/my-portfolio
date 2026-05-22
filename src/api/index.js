/**
 * API 适配层
 * 优先使用后端 API，后端不可用时：
 *   1. 优先读取 localStorage 缓存（用户之前添加的数据）
 *   2. 没有缓存则使用默认 Mock 数据
 * 
 * 成功获取后端数据时会自动更新 localStorage 缓存
 * 
 * Express 后端 API 地址: https://your-express-backend.com
 */
import { getData, saveData, generateId } from './mockData'

// ============ API 配置 ============
// 切换后端时只需要改这里
// 
// 当前：Laf 后端（无 /api 前缀）
const API_BASE = 'https://lcnmaohntx.sealosbja.site'
//
// 未来切换到 Express 后端时：
// 1. 把 API_BASE 改为 Express 地址
// 2. 所有路径加上 /api 前缀
// 示例：'/get-profile' → '/api/api/profile'

const CACHE_KEY = 'portfolio_api_cache'
let useMock = false // 默认尝试使用后端

// localStorage 缓存操作
function getCache() {
  try {
    const cache = localStorage.getItem(CACHE_KEY)
    return cache ? JSON.parse(cache) : null
  } catch {
    return null
  }
}

function setCache(key, data) {
  try {
    const cache = getCache() || {}
    cache[key] = data
    cache[key + '_time'] = Date.now()
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch (e) {
    console.warn('缓存写入失败:', e)
  }
}

function getFromCache(key) {
  const cache = getCache()
  return cache ? cache[key] : null
}

// 初始化：尝试连接后端，如果失败则加载缓存
export async function initAPI() {
  try {
    const response = await fetch(`${API_BASE}/api/api/profile`, { 
      timeout: 5000 
    })
    if (response.ok) {
      useMock = false
      console.log('后端连接成功，使用真实 API')
      return 'success'
    }
  } catch (e) {
    console.log('后端不可用，尝试使用缓存数据')
  }
  
  // 后端不可用，检查是否有缓存
  const cache = getCache()
  if (cache && (cache.projects || cache.awards || cache.experience)) {
    console.log('使用 localStorage 缓存数据')
    useMock = 'cache' // 使用缓存模式
    return 'cache'
  }
  
  useMock = true
  console.log('无缓存，使用默认 Mock 数据')
  return 'mock'
}

// ==================== 个人信息 ====================

export async function getProfile() {
  if (useMock === true) {
    return getData().profile
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/api/profile`)
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    const profile = data.data || data
    setCache('profile', profile) // 缓存数据
    return profile
  } catch (error) {
    console.error('获取个人信息失败，尝试缓存:', error)
    const cached = getFromCache('profile')
    if (cached) return cached
    useMock = true
    return getData().profile
  }
}

export async function updateProfile(profileData) {
  if (useMock === true) {
    const allData = getData()
    allData.profile = { ...allData.profile, ...profileData }
    saveData(allData)
    return { success: true }
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/api/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    })
    const result = await res.json()
    // 更新缓存
    setCache('profile', { ...getFromCache('profile'), ...profileData })
    return result
  } catch (error) {
    console.error('更新个人信息失败:', error)
    throw error
  }
}

// ==================== 项目管理 ====================

export async function getProjects() {
  if (useMock === true) {
    return getData().projects
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/project`)
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    const projects = data.data || data || []
    setCache('projects', projects) // 缓存数据
    return projects
  } catch (error) {
    console.error('获取项目列表失败，尝试缓存:', error)
    const cached = getFromCache('projects')
    if (cached) return cached
    useMock = true
    return []
  }
}

export async function addProject(projectData) {
  if (useMock === true) {
    const allData = getData()
    const newProject = { _id: generateId(), ...projectData }
    allData.projects.unshift(newProject)
    saveData(allData)
    return { success: true, data: newProject }
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    })
    const result = await res.json()
    // 更新缓存
    const cached = getFromCache('projects') || []
    const newProject = { _id: generateId(), ...projectData }
    setCache('projects', [newProject, ...cached])
    return result
  } catch (error) {
    console.error('添加项目失败:', error)
    throw error
  }
}

export async function updateProject(id, projectData) {
  if (useMock === true) {
    const allData = getData()
    const index = allData.projects.findIndex(p => p._id === id)
    if (index !== -1) {
      allData.projects[index] = { ...allData.projects[index], ...projectData }
      saveData(allData)
    }
    return { success: true }
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/project`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id, ...projectData })
    })
    const result = await res.json()
    // 更新缓存
    const cached = getFromCache('projects') || []
    const updated = cached.map(p => p._id === id ? { ...p, ...projectData } : p)
    setCache('projects', updated)
    return result
  } catch (error) {
    console.error('更新项目失败:', error)
    throw error
  }
}

export async function deleteProject(id) {
  if (useMock === true) {
    const allData = getData()
    allData.projects = allData.projects.filter(p => p._id !== id)
    saveData(allData)
    return { success: true }
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/project`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id })
    })
    const result = await res.json()
    // 更新缓存
    const cached = getFromCache('projects') || []
    setCache('projects', cached.filter(p => p._id !== id))
    return result
  } catch (error) {
    console.error('删除项目失败:', error)
    throw error
  }
}

// ==================== 奖项管理 ====================

export async function getAwards() {
  if (useMock === true) {
    return getData().awards
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/award`)
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    const awards = data.data || data || []
    setCache('awards', awards) // 缓存数据
    return awards
  } catch (error) {
    console.error('获取奖项列表失败，尝试缓存:', error)
    const cached = getFromCache('awards')
    if (cached) return cached
    useMock = true
    return []
  }
}

export async function addAward(awardData) {
  if (useMock === true) {
    const allData = getData()
    const newAward = { _id: generateId(), ...awardData }
    allData.awards.unshift(newAward)
    saveData(allData)
    return { success: true, data: newAward }
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/award`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(awardData)
    })
    const result = await res.json()
    // 更新缓存
    const cached = getFromCache('awards') || []
    const newAward = { _id: generateId(), ...awardData }
    setCache('awards', [newAward, ...cached])
    return result
  } catch (error) {
    console.error('添加奖项失败:', error)
    throw error
  }
}

export async function updateAward(id, awardData) {
  if (useMock === true) {
    const allData = getData()
    const index = allData.awards.findIndex(a => a._id === id)
    if (index !== -1) {
      allData.awards[index] = { ...allData.awards[index], ...awardData }
      saveData(allData)
    }
    return { success: true }
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/award`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id, ...awardData })
    })
    const result = await res.json()
    // 更新缓存
    const cached = getFromCache('awards') || []
    const updated = cached.map(a => a._id === id ? { ...a, ...awardData } : a)
    setCache('awards', updated)
    return result
  } catch (error) {
    console.error('更新奖项失败:', error)
    throw error
  }
}

export async function deleteAward(id) {
  if (useMock === true) {
    const allData = getData()
    allData.awards = allData.awards.filter(a => a._id !== id)
    saveData(allData)
    return { success: true }
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/award`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id })
    })
    const result = await res.json()
    // 更新缓存
    const cached = getFromCache('awards') || []
    setCache('awards', cached.filter(a => a._id !== id))
    return result
  } catch (error) {
    console.error('删除奖项失败:', error)
    throw error
  }
}

// ==================== 经历管理 ====================

export async function getExperience() {
  if (useMock === true) {
    return getData().experience
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/experience`)
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    const experience = data.data || data || []
    setCache('experience', experience) // 缓存数据
    return experience
  } catch (error) {
    console.error('获取经历列表失败，尝试缓存:', error)
    const cached = getFromCache('experience')
    if (cached) return cached
    useMock = true
    return []
  }
}

export async function addExperience(expData) {
  if (useMock === true) {
    const allData = getData()
    const newExp = { _id: generateId(), ...expData }
    allData.experience.unshift(newExp)
    saveData(allData)
    return { success: true, data: newExp }
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/experience`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expData)
    })
    const result = await res.json()
    // 更新缓存
    const cached = getFromCache('experience') || []
    const newExp = { _id: generateId(), ...expData }
    setCache('experience', [newExp, ...cached])
    return result
  } catch (error) {
    console.error('添加经历失败:', error)
    throw error
  }
}

export async function updateExperience(id, expData) {
  if (useMock === true) {
    const allData = getData()
    const index = allData.experience.findIndex(e => e._id === id)
    if (index !== -1) {
      allData.experience[index] = { ...allData.experience[index], ...expData }
      saveData(allData)
    }
    return { success: true }
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/experience`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id, ...expData })
    })
    const result = await res.json()
    // 更新缓存
    const cached = getFromCache('experience') || []
    const updated = cached.map(e => e._id === id ? { ...e, ...expData } : e)
    setCache('experience', updated)
    return result
  } catch (error) {
    console.error('更新经历失败:', error)
    throw error
  }
}

export async function deleteExperience(id) {
  if (useMock === true) {
    const allData = getData()
    allData.experience = allData.experience.filter(e => e._id !== id)
    saveData(allData)
    return { success: true }
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/experience`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id })
    })
    const result = await res.json()
    // 更新缓存
    const cached = getFromCache('experience') || []
    setCache('experience', cached.filter(e => e._id !== id))
    return result
  } catch (error) {
    console.error('删除经历失败:', error)
    throw error
  }
}

// ==================== 简历管理 ====================

export async function getResume() {
  if (useMock === true) {
    return { url: '' }
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/resume`)
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    return data.data || data
  } catch (error) {
    console.error('获取简历失败:', error)
    return { url: '' }
  }
}

export async function uploadResume(file) {
  if (useMock === true) {
    return { success: true, url: 'mock-resume-url' }
  }
  
  try {
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch(`${API_BASE}/api/resume`, {
      method: 'POST',
      body: formData
    })
    return await res.json()
  } catch (error) {
    console.error('上传简历失败:', error)
    throw error
  }
}

