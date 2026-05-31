# uv 常用命令

uv 是一个极速的 Python 包管理器和项目管理工具。

## 安装

```bash
# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows PowerShell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

## 项目初始化

```bash
uv init my-project      # 创建新项目
cd my-project           # 进入项目目录
```

## 依赖管理（使用uv run python main.py无需激活虚拟环境)

```bash
uv add requests         # 添加依赖
uv add --dev pytest     # 添加开发依赖
uv remove requests      # 移除依赖
uv sync                 # 同步环境（根据 uv.lock）
```

## 运行代码

```bash
uv run python main.py   # 运行 Python 脚本
uv run pytest           # 运行测试
```

## Python 版本管理

```bash
uv python install 3.12  # 安装 Python 3.12
uv python list          # 列出已安装的 Python
uv python pin 3.12      # 为项目指定 Python 版本
```

## 其他命令

```bash
uv tree                 # 显示依赖树
uv export               # 导出 requirements.txt
uv lock --upgrade       # 更新所有依赖
```