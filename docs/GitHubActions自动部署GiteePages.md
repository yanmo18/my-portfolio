# GitHub Actions 自动部署到 Gitee Pages

## 设置步骤

### 1. 配置 GitHub Secrets

在 GitHub 仓库中配置以下 secrets：

1. 进入仓库 → **Settings** → **Secrets and variables** → **Actions**
2. 点击 **New repository secret**，添加：

| Secret 名称 | 值 |
|------------|-----|
| `GITEE_USERNAME` | 你的 Gitee 用户名 |
| `GITEE_PASSWORD` | 你的 Gitee 密码（或私人令牌） |
| `GITEE_REPO` | 仓库路径，格式：`用户名/仓库名` |

### 2. 获取 Gitee 私人令牌（推荐）

1. 登录 Gitee → 右上角头像 → **设置**
2. 左侧菜单 → **私人令牌**
3. 点击 **生成新令牌**
4. 勾选 `projects` 权限
5. 生成后复制令牌

### 3. 在 GitHub 添加 Secrets

| Secret | 值 |
|--------|-----|
| `GITEE_USERNAME` | Gitee 用户名 |
| `GITEE_PASSWORD` | Gitee 私人令牌 |
| `GITEE_REPO` | 如 `zhangyalanzyl/my-portfolio` |

### 4. 推送代码触发部署

```bash
git push origin main
```

GitHub Actions 会自动：
1. 安装依赖
2. 构建项目
3. 部署到 Gitee Pages

### 5. 开启 Gitee Pages

1. 在 Gitee 仓库 → **服务** → **Gitee Pages**
2. 选择分支 `gh-pages`
3. 点击 **更新**

## 查看部署状态

在 GitHub 仓库 → **Actions** 页面可查看部署日志。

## 注意事项

- Gitee 账户需要已完成实名认证
- 私人令牌有效期通常为 30 天，过期需重新生成
- 首次部署约需 2-3 分钟
