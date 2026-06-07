# Claude Code 英文词汇表

> 整理 Claude Code CLI 工具使用过程中常见英文单词、术语和概念，附带中文解释。

---

## 一、交互式斜杠命令 (Slash Commands)

在 Claude Code 交互会话中，输入 `/` 前缀可调用以下命令：

| 命令 | 中文解释 |
|------|---------|
| `/clear` | 清除当前对话内容 |
| `/compact` | 压缩/摘要当前对话，释放上下文窗口 |
| `/config` | 打开配置面板（模型、主题、权限等） |
| `/context` | 查看当前上下文窗口使用情况 |
| `/cost` | 查看本次会话的 Token 用量和费用 |
| `/doctor` | 诊断 Claude Code 运行环境健康状况 |
| `/exit` | 退出 Claude Code |
| `/export` | 导出当前对话记录 |
| `/fast` | 切换快速模式（Fast Mode），使用 Claude Opus 但输出更快 |
| `/help` | 查看帮助信息 |
| `/hooks` | 管理 Hooks（事件钩子）配置 |
| `/ide` | IDE 集成相关设置 |
| `/init` | 在当前项目中初始化 CLAUDE.md 文件 |
| `/login` | 登录 Anthropic 账号 |
| `/logout` | 登出 Anthropic 账号 |
| `/memory` | 管理持久化记忆（Memory） |
| `/mcp` | 管理 MCP（Model Context Protocol）服务器 |
| `/model` | 切换当前会话使用的 AI 模型 |
| `/output-style` | 设置输出风格（default / explanatory / concise / learning） |
| `/permissions` | 管理工具权限设置 |
| `/plan` | 进入计划模式（Plan Mode），先设计方案再编码 |
| `/pr-comments` | 查看 PR（Pull Request）审查评论 |
| `/release-notes` | 查看 Claude Code 版本更新日志 |
| `/resume` | 恢复之前的会话记录 |
| `/review` | 审查代码变更 |
| `/security` | 安全相关设置 |
| `/status` | 查看当前会话状态 |
| `/terminal-setup` | 终端设置向导 |
| `/upgrade` | 升级 Claude Code 到最新版本 |
| `/workflows` | 管理工作流（Workflows） |
| `/workspace` | 工作区设置 |
| `/add-dir` | 添加额外目录以允许工具访问 |
| `/agents` | 管理后台代理（Background Agents） |
| `/bashes` | 查看后台运行的 Bash 任务列表 |
| `/bug` | 报告 Bug |
| `/feedback` | 提交反馈 |
| `/loop` | 设置循环执行任务 |
| `/tasks` | 查看任务列表 |
| `/stats` | 查看会话统计信息 |
| `/todos` | 查看待办事项列表 |
| `/vim` | 切换 Vim 编辑模式 |
| `/plugin` | 管理插件 |
| `/theme` | 切换终端主题 |

---

## 二、CLI 命令 (CLI Commands)

在终端中通过 `claude <command>` 直接调用的命令：

| 命令 | 中文解释 |
|------|---------|
| `claude` | 启动 Claude Code 交互会话（默认模式） |
| `claude "prompt"` | 传入提示词启动会话 |
| `claude -p "prompt"` | 非交互模式，打印响应后退出（适合管道操作） |
| `claude -c` / `--continue` | 继续当前目录最近一次会话 |
| `claude -r [session]` / `--resume` | 恢复指定会话，或打开会话选择器 |
| `claude --from-pr` | 从 PR 链接恢复会话 |
| `claude -w [name]` / `--worktree` | 在 Git Worktree 中启动会话 |
| `claude agents` | 管理后台代理 |
| `claude auth` | 管理认证信息 |
| `claude auto-mode` | 查看自动模式分类器配置 |
| `claude doctor` | 检查自动更新器健康状态 |
| `claude install` | 安装 Claude Code 原生构建版本 |
| `claude mcp` | 配置管理 MCP 服务器 |
| `claude plugin` / `claude plugins` | 管理插件 |
| `claude project` | 管理项目状态 |
| `claude setup-token` | 设置长期认证 Token（需 Claude 订阅） |
| `claude ultrareview` | 云端多代理代码审查 |
| `claude update` / `claude upgrade` | 检查更新并安装 |

---

## 三、常用 CLI 选项 (CLI Options)

启动 Claude Code 时的命令行参数：

| 选项 | 中文解释 |
|------|---------|
| `--add-dir <dirs>` | 添加额外允许工具访问的目录 |
| `--agent <agent>` | 指定当前会话使用的 Agent |
| `--agents <json>` | 以 JSON 格式定义自定义 Agent |
| `--allowedTools <tools>` | 逗号分隔的工具白名单 |
| `--disallowedTools <tools>` | 逗号分隔的工具黑名单 |
| `--append-system-prompt` | 追加自定义系统提示词 |
| `--bare` | 最小化模式：跳过 hooks、LSP、插件同步等 |
| `--betas` | 在 API 请求中包含 Beta 标头 |
| `--brief` | 启用 SendUserMessage 工具（Agent 到用户通信） |
| `--chrome` | 启用 Chrome 浏览器集成 |
| `--dangerously-skip-permissions` | **危险**：跳过所有权限检查（仅限无网沙箱） |
| `-d` / `--debug` | 开启调试模式，可选过滤类别 |
| `--disable-slash-commands` | 禁用所有技能/斜杠命令 |
| `--effort <level>` | 设置努力级别：low / medium / high / xhigh / max |
| `--fallback-model` | 主模型不可用时的回退模型 |
| `--fork-session` | 恢复时创建新的 Session ID |
| `--ide` | 自动连接到可用的 IDE |
| `--input-format` | 输入格式：text（默认）/ stream-json |
| `--json-schema` | 结构化输出的 JSON Schema 校验 |
| `--max-budget-usd` | API 调用最大美元预算（仅 `-p` 模式） |
| `--mcp-config` | 从 JSON 文件加载 MCP 服务器配置 |
| `--model <model>` | 指定模型（如 `sonnet`、`opus` 或完整模型名） |
| `-n` / `--name` | 设置会话显示名称 |
| `--output-format` | 输出格式：text / json / stream-json（仅 `-p` 模式） |
| `--permission-mode` | 权限模式：acceptEdits / auto / bypassPermissions / default / dontAsk / plan |
| `--plugin-dir` | 从目录或 .zip 加载插件 |
| `--plugin-url` | 从 URL 加载插件 |
| `--prompt-suggestions` | 启用提示词建议功能 |
| `--remote-control` | 启用远程控制（可选命名） |
| `--session-id` | 使用指定的 UUID 作为会话 ID |
| `--settings` | 加载额外设置文件或 JSON |
| `--strict-mcp-config` | 仅使用 `--mcp-config` 指定的服务器 |
| `--system-prompt` | 使用自定义系统提示词 |
| `--tmux` | 创建 tmux 会话配合 worktree 使用 |
| `--tools` | 指定可用的内置工具列表 |
| `--verbose` | 覆盖配置，启用详细输出模式 |
| `-v` / `--version` | 输出版本号 |

---

## 四、内部工具名称 (Internal Tool Names)

Claude Code 内部使用的工具（AI 模型调用），在权限提示中经常出现：

| 工具名 | 中文解释 |
|--------|---------|
| `Agent` | 启动子代理执行复杂多步任务 |
| `AskUserQuestion` | 向用户提出选择性问题 |
| `Bash` | 执行 Shell 命令 |
| `CronCreate` | 创建定时任务 |
| `CronDelete` | 删除定时任务 |
| `CronList` | 列出所有定时任务 |
| `Edit` | 精确字符串替换编辑文件 |
| `EnterPlanMode` | 进入计划模式 |
| `ExitPlanMode` | 退出计划模式 |
| `EnterWorktree` | 进入 Git Worktree 隔离环境 |
| `ExitWorktree` | 退出 Git Worktree 环境 |
| `Glob` | 文件名模式匹配搜索 |
| `Grep` | 基于 ripgrep 的内容搜索 |
| `NotebookEdit` | 编辑 Jupyter Notebook (.ipynb) |
| `Read` | 读取文件内容 |
| `ScheduleWakeup` | 为 `/loop` 模式安排唤醒时间 |
| `Skill` | 调用技能（Skill） |
| `TaskCreate` | 创建结构化任务 |
| `TaskGet` | 获取任务详情 |
| `TaskList` | 列出所有任务 |
| `TaskOutput` | 获取后台任务输出 |
| `TaskStop` | 停止后台运行的任务 |
| `TaskUpdate` | 更新任务状态 |
| `WebFetch` | 抓取网页内容 |
| `WebSearch` | 搜索网页 |
| `Workflow` | 执行多代理协作工作流脚本 |
| `Write` | 写入/覆写文件 |

---

## 五、核心概念 (Core Concepts)

| 英文术语 | 中文解释 |
|----------|---------|
| **Agent** | 代理/智能体。可独立执行任务的 AI 子进程 |
| **Subagent** | 子代理。由主 Agent 派生出的执行特定子任务的代理 |
| **Background Task** | 后台任务。异步在后台运行的 Shell 命令或 Agent 任务 |
| **CLAUDE.md** | 项目级配置文件，告诉 Claude Code 项目上下文、规范和约定 |
| **Context Window** | 上下文窗口。AI 模型能"记住"的对话+代码的最大 Token 容量 |
| **Cron Job** | 定时任务。按 Cron 表达式在指定时间自动触发的任务 |
| **Fast Mode** | 快速模式。使用 Claude Opus 模型但输出速度更快 |
| **Git Worktree** | Git 工作树。在同一仓库中创建隔离的并行工作目录 |
| **Hooks** | 钩子/事件钩子。在特定事件（如工具调用前后）自动触发的脚本 |
| **IDE Integration** | IDE 集成。Claude Code 与 VS Code、JetBrains 等 IDE 的联动 |
| **Isolation** | 隔离。Worktree 模式下 Agent 在独立的工作目录中运行 |
| **MCP (Model Context Protocol)** | 模型上下文协议。允许 Claude Code 连接外部工具和数据源的开放协议 |
| **Memory** | 持久化记忆。跨会话保存的事实、偏好和项目上下文 |
| **Permission** | 权限。控制 Claude Code 能否执行某些操作（如 Bash 命令）的安全机制 |
| **Plan Mode** | 计划模式。先设计方案并获得用户批准，再动手编码的工作模式 |
| **Prompt Cache** | 提示词缓存。复用历史对话的系统提示词以降低延迟和费用 |
| **Sandbox** | 沙箱/沙盒。限制工具执行范围的安全隔离机制 |
| **Session** | 会话。一次完整的 Claude Code 对话交互 |
| **Settings** | 设置。通过 `settings.json` 配置 Claude Code 行为 |
| **Skill** | 技能。可复用的领域专用工作流，通过 `/skill-name` 触发 |
| **Slash Command** | 斜杠命令。在交互模式中以 `/` 开头调用的内置命令 |
| **Status Line** | 状态栏。终端底部显示当前模型、Token 用量等信息 |
| **System Prompt** | 系统提示词。定义 AI 角色和行为的底层指令 |
| **System Reminder** | 系统提醒。注入到对话中的运行时信息（如 git status、环境信息） |
| **Extended Thinking** | 扩展思考。AI 模型在回答前进行深度推理的能力 |
| **Token** | 令牌。AI 模型处理文本的最小单位（约等于 0.75 个英文单词） |
| **Tool Use / Tool Call** | 工具调用。AI 调用 Bash、Read、Write 等工具执行实际操作 |
| **Ultracode** | 超码模式。启用多代理大规模协作审查的增强模式 |
| **Ultrareview** | 云端多代理代码审查 |
| **Workflow** | 工作流。编排多个子代理协同完成复杂任务的脚本 |

---

## 六、界面与交互术语 (UI & Interaction Terms)

| 英文术语 | 中文解释 |
|----------|---------|
| **Allow** | 允许（单次）。同意本次工具调用 |
| **Deny** | 拒绝。拒绝本次工具调用 |
| **Always Allow** | 始终允许。记住选择，后续同样操作不再询问 |
| **Permission Required** | 需要权限。工具调用需要用户确认 |
| **"Claude is thinking..."** | "Claude 正在思考..." 等待模型响应的状态提示 |
| **"Press Enter to send"** | "按回车发送" 交互输入提示 |
| **Compact** | 压缩/精简。将长对话摘要压缩以腾出上下文空间 |
| **Summarize** | 摘要。同 Compact，对话过长时的自动压缩 |
| **Checkpoint** | 检查点。文件修改前的快照，用于回滚 |
| **Resume** | 恢复。重新打开之前的会话继续对话 |
| **"Running in background"** | "后台运行中"。异步任务在后台执行的提示 |
| **"Task completed"** | "任务完成"。后台任务执行完毕的通知 |
| **Output Style** | 输出风格。控制 Claude 回复的详细程度和语气 |
| **Effort Level** | 努力级别。控制 AI 推理深度（low / medium / high / xhigh / max） |
| **Permission Mode** | 权限模式。预设的权限策略组合 |
| **Bare Mode** | 极简模式。最小化额外功能，仅保留核心能力 |
| **Remote Control** | 远程控制。允许通过网络远程操控 Claude Code 会话 |
| **Prompt Suggestions** | 提示词建议。AI 预测下一步可能要输入的内容 |
| **Structured Output** | 结构化输出。按 JSON Schema 格式返回结果 |
| **Stream JSON** | 流式 JSON 输出。实时逐 Token 返回 JSON 格式结果 |
| **Verbose** | 详细模式。输出更详细的日志和状态信息 |
| **Debug Mode** | 调试模式。输出调试日志用于排查问题 |
| **Workspace Trust** | 工作区信任。首次在新目录使用时的安全确认对话框 |

---

## 七、模型名称 (Model Names)

| 英文名称 | 完整模型 ID | 说明 |
|----------|------------|------|
| **Claude Opus** | `claude-opus-4-8` | 最强模型，适用于复杂推理和大型任务 |
| **Claude Sonnet** | `claude-sonnet-4-6` | 平衡性能与速度的中档模型 |
| **Claude Haiku** | `claude-haiku-4-5-20251001` | 最快模型，适用于简单快速任务 |

---

## 八、配置文件与目录 (Configuration Files & Directories)

| 文件名/目录 | 中文解释 |
|------------|---------|
| `CLAUDE.md` | 项目根目录下的项目规范文件，告诉 AI 项目上下文 |
| `settings.json` | 用户/项目级别的 Claude Code 配置文件 |
| `settings.local.json` | 本地配置文件（不提交到 Git），覆盖 `settings.json` |
| `keybindings.json` | 键盘快捷键自定义配置文件 |
| `.claude/` 目录 | Claude Code 项目数据目录（hooks、memory、plans 等） |
| `.mcp.json` | MCP 服务器配置文件 |
| `.gitignore` | Git 忽略规则文件 |

---

## 九、认证与平台术语 (Authentication & Platform)

| 英文术语 | 中文解释 |
|----------|---------|
| **ANTHROPIC_API_KEY** | Anthropic API 密钥环境变量 |
| **apiKeyHelper** | API 密钥助手脚本，动态获取密钥 |
| **OAuth** | 开放授权。通过浏览器登录 Anthropic 账号的认证方式 |
| **Keychain** | 系统密钥链。macOS/Windows 安全存储凭证的机制 |
| **Bedrock** | AWS Bedrock。通过 AWS 调用 Claude 模型的第三方平台 |
| **Vertex** | Google Cloud Vertex AI。通过 GCP 调用 Claude 模型 |
| **Foundry** | 第三方模型托管平台 |
| **Long-lived Token** | 长期令牌。需 Claude 订阅，避免频繁登录 |
| **Claude Subscription** | Claude 订阅计划 |

---

## 十、输出风格 (Output Styles)

Claude Code 支持以下回复风格，通过 `/output-style` 或设置切换：

| 风格 | 英文标识 | 适用场景 |
|------|---------|---------|
| 默认 | `default` | 平衡的回复风格，适合大多数场景 |
| 解释型 | `explanatory` | 偏教育场景，会详细解释每一步 |
| 简洁型 | `concise` | 最简短的回复，只给出关键信息 |
| 学习型 | `learning` | 面向学习者的风格，讲解原理和最佳实践 |

---

## 十一、努力级别 (Effort Levels)

通过 `--effort` 参数或设置控制 AI 推理深度：

| 级别 | 英文标识 | 适用场景 |
|------|---------|---------|
| 低 | `low` | 简单任务，快速响应 |
| 中 | `medium` | 一般编程任务 |
| 高 | `high` | 复杂重构、架构设计 |
| 极高 | `xhigh` | 需要深度推理的难题 |
| 最大 | `max` | 最复杂的问题，使用最强推理 |

---

## 十二、权限模式 (Permission Modes)

| 模式 | 英文标识 | 说明 |
|------|---------|------|
| 默认 | `default` | 标准权限提示 |
| 接受编辑 | `acceptEdits` | 自动接受文件编辑，其他操作仍需确认 |
| 自动 | `auto` | 自动批准所有操作 |
| 绕过权限 | `bypassPermissions` | 完全跳过权限检查 |
| 不询问 | `dontAsk` | 不询问权限，直接执行 |
| 计划模式 | `plan` | 先设计计划，经用户批准后再执行 |

---

## 十三、执行状态与动态操作词 (Execution Status & Dynamic Verbs)

Claude Code 在思考、执行任务、调度代理时，界面会动态显示以下操作状态词（常在 Spinner / 进度条旁边出现）：

### 13.1 思考阶段 (Thinking Phase)

| 英文 | 中文解释 | 出现场景 |
|------|---------|---------|
| **Thinking** | 思考中 | AI 正在推理，准备下一步行动 |
| **Still thinking** | 仍在思考 | 耗时较长的推理过程 |
| **Almost done thinking** | 即将完成思考 | 推理接近尾声 |
| **Meandering** | 走神 / 偏离主线 | AI 开始偏离主题，效率降低 |
| **Deliberating** | 审慎思考 | 对关键决策进行深度权衡 |
| **Pondering** | 沉思 | 深入思考某个复杂问题 |
| **Reasoning** | 推理中 | 正在进行逻辑推理 |

### 13.2 文件操作 (File Operations)

| 英文 | 中文解释 | 出现场景 |
|------|---------|---------|
| **Reading** | 读取中 | 读取文件内容 |
| **Writing** | 写入中 | 创建或覆写文件 |
| **Editing** | 编辑中 | 精确替换文件中的字符串 |
| **Scanning** | 扫描中 | 扫描目录结构或文件内容 |
| **Searching** | 搜索中 | 用 ripgrep 进行内容搜索 |
| **Globbing** | 模式匹配中 | 用 Glob 模式查找文件 |
| **Indexing** | 索引中 | 建立文件索引以加速搜索 |
| **Cataloging** | 编目中 | 系统地列出和分类文件 |
| **Enumerating** | 枚举中 | 逐一列举目录/文件 |
| **Traversing** | 遍历中 | 递归遍历目录树 |
| **Inspecting** | 检查中 | 仔细检查文件或代码细节 |

### 13.3 Agent / 任务调度 (Agent & Task Orchestration)

| 英文 | 中文解释 | 出现场景 |
|------|---------|---------|
| **Dispatching** | 分派中 / 派遣中 | 启动子代理去执行任务 |
| **Orchestrating** | 编排中 | 协调多个代理协同工作 |
| **Fanning out** | 扇出 / 分发 | 将工作并行分发给多个代理 |
| **Coalescing** | 汇集 / 合并 | 汇总多个代理的返回结果 |
| **Synthesizing** | 综合 / 合成 | 将多方结果融合成统一结论 |
| **Aggregating** | 聚合中 | 收集并统计各代理的输出 |
| **Converging** | 收敛中 | 多方结果逐步趋向一致 |
| **Delegating** | 委派中 | 将子任务委派给专门代理 |
| **Spawning** | 生成中 | 创建新的子代理进程 |
| **Parking** | 搁置中 | 空闲子代理暂时挂起等待复用 |
| **Retiring** | 退役中 | 自动清理已完成/空闲的代理会话 |
| **Reaping** | 回收中 | 清理僵尸进程/过期会话 |

### 13.4 工作流阶段 (Workflow Phases)

Workflow 执行时常见的阶段标签：

| 英文 | 中文解释 | 出现场景 |
|------|---------|---------|
| **Scanning** | 扫描阶段 | 大规模搜索和定位目标 |
| **Analyzing** | 分析阶段 | 深入分析代码或数据 |
| **Reviewing** | 审查阶段 | 代码审查或结果审查 |
| **Verifying** | 验证阶段 | 独立验证之前的发现 |
| **Adversarially verifying** | 对抗性验证 | 以刻意反驳的视角重新验证 |
| **Judging** | 评判阶段 | 多个方案间进行评分比较 |
| **Synthesizing** | 综合阶段 | 汇总所有发现形成最终结论 |
| **Implementing** | 实施阶段 | 实际编写代码修改 |
| **Testing** | 测试阶段 | 运行测试验证修改 |

### 13.5 网络/外部操作 (Network & External)

| 英文 | 中文解释 | 出现场景 |
|------|---------|---------|
| **Fetching** | 获取中 | 从 URL 抓取网页内容 |
| **Searching the web** | 网络搜索中 | 执行 WebSearch 工具 |
| **Connecting** | 连接中 | 连接到 MCP 服务器或外部服务 |
| **Authenticating** | 认证中 | 进行身份验证 |
| **Streaming** | 流式传输中 | 实时接收流式响应 |

---

## 十四、后台任务与代理生命周期 (Background Task & Agent Lifecycle)

### 14.1 任务状态 (Task States)

| 英文 | 中文解释 | 说明 |
|------|---------|------|
| **Pending** | 待处理 | 任务已创建，等待执行 |
| **Queued** | 排队中 | 任务在队列中等待空闲槽位 |
| **In Progress** | 进行中 | 任务正在执行 |
| **Running** | 运行中 | 后台任务/代理正在工作 |
| **Working** | 工作中 | 任务活跃执行中 |
| **Blocked** | 已阻塞 | 任务因等待某事（如权限）而暂停 |
| **Waiting** | 等待中 | 等待输入、权限或依赖完成 |
| **Awaiting input** | 等待输入 | 需要用户输入才能继续 |
| **Suspended** | 已挂起 | 任务暂时停止，可恢复 |
| **Parked** | 已搁置 | 空闲子代理暂存，等待新任务 |
| **Completed** | 已完成 | 任务成功完成 |
| **Succeeded** | 已成功 | 操作执行成功 |
| **Failed** | 已失败 | 任务执行失败 |
| **Cancelled** | 已取消 | 任务被用户取消 |
| **Interrupted** | 已中断 | 任务被 Esc 或其他信号中断 |
| **Aborted** | 已中止 | 任务异常中止 |
| **Terminated** | 已终止 | 会话/进程被强制终止 |
| **Retired** | 已退役 | 会话自动清理/过期 |
| **Reaped** | 已回收 | 僵尸进程/过期会话被清理 |
| **Stale** | 已过期 | 任务/会话已超时不再有效 |
| **Timed out** | 已超时 | 操作超过时间限制 |

### 14.2 操作结果提示 (Result Notifications)

| 英文 | 中文解释 |
|------|---------|
| **Agent completed · 3h 2m 5s** | 代理完成 · 耗时 3 小时 2 分 5 秒 |
| **Task completed** | 任务完成 |
| **Installation complete!** | 安装完成！ |
| **Waiting for N background agents/workflows to finish** | 等待 N 个后台代理/工作流完成 |
| **Failed to install** | 安装失败 |
| **N agents awaiting input** | N 个代理等待输入 |
| **done/total** | 已完成数 / 总数 |

---

## 十五、Spinner Verbs — 天狗动画动词 (Tengu)

> **核心事实**：Claude Code 在等待 AI 响应时，终端里旋转动画旁边会随机轮换显示一个 `-ing` 动词。这些词 **不代表任何真实的内部状态**——纯粹是为了让等待不那么无聊的"气氛组"。内部代号 **"Tengu"（天狗）**，默认词库约 **187 个**，社区从二进制中提取到 **180 个**。

### 15.1 什么是 Spinner Verbs？

| 特性 | 说明 |
|------|------|
| **作用** | 纯气氛组 — 不代表 Claude 真实在做该动作 |
| **机制** | 从词库中随机轮换，无权重或排序 |
| **数量** | 约 185–191 个（含服务端动态下发的） |
| **内部代号** | **Tengu**（天狗） |
| **自定义** | 支持，通过 `~/.claude/settings.json` 中的 `spinnerVerbs` 配置 |

### 15.2 自定义配置

```json
{
  "spinnerVerbs": {
    "mode": "append",
    "verbs": ["摸鱼中", "键盘冒烟中", "赛博算命中"]
  }
}
```

- `"append"` — 追加到默认词库
- `"replace"` — 完全替换默认词库

### 15.3 完整默认词库（180 个，按字母排序）

| # | 英文 | 中文解释 |
|---|------|---------|
| 1 | **Accomplishing** | 完成 / 达成 |
| 2 | **Actioning** | 执行 / 付诸行动 |
| 3 | **Actualizing** | 实现 / 现实化 |
| 4 | **Architecting** | 架构设计 |
| 5 | **Baking** | 烘焙 |
| 6 | **Beaming** | 笑容满面 / 光速传送 |
| 7 | **Beboppin'** | 波普摇摆 |
| 8 | **Befuddling** | 使迷糊 / 灌醉 |
| 9 | **Billowing** | 翻腾滚滚 |
| 10 | **Blanching** | 焯水 / 漂白 |
| 11 | **Bloviating** | 夸夸其谈 |
| 12 | **Boogieing** | 跳布吉舞 |
| 13 | **Boondoggling** | 做无用功 |
| 14 | **Booping** | 轻点 / 电子音效 |
| 15 | **Bootstrapping** | 自举 / 自力更生 |
| 16 | **Brewing** | 酿造 / 泡制 |
| 17 | **Bunning** | 做发髻 / 装桶 |
| 18 | **Burrowing** | 挖洞 / 钻入 |
| 19 | **Calculating** | 计算 |
| 20 | **Canoodling** | 亲昵爱抚 |
| 21 | **Caramelizing** | 焦糖化 |
| 22 | **Cascading** | 级联倾泻 |
| 23 | **Catapulting** | 弹射起飞 |
| 24 | **Cerebrating** | 大脑运转 |
| 25 | **Channeling** | 引导 / 通灵 |
| 26 | **Channelling** | 引导 / 通灵（英式拼写） |
| 27 | **Choreographing** | 编舞设计 |
| 28 | **Churning** | 剧烈搅拌 |
| 29 | **Clauding** | "Claude-ing"（自嘲梗） |
| 30 | **Coalescing** | 凝聚合并 |
| 31 | **Cogitating** | 苦苦思索 |
| 32 | **Combobulating** | 整理归位 |
| 33 | **Composing** | 创作谱写 |
| 34 | **Computing** | 计算处理 |
| 35 | **Concocting** | 调制 / 编造 |
| 36 | **Considering** | 考虑权衡 |
| 37 | **Contemplating** | 凝视沉思 |
| 38 | **Cooking** | 烹饪 |
| 39 | **Crafting** | 精心制作 |
| 40 | **Creating** | 创造 |
| 41 | **Crunching** | 嘎吱运算 |
| 42 | **Crystallizing** | 结晶析出 |
| 43 | **Cultivating** | 培育滋养 |
| 44 | **Deciphering** | 破译解码 |
| 45 | **Deliberating** | 审慎考量 |
| 46 | **Determining** | 确定裁决 |
| 47 | **Discombobulating** | 扰乱 / 令人困惑 |
| 48 | **Doodling** | 涂鸦 |
| 49 | **Drizzling** | 细雨蒙蒙 |
| 50 | **Ebbing** | 潮水退去 |
| 51 | **Effecting** | 实现 / 导致 |
| 52 | **Elucidating** | 阐明解释 |
| 53 | **Embellishing** | 美化装饰 |
| 54 | **Enchanting** | 施法迷人 |
| 55 | **Envisioning** | 展望设想 |
| 56 | **Evaporating** | 蒸发消散 |
| 57 | **Fermenting** | 发酵酝酿 |
| 58 | **Finagling** | 耍花招 / 钻营 |
| 59 | **Flibbertigibbeting** | 叽喳胡闹 |
| 60 | **Flowing** | 流淌 |
| 61 | **Flummoxing** | 使困惑不解 |
| 62 | **Fluttering** | 振翅飘动 |
| 63 | **Forging** | 锻造 |
| 64 | **Forming** | 成形 |
| 65 | **Frolicking** | 嬉戏欢跳 |
| 66 | **Frosting** | 结霜 / 糖霜 |
| 67 | **Gallivanting** | 四处游荡 |
| 68 | **Galloping** | 疾驰飞奔 |
| 69 | **Garnishing** | 点缀装饰 |
| 70 | **Generating** | 生成 |
| 71 | **Germinating** | 萌芽破土 |
| 72 | **Gesticulating** | 手舞足蹈 |
| 73 | **Gitifying** | Git 化 |
| 74 | **Grooving** | 进入节奏 |
| 75 | **Gusting** | 狂风骤起 |
| 76 | **Harmonizing** | 和声协调 |
| 77 | **Hashing** | 哈希计算 |
| 78 | **Hatching** | 孵化 |
| 79 | **Herding** | 牧放驱赶 |
| 80 | **Honking** | 鸣笛 |
| 81 | **Hullaballooing** | 喧哗吵闹 |
| 82 | **Hyperspacing** | 超空间跳跃 |
| 83 | **Ideating** | 构思创意 |
| 84 | **Imagining** | 想象 |
| 85 | **Improvising** | 即兴发挥 |
| 86 | **Incubating** | 孵化培育 |
| 87 | **Inferring** | 推断 |
| 88 | **Infusing** | 浸泡入味 |
| 89 | **Ionizing** | 电离 |
| 90 | **Jitterbugging** | 吉特巴舞 |
| 91 | **Julienning** | 切丝 |
| 92 | **Kneading** | 揉面 |
| 93 | **Leavening** | 发酵膨胀 |
| 94 | **Levitating** | 悬浮空中 |
| 95 | **Lollygagging** | 磨洋工 / 瞎晃悠 |
| 96 | **Manifesting** | 显化实现 |
| 97 | **Marinating** | 腌渍入味 |
| 98 | **Meandering** | 蜿蜒漫步 / 走神 |
| 99 | **Metamorphosing** | 蜕变变态 |
| 100 | **Misting** | 起雾喷雾 |
| 101 | **Moonwalking** | 太空步 |
| 102 | **Moseying** | 闲逛 |
| 103 | **Mulling** | 反复琢磨 |
| 104 | **Musing** | 沉思冥想 |
| 105 | **Mustering** | 召集 / 鼓起勇气 |
| 106 | **Nebulizing** | 雾化 |
| 107 | **Nesting** | 筑巢 / 嵌套 |
| 108 | **Newspapering** | 看报 |
| 109 | **Noodling** | 随手弹 / 即兴 |
| 110 | **Nucleating** | 成核 / 晶核形成 |
| 111 | **Orbiting** | 绕轨道运行 |
| 112 | **Orchestrating** | 管弦编排 |
| 113 | **Osmosing** | 渗透吸收 |
| 114 | **Perambulating** | 漫步巡视 |
| 115 | **Percolating** | 渗滤 / 慢慢泡开 |
| 116 | **Perusing** | 细读翻阅 |
| 117 | **Philosophising** | 哲思冥想 |
| 118 | **Photosynthesizing** | 光合作用 |
| 119 | **Pollinating** | 授粉传播 |
| 120 | **Pondering** | 沉思 |
| 121 | **Pontificating** | 高谈阔论 |
| 122 | **Pouncing** | 猛扑 |
| 123 | **Precipitating** | 沉淀析出 |
| 124 | **Prestidigitating** | 障眼戏法 |
| 125 | **Processing** | 处理 |
| 126 | **Proofing** | 校对 / 面团发酵 |
| 127 | **Propagating** | 传播繁殖 |
| 128 | **Puttering** | 瞎忙 / 闲逛 |
| 129 | **Puzzling** | 困惑 / 解谜 |
| 130 | **Quantumizing** | 量子化 |
| 131 | **Razzmatazzing** | 华丽炫目 |
| 132 | **Recombobulating** | 重新整理 |
| 133 | **Reticulating** | 网状化（SimCity 梗） |
| 134 | **Roosting** | 栖息 |
| 135 | **Ruminating** | 反刍思考 |
| 136 | **Scampering** | 蹦跳奔跑 |
| 137 | **Schlepping** | 拖拖拉拉 |
| 138 | **Scurrying** | 急匆匆 |
| 139 | **Seasoning** | 调味 |
| 140 | **Shenaniganing** | 恶作剧 |
| 141 | **Shimmying** | 摇摆抖动 |
| 142 | **Simmering** | 文火慢炖 |
| 143 | **Skedaddling** | 仓皇逃窜 |
| 144 | **Sketching** | 素描草拟 |
| 145 | **Slithering** | 滑行蜿蜒 |
| 146 | **Smooshing** | 压扁揉合 |
| 147 | **Spelunking** | 洞穴探险 |
| 148 | **Spinning** | 旋转 |
| 149 | **Sprouting** | 发芽 |
| 150 | **Stewing** | 慢炖焖煮 |
| 151 | **Sublimating** | 升华 |
| 152 | **Swirling** | 漩涡旋转 |
| 153 | **Swooping** | 俯冲 |
| 154 | **Symbioting** | 共生 |
| 155 | **Synthesizing** | 综合合成 |
| 156 | **Tempering** | 调温回火 |
| 157 | **Thinking** | 思考 |
| 158 | **Thundering** | 雷鸣 |
| 159 | **Tinkering** | 修修补补 |
| 160 | **Tomfoolering** | 装疯卖傻 |
| 161 | **Transfiguring** | 变容变貌 |
| 162 | **Transmuting** | 嬗变转化 |
| 163 | **Twisting** | 扭曲缠绕 |
| 164 | **Undulating** | 波浪起伏 |
| 165 | **Unfurling** | 展开舒展 |
| 166 | **Unravelling** | 解开拆散 |
| 167 | **Vibing** | 共鸣 / 氛围契合 |
| 168 | **Waddling** | 摇摇摆摆 |
| 169 | **Wandering** | 漫游 |
| 170 | **Warping** | 扭曲时空 |
| 171 | **Whatchamacalliting** | "叫什么来着" |
| 172 | **Whirlpooling** | 漩涡翻滚 |
| 173 | **Whirring** | 嗡嗡作响 |
| 174 | **Whisking** | 搅打 |
| 175 | **Wibbling** | 颤颤巍巍 |
| 176 | **Working** | 工作中 |
| 177 | **Wrangling** | 争论 / 驯服 |
| 178 | **Zesting** | 擦皮 / 增添风味 |
| 179 | **Zigzagging** | 之字形前进 |

### 15.4 按类别速查

| 类别 | 代表词 |
|------|--------|
| 🧠 深度思考 | Pondering, Ruminating, Cerebrating, Cogitating, Deliberating, Mulling, Musing, Philosophising, Contemplating, Ideating, Considering, Inferring, Determining |
| 🍳 烹饪系 | Baking, Brewing, Marinating, Simmering, Stewing, Sautéing, Caramelizing, Julienning, Garnishing, Whisking, Blanching, Kneading, Leavening, Tempering, Fermenting, Infusing, Percolating, Seasoning, Zesting, Cooking, Concocting, Proofing |
| 🔬 科学系 | Photosynthesizing, Sublimating, Precipitating, Coalescing, Nucleating, Crystallizing, Germinating, Gestating, Incubating, Metamorphosing, Ionizing, Osmosing, Evaporating, Condensing, Nebulizing, Pollinating, Propagating, Sprouting, Symbioting |
| 🌬️ 气象 | Gusting, Breezing, Storming, Raining, Snowing, Thundering, Drizzling, Billowing, Misting, Frosting |
| 🕺 动作移动 | Meandering, Moonwalking, Waddling, Moseying, Skedaddling, Gallivanting, Frolicking, Wandering, Scampering, Scurrying, Galloping, Slithering, Swooping, Zigzagging, Perambulating, Catapulting, Levitating, Orbiting |
| 🤪 搞怪 | Lollygagging, Shenaniganing, Flibbertigibbeting, Discombobulating, Finagling, Doodling, Bamboozling, Hornswoggling, Tomfoolering, Boondoggling, Bloviating, Flummoxing, Whatchamacalliting, Hullaballooing, Razzmatazzing |
| 🪄 魔法 | Conjuring, Manifesting, Divining, Prestidigitating, Enchanting, Evoking, Invoking, Summoning, Transfiguring, Transmuting, Warping, Beaming, Hyperspacing, Quantumizing |
| 🏗️ 建造 | Architecting, Sculpting, Forging, Weaving, Crafting, Constructing, Assembling, Fabricating, Forming, Bootstrapping, Engineering |
| 🎵 音乐 | Grooving, Orchestrating, Beboppin', Jitterbugging, Harmonizing, Improvising, Boogieing, Shimmying, Choreographing |
| 🔍 探索 | Navigating, Spelunking, Charting, Mapping, Exploring, Surveying, Excavating, Unearthing, Deciphering, Decoding, Perusing, Elucidating, Burrowing |
| ⚙️ 技术 | Compiling, Debugging, Refactoring, Optimizing, Computing, Processing, Rendering, Indexing, Encoding, Decrypting, Hashing, Benchmarking, Calculating, Crunching, Gitifying, Bootstrapping |
| 🎮 梗 | Reticulating（SimCity）, Clauding（自嘲） |

---

## 十六、高级技术词汇 (Advanced Technical Vocabulary)

Claude Code 中使用的大量高阶/学术性词汇，非英语母语者可能感到陌生：

| 英文 | 中文解释 | 出现上下文 |
|------|---------|-----------|
| **Adversarial** | 对抗的 / 对抗性的 | Adversarially verify — 以刻意反驳的视角验证，防止假阳性 |
| **Aggregate** | 聚合 / 汇集 | 收集多方结果进行统计汇总 |
| **Ambiguous** | 模棱两可的 / 歧义的 | 需求不明确时的描述 |
| **Amortize** | 摊销 / 分摊 | 将一次性成本分摊到多次使用中（如 prompt cache 成本） |
| **Artifact** | 产物 / 伪影 | 渲染产物、输出文件或 UI 渲染残影 |
| **Attribution** | 归属 / 署名 | 代码来源归属追踪 |
| **Autonomous** | 自主的 / 自动的 | 自主循环模式，无需人工干预 |
| **Baseline** | 基线 / 基准 | 比较的基准参考点 |
| **Benchmarking** | 基准测试 | 性能测试和比较 |
| **Canonical** | 标准的 / 权威的 | 标准形式或权威来源 |
| **Classifier** | 分类器 | 自动模式下的操作评估分类器 |
| **Coalesce** | 合并 / 凝聚 | 将多个结果合并为一个 |
| **Compliance** | 合规 / 合规性 | 企业策略合规检查 |
| **Concrete** | 具体的 | 具体的修复方案、具体的步骤 |
| **Converge** | 收敛 | 多方意见逐步趋同 |
| **Cumulative** | 累积的 | 累积时间/累积成本 |
| **Daemon** | 守护进程 | 后台持续运行的服务进程 |
| **Deduplicate (Dedup)** | 去重 | 移除重复项，合并相同发现 |
| **Defer** | 推迟 / 延迟 | 推迟决策或操作 |
| **Degraded** | 降级的 | 性能降级，非完全失败但更慢 |
| **Deterministic** | 确定性的 | 每次执行结果相同的逻辑 |
| **Diverge** | 发散 | 意见/方案出现分歧 |
| **Elapsed** | 已流逝的 | 已耗时（如 "Elapsed: 5m"） |
| **Ephemeral** | 短暂的 / 临时的 | 临时缓存数据（ephemeral_1h / ephemeral_5m） |
| **Ergonomic** | 人体工学的 / 顺手的 | 快捷键/界面的舒适度设计 |
| **Evict** | 驱逐 / 清除 | 缓存条目被移除以腾出空间 |
| **Exhaustive** | 详尽的 / 穷举的 | 全面覆盖，不遗漏任何情况 |
| **Fallback** | 回退 / 降级 | 主方案不可用时切换到备用方案 |
| **Flaky** | 不稳定的 / 间歇性失败的 | flaky tests — 时过时不过的测试 |
| **Garbled** | 乱码的 | 终端渲染乱码 |
| **Grace period** | 宽限期 | 过期前的缓冲时间 |
| **Granularity** | 粒度 | 控制/配置的精细程度 |
| **Heuristic** | 启发式的 | 基于经验的近似判断方法 |
| **Idempotent** | 幂等的 | 多次执行结果相同的操作 |
| **Idle** | 空闲的 | 闲置的代理或会话 |
| **Immutable** | 不可变的 | 执行期间不可修改的数据 |
| **Interop** | 互操作 / 互通 | 跨平台/跨系统的交互能力 |
| **Jitter** | 抖动 / 随机偏移 | 定时任务添加的随机延迟，避免惊群效应 |
| **Latency** | 延迟 | 请求-响应的时间差 |
| **Legacy** | 遗留的 / 旧的 | 旧版代码或系统 |
| **Manifest** | 清单 / 清单文件 | 插件或项目的元数据文件 |
| **Mitigate** | 缓解 | 降低风险但不完全消除 |
| **No-op** | 空操作 / 无操作 | 不产生任何效果的指令或操作 |
| **Obsolete** | 已废弃的 | 已不再使用或推荐的旧功能 |
| **Opt-in** | 主动选择加入 | 需显式开启的功能 |
| **Opt-out** | 主动选择退出 | 默认开启，需手动关闭 |
| **Overhead** | 额外开销 | 执行主要任务外的附加成本 |
| **Precedence** | 优先级 | 规则/配置的优先级顺序 |
| **Prefetch** | 预取 | 提前加载数据以减少等待时间 |
| **Prune** | 修剪 / 清理 | 删除不需要的分支或数据 |
| **Reconcile** | 协调 / 调和 | 解决冲突使多方数据一致 |
| **Recurring** | 重复的 / 定期的 | 定期重复执行的任务 |
| **Redact** | 编辑 / 遮盖 | 隐藏敏感信息（如密码、密钥） |
| **Redundancy** | 冗余 | 备份或重复以增加可靠性 |
| **Regression** | 回归 | 新版本中重新出现的旧 Bug |
| **Retry** | 重试 | 失败后重新尝试 |
| **Robustness** | 健壮性 | 系统应对异常输入的稳定能力 |
| **Sanitize** | 清理 / 消毒 | 清理输入数据防止注入攻击 |
| **Saturate** | 饱和 | 资源（CPU/内存/Token）达到上限 |
| **Scaffold** | 脚手架 / 生成骨架 | 快速生成项目或插件模板 |
| **Scheduler** | 调度器 | 管理定时任务的组件 |
| **Semantic** | 语义的 | 基于代码含义而非字面文本的分析 |
| **Sentinel** | 哨兵值 | 约定的特殊值代表特定含义 |
| **Severity** | 严重程度 | 错误或警告的严重级别 |
| **Shimmer** | 微光效果 / 闪烁动画 | UI 中关键词的高亮闪烁效果 |
| **Side-channel** | 侧信道 / 旁路 | 通过非主通道传递信息的方式 |
| **SIGKILL / SIGTERM** | 终止信号 | 操作系统级别的进程终止信号 |
| **Slug** | 短标识符 | URL/文件名中使用的短横线连接标识 |
| **Stderr / Stdout** | 标准错误 / 标准输出 | 进程输出的两个标准流 |
| **Surrogate** | 代理 / 替代 | 代理字符（如 Unicode surrogate pairs） |
| **Teardown** | 拆除 / 清理 | 会话结束时的资源清理过程 |
| **Thunk** | 惰性执行函数 | 延迟执行的零参数函数 |
| **Truncate** | 截断 | 内容超出限制时的裁剪 |
| **TTY** | 终端设备 | 交互式终端（TeleTYpewriter） |
| **Uncaught exception** | 未捕获的异常 | 未被 try-catch 处理的运行时错误 |
| **Unguarded** | 无保护的 | 缺少安全保护的配置 |
| **Validator** | 校验器 | JSON Schema 等格式校验组件 |
| **Watchdog** | 看门狗 | 监控进程健康并在异常时重启的组件 |
| **Zombie** | 僵尸进程 | 已终止但未被父进程回收的进程 |

---

> **提示**：本词汇表持续更新中，欢迎补充更多 Claude Code 使用过程中遇到的英文术语。
