## 项目概述
my-portfolio 是一个基于 Vue 3 + Vite 的个人作品集网站，用于展示 Fernoa 的个人简历、项目作品和获奖经历。采用 Tailwind CSS 进行样式管理，支持国际化 (vue-i18n) 和路由 (vue-router)。

## 技术栈
| 技术 | 版本 | 用途 |
|------|------|------|
| Vue 3 | 3.5.x | 核心框架 |
| Vite | 8.x | 构建工具 |
| Tailwind CSS | 4.x | 样式框架 |
| Vue Router | 4.x | 路由管理 |
| Vue I18n | 9.x | 国际化 |
| pnpm | 10.x | 包管理器 |

## 配色规范
| 用途 | 颜色值 |
|------|--------|
| 背景色 | #FAF8F5 |
| 强调色 | #e63946 |
| 卡片背景 | #FFFFFF |
| 正文文字 | #000000 |
| 次要文字 | #6B7280 |

## 后端服务
- **类型**: Laf 云函数 + MongoDB
- **状态**: ⚠️ 数据库异常，正在重建
- **容灾**: 实现了 localStorage 智能缓存，后端不可用时自动降级

## 接口列表（Laf 云函数）
| 接口 | 方法 | 说明 |
|------|------|------|
| /get-profile | GET | 获取个人信息 |
| /update-profile | PUT | 更新个人信息 |
| /get-projects | GET | 获取项目列表 |
| /add-project | POST | 添加项目 |
| /update-project | PUT | 更新项目 |
| /delete-project | DELETE | 删除项目 |
| /get-awards | GET | 获取奖项列表 |
| /add-award | POST | 添加奖项 |
| /update-award | PUT | 更新奖项 |
| /delete-award | DELETE | 删除奖项 |
| /get-experience | GET | 获取经历列表 |
| /add-experience | POST | 添加经历 |
| /update-experience | PUT | 更新经历 |
| /delete-experience | DELETE | 删除经历 |
| /upload-resume | POST | 上传简历 |

## 目录结构
```
my-portfolio/
├── src/
│   ├── api/
│   │   ├── index.js        # API 适配层（智能缓存降级）
│   │   └── mockData.js     # Mock 默认数据
│   ├── views/
│   │   ├── Home.vue        # 首页
│   │   └── admin/          # 管理后台
│   │       ├── AdminLayout.vue
│   │       ├── AdminProfile.vue
│   │       ├── AdminProjects.vue
│   │       ├── AdminAwards.vue
│   │       ├── AdminExperience.vue
│   │       └── AdminResume.vue
│   ├── composables/
│   │   └── useScrollAnimation.js
│   ├── i18n/
│   │   ├── zh.js
│   │   └── en.js
│   ├── router/index.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── public/
│   └── avatar.jpg
├── scripts/
├── index.html
├── vite.config.js
└── package.json
```

## 页面路由
| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | Home.vue | 首页（访客观看） |
| `/admin` | AdminLayout | 管理后台入口 |
| `/admin/profile` | AdminProfile | 个人信息管理 |
| `/admin/projects` | AdminProjects | 项目管理 |
| `/admin/awards` | AdminAwards | 获奖证书管理 |
| `/admin/experience` | AdminExperience | 校园经历管理 |
| `/admin/resume` | AdminResume | 简历上传管理 |

## 关键入口
```bash
pnpm dev      # 开发模式
pnpm build    # 生产构建
pnpm preview  # 预览构建产物
```

## 数据结构

### 个人信息 Profile
```javascript
{
  name: String,
  education: String,
  politicalStatus: String,
  birthDate: String,
  bio: String,
  contact: { wechat, email, github, phone },
  skills: [{ name: String, level: Number }]
}
```

### 项目 Project
```javascript
{
  _id: String,
  title: String,
  cover: String (URL),
  techStack: String[],
  github: String (URL),
  features: String[]
}
```

### 奖项 Award
```javascript
{ _id: String, title: String, level: String }
```

### 经历 Experience
```javascript
{ _id: String, period: String, organization: String, role: String, description: String }
```

## 用户偏好与长期约束
1. Node.js 项目必须使用 pnpm，禁止 npm 或 yarn
2. HTTP 服务端口固定为 5000
3. 禁止使用或清理 9000 端口
4. 图片使用 URL 输入方式，不做上传存储

## 常见问题
1. **Mock 数据重置**: localStorage 清除后会恢复默认数据
2. **端口冲突**: `fuser -k 5000/tcp` 清理残留进程
3. **pnpm 版本**: 需使用 pnpm 10.x+

## 当前数据
| 项目 | 内容 |
|------|------|
| 姓名 | Fernoa |
| 微信 | Seren450 |
| 邮箱 | yanqing@outlook.com |
| GitHub | github.com/yanmo18 |
| 手机 | 17377665272 |
