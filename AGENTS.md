## 项目概述
my-portfolio 是一个基于 Vue 3 + Vite 的个人作品集网站，用于展示张雅岚的个人简历、项目作品和获奖经历。采用 Tailwind CSS 进行样式管理，支持国际化 (vue-i18n) 和路由 (vue-router)。

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
- **地址**: https://yfusw1tpgp.sealoshzh.site/api
- **类型**: Laf 云函数
- **状态**: 已就绪，代码会自动降级到 Mock 数据

## 目录结构
```
/workspace/projects/
├── src/
│   ├── api/                    # API 接口层
│   │   ├── index.js           # 统一 API 适配层（自动降级）
│   │   ├── mockData.js        # Mock 数据（localStorage 持久化）
│   │   ├── request.js         # HTTP 请求封装
│   │   ├── profile.js         # 个人信息 API
│   │   ├── projects.js        # 项目管理 API
│   │   ├── awards.js          # 奖项管理 API
│   │   ├── experience.js      # 经历管理 API
│   │   └── upload.js          # 简历上传 API
│   ├── views/
│   │   ├── Home.vue           # 首页
│   │   └── admin/             # 管理后台
│   │       ├── AdminLayout.vue    # 后台布局
│   │       ├── AdminProfile.vue   # 个人信息管理
│   │       ├── AdminProjects.vue  # 项目管理
│   │       ├── AdminAwards.vue    # 奖项管理
│   │       ├── AdminExperience.vue # 经历管理
│   │       └── AdminResume.vue    # 简历管理
│   ├── components/            # 公共组件
│   ├── composables/           # 组合式函数
│   │   └── useScrollAnimation.js  # 滚动动画
│   ├── i18n/                  # 国际化
│   │   ├── index.js
│   │   ├── zh.js
│   │   └── en.js
│   ├── router/index.js        # 路由配置
│   ├── App.vue
│   ├── main.js
│   └── style.css              # 全局样式
├── public/                    # 静态资源
├── scripts/                   # Coze 脚本
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
  features: String[],
  screenshots: String[]
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

## 运行与预览
### 预览链路
- **build**: `scripts/coze-preview-build.sh` - 安装依赖
- **run**: `scripts/coze-preview-run.sh` - 启动 Vite preview (端口 5000)

### 部署链路
- **build**: `scripts/build.sh` - 安装依赖 + Vite 构建
- **run**: `scripts/run.sh` - 启动 serve 提供 dist 产物 (端口 5000)

## Coze 配置
- **工作区根目录**: /workspace/projects
- **技术项目根目录**: /workspace/projects (与工作区根目录重合)
- **sub_id**: bdc8189f
- **project_type**: web
- **preview_enable**: enabled
- **deploy_profile**: service/web

## 用户偏好与长期约束
1. Node.js 项目必须使用 pnpm，禁止 npm 或 yarn
2. HTTP 服务端口固定为 5000
3. 预览和部署脚本需具备幂等性
4. 禁止使用或清理 9000 端口

## 已完成功能
- [x] 左侧个人信息卡片（响应式宽度 1/4 页面）
- [x] 右侧垂直导航（锚点导航 + 语言切换 + 管理入口）
- [x] 首页内容区：关于我 / 获奖证书 / 项目展示 / 校园经历 / 联系方式
- [x] 滚动入场动画
- [x] 项目详情弹窗
- [x] 中英双语切换
- [x] 管理后台 CRUD 功能
- [x] 简历上传与下载
- [x] Mock 数据层（localStorage 持久化）
- [x] API 自动降级（后端不可用时使用 Mock）

## 待优化项
1. **后端接入**: 替换 Mock 数据为真实 Laf API
2. **动画优化**: 首页滚动动画细节调优
3. **移动端适配**: 真机测试完善响应式
4. **Vue I18n**: v9 已废弃，建议迁移到 v11
5. **SEO 优化**: Meta 标签、图片 Alt
6. **性能优化**: 图片懒加载、代码分割

## 常见问题和预防
1. **Mock 数据重置**: localStorage 清除后会恢复默认数据
2. **端口冲突**: `fuser -k 5000/tcp` 清理残留进程
3. **pnpm 版本**: 需使用 pnpm 10.x+

## 当前数据
| 项目 | 内容 |
|------|------|
| 姓名 | 张雅岚 |
| 微信 | Seren450 |
| 邮箱 | yanqing@outlook.com |
| GitHub | github.com/zhangyalanzyl |
| 手机 | 17377665272 |
