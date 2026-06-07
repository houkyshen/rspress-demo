# LangChain 内置中间件（Built-in Middleware）总结

该页面是 **LangChain v1** 的内置中间件文档，介绍了用于增强 AI Agent 生产可用性的一系列开箱即用中间件。

---

## 一、中间件架构

LangChain v1 的中间件系统通过 Hook 机制拦截 Agent 执行流程的各个环节：

| Hook | 触发时机 |
|------|---------|
| `beforeAgent` | Agent 启动前（每次调用一次） |
| `beforeModel` | 每次 LLM 调用前 |
| `wrapModelCall` | 包裹每次模型调用（支持重试/缓存） |
| `wrapToolCall` | 包裹每次工具调用（支持重试/缓存） |
| `afterModel` | 每次 LLM 响应后 |
| `afterAgent` | Agent 完成后（每次调用一次） |

**执行顺序规则**：`before` 钩子按顺序执行（先注册的先执行），`after` 钩子反向执行（后进先出），`wrap` 钩子嵌套执行。

**基本用法**：

```python
from langchain.agents import create_agent
from langchain.agents.middleware import SummarizationMiddleware

agent = create_agent(
    model="openai:gpt-4o",
    tools=[...],
    middleware=[
        SummarizationMiddleware(...),
    ],
)
```

---

## 二、核心内置中间件详解

### 1. SummarizationMiddleware — 对话摘要

当对话历史接近 Token 上限时，自动对历史消息进行摘要压缩，保留最新消息，压缩旧消息。

```python
SummarizationMiddleware(
    model="openai:gpt-4o-mini",     # 用于摘要的模型（通常用更便宜的）
    max_tokens_before_summary=4000,  # 触发阈值：4000 token
    messages_to_keep=20,            # 摘要后保留最近 20 条消息
)
```

- **触发条件**：支持 `tokens`（绝对数量）、`messages`（消息条数）、`fraction`（上下文窗口百分比，如 0.8），多种条件为 **OR** 逻辑
- **保留策略**：`tokens`、`messages`、`fraction`
- **适用场景**：长对话、多轮交互、成本优化

---

### 2. HumanInTheLoopMiddleware — 人机协同

在敏感工具调用前暂停执行，等待人工审批（批准/编辑/拒绝）。

```python
HumanInTheLoopMiddleware(
    interrupt_on={
        "process_refund": True,                             # 需要审批
        "execute_sql": {"allowed_decisions": ["approve", "reject"]},  # 仅批准/拒绝
        "read_data": False,                                 # 自动通过
    },
    description_prefix="Tool execution pending review",
)
```

- **三种决策类型**：✅ `approve`（批准执行）、✏️ `edit`（修改参数后执行）、❌ `reject`（拒绝并附说明）
- **依赖**：需要 `checkpointer`（如 `MemorySaver()`）来持久化中断状态
- **适用场景**：金融交易、数据库写入、系统配置变更等需人类把关的操作

---

### 3. PIIMiddleware — 敏感信息检测

检测和处理对话中的个人身份信息（PII），支持多种处理策略。

```python
PIIMiddleware("email", strategy="redact")      # 替换为 [REDACTED_EMAIL]
PIIMiddleware("credit_card", strategy="mask")   # 部分遮蔽 ****-****-****-1234
PIIMiddleware(
    "api_key",
    detector=r"sk-[a-zA-Z0-9]{32}",             # 自定义正则
    strategy="block",                            # 检测到则抛异常
)
```

- **内置检测类型**：`email`、`credit_card`、`ip`、`mac_address`、`url`
- **策略**：`redact`（替换标记）、`mask`（部分遮蔽）、`hash`（哈希替换）、`block`（抛异常）
- **应用目标**：`apply_to_input`、`apply_to_output`、`apply_to_tool_results`
- **适用场景**：医疗/金融合规、客服日志脱敏、任何处理敏感数据的应用

---

### 4. ModelCallLimitMiddleware — 模型调用限制

限制模型调用次数，避免成本失控。

---

### 5. ToolCallLimitMiddleware — 工具调用限制

限制工具执行次数，可全局限制或按工具单独限制。

```python
# 全局限制
ToolCallLimitMiddleware(thread_limit=20, run_limit=10)

# 特定工具限制
ToolCallLimitMiddleware(tool_name="search", thread_limit=5, run_limit=3)
```

- **参数**：`thread_limit`（整个对话生命周期上限）、`run_limit`（单次调用上限）、`exit_behavior`（`"continue"` / `"error"` / `"end"`）

---

### 6. ModelFallbackMiddleware — 模型降级

当主模型调用失败时，自动切换至备选模型。

```python
ModelFallbackMiddleware(
    "gpt-4o-mini",                  # 第一降级
    "claude-3-5-sonnet-20241022",  # 第二降级
)
```

按列表顺序依次尝试，直到成功为止。

---

### 7. ModelRetryMiddleware — 模型重试

模型调用失败时，自动以指数退避策略重试。

---

### 8. ToolRetryMiddleware — 工具重试

工具调用失败时，自动以指数退避策略重试。

---

### 9. TodoListMiddleware — 任务清单

为 Agent 配备任务规划和跟踪能力，让 Agent 能自主拆分、管理和追踪子任务。

---

### 10. LLMToolSelectorMiddleware — LLM 工具选择器

在调用主模型之前，先用 LLM 筛选出与当前任务相关的工具子集，避免将全部工具描述塞入上下文，减少 Token 消耗和提升效率。

---

### 11. LLMToolEmulator — LLM 工具模拟器

用 LLM 模拟工具执行结果，方便在开发阶段测试 Agent 逻辑而无需真实调用外部工具。

---

### 12. ContextEditingMiddleware — 上下文编辑

管理对话上下文，裁剪或清除过期的工具输出结果，控制上下文窗口大小。

---

### 13. Shell Tool — Shell 工具

为 Agent 暴露一个持久的 Shell 会话。

---

### 14. File Search — 文件搜索

为 Agent 提供基于 Glob 和 Grep 的文件搜索能力。

---

### 15. Filesystem — 文件系统

为 Agent 提供文件系统读写能力，用于存储上下文和长期记忆。

---

### 16. Subagent — 子代理

为 Agent 增加创建和派生子 Agent 的能力，用于委派子任务。

---

### 17. AnthropicPromptCachingMiddleware

Anthropic 模型专用的 Prompt 缓存中间件，利用 Anthropic 的 Prompt Caching 机制降低成本和延迟。

---

## 三、四大中间件类别

| 类别 | 作用 | 典型中间件 |
|------|------|-----------|
| **Monitor**（监控） | 日志、分析、调试 | — |
| **Modify**（修改） | Prompt 转换、工具选择、输出格式化 | Summarization |
| **Control**（控制） | 重试、降级、提前终止 | ModelRetry, ModelFallback, HITL |
| **Enforce**（执行） | 限流、护栏、PII 检测 | ToolCallLimit, PII |

---

## 四、关键要点

1. **可组合**：所有中间件可任意组合，放入 `middleware=[]` 列表即可
2. **顺序重要**：before 钩子顺序执行，after 钩子逆序执行，wrap 钩子嵌套
3. **生产就绪**：这些中间件专为生产环境设计，覆盖了成本控制、安全合规、故障恢复、人工审批等关键场景

> **来源**: [Prebuilt middleware - Docs by LangChain](https://docs.langchain.com/oss/python/langchain/middleware/built-in)
