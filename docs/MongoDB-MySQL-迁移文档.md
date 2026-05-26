# MongoDB → MySQL 迁移：前端适配文档

## 迁移背景

| 项目 | 当前 | 目标 |
|------|------|------|
| 后端 | Laf 云函数 | Express + Prisma + MySQL |
| 数据库 | MongoDB | MySQL |
| ID 字段 | `_id` | `id` |
| API 路径 | `/get-projects` | `/api/project` |
| 认证 | 无 | JWT Token |

**重要原则：** 线上腾讯云部署不动，本地开发切换到 Express。

---

## 后端 API 文档

### API 基础信息

- 本地地址：`http://localhost:5000`
- Laf 地址：`https://lcnmaohntx.sealosbja.site`
- 认证方式：JWT Bearer Token

### API 路由对照表

| 功能 | Laf 当前 | Express 目标 | 认证 |
|------|----------|-------------|------|
| 项目列表 | GET /get-projects | GET /api/project | 否 |
| 添加项目 | POST /add-project | POST /api/project | 是 |
| 更新项目 | PUT /update-project | PUT /api/project | 是 |
| 删除项目 | DELETE /delete-project | DELETE /api/project | 是 |
| 个人信息 | GET /get-profile | GET /api/profile | 否 |
| 更新信息 | PUT /update-profile | PUT /api/profile | 是 |
| 奖项列表 | GET /get-awards | GET /api/award | 否 |
| 添加奖项 | POST /add-award | POST /api/award | 是 |
| 更新奖项 | PUT /update-award | PUT /api/award | 是 |
| 删除奖项 | DELETE /delete-award | DELETE /api/award | 是 |
| 经历列表 | GET /get-experience | GET /api/experience | 否 |
| 添加经历 | POST /add-experience | POST /api/experience | 是 |
| 更新经历 | PUT /update-experience | PUT /api/experience | 是 |
| 删除经历 | DELETE /delete-experience | DELETE /api/experience | 是 |
| 登录 | 无 | POST /api/auth/login | 否 |
| 注册 | 无 | POST /api/auth/register | 否 |

---

## 数据库 Schema

### Prisma Model

```prisma
model Profile {
  id          Int     @id @default(autoincrement())
  name        String?
  avatar      String?
  bio         String?
  education   String?
  birthDate   String?
  contact     Json?   // { wechat, email, github, phone }
  skills      Json?   // [{ name, level }]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Project {
  id         Int      @id @default(autoincrement())
  title      String?
  cover      String?
  desc       String?
  github     String?
  techStack  Json?    // ["Vue", "React"]
  features   Json?    // ["功能1", "功能2"]
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model Award {
  id        Int      @id @default(autoincrement())
  title     String?
  level     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Experience {
  id           Int      @id @default(autoincrement())
  period       String?
  organization String?
  role         String?
  description  String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model User {
  id       Int      @id @default(autoincrement())
  username String   @unique
  password String
  createdAt DateTime @default(now())
}
```

---

## 前端修改清单

### 1. API_BASE 切换

**文件：** `src/api/index.js`

```javascript
// 修改前
const API_BASE = 'https://lcnmaohntx.sealosbja.site'

// 修改后（开发环境）
const API_BASE = 'http://localhost:5000'
```

**建议：** 使用环境变量区分开发和生产环境

```javascript
const API_BASE = import.meta.env.DEV
  ? 'http://localhost:5000'
  : 'https://lcnmaohntx.sealosbja.site'
```

### 2. 路径统一加 `/api` 前缀

**文件：** `src/api/index.js`

| 当前路径 | 修改为 |
|----------|--------|
| `/get-projects` | `/api/project` |
| `/add-project` | `/api/project` |
| `/update-project` | `/api/project` |
| `/delete-project` | `/api/project` |
| `/get-profile` | `/api/profile` |
| `/update-profile` | `/api/profile` |
| `/get-awards` | `/api/award` |
| `/add-award` | `/api/award` |
| `/update-award` | `/api/award` |
| `/delete-award` | `/api/award` |
| `/get-experience` | `/api/experience` |
| `/add-experience` | `/api/experience` |
| `/update-experience` | `/api/experience` |
| `/delete-experience` | `/api/experience` |

### 3. ID 字段从 `_id` 改为 `id`

**文件：** `src/api/index.js`

| 位置 | 修改前 | 修改后 |
|------|--------|--------|
| body 传参 | `{ _id: id }` | `{ id }` |
| 过滤条件 | `p._id === id` | `p.id === id` |
| 查找条件 | `p._id === data.id` | `p.id === data.id` |
| 缓存过滤 | `p._id !== id` | `p.id !== id` |
| Mock 数据 | `_id: 'proj_1'` | `id: 1` |

### 4. 认证 Token（写操作）

**涉及函数：**
- `addProject`
- `updateProject`
- `deleteProject`
- `updateProfile`
- `addAward`
- `updateAward`
- `deleteAward`
- `addExperience`
- `updateExperience`
- `deleteExperience`

**添加 header：**

```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}
```

### 5. 登录逻辑适配

**文件：** `src/views/Login.vue`

```javascript
// 调用 Express 登录接口
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
})

const { token } = await response.json()
localStorage.setItem('token', token)
```

**默认凭证：**
- 用户名：`admin`
- 密码：需要在 Express 后端注册后使用

### 6. 退出登录

**文件：** `src/views/admin/AdminLayout.vue`

```javascript
const handleLogout = () => {
  localStorage.removeItem('token')  // 清除 token
  localStorage.removeItem('isLoggedIn')
  router.push('/login')
}
```

### 7. 字段兼容处理

#### Profile 字段

| 前端当前 | 后端 | 说明 |
|----------|------|------|
| `_id` | `id` | 主键 |
| `name` | `name` | ✅ 一致 |
| `education` | `education` | ✅ 一致 |
| `politicalStatus` | - | 后端无，可保留不传 |
| `birthDate` | `birthDate` | ✅ 一致 |
| `bio` | `bio` | ✅ 一致 |
| `contact` | `contact` | ✅ Json 格式一致 |
| `skills` | `skills` | ✅ Json 格式一致 |
| `tags` | - | 后端无，可保留 |
| `certifications` | - | 后端无，可保留 |

#### Project 字段

| 前端当前 | 后端 | 说明 |
|----------|------|------|
| `_id` | `id` | 主键 |
| `title` | `title` | ✅ 一致 |
| `cover` | `cover` | ✅ 一致 |
| `techStack` | `techStack` | ✅ 一致 |
| `github` | `github` | ✅ 一致 |
| `features` | `features` | ✅ 一致 |
| - | `desc` | 后端多一个字段，忽略 |

#### Award 字段

| 前端当前 | 后端 | 说明 |
|----------|------|------|
| `_id` | `id` | 主键 |
| `title` | `title` | ✅ 一致 |
| `level` | `level` | ✅ 一致 |
| `category` | - | 后端无，可保留 |

#### Experience 字段

| 前端当前 | 后端 | 说明 |
|----------|------|------|
| `_id` | `id` | 主键 |
| `period` | `period` | ✅ 一致 |
| `organization` | `organization` | ✅ 一致 |
| `role` | `role` | ✅ 一致 |
| `description` | `description` | ✅ 一致 |

---

## 项目结构

```
my-portfolio/              ← 前端（本地开发）
├── src/
│   ├── api/
│   │   └── index.js      ← 主要修改
│   └── views/
│       ├── Login.vue      ← 登录逻辑
│       └── admin/
│           └── AdminLayout.vue  ← 退出登录
│
my-portfolio-backend/      ← 后端（另外启动）
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── index.js
├── prisma/
│   └── schema.prisma
└── .env
```

---

## 启动顺序

### 1. 启动后端

```bash
cd my-portfolio-backend

# 首次运行
pnpm install
pnpm exec prisma db push
pnpm exec prisma generate
pnpm dev
```

### 2. 启动前端

```bash
cd my-portfolio
pnpm dev
```

---

## Mock 数据适配

**文件：** `src/api/mockData.js`

```javascript
// 修改前
{
  _id: 'proj_1',
  title: '有机蔬菜管理系统',
  cover: '/01.png',
  techStack: ['Spring Boot', 'Vue 2'],
  github: 'https://github.com/yanmo18/vegetable-system',
  features: ['功能1', '功能2']
}

// 修改后
{
  id: 1,
  title: '有机蔬菜管理系统',
  cover: '/01.png',
  techStack: ['Spring Boot', 'Vue 2'],
  github: 'https://github.com/yanmo18/vegetable-system',
  features: ['功能1', '功能2']
}
```

---

## 注意事项

1. **线上不动原则：** 腾讯云部署的网站继续使用 Laf，本地开发才切换到 Express

2. **环境变量：** 建议使用 `.env` 文件区分开发和生产环境的 API 地址

3. **认证流程：** Express 需要先登录获取 token，所有写操作都需要携带 token

4. **字段兼容：** 部分字段前后端不一致，需要做好兼容处理，避免报错

5. **后端端口：** Express 默认使用 5000 端口，确保没有冲突

6. **数据库：** 确保 MySQL 数据库已创建且 Prisma schema 已同步

---

## 后续工作

- [ ] 线上前端切换到 Express（等域名配置好）
- [ ] 添加环境变量支持
- [ ] 完善错误处理
- [ ] 添加请求重试机制
- [ ] 上传功能对接（简历、图片）
