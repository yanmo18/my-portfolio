#  简历-个人作品集网站

> 🔥 A modern, responsive portfolio website built with Vue 3

![Vue](https://img.shields.io/badge/Vue-3.5-green)
![Vite](https://img.shields.io/badge/Vite-8.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📝 项目简介

这是一个基于 **Vue 3** 的个人作品集网站，展示个人简历、项目作品、获奖经历和校园经历。采用前后端分离架构，支持中英双语切换，响应式设计适配多端设备。

**[👉 在线预览](https://my-portfolio-galxgagi.edgeone.cool/)** | **[👤 管理后台](https://my-portfolio-galxgagi.edgeone.cool/admin/projects)**

![首页预览](assets/show%20(1).png)

## ✨ 功能特点

### 🎨 界面设计
- 📱 **响应式布局** - 适配桌面、平板、手机等多种设备
- 🎯 **简约现代风格** - 米白底色 + 大红色强调，专业干净
- ✨ **流畅动画** - 滚动入场动画、悬停效果、浮动装饰
- 🌍 **中英双语** - 一键切换中/英文界面

### 📦 功能模块
- **首页展示**
  - 左侧固定资料卡片（头像、技能、联系方式）
  - 右侧内容区域（关于我、获奖证书、项目展示、校园经历、联系方式）
  - 右侧悬浮电梯导航 + 语言切换

- **管理后台**
  - 个人信息管理
  - 项目管理（增删改查）
  - 奖项管理（增删改查）
  - 校园经历管理（增删改查）
  - 简历上传/下载

### 🔧 技术特性
- ⚡ **Vite 构建** - 极快的开发服务器和热更新
- 🎭 **Tailwind CSS** - 原子化 CSS，快速样式开发
- 🔄 **API 降级** - 后端不可用时自动使用本地数据
- 📊 **实时数据** - 连接 Laf 云函数，实时同步

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| **Vue 3** | 渐进式 JavaScript 框架 |
| **Vite** | 下一代前端构建工具 |
| **Tailwind CSS** | 原子化 CSS 框架 |
| **Vue Router** | Vue 官方路由管理器 |
| **Vue I18n** | Vue 国际化插件 |
| **Laf** | Serverless 云开发平台 |

## 📁 项目结构

```
my-portfolio/
├── public/                    # 静态资源
├── src/
│   ├── api/                   # API 接口层
│   │   ├── index.js          # API 适配层
│   │   └── mockData.js       # Mock 数据
│   ├── components/            # 公共组件
│   ├── composables/           # 组合式函数
│   ├── i18n/                  # 国际化配置
│   │   ├── zh.js            # 中文
│   │   └── en.js            # 英文
│   ├── router/               # 路由配置
│   ├── views/                # 页面组件
│   │   ├── Home.vue         # 首页
│   │   └── admin/           # 管理后台
│   ├── App.vue
│   ├── main.js              # 入口文件
│   └── style.css            # 全局样式
├── index.html
├── vite.config.js
└── package.json
```

## 🚀 快速开始

### 环境要求
- Node.js 18+
- pnpm 10+

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/yanmo18/my-portfolio.git

# 进入目录
cd my-portfolio

# 安装依赖
pnpm install
```

### 开发预览

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:5000
```

### 生产构建

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 📝 页面路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 作品集展示 |
| `/admin` | 管理后台入口 | - |
| `/admin/profile` | 个人信息管理 | - |
| `/admin/projects` | 项目管理 | CRUD |
| `/admin/awards` | 奖项管理 | CRUD |
| `/admin/experience` | 经历管理 | CRUD |
| `/admin/resume` | 简历管理 | 上传/下载 |

## 🔌 后端 API

项目使用 **Laf 云函数** 提供后端服务，API 地址：`https://yfusw1tpgp.sealoshzh.site`

### 接口列表

| 接口 | 方法 | 说明 |
|------|------|------|
| `/get-profile` | GET | 获取个人信息 |
| `/update-profile` | PUT | 更新个人信息 |
| `/get-projects` | GET | 获取项目列表 |
| `/add-project` | POST | 添加项目 |
| `/update-project` | PUT | 更新项目 |
| `/delete-project` | DELETE | 删除项目 |
| `/get-awards` | GET | 获取奖项列表 |
| `/add-award` | POST | 添加奖项 |
| `/update-award` | PUT | 更新奖项 |
| `/delete-award` | DELETE | 删除奖项 |
| `/get-experience` | GET | 获取经历列表 |
| `/add-experience` | POST | 添加经历 |
| `/update-experience` | PUT | 更新经历 |
| `/delete-experience` | DELETE | 删除经历 |

## 🎨 配色方案

| 用途 | 颜色 | 说明 |
|------|------|------|
| 背景色 | `#FAF8F5` | 米白色 |
| 强调色 | `#e63946` | 大红色 |
| 卡片背景 | `#FFFFFF` | 纯白 |
| 正文文字 | `#000000` | 黑色 |
| 次要文字 | `#6B7280` | 灰色 |

## 🌐 部署

### Vercel 部署（推荐）

1. Fork 本项目到你的 GitHub
2. 访问 [Vercel](https://vercel.com)
3. 用 GitHub 登录，点击 "Add New Project"
4. 导入 `my-portfolio` 仓库
5. 配置构建命令：
   - Build Command: `pnpm build`
   - Output Directory: `dist`
6. 点击 Deploy

### 自动部署

每次推送到 `main` 分支，Vercel 会自动构建和部署。

<!-- ## 📊 项目数据

### 个人信息
- **姓名**：张雅岚
- **微信**：Seren450
- **邮箱**：yanqing@outlook.com
- **GitHub**：github.com/zhangyalanzyl
- **手机**：17377665272

### 项目作品
| 项目名称 | 技术栈 |
|---------|--------|
| 个人作品集网站 | Vue3, Vite, Tailwind CSS |
| 校园二手交易小程序 | 微信小程序, 云开发 |
| 在线协作白板 | React, Node.js, Socket.io |
| 智能闹钟 App | Flutter, Firebase |

### 获奖经历
| 奖项 | 级别 |
|------|------|
| ACM-ICPC 亚洲区域赛铜奖 | 国家级 |
| 蓝桥杯全国软件大赛省赛一等奖 | 省级 |
| 校程序设计竞赛一等奖 | 校级 |
| 优秀学生干部 | 校级 | -->

## 🔧 开发指南

### 添加新页面
1. 在 `src/views/` 下创建页面组件
2. 在 `src/router/index.js` 中添加路由
3. 在导航栏添加链接

### 添加新 API
1. 在 Laf 后台创建云函数
2. 在 `src/api/index.js` 中添加调用方法
3. 自动降级逻辑已内置

### 修改样式
样式使用 Tailwind CSS，参考 [官方文档](https://tailwindcss.com/docs)。

自定义样式在 `src/style.css` 中。

## 📄 License

MIT License - 欢迎使用！

## 👤 作者

**张雅岚**
- GitHub: [@yanmo18](https://github.com/yanmo18)
- Email: yanqing@outlook.com

---

<p align="center">
  <sub>Built with ❤️ by Vue 3 + Laf</sub>
</p>
