import { db } from 'db'

const { col } = db

/**
 * 更新校园经历
 * 请求方式: PUT
 * 请求体: { _id: string, period: string, organization: string, role: string, description: string }
 */
exports.main = async function (ctx: any) {
  const { _id, period, organization, role, description } = ctx.body

  if (!_id) {
    return { code: 400, error: '缺少 _id 参数' }
  }

  try {
    const result = await col('experience').updateOne(
      { _id },
      { 
        $set: { 
          period,
          organization,
          role,
          description,
          updatedAt: new Date()
        } 
      }
    )

    if (result.modifiedCount === 0) {
      return { code: 404, error: '未找到该经历或未做任何修改' }
    }

    return { code: 0, message: '更新成功' }
  } catch (error: any) {
    console.error('更新经历失败:', error)
    return { code: 500, error: error.message || '更新失败' }
  }
}
