# Claude Code vs OpenCode：命令全面对比指南

本文面向**同时使用或正在选型** Claude Code 与 OpenCode 的开发者，从 CLI 命令、Slash 命令、快捷键、配置体系、扩展生态、定价许可到核心工作流差异，做系统性的横向对比。

> **版本说明**：对比基于 Claude Code v2.1.x（2026 年 5 月）和 OpenCode 1.14.x（2026 年 5 月），两者都在快速迭代中，具体命令以 `--help` 输出为准。

---

## 一、产品定位速览

| 维度 | Claude Code | OpenCode |
|---|---|---|
| **开发者** | Anthropic（官方） | anomalyco（社区驱动，前 sst.dev） |
| **开源** | ❌ 闭源（免费使用，API 付费） | ✅ 完全开源（MIT） |
| **核心语言** | TypeScript | TypeScript + Go |
| **运行时** | Node.js | Bun |
| **默认模型** | Claude 系列（Opus/Sonnet/Haiku） | 75+ 模型可选（Claude/GPT/Gemini/DeepSeek/GLM-4 等） |
| **架构模式** | 直接交互 + Agent 调度 | Plan/Build 双模式 + 多 Agent |
| **TUI 框架** | 自研终端 UI | 自研 Bubble Tea 风格 TUI |
| **IDE 集成** | VS Code / JetBrains 扩展 | ACP 协议（IDE 无关） |
| **目标用户** | Claude 生态用户，追求最强代码理解 | 多模型用户，追求灵活性和开源可控 |

---

## 二、安装与环境

### 2.1 安装方式对比

| 安装途径 | Claude Code | OpenCode |
|---|---|---|
| **npm 全局安装** | `npm install -g @anthropic-ai/claude-code` | `npm install -g opencode-ai` |
| **原生包管理器** | ❌ 不支持 | `brew install anomalyco/tap/opencode` |
| **Linux 包管理** | ❌ 不支持 | `pacman -S opencode`（Arch）/ `paru -S opencode-bin` |
| **Windows 包管理** | ❌ 不支持 | `choco install opencode` / `scoop install opencode` |
| **Docker** | ❌ 无官方镜像 | `docker run -it --rm ghcr.io/anomalyco/opencode` |
| **Shell 补全** | ❌ 无内置 | `opencode completion` 生成 bash/zsh/fish 补全脚本 |
| **升级方式** | `npm update -g @anthropic-ai/claude-code` | `opencode upgrade`（内置命令） |
| **卸载方式** | `npm uninstall -g @anthropic-ai/claude-code` | `opencode uninstall`（内置命令） |

> **总结**：OpenCode 安装方式更多样，对 Windows 和 Linux 用户更友好；Claude Code 主要依赖 npm 生态。

### 2.2 环境变量对比

| 用途 | Claude Code | OpenCode |
|---|---|---|
| **API Key** | `ANTHROPIC_API_KEY` | `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` / `GEMINI_API_KEY` 等 |
| **服务认证** | ❌ 无 | `OPENCODE_SERVER_PASSWORD` / `OPENCODE_SERVER_USERNAME` |
| **自动分享** | ❌ 无 | `OPENCODE_AUTO_SHARE=true` |
| **禁用自动更新** | ❌ 无 | `OPENCODE_DISABLE_AUTOUPDATE=true` |
| **实验性功能** | `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | `OPENCODE_EXPERIMENTAL_PLAN_MODE=1` |
| **配置文件路径** | ❌ 固定路径 | `OPENCODE_CONFIG` 可自定义 |
| **Bedrock / Vertex** | `CLAUDE_CODE_USE_BEDROCK=1` / `CLAUDE_CODE_USE_VERTEX=1` | ❌ 不支持（但可直接配对应 API Key） |

---

## 三、CLI 启动命令对比

### 3.1 基本启动

| 场景 | Claude Code | OpenCode |
|---|---|---|
| **启动 TUI** | `claude` | `opencode` 或 `opencode [project-path]` |
| **非交互单次执行** | `claude -p "your prompt"` | `opencode run "your prompt"` |
| **继续上次会话** | `claude --resume` 或 `claude -c` | `opencode --continue` 或 `opencode -c` |
| **指定会话 ID** | `claude --resume <session-id>` | `opencode --session <id>` 或 `opencode -s <id>` |
| **指定模型** | `claude --model sonnet` 或 `claude -m sonnet` | `opencode --model anthropic/claude-sonnet-4-6` 或 `opencode -m anthropic/claude-sonnet-4-6` |
| **指定 Agent** | ❌ CLI 不支持直接指定 | `opencode --agent build` 或 `opencode --agent plan` |
| **分叉会话** | ❌ CLI 不支持 | `opencode --fork` |
| **附加文件** | `claude -p "review" --file src/app.ts` | `opencode run "review" --file src/app.ts` 或 `opencode run "review @src/app.ts"` |
| **管道模式** | `echo "explain" \| claude -p` 从 stdin 读取 | `echo "explain" \| opencode run` 从 stdin 读取 |

### 3.2 执行模式对比

| 模式 | Claude Code | OpenCode |
|---|---|---|
| **交互式 TUI** | `claude` | `opencode` |
| **一次性执行** | `claude -p "prompt"` | `opencode run "prompt"` |
| **无头 HTTP 服务** | ❌ 不支持（需借助 claude-agent-sdk） | `opencode serve` |
| **Web UI 模式** | ❌ 不支持 | `opencode web` |
| **远程接入** | `/teleport`（从 Web 拉回终端） | `opencode attach <url>`（连接远程服务器） |
| **ACP 协议（IDE 桥）** | ❌ 专用 IDE 扩展 | `opencode acp`（标准 stdin/stdout 桥） |
| **JSON 输出（管道）** | `claude -p "prompt" --output-format json` | `opencode run "prompt" --format json` |
| **免审批自动运行** | `claude -p "prompt" --dangerously-skip-permissions` | `opencode run "prompt" --dangerously-skip-permissions` |

> **关键差异**：
> - OpenCode 内置了 `serve` / `web` / `attach` 等**远程服务能力**，Claude Code 需要通过 claude.ai 的 `/teleport` 或 `/remote-control` 实现。
> - Claude Code 的 `-p`（print）模式更简洁；OpenCode 用 `run` 子命令，功能分层更清晰。
> - OpenCode 的 `--fork` 允许在不影响原会话的前提下分叉探索，Claude Code 需要用会话内 `/branch` 命令。

---

## 四、Slash Commands（会话内命令）对比

这是用户在 TUI 中输入 `/` 后可以使用的命令，是日常使用最高频的部分。

### 4.1 会话管理

| 功能 | Claude Code | OpenCode |
|---|---|---|
| 新建会话 | `/clear` | `/new` 或 `/clear` |
| 列出/切换会话 | `/resume` | `/sessions` 或 `/resume` 或 `/continue` |
| 重命名会话 | `/rename [name]` | ❌ 不支持 |
| 分叉会话 | `/branch [name]` | ❌ 需退出后用 `opencode --fork` |
| 导出会话 | `/export [filename]` | `/export` |
| 分享会话 | ❌ 不支持 | `/share`（生成公开 URL） / `/unshare` |
| 压缩上下文 | `/compact [instructions]` | `/compact` 或 `/summarize` |
| 撤销操作 | `/rewind` | `/undo` / `/redo` |
| 查看 Diff | `/diff` | ❌ 不支持 |
| 复制回复 | `/copy [N]` | ❌ 不支持 |
| 后台运行 | `/background` | ❌ 不支持 |

### 4.2 模型与模式切换

| 功能 | Claude Code | OpenCode |
|---|---|---|
| 切换模型 | `/model [name]` | `/models`（查看列表，切换需退出用 `-m` 启动或快捷键） |
| 设置推理深度 | `/effort [level]` | ❌ 不支持（通过 `--variant` 在 CLI 设置） |
| 切换 Plan/Build 模式 | `/plan` | Tab 键或 `/build` |
| 快速模式 | `/fast [on\|off]` | ❌ 不支持 |
| 切换主题 | `/theme` | `/themes` |

### 4.3 代码质量与分析

| 功能 | Claude Code | OpenCode |
|---|---|---|
| 代码审查 | `/code-review` 或 `/review` | ❌ 无内置（可自定义 commands） |
| 安全审查 | `/security-review` | ❌ 无内置 |
| 代码简化 | `/simplify` | ❌ 无内置 |
| PR 评论处理 | `/pr-comments` | ❌ 无内置 |
| 初始化项目 | `/init` | `/init` |
| PR 创建 | `/pr` | `opencode pr <number>`（CLI 命令，非 slash） |

> **关键差异**：Claude Code 内置了大量**代码质量相关的技能型 slash 命令**（security-review、simplify、code-review、pr-comments），OpenCode 依赖用户通过自定义 commands 来补足。

### 4.4 项目与环境管理

| 功能 | Claude Code | OpenCode |
|---|---|---|
| 添加目录权限 | `/add-dir <path>` | ❌ 不支持 |
| 查看待办事项 | `/todos` | ❌ 不支持 |
| 定时循环任务 | `/loop [interval] <prompt>` | ❌ 不支持 |
| 调度任务 | `/schedule` | ❌ 不支持 |
| 记忆/项目上下文 | `/memory` | ❌ 不支持（替代方案：`/init` 生成 AGENTS.md） |
| 查看状态 | `/status` | `/details` |
| 查看费用 | `/cost` | ❌ 不支持（替代方案：`opencode stats` CLI 命令） |
| 查看上下文占用 | `/context` | ❌ 不支持 |

### 4.5 远程与跨设备

| 功能 | Claude Code | OpenCode |
|---|---|---|
| 远程控制 | `/remote-control` 或 `/rc` | `opencode serve` + `opencode attach` |
| 从 Web 拉到终端 | `/teleport` 或 `/tp` | ❌ 不支持（反之：TUI → Web） |
| 桌面应用切换 | `/desktop` 或 `/app` | ❌ 不支持 |
| 语音输入 | `/voice` | ❌ 不支持 |
| Chrome 集成 | `/chrome` | ❌ 不支持 |
| IDE 连接 | `/ide` | `opencode acp`（ACP 协议） |

### 4.6 扩展与插件

| 功能 | Claude Code | OpenCode |
|---|---|---|
| 插件管理 | `/plugin [install\|enable\|disable\|list\|marketplace]` | `opencode plugin <module>`（CLI 命令） |
| Agent 管理 | `/agents` | `opencode agent [list\|create]`（CLI 命令） |
| MCP 管理 | `/mcp` | `opencode mcp [add\|list\|auth\|debug]`（CLI 命令） |
| Hooks 管理 | `/hooks` | ❌ 不支持 |
| 权限管理 | `/permissions` | ❌ 不支持（通过 `opencode.jsonc` 配置） |
| 自定义命令 | 支持 `.claude/commands/*.md` | 支持 `.opencode/commands/*.md` |

### 4.7 系统与诊断

| 功能 | Claude Code | OpenCode |
|---|---|---|
| 诊断工具 | `/doctor` | `opencode debug [config\|paths\|agent\|lsp\|ripgrep\|snapshot]` |
| Bug 报告 | `/bug` | ❌ 不支持 |
| 使用统计 | `/stats` 或 `/usage` | `opencode stats --days 30 --models` |
| 版本日志 | `/release-notes` | ❌ 不支持 |
| 配置管理 | `/config` 或 `/settings` | ❌ 不支持（直接编辑 `opencode.jsonc`） |

> **关键差异**：
> - **Claude Code 命令集中在会话内**（`/` 前缀），操作更内聚，适合"边聊边配置"。
> - **OpenCode 将大量管理功能放在 CLI 子命令**（`opencode agent`、`opencode mcp`、`opencode stats`），适合"先在终端配好再进去"。
> - Claude Code 的命令数量（70+）显著多于 OpenCode（约 20 个会话内），但 OpenCode 的 CLI 子命令体系更庞大。

---

## 五、键盘快捷键对比

### 5.1 通用操作

| 操作 | Claude Code | OpenCode |
|---|---|---|
| **提交输入** | `Enter` | `Enter` |
| **换行** | `Shift+Enter`（需 `/terminal-setup`） | `Shift+Enter` / `Ctrl+Enter` / `Alt+Enter` |
| **停止执行** | `Escape` | `Escape` |
| **退出程序** | `Ctrl+C`（直接退出） | `Ctrl+C` / `Ctrl+D` / `<leader>q` |
| **挂起到后台** | ❌ 不支持 | `Ctrl+Z` |
| **清除屏幕** | `Ctrl+L`（保留上下文） | ❌ 不支持 |
| **搜索历史** | `Ctrl+R` | ❌ 不支持 |
| **切换任务列表** | `Ctrl+T` | ❌ 不支持 |
| **命令面板** | ❌ 不支持 | `Ctrl+P` |

### 5.2 模式切换

| 操作 | Claude Code | OpenCode |
|---|---|---|
| **自动接受编辑** | `Shift+Tab`（第 1 次） | ❌ 不支持（通过权限配置控制） |
| **Plan 模式** | `Shift+Tab`（第 2 次） | `Tab`（在输入框中） |
| **恢复正常模式** | `Shift+Tab`（第 3 次） | `Tab`（循环） |
| **Vim 模式** | `/vim` 切换 | ❌ 不支持 |

### 5.3 快捷键体系设计

| 设计维度 | Claude Code | OpenCode |
|---|---|---|
| **快捷键风格** | 直接快捷键（`Shift+Tab`、`Ctrl+R`） | Leader 键体系（默认 `Ctrl+X` + 字母） |
| **可自定义** | `/keybindings` 打开配置文件 | `opencode.jsonc` 的 `"keybinds"` 字段 |
| **快捷键数量** | 约 15 个 | 约 60+ 个 |
| **文件搜索** | 拖拽文件进入 | `@` 模糊搜索文件名 |
| **图片粘贴** | `Ctrl+V` | ❌ 不支持 |

> **关键差异**：
> - **Claude Code** 快捷键**少而精**，`Shift+Tab` 三态切换是核心操作。
> - **OpenCode** 采用 **Leader 键模式**（类似 Vim），可组合出 60+ 快捷键，覆盖几乎所有操作，学习成本更高但操作更快。
> - Claude Code 的 `!` 前缀（直接在对话中运行 shell 命令）是独有的效率利器。

---

## 六、配置体系对比

### 6.1 配置文件对比

| 配置项 | Claude Code | OpenCode |
|---|---|---|
| **用户级配置** | `~/.claude/settings.json` | `~/.config/opencode/opencode.jsonc` |
| **项目级配置** | `<project>/.claude/settings.json` | `<project>/opencode.jsonc` |
| **本地配置** | `<project>/.claude/settings.local.json` | ❌ 不支持（需自行 .gitignore） |
| **企业管理配置** | `managed-settings.json` | ❌ 不支持 |
| **项目上下文文件** | `CLAUDE.md` 或 `CLAUDE.local.md` | `AGENTS.md`（通过 `/init` 生成） |
| **MCP 配置** | `.mcp.json` 或 `settings.json` 内嵌 | `opencode.jsonc` 内嵌或 MCP 子命令管理 |
| **Schema 校验** | ❌ 无官方 schema | `"$schema": "https://opencode.ai/config.json"` |

### 6.2 权限控制对比

| 控制粒度 | Claude Code | OpenCode |
|---|---|---|
| **权限模式** | `default` / `plan` / `accept-edits` | `ask` / `allow` / `deny` 三级 |
| **按工具设置** | `permissions.allow` / `permissions.deny` | `permission.edit` / `permission.bash` 等 |
| **会话内调整** | `/permissions` 命令 | 启动时通过 CLI 参数设置 |
| **免审批模式** | `--dangerously-skip-permissions` | `--dangerously-skip-permissions` |
| **条件规则** | ❌ 不支持（需 Hooks 实现） | ❌ 不支持 |

### 6.3 配置示例对比

#### Claude Code (`settings.json`)

```json
{
  "permissions": {
    "defaultMode": "default",
    "allow": ["Read", "Glob", "Grep"],
    "deny": ["Bash(npm publish)"]
  },
  "model": "sonnet",
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{ "type": "command", "command": "npm run lint" }]
      }
    ]
  }
}
```

#### OpenCode (`opencode.jsonc`)

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-6",
  "small_model": "anthropic/claude-haiku-4-5",
  "permission": {
    "edit": "ask",
    "bash": "ask"
  },
  "keybinds": {
    "leader": "ctrl+x",
    "model_cycle_recent": "f2"
  },
  "server": {
    "port": 4096,
    "hostname": "127.0.0.1"
  }
}
```

---

## 七、扩展生态对比

### 7.1 MCP（Model Context Protocol）

| 能力 | Claude Code | OpenCode |
|---|---|---|
| **传输协议** | HTTP（推荐）/ Stdio / SSE（已弃用） | Stdio / HTTP |
| **添加服务器** | `claude mcp add --transport http <name> <url>` | `opencode mcp add <name> -- <command>` |
| **OAuth 认证** | ✅ 支持 | ❌ 不支持 |
| **作用域** | `--scope local\|project\|user` | ❌ 全局或项目 |
| **会话内管理** | `/mcp` | ❌ 不支持（需退出用 CLI） |
| **alwaysLoad** | ✅ 支持（v2.1.121+） | ❌ 不支持 |
| **MCP 市场** | 3000+ 服务器生态 | 通过 npm 插件扩展 |

### 7.2 Hooks（生命周期钩子）

| 能力 | Claude Code | OpenCode |
|---|---|---|
| **Hook 系统** | ✅ 完整的生命周期钩子系统 | ❌ 不支持 |
| **事件触发** | PreToolUse / PostToolUse / SessionStart / Stop 等 11 个事件 | ❌ 无 |
| **阻断能力** | PreToolUse 可阻断危险操作 | ❌ 无 |
| **自动格式化/检查** | PostToolUse 自动运行 lint/format | ❌ 需手动或自定义 commands |
| **Hook 调试** | ❌ 无专用命令 | ❌ 无 |

> **Hooks 是 Claude Code 的杀手级能力**：在每次文件编辑后自动运行 lint、格式化、测试，相当于内置了 CI/CD 级别的质量门禁。

### 7.3 Skills 与 Agent

| 能力 | Claude Code | OpenCode |
|---|---|---|
| **自定义 Agent** | `.claude/agents/*.md` | `.opencode/agents/*.md` |
| **Agent 权限** | 继承主会话权限 | 独立分配权限（`bash,read,edit,glob,grep,...`） |
| **Subagent** | 支持（如 explore agent） | 支持（如 explore subagent） |
| **内置 Skills** | 代码审查、安全审查、代码简化等 10+ | ❌ 需用户自定义 |
| **自定义 Commands** | `.claude/commands/*.md` | `.opencode/commands/*.md` |
| **自定义 Skills** | `.claude/skills/*.md` | `.opencode/skills/*.md` |
| **Plugin 生态** | `/plugin marketplace`（官方市场） | `opencode plugin <npm-module>`（npm 安装） |

### 7.4 IDE 集成

| IDE/编辑器 | Claude Code | OpenCode |
|---|---|---|
| **VS Code** | ✅ 官方扩展 | ✅ 通过 ACP 协议 |
| **JetBrains** | ✅ 官方扩展 | ✅ 通过 ACP 协议 |
| **其他编辑器** | ❌ | ✅ ACP 协议（编辑器无关） |
| **Claude Code Desktop** | ✅ macOS/Windows 原生应用 | ❌ |
| **Web UI** | ❌（通过 claude.ai） | ✅ `opencode web` |

---

## 八、核心工作流差异：Plan/Build vs 直接交互

这是两者架构哲学上最大的不同。

### 8.1 OpenCode：Plan → Build 双模式

```
用户输入 → Plan 模式（只读分析，输出计划）
                ↓ 用户审核、修改、确认
           Build 模式（执行计划，写代码）
                ↓
           完成交付
```

- **Plan 模式**：Agent 只能 Read/Glob/Grep/WebFetch，不能 Edit/Bash，专注于分析和设计
- **Build 模式**：Agent 获得完整工具权限，基于 Plan 阶段的结论执行代码编写
- **切换方式**：按 `Tab` 键或输入 `/build`
- **社区数据**：Plan→Build 流程可提升约 40% 的复杂任务一次性通过率

### 8.2 Claude Code：直接交互 + 按需 Plan Mode

```
用户输入 → 正常模式（完整权限，直接修改代码）
                ↓ 或
           Shift+Tab 切换到 Plan Mode（只读模式）
                ↓ 或
           用户确认后 Shift+Tab 切回正常模式
```

- **正常模式**是默认：Claude 理解需求后直接动手
- **Plan Mode** 通过 `Shift+Tab` 按需进入，或通过 `/plan` 命令
- 更灵活，但没有 OpenCode 那样**强制性的 Plan→Build 门禁**

### 8.3 选型建议

| 场景 | 推荐工具 |
|---|---|
| 简单任务、快速修复 | Claude Code（直接交互效率更高） |
| 复杂重构、多文件变更 | OpenCode（Plan→Build 更安全） |
| 需要严格代码审查流程 | OpenCode（强制 Plan 审核） |
| 探索性分析、不急于动手 | Claude Code Plan Mode 或 OpenCode Plan 模式均可 |
| 自动化 CI/CD 脚本 | Claude Code（`-p` 模式 + Hooks 更强） |

---

## 九、定价与许可

| 维度 | Claude Code | OpenCode |
|---|---|---|
| **软件许可** | 闭源（免费使用） | MIT 开源 |
| **API 费用** | 按 Token 计费（Anthropic API） | 取决于所选模型 Provider（Anthropic/OpenAI/Google 等） |
| **免费额度** | ❌ 需付费 API Key | ❌ 取决于 Provider（部分 Provider 有免费额度） |
| **本地模型** | ❌ 不支持 | ❌ 需 Provider API（但可接 Ollama 等本地服务） |
| **用量统计** | `/cost` 查看会话费用、`/usage` 查看配额 | `opencode stats --days 30 --models` |
| **团队/企业** | Max 计划（Team 协作）、Enterprise 托管配置 | 无官方企业方案，自行部署 |
| **离线使用** | ❌ 需要网络 | ❌ 需要网络（除非配本地 Provider） |

> **核心差异**：OpenCode 完全开源，如果你已有 OpenAI/Google 等 API Key，可以不花额外费用。Claude Code 软件本身免费但需要 Anthropic API 费用（或通过 Max 计划使用）。

---

## 十、快速选型决策表

| 你的需求 | 选 Claude Code | 选 OpenCode |
|---|---|---|
| 追求最强代码理解和生成质量 | ✅ Claude 模型独占优势 | ❌ 多模型但非独占 |
| 需要多模型灵活切换 | ❌ 仅 Claude 系列 | ✅ 75+ 模型 |
| 需要内置代码审查/安全审查 | ✅ 10+ 内置技能 | ❌ |
| 需要开源可控 | ❌ | ✅ MIT 开源 |
| 需要 Hook 自动格式化/检查 | ✅ 完整的 Hook 系统 | ❌ |
| 需要远程服务/Web UI | ❌ | ✅ `serve` + `web` + `attach` |
| 需要 IDE 无关的集成协议 | ❌ | ✅ ACP 协议 |
| 需要 Plan→Build 强制门禁 | ❌（Plan Mode 可选但不强制） | ✅ 核心设计 |
| 喜欢 Leader 键 + 大量快捷键 | ❌ 快捷键较少 | ✅ 60+ 快捷键 |
| Windows / Linux 原生体验 | ❌ 仅 npm | ✅ 多种包管理器 |
| 企业托管部署 | ✅ Enterprise 方案 | ❌ |
| 插件市场 | ✅ `/plugin marketplace` | ❌ 通过 npm |

---

## 十一、总结

| 维度 | Claude Code | OpenCode |
|---|---|---|
| **核心优势** | 代码理解深度 + 内置技能 + Hooks 生态 | 开源自由 + 多模型 + Plan/Build 流程 + 远程服务 |
| **适合人群** | Claude 生态用户、追求开箱即用 | 多模型用户、喜欢 DIY、需要开源 |
| **学习曲线** | 低（命令少而精） | 中（60+ 快捷键、CLI 子命令多） |
| **生态成熟度** | 高（Anthropic 官方维护） | 中（社区驱动，快速迭代） |
| **未来潜力** | MCP + Hooks + Agent Teams | ACP 协议 + 多 Provider + 开源社区 |

**一句话总结**：Claude Code 赢在"深度"（代码理解、内置技能、Hook 自动化），OpenCode 赢在"广度"（多模型、多安装方式、远程服务能力、开源自由）。两者并非完全替代关系，很多开发者在不同场景下混用。

---

> **参考来源**
> - [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code)
> - [OpenCode 官方文档](https://opencode.ai/docs/)
> - [Claude Code Cheat Sheet - ComputingForGeeks](https://computingforgeeks.com/claude-code-cheat-sheet/)
> - [OpenCode CLI Cheat Sheet - ComputingForGeeks](https://computingforgeeks.com/opencode-cli-cheat-sheet/)
> - [OpenCode GitHub](https://github.com/anomalyco/opencode)
