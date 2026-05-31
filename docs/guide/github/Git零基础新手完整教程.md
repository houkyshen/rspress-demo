# Git 零基础新手完整教程

## 前言：为什么要学 Git？

Git 是目前全球通用的**代码版本控制工具**，不管是个人写项目、团队协作开发、开源贡献，都是必备基础技能。

新手只需记住 Git 的三大核心作用：

1. **版本回溯**：代码改崩了、改错了，一键退回任意历史版本，不怕丢代码；

2. **进度管理**：清晰记录每一次代码修改、修改人、修改内容，方便复盘；

3. **团队协作**：多人同时开发项目，互不干扰，轻松合并代码、同步进度。

本文全程无晦涩术语，所有命令可直接复制执行，零基础、从未接触过 Git 也能看懂。

## 一、Git 安装（全平台）

### 1\.1 下载安装

官方下载地址：[https://git\-scm\.com/](https://git-scm.com/)

- Windows/Mac：直接下载最新版，**全程默认下一步安装即可**，无需修改配置；

- Linux（Ubuntu/Debian）：终端执行一键安装命令。

```bash
sudo apt update && sudo apt install git -y
```

### 1\.2 验证是否安装成功

打开终端（Windows 打开 Git Bash），输入以下命令，输出版本号即安装成功：

```bash
git --version
```

## 二、首次使用必做：全局身份配置（只做一次）

Git 需要识别你的身份，所有代码提交记录都会绑定你的用户名和邮箱，**整台电脑只需配置一次**。

### 2\.1 配置用户名

```bash
git config --global user.name "你的用户名"
```

### 2\.2 配置邮箱

```bash
git config --global user.email "你的邮箱"
```

示例（可直接参考格式）：

```bash
git config --global user.name "ZhangSan"
git config --global user.email "123456@qq.com"
```

### 2\.3 查看配置是否生效

```bash
git config --global --list
```

## 三、Git 核心基础概念（新手必懂）

弄懂这 3 个区域，就能避开 90% 的新手报错：

### 3\.1 三大工作区域

1. **工作区**：你电脑本地真实的项目文件夹，日常写代码、改代码的地方；

2. **暂存区**：临时中转站，存放你**准备提交**的代码，相当于“待保存草稿箱”；

3. **本地仓库**：本地永久存档区，保存所有历史版本，可随时回溯。

### 3\.2 核心流程（本地）

修改代码（工作区） → 加入暂存区 → 提交到本地仓库（永久保存）

## 四、本地项目全套基础操作（最常用）

### 4\.1 初始化 Git 仓库

进入你的项目根目录，执行命令，将普通文件夹变成 Git 托管项目：

```bash
git init
```

执行后会生成隐藏文件夹 `\.git`，**不要删除、不要修改**，这是 Git 的核心配置文件夹。

### 4\.2 查看文件状态

随时查看当前项目文件的修改、新增、删除状态：

```bash
git status
```

### 4\.3 文件加入暂存区

单个文件加入暂存区：

```bash
git add 文件名.后缀
```

所有文件一次性加入暂存区（新手最常用）：

```bash
git add .
```

### 4\.4 提交到本地仓库（永久保存版本）

**必须带备注**，说明本次修改内容，方便后续回溯：

```bash
git commit -m "本次修改备注"
```

示例：

```bash
git commit -m "完成首页基础布局，修复登录bug"
```

### 4\.5 查看历史提交记录

```bash
# 简洁版记录
git log --oneline

# 详细版记录
git log
```

## 五、版本回溯（改错必用）

代码改崩、改错，可退回任意历史版本，安全不翻车。

### 5\.1 软回溯（推荐）

退回指定版本，**保留当前代码修改**，可重新修改提交：

```bash
git reset --soft 版本号
```

### 5\.2 硬回溯（谨慎使用）

退回指定版本，**清空当前所有修改**，不可恢复：

```bash
git reset --hard 版本号
```

注：版本号通过 `git log \-\-oneline` 查看，取前 6 位即可。

## 六、Git 分支管理（团队开发核心）

分支的作用：**主分支保存稳定代码，新功能、bug修复在新分支开发，不影响主线代码**。

新手默认主分支为 `main` 或 `master`。

### 6\.1 查看所有分支

```bash
git branch
```

### 6\.2 创建新分支

```bash
git branch 分支名
```

### 6\.3 切换分支

```bash
git checkout 分支名
```

### 6\.4 创建并切换分支（一步到位，常用）

```bash
git checkout -b 分支名
```

### 6\.5 合并分支

场景：新功能开发完成，将开发分支代码合并到主分支

1. 先切换到主分支：`git checkout main`

2. 执行合并：

```bash
git merge 待合并分支名
```

### 6\.6 删除分支

```bash
git branch -d 分支名
```

## 七、远程仓库关联（GitHub/Gitee）

本地代码推送云端、团队同步代码必备，以 Gitee/GitHub 通用流程为例。

### 7\.1 关联远程仓库

复制云端仓库地址，执行关联命令：

```bash
git remote add origin 远程仓库地址
```

### 7\.2 查看远程关联状态

```bash
git remote -v
```

### 7\.3 推送本地代码到云端

```bash
git push origin main
```

### 7\.4 拉取云端最新代码（团队协作必用）

同步队友提交的最新代码到本地：

```bash
git pull origin main
```

### 7\.5 克隆远程项目到本地

下载别人的云端项目到本地，无需初始化仓库：

```bash
git clone 远程仓库地址
```

## 八、新手专属：完整实操流程（日常开发通用）

从 0 到推送云端，一套完整流程，日常开发直接套用：

1. 修改本地代码，完成功能开发；

2. 查看文件状态：`git status`

3. 添加所有修改到暂存区：`git add \.`

4. 提交本地版本：`git commit \-m \&\#34;完成xxx功能\&\#34;`

5. 拉取云端最新代码（避免冲突）：`git pull origin main`

6. 推送代码到云端：`git push origin main`

## 九、新手高频报错 \&amp; 解决方案

### 9\.1 报错：fatal: not a git repository

原因：当前文件夹未初始化 Git 仓库

解决：执行 `git init`

### 9\.2 报错：error: src refspec main does not match any

原因：没有任何代码提交记录，无法推送

解决：先执行 `git add \.` \+ `git commit \-m \&\#34;初始化项目\&\#34;`

### 9\.3 推送冲突：needs merge

原因：云端代码和本地代码版本不一致（队友修改了同一文件）

解决：先执行 `git pull origin main` 拉取最新代码，手动合并冲突后再推送

## 十、新手必备 \.gitignore 文件

作用：设置**不需要提交**的文件（环境文件、缓存、配置、虚拟环境等），避免垃圾文件上传云端。

在项目根目录新建 `\.gitignore` 文件，粘贴以下通用配置（适配 Python、前端、后端通用）：

```plain
# 虚拟环境
.venv/
venv/

# 缓存文件
__pycache__/
*.pyc

# 系统文件
.DS_Store
Thumbs.db

# IDE 配置
.vscode/
.idea/

# 日志、临时文件
*.log
tmp/
```

## 十一、极简常用命令速查表

```bash
# 初始化仓库
git init

# 查看状态
git status

# 添加暂存
git add .

# 提交版本
git commit -m "备注"

# 查看记录
git log --oneline

# 新建切换分支
git checkout -b 分支名

# 合并分支
git merge 分支名

# 关联远程仓库
git remote add origin 仓库地址

# 拉取代码
git pull origin main

# 推送代码
git push origin main

# 克隆项目
git clone 仓库地址
```

> （注：文档部分内容可能由 AI 生成）
