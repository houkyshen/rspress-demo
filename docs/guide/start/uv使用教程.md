# uv 使用教程

[uv](https://github.com/astral-sh/uv) 是一个由 Astral 开发的极速 Python 包安装器和项目管理器，用 Rust 编写。它旨在替代 `pip`、`pip-tools`、`virtualenv` 甚至 `poetry` 和 `pyenv`，提供显著更快的依赖解析和安装速度。

## 1. 安装 uv

### macOS / Linux
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Windows (PowerShell)
```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### 验证安装
```bash
uv --version
```

## 2. 核心功能概览

uv 主要包含两个工作流：
1. **脚本/简单项目模式**：类似于 `pip` + `venv`，但更快。
2. **项目管理模式**：类似于 `Poetry` 或 `Rust Cargo`，管理完整的项目依赖、Python 版本和发布。

## 3. 快速开始：项目管理模式 (推荐)

这是 uv 最强大的功能，它管理 `pyproject.toml`、锁文件 (`uv.lock`) 和虚拟环境。

### 初始化新项目
```bash
uv init my-project
cd my-project
# 如果已经创建了项目，直接进入项目目录然后执行以下命令：
uv init
```
这将创建以下结构：
- `pyproject.toml`: 项目配置和依赖声明。
- [README.md](file://e:\projects\rspress-related\rspress-demo\README.md)
- `main.py` (或 `<project_name>.py`)
- `.python-version`: 指定项目所需的 Python 版本。

### 添加依赖
uv 会自动处理虚拟环境的创建和激活。

```bash
# 添加一个运行时依赖（建议在虚拟环境中运行，直接在项目目录下执行也行，只要能识别到pyproject.toml文件）
uv add requests

# 添加一个开发依赖 (例如测试工具)
uv add --dev pytest
```

### 运行命令
使用 `uv run` 在项目的虚拟环境中执行命令，无需手动激活 venv。

```bash
# 运行 Python 脚本
uv run python main.py

# 运行已安装的工具
uv run pytest
```

### 同步环境
如果你从 git 克隆了一个项目，或者其他人更新了 `uv.lock`，使用 sync 来确保环境一致。

```bash
uv sync
```

### 移除依赖
```bash
uv remove requests
```

## 4. 脚本模式 (单文件脚本)

对于不需要完整项目结构的临时脚本，uv 支持内联依赖声明。

创建一个文件 `script.py`:

```python
# /// script
# requires-python = ">=3.8"
# dependencies = [
#     "requests",
# ]
# ///

import requests
print(requests.get("https://httpbin.org/ip").json())
```

直接运行：
```bash
uv run script.py
```
uv 会自动创建一个临时环境，安装 `requests`，运行脚本，然后清理（或缓存）环境。

## 5. 管理 Python 版本

uv 可以自动下载和管理 Python 解释器，无需单独安装 pyenv。

### 安装特定版本的 Python
```bash
uv python install 3.12
uv python install 3.9
```

### 列出已安装的 Python
```bash
uv python list
```

### 为项目指定 Python 版本
在项目根目录修改 `.python-version` 文件，或使用命令：
```bash
uv python pin 3.12
```

## 6. 常用命令速查表

| 任务 | 传统工具 (pip/venv/poetry) | uv 命令 |
| :--- | :--- | :--- |
| 创建项目 | `mkdir ...`, `poetry init` | `uv init <name>` |
| 添加依赖 | `pip install pkg`, `poetry add pkg` | `uv add <pkg>` |
| 添加开发依赖 | `pip install --dev`, `poetry add --group dev` | `uv add --dev <pkg>` |
| 运行代码 | `source venv/bin/activate`, `python app.py` | `uv run python app.py` |
| 同步依赖 | `pip install -r requirements.txt` | `uv sync` |
| 安装 Python | `pyenv install 3.12` | `uv python install 3.12` |
| 显示依赖树 | `pipdeptree` | `uv tree` |

## 7. 为什么选择 uv?

1. **极速**: 比 pip 快 10-100 倍，得益于 Rust 实现和全局缓存。
2. **一体化**: 统一管理 Python 版本、虚拟环境、依赖解析和锁文件。
3. **兼容标准**: 完全兼容 `pyproject.toml` 标准，不锁定于特定生态。
4. **节省磁盘空间**: 使用硬链接和全局内容寻址缓存，避免重复下载和存储包。

## 8. 常见问题

### Q: uv 和 pip 兼容吗？
A: 是的，uv 可以读取 `requirements.txt` 并安装其中的包：
```bash
uv pip install -r requirements.txt
```
但在项目管理模式下，推荐使用 `uv add` 和 `uv.lock`。

### Q: 如何导出 requirements.txt？
A: 虽然推荐直接使用 `uv.lock`，但如果需要：
```bash
uv export > requirements.txt
```

### Q: 如何更新依赖？
A: 
```bash
uv lock --upgrade-package requests
# 或者更新所有包
uv lock --upgrade
```

## 更多资源

- [官方文档](https://docs.astral.sh/uv/)
- [GitHub 仓库](https://github.com/astral-sh/uv)