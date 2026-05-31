# uv工程使用案例
## uv
GitHub仓库：https://github.com/astral-sh/uv
```toml
# ==========================================
# uv 项目配置文件 (pyproject.toml)
# ==========================================

# 构建系统配置
# 使用 maturin 作为构建后端，用于 Rust 和 Python 的混合项目构建
[build-system]
requires = ["maturin>=1.0,<2.0"]
build-backend = "maturin"

# ==========================================
# 项目元数据
# ==========================================
[project]
# 项目名称
name = "uv"
# 项目版本（需在发布时更新）
version = "0.11.17"
# 项目简短描述
description = "An extremely fast Python package and project manager, written in Rust."
# 项目作者信息
authors = [{ name = "Astral Software Inc.", email = "hey@astral.sh" }]
# 最低 Python 版本要求
requires-python = ">=3.8"
# 项目关键词，用于包索引搜索
keywords = [
  "uv", "requirements", "packaging"
]
# 许可证声明（支持 MIT 或 Apache-2.0）
license="MIT OR Apache-2.0"
# 许可证文件列表
license-files = ["LICENSE-APACHE", "LICENSE-MIT"]
# PyPI 分类器，定义项目的开发状态、用途等
classifiers = [
  "Development Status :: 5 - Production/Stable",  # 生产稳定版本
  "Environment :: Console",  # 命令行工具
  "Intended Audience :: Developers",  # 面向开发者
  "Operating System :: OS Independent",  # 跨平台
  "Programming Language :: Python",  # Python 项目
  "Programming Language :: Python :: 3.8",
  "Programming Language :: Python :: 3.9",
  "Programming Language :: Python :: 3.10",
  "Programming Language :: Python :: 3.11",
  "Programming Language :: Python :: 3.12",
  "Programming Language :: Python :: 3.13",
  "Programming Language :: Python :: 3.14",
  "Programming Language :: Python :: 3.15",
  "Programming Language :: Python :: 3 :: Only",  # 仅支持 Python 3
  "Programming Language :: Rust",  # 包含 Rust 代码
  "Topic :: Software Development :: Quality Assurance",
  "Topic :: Software Development :: Testing",
  "Topic :: Software Development :: Libraries",
]
# README 文件路径
readme = "README.md"

# ==========================================
# 项目 URL 链接
# ==========================================
[project.urls]
Repository = "https://github.com/astral-sh/uv"  # 代码仓库
Documentation = "https://docs.astral.sh/uv"  # 官方文档
Changelog = "https://github.com/astral-sh/uv/blob/main/CHANGELOG.md"  # 更新日志
Releases = "https://github.com/astral-sh/uv/releases"  # 发布版本
Discord = "https://discord.gg/astral-sh"  # 社区讨论

# ==========================================
# Maturin 构建工具配置
# 用于构建 Python 扩展包（Rust + Python）
# ==========================================
[tool.maturin]
# 绑定类型：bin 表示二进制可执行文件
bindings = "bin"
# 编辑模式下的编译配置文件（开发模式）
editable-profile = "dev"
# Cargo.toml 清单文件路径（Rust 项目根）
manifest-path = "crates/uv/Cargo.toml"
# Python 模块名称
module-name = "uv"
# Python 源代码目录
python-source = "python"
# 构建后去除调试符号，减小文件大小
strip = true
# 额外包含的文件列表
include = [
    # Rust 工具链配置文件，仅在源码分发时包含
    { path = "rust-toolchain.toml", format = "sdist" },
    # 内存分配器（在功能标记后的文件，需显式包含）
    { path = "crates/uv-performance-memory-allocator/**/*", format = "sdist" },
    # 跳板（蹦床）生成器，仅在源码分发时包含
    { path = "crates/uv-trampoline-builder/trampolines/*", format = "sdist" },
    # 许可证文件（Cargo 不会自动发现，需显式包含）
    # 参考：https://github.com/rust-lang/cargo/issues/5933
    { path = "LICENSE-APACHE", format = "sdist" },
    { path = "LICENSE-MIT", format = "sdist" },
]

# ==========================================
# Rooster 版本管理工具配置
# 用于自动化版本号更新和 CHANGELOG 生成
# ==========================================
[tool.rooster]
# 不在 CHANGELOG 中列出贡献者
changelog-contributors = false
# 主版本号标签（暂未使用）
major-labels = []
# 次版本号标签（breaking 变更触发）
minor-labels = ["breaking"]
# 忽略的标签（不会出现在 CHANGELOG 中）
ignore-labels = ["internal", "ci", "testing"]
# 需要更新版本号的文件列表
version_files = [
  "README.md",
  "pyproject.toml",
  # Rust crates 版本文件
  "crates/uv/Cargo.toml",
  "crates/uv-version/Cargo.toml",
  "crates/uv-build/Cargo.toml",
  "crates/uv-build/pyproject.toml",
  # 特殊处理：将版本号替换为 "next release" 标记
  { target = "crates/uv-static/src/env_vars.rs", replace = "next release" },
  # 文档文件版本更新
  "docs/getting-started/installation.md",
  "docs/guides/integration/docker.md",
  "docs/guides/integration/pre-commit.md",
  "docs/guides/integration/github.md",
  "docs/guides/integration/gitlab.md",
  "docs/guides/integration/aws-lambda.md",
  "docs/concepts/build-backend.md",
  "docs/concepts/projects/init.md",
  "docs/concepts/projects/workspaces.md",
  # 参考文档（使用 "next release" 标记）
  { target = "docs/reference/environment.md", replace = "next release" },
]

# ==========================================
# Rooster CHANGELOG 部分标签分类
# 定义如何在 CHANGELOG 中组织各个类别
# ==========================================
[tool.rooster.section-labels]
"Breaking changes" = ["breaking"]  # 破坏性变更
"Enhancements" = ["enhancement", "compatibility", "error messages"]  # 功能增强
"Preview features" = ["preview"]  # 预览功能
"Configuration" = ["configuration"]  # 配置相关
"Performance" = ["performance"]  # 性能优化
"Bug fixes" = ["bug"]  # 缺陷修复
"Rust API" = ["rustlib"]  # Rust API 更新
"Documentation" = ["documentation"]  # 文档
"Other changes" = ["__unknown__"]  # 其他未分类变更

# ==========================================
# 依赖组定义（PEP 735）
# 用于管理可选依赖组
# ==========================================
[dependency-groups]
# 文档构建依赖组
docs = [
  "black>=23.10.0",  # Python 代码格式化工具
  "mkdocs>=1.5.0",  # 静态文档生成器
  "mkdocs-material>=9.1.18",  # Material 主题
  "mkdocs-redirects>=1.2.2",  # 重定向插件
  "mkdocs-git-revision-date-localized-plugin>=1.3.0",  # Git 修订日期插件
  "mkdocs-llmstxt>=0.2.0",  # LLM 文本插件
  "mdformat>=0.7.17",  # Markdown 格式化工具
  "mdformat-mkdocs>=2.0.4",  # MkDocs 插件
  "mdformat-admon>=2.0.2",  # Admonition 插件
]
# Docker 构建依赖组
docker = [
  "cargo-zigbuild>=0.19.8",  # 跨平台编译工具
]

# ==========================================
# uv 工具自身配置
# ==========================================
[tool.uv]
# 缓存键定义：当这些文件变化时，缓存失效
cache-keys = [
    { file = "pyproject.toml" },  # 项目配置变化
    { file = "Cargo.toml" },  # 根 Cargo 配置变化
    { file = "Cargo.lock" },  # Rust 依赖锁定变化
    { file = "crates/**/*.rs" },  # Rust 源代码变化
    { file = "crates/**/Cargo.toml" },  # 子 crates 配置变化
]

# ==========================================
# uv 依赖组详细配置
# ==========================================
[tool.uv.dependency-groups]
# docs 依赖组要求 Python 3.12+
docs = { requires-python = ">=3.12" }
# docker 依赖组要求 Python 3.12+
docker = { requires-python = ">=3.12" }
```

## Fast API
```toml
# ============================================================================
# FastAPI 项目配置文件
# ============================================================================

# 构建系统配置
# 使用 PDM (Python Development Master) 作为构建后端
[build-system]
requires = ["pdm-backend"]
build-backend = "pdm.backend"

# ============================================================================
# 项目基本信息
# ============================================================================
[project]
# 项目名称
name = "fastapi"
# 版本号动态获取（从 fastapi/__init__.py 文件中）
dynamic = ["version"]
# 项目描述
description = "FastAPI framework, high performance, easy to learn, fast to code, ready for production"
# 项目 README 文件路径
readme = "README.md"
# 许可证类型
license = "MIT"
# 许可证文件列表
license-files = ["LICENSE"]
# 最低 Python 版本要求
requires-python = ">=3.10"
# 项目作者信息
authors = [
    { name = "Sebastián Ramírez", email = "tiangolo@gmail.com" },
]
# PyPI 分类器（用于 PyPI 上的项目分类）
classifiers = [
    "Intended Audience :: Information Technology",
    "Intended Audience :: System Administrators",
    "Operating System :: OS Independent",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python",
    "Topic :: Internet",
    "Topic :: Software Development :: Libraries :: Application Frameworks",
    "Topic :: Software Development :: Libraries :: Python Modules",
    "Topic :: Software Development :: Libraries",
    "Topic :: Software Development",
    "Typing :: Typed",
    "Development Status :: 4 - Beta",
    "Environment :: Web Environment",
    "Framework :: AsyncIO",
    "Framework :: FastAPI",
    "Framework :: Pydantic",
    "Framework :: Pydantic :: 2",
    "Intended Audience :: Developers",
    "Programming Language :: Python :: 3 :: Only",
    "Programming Language :: Python :: 3.10",
    "Programming Language :: Python :: 3.11",
    "Programming Language :: Python :: 3.12",
    "Programming Language :: Python :: 3.13",
    "Programming Language :: Python :: 3.14",
    "Topic :: Internet :: WWW/HTTP :: HTTP Servers",
    "Topic :: Internet :: WWW/HTTP",
]
# 项目核心依赖（所有安装都需要的包）
dependencies = [
    "starlette>=0.46.0",          # ASGI 应用框架
    "pydantic>=2.9.0",             # 数据验证和序列化库
    "typing-extensions>=4.8.0",    # Python 类型提示扩展
    "typing-inspection>=0.4.2",    # 类型检查和检查工具
    "annotated-doc>=0.0.2",        # 注解文档支持
]

# ============================================================================
# 项目链接
# ============================================================================
[project.urls]
Homepage = "https://github.com/fastapi/fastapi"
Documentation = "https://fastapi.tiangolo.com/"
Repository = "https://github.com/fastapi/fastapi"
Issues = "https://github.com/fastapi/fastapi/issues"
Changelog = "https://fastapi.tiangolo.com/release-notes/"

# ============================================================================
# 可选依赖组
# 用户可以选择性地安装这些依赖：pip install fastapi[standard]
# ============================================================================
[project.optional-dependencies]

# 标准安装（包含所有常用依赖）
standard = [
    "fastapi-cli[standard] >=0.0.8",
    "fastar >= 0.9.0",
    # 测试客户端
    "httpx >=0.23.0,<1.0.0",
    # 模板引擎
    "jinja2 >=3.1.5",
    # 表单和文件上传处理
    "python-multipart >=0.0.18",
    # 邮箱字段验证
    "email-validator >=2.0.0",
    # Uvicorn ASGI 服务器（包含 uvloop 高性能事件循环）
    "uvicorn[standard] >=0.12.0",
    # Pydantic 设置管理
    "pydantic-settings >=2.0.0",
    # Pydantic 额外数据类型支持
    "pydantic-extra-types >=2.0.0",
]

# 标准安装（不包含 FastAPI Cloud CLI）
standard-no-fastapi-cloud-cli = [
    "fastapi-cli[standard-no-fastapi-cloud-cli] >=0.0.8",
    # 测试客户端
    "httpx >=0.23.0,<1.0.0",
    # 模板引擎
    "jinja2 >=3.1.5",
    # 表单和文件上传处理
    "python-multipart >=0.0.18",
    # 邮箱字段验证
    "email-validator >=2.0.0",
    # Uvicorn ASGI 服务器
    "uvicorn[standard] >=0.12.0",
    # Pydantic 设置管理
    "pydantic-settings >=2.0.0",
    # Pydantic 额外数据类型支持
    "pydantic-extra-types >=2.0.0",
]

# 完整安装（包含所有可选依赖）
all = [
    "fastapi-cli[standard] >=0.0.8",
    # 测试客户端
    "httpx >=0.23.0,<1.0.0",
    # 模板引擎
    "jinja2 >=3.1.5",
    # 表单和文件上传处理
    "python-multipart >=0.0.18",
    # Starlette 会话中间件（FastAPI 中不常用）
    "itsdangerous >=1.1.0",
    # Starlette 架构生成（FastAPI 中不会使用）
    "pyyaml >=5.3.1",
    # 邮箱字段验证
    "email-validator >=2.0.0",
    # Uvicorn ASGI 服务器
    "uvicorn[standard] >=0.12.0",
    # Pydantic 设置管理
    "pydantic-settings >=2.0.0",
    # Pydantic 额外数据类型支持
    "pydantic-extra-types >=2.0.0",
]

# ============================================================================
# 命令行脚本入口
# ============================================================================
[project.scripts]
# 提供 fastapi 命令行工具，入口为 fastapi.cli:main 函数
fastapi = "fastapi.cli:main"

# ============================================================================
# PDM 依赖组（开发和测试依赖）
# ============================================================================
[dependency-groups]

# 完整开发环境（包含所有开发工具）
dev = [
    { include-group = "tests" },         # 测试依赖
    { include-group = "docs" },          # 文档生成依赖
    { include-group = "translations" },  # 翻译依赖
    "playwright >=1.57.0",               # 浏览器自动化测试
    "prek >=0.2.22",                     # 代码检查工具
    "zizmor >=1.23.1",                   # 安全分析工具
]

# 文档生成依赖
docs = [
    { include-group = "docs-tests" },    # 文档测试依赖
    "black >=25.1.0",                    # 代码格式化
    "cairosvg >=2.8.2",                  # SVG 图像转换
    "griffe-typingdoc >=0.3.0",          # 类型文档生成
    "griffe-warnings-deprecated >=1.1.0", # 过期警告处理
    "jieba >=0.42.1",                    # 中文分词
    "markdown-include-variants >=0.0.8", # Markdown 包含扩展
    "mdx-include >=1.4.1,<2.0.0",        # MDX 包含支持
    "mkdocstrings[python] >=1.0.3",      # 文档字符串生成
    "pillow >=11.3.0",                   # 图像处理
    "python-slugify >=8.0.4",            # URL 友好字符串转换
    "pyyaml >=5.3.1,<7.0.0",             # YAML 处理
    "typer >=0.21.1",                    # CLI 框架
    "zensical >=0.0.42",                 # 自然语言处理
]

# 文档测试依赖
docs-tests = [
    "httpx >=0.23.0,<1.0.0",             # HTTP 客户端
    "httpx2>=2.0.0",                     # HTTP 客户端 v2
    "ruff >=0.14.14",                    # Python linter 和格式化工具
]

# GitHub Actions 工作流依赖
github-actions = [
    "httpx >=0.27.0,<1.0.0",             # HTTP 客户端
    "pydantic >=2.9.0,<3.0.0",           # 数据验证
    "pydantic-settings >=2.1.0,<3.0.0",  # 设置管理
    "pygithub >=2.3.0,<3.0.0",           # GitHub API 客户端
    "pyyaml >=5.3.1,<7.0.0",             # YAML 处理
    "smokeshow >=0.5.0",                 # 测试覆盖率报告
]

# 单元测试依赖
tests = [
    { include-group = "docs-tests" },    # 文档测试依赖
    "anyio[trio] >=3.2.1,<5.0.0",        # 异步 I/O 库
    "coverage[toml] >=7.13,<8.0",        # 代码覆盖率测试
    "dirty-equals >=0.9.0",              # 灵活的相等性测试
    "flask >=3.0.0,<4.0.0",              # Flask 框架（用于对比测试）
    "inline-snapshot >=0.21.1",          # 内联快照测试
    "mypy >=1.14.1",                     # 静态类型检查
    "pwdlib[argon2] >=0.2.1",            # 密码加密库
    "pyjwt >=2.9.0",                     # JWT 令牌处理
    "pytest >=9.0.0",                    # 测试框架
    "pytest-codspeed >=4.2.0",           # 性能基准测试
    "pyyaml >=5.3.1,<7.0.0",             # YAML 处理
    "sqlmodel >=0.0.31",                 # SQL 数据模型库
    "strawberry-graphql >=0.200.0,<1.0.0", # GraphQL 框架
    "ty>=0.0.25",                        # 终端输出样式化
    "a2wsgi >=1.9.0,<=2.0.0",            # ASGI 到 WSGI 适配器
    "pytest-xdist[psutil]>=2.5.0",       # pytest 分布式执行
    "pytest-cov>=4.0.0",                 # pytest 覆盖率插件
    "pytest-sugar>=1.0.0",               # pytest 美化输出
    "pytest-timeout>=2.4.0",             # pytest 超时控制
]

# 文档翻译依赖
translations = [
    "gitpython >=3.1.46",                # Git 操作库
    "pydantic-ai >=0.4.10",              # AI 辅助翻译
    "pygithub >=2.8.1",                  # GitHub API 客户端
]

# ============================================================================
# PDM 配置
# ============================================================================
[tool.pdm]
# 版本号来源配置（从 fastapi/__init__.py 文件中读取）
version = { source = "file", path = "fastapi/__init__.py" }
# 启用分发打包
distribution = true

# PDM 构建配置
[tool.pdm.build]
# 在分发包中包含的源目录
source-includes = [
    "tests/",          # 测试文件
    "docs_src/",       # 文档源码
    "scripts/",        # 脚本文件
    # 用于测试的图片资源
    "docs/en/docs/img/favicon.png",
]

# ============================================================================
# MyPy 静态类型检查配置
# ============================================================================
[tool.mypy]
# 启用 Pydantic 插件
plugins = ["pydantic.mypy"]
# 启用严格模式（最高级别的类型检查）
strict = true

# MyPy 覆盖规则 - 并发模块
[[tool.mypy.overrides]]
module = "fastapi.concurrency"
warn_unused_ignores = false
ignore_missing_imports = true

# MyPy 覆盖规则 - 测试模块
[[tool.mypy.overrides]]
module = "fastapi.tests.*"
ignore_missing_imports = true
check_untyped_defs = true

# MyPy 覆盖规则 - 文档源码
[[tool.mypy.overrides]]
module = "docs_src.*"
disallow_incomplete_defs = false      # 允许不完整的类型定义
disallow_untyped_defs = false         # 允许无类型的定义
disallow_untyped_calls = false        # 允许无类型的调用

# ============================================================================
# Pytest 测试框架配置
# ============================================================================
[tool.pytest]
# 最低版本要求
minversion = "9.0"
# 额外命令行参数
addopts = [
  "--strict-config",      # 严格检查配置
  "--strict-markers",     # 严格检查标记
  "--ignore=docs_src",    # 忽略 docs_src 目录
]
# 严格 xfail（预期失败必须真正失败）
strict_xfail = true
# 过滤警告（将所有警告视为错误）
filterwarnings = [
    "error",
]
# 测试超时时间（秒）
timeout = "20"

# ============================================================================
# 代码覆盖率配置
# ============================================================================
[tool.coverage.run]
# 并行运行
parallel = true
# 覆盖率数据文件路径
data_file = "coverage/.coverage"
# 测量覆盖率的源代码目录
source = [
    "docs_src",
    "tests",
    "fastapi"
]
# 使用相对路径
relative_files = true
# 上下文变量
context = '${CONTEXT}'
# 排除的文件（不计入覆盖率）
omit = [
    "tests/benchmarks/*",
    "docs_src/response_model/tutorial003_04_py310.py",
    "docs_src/dependencies/tutorial013_an_py310.py",  # 临时代码示例
    "docs_src/dependencies/tutorial014_an_py310.py",  # 临时代码示例
    # Pydantic v1 迁移，不再测试
    "docs_src/pydantic_v1_in_v2/tutorial001_an_py310.py",
    "docs_src/pydantic_v1_in_v2/tutorial002_an_py310.py",
    "docs_src/pydantic_v1_in_v2/tutorial003_an_py310.py",
    "docs_src/pydantic_v1_in_v2/tutorial004_an_py310.py",
]

# 覆盖率报告配置
[tool.coverage.report]
# 显示未覆盖的行
show_missing = true
# 按覆盖率降序排序
sort = "-Cover"

# HTML 覆盖率报告配置
[tool.coverage.html]
# 显示上下文信息
show_contexts = true

# ============================================================================
# Ruff Linter 和 Formatter 配置
# ============================================================================
[tool.ruff.lint]
# 启用的 lint 规则
select = [
    "E",    # pycodestyle 错误
    "W",    # pycodestyle 警告
    "F",    # pyflakes（未使用导入等）
    "I",    # isort（导入排序）
    "B",    # flake8-bugbear（常见错误）
    "C4",   # flake8-comprehensions（列表推导式优化）
    "UP",   # pyupgrade（语法升级）
]
# 忽略的规则
ignore = [
    "E501",  # 行过长，由 black 处理
    "B008",  # 不在参数默认值中执行函数调用
    "C901",  # 函数过于复杂
]

# 每个文件的特殊 lint 规则
[tool.ruff.lint.per-file-ignores]
"__init__.py" = ["F401"]  # 忽略未使用导入警告
"docs_src/custom_request_and_route/tutorial002_an_py310.py" = ["B904"]
"docs_src/custom_request_and_route/tutorial002_py310.py" = ["B904"]
"docs_src/custom_response/tutorial007_py310.py" = ["B007"]
"docs_src/dependencies/tutorial007_py310.py" = ["F821"]
"docs_src/dependencies/tutorial008_an_py310.py" = ["F821"]
"docs_src/dependencies/tutorial008_py310.py" = ["F821"]
"docs_src/dependencies/tutorial008b_an_py310.py" = ["B904"]
"docs_src/dependencies/tutorial008b_py310.py" = ["B904"]
"docs_src/dependencies/tutorial010_py310.py" = ["F821"]
"docs_src/path_operation_advanced_configuration/tutorial007_py310.py" = ["B904"]
"docs_src/query_params_str_validations/tutorial012_an_py310.py" = ["B006"]
"docs_src/query_params_str_validations/tutorial013_an_py310.py" = ["B006"]
"docs_src/security/tutorial004_an_py310.py" = ["B904"]
"docs_src/security/tutorial004_py310.py" = ["B904"]
"docs_src/security/tutorial005_an_py310.py" = ["B904"]
"docs_src/security/tutorial005_py310.py" = ["B904"]
"docs_src/json_base64_bytes/tutorial001_py310.py" = ["UP012"]
"docs_src/stream_json_lines/tutorial001_py310.py" = ["UP028"]
"docs_src/stream_data/tutorial001_py310.py" = ["UP028"]
"docs_src/stream_data/tutorial002_py310.py" = ["UP028"]
"docs_src/server_sent_events/tutorial001_py310.py" = ["UP028"]

# isort 导入排序配置
[tool.ruff.lint.isort]
# 第三方库定义
known-third-party = ["fastapi", "pydantic", "starlette"]

# pyupgrade 配置
[tool.ruff.lint.pyupgrade]
# 即使导入 __future__ annotations 也保留运行时类型
keep-runtime-typing = true

# ============================================================================
# Inline Snapshot 快照测试配置
# ============================================================================
[tool.inline-snapshot]
# 可选：默认标志配置
# default-flags=["fix"]      # 自动修复模式
# default-flags=["create"]   # 创建模式

# ============================================================================
# Typos 拼写检查配置
# ============================================================================
[tool.typos.files]
# 扩展排除目录列表
extend-exclude = [
    "coverage/",
    "dist/",
    "docs/de/",                    # 德文文档
    "docs/en/data/",               # 英文数据文件
    "docs/en/docs/img/",           # 英文文档图片
    "docs/en/docs/release-notes.md",
    "docs/es/",                    # 西班牙文文档
    "docs/fr/",                    # 法文文档
    "docs/ja/",                    # 日文文档
    "docs/ko/",                    # 韩文文档
    "docs/language_names.yml",
    "docs/pt/",                    # 葡萄牙文文档
    "docs/ru/",                    # 俄文文档
    "docs/tr/",                    # 土耳其文文档
    "docs/uk/",                    # ��克兰文文档
    "docs/zh/",                    # 中文文档
    "docs/zh-hant/",               # 繁体中文文档
    "htmlcov/",
    "scripts/general-llm-prompt.md",
    "scripts/tests/test_translation_fixer/test_complex_doc/",
    "site/",
    "site_build/",
    "uv.lock",
]

# 拼写检查扩展标识符（允许的特殊词汇）
[tool.typos.default.extend-identifiers]
alls = "alls"

# 拼写检查扩展单词列表（允许的特殊词汇）
[tool.typos.default.extend-words]
ba = "ba"
fo = "fo"
havin = "havin"
Ines = "Ines"
ser = "ser"

# ============================================================================
# Ty 终端样式配置
# ============================================================================
[tool.ty.terminal]
# 遇到警告时报错
error-on-warning = true
```










