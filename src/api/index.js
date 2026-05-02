/**
 * API 适配层
 * 优先使用后端 API，后端不可用时自动降级到 Mock 数据
 * Laf 后端地址: https://yfusw1tpgp.sealoshzh.site
 */
import { getData, saveData, generateId } from './mockData'

const API_BASE = 'https://yfusw1tpgp.sealoshzh.site'
let useMock = false // 默认尝试使用后端

// 测试后端连接
export async function testBackend() {
  try {
    const response = await fetch(`${API_BASE}/get-profile`)
    if (response.ok) {
      useMock = false
      console.log('后端连接成功，使用真实 API')
      return 'success'
    }
  } catch (e) {
    console.log('后端不可用，使用 Mock 数据')
    useMock = true
    return 'failed'
  }
}

// ==================== 个人信息 ====================

export async function getProfile() {
  if (useMock) {
    return getData().profile
  }
  
  try {
    const res = await fetch(`${API_BASE}/get-profile`)
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    return data.data || data
  } catch (error) {
    console.error('获取个人信息失败，使用默认数据:', error)
    useMock = true
    return getData().profile
  }
}

export async function updateProfile(profileData) {
  if (useMock) {
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
    return await res.json()
  } catch (error) {
    console.error('更新个人信息失败:', error)
    throw error
  }
}

// ==================== 项目管理 ====================

export async function getProjects() {
  if (useMock) {
    return getData().projects
  }
  
  try {
    const res = await fetch(`${API_BASE}/get-projects`)
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    return data.data || data || []
  } catch (error) {
    console.error('获取项目列表失败:', error)
    useMock = true
    return []
  }
}

export async function addProject(projectData) {
  if (useMock) {
    const allData = getData()
    const newProject = { _id: generateId(), ...projectData }
    allData.projects.unshift(newProject)
    saveData(allData)
    return { success: true, data: newProject }
  }
  
  try {
    const res = await fetch(`${API_BASE}/add-project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    })
    return await res.json()
  } catch (error) {
    console.error('添加项目失败:', error)
    throw error
  }
}

export async function updateProject(id, projectData) {
  if (useMock) {
    const allData = getData()
    const index = allData.projects.findIndex(p => p._id === id)
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
      body: JSON.stringify({ _id: id, ...projectData })
    })
    return await res.json()
  } catch (error) {
    console.error('更新项目失败:', error)
    throw error
  }
}

export async function deleteProject(id) {
  if (useMock) {
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
    return await res.json()
  } catch (error) {
    console.error('删除项目失败:', error)
    throw error
  }
}

// ==================== 奖项管理 ====================

export async function getAwards() {
  if (useMock) {
    return getData().awards
  }
  
  try {
    const res = await fetch(`${API_BASE}/get-awards`)
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    return data.data || data || []
  } catch (error) {
    console.error('获取奖项列表失败:', error)
    useMock = true
    return []
  }
}

export async function addAward(awardData) {
  if (useMock) {
    const allData = getData()
    const newAward = { _id: generateId(), ...awardData }
    allData.awards.unshift(newAward)
    saveData(allData)
    return { success: true, data: newAward }
  }
  
  try {
    const res = await fetch(`${API_BASE}/add-award`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(awardData)
    })
    return await res.json()
  } catch (error) {
    console.error('添加奖项失败:', error)
    throw error
  }
}

export async function updateAward(id, awardData) {
  if (useMock) {
    const allData = getData()
    const index = allData.awards.findIndex(a => a._id === id)
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
      body: JSON.stringify({ _id: id, ...awardData })
    })
    return await res.json()
  } catch (error) {
    console.error('更新奖项失败:', error)
    throw error
  }
}

export async function deleteAward(id) {
  if (useMock) {
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
    return await res.json()
  } catch (error) {
    console.error('删除奖项失败:', error)
    throw error
  }
}

// ==================== 经历管理 ====================

export async function getExperience() {
  if (useMock) {
    return getData().experience
  }
  
  try {
    const res = await fetch(`${API_BASE}/get-experience`)
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    return data.data || data || []
  } catch (error) {
    console.error('获取经历列表失败:', error)
    useMock = true
    return []
  }
}

export async function addExperience(expData) {
  if (useMock) {
    const allData = getData()
    const newExp = { _id: generateId(), ...expData }
    allData.experience.unshift(newExp)
    saveData(allData)
    return { success: true, data: newExp }
  }
  
  try {
    const res = await fetch(`${API_BASE}/add-experience`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expData)
    })
    return await res.json()
  } catch (error) {
    console.error('添加经历失败:', error)
    throw error
  }
}

export async function updateExperience(id, expData) {
  if (useMock) {
    const allData = getData()
    const index = allData.experience.findIndex(e => e._id === id)
    if (index !== -1) {
      allData.experience[index] = { ...allData.experience[index], ...expData }
      saveData(allData)
    }
    return { success: true }
  }
  
  try {
    const res = await fetch(`${API_BASE}/update-experience`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id, ...expData })
    })
    return await res.json()
  } catch (error) {
    console.error('更新经历失败:', error)
    throw error
  }
}

export async function deleteExperience(id) {
  if (useMock) {
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
    return await res.json()
  } catch (error) {
    console.error('删除经历失败:', error)
    throw error
  }
}

// ==================== 简历管理 ====================

export async function getResume() {
  if (useMock) {
    return getData().resume
  }
  
  try {
    const res = await fetch(`${API_BASE}/get-resume`)
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    return data.data || data
  } catch (error) {
    console.error('获取简历失败:', error)
    useMock = true
    return null
  }
}

export async function uploadResume(file) {
  if (useMock) {
    // Mock: 将文件转为 base64 存储
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const allData = getData()
        allData.resume = {
          url: reader.result,
          name: file.name,
          size: file.size,
          uploadedAt: new Date().toISOString()
        }
        saveData(allData)
        resolve({ success: true, data: allData.resume })
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
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

// 导出是否使用 mock
export function isUsingMock() {
  return useMock
}
