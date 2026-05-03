# Gitee Pages 部署指南

## 为什么选择 Gitee Pages？

- 国内访问速度快
- 无需备案
- 免费使用
- 与 Gitee 仓库无缝集成

## 部署步骤

### 1. 准备仓库

确保代码已推送到 Gitee 仓库：
```bash
git remote add gitee https://gitee.com/你的用户名/my-portfolio.git
git push gitee main
```

### 2. 开启 Gitee Pages

1. 登录 [Gitee](https://gitee.com)
2. 进入 `my-portfolio` 仓库
3. 点击左侧菜单 **「服务」** → **「Gitee Pages」**
4. 点击 **「启动」** 按钮
5. 选择分支 `main`，根目录 `/`
6. 点击 **「提交」**

### 3. 等待部署

部署需要 1-2 分钟，完成后会显示访问地址：
```
https://你的用户名.gitee.io/my-portfolio
```

### 4. 自定义域名（可选）

如果需要绑定自定义域名：
1. 在 Gitee Pages 设置中填入域名
2. 去域名服务商添加 CNAME 记录：
   - 主机记录：`@` 或 `www`
   - 记录类型：CNAME
   - 记录值：`你的用户名.gitee.io`

## 每次更新代码后

1. `git push gitee main`
2. 去 Gitee Pages 重新点击 **「更新」**

## 注意事项

- Gitee Pages 需要实名认证
- 私有仓库需要升级为公开仓库
- 免费版有流量限制（个人项目足够）
