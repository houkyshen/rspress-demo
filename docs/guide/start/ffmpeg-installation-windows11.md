# 在 Windows 11 上安装 FFmpeg

FFmpeg 是一个强大的开源多媒体框架，能够记录、转换和流式传输音频和视频。本教程将指导你在 Windows 11 上安装 FFmpeg 并配置环境变量。

## 1. 下载 FFmpeg

1. 访问 [FFmpeg 官方构建页面](https://www.gyan.dev/ffmpeg/builds/) 或 [GitHub 发布页面](https://github.com/GyanD/codexffmpeg/releases)。
2. 下载 **ffmpeg-git-essentials.7z** (推荐) 或 **ffmpeg-git-full.7z** (包含更多编解码器)。
   - `essentials`: 包含常用工具，体积较小。
   - `full`: 包含所有编解码器和工具，体积较大。

## 2. 解压文件

1. 使用 7-Zip 或 WinRAR 解压下载的 `.7z` 文件。
2. 将解压后的文件夹重命名为 `ffmpeg`（可选，方便路径管理）。
3. 将文件夹移动到你希望安装的位置，例如 `C:\Program Files\ffmpeg` 或 `D:\Tools\ffmpeg`。

> **注意**: 记住这个路径，后续配置环境变量时需要用到。例如：`C:\Program Files\ffmpeg\bin`

## 3. 配置环境变量

为了让系统在任意位置都能识别 `ffmpeg` 命令，需要将其 `bin` 目录添加到系统 PATH 中。

1. **打开环境变量设置**:
   - 按 `Win + S`，搜索 "编辑系统环境变量" 并打开。
   - 点击右下角的 **"环境变量"** 按钮。

2. **编辑 Path 变量**:
   - 在 **"系统变量"** (下方区域) 中找到 `Path`，选中它并点击 **"编辑"**。
   - 点击 **"新建"**。
   - 输入 FFmpeg 的 `bin` 目录路径。例如：`C:\Program Files\ffmpeg\bin`。
   - 点击 **"确定"** 保存所有窗口。

## 4. 验证安装

1. 打开一个新的命令提示符 (CMD) 或 PowerShell 窗口（**重要**: 必须重新打开窗口以加载新的环境变量）。
2. 输入以下命令：
   ```bash
   ffmpeg -version
   ```
3. 如果安装成功，你将看到 FFmpeg 的版本信息和配置详情。

## 5. 基本使用示例

### 转换视频格式
将 `input.mp4` 转换为 `output.avi`:
```bash
ffmpeg -i input.mp4 output.avi
```

### 提取音频
从视频中提取音频并保存为 MP3:
```bash
ffmpeg -i input.mp4 -q:a 0 -map a output.mp3
```

### 裁剪视频
裁剪前 10 秒的视频:
```bash
ffmpeg -i input.mp4 -t 10 -c copy output.mp4
```

## 常见问题

### Q: 提示 'ffmpeg' 不是内部或外部命令？
A: 这通常意味着环境变量配置未生效。请检查：
1. 路径是否正确指向 `bin` 文件夹。
2. 是否重新打开了 CMD/PowerShell 窗口。
3. 重启电脑后再次尝试。

### Q: 如何选择版本？
A: 对于大多数用户，**git essentials** 版本已足够。如果你需要特殊的编解码器或滤镜，请选择 **git full**。

## 更多资源

- [FFmpeg 官方文档](https://ffmpeg.org/documentation.html)
- [FFmpeg 常用命令指南](https://ffmpeg.org/ffmpeg-all.html)