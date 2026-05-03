# 部署到 Netlify

## 为什么选择 Netlify？

- 国内访问比 Vercel 好
- 免费额度充足
- 自动部署，无需配置
- 支持 SPA 路由

## 部署步骤

### 方法一：拖拽部署（最简单）

1. 打开 https://app.netlify.com/drop
2. 先在本地执行 `pnpm build` 生成 `dist` 文件夹
3. 将 `dist` 文件夹**直接拖入**页面
4. 等待部署完成，获得域名

### 方法二：连接 GitHub 部署

1. 打开 https://app.netlify.com
2. 点击 "Add new site" → "Import an existing project"
3. 选择 GitHub，授权仓库
4. 配置构建命令：
   - **Build command**: `pnpm build`
   - **Publish directory**: `dist`
5. 点击 "Deploy site"
6. 等待部署完成

### 方法三：Netlify CLI 部署

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 在项目目录执行
netlify deploy --prod
```

## 绑定自定义域名（可选）

1. 在 Netlify 项目设置 → Domain management
2. 点击 "Add custom domain"
3. 输入你的域名，按提示配置 DNS

## 国内访问优化

如果域名需要国内访问，需要备案。可以使用：
- 阿里云 OSS + CDN
- 腾讯云 COS + CDN
- 又拍云

以上平台国内访问速度快，但需要域名备案。
