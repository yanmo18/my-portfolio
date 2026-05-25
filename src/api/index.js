/**
 * API 适配层
 * 优先使用后端 API，后端不可用时：
 *   1. 优先读取 localStorage 缓存（用户之前添加的数据）
 *   2. 没有缓存则使用默认 Mock 数据
 * 
 * 成功获取后端数据时会自动更新 localStorage 缓存
 * 
 * 切换后端：改 API_BASE 地址即可
 */
import { getData, saveData, generateId } from './mockData'

// ============ API 配置 ============
// 切换后端时只需要改这里
//
// 当前：Laf 后端
const API_BASE = 'https://lcnmaohntx.sealosbja.site'
//
// 未来切换到 Express 后端时：
// 1. 把 API_BASE 改为 Express 地址
// 2. 所有路径加上 /api 前缀
//    '/get-projects' → '/api/project'
//    '/add-project' → '/api/project'

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
    const response = await fetch(`${API_BASE}/get-profile`, { 
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
    const res = await fetch(`${API_BASE}/get-profile`)
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    const profile = data.data || data
    // 后端返回空数据时使用 mockData
    if (!profile || !profile.name) {
      console.log('后端数据为空，使用默认 Mock 数据')
      return getData().profile
    }
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
    const res = await fetch(`${API_BASE}/update-profile`, {
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
    const res = await fetch(`${API_BASE}/get-projects`)
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    const projects = data.data || data || []
    // 后端返回空数据时使用 mockData
    if (!projects || projects.length === 0) {
      console.log('后端数据为空，使用默认 Mock 数据')
      return getData().projects
    }
    setCache('projects', projects) // 缓存数据
    return projects
  } catch (error) {
    console.error('获取项目列表失败，尝试缓存:', error)
    const cached = getFromCache('projects')
    if (cached) return cached
    useMock = true
    return getData().projects
  }
}

export async function addProject(projectData) {
  if (useMock === true) {
    const newProject = { _id: generateId(), ...projectData }
    const allData = getData()
    allData.projects.push(newProject)
    saveData(allData)
    return { success: true, data: newProject }
  }
  
  try {
    const res = await fetch(`${API_BASE}/add-project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    })
    const result = await res.json()
    // 刷新列表并更新缓存
    const projects = await getProjects()
    setCache('projects', projects)
    return result
  } catch (error) {
    console.error('添加项目失败:', error)
    throw error
  }
}

export async function updateProject(projectData) {
  if (useMock === true) {
    const allData = getData()
    const index = allData.projects.findIndex(p => p._id === projectData._id)
    if (index !== -1) {
      allData.projects[index] = { ...allData.projects[index], ...projectData }
      saveData(allData)
    }
    return { success: true }
  }
  
  try {
    const res = await fetch(`${API_BASE}/update-project`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    })
    const result = await res.json()
    // 刷新列表并更新缓存
    const projects = await getProjects()
    setCache('projects', projects)
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
    const res = await fetch(`${API_BASE}/delete-project`, {
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
    const res = await fetch(`${API_BASE}/get-awards`)
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    const awards = data.data || data || []
    // 后端返回空数据时使用 mockData
    if (!awards || awards.length === 0) {
      console.log('后端数据为空，使用默认 Mock 数据')
      return getData().awards
    }
    setCache('awards', awards) // 缓存数据
    return awards
  } catch (error) {
    console.error('获取奖项列表失败，尝试缓存:', error)
    const cached = getFromCache('awards')
    if (cached) return cached
    useMock = true
    return getData().awards
  }
}

export async function addAward(awardData) {
  if (useMock === true) {
    const newAward = { _id: generateId(), ...awardData }
    const allData = getData()
    allData.awards.push(newAward)
    saveData(allData)
    return { success: true, data: newAward }
  }
  
  try {
    const res = await fetch(`${API_BASE}/add-award`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(awardData)
    })
    const result = await res.json()
    // 刷新列表并更新缓存
    const awards = await getAwards()
    setCache('awards', awards)
    return result
  } catch (error) {
    console.error('添加奖项失败:', error)
    throw error
  }
}

export async function updateAward(awardData) {
  if (useMock === true) {
    const allData = getData()
    const index = allData.awards.findIndex(a => a._id === awardData._id)
    if (index !== -1) {
      allData.awards[index] = { ...allData.awards[index], ...awardData }
      saveData(allData)
    }
    return { success: true }
  }
  
  try {
    const res = await fetch(`${API_BASE}/update-award`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(awardData)
    })
    const result = await res.json()
    // 刷新列表并更新缓存
    const awards = await getAwards()
    setCache('awards', awards)
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
    const res = await fetch(`${API_BASE}/delete-award`, {
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

// ==================== 校园经历 ====================

export async function getExperience() {
  if (useMock === true) {
    return getData().experience
  }
  
  try {
    const res = await fetch(`${API_BASE}/get-experience`)
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    const experience = data.data || data || []
    // 后端返回空数据时使用 mockData
    if (!experience || experience.length === 0) {
      console.log('后端数据为空，使用默认 Mock 数据')
      return getData().experience
    }
    setCache('experience', experience) // 缓存数据
    return experience
  } catch (error) {
    console.error('获取经历列表失败，尝试缓存:', error)
    const cached = getFromCache('experience')
    if (cached) return cached
    useMock = true
    return getData().experience
  }
}

export async function addExperience(experienceData) {
  if (useMock === true) {
    const newExperience = { _id: generateId(), ...experienceData }
    const allData = getData()
    allData.experience.push(newExperience)
    saveData(allData)
    return { success: true, data: newExperience }
  }
  
  try {
    const res = await fetch(`${API_BASE}/add-experience`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(experienceData)
    })
    const result = await res.json()
    // 刷新列表并更新缓存
    const experience = await getExperience()
    setCache('experience', experience)
    return result
  } catch (error) {
    console.error('添加经历失败:', error)
    throw error
  }
}

export async function updateExperience(experienceData) {
  if (useMock === true) {
    const allData = getData()
    const index = allData.experience.findIndex(e => e._id === experienceData._id)
    if (index !== -1) {
      allData.experience[index] = { ...allData.experience[index], ...experienceData }
      saveData(allData)
    }
    return { success: true }
  }
  
  try {
    const res = await fetch(`${API_BASE}/update-experience`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(experienceData)
    })
    const result = await res.json()
    // 刷新列表并更新缓存
    const experience = await getExperience()
    setCache('experience', experience)
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
    const res = await fetch(`${API_BASE}/delete-experience`, {
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
  return { url: '/resume.pdf' } // 默认简历
}

export async function uploadResume(file) {
  if (useMock === true) {
    return { success: true, message: 'Mock 模式：简历上传已模拟' }
  }
  
  try {
    const formData = new FormData()
    formData.append('file', file)
    
    const res = await fetch(`${API_BASE}/upload-resume`, {
      method: 'POST',
      body: formData
    })
    return await res.json()
  } catch (error) {
    console.error('上传简历失败:', error)
    throw error
  }
}
