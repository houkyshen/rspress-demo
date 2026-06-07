# LangChain 到底做了什么？—— 每个功能 vs 纯 Prompt 实现

> LangChain 是一个"大语言模型应用框架"。但**框架本身不做任何你写不出来的事情**——它只是把每次都要重复写的样板代码封装成了可复用的组件。
>
> 本文把 LangChain 的每个核心功能拆开，左边放 LangChain 的写法，右边放**纯 Prompt / 原生 API 的等价实现**。读完你会知道两件事：
>
> 1. **LangChain 底层到底干了什么**（原理层面）
> 2. **什么场景该用 LangChain，什么场景纯 Prompt 就够了**（决策层面）

---

## 目录

- [零、LangChain 的本质：一张表看懂](#零langchain-的本质一张表看懂)
- [一、链式编排 Chain / LCEL](#一链式编排-chain--lcel)
  - [1.1 基础链：Prompt + LLM + 输出解析](#11-基础链prompt--llm--输出解析)
  - [1.2 顺序链：多步串联](#12-顺序链多步串联)
  - [1.3 路由链：条件分发](#13-路由链条件分发)
  - [1.4 并行执行：RunnableParallel](#14-并行执行runnableparallel)
  - [1.5 中间件：链级回调](#15-中间件链级回调)
- [二、记忆管理 Memory](#二记忆管理-memory)
  - [2.1 全量记忆 BufferMemory](#21-全量记忆-buffermemory)
  - [2.2 摘要记忆 SummaryMemory](#22-摘要记忆-summarymemory)
  - [2.3 窗口记忆 WindowMemory](#23-窗口记忆-windowmemory)
- [三、检索增强 RAG](#三检索增强-rag)
  - [3.1 文档加载 Document Loader](#31-文档加载-document-loader)
  - [3.2 文本分割 Text Splitter](#32-文本分割-text-splitter)
  - [3.3 向量存储 + 检索](#33-向量存储--检索)
  - [3.4 完整 RAG 管线](#34-完整-rag-管线)
- [四、智能体 Agent](#四智能体-agent)
  - [4.1 工具定义 Tool](#41-工具定义-tool)
  - [4.2 Agent 执行器](#42-agent-执行器)
  - [4.3 结构化输出](#43-结构化输出)
- [五、总结：决策框架](#五总结决策框架)

---

## 零、LangChain 的本质：一张表看懂

| LangChain 替你做的是 | 省了什么 | 代价是什么 |
|---|---|---|
| **消息拼接与管理** | 不用手动写 `messages.append()` | 多了一层抽象，出bug时难定位 |
| **链式数据流转** | 不用手动传参数给下一步 | `\|` 管道符背后黑盒，新手不知道数据怎么流的 |
| **Prompt模板化** | 不用字符串拼接 `f"你是{role}"` | 增加依赖，简单场景杀鸡用牛刀 |
| **记忆管理** | 不用手动维护对话历史 | 默认行为不透明，需主动了解每种Memory的取舍 |
| **RAG管线编排** | 不用手写加载→分割→向量化→检索流程 | 每个环节的默认参数未必适合你的场景 |
| **Agent循环** | 不用手写 Thought→Action→Observation 循环 | 黑盒决策，出问题难排查 |
| **回调/监控** | 不用在每个环节手动加 log | 回调链长时性能有损耗 |

**一句话结论**：LangChain 是用**标准化和可组合性**换取**开发效率**。当你的项目超过某个复杂度阈值，它所节省的样板代码量就会超过它的学习成本。但简单场景下——纯 Prompt 往往更直接、更可控。

---

## 一、链式编排 Chain / LCEL

### 1.1 基础链：Prompt + LLM + 输出解析

**功能说明**：把 Prompt 模板、LLM 调用、输出解析串成一个可复用的执行单元。为什么会出现？因为每次调 LLM 都要写三样东西——拼字符串、调 API、解析结果——重复劳动。

#### LangChain 方式

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# LangChain：组装式，声明式
chain = (
    ChatPromptTemplate.from_template("将以下文字翻译成{target_lang}：\n{text}")
    | ChatOpenAI(model="gpt-4o-mini")
    | StrOutputParser()
)

result = chain.invoke({"target_lang": "英文", "text": "你好世界"})
# 一行链定义 + 一行调用
```

#### 纯 Prompt / 原生 API 方式

```python
from openai import OpenAI

client = OpenAI()

# 纯 Prompt：手动拼字符串、调API、取结果
def 翻译(文本: str, 目标语言: str) -> str:
    prompt = f"将以下文字翻译成{目标语言}：\n{文本}"  # 手动拼接
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
    )
    return response.choices[0].message.content  # 手动取结果

result = 翻译("你好世界", "英文")
```

> **差异分析**：LangChain 在这个场景做的事 = 字符串模板填充 + API调用 + 取值。**三行代码的区别**。纯 Prompt 更直接——变量少、依赖少、一眼看到底。
>
> **选型建议**：🥇 **纯 Prompt 胜出**。这种简单场景 LangChain 是多余的。

---

### 1.2 顺序链：多步串联

**功能说明**：第一步的输出作为第二步的输入。为什么会出现？实际业务很少一步完成——需要摘要→翻译、分析→润色、提取→分类等多步流水线。

#### LangChain 方式

```python
from langchain.chains import SequentialChain, LLMChain
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini")

# 链1：生成大纲
链1 = LLMChain(
    llm=llm,
    prompt=PromptTemplate.from_template("为'{topic}'写3点大纲："),
    output_key="outline"
)
# 链2：基于大纲生成摘要
链2 = LLMChain(
    llm=llm,
    prompt=PromptTemplate.from_template("把以下大纲总结为一句话摘要：\n{outline}"),
    output_key="summary"
)

overall = SequentialChain(
    chains=[链1, 链2],
    input_variables=["topic"],
    output_variables=["outline", "summary"],
)
result = overall.invoke({"topic": "Python异步编程"})
print(result["summary"])
```

#### 纯 Prompt / 原生 API 方式

```python
from openai import OpenAI

client = OpenAI()

def 顺序执行(主题: str) -> dict:
    # 第一步
    prompt1 = f"为'{主题}'写3点大纲："
    res1 = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt1}],
    )
    outline = res1.choices[0].message.content

    # 第二步：把第一步的输出作为输入
    prompt2 = f"把以下大纲总结为一句话摘要：\n{outline}"
    res2 = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt2}],
    )
    summary = res2.choices[0].message.content

    return {"outline": outline, "summary": summary}

result = 顺序执行("Python异步编程")
print(result["summary"])
```

> **差异分析**：LangChain 将步骤间的**变量传递**抽象成了 `output_key` → 自动注入。纯 Prompt 就是手动传参。步骤少时手动更清晰；步骤多了（5+），LangChain 的变量管理开始体现价值——不会因为某一步的变量名写错导致整条链断裂。
>
> **选型建议**：3步以内 🥇 **纯 Prompt**；5步以上 🥈 **LangChain** 开始有优势。

---

### 1.3 路由链：条件分发

**功能说明**：根据输入内容的不同，走不同的处理链。为什么会出现？一个客服系统需要区分"售前咨询"、"售后投诉"、"技术问题"——每个走不同的 Prompt 和处理逻辑。

#### LangChain 方式

```python
from langchain.chains.router import MultiPromptChain

# LangChain：声明式路由
prompt_infos = [
    {"name": "售前", "description": "适合产品咨询、价格询问",
     "prompt_template": "你是产品顾问。回答：{input}"},
    {"name": "售后", "description": "适合投诉、退换货",
     "prompt_template": "你是售后专员。处理：{input}"},
    {"name": "技术", "description": "适合技术故障排查",
     "prompt_template": "你是技术支持。诊断：{input}"},
]

router = MultiPromptChain.from_prompts(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    prompt_infos=prompt_infos,
)
result = router.invoke("我的订单三天没更新物流了")
# LLM 自动判断 → 路由到"售后"链
```

#### 纯 Prompt / 原生 API 方式

```python
from openai import OpenAI

client = OpenAI()

# 纯 Prompt：先分类，再分发
分类prompt = """判断以下用户消息的类型。只回复一个字：售前、售后、或技术。

消息：{message}
类型："""

处理模板 = {
    "售前": "你是产品顾问。回答：{msg}",
    "售后": "你是售后专员。处理：{msg}",
    "技术": "你是技术支持。诊断：{msg}",
}

def 路由处理(用户消息: str) -> str:
    # 第一步：分类
    res = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": 分类prompt.format(message=用户消息)}],
    )
    类型 = res.choices[0].message.content.strip()

    # 第二步：按分类走对应的 prompt
    对应prompt = 处理模板.get(类型, 处理模板["售前"])
    res = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": 对应prompt.format(msg=用户消息)}],
    )
    return res.choices[0].message.content

result = 路由处理("我的订单三天没更新物流了")
```

> **差异分析**：LangChain 的 Router 内部做的也是"分类→分发"两步，但它自动管理了 prompt 与链的对应关系。纯 Prompt 要手动维护一个 `dict` 映射。两者本质一样，但 LangChain 的优势在于——当路由目标链本身很复杂时（每条分支不是一句 prompt 而是一个完整的 RAG 链），**组合优势明显**。
>
> **选型建议**：分支逻辑简单 🥇 **纯 Prompt + if/else**；每条分支都是复杂链 🥈 **LangChain**。

---

### 1.4 并行执行：RunnableParallel

**功能说明**：同时执行多个独立的任务。为什么会出现？你让 LLM 同时分析代码的质量、安全性、性能——三个分析互不依赖，串行执行浪费总时间。

#### LangChain 方式

```python
from langchain_core.runnables import RunnableParallel

# LangChain：声明式并行
parallel_review = RunnableParallel(
    质量分析=质量链,
    安全分析=安全链,
    性能分析=性能链,
)
result = parallel_review.invoke({"code": "..."})
# 三个链自动并发执行，结果合并为一个 dict
```

#### 纯 Prompt / 原生 API 方式

```python
from openai import OpenAI
import asyncio

client = OpenAI()

async def 分析(代码: str, 维度: str) -> str:
    prompt = f"从{维度}角度分析以下代码：\n{代码}"
    res = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
    )
    return res.choices[0].message.content

async def 并行分析(代码: str) -> dict:
    # 三个分析并发执行（无先后依赖）
    质量, 安全, 性能 = await asyncio.gather(
        分析(代码, "代码质量"),
        分析(代码, "安全漏洞"),
        分析(代码, "运行性能"),
    )
    return {"质量分析": 质量, "安全分析": 安全, "性能分析": 性能}

# result = asyncio.run(并行分析("def foo(): pass"))
```

> **差异分析**：核心差异在**并发管理**。LangChain 的 `batch()` 自动处理并发池大小、错误隔离；纯 asyncio 需要你手动管理并发数、异常处理。当并行任务从 3 个变成 30 个时，LangChain 的价值开始出现。
>
> **选型建议**：3个以内 🥇 **纯 asyncio**；大批量并行 🥈 **LangChain batch**。

---

### 1.5 中间件：链级回调

**功能说明**：在链的每个关键节点插入自定义逻辑——日志、监控、Token计数、权限校验。为什么会出现？你需要知道 LLM 什么时候被调用了、花了多少 Token、中间步骤是什么——但不能在每个链里都写一遍 `print`。

#### LangChain 方式

```python
from langchain_core.callbacks import BaseCallbackHandler

class 监控中间件(BaseCallbackHandler):
    """LangChain 的回调 = 链级别的中间件"""

    def on_llm_start(self, serialized, prompts, **kwargs):
        print(f"[监控] LLM 开始调用 | 模型: {serialized.get('name', '?')}")

    def on_llm_end(self, response, **kwargs):
        usage = response.llm_output.get("token_usage", {})
        print(f"[监控] LLM 调用完毕 | 消耗: {usage.get('total_tokens')} tokens")

    def on_tool_start(self, serialized, input_str, **kwargs):
        print(f"[监控] 工具 {serialized.get('name')} 被调用")

# 挂载到链上
chain = prompt | ChatOpenAI(callbacks=[监控中间件()]) | parser
```

#### 纯 Prompt / 原生 API 方式

```python
from openai import OpenAI
import time
from functools import wraps

client = OpenAI()

# 纯 Prompt：手写装饰器 = 自己实现中间件
def 监控中间件(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"[监控] 开始调用 LLM")
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        # 原生 API 没有自动的 token_usage 注入
        # 需要解析 result 或提前用 tiktoken 估算
        估算tokens = len(args[0]) // 4 if args else 0
        print(f"[监控] 调用完毕 | 耗时: {elapsed:.1f}s | 估算tokens: {估算tokens}")
        return result
    return wrapper

@监控中间件
def 调用LLM(prompt: str) -> str:
    res = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
    )
    return res.choices[0].message.content
```

> **差异分析**：LangChain 的回调系统本质是一个**事件总线**。它在每个组件（LLM、Tool、Chain、Retriever）的内部埋了钩子。纯 Prompt 要实现同样的效果，要么在每个函数上加装饰器（分散），要么写一个全局的 wrapper（侵入性强）。LangChain 的中间件更**无侵入**——组件不知道自己在被监控。
>
> **选型建议**：简单场景 🥇 **装饰器**；需要全链路追踪（LLM调用+Tool调用+检索+Chain步骤）→ 🥈 **LangChain + LangSmith**。

---

## 二、记忆管理 Memory

### 2.1 全量记忆 BufferMemory

**功能说明**：记住对话的每一轮，下次调用时自动注入。为什么会出现？LLM API 是无状态的，每次调用都是独立事件。要让它记住"刚才说了什么"，你得手动把历史消息拼回去。

#### LangChain 方式

```python
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory(return_messages=True)
memory.save_context(
    {"input": "我叫沈小舟"},
    {"output": "你好沈小舟！"}
)
memory.save_context(
    {"input": "我是谁？"},
    {"output": "你是沈小舟！"}
)

# LangChain 自动管理消息列表
print(memory.load_memory_variables({}))
# {'history': [HumanMessage(...), AIMessage(...), HumanMessage(...), AIMessage(...)]}
```

#### 纯 Prompt / 原生 API 方式

```python
from openai import OpenAI

client = OpenAI()

# 纯 Prompt：手工维护消息列表
class 手工记忆:
    def __init__(self):
        self.消息列表 = []

    def 对话(self, 用户输入: str) -> str:
        # 1. 把用户消息加入列表
        self.消息列表.append({"role": "user", "content": 用户输入})

        # 2. 把完整历史发给 LLM
        res = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=self.消息列表,
        )

        # 3. 把 AI 回复也加入列表
        ai_reply = res.choices[0].message.content
        self.消息列表.append({"role": "assistant", "content": ai_reply})
        return ai_reply

记忆 = 手工记忆()
print(记忆.对话("我叫沈小舟"))
print(记忆.对话("我是谁？"))  # "你是沈小舟！"
```

> **差异分析**：**核心差异不是能不能做，而是能做什么。** LangChain 的 Memory 有内置的 `load_memory_variables` 钩子——Chain 在每次调用前自动拉取记忆、调用后自动保存。纯 Prompt 需要你**在每次调用时手动调用记忆的读写方法**。步骤少时没区别，但当链里有多个步骤、需要选择性注入记忆时，LangChain 的自动化开始有意义。
>
> **选型建议**：简单聊天应用 🥇 **纯 Prompt 手写**（5行代码，零依赖）；复杂多步流程需要精细记忆控制 🥈 **LangChain**。

---

### 2.2 摘要记忆 SummaryMemory

**功能说明**：对话太长时不是删旧消息，而是把旧对话压缩成摘要。为什么会出现？全量记忆的问题是——对话越长 Token 消耗越大。用一个便宜的模型把历史浓缩成摘要，把摘要而不是原文塞进上下文。

#### LangChain 方式

```python
from langchain.memory import ConversationSummaryMemory

memory = ConversationSummaryMemory(
    llm=ChatOpenAI(model="gpt-4o-mini"),  # 用便宜的模型做摘要
    max_token_limit=200,
    return_messages=True,
)
memory.save_context(
    {"input": "聊了半小时的订单问题..."},
    {"output": "订单问题的详细解答..."},
)
# 内部自动调用 LLM 生成摘要，存入 buffer
```

#### 纯 Prompt / 原生 API 方式

```python
from openai import OpenAI

client = OpenAI()

class 手工摘要记忆:
    def __init__(self):
        self.全量历史 = []
        self.摘要 = ""

    def 对话(self, 用户输入: str) -> str:
        # 1. 构造上下文 = 摘要 + 最近几轮
        messages = []
        if self.摘要:
            messages.append({"role": "system", "content": f"对话摘要：{self.摘要}"})
        messages += self.全量历史[-6:]  # 最近3轮
        messages.append({"role": "user", "content": 用户输入})

        res = client.chat.completions.create(model="gpt-4o-mini", messages=messages)
        ai_reply = res.choices[0].message.content

        # 2. 保存并判断是否需要重新摘要
        self.全量历史.append({"role": "user", "content": 用户输入})
        self.全量历史.append({"role": "assistant", "content": ai_reply})

        if len(self.全量历史) > 20:  # 超过10轮触发摘要
            self._生成摘要()

        return ai_reply

    def _生成摘要(self):
        旧对话 = "\n".join(
            f"{m['role']}: {m['content'][:100]}" for m in self.全量历史[:-6]
        )
        res = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{
                "role": "user",
                "content": f"把以下对话浓缩为100字摘要：\n{旧对话}"
            }],
        )
        self.摘要 = res.choices[0].message.content
        self.全量历史 = self.全量历史[-6:]  # 只保留最近3轮

# LangChain做了但你需要手动做的：
# 1. 用单独的 LLM 调用来生成摘要
# 2. 在"摘要"和"最近几轮"之间做平衡
# 3. 决定什么时候触发摘要（Token数 / 消息条数 / 时间）
```

> **差异分析**：LangChain 的 SummaryMemory 本质 = 自动触发的摘要LLM调用 + 摘要与最近历史的拼接策略。纯 Prompt 实现并不难——**但触发时机和摘要长度的调优是脏活**。LangChain 帮你处理了这些脏活。
>
> **选型建议**：偶尔需要摘要 🥇 **手写**（省依赖）；项目核心依赖记忆管理 🥈 **LangChain**（省脏活）。

---

### 2.3 窗口记忆 WindowMemory

**功能说明**：只记住最近 N 轮对话。为什么会出现？BufferMemory 的 Token 成本不可控——聊到第 50 轮每句话都带着之前 49 轮。WindowMemory 强制只记最近 K 轮，Token 消耗恒定。

#### LangChain 方式

```python
from langchain.memory import ConversationBufferWindowMemory

memory = ConversationBufferWindowMemory(k=3, return_messages=True)
# 只记最近3轮，其余自动丢弃
```

#### 纯 Prompt / 原生 API 方式

```python
class 窗口记忆:
    def __init__(self, k=3):
        self.k = k
        self.消息列表 = []

    def 对话(self, 用户输入):
        self.消息列表.append({"role": "user", "content": 用户输入})

        res = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=self.消息列表[-(self.k * 2):],  # k轮 = 2k条消息
        )

        self.消息列表.append({"role": "assistant", "content": res.choices[0].message.content})
        # 自动保留最近 k×2 条（k个来回）
        if len(self.消息列表) > self.k * 4:
            self.消息列表 = self.消息列表[-(self.k * 2):]
        return res.choices[0].message.content
```

> **差异分析**：**一行切片的事**。这是 LangChain 和纯 Prompt 差距最小的功能。WindowMemory 就是 `list[-k*2:]`。
>
> **选型建议**：🥇 **纯 Prompt 手写**。引入 LangChain 只为了做切片是杀鸡用牛刀。

---

## 三、检索增强 RAG

### 3.1 文档加载 Document Loader

**功能说明**：从各种数据源加载文档。为什么会出现？实际项目的数据来源五花八门——PDF、网页、CSV、数据库、Notion……每种都有自己的读取库，LangChain 统一了接口。

#### LangChain 方式

```python
from langchain_community.document_loaders import TextLoader, PyPDFLoader, WebBaseLoader

# LangChain：统一接口
text_docs = TextLoader("文档.txt").load()
pdf_docs = PyPDFLoader("报告.pdf").load()
web_docs = WebBaseLoader("https://example.com").load()
# 所有 loader 返回统一的 Document 对象（page_content + metadata）
```

#### 纯 Prompt / 原生 API 方式

```python
# 纯 Python：各自读各自的，然后手动标准化

# TXT
with open("文档.txt", "r", encoding="utf-8") as f:
    text_content = f.read()
text_doc = {"content": text_content, "metadata": {"source": "文档.txt"}}

# PDF
import pypdf
reader = pypdf.PdfReader("报告.pdf")
pdf_content = "\n".join(page.extract_text() for page in reader.pages)
pdf_doc = {"content": pdf_content, "metadata": {"source": "报告.pdf", "pages": len(reader.pages)}}

# Web
import requests
from bs4 import BeautifulSoup
html = requests.get("https://example.com").text
web_content = BeautifulSoup(html, "html.parser").get_text()
web_doc = {"content": web_content, "metadata": {"source": "https://example.com"}}
```

> **差异分析**：LangChain 在这个场景的价值是**接口统一 + 元数据管理**。纯 Python 每种格式都要写不同的代码，且元数据（来源、页码、标题）靠你自己记。当文档源超过三种时，Loader 的统一 `Document(page_content, metadata)` 格式开始省钱。
>
> **选型建议**：1-2种文档源 🥇 **原生库**；3种以上 🥈 **LangChain Loader**（统一接口省心智负担）。

---

### 3.2 文本分割 Text Splitter

**功能说明**：把长文档切成小段（chunk）。为什么会出现？Embedding 模型有最大输入长度限制，且长段落的 Embedding 语义会被稀释。

#### LangChain 方式

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\n\n", "\n", "。", ".", " "],
)
chunks = splitter.split_documents(docs)
```

#### 纯 Prompt / 原生 API 方式

```python
def 递归分割(文本: str, chunk_size=500, overlap=50) -> list[str]:
    """LangChain RecursiveCharacterTextSplitter 的核心逻辑"""
    if len(文本) <= chunk_size:
        return [文本] if 文本.strip() else []

    chunks = []
    start = 0
    while start < len(文本):
        end = start + chunk_size
        chunk = 文本[start:end]

        # 尝试在分隔符处截断（保持语义完整）
        if end < len(文本):
            # 从后往前找最近的分隔符
            for sep in ["\n\n", "\n", "。", ".", " "]:
                last_sep = chunk.rfind(sep)
                if last_sep > chunk_size * 0.5:  # 分隔符不要太靠前
                    end = start + last_sep + len(sep)
                    chunk = 文本[start:end]
                    break

        chunks.append(chunk.strip())
        start = end - overlap  # 重叠区域保持上下文

    return chunks
```

> **差异分析**：LangChain 的 TextSplitter 就是**一个更健壮的分割函数**。边界情况（空文本、超长句子、特殊字符）LangChain 都已经处理好了。你手写的版本在多数情况下够用，但当文本包含代码块、表格、多语言混合时，LangChain 的鲁棒性体现出来。
>
> **选型建议**：纯中文/英文文本 🥇 **手写分割**；代码+表格+多语言混合 🥈 **LangChain**。

---

### 3.3 向量存储 + 检索

**功能说明**：把文本 Embedding → 存入向量库 → 按语义相似度检索。为什么会出现？传统关键词搜索无法理解"提升轻功"和"身法训练"是一个意思。

#### LangChain 方式

```python
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(docs, embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

results = retriever.invoke("如何提升Python性能？")
```

#### 纯 Prompt / 原生 API 方式

```python
import chromadb
from openai import OpenAI

client = OpenAI()
chroma_client = chromadb.PersistentClient(path="./向量库")

# 1. 手动 Embedding
def 嵌入(文本: str) -> list[float]:
    res = client.embeddings.create(
        model="text-embedding-3-small",
        input=文本,
    )
    return res.data[0].embedding

# 2. 手动创建 collection + 插入
collection = chroma_client.get_or_create_collection("我的文档")
for i, doc in enumerate(docs):
    collection.add(
        ids=[f"doc_{i}"],
        embeddings=[嵌入(doc.page_content)],
        documents=[doc.page_content],
        metadatas=[doc.metadata],
    )

# 3. 手动检索
def 检索(query: str, k=4):
    query_embedding = 嵌入(query)
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=k,
    )
    return results["documents"][0]

results = 检索("如何提升Python性能？")
```

> **差异分析**：LangChain 把 Chroma/FAISS/Pinecone 等几十种向量库的 API 统一了。纯 Prompt 的方式直接调原生 chromadb——代码多一点，但完全可控。LangChain 的优势在这个场景是**切换成本**——你今天用 Chroma，明天想换 FAISS，LangChain 用**换一行代码**；原生切换需要重写所有插入+检索逻辑。
>
> **选型建议**：确定好向量库不换了 🥇 **原生库**（更可控）；可能会换、或用多种向量库 🥈 **LangChain**（统一接口）。

---

### 3.4 完整 RAG 管线

**功能说明**：把文档加载→分割→Embedding→存储→检索→Prompt注入→LLM生成 串起来。

#### LangChain 方式

```python
from langchain_core.runnables import RunnablePassthrough

# LangChain：8行代码，声明式管道
rag_chain = (
    {
        "context": retriever | (lambda docs: "\n\n".join(
            d.page_content for d in docs
        )),
        "question": RunnablePassthrough(),
    }
    | ChatPromptTemplate.from_template("基于以下文档回答：\n{context}\n\n问题：{question}")
    | ChatOpenAI(model="gpt-4o")
    | StrOutputParser()
)

answer = rag_chain.invoke("Python 的 GIL 是什么？")
```

#### 纯 Prompt / 原生 API 方式

```python
from openai import OpenAI

client = OpenAI()

def 完整RAG(query: str) -> str:
    # 1. 检索
    query_embedding = client.embeddings.create(
        model="text-embedding-3-small", input=query
    ).data[0].embedding

    results = collection.query(
        query_embeddings=[query_embedding], n_results=4
    )

    # 2. 拼接上下文
    上下文 = "\n\n".join(results["documents"][0])

    # 3. 构造 Prompt + 调用 LLM
    prompt = f"""基于以下文档回答用户问题。如果文档中没有相关信息，说"文档中未找到相关信息"。

文档：
{上下文}

用户问题：{query}

回答："""

    res = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
    )
    return res.choices[0].message.content

answer = 完整RAG("Python 的 GIL 是什么？")
```

> **差异分析**：这是 LangChain 和纯 Prompt **差距最大的场景**。LangChain 的 LCEL 可以把整个 RAG 管线变成声明式——检索→格式化→注入→生成，一气呵成。纯 Prompt 则需要一个步骤一个步骤手动串。但代价是——LangChain 管线的中间状态不透明，出问题时你得在每个 `|` 节点打断点。
>
> **选型建议**：RAG 是你的核心业务 🥈 **LangChain LCEL**（开发效率高、可维护性强）；RAG 只是一个周边功能 🥇 **纯 Prompt**（简单可控、无框架依赖）。

---

## 四、智能体 Agent

### 4.1 工具定义 Tool

**功能说明**：把 Python 函数包装成 LLM 可以调用的"工具"。为什么会出现？LLM 只能生成文本，不能直接查数据库、调 API、执行代码——你需要定义"工具"让 LLM 在需要时自动调用。

#### LangChain 方式

```python
from langchain_core.tools import tool
from pydantic import BaseModel, Field

@tool
def 查天气(城市: str) -> str:
    """查询指定城市的天气，返回温度和天气状况。"""
    return f"{城市}：晴，25°C"

# LangChain 自动：
# 1. 从 docstring 生成 tool description
# 2. 从类型注解生成 JSON Schema
# 3. 注入到 LLM 的 tools 参数
```

#### 纯 Prompt / 原生 API 方式

```python
from openai import OpenAI
import json

client = OpenAI()

# 纯 Prompt：手写 JSON Schema
tools_schema = [{
    "type": "function",
    "function": {
        "name": "查天气",
        "description": "查询指定城市的天气，返回温度和天气状况。",
        "parameters": {
            "type": "object",
            "properties": {
                "城市": {
                    "type": "string",
                    "description": "城市名称，如'北京'、'上海'",
                }
            },
            "required": ["城市"],
        }
    }
}]

def 查天气实现(城市: str) -> str:
    return f"{城市}：晴，25°C"

# 调用 LLM 时传入 tools_schema
res = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "北京今天天气怎样？"}],
    tools=tools_schema,
)

# 手动解析 tool_calls
if res.choices[0].message.tool_calls:
    tc = res.choices[0].message.tool_calls[0]
    if tc.function.name == "查天气":
        args = json.loads(tc.function.arguments)
        result = 查天气实现(**args)
```

> **差异分析**：LangChain 的 `@tool` 装饰器做的事 = 类型注解 → JSON Schema + docstring → description。**核心价值是把"写 JSON Schema"变成了"写 Python 函数"**。Schema 维护是件很痛苦的事——参数一改两个地方要同步。LangChain 让你只维护 Python 函数，Schema 由它自动生成。
>
> **选型建议**：1-2个工具 🥇 **手写 JSON Schema**（看得到底层、可控）；工具数量多或频繁变更 🥈 **@tool 装饰器**（省心智负担）。

---

### 4.2 Agent 执行器

**功能说明**：LLM 自主判断用哪些工具、以什么顺序、什么时候停。为什么会出现？固定流程的 Chain 无法应对开放性问题——"帮我查一下订单SF123的状态，如果没发货就取消，然后推荐一个替代商品"——这不是一条链能解决的。

#### LangChain 方式

```python
from langgraph.prebuilt import create_react_agent

agent = create_react_agent(
    ChatOpenAI(model="gpt-4o"),
    tools=[查订单, 取消订单, 推荐商品],
    state_modifier="你是一个电商客服Agent。"
)

result = agent.invoke({
    "messages": [{"role": "user", "content": "SF123发货了吗？没发就不要了，推荐个替代品"}]
})
```

#### 纯 Prompt / 原生 API 方式

```python
from openai import OpenAI
import json

client = OpenAI()

# 纯 Prompt：手写 ReAct 循环
def 手写Agent(用户消息: str, tools: list, 最大步数=10) -> str:
    messages = [{"role": "user", "content": 用户消息}]

    for 步 in range(最大步数):
        res = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            tools=tools,  # 传入工具的 JSON Schema
        )

        msg = res.choices[0].message

        # 没有 tool_calls → 结束了，返回最终答案
        if not msg.tool_calls:
            return msg.content

        # 有 tool_calls → 执行工具 → 把结果追加回 messages
        messages.append(msg)  # 把 assistant 的 tool_call 消息加入
        for tc in msg.tool_calls:
            func_name = tc.function.name
            func_args = json.loads(tc.function.arguments)

            # 执行对应的工具函数
            if func_name == "查订单":
                结果 = 查订单(**func_args)
            elif func_name == "取消订单":
                结果 = 取消订单(**func_args)
            elif func_name == "推荐商品":
                结果 = 推荐商品(**func_args)
            else:
                结果 = f"未知工具：{func_name}"

            # 把工具执行结果以 tool 角色加入消息列表
            messages.append({
                "role": "tool",
                "tool_call_id": tc.id,
                "content": 结果,
            })

    return "Agent 超过最大步数限制，未能完成任务"

# 核心循环不过 20 行代码
# 但如果要加入错误处理、重试、超时、人工审批……
# 代码量会迅速膨胀
```

> **差异分析**：Agent 循环的**核心逻辑很简单**——就是调用 LLM、看它要不要调工具、执行工具、把结果喂回去。手写只要 20 行。但 LangChain/LangGraph 额外提供的是：**checkpoint（断点续传）、interrupt（人工审批）、错误重试、流式输出、并行工具调用**——这些都是工程上"有了更好、没有也能跑"的增强。
>
> **选型建议**：原型验证 🥇 **手写 Agent 循环**（20行，零依赖，理清本质）；生产级 Agent 系统 🥈 **LangGraph**（checkpoint、interrupt、流式都是刚需）。

---

### 4.3 结构化输出

**功能说明**：让 LLM 返回 JSON 而不是自由文本。为什么会出现？你需要把 LLM 的输出接进下一个系统——它必须是一个确定的数据结构。

#### LangChain 方式

```python
from langchain_core.output_parsers import PydanticOutputParser
from pydantic import BaseModel

class 订单信息(BaseModel):
    订单号: str
    状态: str
    金额: float

parser = PydanticOutputParser(pydantic_object=订单信息)

chain = (
    ChatPromptTemplate.from_messages([
        ("system", "返回JSON。\n{format_instructions}"),
        ("human", "{input}"),
    ])
    | ChatOpenAI(model="gpt-4o-mini", temperature=0)
    | parser  # 自动解析JSON → Pydantic对象
)

result: 订单信息 = chain.invoke({
    "input": "订单号SF123，已发货，金额299.9",
    "format_instructions": parser.get_format_instructions(),
})
print(result.订单号)  # IDE 有自动补全！
```

#### 纯 Prompt / 原生 API 方式

```python
from openai import OpenAI
import json

client = OpenAI()

# 纯 Prompt：两种方案

# 方案A：在 Prompt 中硬写 JSON Schema
def 提取订单_纯Prompt(文本: str) -> dict:
    prompt = f"""从以下文本提取订单信息。只返回JSON，不要任何其他文字。

JSON格式：{{"订单号": "string", "状态": "string", "金额": float}}

文本：{文本}
JSON："""

    res = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
    )

    # 手动解析 JSON（需要自己处理 LLM 的格式错误）
    raw = res.choices[0].message.content
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        # LLM 偶尔会在 JSON 前后加文字，需要手动清洗
        import re
        match = re.search(r'\{.*\}', raw, re.DOTALL)
        if match:
            return json.loads(match.group())
        raise

# 方案B：用 OpenAI 的 response_format（最省事的纯API方案）
def 提取订单_jsonMode(文本: str) -> dict:
    res = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": f"提取订单信息：{文本}"}],
        response_format={"type": "json_object"},  # 强制 JSON 输出
        temperature=0,
    )
    return json.loads(res.choices[0].message.content)
```

> **差异分析**：LangChain 的 PydanticOutputParser 提供了**类型安全 + 自动重试 + IDE 补全**。纯 Prompt 方案 B（OpenAI 原生 JSON Mode）也能保证返回 JSON，但没有类型校验。当 LLM 返回了符合 JSON 但不符合你预期的结构（少一个字段、多一个字段、类型不对），LangChain 会用 Pydantic 自动校验并自动重试——原生方案需要你自己写这些。
>
> **选型建议**：简单 JSON 提取 🥇 **OpenAI JSON Mode**（原生、零依赖）；复杂数据结构+需要类型安全 🥈 **PydanticOutputParser**（校验+重试+类型补全）。

---

## 五、总结：决策框架

### 一张图判断：你什么时候该用 LangChain

```
你的项目
  │
  ├─ 只有一个简单的 LLM 调用？          → 🥇 纯 Prompt / 原生 API
  ├─ 需要多步链式调用（3步以内）？       → 🥇 纯 Prompt + 函数封装
  ├─ 需要多步链式调用（5步以上）？       → 🥈 LangChain LCEL
  ├─ 需要 RAG，但文档类型单一？          → 🥇 原生库 + 手写管线
  ├─ RAG 是你的核心业务？                → 🥈 LangChain LCEL
  ├─ 需要 Agent（但只是原型）？          → 🥇 手写 ReAct 循环
  ├─ Agent 要上生产（需要中断/重试/追踪）？ → 🥈 LangGraph
  ├─ 需要频繁切换模型/向量库？            → 🥈 LangChain（统一接口）
  ├─ 团队里不止你一个人维护？            → 🥈 LangChain（标准化）
  └─ 就想理解底层原理？                  → 🥇 先用纯 Prompt 手写一遍
```

### 核心原则

| 原则 | 解释 |
|---|---|
| **复杂度阈值** | LangChain 的抽象成本是恒定的（学习曲线+依赖管理），但它省的样板代码量随项目复杂度线性增长。**当项目复杂度超过阈值，LangChain 是净收益；低于阈值，是净负担。** |
| **可替换性** | 不要让你的业务逻辑和框架绑定。好的实践是：**核心业务逻辑用纯 Python 写，只在编排层用 LangChain**。 |
| **先手写再框架** | 如果你没手写过 ReAct 循环就直接用 LangGraph——出了 Bug 你根本不知道是框架的问题还是 LLM 的问题。**先用纯 Prompt 实现一遍，再用框架重构，是理解框架的唯一捷径。** |

### 常见误区

```
❌ 误区一："用了 LangChain = 工程化了"
   → 工程化靠的是测试、监控、降级、文档——框架只是工具。

❌ 误区二："LangChain 封装了牛X功能 = 用了就能做好 RAG"
   → LangChain 只是把管道搭好了。Chunk Size、检索策略、
      Prompt设计——这些决定 RAG 质量的东西，框架帮不了你。

❌ 误区三："不用 LangChain = 重复造轮子"
   → 20行代码叫轮子，5行代码叫基本功。
     不是每个功能都需要被"框架化"。

✅ 正确心态："LangChain 是一个工具箱。你不需要用所有的工具，
   但知道每个工具在什么场景下比手写强，才是真正的专家。"
```

---

> **文档撰于**：2026-06-03
>
> **核心观点**：**LangChain 没有魔法。它做的每一件事，都是用 Prompt + 原生 API 能实现的。** 它的价值不在于"能做别人做不到的事"——而在于"把大家每次都要重写一遍的样板代码，变成了可复用的、有文档的、经过测试的组件。"
>
> *知道 LangChain 底层做了什么，比会用 LangChain 更重要。*

---

*完*
