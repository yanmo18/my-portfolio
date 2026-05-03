# Gitee Pages 部署指南

## 为什么选择 Gitee Pages？

- 国内访问速度快
- 无需备案
- 免费使用
- 与 Gitee 仓库无缝集成

## 方式一：手动部署（最简单）

### 1. 同步代码到 Gitee

```bash
# 添加 Gitee 远程仓库
git remote add gitee https://gitee.com/你的用户名/my-portfolio.git

# 推送代码
git push gitee main
```

### 2. 本地构建

```bash
pnpm build
```

这会在项目目录生成 `dist` 文件夹。

### 3. 上传 dist 到 Gitee

将 `dist` 文件夹内容上传到 Gitee 仓库的 `gh-pages` 分支：
```bash
git checkout -b gh-pages
git add dist --force
git commit -m "deploy"
git push gitee gh-pages
git checkout main
```

### 4. 开启 Gitee Pages

1. 登录 [Gitee](https://gitee.com)
2. 进入仓库 → **服务** → **Gitee Pages**
3. 选择分支 `gh-pages`
4. 点击 **启动**

---

## 方式二：自动部署（推荐）

使用 [gitee-pages-actions](https://github.com/marketplace/actions/gitee-pages-action)

### 1. 创建 Personal Access Token

1. Gitee → 头像 → **设置** → **私人令牌**
2. 生成新令牌，勾选 `projects` 权限
3. 复制令牌

### 2. 在 GitHub 添加 Secrets

仓库 → **Settings** → **Secrets** → **New secret**：

| 名称 | 值 |
|------|-----|
| `GITEE_PASSWORD` | Gitee 私人令牌 |
| `GITEE_REPO` | `用户名/my-portfolio` |
| `GITEE_USERNAME` | 你的 Gitee 用户名 |

### 3. 在 GitHub 创建 workflow

在 GitHub 仓库新建文件 `.github/workflows/gitee.yml`：

```yaml
name: Deploy to Gitee Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - uses: pnpm/action-setup@v2
        with:
          version: 10
      - run: pnpm install
      - run: pnpm build
      - uses: wangchucheng/gitee-pages-action@v1
        with:
          gitee-username: ${{ secrets.GITEE_USERNAME }}
          gitee-password: ${{ secrets.GITEE_PASSWORD }}
          gitee-repo: ${{ secrets.GITEE_REPO }}
          branch: gh-pages
          directory: dist
```

### 4. 开启 Gitee Pages

Gitee 仓库 → **服务** → **Gitee Pages** → 选择 `gh-pages` 分支 → **启动**

以后每次 push 到 GitHub，会自动部署到 Gitee Pages。

---

## 访问地址

部署完成后访问：
```
https://你的用户名.gitee.io/my-portfolio
```
