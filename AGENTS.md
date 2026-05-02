## 项目概述
my-portfolio 是一个基于 Vue 3 + Vite 的个人作品集网站，采用 Tailwind CSS 进行样式管理，支持国际化 (vue-i18n) 和路由 (vue-router)。

## 技术栈
- **框架**: Vue 3 (3.5.x) + Vite (8.x)
- **样式**: Tailwind CSS 4.x
- **路由**: Vue Router 4.x
- **国际化**: Vue I18n 9.x
- **包管理器**: pnpm

## 目录结构
```
/workspace/projects/
├── index.html          # 入口 HTML
├── package.json        # 依赖配置
├── vite.config.js      # Vite 配置
├── src/
│   ├── main.js         # 应用入口
│   ├── App.vue         # 根组件
│   ├── router/         # 路由配置
│   ├── views/          # 页面组件 (Home, Admin)
│   ├── components/     # 通用组件
│   ├── i18n/           # 国际化配置
│   └── style.css       # 全局样式
├── public/             # 静态资源
└── scripts/            # Coze 脚本
```

## 关键入口
- **开发启动**: `pnpm dev` (Vite dev server)
- **构建**: `pnpm build` (Vite build)
- **预览**: `pnpm preview` (Vite preview)

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

## 常见问题和预防
1. **端口冲突**: `fuser -k 5000/tcp` 清理残留进程后再启动
2. **Vue I18n 警告**: v9 已废弃，建议后续迁移到 v11
3. **pnpm 版本**: 需使用 pnpm 10.x+
