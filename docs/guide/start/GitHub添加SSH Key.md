# Windows 11: 如何添加 GitHub SSH Key

在 Windows 11 上配置 GitHub SSH Key 可以让你在使用 Git 进行推送（push）和拉取（pull）操作时，无需每次都输入用户名和密码。以下是详细步骤：

## 1. 检查现有的 SSH Key

首先，检查你的电脑上是否已经存在 SSH Key。打开 **PowerShell** 或 **命令提示符 (CMD)**，输入以下命令：

```powershell
ls ~/.ssh
```

如果你看到 `id_rsa.pub` 或 `id_ed25519.pub` 等文件，说明你已经有了 SSH Key。你可以跳过第 2 步，直接进入第 3 步查看公钥内容。

## 2. 生成新的 SSH Key

如果没有现有的 Key，或者你想生成一个新的，请按照以下步骤操作：

1. 打开 **PowerShell**。
2. 输入以下命令（将 `your_email@example.com` 替换为你注册 GitHub 的邮箱地址）：

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

> **注意**: 如果你的系统不支持 Ed25519 算法，可以使用传统的 RSA 算法：
> ```powershell
> ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
> ```

3. 当系统提示 `Enter a file in which to save the key` 时，按 **Enter** 键接受默认位置（通常是 `C:\Users\YourUsername\.ssh\id_ed25519`）。
4. 接着会提示你输入密码（Passphrase）。你可以直接按 **Enter** 跳过，或者输入一个安全的密码以增加安全性。

## 3. 复制公钥内容

你需要将公钥的内容复制到剪贴板，以便粘贴到 GitHub。

在 PowerShell 中运行以下命令：

```powershell
cat $env:USERPROFILE\.ssh\id_ed25519.pub | clip
```

> **注意**: 如果你使用的是 RSA 算法，文件名应为 `id_rsa.pub`。

这个命令会将公钥内容直接复制到你的剪贴板。

## 4. 将 SSH Key 添加到 GitHub

1. 登录你的 [GitHub 账户](https://github.com)。
2. 点击右上角的头像，选择 **Settings** (设置)。
3. 在左侧侧边栏中，点击 **SSH and GPG keys**。
4. 点击绿色的 **New SSH key** 按钮。
5. 在 "Title" 字段中，为你的新密钥起一个描述性的名称（例如：`Windows 11 Laptop`）。
6. 在 "Key" 字段中，粘贴你刚才复制的公钥内容（以 `ssh-ed25519` 或 `ssh-rsa` 开头）。
7. 点击 **Add SSH key**。如果提示确认，请输入你的 GitHub 密码。

## 5. 测试连接

配置完成后，测试一下是否能成功连接到 GitHub。在 PowerShell 中输入：

```powershell
ssh -T git@github.com
```

如果你看到如下信息，说明配置成功：

```
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

## 常见问题

### Q: 为什么我仍然被要求输入密码？
A: 确保你的 Git 远程 URL 使用的是 SSH 格式而不是 HTTPS。
- **SSH 格式**: `git@github.com:username/repo.git`
- **HTTPS 格式**: `https://github.com/username/repo.git`

你可以通过以下命令查看当前的远程 URL：
```powershell
git remote -v
```

如果需要修改为 SSH 格式：
```powershell
git remote set-url origin git@github.com:username/repo.git
```

### Q: 权限问题 (Permissions are too open)
A: 确保 `.ssh` 文件夹和私钥文件的权限是受限的。在 Windows 上，通常通过 `ssh-agent` 管理可以避免大部分权限问题。如果遇到问题，可以尝试右键点击 `.ssh` 文件夹 -> 属性 -> 安全，确保只有当前用户有完全控制权。

## 更多资源

- [GitHub 官方文档：生成新的 SSH 密钥](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [GitHub 官方文档：测试 SSH 连接](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection)