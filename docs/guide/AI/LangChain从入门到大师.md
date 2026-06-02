# LangChain 从入门到大师：Python 全面教程

> 本教程带你从零开始系统掌握 LangChain 全家桶，覆盖核心概念、LCEL、RAG、Agent、LangGraph 及生产最佳实践。每一章都配有可运行的代码示例。

---

## 目录

- [第一章：LangChain 概述](#第一章langchain-概述)
- [第二章：快速入门](#第二章快速入门)
- [第三章：模型 Models](#第三章模型-models)
- [第四章：提示词 Prompts](#第四章提示词-prompts)
- [第五章：链 Chains](#第五章链-chains)
- [第六章：LCEL 表达式语言](#第六章lcel-表达式语言)
- [第七章：记忆 Memory](#第七章记忆-memory)
- [第八章：检索 RAG](#第八章检索-rag)
- [第九章：工具 Tools](#第九章工具-tools)
- [第十章：智能体 Agent](#第十章智能体-agent)
- [第十一章：高级主题](#第十一章高级主题)
- [第十二章：LangGraph 入门](#第十二章langgraph-入门)
- [附录](#附录)

---

## 第一章：LangChain 概述

### 1.1 什么是 LangChain

LangChain 是一个用于构建**大语言模型（LLM）应用**的开源框架。它解决了一个核心问题：**LLM 本身只能"说话"，LangChain 让 LLM 能够"做事"**。

具体来说，LangChain 提供了：

- **标准化的组件接口**：模型调用、提示词管理、链式调用、记忆管理等
- **丰富的集成生态**：对接 50+ 模型 Provider、60+ 向量数据库、100+ 数据加载器
- **生产级能力**：流式输出、缓存、监控（LangSmith）、部署（LangServe）

```python
# LangChain 让"对话"变成"行动"
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool

@tool
def get_weather(city: str) -> str:
    """获取城市天气"""
    return f"{city}: 晴, 25°C"

llm = ChatOpenAI(model="gpt-4o")
llm_with_tools = llm.bind_tools([get_weather])

# LLM 现在可以主动调用工具获取天气信息
response = llm_with_tools.invoke("北京今天天气怎么样?")
print(response.tool_calls)  # [{'name': 'get_weather', 'args': {'city': '北京'}}]
```

### 1.2 核心概念速览

| 概念 | 说明 | 类比 |
|---|---|---|
| **Model** | LLM 或 Chat Model 的抽象封装 | 大脑 |
| **Prompt** | 发送给模型的指令和上下文 | 给大脑的问题 |
| **Chain** | 将多个组件串联成工作流 | 流水线 |
| **Memory** | 在多次调用间保持对话状态 | 短期记忆 |
| **Retrieval** | 从外部知识库检索相关文档 | 查阅资料 |
| **Tool** | LLM 可以调用的外部函数 | 手和脚 |
| **Agent** | 自主决策使用哪些工具、以什么顺序 | 自主意识 |

### 1.3 LangChain 生态全景

```
LangChain 生态
├── langchain-core      # 核心抽象（BaseLLM, BaseChatModel, Runnable 等）
├── langchain           # 经典 Chains 和 Agent（传统 API）
├── langchain-community # 社区贡献的集成（第三方 Providers、Loaders、VectorStores）
├── langchain-openai    # OpenAI 专用集成
├── langchain-anthropic # Anthropic Claude 专用集成
├── LangGraph           # 构建有状态、多参与者的 Agent 应用
├── LangSmith           # 调试、测试、监控 LLM 应用（Web 平台）
└── LangServe           # 将 LangChain 链部署为 REST API
```

> **重要提示**：2024 年起，LangChain 官方推荐使用 **LCEL（LangChain Expression Language）** 作为主要 API。本教程前几章介绍传统方式帮助你理解概念，第六章开始全面转向 LCEL。

### 1.4 安装与项目初始化

#### 方式一：pip 安装

```bash
# 核心包
pip install langchain langchain-core langchain-community

# 根据你使用的模型 Provider 安装
pip install langchain-openai      # OpenAI GPT 系列
pip install langchain-anthropic   # Anthropic Claude 系列

# RAG 相关（按需）
pip install chromadb              # 轻量向量数据库
pip install tiktoken              # Token 计数
pip install langchain-text-splitters  # 文本分割

# 可选
pip install langsmith             # 调试监控
pip install langgraph             # 有状态 Agent
```

#### 方式二：uv 现代化管理（推荐）

```bash
# 创建项目
uv init my-langchain-app
cd my-langchain-app

# 添加依赖
uv add langchain langchain-core langchain-openai
uv add chromadb tiktoken langchain-text-splitters

# 激活虚拟环境
# Windows: .venv\Scripts\activate
# Mac/Linux: source .venv/bin/activate
```

#### 验证安装

```python
import langchain
print(f"LangChain 版本: {langchain.__version__}")

from langchain_openai import ChatOpenAI
llm = ChatOpenAI(model="gpt-4o-mini")
response = llm.invoke("用一句话介绍你自己")
print(response.content)
```

---

## 第二章：快速入门

### 2.1 环境变量配置

在项目根目录创建 `.env` 文件：

```bash
# .env
OPENAI_API_KEY=sk-your-key-here
# 如果使用通义千问
DASHSCOPE_API_KEY=your-dashscope-key
# 如果使用 Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-your-key
```

```python
# 加载环境变量
from dotenv import load_dotenv
load_dotenv()
```

### 2.2 第一个 LLM 调用

```python
from langchain_openai import ChatOpenAI

# 创建模型实例
llm = ChatOpenAI(
    model="gpt-4o-mini",       # 模型名称
    temperature=0.7,            # 创造性程度（0=精确, 1=创意）
    max_tokens=500,             # 最大输出 token 数
)

# 同步调用
response = llm.invoke("什么是 LangChain？用一句话回答。")
print(response.content)
# 输出：LangChain 是一个用于构建由大型语言模型驱动的应用程序的框架。

# 流式调用
for chunk in llm.stream("用三句话介绍 Python"):
    print(chunk.content, end="", flush=True)
```

### 2.3 第一个 Prompt Template

```python
from langchain_core.prompts import ChatPromptTemplate

# 定义模板
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个{role}，用{style}的风格回答问题。"),
    ("human", "{question}")
])

# 填充模板
formatted = prompt.invoke({
    "role": "Python 编程专家",
    "style": "通俗易懂",
    "question": "什么是装饰器？"
})

print(formatted.to_messages())
# [
#   SystemMessage(content="你是一个Python 编程专家，用通俗易懂的风格回答问题。"),
#   HumanMessage(content="什么是装饰器？")
# ]
```

### 2.4 第一个 Chain（LCEL 风格）

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# 定义组件
llm = ChatOpenAI(model="gpt-4o-mini")
prompt = ChatPromptTemplate.from_template("给我讲一个关于{topic}的冷笑话")
output_parser = StrOutputParser()

# 用 | 管道符串联成链
chain = prompt | llm | output_parser

# 运行
result = chain.invoke({"topic": "程序员"})
print(result)
# 输出：为什么程序员总是搞混圣诞节和万圣节？
#       因为 Oct 31 == Dec 25（八进制31等于十进制25）
```

**这条链的数据流**：`用户输入 → Prompt 模板填充 → LLM 推理 → 字符串解析 → 输出`

### 2.5 第一个 Agent

```python
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langgraph.prebuilt import create_react_agent

# 定义工具
@tool
def multiply(a: float, b: float) -> float:
    """计算两个数的乘积"""
    return a * b

@tool
def add(a: float, b: float) -> float:
    """计算两个数的和"""
    return a + b

# 创建 Agent
llm = ChatOpenAI(model="gpt-4o")
agent = create_react_agent(llm, tools=[multiply, add])

# 运行 Agent
response = agent.invoke({
    "messages": [{"role": "user", "content": "计算 (3+5) × 7 的结果"}]
})

# 打印所有消息，观察 Agent 的思考过程
for msg in response["messages"]:
    print(f"[{msg.type}]: {msg.content}")
```

> 输出会展示 Agent 的完整思考链：理解问题 → 调用 `add` 工具 → 拿到结果 8 → 调用 `multiply` 工具 → 得到 56 → 回复用户。

---

## 第三章：模型 Models

### 3.1 LLM vs Chat Model

LangChain 中有两种模型抽象：

| 特性 | LLM（BaseLLM） | Chat Model（BaseChatModel） |
|---|---|---|
| **输入** | 纯字符串 | 消息列表（System/Human/AI/Tool） |
| **输出** | 纯字符串 | ChatMessage 对象 |
| **代表** | GPT-3 Completion API、Llama | GPT-4、Claude、通义千问 |
| **状态** | ⚠️ 旧 API，不再推荐 | ✅ 现代推荐 |

```python
# ❌ 旧式 LLM（不推荐）
from langchain_openai import OpenAI
llm = OpenAI(model="gpt-3.5-turbo-instruct")
result = llm.invoke("Hello")
print(type(result))  # <class 'str'>

# ✅ 现代 Chat Model（推荐）
from langchain_openai import ChatOpenAI
chat = ChatOpenAI(model="gpt-4o-mini")
result = chat.invoke("Hello")
print(type(result))  # <class 'langchain_core.messages.AIMessage'>
print(result.content)  # "Hello! How can I help you today?"
```

### 3.2 消息类型详解

```python
from langchain_core.messages import (
    SystemMessage,   # 设定 AI 行为和角色
    HumanMessage,    # 用户输入
    AIMessage,       # AI 回复
    ToolMessage,     # 工具执行结果
)

messages = [
    SystemMessage(content="你是一个严格的技术评审，只关注代码质量和安全性。"),
    HumanMessage(content="审查这段代码：\ndef divide(a,b):\n    return a/b"),
]

llm = ChatOpenAI(model="gpt-4o")
response = llm.invoke(messages)

print(response.content)
# 输出会指出：1. 缺少类型注解  2. 没有处理 b=0 的情况  3. 缺少文档字符串
print(response.response_metadata)
# {'token_usage': {...}, 'model_name': 'gpt-4o-2024-05-13', 'finish_reason': 'stop'}
```

### 3.3 主流 Provider 集成

#### OpenAI

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="gpt-4o",
    temperature=0.7,
    max_tokens=4096,
    api_key="...",           # 或通过环境变量 OPENAI_API_KEY
    organization="org-...",  # 可选：OpenAI 组织 ID
)
```

#### Anthropic Claude

```python
# 需要先 pip install langchain-anthropic
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(
    model="claude-sonnet-4-6-20250514",
    temperature=0.3,
    max_tokens=4096,
)
```

#### 通义千问（DashScope）

```python
# 需要先 pip install langchain-community
from langchain_community.chat_models import ChatTongyi

llm = ChatTongyi(
    model="qwen-plus",
    temperature=0.5,
    api_key="...",  # 或通过环境变量 DASHSCOPE_API_KEY
)
```

#### 本地模型（Ollama）

```python
# 需要先安装 Ollama: https://ollama.com
# 然后 pip install langchain-ollama
from langchain_ollama import ChatOllama

llm = ChatOllama(
    model="llama3.2",
    temperature=0,
)
```

#### 统一接口调用

LangChain 最大的优势是**统一接口**——所有 Provider 都使用相同的调用方式：

```python
# 无论底层是哪个模型，调用方式完全一样
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

def ask_expert(llm, question):
    """任何 ChatModel 都支持 invoke/stream/batch"""
    response = llm.invoke(question)
    return response.content

print(ask_expert(ChatOpenAI(model="gpt-4o-mini"), "1+1=?"))
print(ask_expert(ChatAnthropic(model="claude-haiku-4-5"), "1+1=?"))
```

### 3.4 模型关键参数

```python
llm = ChatOpenAI(
    model="gpt-4o",
    temperature=0.7,        # 0=确定性, 0.5=平衡, 1=创造性, 1.5+=更随机
    top_p=0.9,              # 核采样：只考虑累积概率达到 0.9 的 token
    max_tokens=2048,        # 限制输出长度
    frequency_penalty=0,    # -2.0 到 2.0，正值减少重复
    presence_penalty=0,     # -2.0 到 2.0，正值鼓励谈论新话题
    seed=42,                # 固定随机种子（提升可复现性）
    timeout=30,             # 请求超时（秒）
    max_retries=3,          # 失败重试次数
)
```

**temperature vs top_p 选型指南：**

| 场景 | temperature | top_p | 说明 |
|---|---|---|---|
| 代码生成 | 0 ~ 0.2 | 0.9 | 需要精确、可复现 |
| 事实问答 | 0 ~ 0.3 | 0.9 | 需要准确 |
| 通用对话 | 0.5 ~ 0.7 | 0.9 | 平衡准确与创意 |
| 创意写作 | 0.8 ~ 1.0 | 0.95 | 需要多样性 |
| 头脑风暴 | 1.0 ~ 1.5 | 0.95 | 需要发散 |

### 3.5 流式输出 Streaming

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini", streaming=True)

# 方式一：迭代
for chunk in llm.stream("写一首关于代码的五言绝句"):
    print(chunk.content, end="", flush=True)

# 方式二：异步流
import asyncio

async def async_stream():
    async for chunk in llm.astream("介绍一下 Rust"):
        print(chunk.content, end="", flush=True)

# asyncio.run(async_stream())
```

### 3.6 Token 计数与成本控制

```python
from langchain_openai import ChatOpenAI
# 需要 pip install tiktoken

llm = ChatOpenAI(model="gpt-4o")

# 预计算 Token 数（避免浪费 API 调用）
messages = [
    ("system", "你是严格的代码评审。"),
    ("human", "我想了解 Python 的 GIL 是什么？")
]

# 使用模型的 tokenizer
token_count = llm.get_num_tokens_from_messages(messages)
print(f"提示词消耗 ~{token_count} tokens")

# 带回调记录实际用量
from langchain_core.callbacks import BaseCallbackHandler

class TokenCounter(BaseCallbackHandler):
    def __init__(self):
        self.total_tokens = 0
        self.prompt_tokens = 0
        self.completion_tokens = 0

    def on_llm_end(self, response, **kwargs):
        usage = response.llm_output.get("token_usage", {})
        self.prompt_tokens += usage.get("prompt_tokens", 0)
        self.completion_tokens += usage.get("completion_tokens", 0)
        self.total_tokens += usage.get("total_tokens", 0)

counter = TokenCounter()
llm = ChatOpenAI(model="gpt-4o", callbacks=[counter])
response = llm.invoke("解释 SOLID 原则")
print(f"提示词: {counter.prompt_tokens}, 生成: {counter.completion_tokens}, 总计: {counter.total_tokens}")
```

### 3.7 模型故障转移 Fallback

```python
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

# 主模型 + 备用模型
primary_llm = ChatOpenAI(model="gpt-4o", max_retries=0)  # gpt-4o 可能限流
backup_llm = ChatAnthropic(model="claude-haiku-4-5")     # 更经济的备用方案

# 使用 with_fallbacks 创建容错链
robust_llm = primary_llm.with_fallbacks([backup_llm])

# 如果主模型失败（超时、限流等），自动切换到备用模型
response = robust_llm.invoke("解释微服务架构")
print(response.content)
```

---

## 第四章：提示词 Prompts

### 4.1 PromptTemplate 基础

```python
from langchain_core.prompts import PromptTemplate

# 最简单的模板
template = PromptTemplate.from_template("给我讲一个关于{topic}的笑话")
result = template.invoke({"topic": "Python"})
print(result.text)
# "给我讲一个关于Python的笑话"

# 带格式说明的模板
template = PromptTemplate(
    template="将以下文本翻译成{target_lang}：\n\n{text}",
    input_variables=["text", "target_lang"],
    partial_variables={"target_lang": "中文"}  # 预设值
)
print(template.invoke({"text": "Hello World"}).text)
# "将以下文本翻译成中文：\n\nHello World"
```

### 4.2 ChatPromptTemplate（推荐）

```python
from langchain_core.prompts import ChatPromptTemplate

# 方式一：从消息模板构建
chat_prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个{role}。用{style}的方式回答问题。"),
    ("human", "{question}"),
    ("ai", "我理解你的问题是关于{question}的，让我来分析："),  # 很少用
])

# 方式二：消息类型对象
from langchain_core.prompts import SystemMessagePromptTemplate, HumanMessagePromptTemplate

chat_prompt = ChatPromptTemplate.from_messages([
    SystemMessagePromptTemplate.from_template("你是一个{role}。"),
    HumanMessagePromptTemplate.from_template("{question}"),
])

prompt_value = chat_prompt.invoke({
    "role": "Django 架构师",
    "style": "详细且专业",
    "question": "Django 的中间件是如何工作的？"
})

print(prompt_value.to_messages())
# [
#   SystemMessage(content="你是一个Django 架构师。"),
#   HumanMessage(content="Django 的中间件是如何工作的？")
# ]
```

### 4.3 Few-Shot Prompt Template

当模型需要示例来理解输出格式时使用：

```python
from langchain_core.prompts import ChatPromptTemplate, FewShotChatMessagePromptTemplate

# 定义示例
examples = [
    {
        "input": "我今天升职了！",
        "output": "🎉 太棒了！恭喜你升职，这是对你努力的最好肯定！"
    },
    {
        "input": "我丢了工作...",
        "output": "😔 听到这个消息很难过。但请相信，这扇门关了会有更好的窗打开。你有哪些打算？"
    },
    {
        "input": "下个月要结婚了",
        "output": "💒 恭喜恭喜！新婚快乐，愿你们白头偕老！"
    },
]

# 创建 few-shot 模板
example_prompt = ChatPromptTemplate.from_messages([
    ("human", "{input}"),
    ("ai", "{output}"),
])

few_shot_prompt = FewShotChatMessagePromptTemplate(
    example_prompt=example_prompt,
    examples=examples,
)

# 拼接成完整 prompt
final_prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个共情能力很强的朋友。根据用户的消息给出温暖的回应。"),
    few_shot_prompt,
    ("human", "{input}"),
])

# 使用
chain = final_prompt | ChatOpenAI(model="gpt-4o-mini")
response = chain.invoke({"input": "我通过了驾照考试！"})
print(response.content)
```

### 4.4 Pipeline Prompt Template

用于对话摘要场景——先用一个 prompt 生成摘要，再把摘要注入另一个 prompt：

```python
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.prompts.pipeline import PipelinePromptTemplate

# 阶段一：对话分析
analyze_prompt = ChatPromptTemplate.from_template("""
分析以下对话：
{conversation}

提取以下信息：
1. 用户的情绪状态
2. 对话的核心主题
3. 关键行动项
""")

# 阶段二：生成报告
report_prompt = ChatPromptTemplate.from_template("""
基于以下分析，生成一份客户服务报告：

{analysis}

报告格式：
- 客户情绪：...
- 问题类别：...
- 建议措施：...
""")

# 组合
pipeline = PipelinePromptTemplate(
    final_prompt=report_prompt,
    pipeline_prompts=[("analysis", analyze_prompt)],
)

result = pipeline.invoke({
    "conversation": "客服：您好，有什么可以帮您的？\n客户：我上周买的手机屏幕有裂纹！\n客服：很抱歉听到这个，请问是收到时就这样吗？\n客户：是的，包装是完好的，但开箱就是裂的。"
})
print(result.to_messages()[0].content)
```

### 4.5 提示词管理最佳实践

```python
# 📁 project/
# ├── prompts/
# │   ├── code_review.yaml
# │   ├── translation.yaml
# │   └── summarization.yaml
# └── main.py

# prompts/code_review.yaml
# _type: "prompt"
# input_variables: ["language", "code", "focus_areas"]
# template: |
#   你是一位资深{language}代码评审专家。
#   请从以下角度审查代码：{focus_areas}
#
#   代码：
#   ```{language}
#   {code}
#   ```

# 加载 YAML prompt
from langchain_core.prompts import load_prompt

prompt = load_prompt("prompts/code_review.yaml")
print(prompt.invoke({
    "language": "Python",
    "code": "def f(x): return x*2",
    "focus_areas": "命名规范、类型安全、性能"
}).text)
```

**提示词设计原则：**

1. **角色明确**：`"你是一个资深的 Python 后端工程师"`
2. **输出格式约束**：`"返回 JSON 格式，包含 summary 和 score 字段"`
3. **边界条件说明**：`"如果不知道答案，直接说不知道，不要编造"`
4. **分步思考**：`"请逐步推理：1) 分析问题 2) 列出方案 3) 选择最佳方案 4) 实现"`
5. **示例引导**：对于复杂输出格式，提供 1-2 个示例

---

## 第五章：链 Chains

### 5.1 传统 Chain 回顾

> **说明**：传统 Chain API（`LLMChain`、`SequentialChain`等）源自 LangChain 早期版本。虽然 LCEL（第六章）已成为推荐方式，但理解传统 Chain 有助于阅读旧代码和理解基本概念。

```python
# ⚠️ 这是传统 API，现在推荐用 LCEL
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import LLMChain

llm = ChatOpenAI(model="gpt-4o-mini")
prompt = ChatPromptTemplate.from_template("解释{topic}，用{level}难度的语言。")
chain = LLMChain(llm=llm, prompt=prompt)

result = chain.invoke({"topic": "递归", "level": "初中生"})
print(result["text"])
```

### 5.2 Sequential Chain

```python
from langchain.chains import SimpleSequentialChain, SequentialChain
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

# --- SimpleSequentialChain：单一输入输出 ---
# 链1：生成大纲
chain1 = LLMChain(
    llm=llm,
    prompt=PromptTemplate.from_template("为主题'{topic}'写一个3点大纲："),
    output_key="outline"
)
# 链2：基于大纲生成摘要
chain2 = LLMChain(
    llm=llm,
    prompt=PromptTemplate.from_template("将以下大纲总结为一句话摘要：\n{outline}"),
    output_key="summary"
)

# 串联
overall = SequentialChain(
    chains=[chain1, chain2],
    input_variables=["topic"],
    output_variables=["outline", "summary"],
    verbose=True
)

result = overall.invoke({"topic": "机器学习在医疗诊断中的应用"})
print(f"大纲：\n{result['outline']}\n")
print(f"摘要：{result['summary']}")
```

### 5.3 Router Chain

根据输入内容动态选择合适的处理链：

```python
from langchain.chains.router import MultiPromptChain
from langchain.chains.router.llm_router import LLMRouterChain, RouterOutputParser
from langchain_core.prompts import PromptTemplate

# 定义多个专业 prompt
physics_template = """你是物理学家。用物理原理解答以下问题：{input}"""
math_template = """你是数学家。用数学原理解答以下问题：{input}"""
history_template = """你是历史学家。结合历史背景回答以下问题：{input}"""

prompt_infos = [
    {"name": "physics", "description": "适合物理相关问题", "prompt_template": physics_template},
    {"name": "math", "description": "适合数学相关问题", "prompt_template": math_template},
    {"name": "history", "description": "适合历史相关问题", "prompt_template": history_template},
]

# 创建路由链
llm = ChatOpenAI(model="gpt-4o-mini")
chain = MultiPromptChain.from_prompts(
    llm=llm, prompt_infos=prompt_infos, verbose=True
)

# Router 会自动选择最合适的专业链
print(chain.invoke("牛顿是谁？"))
print(chain.invoke("如何解一元二次方程？"))
```

### 5.4 Chain 调试技巧

```python
# 方法一：全局 verbose 模式
import langchain
langchain.debug = True    # 打印所有内部调用细节
langchain.verbose = True  # 打印 Chain 执行步骤

# 方法二：单链 verbose
chain = LLMChain(
    llm=llm,
    prompt=prompt,
    verbose=True  # 仅对此链打印详细信息
)

# 方法三：自定义回调（更灵活）
from langchain_core.callbacks import BaseCallbackHandler

class DebugHandler(BaseCallbackHandler):
    def on_chain_start(self, serialized, inputs, **kwargs):
        print(f"🔗 Chain 开始: {serialized.get('name', 'unknown')}")
        print(f"   输入: {inputs}")

    def on_chain_end(self, outputs, **kwargs):
        print(f"✅ Chain 结束: {outputs}")

    def on_llm_start(self, serialized, prompts, **kwargs):
        print(f"🤖 LLM 调用: {serialized.get('name', 'unknown')}")
        print(f"   提示词长度: {len(prompts[0])} 字符")

chain_with_debug = LLMChain(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    prompt=PromptTemplate.from_template("{question}"),
    callbacks=[DebugHandler()]
)
chain_with_debug.invoke({"question": "什么是多态？"})
```

---

## 第六章：LCEL 表达式语言

### 6.1 什么是 LCEL

**LCEL（LangChain Expression Language）** 是 LangChain 从 2024 年开始推荐的核心 API。它的设计目标是：

- **组合式**：用 `|` 管道符像 Unix 管道一样串联组件
- **统一接口**：所有组件都遵循 `Runnable` 协议
- **自动优化**：自动支持流式、异步、批处理、并行

```python
# 传统方式 vs LCEL
# 传统方式（不推荐写新代码）：
# chain = LLMChain(llm=llm, prompt=prompt)
# result = chain.invoke({"topic": "AI"})

# LCEL 方式（推荐）：
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

chain = (
    ChatPromptTemplate.from_template("给我讲一个关于{topic}的故事")
    | ChatOpenAI(model="gpt-4o-mini")
    | StrOutputParser()
)

result = chain.invoke({"topic": "AI"})
print(result)
```

### 6.2 Runnable 协议

所有 LCEL 组件都实现 `Runnable` 接口，提供统一的调用方式：

```python
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

chain = (
    ChatPromptTemplate.from_template("{topic}是什么？30字内回答")
    | ChatOpenAI(model="gpt-4o-mini")
)

# 同步调用
result = chain.invoke({"topic": "微服务"})

# 批量调用（自动并发）
results = chain.batch([
    {"topic": "Docker"},
    {"topic": "Kubernetes"},
    {"topic": "Serverless"},
])

# 流式调用
for chunk in chain.stream({"topic": "CI/CD"}):
    print(chunk.content, end="", flush=True)

# 异步调用
import asyncio
async def main():
    result = await chain.ainvoke({"topic": "REST API"})
    print(result.content)
# asyncio.run(main())

# 异步流式调用
async def main_stream():
    async for chunk in chain.astream({"topic": "GraphQL"}):
        print(chunk.content, end="", flush=True)
# asyncio.run(main_stream())
```

### 6.3 RunnablePassthrough

传递数据而不修改，常用于数据增强：

```python
from langchain_core.runnables import RunnablePassthrough, RunnableParallel
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(model="gpt-4o-mini")

# RunnablePassthrough: 透传数据
chain = (
    {"topic": RunnablePassthrough()}  # 直接透传输入作为 topic
    | ChatPromptTemplate.from_template("给{topic}下个一句话定义")
    | llm
    | StrOutputParser()
)
print(chain.invoke("多态"))

# 数据增强：添加额外字段
chain_with_extra = (
    {
        "topic": RunnablePassthrough(),
        "date": lambda _: "2026-06-02",    # 动态注入日期
        "lang": lambda _: "中文",           # 动态注入语言
    }
    | ChatPromptTemplate.from_template("今天是{date}，用{lang}解释{topic}")
    | llm
    | StrOutputParser()
)
print(chain_with_extra.invoke("SOLID 原则"))
```

### 6.4 RunnableParallel

并行执行多个分支：

```python
from langchain_core.runnables import RunnableParallel

# 定义分析链
code_review = (
    ChatPromptTemplate.from_template("审查这段代码的质量：{code}")
    | llm | StrOutputParser()
)

security_check = (
    ChatPromptTemplate.from_template("检查这段代码的安全漏洞：{code}")
    | llm | StrOutputParser()
)

performance_analysis = (
    ChatPromptTemplate.from_template("分析这段代码的性能：{code}")
    | llm | StrOutputParser()
)

# 并行执行三个分析
parallel_review = RunnableParallel(
    code_quality=code_review,
    security=security_check,
    performance=performance_analysis,
)

code = """
def process_user(user_id):
    query = f"SELECT * FROM users WHERE id = {user_id}"
    result = db.execute(query)
    return result
"""

results = parallel_review.invoke({"code": code})
for perspective, analysis in results.items():
    print(f"\n{'='*40}\n{perspective.upper()}\n{'='*40}\n{analysis}")
```

### 6.5 RunnableLambda

将任意 Python 函数转换为 Runnable：

```python
from langchain_core.runnables import RunnableLambda

# 自定义处理步骤
def word_count(text: str) -> dict:
    """统计文本字数"""
    return {
        "original": text,
        "char_count": len(text),
        "word_count": len(text.split()),
    }

def add_reading_time(stats: dict) -> dict:
    """添加预估阅读时间"""
    stats["reading_time_seconds"] = stats["word_count"] * 0.3  # 每词 0.3 秒
    return stats

# 函数 → Runnable
chain = (
    ChatPromptTemplate.from_template("用80字介绍{topic}")
    | llm
    | StrOutputParser()
    | RunnableLambda(word_count)
    | RunnableLambda(add_reading_time)
)

result = chain.invoke({"topic": "Python GIL"})
print(f"字数: {result['char_count']}")
print(f"词数: {result['word_count']}")
print(f"预估阅读时间: {result['reading_time_seconds']:.1f} 秒")
```

### 6.6 RunnableBranch

实现条件路由：

```python
from langchain_core.runnables import RunnableBranch

# 定义不同分支的链
beginner_chain = (
    ChatPromptTemplate.from_template("用最简单的比喻解释{question}")
    | llm | StrOutputParser()
)

intermediate_chain = (
    ChatPromptTemplate.from_template("用技术术语但保持易懂的方式解释{question}")
    | llm | StrOutputParser()
)

expert_chain = (
    ChatPromptTemplate.from_template("深入底层原理，详细解释{question}")
    | llm | StrOutputParser()
)

# 根据用户水平路由
def route_by_level(inputs):
    level = inputs.get("level", "beginner")
    return level

branch = RunnableBranch(
    (lambda x: x["level"] == "beginner", beginner_chain),
    (lambda x: x["level"] == "intermediate", intermediate_chain),
    (lambda x: x["level"] == "expert", expert_chain),
    beginner_chain  # 默认
)

print(branch.invoke({"question": "什么是 Docker？", "level": "beginner"}))
print(branch.invoke({"question": "什么是 Docker？", "level": "expert"}))
```

### 6.7 LCEL 完整示例

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableParallel
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field

# 定义结构化输出模型
class CodeAssessment(BaseModel):
    quality_score: int = Field(description="代码质量评分 1-10")
    issues: list[str] = Field(description="发现的问题列表")
    suggestions: list[str] = Field(description="改进建议")
    summary: str = Field(description="一句话总结")

llm = ChatOpenAI(model="gpt-4o", temperature=0)

# 构建 LCEL 链
code_analyzer = (
    {
        "code": RunnablePassthrough(),
        "format_instructions": lambda _: JsonOutputParser(
            pydantic_object=CodeAssessment
        ).get_format_instructions(),
    }
    | ChatPromptTemplate.from_messages([
        ("system", """你是一个资深代码审查专家。分析用户提供的代码并给出评估。
{format_instructions}"""),
        ("human", "{code}"),
    ])
    | llm
    | JsonOutputParser(pydantic_object=CodeAssessment)
)

# 运行
result = code_analyzer.invoke("""
def f(x):
    return eval(x)
""")
print(f"质量评分: {result['quality_score']}/10")
print(f"问题: {result['issues']}")
print(f"建议: {result['suggestions']}")
print(f"总结: {result['summary']}")
```

---

## 第七章：记忆 Memory

### 7.1 为什么需要记忆

LLM 本身是**无状态**的——每次调用都是独立的。Memory 组件在多次调用间保持上下文：

```python
# 没有 Memory：每次调用都"失忆"
llm = ChatOpenAI(model="gpt-4o-mini")
print(llm.invoke("我叫小明").content)          # "你好小明！"
print(llm.invoke("我叫什么名字？").content)    # "抱歉，我不知道..." ❌

# 有 Memory：记住对话历史
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

conversation = ConversationChain(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    memory=ConversationBufferMemory(),
    verbose=True
)
conversation.invoke("我叫小明")                # "你好小明！"
conversation.invoke("我叫什么名字？")           # "你叫小明！" ✅
```

### 7.2 Memory 类型详解

#### ConversationBufferMemory（全量记忆）

```python
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory(return_messages=True)
memory.save_context(
    {"input": "你好，我是产品经理"},
    {"output": "你好！有什么产品需求要讨论吗？"}
)
memory.save_context(
    {"input": "我们的用户注册流程太复杂了"},
    {"output": "了解，让我们分析一下当前的注册流程。"}
)

print(memory.load_memory_variables({}))
# {'history': [HumanMessage(...), AIMessage(...), HumanMessage(...), AIMessage(...)]}

# ⚠️ 优点：信息完整
# ⚠️ 缺点：Token 消耗随对话增长无上限
```

#### ConversationSummaryMemory（摘要记忆）

```python
from langchain.memory import ConversationSummaryMemory

# 用 LLM 自动生成对话摘要
memory = ConversationSummaryMemory(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    return_messages=True,
    max_token_limit=200,  # 摘要长度限制
)

# 多轮对话后，Memory 只保留摘要
memory.save_context(
    {"input": "帮我分析一下竞品 X 的定价策略"},
    {"output": "竞品 X 采用 freemium 模式，基础版免费，专业版 $29/月..."}
)
memory.save_context(
    {"input": "我们的产品相比有什么优势？"},
    {"output": "我们有更好的 API 文档、更快的响应速度、更灵活的定制..."}
)

# load_memory_variables 返回摘要而非完整历史
print(memory.load_memory_variables({})["history"])
# 摘要："用户询问竞品定价，AI 分析了竞品 freemium 模式，然后讨论自身产品优势..."

# ✅ 优点：节省 Token
# ⚠️ 缺点：细节可能丢失
```

#### ConversationBufferWindowMemory（窗口记忆）

```python
from langchain.memory import ConversationBufferWindowMemory

# 只保留最近 K 轮对话
memory = ConversationBufferWindowMemory(
    k=3,  # 只保留最近 3 轮
    return_messages=True,
)

# 进行 5 轮对话...
for i in range(5):
    memory.save_context(
        {"input": f"问题{i}"},
        {"output": f"回答{i}"}
    )

# 只会保留最近 3 轮（问题2-4 和 回答2-4）
print(len(memory.load_memory_variables({})["history"]))  # 6 条消息

# ✅ 优点：控制 Token 消耗
# ⚠️ 缺点：早期上下文丢失
```

#### ConversationTokenBufferMemory（Token 限制记忆）

```python
from langchain.memory import ConversationTokenBufferMemory

memory = ConversationTokenBufferMemory(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    max_token_limit=300,  # 总 Token 上限
    return_messages=True,
)

# 保存多轮对话，超出限制时自动丢弃最旧的消息
for i in range(20):
    memory.save_context(
        {"input": f"详细问题{i}: " + "详细内容" * 10},
        {"output": f"详细回答{i}: " + "详细内容" * 10},
    )
    print(f"轮次 {i}: 当前 Token 数 ≈ {memory.load_memory_variables({})}")

# ✅ 优点：精确控制 Token 预算
# ⚠️ 缺点：需要知道模型的 tokenizer
```

### 7.3 LCEL 风格使用 Memory

```python
from langchain_core.runnables import RunnablePassthrough
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import AIMessage, HumanMessage
from langchain_openai import ChatOpenAI

# LCEL 推荐：手动管理消息列表（清晰可控）
class ConversationChain:
    def __init__(self, llm, system_prompt=""):
        self.llm = llm
        self.messages = []
        if system_prompt:
            self.messages.append(("system", system_prompt))

    def chat(self, user_input: str) -> str:
        self.messages.append(("human", user_input))
        prompt = ChatPromptTemplate.from_messages(self.messages)
        response = self.llm.invoke(prompt.invoke({}))
        self.messages.append(("ai", response.content))
        return response.content

    def clear(self):
        self.messages = self.messages[:1] if self.messages and self.messages[0][0] == "system" else []

# 使用
conv = ConversationChain(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    system_prompt="你是一个乐于助人的助手。"
)
print(conv.chat("我叫小明"))
print(conv.chat("我叫什么名字？"))
```

---

## 第八章：检索 RAG

### 8.1 RAG 概念与架构

**RAG（Retrieval-Augmented Generation，检索增强生成）** 是 LLM 应用最重要的架构模式。它让模型在回答问题前先"查阅资料"。

```
用户问题 → 检索相关文档 → 将文档注入 Prompt → LLM 生成回答
  │              │                    │                  │
  │         ┌────┴────┐        ┌─────┴─────┐      ┌────┴────┐
  │         │ Vector   │        │System: 你是一个 │      │带来源引用│
  │         │ Store    │        │顾问，基于以下   │      │的回答   │
  │         │ (Chroma/ │        │文档回答问题... │      │        │
  │         │  FAISS)  │        │Human: 用户问题  │      │        │
  │         └─────────┘        └───────────────┘      └────────┘
  │
  文档加载 → 文本分割 → Embedding → 向量存储
  (PDF/Web/DB)  (Chunk)   (向量化)
```

**为什么需要 RAG？**

| 问题 | 不用 RAG | 用 RAG |
|---|---|---|
| LLM 知识截止日期 | 无法回答新信息 | 实时检索最新文档 |
| 幻觉问题 | 可能编造事实 | 基于真实文档回答 |
| 私有知识 | 无法访问企业内部文档 | 检索企业知识库 |
| 可追溯性 | 不知道答案来源 | 可以引用来源文档 |

### 8.2 Document Loaders

```python
# --- 文本文件 ---
from langchain_community.document_loaders import TextLoader
loader = TextLoader("./README.md", encoding="utf-8")
docs = loader.load()

# --- PDF ---
# pip install pypdf
from langchain_community.document_loaders import PyPDFLoader
loader = PyPDFLoader("./report.pdf")
docs = loader.load()
# docs = loader.load_and_split()  # 自动加载并分割

# --- 网页 ---
# pip install beautifulsoup4
from langchain_community.document_loaders import WebBaseLoader
loader = WebBaseLoader("https://docs.python.org/3/tutorial/")
docs = loader.load()

# --- CSV ---
from langchain_community.document_loaders import CSVLoader
loader = CSVLoader("./data.csv", encoding="utf-8")
docs = loader.load()

# --- 目录批量加载 ---
from langchain_community.document_loaders import DirectoryLoader
loader = DirectoryLoader(
    "./docs/",
    glob="**/*.md",
    loader_cls=TextLoader,
    show_progress=True,
)
docs = loader.load()
print(f"加载了 {len(docs)} 个文档")
```

### 8.3 Text Splitters

分割的目标：把长文档切成合适大小的块（chunk），既保证检索粒度，又不破坏语义：

```python
# --- RecursiveCharacterTextSplitter（推荐首选） ---
from langchain_text_splitters import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,         # 每块最大字符数
    chunk_overlap=200,       # 块间重叠字符数（保持语义连续）
    separators=["\n\n", "\n", "。", ".", " ", ""],  # 优先级分隔符
    length_function=len,
)

splits = text_splitter.split_documents(docs)
print(f"分割为 {len(splits)} 个块")

# --- CharacterTextSplitter（简单分割） ---
from langchain_text_splitters import CharacterTextSplitter
splitter = CharacterTextSplitter(
    separator="\n\n",
    chunk_size=500,
    chunk_overlap=50,
)

# --- TokenTextSplitter（按 Token 数分割） ---
from langchain_text_splitters import TokenTextSplitter
splitter = TokenTextSplitter(
    chunk_size=500,    # Token 数
    chunk_overlap=50,
)

# --- Semantic Splitter（语义分割，实验性） ---
# 基于 Embedding 相似度找到自然断点
from langchain_experimental.text_splitter import SemanticChunker
from langchain_openai import OpenAIEmbeddings

splitter = SemanticChunker(
    OpenAIEmbeddings(),
    breakpoint_threshold_type="percentile",
    breakpoint_threshold_amount=70,
)
```

**Chunk Size 选择指南：**

| 场景 | 推荐 Chunk Size | chunk_overlap |
|---|---|---|
| FAQ 短问答 | 256-512 tokens | 10-20% |
| 技术文档搜索 | 512-1024 tokens | 15-25% |
| 长文摘要 | 1024-2048 tokens | 15-20% |
| 代码搜索 | 512-1024 tokens（按函数边界） | 10% |

### 8.4 Embeddings

```python
# --- OpenAI Embeddings（最常用） ---
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",  # 或 text-embedding-3-large
    dimensions=1536,                  # small 默认 1536，large 默认 3072
)
vector = embeddings.embed_query("Python 装饰器是什么？")
print(f"向量维度: {len(vector)}")  # 1536

# 批量 Embedding
vectors = embeddings.embed_documents([
    "Python 是一门动态语言",
    "Rust 是系统编程语言",
    "TypeScript 是 JavaScript 的超集",
])

# --- 本地 Embeddings（零成本） ---
# pip install sentence-transformers
from langchain_community.embeddings import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-zh-v1.5",  # 中文优化
    model_kwargs={"device": "cpu"},
    encode_kwargs={"normalize_embeddings": True},
)
```

### 8.5 Vector Stores

```python
# ========== Chroma（本地轻量，推荐入门） ==========
# pip install chromadb
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()

# 从文档创建向量库
vectorstore = Chroma.from_documents(
    documents=splits,
    embedding=embeddings,
    persist_directory="./chroma_db",  # 持久化目录
    collection_name="my_knowledge_base",
)

# 相似度搜索
results = vectorstore.similarity_search("Python 如何实现多线程？", k=4)
for i, doc in enumerate(results):
    print(f"\n--- 结果 {i+1} ---")
    print(f"内容: {doc.page_content[:200]}...")
    print(f"来源: {doc.metadata.get('source', 'unknown')}")

# 带分数的搜索
results_with_scores = vectorstore.similarity_search_with_score("Python 多线程", k=3)
for doc, score in results_with_scores:
    print(f"相似度: {1 - score:.3f} | {doc.page_content[:100]}...")

# MMR 搜索（最大边际相关：兼顾相关性和多样性）
results = vectorstore.max_marginal_relevance_search(
    "Python 数据结构", k=4, fetch_k=20, lambda_mult=0.7
)

# ========== FAISS（本地高性能） ==========
# pip install faiss-cpu（或 faiss-gpu）
from langchain_community.vectorstores import FAISS

vectorstore = FAISS.from_documents(splits, embeddings)
vectorstore.save_local("./faiss_index")  # 保存

# 加载已有索引
loaded = FAISS.load_local(
    "./faiss_index",
    embeddings,
    allow_dangerous_deserialization=True
)
```

### 8.6 Retrievers

```python
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI

vectorstore = Chroma.from_documents(splits, OpenAIEmbeddings())

# --- 基础 Retriever ---
retriever = vectorstore.as_retriever(
    search_type="similarity",  # 或 "mmr"
    search_kwargs={"k": 4}
)
docs = retriever.invoke("如何优化 Python 性能？")

# --- Self-Query Retriever （基于元数据筛选） ---
from langchain.retrievers.self_query.base import SelfQueryRetriever
from langchain.chains.query_constructor.base import AttributeInfo

metadata_field_info = [
    AttributeInfo(name="source", description="文档来源", type="string"),
    AttributeInfo(name="date", description="文档日期", type="string"),
    AttributeInfo(name="category", description="文档分类：tutorial/api/faq", type="string"),
]

self_query_retriever = SelfQueryRetriever.from_llm(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    vectorstore=vectorstore,
    document_contents="技术文档集合",
    metadata_field_info=metadata_field_info,
)

# LLM 会自动解析查询，生成元数据过滤条件
docs = self_query_retriever.invoke("2025 年发布的关于 API 设计的教程")

# --- Multi-Query Retriever（多角度查询） ---
from langchain.retrievers.multi_query import MultiQueryRetriever

multi_query_retriever = MultiQueryRetriever.from_llm(
    retriever=vectorstore.as_retriever(),
    llm=ChatOpenAI(model="gpt-4o-mini"),
)

# 自动将一个问题重写为多个不同角度的问题，合并检索结果
docs = multi_query_retriever.invoke("Python 性能优化")
# 内部生成：["如何提升 Python 运行速度", "Python 性能调优方法", "Python 代码优化技巧"]

# --- Contextual Compression Retriever（上下文压缩） ---
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor

compressor = LLMChainExtractor.from_llm(ChatOpenAI(model="gpt-4o-mini"))
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=vectorstore.as_retriever(search_kwargs={"k": 10}),
)

# 检索 10 个文档 → LLM 提取与问题相关的部分 → 返回精炼后的内容
docs = compression_retriever.invoke("Django 中间件的执行顺序")
```

### 8.7 完整 RAG Pipeline 实战

```python
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# 1. 加载文档
loader = WebBaseLoader([
    "https://python.langchain.com/docs/get_started/introduction",
    "https://python.langchain.com/docs/expression_language/",
])
docs = loader.load()

# 2. 分割
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000, chunk_overlap=200
)
splits = text_splitter.split_documents(docs)

# 3. 创建向量库 + 检索器
vectorstore = Chroma.from_documents(
    documents=splits,
    embedding=OpenAIEmbeddings(model="text-embedding-3-small"),
)
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

# 4. 构建 RAG Chain
template = """你是一个 LangChain 技术专家。根据以下检索到的上下文回答用户问题。
如果上下文中没有足够信息，直接说"我不确定"，不要编造。

上下文：
{context}

用户问题：{question}

回答："""

prompt = ChatPromptTemplate.from_template(template)
llm = ChatOpenAI(model="gpt-4o", temperature=0)

# 格式化检索到的文档
def format_docs(docs):
    return "\n\n".join(
        f"[来源: {doc.metadata.get('source', 'unknown')}]\n{doc.page_content}"
        for doc in docs
    )

# LCEL RAG Chain
rag_chain = (
    {
        "context": retriever | format_docs,  # 检索 → 格式化
        "question": RunnablePassthrough(),    # 透传问题
    }
    | prompt
    | llm
    | StrOutputParser()
)

# 5. 查询
answer = rag_chain.invoke("什么是 LCEL？它的主要优点是什么？")
print(answer)
```

### 8.8 RAG 评估与优化策略

```python
# RAG 质量自检清单
checklist = """
□ 检索相关性：检索到的文档真的和问题相关吗？
  → 检查方法：打印 retriever.invoke(question)，人工判断

□ 生成忠实度：回答是否忠实于检索到的文档？
  → 检查方法：对比回答和 source docs，确认没有幻觉

□ 上下文利用：LLM 是否充分利用了检索结果？
  → 检查方法：确认回答引用了文档中的具体信息

□ Chunk Size 调优：
  → 太小：语义不完整 → 增大 chunk_size
  → 太大：检索不精确 → 减小 chunk_size

□ 检索策略调优：
  → 相似度低 → 尝试 Multi-Query / 关键词+向量混合检索
  → 重复高 → 使用 MMR 检索（调整 lambda_mult）
"""
```

---

## 第九章：工具 Tools

### 9.1 内置工具

```python
from langchain_community.tools import (
    WikipediaQueryRun,   # 维基百科搜索
    ArxivQueryRun,       # 学术论文搜索
)
from langchain_community.utilities import WikipediaAPIWrapper, ArxivAPIWrapper

# 维基百科
wikipedia = WikipediaQueryRun(api_wrapper=WikipediaAPIWrapper(
    lang="zh",
    top_k_results=3,
))
print(wikipedia.invoke("Python编程语言"))

# Arxiv 学术搜索
arxiv = ArxivQueryRun(api_wrapper=ArxivAPIWrapper(
    top_k_results=3,
))
print(arxiv.invoke("transformer attention mechanism"))
```

### 9.2 自定义工具

```python
from langchain_core.tools import tool, BaseTool
from pydantic import BaseModel, Field
from typing import Optional
import json

# ===== 方式一：@tool 装饰器（推荐） =====
@tool
def get_weather(city: str, country: str = "中国") -> str:
    """获取指定城市的天气信息。

    Args:
        city: 城市名称
        country: 国家名称
    """
    # 模拟天气数据（实际项目中调用天气 API）
    weather_data = {
        "北京": "晴 25°C，湿度 45%",
        "上海": "多云 28°C，湿度 65%",
        "深圳": "阵雨 30°C，湿度 80%",
    }
    return weather_data.get(city, f"{city}: 晴 22°C")

@tool
def calculate(expression: str) -> str:
    """执行数学计算。支持 +、-、*、/、**、() 等运算符。

    Args:
        expression: 数学表达式，如 '2 + 3 * 4'
    """
    try:
        result = eval(expression, {"__builtins__": {}})
        return f"计算结果：{expression} = {result}"
    except Exception as e:
        return f"计算错误：{e}"

@tool
def search_database(query: str) -> str:
    """搜索公司内部数据库。用于查询产品信息、用户数据、订单记录。

    Args:
        query: 搜索关键词或 SQL 查询
    """
    # 模拟数据库查询
    mock_db = {
        "用户数": "截至2026年6月，共有活跃用户 1,234,567 名",
        "订单量": "本月已完成订单 89,234 单，同比增长 23%",
        "top产品": "最畅销产品 Top3：1) 智能音箱 2) 无线耳机 3) 智能手表",
    }
    for key, value in mock_db.items():
        if key in query:
            return value
    return f"未找到与 '{query}' 相关的数据"

# ===== 方式二：BaseTool 子类（需要复杂逻辑时） =====
class FileProcessorInput(BaseModel):
    file_path: str = Field(description="文件路径")
    operation: str = Field(description="操作类型：read/write/delete/list")

class FileProcessor(BaseTool):
    name: str = "file_processor"
    description: str = "处理文件操作：读取、写入、删除或列出目录内容"
    args_schema: type[BaseModel] = FileProcessorInput

    def _run(self, file_path: str, operation: str) -> str:
        import os
        if operation == "read":
            if os.path.exists(file_path):
                with open(file_path, "r") as f:
                    return f.read()
            return f"文件不存在：{file_path}"
        elif operation == "list":
            files = os.listdir(file_path)
            return f"目录内容：{files}"
        return f"操作 {operation} 尚不支持"
```

### 9.3 工具错误处理

```python
from langchain_core.tools import tool
from tenacity import retry, stop_after_attempt, wait_exponential

# 带重试的工具
@tool
@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2))
def fetch_stock_price(symbol: str) -> str:
    """获取股票价格。

    Args:
        symbol: 股票代码，如 AAPL、GOOGL
    """
    import random
    # 模拟 30% 的 API 失败率
    if random.random() < 0.3:
        raise Exception("API 调用失败，请重试")
    price = random.uniform(100, 500)
    return f"{symbol} 当前价格: ${price:.2f}"

# 带超时的工具
@tool
def search_with_timeout(query: str) -> str:
    """搜索互联网信息（最多等待 10 秒）。

    Args:
        query: 搜索关键词
    """
    import time, random
    time.sleep(random.uniform(0.5, 2))  # 模拟网络延迟
    return f"关于 '{query}' 的搜索结果：找到 3 条相关信息..."
```

### 9.4 Multi-Tool 协调

```python
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent

# 组装工具集
tools = [get_weather, calculate, search_database, fetch_stock_price]

# 创建能够自主使用多个工具的 Agent
llm = ChatOpenAI(model="gpt-4o")
agent = create_react_agent(llm, tools)

# 复杂查询：Agent 自动规划需要调用哪些工具、以什么顺序
response = agent.invoke({
    "messages": [{
        "role": "user",
        "content": "查一下北京天气，算一下 123 * 456 是多少，再查一下公司的活跃用户数"
    }]
})

# 展示 Agent 的完整推理链
for msg in response["messages"]:
    role = getattr(msg, "type", "unknown")
    content = getattr(msg, "content", "")
    if content:
        print(f"[{role}] {content[:200]}")

    # 打印工具调用
    tool_calls = getattr(msg, "tool_calls", [])
    for tc in tool_calls:
        print(f"  🔧 调用工具: {tc['name']}({tc['args']})")
```

---

## 第十章：智能体 Agent

### 10.1 Agent 概念与架构

**Agent（智能体）** 是 LLM 的"自主决策层"。与 Chain（固定流程）不同，Agent 可以：

- **自主规划**：决定下一步做什么
- **使用工具**：根据需求选择合适的工具
- **反思调整**：根据工具返回结果调整策略
- **循环执行**：持续 Action→Observation→Thought 直到完成任务

```
Agent 循环（ReAct 模式）：
  ┌──────────────────────────────────────────┐
  │  Thought: 我需要先查天气，然后算数学     │
  │     ↓                                    │
  │  Action: get_weather("北京")             │
  │     ↓                                    │
  │  Observation: 北京: 晴 25°C              │
  │     ↓                                    │
  │  Thought: 天气拿到了，现在算数学          │
  │     ↓                                    │
  │  Action: calculate("123*456")            │
  │     ↓                                    │
  │  Observation: 123*456 = 56088            │
  │     ↓                                    │
  │  Thought: 信息齐全了，回复用户            │
  │     ↓                                    │
  │  Final Answer: ...                       │
  └──────────────────────────────────────────┘
```

### 10.2 Agent 类型对比

| Agent 类型 | 适用模型 | 原理 | 适用场景 |
|---|---|---|---|
| **ReAct** | 所有 | Thought-Action-Observation 循环 | 通用、可解释性高 |
| **OpenAI Functions** | GPT-3.5+ | 原生 Function Calling | GPT 模型首选 |
| **Tool Calling** | Claude/GPT-4+ | 原生 Tool Calling API | 多模型、结构化调用 |
| **Structured Chat** | 所有 | 结构化输出格式 | 需要多参数输入 |

### 10.3 使用 LangGraph 创建 Agent（现代推荐）

```python
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool

# 定义工具
@tool
def web_search(query: str) -> str:
    """搜索互联网获取最新信息"""
    return f"搜索结果：关于'{query}'，找到相关文章提到..."

@tool
def code_interpreter(python_code: str) -> str:
    """执行 Python 代码并返回结果"""
    import io, sys
    old_stdout = sys.stdout
    sys.stdout = buffer = io.StringIO()
    try:
        exec(python_code, {"__builtins__": __builtins__})
        return buffer.getvalue() or "代码执行成功（无输出）"
    except Exception as e:
        return f"执行错误：{e}"
    finally:
        sys.stdout = old_stdout

# 创建 Agent
llm = ChatOpenAI(model="gpt-4o")
agent = create_react_agent(
    llm,
    tools=[web_search, code_interpreter],
)

# 执行
messages = agent.invoke({
    "messages": [{
        "role": "user",
        "content": "搜索最新的 Python 3.13 更新内容，然后用 Python 展示一个 match-case 新特性的代码示例"
    }]
})

# 打印完整对话
for msg in messages["messages"]:
    print(f"\n{'='*50}")
    print(f"[{getattr(msg, 'type', '?')}]: {getattr(msg, 'content', '')}")
```

### 10.4 带系统提示词的 Agent

```python
from langgraph.prebuilt import create_react_agent

system_prompt = """你是一个严格的数据科学家。

规则：
1. 所有计算必须通过 code_interpreter 工具执行，不要心算
2. 每个数值结果都要注明单位和数据来源
3. 如果无法确定结果，明确说出不确定性而不是编造
4. 回答末尾附上使用的工具清单
"""

agent = create_react_agent(
    llm,
    tools=[web_search, code_interpreter],
    state_modifier=system_prompt,  # 系统提示词
)

response = agent.invoke({
    "messages": [{
        "role": "user",
        "content": "2024 年全球 AI 市场规模是多少？未来 5 年的复合增长率预估是多少？"
    }]
})
```

### 10.5 Multi-Agent 协作

```python
from langgraph.prebuilt import create_react_agent
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

# 定义两个专业 Agent
researcher_agent = create_react_agent(
    ChatOpenAI(model="gpt-4o"),
    tools=[web_search],
    state_modifier="你是信息研究员，只负责搜索和整理事实信息，不做主观判断。"
)

critic_agent = create_react_agent(
    ChatOpenAI(model="gpt-4o"),
    tools=[],
    state_modifier="你是批判性思维专家。审视研究员的信息，指出遗漏、偏见和不一致之处。"
)

# 定义状态
class MultiAgentState(TypedDict):
    messages: Annotated[list, operator.add]
    phase: str  # "research" 或 "critique" 或 "done"
    research_result: str

# 构建 Multi-Agent Graph（此处展示概念，实际运行需要 LangGraph）
# 流程：Research → Critique → (通过则结束，不通过则回到 Research)
```

### 10.6 Agent 调试最佳实践

```python
# 1. 使用 verbose 模式查看完整推理链
agent = create_react_agent(llm, tools)

# 2. 记录所有工具调用
import logging
logging.basicConfig(level=logging.INFO)

# 3. 用 LangSmith 追踪（推荐）
import os
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = "ls_..."
os.environ["LANGCHAIN_PROJECT"] = "my-agent-project"

# 4. 手动查看中间步骤
from langgraph.prebuilt import create_react_agent

def debug_agent(question: str):
    agent = create_react_agent(llm, tools)
    result = agent.invoke({"messages": [{"role": "user", "content": question}]})

    for i, msg in enumerate(result["messages"]):
        print(f"\n--- 步骤 {i} ---")
        print(f"角色: {getattr(msg, 'type', 'unknown')}")
        if hasattr(msg, "content") and msg.content:
            print(f"内容: {msg.content[:200]}")
        if hasattr(msg, "tool_calls"):
            for tc in msg.tool_calls:
                print(f"🔧 工具调用: {tc['name']}({tc['args']})")
    return result

debug_agent("北京天气如何，123*456=?")
```

---

## 第十一章：高级主题

### 11.1 Callbacks

```python
from langchain_core.callbacks import BaseCallbackHandler
from langchain_openai import ChatOpenAI
from typing import Any

class MyCallback(BaseCallbackHandler):
    """自定义回调：记录所有操作"""

    def on_llm_start(self, serialized: dict, prompts: list, **kwargs):
        print(f"🤖 LLM 开始调用 | 模型: {serialized.get('name', 'unknown')}")

    def on_llm_end(self, response, **kwargs):
        usage = response.llm_output.get("token_usage", {})
        print(f"✅ LLM 调用完成 | Token 消耗: {usage.get('total_tokens', '?')}")

    def on_llm_error(self, error, **kwargs):
        print(f"❌ LLM 调用失败: {error}")

    def on_tool_start(self, serialized: dict, input_str: str, **kwargs):
        print(f"🔧 工具 {serialized.get('name')} 开始 | 输入: {input_str[:100]}")

    def on_tool_end(self, output: Any, **kwargs):
        print(f"✅ 工具完成 | 输出: {str(output)[:100]}")

    def on_chain_start(self, serialized: dict, inputs: dict, **kwargs):
        print(f"🔗 Chain 开始: {serialized.get('name', 'unknown')}")

    def on_chain_end(self, outputs: dict, **kwargs):
        print(f"✅ Chain 完成")

# 使用回调
llm = ChatOpenAI(model="gpt-4o-mini", callbacks=[MyCallback()])
response = llm.invoke("什么是 Clean Code？")
```

### 11.2 缓存

```python
# ===== 内存缓存 =====
from langchain_core.caches import InMemoryCache
from langchain_core.globals import set_llm_cache

set_llm_cache(InMemoryCache())

llm = ChatOpenAI(model="gpt-4o-mini")
# 第一次调用：真实 API 请求
response1 = llm.invoke("什么是 SOLID 原则？")
# 第二次调用：从缓存返回（相同 prompt，0 费用）
response2 = llm.invoke("什么是 SOLID 原则？")

# ===== SQLite 缓存（持久化） =====
from langchain.cache import SQLiteCache
# 需要 pip install langchain-community
set_llm_cache(SQLiteCache(database_path=".langchain_cache.db"))

# ===== Redis 缓存（分布式） =====
# pip install redis
from langchain_community.cache import RedisCache
import redis
# set_llm_cache(RedisCache(redis_=redis.Redis(host="localhost", port=6379)))
```

### 11.3 结构化输出

```python
from langchain_core.output_parsers import JsonOutputParser, PydanticOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum

# ===== 定义输出模型 =====
class Severity(str, Enum):
    critical = "critical"
    high = "high"
    medium = "medium"
    low = "low"

class CodeIssue(BaseModel):
    file: str = Field(description="文件路径")
    line: int = Field(description="行号")
    severity: Severity = Field(description="严重程度")
    description: str = Field(description="问题描述")
    suggestion: str = Field(description="修复建议")

class CodeReviewReport(BaseModel):
    overall_score: int = Field(description="总体评分 1-10", ge=1, le=10)
    issues: List[CodeIssue] = Field(description="发现的问题列表")
    strengths: List[str] = Field(description="代码的优点")
    summary: str = Field(description="一句话总结")

# ===== 创建解析链 =====
parser = PydanticOutputParser(pydantic_object=CodeReviewReport)

prompt = ChatPromptTemplate.from_messages([
    ("system", "你是资深代码审查专家。根据代码给出结构化评审报告。\n{format_instructions}"),
    ("human", "{code}"),
])

llm = ChatOpenAI(model="gpt-4o", temperature=0)

chain = prompt | llm | parser

# ===== 运行 =====
code = """
def process(data):
    result = []
    for i in range(len(data)):
        if data[i] > 0:
            result.append(data[i] * 2)
    return result
"""

report: CodeReviewReport = chain.invoke({
    "code": code,
    "format_instructions": parser.get_format_instructions(),
})

print(f"总体评分: {report.overall_score}/10")
print(f"\n问题 ({len(report.issues)} 个):")
for issue in report.issues:
    print(f"  [{issue.severity.value}] {issue.file}:{issue.line} - {issue.description}")
    print(f"    💡 {issue.suggestion}")
print(f"\n优点:")
for s in report.strengths:
    print(f"  ✅ {s}")
print(f"\n总结: {report.summary}")
```

### 11.4 异步与并发

```python
import asyncio
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(model="gpt-4o-mini")
prompt = ChatPromptTemplate.from_template("用30字介绍{topic}")
chain = prompt | llm | StrOutputParser()

# ===== 异步调用 =====
async def async_task(topic: str):
    result = await chain.ainvoke({"topic": topic})
    print(f"{topic}: {result}")
    return result

async def main():
    # 并发执行（不相互等待）
    results = await asyncio.gather(
        async_task("Docker"),
        async_task("Kubernetes"),
        async_task("Terraform"),
        async_task("Ansible"),
        async_task("Jenkins"),
    )
    print(f"共完成 {len(results)} 个任务")

# asyncio.run(main())

# ===== 批量处理（自动并发） =====
inputs = [{"topic": t} for t in ["微服务", "单体架构", "SOA", "Serverless", "Event-driven"]]
results = chain.batch(inputs)  # 自动并发请求
for inp, res in zip(inputs, results):
    print(f"{inp['topic']}: {res[:50]}...")
```

### 11.5 安全最佳实践

```python
# 1. 永远不要拼接用户输入到 SQL/eval 中
# ❌ 危险
@tool
def bad_query(user_id: str):
    query = f"SELECT * FROM users WHERE id = {user_id}"
    return db.execute(query)

# ✅ 安全
@tool
def safe_query(user_id: str):
    query = "SELECT * FROM users WHERE id = %s"
    return db.execute(query, (user_id,))

# 2. 限制 Agent 的权限范围
# ❌ 危险：Agent 可以执行任意 shell 命令
# ✅ 安全：只允许预定义的安全操作

# 3. 沙箱执行用户代码
@tool
def safe_python_exec(code: str) -> str:
    """在受限环境中执行 Python 代码"""
    allowed_builtins = {
        "abs": abs, "all": all, "any": any, "bin": bin,
        "bool": bool, "dict": dict, "float": float, "int": int,
        "len": len, "list": list, "max": max, "min": min,
        "range": range, "round": round, "str": str, "sum": sum,
    }
    try:
        result = eval(code, {"__builtins__": allowed_builtins}, {})
        return str(result)
    except Exception as e:
        return f"错误: {e}"

# 4. 敏感信息处理
# ❌ 不要把 API Key 写在代码里
# ✅ 使用环境变量或密钥管理服务
import os
api_key = os.getenv("OPENAI_API_KEY")

# 5. 输入验证
from pydantic import BaseModel, Field, validator

class SafeInput(BaseModel):
    query: str = Field(..., max_length=1000, min_length=1)

    @validator("query")
    def no_sql_injection(cls, v):
        dangerous = ["DROP", "DELETE", "TRUNCATE", "--", ";"]
        for word in dangerous:
            if word.upper() in v.upper():
                raise ValueError(f"检测到潜在危险关键词: {word}")
        return v
```

---

## 第十二章：LangGraph 入门

### 12.1 LangGraph vs Chain

| 特性 | Chain（LCEL） | LangGraph |
|---|---|---|
| **结构** | 线性管道（A → B → C） | 有向图（A → B → C → 可能回到 A） |
| **状态** | 无状态（每次调用独立） | 有状态（State 贯穿全图） |
| **控制流** | 固定的 | 条件分支、循环、人工干预 |
| **适用场景** | 简单 RAG、翻译、摘要 | 复杂 Agent、多步骤工作流、人机协作 |
| **检查点** | ❌ | ✅ 支持（可回退/重放） |

### 12.2 State、Node、Edge

```python
from typing import TypedDict, Annotated
import operator
from langgraph.graph import StateGraph, END

# --- State：贯穿全图的数据结构 ---
class GraphState(TypedDict):
    messages: Annotated[list, operator.add]  # 消息累加
    user_query: str
    search_results: list
    final_answer: str

# --- Node：图中的处理节点 ---
def search_node(state: GraphState) -> GraphState:
    """搜索节点"""
    query = state["user_query"]
    # 模拟搜索
    results = [f"搜索结果1: 关于'{query}'的文档...", f"搜索结果2: 更多关于'{query}'的信息..."]
    return {"search_results": results}

def analyze_node(state: GraphState) -> GraphState:
    """分析节点"""
    results = state.get("search_results", [])
    analysis = f"分析了 {len(results)} 条结果"
    return {"messages": [{"role": "assistant", "content": analysis}]}

def answer_node(state: GraphState) -> GraphState:
    """回答节点"""
    results = state.get("search_results", [])
    answer = f"基于 {len(results)} 条搜索结果，我的回答是：..."
    return {"final_answer": answer}

# --- Graph 构建 ---
graph = StateGraph(GraphState)

# 添加节点
graph.add_node("search", search_node)
graph.add_node("analyze", analyze_node)
graph.add_node("answer", answer_node)

# 添加边（定义流程）
graph.set_entry_point("search")
graph.add_edge("search", "analyze")
graph.add_edge("analyze", "answer")
graph.add_edge("answer", END)

# 编译
app = graph.compile()

# 运行
result = app.invoke({"user_query": "什么是微服务？"})
print(f"最终回答: {result['final_answer']}")
```

### 12.3 条件分支

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict

class State(TypedDict):
    query: str
    query_type: str  # "code", "general", "math"
    answer: str

# 路由函数
def classify_query(state: State) -> State:
    """分类用户查询"""
    query = state["query"].lower()
    if any(kw in query for kw in ["代码", "code", "函数", "bug"]):
        return {"query_type": "code"}
    elif any(kw in query for kw in ["计算", "算", "数学", "+", "-", "*"]):
        return {"query_type": "math"}
    else:
        return {"query_type": "general"}

# 条件边：根据 query_type 路由
def route_after_classify(state: State) -> str:
    return state["query_type"]

# 处理节点
def code_handler(state: State) -> State:
    return {"answer": f"[代码模式] 处理: {state['query']}"}

def math_handler(state: State) -> State:
    return {"answer": f"[数学模式] 处理: {state['query']}"}

def general_handler(state: State) -> State:
    return {"answer": f"[通用模式] 处理: {state['query']}"}

# 构建图
graph = StateGraph(State)
graph.add_node("classify", classify_query)
graph.add_node("code", code_handler)
graph.add_node("math", math_handler)
graph.add_node("general", general_handler)

graph.set_entry_point("classify")
graph.add_conditional_edges(
    "classify",
    route_after_classify,
    {"code": "code", "math": "math", "general": "general"}
)
graph.add_edge("code", END)
graph.add_edge("math", END)
graph.add_edge("general", END)

app = graph.compile()
print(app.invoke({"query": "帮我写一个 Python 排序函数"})["answer"])
print(app.invoke({"query": "123 * 456 等于多少?"})["answer"])
```

### 12.4 Human-in-the-loop

```python
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from typing import TypedDict

class State(TypedDict):
    code: str
    review_approved: bool
    review_comment: str

# 需要人工审批的节点
def generate_code(state: State) -> State:
    # AI 生成代码
    return {"code": "def hello():\n    print('Hello World')"}

def human_review(state: State) -> State:
    """这个节点会中断等待人工输入"""
    # 这里 Graph 会暂停，等待人工批准
    return state

def deploy_code(state: State) -> State:
    return {"review_comment": "已部署"}

# 构建图（带中断点）
graph = StateGraph(State)
graph.add_node("generate", generate_code)
graph.add_node("review", human_review)
graph.add_node("deploy", deploy_code)

graph.set_entry_point("generate")
graph.add_edge("generate", "review")
graph.add_conditional_edges(
    "review",
    lambda s: "deploy" if s.get("review_approved") else "generate",
    {"deploy": "deploy", "generate": "generate"}
)
graph.add_edge("deploy", END)

# 使用 MemorySaver 支持中断和恢复
memory = MemorySaver()
app = graph.compile(checkpointer=memory, interrupt_before=["review"])

# 第一次运行：会在 review 节点前中断
config = {"configurable": {"thread_id": "1"}}
result = app.invoke({"code": ""}, config)
print(f"状态: {result}")  # 代码已生成，等待审批

# 人工批准后继续
app.update_state(config, {"review_approved": True})
result = app.invoke(None, config)
print(f"最终: {result}")
```

### 12.5 Agent + LangGraph 完整示例

```python
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool

@tool
def search_knowledge_base(query: str) -> str:
    """搜索内部知识库"""
    kb = {
        "退款": "退款政策：7天内无条件退款，联系客服处理",
        "发货": "发货时效：下单后24小时内发货，顺丰包邮",
        "保修": "保修政策：主机保修2年，配件保修6个月",
    }
    for k, v in kb.items():
        if k in query:
            return v
    return f"未找到关于'{query}'的政策信息"

llm = ChatOpenAI(model="gpt-4o")

# 创建 Agent
agent = create_react_agent(
    llm,
    tools=[search_knowledge_base],
    state_modifier="你是电商客服助手。所有政策相关查询必须使用 search_knowledge_base 工具确认。"
)

# 带记忆（多轮对话）
memory = MemorySaver()
agent_with_memory = agent.with_config({"configurable": {"thread_id": "customer-001"}})

# 多轮对话
for question in [
    "我想退款，有什么政策？",
    "多久能发货？",
    "我之前问的是什么？",      # 能记住之前的对话
]:
    print(f"\n用户: {question}")
    result = agent_with_memory.invoke({"messages": [{"role": "user", "content": question}]})
    print(f"客服: {result['messages'][-1].content}")
```

---

## 附录

### A. 常见问题与故障排除

#### Q1: `ImportError: No module named 'langchain.xxx'`

```bash
# LangChain 按功能分包，按需安装
pip install langchain langchain-core langchain-community
pip install langchain-openai       # OpenAI
pip install langchain-anthropic    # Claude
pip install langchain-text-splitters  # 文本分割
pip install langgraph              # Graph/Agent
```

#### Q2: API Key 认证失败

```python
# 检查环境变量
import os
print(os.getenv("OPENAI_API_KEY"))  # 应打印你的 Key

# 或在代码中显式传递
llm = ChatOpenAI(
    model="gpt-4o-mini",
    api_key="sk-...",  # 不推荐在生产代码中硬编码
)
```

#### Q3: Token 超出限制

```python
# 症状："This model's maximum context length is ..."
# 解决：
# 1. 减小 chunk_size
# 2. 使用 ConversationSummaryMemory 替代 BufferMemory
# 3. 对长文档先做摘要再检索

# 预检查 Token 数
from langchain_openai import ChatOpenAI
llm = ChatOpenAI(model="gpt-4o-mini")
token_count = llm.get_num_tokens("你的文本...")
print(f"Token 数: {token_count}")
```

#### Q4: Agent 不调用工具或调用错误的工具

```python
# 检查工具的 docstring（Agent 依赖它来理解工具功能）
# ✅ 好的 docstring
@tool
def get_user(id: int) -> str:
    """根据用户ID查询用户详细信息，包括姓名、邮箱、注册日期"""
    ...

# ❌ 不好的 docstring
@tool
def get_user(id: int) -> str:
    """获取用户"""  # 描述太模糊
    ...

# 多工具时，确保每个工具的 docstring 清晰区分用途
```

### B. 推荐学习资源

| 资源 | 链接 | 说明 |
|---|---|---|
| LangChain 官方文档 | https://python.langchain.com | 最权威的 API 参考 |
| LangChain Academy | https://academy.langchain.com | 官方免费课程 |
| LangGraph 文档 | https://langchain-ai.github.io/langgraph/ | Graph 和 Agent 开发 |
| LangSmith 平台 | https://smith.langchain.com | 调试和监控 |
| LCEL 速查表 | https://python.langchain.com/docs/how_to/ | 常见任务 How-to |

### C. 版本兼容性

```python
# 推荐版本组合（2026年6月）
# langchain >= 0.3.0
# langchain-core >= 0.3.0
# langchain-openai >= 0.2.0
# langgraph >= 0.2.0
# chromadb >= 0.5.0
# pydantic >= 2.0

# 查看所有版本
import langchain, langchain_core, langchain_openai, langgraph
print(f"langchain: {langchain.__version__}")
print(f"langchain-core: {langchain_core.__version__}")
print(f"langchain-openai: {langchain_openai.__version__}")
print(f"langgraph: {langgraph.__version__}")
```

### D. 快速参考速查表

```python
# ===== 最常用导入 =====
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableParallel
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage

# ===== 最常用模式 =====
# 简单链
chain = prompt | llm | StrOutputParser()

# RAG 链
chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt | llm | StrOutputParser()
)

# 并行链
chain = RunnableParallel(branch1=chain1, branch2=chain2)

# Agent
agent = create_react_agent(llm, tools)

# 条件路由
chain = RunnableBranch(
    (condition1, chain1),
    (condition2, chain2),
    default_chain,
)
```

---

> **教程更新日期**：2026-06-02
> **适用版本**：LangChain 0.3.x / LangGraph 0.2.x / langchain-openai 0.2.x
