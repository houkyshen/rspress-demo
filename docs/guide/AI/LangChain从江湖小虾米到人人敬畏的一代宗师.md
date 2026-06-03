# LangChain：从江湖小虾米到人人敬畏的一代宗师

> 此乃 LangChain 武林之无上秘籍。凡修习者，须先通 Python 基础，备 OpenAI API Key 一枚，方可入此门中。秘籍中每一招、每一式皆配有可运转之代码心法，勤加练习，终成大器。

---

## 目录

- [卷一：江湖引论 —— LangChain 为何物](#卷一江湖引论--langchain-为何物)
- [卷二：初入江湖 —— 第一招](#卷二初入江湖--第一招)
- [卷三：内功心法 —— 模型](#卷三内功心法--模型)
- [卷四：口诀真言 —— 提示词](#卷四口诀真言--提示词)
- [卷五：功法招式 —— 链](#卷五功法招式--链)
- [卷六：绝世心法 —— LCEL](#卷六绝世心法--lcel)
- [卷七：回光之术 —— 记忆](#卷七回光之术--记忆)
- [卷八：天眼通 —— 检索 RAG](#卷八天眼通--检索-rag)
- [卷九：神兵利器 —— 工具](#卷九神兵利器--工具)
- [卷十：武林高手 —— 智能体 Agent](#卷十武林高手--智能体-agent)
- [卷十一：上乘功法 —— 高级主题](#卷十一上乘功法--高级主题)
- [卷十二：阵法奥义 —— LangGraph](#卷十二阵法奥义--langgraph)
- [附录：江湖救急](#附录江湖救急)

---

## 卷一：江湖引论 —— LangChain 为何物

### 1.1 天下大势 —— LLM 江湖的困局

话说天下武功，皆出少林。然 AI 江湖自 GPT 横空出世以来，天下震动。

诸君皆知，这 LLM（大语言模型）如 **一位身怀绝世内力却手足不能动弹的高手**——他上知天文、下晓地理，四书五经倒背如流，你若问他"李白是谁"，他便口若悬河；但你若说"帮我把这个 PDF 里的合同条款都查一遍，发邮件给张三"——他便只能干瞪眼。

**内力虽深，却无招可使。** 此乃初代 LLM 的致命伤。

### 1.2 秘籍出世 —— LangChain 诞生

LangChain 便是为此而生的**武功体系**。它不教你如何修炼内力（那是 OpenAI、Anthropic 的事），而是教你**如何用招式引导内力、用阵法调度高手、用神兵辅助出招**。

```
LLM 本身 = 内力深厚但四肢瘫痪的绝世高手
LangChain = 一套完整的武功体系，包含：
  ├── 心法（Prompt）：如何对高手下达精准指令
  ├── 招式（Chain）：如何将多个动作串联成连招
  ├── 神兵（Tool）：赋予高手外部的武器和工具
  ├── 阵法（Agent）：让高手自主判断、选择招式
  ├── 天眼通（RAG）：让高手能查阅藏经阁中的典籍
  └── 内视术（Callbacks）：洞悉高手出招的每一细节
```

### 1.3 江湖格局 —— LangChain 生态全景

初代 LangChain 如同少林七十二绝技，包罗万象却杂乱无章。然江湖代有才人出，如今的 LangChain 已分门别派：

| 门派 | 对应包名 | 职责 |
|---|---|---|
| **少林心法堂** | `langchain-core` | 核心抽象：BaseLLM、Runnable、消息协议 |
| **武当剑谱** | `langchain` | 经典 Chains 与 Agent（旧派招式，渐被取代） |
| **丐帮总舵** | `langchain-community` | 天下英雄贡献的第三方集成 |
| **峨眉分舵** | `langchain-openai` | OpenAI 专属功法 |
| **昆仑分舵** | `langchain-anthropic` | Anthropic Claude 专属功法 |
| **阵法堂** | LangGraph | 有状态、多高手的复杂阵法 |
| **监察司** | LangSmith | 调试、追踪、监控（云端平台） |
| **传功殿** | LangServe | 将链部署为 REST API 供外人调用 |

> **江湖告示**：自 2024 年起，LangChain 总舵主宣布 **LCEL（LangChain 表达式语言）** 为武林正宗。旧派功法（LLMChain、SequentialChain）虽未废除，但新入门的弟子应直修 LCEL。本秘籍前五卷以旧法引你入門，第六卷起尽展 LCEL 无上心法。

### 1.4 筑基 —— 安装与入門

凡修习上乘武功，先要打好根基。LangChain 非一门功夫，而是一**套功法体系**，按需而取，不可贪多。

#### 法门一：pip 正统之法

```bash
# 根基功法 —— 必学
pip install langchain langchain-core langchain-community

# 内功心法 —— 择其一二
pip install langchain-openai      # OpenAI 一脉
pip install langchain-anthropic   # Claude 一脉

# 天眼通相关 —— 按需修习
pip install chromadb              # 轻量藏经阁
pip install tiktoken              # 内力计量之术
pip install langchain-text-splitters  # 分筋错骨手（文本分割）

# 阵法堂 —— 上乘功法
pip install langsmith             # 监察之眼
pip install langgraph             # 阵法之道
```

#### 法门二：uv 新派之法（推荐）

```bash
# 开辟洞府
uv init my-langchain-dojo
cd my-langchain-dojo

# 添置功法
uv add langchain langchain-core langchain-openai
uv add chromadb tiktoken langchain-text-splitters

# 开启护山大阵（虚拟环境）
# Windows: .venv\Scripts\activate
# Mac/Linux: source .venv/bin/activate
```

#### 验功

```python
# 检测根基是否稳固
import langchain
print(f"LangChain 版本: {langchain.__version__}")

from langchain_openai import ChatOpenAI
# 此乃灌注内力之法 —— 调用 LLM
llm = ChatOpenAI(model="gpt-4o-mini")
response = llm.invoke("用一句话介绍你自己")
print(response.content)
```

---

## 卷二：初入江湖 —— 第一招

### 2.1 运转周天 —— 环境变量

在洞府根目录立一 `.env` 令牌：

```bash
# .env —— 你的通行令牌
OPENAI_API_KEY=sk-your-key-here
DASHSCOPE_API_KEY=your-dashscope-key  # 若修习通义千问
ANTHROPIC_API_KEY=sk-ant-your-key     # 若修习 Claude
```

```python
# 祭起令牌
from dotenv import load_dotenv
load_dotenv()
```

### 2.2 第一丝内力 —— 调用 LLM

此为武道之始。你向高手发问，高手以内力作答。

```python
from langchain_openai import ChatOpenAI

# 召唤高手
llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.7,        # 创造性：0=一招一式精准无比，1=招随意动天马行空
    max_tokens=500,         # 内力输出上限
)

# 凝气成音 —— 发问
response = llm.invoke("什么是 LangChain？用一句话回答。")
print(response.content)

# 真气流转 —— 流式输出
for chunk in llm.stream("用三句话介绍 Python"):
    print(chunk.content, end="", flush=True)
```

### 2.3 第一句口诀 —— Prompt Template

高手虽强，但需要**精准的口诀引导**。随口一问不过尔尔，有模板的提问方为真章。

```python
from langchain_core.prompts import ChatPromptTemplate

# 铸一口诀模板
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是{role}，以{style}的风格作答。"),
    ("human", "{question}")
])

# 灌注意念 —— 填充模板
formatted = prompt.invoke({
    "role": "Python 绝顶高手",
    "style": "深入浅出、如话家常",
    "question": "什么是装饰器？"
})

print(formatted.to_messages())
# [
#   SystemMessage(content="你是Python 绝顶高手，以深入浅出、如话家常的风格作答。"),
#   HumanMessage(content="什么是装饰器？")
# ]
```

### 2.4 第一式连招 —— LCEL 链

口诀（Prompt）配上内力（LLM），再用化功之法（Parser）收束，是为**一气呵成之连招**。

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# 聚气 —— 各就各位
llm = ChatOpenAI(model="gpt-4o-mini")
prompt = ChatPromptTemplate.from_template("给我讲一个关于{topic}的冷笑话")
output_parser = StrOutputParser()

# 连招！| 便是那内力的流转之道
chain = prompt | llm | output_parser

# 出招！
result = chain.invoke({"topic": "程序员"})
print(result)
# 输出：为什么程序员总是搞混圣诞节和万圣节？
#       因为 Oct 31 == Dec 25
```

**此招内力的流转**：`用户意念 → 口诀模板 → 高手体内运转 → 化功收束 → 输出`

### 2.5 第一场对弈 —— Agent 初体验

链是按谱出招，而 Agent 则如同**一位真正的武林高手**——他能自主判断该用哪般兵器、如何出招。

```python
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langgraph.prebuilt import create_react_agent

# 赐予高手的神兵
@tool
def 乘法(a: float, b: float) -> float:
    """计算两个数的乘积 —— 此乃算学秘术"""
    return a * b

@tool
def 加法(a: float, b: float) -> float:
    """计算两个数的和 —— 此乃算学基础"""
    return a + b

# 高手入阵
llm = ChatOpenAI(model="gpt-4o")
agent = create_react_agent(llm, tools=[乘法, 加法])

# 请高手出招
response = agent.invoke({
    "messages": [{"role": "user", "content": "计算 (3+5) × 7 的结果"}]
})

# 观其心路 —— 高手的每一步决断
for msg in response["messages"]:
    print(f"[{msg.type}]: {msg.content}")
```

> 你将亲见高手如何**思、断、行**：先悟出需用"加法"→ 祭出加法神兵 → 得 8 → 再悟需用"乘法"→ 祭出乘法神兵 → 得 56 → 回禀用户。**此即 Agent 之本色！**

---

## 卷三：内功心法 —— 模型

### 3.1 两脉内功 —— LLM vs Chat Model

LangChain 江湖中，内力分两脉：

| 特性 | 旧脉：LLM（BaseLLM） | 正脉：Chat Model（BaseChatModel） |
|---|---|---|
| **纳气法门** | 纯文本入 | 消息序列入（System/Human/AI/Tool） |
| **吐纳之法** | 纯文本出 | ChatMessage 物件出 |
| **代表门派** | GPT-3 Completion API、Llama | GPT-4、Claude、通义千问 |
| **江湖地位** | ⚠️ 昔年旧法，今不传 | ✅ 武林正宗，新弟子必修 |

```python
# ❌ 旧脉心法（不推荐）
from langchain_openai import OpenAI
llm = OpenAI(model="gpt-3.5-turbo-instruct")
result = llm.invoke("Hello")         # 出：<class 'str'>

# ✅ 正脉心法（推荐）
from langchain_openai import ChatOpenAI
chat = ChatOpenAI(model="gpt-4o-mini")
result = chat.invoke("Hello")        # 出：AIMessage 物件
print(type(result))                  # <class 'langchain_core.messages.AIMessage'>
print(result.content)                # "Hello! How can I help you today?"
```

### 3.2 消息 —— 武学交流的四种形式

高手对话，非止于一言一语。LangChain 定义了四类消息，如武术切磋之四种形态：

```python
from langchain_core.messages import (
    SystemMessage,   # 定场诗 —— 设定高手行为与角色
    HumanMessage,    # 挑战书 —— 用户的意志
    AIMessage,       # 高手回应 —— AI 的招式
    ToolMessage,     # 神兵反哺 —— 工具执行的反馈
)

messages = [
    SystemMessage(content="你是一位铁面无私的代码审查御史，只看质量与安全。"),
    HumanMessage(content="审视此段代码：\ndef divide(a,b):\n    return a/b"),
]

llm = ChatOpenAI(model="gpt-4o")
response = llm.invoke(messages)

print(response.content)
# 当指出：1. 缺乏类型真言  2. 未防 b=0 之漏洞  3. 缺少功法注释
```

### 3.3 诸子百家 —— Provider 集成

LangChain 的妙处在于**万法归一**。无论你修的是少林（OpenAI）、武当（Anthropic）、还是昆仑（通义千问），**运劲法门完全一致**。

#### 少林 —— OpenAI

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="gpt-4o",
    temperature=0.7,
    max_tokens=4096,
    api_key="...",           # 或凭环境令牌 OPENAI_API_KEY
    organization="org-...",  # 可有可无：师门编号
)
```

#### 武当 —— Anthropic Claude

```python
# 先备功法：pip install langchain-anthropic
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(
    model="claude-sonnet-4-6-20250514",
    temperature=0.3,
    max_tokens=4096,
)
```

#### 昆仑 —— 通义千问

```python
# 先备功法：pip install langchain-community
from langchain_community.chat_models import ChatTongyi

llm = ChatTongyi(
    model="qwen-plus",
    temperature=0.5,
    api_key="...",  # 或凭环境令牌 DASHSCOPE_API_KEY
)
```

#### 本地宗师 —— Ollama

```python
# 先于本机立 Ollama 道场：https://ollama.com
# 再备功法：pip install langchain-ollama
from langchain_ollama import ChatOllama

llm = ChatOllama(model="llama3.2", temperature=0)
```

#### 万法归一

```python
# 各派心法调息之法虽异，然运劲法门如一
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

def 向宗师请教(llm, question):
    """任凭来者何派，invoke/stream/batch 皆可运用自如"""
    response = llm.invoke(question)
    return response.content

print(向宗师请教(ChatOpenAI(model="gpt-4o-mini"), "1+1=?"))
print(向宗师请教(ChatAnthropic(model="claude-haiku-4-5"), "1+1=?"))
```

**此即 LangChain 最大的价值——一法通，万法通。**

### 3.4 运劲法门 —— 模型参数精解

一口宝剑，可轻可重；内力输出，亦有诸般变化：

```python
llm = ChatOpenAI(
    model="gpt-4o",
    temperature=0.7,        # 创意火候：0=一板一眼，0.5=收放自如，1=天马行空
    top_p=0.9,              # 核采样：只取累积概率至 0.9 的词库
    max_tokens=2048,        # 真气输出上限（防内伤耗尽）
    frequency_penalty=0,    # 防絮叨之术：正值减重复
    presence_penalty=0,     # 开新题之术：正值鼓励言及新物
    seed=42,                # 定数之种：固定后每出招皆同（可复现）
    timeout=30,             # 等候时限（秒）
    max_retries=3,          # 失手重试数
)
```

**temperature 与 top_p 运用心经：**

| 江湖场景 | temperature | top_p | 心法口诀 |
|---|---|---|---|
| 书写代码 | 0 ~ 0.2 | 0.9 | 招招精准，毫厘勿差 |
| 考据事实 | 0 ~ 0.3 | 0.9 | 有一说一，切莫杜撰 |
| 日常唠嗑 | 0.5 ~ 0.7 | 0.9 | 亦庄亦谐，收放自如 |
| 诗词歌赋 | 0.8 ~ 1.0 | 0.95 | 飞流直下，汪洋恣肆 |
| 脑力激荡 | 1.0 ~ 1.5 | 0.95 | 奇思妙想，无所不可 |

### 3.5 真气流转 —— Streaming 流式输出

大宗师说话不是一个字一个字跳的。然 LLM 不然——**让用户看到你一字一字地写，方显武道正宗**。

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini", streaming=True)

# 同步流：如行云流水
for chunk in llm.stream("写一首关于代码的五言绝句"):
    print(chunk.content, end="", flush=True)

# 异步流：如凌波微步
import asyncio

async def async_stream():
    async for chunk in llm.astream("介绍一下 Rust"):
        print(chunk.content, end="", flush=True)

# asyncio.run(async_stream())
```

### 3.6 内功计量 —— Token 计数

若不计量内功消耗，一招出手便倾家荡产。Token 即那**内力的最小单位**。

```python
from langchain_openai import ChatOpenAI
# 须先备 tiktoken 功法

llm = ChatOpenAI(model="gpt-4o")

# 出招前预先估算消耗
messages = [
    ("system", "你是铁面无私的代码御史。"),
    ("human", "Python 的 GIL 究竟是何物？")
]

token_count = llm.get_num_tokens_from_messages(messages)
print(f"此招约耗 {token_count} 点真气")

# 出招后精确计量
from langchain_core.callbacks import BaseCallbackHandler

class 真气计量官(BaseCallbackHandler):
    """凡出招，必录其消耗"""

    def __init__(self):
        self.总真气 = 0
        self.入招真气 = 0
        self.出招真气 = 0

    def on_llm_end(self, response, **kwargs):
        usage = response.llm_output.get("token_usage", {})
        self.入招真气 += usage.get("prompt_tokens", 0)
        self.出招真气 += usage.get("completion_tokens", 0)
        self.总真气 += usage.get("total_tokens", 0)

计量官 = 真气计量官()
llm = ChatOpenAI(model="gpt-4o", callbacks=[计量官])
response = llm.invoke("解释 SOLID 五大原则")
print(f"入招：{计量官.入招真气}，出招：{计量官.出招真气}，共计：{计量官.总真气}")
```

### 3.7 护体之法 —— 故障转移

当主力宗师走火入魔（限流、超时），须有后备高手替补——**此乃容错之术**。

```python
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

# 主将
primary = ChatOpenAI(model="gpt-4o", max_retries=0)
# 替补
backup = ChatAnthropic(model="claude-haiku-4-5")

# 以 with_fallbacks 布下容错大阵
robust_llm = primary.with_fallbacks([backup])

# 主将倒下，替补自动顶上，无缝衔接
response = robust_llm.invoke("解释微服务架构")
print(response.content)
```

---

## 卷四：口诀真言 —— 提示词

### 4.1 口诀之理 —— Prompt 何以重要

诸位试想：你有绝世高手（LLM），但高手 **只听你说的话来出招**。你含糊其辞——他便乱打一气；你指令明确——他便招招精准。

**Prompt 即那驱动绝世内力的真言口诀。**

> 为何要有 Prompt 模板？武者须知：你不能每次出招前都从头想一遍口诀。有了模板，**只换关键几处**，其余精髓不变。此即模板之妙。

### 4.2 基础口诀 —— PromptTemplate

```python
from langchain_core.prompts import PromptTemplate

# 入门口诀：换皮不换骨
template = PromptTemplate.from_template("给我讲一个关于{topic}的笑话")
result = template.invoke({"topic": "Python"})
print(result.text)
# "给我讲一个关于Python的笑话"

# 进阶口诀：可预设值的真言
template = PromptTemplate(
    template="将以下文本译成{target_lang}：\n\n{text}",
    input_variables=["text", "target_lang"],
    partial_variables={"target_lang": "中文"}  # 此乃固化之法
)
print(template.invoke({"text": "Hello World"}).text)
# "将以下文本译成中文：\n\nHello World"
```

### 4.3 上乘口诀 —— ChatPromptTemplate（推荐）

```python
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.prompts import (
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)

# 法门一：以角色注解构建
chat_prompt = ChatPromptTemplate.from_messages([
    ("system", "你是{role}。以{style}作答。"),
    ("human", "{question}"),
])

# 法门二：以消息物件构建（更显章法）
chat_prompt = ChatPromptTemplate.from_messages([
    SystemMessagePromptTemplate.from_template("你是{role}。如{style}般出招。"),
    HumanMessagePromptTemplate.from_template("{question}"),
])

prompt_value = chat_prompt.invoke({
    "role": "Django 武学泰斗",
    "style": "详尽且通透",
    "question": "Django 中间件是怎样运转的？"
})

print(prompt_value.to_messages())
```

### 4.4 带样例的口诀 —— Few-Shot Prompt

初出茅庐的小子，光给口诀不够，还得**示范几招**——让他照猫画虎。

```python
from langchain_core.prompts import ChatPromptTemplate, FewShotChatMessagePromptTemplate

# 武林前辈的示范
examples = [
    {"input": "我今天升职了！", "output": "🎉 可喜可贺！此乃勤修苦练的回报！"},
    {"input": "我丢了饭碗...", "output": "😔 人生起落本是常事。这扇门关了，必有更适合的窗为你而开。"},
    {"input": "下月大婚", "output": "💒 恭喜一对璧人！愿携手江湖、白头偕老！"},
]

# 铸成范例口诀
example_prompt = ChatPromptTemplate.from_messages([
    ("human", "{input}"),
    ("ai", "{output}"),
])

few_shot_prompt = FewShotChatMessagePromptTemplate(
    example_prompt=example_prompt,
    examples=examples,
)

# 拼接入完整心法
final_prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一位深谙人情世故的知己。观人言而温言回应。"),
    few_shot_prompt,    # 示范在前
    ("human", "{input}"),          # 真招在后
])

chain = final_prompt | ChatOpenAI(model="gpt-4o-mini")
response = chain.invoke({"input": "我考过驾照了！"})
print(response.content)
```

### 4.5 连环口诀 —— Pipeline Prompt

一段长话需先提炼、再展开，此为**分而治之的连环真言**。

```python
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.prompts.pipeline import PipelinePromptTemplate

# 第一重口诀：分析对话
analyze_prompt = ChatPromptTemplate.from_template("""
细品以下对话，分三点道来：
{conversation}

1. 用户情绪
2. 对话核心
3. 待办要务
""")

# 第二重口诀：生成报帖
report_prompt = ChatPromptTemplate.from_template("""
依此分析，写一份江湖快报：

{analysis}

快报格式：
- 所察情绪：...
- 事由归类：...
- 应对之策：...
""")

pipeline = PipelinePromptTemplate(
    final_prompt=report_prompt,
    pipeline_prompts=[("analysis", analyze_prompt)],
)

result = pipeline.invoke({
    "conversation": "掌柜：客官何事？\n客：昨儿买的剑，出鞘便是缺口！\n掌柜：实在对不住，此剑来时可是完好？\n客：我一拔便知此乃残次之物。"
})
print(result.to_messages()[0].content)
```

### 4.6 口诀管理 —— 武道院的修炼之道

散乱的口诀难成大器，真宗师必将口诀归档、编号、复用：

```python
# 📁 武道院/
# ├── 心法阁/
# │   ├── 代码审查.yaml
# │   ├── 文书翻译.yaml
# │   └── 长文摘要.yaml
# └── 修炼台.py

# 心法阁/代码审查.yaml
# _type: "prompt"
# input_variables: ["language", "code", "focus_areas"]
# template: |
#   你乃{language}道上浸淫数十载的审查御史。
#   自以下角度审此段代码：{focus_areas}
#
#   代码：
#   ```{language}
#   {code}
#   ```

from langchain_core.prompts import load_prompt
prompt = load_prompt("心法阁/代码审查.yaml")
```

**铸就口诀的四条铁律：**

1. **定角色**：`"你是一位深耕 Python 十五载的后端宗师"`
2. **束格式**：`"归于 JSON，含 summary 与 score 二域"`
3. **防杜撰**：`"若不知，直言不知，切勿捏造"`
4. **令分步**：`"请循序为之：1) 析因 2) 列策 3) 择优 4) 行策"`

---

## 卷五：功法招式 —— 链

### 5.1 何谓招式

高手有内力（LLM），有口诀（Prompt），但缺的是一套 **动作规范** ——将内力和口诀编排成可复用的**招式**。这就是 Chain。

> **话说从头**：早期 LangChain 只有 LLMChain 这一种连招法门。然江湖演进，武者们发现旧法**模块化不足、串并联不灵活**。于是便有后世 LCEL 的诞生。本章所述乃旧派招式——**你当识之（读旧代码用），但不必练之（写新代码用 LCEL）**。

### 5.2 基础连招 —— LLMChain（旧法）

```python
# ⚠️ 此乃旧派功法，今已少用，仅作考据
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import LLMChain

llm = ChatOpenAI(model="gpt-4o-mini")
prompt = ChatPromptTemplate.from_template("以{level}之境解说{topic}")
chain = LLMChain(llm=llm, prompt=prompt)

result = chain.invoke({"topic": "递归", "level": "初窥门径"})
print(result["text"])
```

### 5.3 连环招式 —— SequentialChain

一手出招、二手接招——**仿佛咏春之黐手，绵绵不绝**。

```python
from langchain.chains import SequentialChain, LLMChain
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

# 第一式：拟大纲
chain1 = LLMChain(
    llm=llm,
    prompt=PromptTemplate.from_template("以'{topic}'为题，拟三点大纲："),
    output_key="outline"
)
# 第二式：据大纲提炼要义
chain2 = LLMChain(
    llm=llm,
    prompt=PromptTemplate.from_template("将此大纲凝为一言：\n{outline}"),
    output_key="summary"
)

# 连环出招
overall = SequentialChain(
    chains=[chain1, chain2],
    input_variables=["topic"],
    output_variables=["outline", "summary"],
    verbose=True
)

result = overall.invoke({"topic": "机器学习如何改变医道"})
print(f"大纲：\n{result['outline']}\n")
print(f"要义：{result['summary']}")
```

### 5.4 分门别类 —— Router Chain

来者何人？**不同的问题，当由不同的宗师接招**。

```python
from langchain.chains.router import MultiPromptChain
from langchain_core.prompts import PromptTemplate

# 各立门庭
physics_template = """你乃物理学宗师。以物理之理解答：{input}"""
math_template = """你乃数学宗师。以算学之理解答：{input}"""
history_template = """你乃史学宗师。以史家之眼解答：{input}"""

prompt_infos = [
    {"name": "物理", "description": "适于物理之问", "prompt_template": physics_template},
    {"name": "算学", "description": "适于算学之问", "prompt_template": math_template},
    {"name": "史学", "description": "适于历史之问", "prompt_template": history_template},
]

llm = ChatOpenAI(model="gpt-4o-mini")
chain = MultiPromptChain.from_prompts(llm=llm, prompt_infos=prompt_infos, verbose=True)

# 路由自动将挑战送到正确的宗师面前
print(chain.invoke("牛顿何许人也？"))       # → 物理学宗师
print(chain.invoke("如何解一元二次方程？"))  # → 算学宗师
```

### 5.5 内视之术 —— Chain 调试

何谓内视？**洞悉内功运转的每一环节**。出招不顺，非此术不能自救。

```python
# 法门一：全局真言
import langchain
langchain.debug = True    # 事无巨细，尽收眼底

# 法门二：单链真言
chain = LLMChain(llm=llm, prompt=prompt, verbose=True)

# 法门三：自定义监察（最灵活）
from langchain_core.callbacks import BaseCallbackHandler

class 武道监察(BaseCallbackHandler):
    """亲临其境，观每一丝真气的流动"""

    def on_chain_start(self, serialized, inputs, **kwargs):
        print(f"🔗 招式起手：{serialized.get('name', '无名')}")
        print(f"   灌注之力：{inputs}")

    def on_chain_end(self, outputs, **kwargs):
        print(f"✅ 招式收功：{outputs}")

    def on_llm_start(self, serialized, prompts, **kwargs):
        print(f"🤖 宗师运转：{serialized.get('name', '无名')}")
        print(f"   口诀长度：{len(prompts[0])} 字")

chain_with_watcher = LLMChain(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    prompt=PromptTemplate.from_template("{question}"),
    callbacks=[武道监察()]
)
chain_with_watcher.invoke({"question": "何为多态？"})
```

---

## 卷六：绝世心法 —— LCEL

### 6.1 何谓 LCEL

**LCEL（LangChain 表达式语言）** 乃 LangChain 总舵自 2024 年钦定的**武道正宗**。旧派功法（LLMChain、SequentialChain）皆为外家拳脚，LCEL 才是 **内家心法**。

> 话说旧派功法有一弊：链与链之间数据流转**黑箱运作**，你不知内力如何传递，也不明为何出错。LCEL 则不然——**如溪水之流，明澈见底**。

```python
# 旧派写法（知其然不知其所以然）
# chain = LLMChain(llm=llm, prompt=prompt)
# result = chain.invoke({"topic": "AI"})

# LCEL 写法（内力流转一目了然）
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

chain = (
    ChatPromptTemplate.from_template("讲一个关于{topic}的故事")
    | ChatOpenAI(model="gpt-4o-mini")   # | 便是内力流转之脉络！
    | StrOutputParser()
)

result = chain.invoke({"topic": "AI"})
print(result)
```

**LCEL 的四大好处：**

| 好处 | 释义 |
|---|---|
| **组合如臂使指** | `|` 如内力流转，无间断无阻塞 |
| **万法皆通** | 所有组件皆从 `Runnable` 来，invoke/stream/batch/async 均可用 |
| **天机自动** | 你写一通，流式/异步/批处理自动可得 |
| **明察秋毫** | 数据流转每一步都可见，追踪无碍 |

### 6.2 Runnable 法则

凡 LCEL 链中的组件，皆受 **Runnable 法则** 约束——入有 **invoke**，出有 **stream**，并行有 **batch**，异步有 **ainvoke**。

```python
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

chain = (
    ChatPromptTemplate.from_template("{topic}是何物？30字内回禀")
    | ChatOpenAI(model="gpt-4o-mini")
)

# 同步出招
result = chain.invoke({"topic": "微服务"})

# 并行出招（自动并发，绝不互相拖累）
results = chain.batch([
    {"topic": "Docker"},
    {"topic": "Kubernetes"},
    {"topic": "Serverless"},
])

# 流式出招（真气冉冉不绝）
for chunk in chain.stream({"topic": "CI/CD"}):
    print(chunk.content, end="", flush=True)

# 异步出招
async def main():
    result = await chain.ainvoke({"topic": "REST API"})

# 异步流式出招
async def main_stream():
    async for chunk in chain.astream({"topic": "GraphQL"}):
        print(chunk.content, end="", flush=True)
```

### 6.3 蜻蜓点水 —— RunnablePassthrough

有时你不想改变流向，只想**多加一股内力**——这就是 Passthrough 的真谛。

```python
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(model="gpt-4o-mini")

# 最简透传：输入直奔 template
chain = (
    {"topic": RunnablePassthrough()}
    | ChatPromptTemplate.from_template("给{topic}下一句定论")
    | llm | StrOutputParser()
)
print(chain.invoke("多态"))

# 内力加持：额外注入日期与语言
chain_enriched = (
    {
        "topic": RunnablePassthrough(),
        "date": lambda _: "2026-06-02",       # 当日内力
        "lang": lambda _: "中文",              # 语言内力
    }
    | ChatPromptTemplate.from_template("今乃{date}，以{lang}解说{topic}")
    | llm | StrOutputParser()
)
print(chain_enriched.invoke("SOLID 五则"))
```

### 6.4 分进合击 —— RunnableParallel

三路高手齐出，互不干扰，最后**合聚一处**——速度远胜逐一过招。

```python
from langchain_core.runnables import RunnableParallel

# 三路分进
code_review = (
    ChatPromptTemplate.from_template("审此代码之品质：{code}")
    | llm | StrOutputParser()
)
security_check = (
    ChatPromptTemplate.from_template("察此代码之破绽：{code}")
    | llm | StrOutputParser()
)
performance = (
    ChatPromptTemplate.from_template("评此代码之身法：{code}")
    | llm | StrOutputParser()
)

# 合击阵法
parallel_review = RunnableParallel(
    品质=code_review,
    安全=security_check,
    身法=performance,
)

code = """
def process_user(user_id):
    query = f"SELECT * FROM users WHERE id = {user_id}"
    result = db.execute(query)
    return result
"""

results = parallel_review.invoke({"code": code})
for 维度, 评判 in results.items():
    print(f"\n{'='*40}\n{维度}\n{'='*40}\n{评判}")
```

### 6.5 自创武功 —— RunnableLambda

天下功法，岂能尽学于他人？**RunnableLambda** 便是那 **自创绝技之法门**。

```python
from langchain_core.runnables import RunnableLambda

# 自创的第一式
def 统计字数(text: str) -> dict:
    """数墨点 —— 统计算学"""
    return {
        "原文": text,
        "字数": len(text),
        "词数": len(text.split()),
    }

# 自创的第二式
def 加阅读时长(stats: dict) -> dict:
    """添一炷香 —— 预估研读耗时"""
    stats["研读时长_秒"] = stats["词数"] * 0.3  # 每词 0.3 息
    return stats

# 将自创招式纳入 LCEL
chain = (
    ChatPromptTemplate.from_template("80字内介绍{topic}")
    | llm | StrOutputParser()
    | RunnableLambda(统计字数)
    | RunnableLambda(加阅读时长)
)

result = chain.invoke({"topic": "Python GIL"})
print(f"字数：{result['字数']}")
print(f"词数：{result['词数']}")
print(f"研读约需：{result['研读时长_秒']:.1f} 息")
```

### 6.6 歧路亡羊 —— RunnableBranch

来者功力几何？**不同境界走不同路**——切莫以一式应万变。

```python
from langchain_core.runnables import RunnableBranch

# 入门之路
beginner = (
    ChatPromptTemplate.from_template("以最浅白之喻解释{question}")
    | llm | StrOutputParser()
)
# 登堂之路
intermediate = (
    ChatPromptTemplate.from_template("以武学术语、但保通透的方式解释{question}")
    | llm | StrOutputParser()
)
# 入室之路
expert = (
    ChatPromptTemplate.from_template("穷究底细，以最深功力解释{question}")
    | llm | StrOutputParser()
)

# 察看来者境界，择路而授
branch = RunnableBranch(
    (lambda x: x["level"] == "初窥门径", beginner),
    (lambda x: x["level"] == "登堂入室", intermediate),
    (lambda x: x["level"] == "一代宗师", expert),
    beginner  # 不明来路者，以入门待之
)

print(branch.invoke({"question": "Docker 为何物？", "level": "初窥门径"}))
print(branch.invoke({"question": "Docker 为何物？", "level": "一代宗师"}))
```

### 6.7 LCEL 无上心法 —— 综合演练

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.runnables import RunnablePassthrough
from pydantic import BaseModel, Field

# 定义收功格式
class 功法评估(BaseModel):
    功力评分: int = Field(description="代码功力 1-10")
    破绽: list[str] = Field(description="所察破绽")
    精进之道: list[str] = Field(description="改进真言")
    一言蔽之: str = Field(description="浓缩为一句")

llm = ChatOpenAI(model="gpt-4o", temperature=0)

code_analyzer = (
    {
        "code": RunnablePassthrough(),
        "format_instructions": lambda _: JsonOutputParser(
            pydantic_object=功法评估
        ).get_format_instructions(),
    }
    | ChatPromptTemplate.from_messages([
        ("system", """你乃是代码武学之泰山北斗。审视来者代码，给出评估。
{format_instructions}"""),
        ("human", "{code}"),
    ])
    | llm
    | JsonOutputParser(pydantic_object=功法评估)
)

result = code_analyzer.invoke("""
def f(x):
    return eval(x)
""")
print(f"功力评价：{result['功力评分']}/10")
print(f"破绽：{result['破绽']}")
print(f"精进之法：{result['精进之道']}")
print(f"一言：{result['一言蔽之']}")
```

---

## 卷七：回光之术 —— 记忆

### 7.1 为何要有记忆

天生武者皆知：**LLM 无记忆**——每一回出招后，前尘尽忘。

何以解之？全真教有"回光返照"，少林有"宿命通"。LangChain 则以 **Memory** 一门功法统摄全局。

```python
# 无记忆的武者：问一句忘一句
llm = ChatOpenAI(model="gpt-4o-mini")
print(llm.invoke("我是小明").content)        # "你好小明！"
print(llm.invoke("我姓甚名谁？").content)    # "我不知道..." ❌ 这便是失忆之苦

# 有记忆的武者：念念不忘
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

conversation = ConversationChain(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    memory=ConversationBufferMemory(),
)
conversation.invoke("我是小明")              # "你好小明！"
conversation.invoke("我姓甚名谁？")          # "你叫小明！" ✅ 这便是回光返照
```

### 7.2 五种记忆功法

**记忆太多则真气耗尽，记忆太少则前情尽失。** 因此 LangChain 分化出五种记忆功法，各有妙用。

#### 第一功：全息记忆 —— ConversationBufferMemory

```python
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory(return_messages=True)
memory.save_context(
    {"input": "在下乃产品掌门"},
    {"output": "久仰！有何需求来商讨？"}
)
# 每言必录，事无巨细
print(memory.load_memory_variables({}))
# ✅ 长处：全无遗漏
# ⚠️ 弊病：真气消耗无上限，对话长了反噬自身
```

#### 第二功：摘要记忆 —— ConversationSummaryMemory

```python
from langchain.memory import ConversationSummaryMemory

# 此功不以原话记，而以 LLM 提炼扼要
memory = ConversationSummaryMemory(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    return_messages=True,
    max_token_limit=200,
)

memory.save_context(
    {"input": "竞品 X 的定价策略如何？"},
    {"output": "竞品 X 以免费入门、$29/月进阶，重在功能分级..."}
)
print(memory.load_memory_variables({})["history"])
# ✅ 长处：大省真气
# ⚠️ 弊病：细节或有遗珠
```

#### 第三功：窗口记忆 —— ConversationBufferWindowMemory

```python
from langchain.memory import ConversationBufferWindowMemory

# 只记最近 K 轮——如窗中之景，旧景自去
memory = ConversationBufferWindowMemory(k=3, return_messages=True)

for i in range(5):
    memory.save_context(
        {"input": f"第{i}问"},
        {"output": f"第{i}答"}
    )
print(len(memory.load_memory_variables({})["history"]))  # 仅 6 条
# ✅ 长处：真气可控
# ⚠️ 弊病：前情尽断
```

#### 第四功：Token 节流 —— ConversationTokenBufferMemory

```python
from langchain.memory import ConversationTokenBufferMemory

# 以真气上限为界，超则自动舍旧
memory = ConversationTokenBufferMemory(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    max_token_limit=300,
    return_messages=True,
)
# ✅ 长处：真气预算精准
# ⚠️ 弊病：需知模型的 Token 算法
```

#### 第五功：藏经记忆 —— VectorStore-Backed Memory

```python
# 将记忆存入藏经阁（向量数据库），取用时再检索
# 此功在第八章天眼通详述
# ✅ 长处：海量记忆，精准检索
# ⚠️ 弊病：需额外建阁维护
```

### 7.3 LCEL 时代管理记忆

旧法将 Memory 藏在 Chain 内部——**你不知他记了多少、怎么记的**。LCEL 则推崇**明明白白管记忆**。

```python
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

class 武道会话:
    """明明白白——每一句都记在你的眼皮底下"""

    def __init__(self, llm, 定场诗=""):
        self.llm = llm
        self.对话录 = []
        if 定场诗:
            self.对话录.append(("system", 定场诗))

    def 过招(self, user_input: str) -> str:
        self.对话录.append(("human", user_input))
        prompt = ChatPromptTemplate.from_messages(self.对话录)
        response = self.llm.invoke(prompt.invoke({}))
        self.对话录.append(("ai", response.content))
        return response.content

    def 清心(self):
        """忘尽前缘"""
        head = self.对话录[:1] if self.对话录 and self.对话录[0][0] == "system" else []
        self.对话录 = head

conv = 武道会话(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    定场诗="你是一位博闻强识的江湖老友。"
)
print(conv.过招("我名唤小明"))
print(conv.过招("我名为甚？"))
```

---

## 卷八：天眼通 —— 检索 RAG

### 8.1 何谓天眼通

世上宗师（LLM）虽学贯古今，却有**一门限**——他所知止于修炼之时（Training Cutoff）。今日之新闻、昨日之论文、你企业之机密——**他一概不知**。

**RAG（检索增强生成）** 便是那佛门的 **天眼通**——出招之前，先以天眼神通**遍览藏经阁**，将相关典籍附于口诀之中，再请宗师出招。如此，宗师便**既能言古，又能论今**。

```
用户之问 → 天眼搜寻（藏经阁中取经）→ 妙法加持（附于口诀）
                ↑                                    ↓
        ┌───────┴────────┐                   宗师收到口诀+典籍
        │  藏经阁         │                         ↓
        │  (Chroma/FAISS) │              宗师基于典籍作答（杜绝杜撰）
        └────────────────┘
  典籍入库 ← 分筋错骨手 ← 搜罗天下典籍
(Embedding)   (Splitter)   (DocumentLoader)
```

**为何要学 RAG？**

| 不修 RAG | 修 RAG 后 |
|---|---|
| 宗师不知最新资讯 | 宗师即时查阅最新典籍 |
| 宗师可能胡说八道 | 宗师言必有据、句句有出处 |
| 你企业的秘密无从得知 | 宗师遍览你的藏经阁 |
| 答案不知来自何方 | 答完可追溯原典 |

### 8.2 搜罗天下典籍 —— Document Loaders

天眼通的第一步：**将天下秘籍纳入你的藏经阁**。

```python
# --- 经卷 ---
from langchain_community.document_loaders import TextLoader
loader = TextLoader("./README.md", encoding="utf-8")
docs = loader.load()

# --- 秘典（PDF） ---
# pip install pypdf
from langchain_community.document_loaders import PyPDFLoader
loader = PyPDFLoader("./report.pdf")
docs = loader.load()

# --- 网罗天下 —— 网页 ---
# pip install beautifulsoup4
from langchain_community.document_loaders import WebBaseLoader
loader = WebBaseLoader("https://docs.python.org/3/tutorial/")
docs = loader.load()

# --- 名录 —— CSV ---
from langchain_community.document_loaders import CSVLoader
loader = CSVLoader("./data.csv", encoding="utf-8")
docs = loader.load()

# --- 一扫乾坤 —— 目录批量 ---
from langchain_community.document_loaders import DirectoryLoader
loader = DirectoryLoader(
    "./docs/",
    glob="**/*.md",
    loader_cls=TextLoader,
    show_progress=True,
)
docs = loader.load()
print(f"已纳入藏经阁：{len(docs)} 部典籍")
```

### 8.3 分筋错骨手 —— Text Splitters

典籍太长则**检索如大海捞针**；太短则**断章取义、失了魂魄**。分筋错骨手要旨：**大小适中，留有余缝（overlap），使上下文如藕断丝连**。

```python
# --- 此乃首选功法：RecursiveCharacterTextSplitter ---
from langchain_text_splitters import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,         # 每段至多 1000 字
    chunk_overlap=200,       # 段间重叠 200 字（防断章取义）
    separators=["\n\n", "\n", "。", ".", " ", ""],  # 优先以自然断点分割
)

splits = text_splitter.split_documents(docs)
print(f"分筋错骨后得 {len(splits)} 段")

# --- Token 分割法 ---
from langchain_text_splitters import TokenTextSplitter
splitter = TokenTextSplitter(chunk_size=500, chunk_overlap=50)

# --- 语义分割法（实验性功法） ---
from langchain_experimental.text_splitter import SemanticChunker
from langchain_openai import OpenAIEmbeddings
splitter = SemanticChunker(OpenAIEmbeddings())
```

**分段大小择诀：**

| 武道场景 | 每段大小 | 重叠比例 |
|---|---|---|
| 一问一答 | 256-512 tokens | 10-20% |
| 功法典籍 | 512-1024 tokens | 15-25% |
| 长文摘要 | 1024-2048 tokens | 15-20% |
| 代码秘术 | 512-1024 tokens（顺函数边界） | 10% |

### 8.4 内功化形 —— Embeddings

典籍是文字，藏经阁却是**向量空间**。如何化文字为向量？**Embedding** 便是这门化形奇术。

```python
# --- OpenAI 化形术（最常用） ---
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
    dimensions=1536,
)
vector = embeddings.embed_query("Python 装饰器为何物？")
print(f"化形后维度：{len(vector)}")  # 1536

# --- 本地化形（零开销） ---
from langchain_community.embeddings import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-zh-v1.5",  # 中原文字特化
    model_kwargs={"device": "cpu"},
)
```

### 8.5 藏经阁 —— Vector Stores

化形后的经文，需**收入藏经阁**，方可供随时检索。

```python
# ========== Chroma 小藏经阁（入门首选，轻便好用） ==========
# pip install chromadb
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()

# 建阁
vectorstore = Chroma.from_documents(
    documents=splits,
    embedding=embeddings,
    persist_directory="./chroma_藏经阁",  # 阁址
    collection_name="天下武学",
)

# 探阁 —— 相似度检索
results = vectorstore.similarity_search("Python 多线程之法", k=4)
for i, doc in enumerate(results):
    print(f"\n--- 经卷 {i+1} ---")
    print(f"内容：{doc.page_content[:200]}...")

# 探阁 —— 带功力度
results_with_scores = vectorstore.similarity_search_with_score("Python 多线程", k=3)
for doc, score in results_with_scores:
    print(f"契合度：{1 - score:.3f} | {doc.page_content[:100]}...")

# ========== FAISS 大藏经阁（本地极速） ==========
# pip install faiss-cpu
from langchain_community.vectorstores import FAISS

vectorstore = FAISS.from_documents(splits, embeddings)
vectorstore.save_local("./faiss_藏经阁")

loaded = FAISS.load_local(
    "./faiss_藏经阁",
    embeddings,
    allow_dangerous_deserialization=True
)
```

### 8.6 天眼之术 —— Retrievers

有了藏经阁，还需**一门神通**在阁中寻经。Retriever 即为此道。

```python
# --- 基础天眼 ---
retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 4}
)
docs = retriever.invoke("如何提升 Python 身法？")

# --- 天眼+心念（Self-Query，按元数据筛选） ---
from langchain.retrievers.self_query.base import SelfQueryRetriever
from langchain.chains.query_constructor.base import AttributeInfo

metadata_field_info = [
    AttributeInfo(name="source", description="典籍出处", type="string"),
    AttributeInfo(name="category", description="分类：tutorial/api/faq", type="string"),
]

self_query = SelfQueryRetriever.from_llm(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    vectorstore=vectorstore,
    document_contents="武学秘籍总集",
    metadata_field_info=metadata_field_info,
)
docs = self_query.invoke("2025年发布的关於 API 设计的教程")

# --- 万象天眼（Multi-Query，一题多角度搜） ---
from langchain.retrievers.multi_query import MultiQueryRetriever
multi = MultiQueryRetriever.from_llm(
    retriever=vectorstore.as_retriever(),
    llm=ChatOpenAI(model="gpt-4o-mini"),
)
docs = multi.invoke("Python 性能提升")
# 自动生成数个变体：["如何加快Python","Python优化之道","Python调优秘诀"]

# --- 天眼通+去芜存菁（Contextual Compression） ---
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor

compressor = LLMChainExtractor.from_llm(ChatOpenAI(model="gpt-4o-mini"))
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=vectorstore.as_retriever(search_kwargs={"k": 10}),
)
# 先取10卷 → 宗师提纯 → 只留精华
```

### 8.7 天眼通大成 —— 完整 RAG 大阵

```python
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# 第一重：搜罗典籍
loader = WebBaseLoader([
    "https://python.langchain.com/docs/get_started/introduction",
    "https://python.langchain.com/docs/expression_language/",
])
docs = loader.load()

# 第二重：分筋错骨
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
splits = text_splitter.split_documents(docs)

# 第三重：入藏经阁
vectorstore = Chroma.from_documents(
    documents=splits,
    embedding=OpenAIEmbeddings(model="text-embedding-3-small"),
)
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

# 第四重：铸口诀
template = """你是 LangChain 武道泰斗。根据以下藏经阁中取出的典籍回答用户之问。
若典籍中无此信息，直言"阁下此问，敝阁无载"，切莫杜撰。

典籍：
{context}

来者之问：{question}

泰斗回禀："""

prompt = ChatPromptTemplate.from_template(template)
llm = ChatOpenAI(model="gpt-4o", temperature=0)

def 排布典籍(docs):
    """将取出的典籍编排成文"""
    return "\n\n".join(
        f"[出处：{doc.metadata.get('source', '不详')}]\n{doc.page_content}"
        for doc in docs
    )

# 第五重：布阵
rag_chain = (
    {
        "context": retriever | 排布典籍,  # 天眼取经 → 排布
        "question": RunnablePassthrough(), # 原问透传
    }
    | prompt | llm | StrOutputParser()
)

# 第六重：出招
answer = rag_chain.invoke("LCEL 是甚？其妙在何处？")
print(answer)
```

### 8.8 天眼通自检真言

```python
天眼通自检 = """
□ 取经精准否？ —— 取回的典籍是否真的应了来者之问？
  → 印出 retriever.invoke(question)，以肉眼断之

□ 回禀忠实否？ —— 宗师的回答是否忠于典籍？
  → 对答与典一一对照，莫容杜撰

□ 典籍尽用否？ —— 宗师是否充分运用了取回的经文？
  → 查宗师是否引原文、举出处

□ 分割得宜否？
  → 若每段意犹未尽 → 增 chunk_size
  → 若取经牛头马面 → 减 chunk_size

□ 取经之法对不对？
  → 契合度太低 → 试试 Multi-Query / 混合检索
  → 冗余太多 → 用 MMR 检索（调 lambda_mult）
"""
```

---

## 卷九：神兵利器 —— 工具

### 9.1 为何要有神兵

宗师虽内力深厚，但 **手无寸铁**。他不会算数、不能搜网、不可查询你的数据库。**Tool（工具）** 就是给宗师装备的**神兵利器**。

> 试想：你对宗师说"查天气再算个数"，若无神兵，宗师只能编造。有了神兵——他便会**主动拔剑、使剑、还剑入鞘**。

### 9.2 江湖现成的神兵

```python
from langchain_community.tools import WikipediaQueryRun, ArxivQueryRun
from langchain_community.utilities import WikipediaAPIWrapper, ArxivAPIWrapper

# 万象宝鉴 —— 维基百科
wikipedia = WikipediaQueryRun(api_wrapper=WikipediaAPIWrapper(
    lang="zh", top_k_results=3,
))
print(wikipedia.invoke("Python编程语言"))

# 学术令 —— Arxiv 论剑堂
arxiv = ArxivQueryRun(api_wrapper=ArxivAPIWrapper(top_k_results=3))
print(arxiv.invoke("transformer attention mechanism"))
```

### 9.3 亲手铸神兵

```python
from langchain_core.tools import tool, BaseTool
from pydantic import BaseModel, Field

# ===== 法门一：@tool 真言（最简便） =====
@tool
def 观天象(city: str, 国: str = "中国") -> str:
    """察看一城之天象。入参：城名、国名。"""
    天象录 = {
        "北京": "晴空万里 25°C，风轻云淡",
        "上海": "云卷云舒 28°C，偶有微雨",
        "深圳": "雷声隐隐 30°C，大雨将至",
    }
    return 天象录.get(city, f"{city}：风和日丽 22°C")

@tool
def 算学(expression: str) -> str:
    """行算学之道。纳算式，吐结果。"""
    try:
        result = eval(expression, {"__builtins__": {}})
        return f"算学曰：{expression} = {result}"
    except Exception as e:
        return f"算学不济：{e}"

@tool
def 查阅宗卷(query: str) -> str:
    """查企业内典：来往帐目、用户宗卷、货物名录。"""
    宗卷库 = {
        "用户数": "截至2026年六月，拥趸 1,234,567 众",
        "订单": "本月载入 89,234 单，比去年涨 23%",
        "top": "魁首三甲：1) 智能音箱 2) 无线耳 3) 腕上钟",
    }
    for 关键词, 记载 in 宗卷库.items():
        if 关键词 in query:
            return 记载
    return f"遍览宗卷，未寻得'{query}'之蛛丝马迹"

# ===== 法门二：BaseTool 子类（神兵需铸模） =====
class 文件御者Input(BaseModel):
    路径: str = Field(description="典籍路径")
    御令: str = Field(description="操作：读/写/删/列")

class 文件御者(BaseTool):
    name: str = "文件御者"
    description: str = "驾驭天下文件：可读取、写入、删除、罗列"
    args_schema: type[BaseModel] = 文件御者Input

    def _run(self, 路径: str, 御令: str) -> str:
        import os
        if 御令 == "读":
            if os.path.exists(路径):
                with open(路径, "r") as f:
                    return f.read()
            return f"未有此卷：{路径}"
        elif 御令 == "列":
            return f"目录所载：{os.listdir(路径)}"
        return f"御令'{御令}'尚不通"
```

### 9.4 神兵护法 —— 错误处理

神兵也会失效。须炼就**不坏金身**——失手后自动重试。

```python
from langchain_core.tools import tool
from tenacity import retry, stop_after_attempt, wait_exponential

@tool
@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2))
def 查股价(symbol: str) -> str:
    """察一股票之时价"""
    import random
    if random.random() < 0.3:  # 三分之一的失手
        raise Exception("此宝失灵，需重祭")
    price = random.uniform(100, 500)
    return f"{symbol} 时价：${price:.2f}"
```

### 9.5 万兵齐发

```python
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent

# 集齐神兵
神兵库 = [观天象, 算学, 查阅宗卷, 查股价]

# 请高手入阵
llm = ChatOpenAI(model="gpt-4o")
agent = create_react_agent(llm, 神兵库)

# 一声令下，高手自会判断用哪件神兵、以何种次序
response = agent.invoke({
    "messages": [{
        "role": "user",
        "content": "且看北京天象，算 123×456，再查宗卷中有多少用户"
    }]
})

# 观高手如何运兵
for msg in response["messages"]:
    content = getattr(msg, "content", "")
    tool_calls = getattr(msg, "tool_calls", [])
    if content:
        print(f"[{getattr(msg, 'type', '?')}] {content[:150]}")
    for tc in tool_calls:
        print(f"  🔧 祭出神兵：{tc['name']}({tc['args']})")
```

---

## 卷十：武林高手 —— 智能体 Agent

### 10.1 何谓 Agent

链条（Chain）是按谱出招——**你定好了顺序，它便照做**。

**Agent 则不然——他是一位真正的武林高手**。你只需告诉他"目标"，他自会**思（Thought）、决（Decision）、行（Action）、省（Observation）**，循环往复，直到达成使命。

```
Agent 的内功运转（ReAct 之道）：
  ┌──────────────────────────────────────────┐
  │  思：吾先观天象，再行算学                │
  │     ↓                                    │
  │  行：祭观天象("北京")                    │
  │     ↓                                    │
  │  省：北京晴空万里 25°C                   │
  │     ↓                                    │
  │  思：天象已得，今可算学                  │
  │     ↓                                    │
  │  行：祭算学("123*456")                   │
  │     ↓                                    │
  │  省：123*456 = 56088                     │
  │     ↓                                    │
  │  思：万事皆备，可回禀                     │
  │     ↓                                    │
  │  终：天象、算学一并呈上                   │
  └──────────────────────────────────────────┘
```

### 10.2 Agent 四大流派

| Agent 流派 | 适用宗师 | 运功之法 | 适用之场 |
|---|---|---|---|
| **ReAct** | 各派通用 | 思-行-省 循环 | 通用、可解释最高 |
| **OpenAI Functions** | GPT-3.5+ | 原生 Function Calling | GPT 宗门首选 |
| **Tool Calling** | Claude/GPT-4+ | 原生 Tool Calling API | 跨门派、结构调用 |
| **Structured Chat** | 各派通用 | 结构化输出 | 多参数复杂场景 |

### 10.3 LangGraph Agent（今之正宗）

```python
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool

@tool
def 搜天下(query: str) -> str:
    """搜遍江湖，探取最新讯息"""
    return f"搜得：关於'{query}'，江湖中人提及..."

@tool
def 演武台(python_code: str) -> str:
    """演武台——执行 Python 招法并观其效"""
    import io, sys
    old_stdout = sys.stdout
    sys.stdout = buffer = io.StringIO()
    try:
        exec(python_code, {"__builtins__": __builtins__})
        return buffer.getvalue() or "招式已成（无物输出）"
    except Exception as e:
        return f"走火入魔：{e}"
    finally:
        sys.stdout = old_stdout

llm = ChatOpenAI(model="gpt-4o")
agent = create_react_agent(
    llm,
    tools=[搜天下, 演武台],
)

messages = agent.invoke({
    "messages": [{
        "role": "user",
        "content": "搜一下 Python 3.13 最新特性，随后以 Python 演武台演示 match-case 用法"
    }]
})

for msg in messages["messages"]:
    print(f"\n{'='*50}")
    print(f"[{getattr(msg, 'type', '?')}]: {getattr(msg, 'content', '')}")
```

### 10.4 给高手定规矩 —— 系统提示词

```python
定场诗 = """你是一位一丝不苟的数据武学泰斗。

铁律：
1. 凡算学之事，必以演武台行功，不准心算
2. 每个数字结果须注明出处或量纲
3. 若无从确定，直说不知——不可编造
4. 收功时附上所祭神兵清单
"""

agent = create_react_agent(
    llm,
    tools=[搜天下, 演武台],
    state_modifier=定场诗,
)

response = agent.invoke({
    "messages": [{
        "role": "user",
        "content": "2025 年天下 AI 市值为几何？未来五年复合增长预估如何？"
    }]
})
```

### 10.5 Agent 调校心经

```python
# 调校四法：

# 1. 以 verbose 洞悉每一步棋路
agent = create_react_agent(llm, tools)

# 2. 录下所有神兵出鞘轨迹
import logging
logging.basicConfig(level=logging.INFO)

# 3. LangSmith 天眼追踪（强烈推荐）
import os
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = "ls_..."
os.environ["LANGCHAIN_PROJECT"] = "my-agent-dojo"

# 4. 亲探每一步
def 观棋(question: str):
    agent = create_react_agent(llm, tools)
    result = agent.invoke({"messages": [{"role": "user", "content": question}]})

    for i, msg in enumerate(result["messages"]):
        print(f"\n--- 第 {i} 手 ---")
        print(f"角色：{getattr(msg, 'type', '?')}")
        if hasattr(msg, "content") and msg.content:
            print(f"内容：{msg.content[:200]}")
        if hasattr(msg, "tool_calls"):
            for tc in msg.tool_calls:
                print(f"🔧 祭出神兵：{tc['name']}({tc['args']})")
    return result
```

---

## 卷十一：上乘功法 —— 高级主题

### 11.1 内视之术 —— Callbacks

你有高人（LLM），有出招轨迹（Chain），但**高人如何运功、何时祭出何般兵器**——若无内视之术，你蒙在鼓里。

```python
from langchain_core.callbacks import BaseCallbackHandler
from langchain_openai import ChatOpenAI

class 内视功法(BaseCallbackHandler):
    """此功令你窥见高人运功的全过程"""

    def on_llm_start(self, serialized: dict, prompts: list, **kwargs):
        print(f"🤖 宗师入定 | 名号: {serialized.get('name', '无名')}")

    def on_llm_end(self, response, **kwargs):
        usage = response.llm_output.get("token_usage", {})
        print(f"✅ 宗师收功 | 真气消耗: {usage.get('total_tokens', '?')}")

    def on_llm_error(self, error, **kwargs):
        print(f"❌ 宗师走火入魔: {error}")

    def on_tool_start(self, serialized: dict, input_str: str, **kwargs):
        print(f"🔧 {serialized.get('name')} 出鞘 | 灌注: {input_str[:100]}")

    def on_tool_end(self, output, **kwargs):
        print(f"✅ 神兵回鞘 | 所得: {str(output)[:100]}")

llm = ChatOpenAI(model="gpt-4o-mini", callbacks=[内视功法()])
response = llm.invoke("何谓 Clean Code？")
```

### 11.2 化功大法 —— Output Parsers / 结构化输出

高手回话常是长篇大论，但若你要的只是一个 **JSON**、一个 **数字**、一个 **布尔**——便需**化功大法收束内力**。

```python
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field
from enum import Enum

# 定义收功之器
class 缺陷等级(str, Enum):
    致命 = "critical"
    高危 = "high"
    中危 = "medium"
    低危 = "low"

class 代码破绽(BaseModel):
    文件: str = Field(description="含此破绽之典籍")
    行号: int = Field(description="破绽所在行")
    等级: 缺陷等级 = Field(description="破绽之危")
    描述: str = Field(description="破绽详情")
    修补之法: str = Field(description="如何修复")

class 审查判词(BaseModel):
    总评: int = Field(description="功力评分 1-10", ge=1, le=10)
    破绽录: list[代码破绽] = Field(description="所察破绽")
    长处录: list[str] = Field(description="此代码之长处")
    一言: str = Field(description="一言以蔽之")

parser = PydanticOutputParser(pydantic_object=审查判词)

prompt = ChatPromptTemplate.from_messages([
    ("system", "你是铁面御史。据来文给出结构化判词。\n{format_instructions}"),
    ("human", "{code}"),
])

llm = ChatOpenAI(model="gpt-4o", temperature=0)
chain = prompt | llm | parser

code = """
def process(data):
    result = []
    for i in range(len(data)):
        if data[i] > 0:
            result.append(data[i] * 2)
    return result
"""

report: 审查判词 = chain.invoke({
    "code": code,
    "format_instructions": parser.get_format_instructions(),
})

print(f"总评：{report.总评}/10")
print(f"\n破绽 ({len(report.破绽录)} 处):")
for issue in report.破绽录:
    print(f"  [{issue.等级.value}] {issue.文件}:{issue.行号} - {issue.描述}")
    print(f"    💡 {issue.修补之法}")
print(f"\n长处：")
for s in report.长处录:
    print(f"  ✅ {s}")
print(f"\n一言：{report.一言}")
```

### 11.3 真气回春 —— 缓存

同一问题问宗师千百遍，**每次都耗真气**？缓存之术铭记宗师之所答——**同题再问，瞬息应答而不耗一丝真气**。

```python
# ===== 内息缓存 —— 随生随灭 =====
from langchain_core.caches import InMemoryCache
from langchain_core.globals import set_llm_cache

set_llm_cache(InMemoryCache())

llm = ChatOpenAI(model="gpt-4o-mini")
_ = llm.invoke("何谓 SOLID？")   # 真耗真气
_ = llm.invoke("何谓 SOLID？")   # 从缓存取，毫发不伤

# ===== 玉简缓存 —— 持久不灭 =====
from langchain.cache import SQLiteCache
set_llm_cache(SQLiteCache(database_path=".langchain_缓存.db"))

# ===== 云端缓存 —— 分而治之 =====
# pip install redis
# from langchain_community.cache import RedisCache
# import redis
# set_llm_cache(RedisCache(redis_=redis.Redis(host="localhost", port=6379)))
```

### 11.4 凌波微步 —— 异步并发

一宗事一宗事做，凡夫所为；**十宗事同时做，宗师所为**。

```python
import asyncio
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(model="gpt-4o-mini")
prompt = ChatPromptTemplate.from_template("30字介绍{topic}")
chain = prompt | llm | StrOutputParser()

async def 探一题(topic: str):
    result = await chain.ainvoke({"topic": topic})
    print(f"{topic}：{result}")
    return result

async def main():
    # 五路并进，互不拖累
    results = await asyncio.gather(
        探一题("Docker"),
        探一题("Kubernetes"),
        探一题("Terraform"),
        探一题("Ansible"),
        探一题("Jenkins"),
    )
    print(f"共成事 {len(results)} 宗")

# asyncio.run(main())

# ===== 批处理：自动并发 =====
inputs = [{"topic": t} for t in ["微服务", "巨石架构", "SOA", "Serverless", "事件驱动"]]
results = chain.batch(inputs)  # 后端自动并行
```

### 11.5 金钟罩 —— 安全铁律

```python
# 铁律一：永不拼接用户输入到 SQL/eval
# ❌ 此乃江湖大忌
@tool
def 邪道查询(user_id: str):
    query = f"SELECT * FROM users WHERE id = {user_id}"
    return db.execute(query)

# ✅ 正统之道
@tool
def 正道查询(user_id: str):
    query = "SELECT * FROM users WHERE id = %s"
    return db.execute(query, (user_id,))

# 铁律二：沙箱演武
@tool
def 安全演武台(code: str) -> str:
    """在禁锢结界中演武"""
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
        return f"结界警告：{e}"

# 铁律三：令牌藏于环境，不死硬于代码
import os
api_key = os.getenv("OPENAI_API_KEY")
```

---

## 卷十二：阵法奥义 —— LangGraph

### 12.1 Chain 与 Graph —— 招式 vs 阵法

| 特性 | Chain（招式） | LangGraph（阵法） |
|---|---|---|
| **形** | 一线到底（A → B → C） | 有向之图（A → B → 或许回 A） |
| **态** | 无态（每出招独立） | 有态（State 贯穿全阵） |
| **流** | 固定的 | 分岔、循环、人入阵中 |
| **场** | 简单 RAG、翻译、摘要 | 复杂 Agent、多步流程、人机合璧 |
| **回** | ❌ | ✅ 支持 checkpoint，可回溯/重放 |

### 12.2 阵法三要素 —— State、Node、Edge

```python
from typing import TypedDict, Annotated
import operator
from langgraph.graph import StateGraph, END

# --- State：阵法的公共内力池 ---
class 阵态(TypedDict):
    消息录: Annotated[list, operator.add]  # 消息累加
    用户之问: str
    搜得典籍: list
    最终答复: str

# --- Node：阵中守将 ---
def 搜寻典籍(state: 阵态) -> 阵态:
    query = state["用户之问"]
    # 模拟天眼之功
    results = [f"经卷一：关於'{query}'的记载...", f"经卷二：更多关於'{query}'..."]
    return {"搜得典籍": results}

def 研判典籍(state: 阵态) -> 阵态:
    results = state.get("搜得典籍", [])
    return {"消息录": [{"role": "assistant", "content": f"已研判 {len(results)} 卷经文"}]}

def 回禀(state: 阵态) -> 阵态:
    results = state.get("搜得典籍", [])
    return {"最终答复": f"据 {len(results)} 卷典籍，在下回禀：..."}

# --- 布阵 ---
graph = StateGraph(阵态)

graph.add_node("搜寻", 搜寻典籍)
graph.add_node("研判", 研判典籍)
graph.add_node("回禀", 回禀)

# 定胜负流转
graph.set_entry_point("搜寻")
graph.add_edge("搜寻", "研判")
graph.add_edge("研判", "回禀")
graph.add_edge("回禀", END)

app = graph.compile()
result = app.invoke({"用户之问": "微服务为何物？"})
print(f"最终回禀：{result['最终答复']}")
```

### 12.3 歧路阵 —— 条件分支

来者之问，**当审其性而择路应之**——不可千篇一律。

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict

class 阵态(TypedDict):
    问: str
    问类: str  # "代码", "算学", "泛泛"
    答: str

def 辨问(state: 阵态) -> 阵态:
    q = state["问"].lower()
    if any(kw in q for kw in ["代码", "code", "函数", "bug"]):
        return {"问类": "代码"}
    elif any(kw in q for kw in ["算", "数学", "+", "-", "*"]):
        return {"问类": "算学"}
    else:
        return {"问类": "泛泛"}

def 择路(state: 阵态) -> str:
    return state["问类"]

def 代码应(state: 阵态) -> 阵态:
    return {"答": f"[代码门] 已接：{state['问']}"}

def 算学应(state: 阵态) -> 阵态:
    return {"答": f"[算学门] 已接：{state['问']}"}

def 泛泛应(state: 阵态) -> 阵态:
    return {"答": f"[泛泛门] 已接：{state['问']}"}

graph = StateGraph(阵态)
graph.add_node("辨问", 辨问)
graph.add_node("代码", 代码应)
graph.add_node("算学", 算学应)
graph.add_node("泛泛", 泛泛应)

graph.set_entry_point("辨问")
graph.add_conditional_edges("辨问", 择路, {"代码": "代码", "算学": "算学", "泛泛": "泛泛"})
graph.add_edge("代码", END)
graph.add_edge("算学", END)
graph.add_edge("泛泛", END)

app = graph.compile()
print(app.invoke({"问": "帮我写一个 Python 排序函数"})["答"])
print(app.invoke({"问": "123 * 456 等於几？"})["答"])
```

### 12.4 天外飞仙 —— Human-in-the-loop

高手布阵并非无人之境——**你可随时喊停、审视、授意**，是为**人阵合一**。

```python
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from typing import TypedDict

class 阵态(TypedDict):
    代码: str
    审可: bool    # 是否通过审查
    审查批语: str

def 书代码(state: 阵态) -> 阵态:
    return {"代码": "def hello():\n    print('天地无极，乾坤借法')"}

def 人工审查(state: 阵态) -> 阵态:
    """此守将会让阵法暂停，等你发落"""
    return state

def 布阵部署(state: 阵态) -> 阵态:
    return {"审查批语": "已部署至护山大阵"}

# 布阵（带暂停点）
graph = StateGraph(阵态)
graph.add_node("书代码", 书代码)
graph.add_node("审查", 人工审查)
graph.add_node("部署", 布阵部署)

graph.set_entry_point("书代码")
graph.add_edge("书代码", "审查")
graph.add_conditional_edges(
    "审查",
    lambda s: "部署" if s.get("审可") else "书代码",
    {"部署": "部署", "书代码": "书代码"}
)
graph.add_edge("部署", END)

memory = MemorySaver()
app = graph.compile(checkpointer=memory, interrupt_before=["审查"])

# 第一回合：到"审查"这步自动停下
config = {"configurable": {"thread_id": "1"}}
result = app.invoke({"代码": ""}, config)
print(f"阵态：{result}")  # 代码已生，等汝旨意

# 你批准了，阵法继续
app.update_state(config, {"审可": True})
result = app.invoke(None, config)
print(f"终态：{result}")
```

### 12.5 大阵演练 —— Agent + LangGraph

```python
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool

@tool
def 查阅宗门典(query: str) -> str:
    """查阅本宗内部典籍"""
    kb = {
        "退银": "退银之规：入七日可退，无需问由，寻掌柜即可",
        "发镖": "发镖之规：下单后十二时辰内发出，顺丰镖局承运",
        "质保": "质保之规：主机保二年，配件保六月",
    }
    for k, v in kb.items():
        if k in query:
            return v
    return f"遍查宗门典，未尝见关於'{query}'的铭文"

llm = ChatOpenAI(model="gpt-4o")

agent = create_react_agent(
    llm,
    tools=[查阅宗门典],
    state_modifier="你乃本宗知客僧。凡答宗门之规，必先以查阅宗门典确证。"
)

# 开启记忆（阵法不散）
记忆 = MemorySaver()
agent_with_memory = agent.with_config({"configurable": {"thread_id": "香客-001"}})

# 连续过招
for question in [
    "在下欲退银，贵宗何规？",
    "镖何时可至？",
    "方才我问的什么来着？",  # 能记住前情！
]:
    print(f"\n香客：{question}")
    result = agent_with_memory.invoke({
        "messages": [{"role": "user", "content": question}]
    })
    print(f"知客：{result['messages'][-1].content}")
```

---

## 附录：江湖救急

### 甲、常见走火入魔与应对

#### 走火一：`ImportError: No module named 'langchain.xxx'`

```bash
# LangChain 按功夫分包，缺啥补啥
pip install langchain langchain-core langchain-community
pip install langchain-openai       # OpenAI 宗
pip install langchain-anthropic    # Claude 宗
pip install langchain-text-splitters  # 分筋错骨手
pip install langgraph              # 阵法堂
```

#### 走火二：API 令牌不灵

```python
import os
print(os.getenv("OPENAI_API_KEY"))  # 当打印你的令牌

llm = ChatOpenAI(model="gpt-4o-mini", api_key="sk-...")  # 或显授令牌
```

#### 走火三：真气溢出（Token 超限）

```python
# "This model's maximum context length is ..."
# 解救之道：
# 1. 减小 chunk_size
# 2. 用 ConversationSummaryMemory 替代 BufferMemory
# 3. 长文先摘要、再检索

# 出招前预诊
from langchain_openai import ChatOpenAI
llm = ChatOpenAI(model="gpt-4o-mini")
print(f"真气预估：{llm.get_num_tokens('你的经文...')} 点")
```

#### 走火四：Agent 不祭神兵 / 祭错神兵

```python
# Agent 靠 docstring 识别神兵用途
# ✅ 佳
@tool
def 阅卷(user_id: int) -> str:
    """凭用户编号，调取此人的宗卷（姓名、邮箱、入门之期）"""
    ...

# ❌ 劣（描述不清，高手不知此兵何用）
@tool
def 阅卷(user_id: int) -> str:
    """阅卷"""
    ...
```

### 乙、武道院荐录

| 典藏 | 去向 | 所述 |
|---|---|---|
| LangChain 正统典 | https://python.langchain.com | 最权威的 API 总纲 |
| LangChain 武道院 | https://academy.langchain.com | 官方不传之秘 |
| LangGraph 阵法典 | https://langchain-ai.github.io/langgraph/ | 阵法与 Agent之道 |
| LangSmith 天眼 | https://smith.langchain.com | 监察追踪之宝 |
| LCEL 速查谱 | https://python.langchain.com/docs/how_to/ | 常见功法速查 |

### 丙、江湖年表（版本）

```python
# 推荐的功法组合（丙午年·2026年六月）
# langchain >= 0.3.0
# langchain-core >= 0.3.0
# langchain-openai >= 0.2.0
# langgraph >= 0.2.0
# chromadb >= 0.5.0
# pydantic >= 2.0

import langchain, langchain_core, langchain_openai, langgraph
print(f"langchain：{langchain.__version__}")
print(f"langchain-core：{langchain_core.__version__}")
print(f"langchain-openai：{langchain_openai.__version__}")
print(f"langgraph：{langgraph.__version__}")
```

### 丁、速查谱 —— 囊中秘笈

```python
# ===== 最常用的运功法门 =====
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableParallel, RunnableBranch
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage

# ===== 最常见的布阵方式 =====
# 基础链
chain = 口诀 | 宗师 | StrOutputParser()

# 天眼通链（RAG）
chain = (
    {"典籍": 天眼 | 编排, "问": RunnablePassthrough()}
    | 口诀 | 宗师 | StrOutputParser()
)

# 并行链
chain = RunnableParallel(左路=链1, 右路=链2)

# 高手入阵（Agent）
agent = create_react_agent(宗师, 神兵列表)

# 歧路链
chain = RunnableBranch(
    (条件1, 链1),
    (条件2, 链2),
    默认链,
)
```

---

> **秘籍撰于**：丙午年·丙午月·初一（2026-06-02）
> **适用功法版本**：LangChain 0.3.x / LangGraph 0.2.x / langchain-openai 0.2.x
>
> *天下功夫，唯快不破。然武道之巅，非唯快而已——**明其理、知其势、驭其器**，方为大家。*
>
> *愿君持此秘籍，闯荡 AI 江湖，终成一代宗师。*
