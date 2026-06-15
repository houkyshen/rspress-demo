# AI Agent 工程师修炼手册：双雄传

> 这是一个关于两个人的故事。一个写代码写了五年，一个推公式推了半辈子。他们都想成为 AI Agent 工程师，但他们走的路完全不同。
>
> 本手册记录了他们各自的修行之路——包括踩过的坑、打过的 BOSS、以及那位神秘的客栈老板给他们的忠告。

---

## 目录

- [引子：Agent客栈](#引子agent客栈)
- [角色介绍](#角色介绍)
- [路线总览：两条通往宗师的道路](#路线总览两条通往宗师的道路)
- [开发路线：陈小码的修行](#开发路线陈小码的修行)
  - [Lv.1-5 初入江湖 —— 你连 Token 都不懂](#lv1-5-初入江湖--你连-token-都不懂)
  - [Lv.6-10 心法初成 —— Prompt 不是聊天](#lv6-10-心法初成--prompt-不是聊天)
  - [Lv.11-15 神兵在手 —— Agent 觉醒](#lv11-15-神兵在手--agent-觉醒)
  - [Lv.16-20 大阵布设 —— RAG + 生产化](#lv16-20-大阵布设--rag--生产化)
  - [Lv.21-25 宗师之境 —— 企业级 Agent 架构](#lv21-25-宗师之境--企业级-agent-架构)
- [算法路线：林小算的修行](#算法路线林小算的修行)
  - [Lv.1-5 数学迷宫 —— Transformer 到底是个啥](#lv1-5-数学迷宫--transformer-到底是个啥)
  - [Lv.6-10 微调秘境 —— 让模型听话](#lv6-10-微调秘境--让模型听话)
  - [Lv.11-15 对齐深渊 —— RLHF 与 DPO](#lv11-15-对齐深渊--rlhf-与-dpo)
  - [Lv.16-20 推理殿堂 —— 让模型更聪明](#lv16-20-推理殿堂--让模型更聪明)
  - [Lv.21-25 前沿之巅 —— 自主 Agent 研究](#lv21-25-前沿之巅--自主-agent-研究)
- [交叉点：他们帮了彼此什么](#交叉点他们帮了彼此什么)
- [终章：双雄会师](#终章双雄会师)
- [附录：修行资源库](#附录修行资源库)

---

## 引子：Agent客栈

从前有座山，山里有朵云，云上有一家客栈。

客栈没有招牌，但江湖上的人都知道它叫 **"Agent客栈"**。在这里，全栈工程师和算法研究员坐在同一张桌子上吃饭——**然后互相觉得对方是傻子**。

"你连反向传播都不会写？"算法研究员说。

"你连 Docker 都没用过？"工程师回敬。

客栈老板**墨老**——一个据说在大厂、创业公司、学术界都混过的神秘老头——总是在这种时候端上一壶茶，慢悠悠地说：

**"你俩走的是同一条路，只是从两头往中间挖而已。"**

凡入客栈者，需先选一条路，修到尽头方知——

---

## 角色介绍

| | 陈小码 | 林小算 |
|---|---|---|
| **花名** | 码哥 | 算姐 |
| **出身** | 全栈工程师，五年搬砖经验 | 数学系博士退学，理论功底扎实 |
| **绝活** | React 能写二十种状态管理方案 | 手推 Transformer 注意力公式不用草稿 |
| **短板** | 看到数学公式就想睡觉 | 看到 YAML 配置文件就头疼 |
| **目标** | AI Agent 开发工程师 | AI Agent 算法工程师 |
| **格言** | "能跑就行。" | "能证就行。" |
| **致命伤** | 习惯把 LLM 当普通 API 调 | 习惯把工程问题当数学题解 |

> **墨老点评**："一个太工程，一个太理论。一个需要学'为什么'，一个需要学'怎么做'。"
>
> "刚好——客栈只有两条修炼路线。"

---

## 路线总览：两条通往宗师的道路

```
                     ┌──────────────────────────┐
                     │     AI Agent 工程师       │
                     │   （终极目标：能设计、     │
                     │    实现、优化 Agent 系统） │
                     └──────────────────────────┘
                          ▲                ▲
                          │                │
          ┌───────────────┘                └───────────────┐
          │                                                │
┌─────────┴─────────┐                          ┌──────────┴─────────┐
│   开发路线（码哥）  │                          │  算法路线（算姐）    │
│  关键词：         │                          │  关键词：           │
│  工程·框架·系统   │                          │  数学·训练·优化     │
├───────────────────┤                          ├────────────────────┤
│ Lv.21-25 企业架构  │                          │ Lv.21-25 前沿研究   │
│ Lv.16-20 RAG+生产化│                          │ Lv.16-20 推理优化   │
│ Lv.11-15 Agent觉醒 │    ←── 交叉互助 ──→     │ Lv.11-15 RLHF/DPO  │
│ Lv.6-10  Prompt心法│                          │ Lv.6-10  微调秘境   │
│ Lv.1-5   LLM基础   │                          │ Lv.1-5   数学迷宫   │
└───────────────────┘                          └────────────────────┘
```

> **墨老**："路线不同，终点相同。而且——你们在 Lv.11-15 的时候，会互相救对方一命。到时候你就知道了。"

---

## 开发路线：陈小码的修行

### Lv.1-5 初入江湖 —— 你连 Token 都不懂

#### 剧情

陈小码走进 Agent 客栈的第一天，墨老递给他一道题：

> "用你熟悉的任何方式，调用 GPT-4，让它回答'什么是 Token？'。不准查文档。"

陈小码心想：这有什么难的？他抓起 curl 就写——

```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{"model": "gpt-4o", "messages": [{"role": "user", "content": "啥是Token？"}]}'
```

五秒钟后回来一个 JSON。陈小码得意地看向墨老。

墨老面无表情："现在，让同一个模型**记住上一轮你问了什么，并在第二轮叫你名字**。"

陈小码愣住。他盯着那个无状态的 HTTP POST——突然明白了。

**LLM 是无状态的。每一轮都是独立的。它不记得你。**

"这就是 AI Agent 工程和普通后端开发的第一个区别，"墨老说，"你以前的 API：有数据库、有 Session、有 Cookie。**LLM API：什么都没有。所有记忆都得你自己造。**"

#### 该阶段修炼清单

| 技能 | 关键词 | 修炼时间 |
|---|---|---|
| LLM 基础认知 | Token/上下文窗口/Temperature/Top-P | 3天 |
| API 调用基础 | Chat Completion API / Streaming / 多轮消息拼接 | 3天 |
| 消息协议 | SystemMessage / HumanMessage / AIMessage / ToolMessage | 2天 |
| Token 计量 | tiktoken / Token 计数 / 成本估算 | 2天 |
| 错误处理 | 重试 / 超时 / 限流 / Fallback | 3天 |
| **阶段项目** | 做一个有记忆的命令行聊天机器人 | 3天 |

#### 核心功法

```python
# 功法一：消息管理 —— 记忆是你自己搭的
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage

class 对话管理器:
    """码哥的第一个发明：把无状态的 LLM 包装成有状态的服务"""

    def __init__(self, llm, 系统提示词=""):
        self.llm = llm
        self.消息列表 = []
        if 系统提示词:
            self.消息列表.append(SystemMessage(content=系统提示词))

    def 发消息(self, 用户输入: str) -> str:
        self.消息列表.append(HumanMessage(content=用户输入))

        # ⚠️ 关键：每次把完整的消息历史发给 LLM
        # Token 消耗 = 历史消息总和 + 本次输出
        response = self.llm.invoke(self.消息列表)
        self.消息列表.append(response)
        return response.content

    def 记忆压缩(self):
        """当消息太长时，把旧消息压缩成摘要"""
        # 这便是 Lv.6+ 才会学到的功夫...
        pass
```

```python
# 功法二：Token 严格计量 —— 你花的每一分钱都要算清楚
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini")
token_count = llm.get_num_tokens("什么是 Token？")
print(f"这条消息将消耗约 {token_count} tokens")

# 成本速算：
# GPT-4o:        input $2.50/1M tokens, output $10/1M tokens
# GPT-4o-mini:   input $0.15/1M tokens, output $0.60/1M tokens
# Claude Sonnet: input $3/1M tokens,   output $15/1M tokens
# 一条"你好"约 2 tokens，但加上系统提示词 + 历史，轻松上千
```

#### Boss 战：**「令牌黑洞」**

**现象**：你的聊天机器人在第 50 轮对话时突然报错 `context_length_exceeded`。

**原因**：你没做任何记忆管理，50 轮历史全部塞进上下文——模型的上下文窗口被你撑爆了。

**过关条件**：
- 实现一个 Token 计数器，在接近窗口上限前发出警告
- 实现三种以上的记忆策略（窗口截断 / 摘要压缩 / Token限制）
- 测试：连续对话 200 轮不死

> **墨老忠告**："Token 是你的钱，上下文窗口是你的货箱。新手只知道往箱子里塞，老手知道什么时候该扔。"

---

### Lv.6-10 心法初成 —— Prompt 不是聊天

#### 剧情

陈小码进了客栈一个月。他的聊天机器人能跑，但有个致命问题——**时灵时不灵**。

客户问："我的订单什么时候到？"

他写的是：`"查询订单 {order_id} 的状态"`

但 LLM 有时候返回 JSON，有时候返回一段散文，有时候开头先来一句"您好！我很乐意帮您查询……"然后再给数据。

"你的 Prompt 写得太随便了，"墨老端着一碟花生米路过，"你以为你在跟人说话。但 LLM 不是人——**它是一台'下一个词预测机'。没有格式约束，它就会自由发挥。**"

```python
# ❌ 码哥原先的 Prompt——太"人性化"了
prompt = f"帮我查一下订单 {order_id} 的状态，谢谢！"

# ✅ 墨老改过的 Prompt——像写 API 文档一样精确
prompt = """你是一个订单查询系统。规则如下：
1. 只返回 JSON，不要任何其他文字
2. JSON 格式：{"status": "已发货"|"处理中"|"已签收", "eta": "预计日期"}
3. 如果订单号不存在，返回 {"error": "订单不存在"}
4. 不要添加问候语、不要道歉、不要闲聊

订单号：{order_id}
"""
```

陈小码盯着这两个 Prompt 看了三分钟。"第一个是我平常跟同事 Slack 上说话的语气。第二个是我写 API 文档的语气。"

"对。"墨老说，"**Prompt Engineering 的本质不是'聊天技巧'，是'接口设计'。**"

#### 该阶段修炼清单

| 技能 | 关键词 | 修炼时间 |
|---|---|---|
| Prompt 设计原理 | System Prompt / Few-shot / Chain of Thought | 4天 |
| 结构化输出 | PydanticOutputParser / JSON Mode / Function Calling | 3天 |
| 提示词模板化 | ChatPromptTemplate / Pipeline Prompt / Partial Variables | 2天 |
| LCEL 入门 | Runnable 协议 / `\|` 管道符 / RunnablePassthrough | 4天 |
| 输出解析 | StrOutputParser / JsonOutputParser / 自定义 Parser | 2天 |
| **阶段项目** | 做一个结构化信息提取器（合同→JSON / 对话→实体） | 4天 |

#### 核心功法

```python
# 功法三：结构化输出 —— 让 LLM 吐 JSON 而不是散文
from langchain_core.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field
from enum import Enum

class 物流状态(str, Enum):
    已揽收 = "已揽收"
    运输中 = "运输中"
    派送中 = "派送中"
    已签收 = "已签收"

class 订单信息(BaseModel):
    订单号: str = Field(description="订单编号")
    状态: 物流状态 = Field(description="当前物流状态")
    预计送达: str = Field(description="预计送达日期，格式 YYYY-MM-DD")
    快递公司: str = Field(description="承运快递公司名称")

parser = PydanticOutputParser(pydantic_object=订单信息)

# 让 LLM 看到它需要输出什么结构
系统提示 = f"""你是物流查询助手。根据用户提供的订单号，返回物流状态。
{parser.get_format_instructions()}
只返回 JSON，不要添加任何解释。"""

链 = (
    ChatPromptTemplate.from_messages([
        ("system", 系统提示),
        ("human", "查询订单 {order_id}"),
    ])
    | ChatOpenAI(model="gpt-4o-mini", temperature=0)  # temperature=0 防自由发挥
    | parser  # 自动解析成 Pydantic 对象
)

result: 订单信息 = 链.invoke({"order_id": "SF1234567890"})
print(f"状态：{result.状态.value}，预计 {result.预计送达} 到达")
# 类型安全！IDE 有自动补全！不用正则匹配 JSON！
```

```python
# 功法四：LCEL 思维 —— 链式设计如同管道
from langchain_core.runnables import RunnablePassthrough, RunnableParallel

# 把 LLM 调用当成 Unix 管道来设计
# 数据从左流到右，每一步都可以观察、插入、分叉

分析链 = (
    {
        "原文": RunnablePassthrough(),
        "长度": lambda x: len(x),
    }
    | RunnableParallel(
        摘要=摘要链,
        关键词提取=关键词链,
        情感分析=情感链,
    )
    # 三步并行执行，结果合并为一个 dict
)
```

#### Boss 战：**「格式幽灵」**

**现象**：你的 LLM 95% 的时候返回正确的 JSON，5% 的时候突然在 JSON 前面加了一句 "好的，查询结果如下："。

**原因**：temperature > 0 时，LLM 有概率"自由发挥"。你用 `StrOutputParser` 而不是 `PydanticOutputParser`，没有任何结构性约束。

**过关条件**：
- 用 PydanticOutputParser 替代所有字符串正则匹配
- 加入 retry 机制：解析失败 → 把错误信息喂回 LLM → 让它自我修正
- 在测试集中跑 1000 次，结构化输出成功率 > 99.5%

> **墨老忠告**："LLM 不是确定性系统。以为它每次都乖乖听话，是新手最大的幻觉。老手知道：**所有的 LLM 输出都要经过一层'防抖'。**"

---

### Lv.11-15 神兵在手 —— Agent 觉醒

#### 剧情

陈小码升到了 Lv.11。墨老给他开了一门新课：**Agent**。

"你以为你一直在调 API？"墨老说，"其实你只是在**指挥一个人**。现在，你要**造一个人**——一个能自己决定用什么工具、以什么顺序、什么时候该停的人。"

第一堂课，墨老让陈小码写一个 Agent——能查天气、能算数、能搜网页。陈小码照旧撸起袖子——

五分钟后。

"它在死循环。"陈小码盯着终端。

```
第1轮：调用 查天气(北京) → 晴
第2轮：调用 查天气(北京) → 晴
第3轮：调用 查天气(北京) → 晴
第4轮：调用 查天气(北京) → 晴
...
第47轮：调用 查天气(北京) → 晴
```

"它为什么不停？！"陈小码崩溃。

墨老慢悠悠地说："因为你没告诉它——**什么时候算'够了'**。"

"Agent 就像雇了一个勤奋的实习生——你给一个模糊的目标，它会用最笨的方法把它跑到死。你要设定**边界条件**和**停止规则**。"

#### 该阶段修炼清单

| 技能 | 关键词 | 修炼时间 |
|---|---|---|
| Tool 设计与描述 | @tool 装饰器 / docstring 工程 / args_schema | 3天 |
| Agent 架构理解 | ReAct / Plan-Execute / Tool Calling / Multi-Agent | 4天 |
| LangGraph 实战 | StateGraph / Node / Edge / Conditional Edge | 5天 |
| Agent 调试与约束 | max_iterations / 错误处理 / 内视(Callbacks) | 3天 |
| Human-in-the-loop | interrupt_before / checkpoint / 人工审批节点 | 3天 |
| **阶段项目** | 做一个自动客服 Agent（查订单+查物流+退货+转人工） | 5天 |

#### 核心功法

```python
# 功法五：Agent 约束术 —— 给实习生立规矩
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver

# 规矩一：神兵描述必须精确如合同
@tool
def 查物流(运单号: str) -> str:
    """查询快递运单的当前状态和位置。

    此工具仅用于**已发出的快递**。
    如果运单号在系统中不存在，说明此单尚未录入或已过期。
    不要对同一个运单号重复查询超过一次。
    """
    # ...

# 规矩二：定场诗就是 Agent 的宪法
定场诗 = """你是客服 Agent。你的行为规则如下：
1. 每个工具在同一轮会话中最多调用一次
2. 如果连续两轮没有获取新信息，直接向用户报告当前已知信息
3. 如果用户的问题超出你的能力范围（需要人工处理），立即建议转人工
4. 绝不要假装成功了——如果工具返回了错误，如实告诉用户
"""

# 规矩三：限制 + 检查点
agent = create_react_agent(
    llm,
    tools=[查物流, 查订单, 发起退款, 转人工],
    state_modifier=定场诗,
)
# 关键配置：max_iterations（防死循环）+ checkpoint（防状态丢失）
```

```python
# 功法六：Tool 设计哲学 —— 工具不是越强越好，是越明确越好
# ❌ 坏的 Tool：功能含糊，Agent 不知道啥时候用
@tool
def 处理请求(request: str) -> str:
    """处理用户请求"""
    ...

# ✅ 好的 Tool：功能单一，边界清晰，描述详尽
@tool
def 查询订单状态(订单号: str) -> str:
    """根据订单号查询订单的当前处理状态（待付款/已付款/已发货/已签收）。
    参数：订单号 —— 16位数字字符串。
    返回：JSON格式的状态信息。
    限制：只能查询最近90天内的订单。
    """
    ...
```

#### Boss 战：**「失控的实习生」**

**现象**：Agent 在面对复杂问题时，表现出三种失控症状——
- **死循环**：来回调用同一个工具不停
- **幻觉调用**：编造工具返回值，跳过真实调用
- **过度自信**：用错误信息推导出更错误的结论，然后信心满满地呈现

**过关条件**：
- 设计一套测试用例（20+ 个边缘场景），Agent 全部通过
- 加入 Callbacks 实时监控，能在第 5 轮时检测到循环并报警
- 实现 Human-in-the-loop：关键操作（退款、删除）必须人工审批

> **墨老忠告**："好的 Agent 设计不是让 AI 更自由——是让 AI **在笼子里自由**。笼子越大，越需要结实的栏杆。"

---

### Lv.16-20 大阵布设 —— RAG + 生产化

#### 剧情

Lv.16。客栈来了一位新客人——**苏苏**，一个专做 AI 系统评测的独立顾问。墨老让她来检验陈小码的 Agent。

苏苏笑眯眯地输入一个问题："客服小姑娘什么时候来上班？"

陈小码的 Agent 查询了知识库，返回——

> "本店客服工作时间：周一至周五 9:00-18:00，周末休息。"

苏苏："再来一个——'你们店在哪？我找不到。'"

Agent 返回：

> "本店地址：北京市朝阳区望京 SOHO T3 15层。地铁15号线望京站 A 口出。"

"还行嘛——"陈小码话没说完，苏苏又输入：

> "你们店里卖的那个蓝色的、可以折叠的、上次我朋友买过说很好用的那个东西，现在还有货吗？"

Agent 崩溃了。它检索到了"蓝色"→返回了蓝色钢笔的介绍；检索到了"折叠"→返回了折叠椅的介绍；检索到了"朋友"→返回了会员推荐规则。

**完全牛头不对马嘴。**

"这就是 RAG 最经典的坑："苏苏说，"**用户说的话不是给机器听的**。用户会说模糊的自然语言，但你的检索系统只能理解精确的关键词匹配。"

#### 该阶段修炼清单

| 技能 | 关键词 | 修炼时间 |
|---|---|---|
| RAG 全链路 | Loader→Splitter→Embedding→VectorStore→Retriever | 5天 |
| 高级检索策略 | Multi-Query / Self-Query / Hybrid Search / Rerank | 4天 |
| Chunk 工程 | Chunk Size 调优 / 语义分割 / 元数据策略 | 3天 |
| 生产化部署 | FastAPI+LangServe / 流式 / 缓存 / 限流 | 4天 |
| 监控与降级 | LangSmith / 自定义 Metrics / 降级策略 / 报警 | 3天 |
| **阶段项目** | 企业级 RAG 系统（万级文档+毫秒检索+99.9%可用） | 5天 |

#### 核心功法

```python
# 功法七：RAG 全链路 —— 每一环都要打磨
# 陈小码的 RAG 优化 checklist：
#
# □ Chunk Size：从 2000 → 500。小了精准但缺上下文，大了有上下文但噪音多。
#   黄金法则：先试 500-800，再根据检索效果微调。
#
# □ Embedding 选型：text-embedding-3-small（便宜） vs large（精准）。
#   千万级文档 → large。百级文档 → small 足够。
#
# □ 检索策略：Similarity（快）→ MMR（多样）→ Multi-Query（覆盖）→ Rerank（精准）。
#   你可以四者都用！
#
# □ 元数据过滤：不是所有问题都要全文检索。加标签、日期、类别，预筛80%噪音。

from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor
from langchain.retrievers.multi_query import MultiQueryRetriever

# 多角度检索 + 结果重排 = RAG 的终极形态
基础检索器 = vectorstore.as_retriever(search_kwargs={"k": 20})
多角度 = MultiQueryRetriever.from_llm(retriever=基础检索器, llm=llm)
重排器 = LLMChainExtractor.from_llm(ChatOpenAI(model="gpt-4o-mini"))
终极检索 = ContextualCompressionRetriever(base_compressor=重排器, base_retriever=多角度)
# 取20条 → LLM从多角度查 → LLM再精炼 → 返回最相关的3条
```

```python
# 功法八：生产化部署 —— 从"能跑"到"能扛"
# 生产级 RAG 系统 = 你的 RAG 链 + 以下所有：

# 1. 缓存层：同一问题不重复检索+生成
from langchain.cache import RedisCache

# 2. 限流：不管 Agent 怎么发疯，每秒最多 N 次 API 调用
from langchain_core.callbacks import BaseCallbackHandler
import time

class 限流官(BaseCallbackHandler):
    def __init__(self, 每秒上限=10):
        self.调用记录 = []
        self.上限 = 每秒上限

    def on_llm_start(self, *args, **kwargs):
        当前 = time.time()
        self.调用记录 = [t for t in self.调用记录 if 当前 - t < 1.0]
        if len(self.调用记录) >= self.上限:
            time.sleep(0.5)  # 简单粗暴：睡一会儿
        self.调用记录.append(当前)

# 3. 降级策略：
#    - 主模型(GPT-4o)挂了 → 备用模型(GPT-4o-mini)
#    - 向量数据库挂了 → 跳过检索，直接回答"系统维护中"
#    - LLM 超时 → 返回缓存结果或上次成功的结果

# 4. 监控面板（非代码，但要配）：
#    - 每小时 Token 消耗曲线
#    - 检索命中率（用户问题 vs 检索结果的相似度）
#    - Agent 平均回合数（异常飙升 = 可能死循环）
#    - 用户反馈统计（👍 / 👎 比例突变 = 可能是模型升级了或某组件挂了）
```

#### Boss 战：**「双十一洪流」**

**现象**：你的 RAG 系统平时表现完美。双十一当天，流量暴涨 50 倍——检索延迟从 200ms 飙到 5s，LLM 调用排队排到了隔壁街道，用户收到了"服务器繁忙"。

**过关条件**：
- 全链路延迟 P99 < 2s（50 倍流量下）
- 实现三层缓存（内存→Redis→源检索），命中率 > 80%
- 降级策略生效：高峰期自动切换更小的模型+更窄的检索范围
- 零宕机运行 48 小时

> **墨老忠告**："开发者最容易犯的错误：在笔记本上测通了，就觉得'行了'。生产环境会教它重新做人的，我见过太多了。"

---

### Lv.21-25 宗师之境 —— 企业级 Agent 架构

#### 剧情

在客栈的最后一段修行。陈小码已经不再是当初那个把 LLM 当 REST API 调的小白了。

墨老给他出了最后一道题：**设计一套能支撑 100 万用户的 Multi-Agent 系统架构。**

陈小码在客栈的墙上画了一夜——

```
用户 → 路由 Agent（意图识别+分流）
         ├→ 客服 Agent（FAQ + RAG + 退款/退货）
         ├→ 推荐 Agent（个性化推荐 + A/B测试）
         ├→ 订单 Agent（创建+查询+修改）
         └→ 人工座席（Human-in-the-loop）
              ↑
         所有 Agent 都连着：
         - 共享记忆层（Redis + Vector Store）
         - 统一工具注册中心（MCP Server）
         - 中央监控面板（LangSmith）
         - 权限控制网关
```

墨老看了一遍，递给陈小舟一块令牌：「你出师了。」

#### 该阶段修炼清单

| 技能 | 关键词 | 修炼时间 |
|---|---|---|
| Multi-Agent 架构 | 路由 Agent / 协作 Agent / 层级 Agent | 5天 |
| Agent 通信协议 | MCP / A2A / 消息队列 / 事件总线 | 3天 |
| 企业级安全 | 权限模型 / 数据隔离 / 审计日志 / PII 脱敏 | 3天 |
| 成本优化体系 | 模型分层 / 动态路由 / 预算告警 | 2天 |
| CICD for Agent | 评测即上线 / Canary 发布 / 回滚策略 | 3天 |
| **终级项目** | 开源一个你做的 Agent 框架 / 写一篇架构分享 | ∞ |

```python
# 功法九：Multi-Agent 架构 —— 不是把 Agent 堆一起，是各司其职
# 好的 Multi-Agent 架构像一个公司：
#   CEO Agent（路由）—— 不干活，只分活
#   客服 Agent —— 专注FAQ和简单操作
#   专家 Agent —— 处理复杂问题，可以调用更多工具
#   审核 Agent —— 检查其他 Agent 的输出，防止幻觉

# 坏的 Multi-Agent 架构：
#   所有 Agent 都能干所有事 → 互相冲突 → 系统崩溃
```

> **宗师心法**：Lv.21 以后的修行，不再是学新工具——而是**设计约束**。好的 Agent 系统不是"它能做多少"，而是"它不能做什么、做了之后怎么兜底"。

---

## 算法路线：林小算的修行

### Lv.1-5 数学迷宫 —— Transformer 到底是个啥

#### 剧情

林小算第一天进客栈的时候，是带着论文来的。

墨老给了她一道和码哥一模一样的题：「用 GPT-4 回答'什么是 Token？'。」

算姐花了五分钟写代码，花了 **两个小时** 读 Attention 机制的源码和原始论文《Attention Is All You Need》。

"Token 是文本切分后的最小单元，经过 Tokenizer 转为整数索引，再通过 Embedding 层映射为稠密向量——"

"停。"墨老打断她。"你代码已经跑通了。但你知道你刚才浪费了两个小时吗？"

算姐不服：「我理解了原理——」

"理解原理是好事。但在这个阶段，**你不需要能推导完整的注意力机制才能用好 LLM**。就像你不需要懂热力学才能开车。"

算姐沉默了。她太习惯"理解每个细节"了。

"算法路线的第一阶段——"墨老说，"不是让你从头实现 Transformer。是让你**站在巨人的肩膀上，先看全景。**"

#### 该阶段修炼清单

| 技能 | 关键词 | 修炼时间 |
|---|---|---|
| NLP 速通 | Tokenization / Embedding / BPE / WordPiece | 3天 |
| Transformer 全景 | 注意力（QKV）/ 位置编码 / 残差连接 / LayerNorm | 5天 |
| GPT 系架构 | Decoder-only / 自回归 / 下一个token预测 / Causal Mask | 3天 |
| 动手实践 | NanoGPT / 从头训练一个小模型（字符级） | 5天 |
| 提示词工程入门 | 算法工程师也需要会写 Prompt | 2天 |
| **阶段项目** | 用 NanoGPT 在自己的语料上训练一个迷你 LLM | 5天 |

#### 核心功法

```python
# 功法一（算版）：别从头造轮子 —— 先拆一个看看
# 推荐：Andrej Karpathy 的 NanoGPT
# git clone https://github.com/karpathy/nanoGPT
# 
# 算姐的 Notebook 第一页：
# 1. 跑通训练（别改任何参数） → 见证一个 10M 参数的模型在你的 GPU 上诞生
# 2. 修改词汇量 → 观察 loss 变化
# 3. 减少层数 → 观察生成质量
# 4. 换自己的语料 → 看看模型学会了什么

import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

# 第一步：加载一个现成的模型，拆开看
model_name = "meta-llama/Llama-3.2-1B"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# 观察：这个模型有多少层？每层有什么？
for name, module in model.named_modules():
    if "attention" in name.lower():
        print(f"{name}: {module.__class__.__name__}")
# 输出让你看到 Attention 的真实结构
```

```python
# 功法二（算版）：注意力机制的数学直觉
# Q（Query）："我现在在做什么？"
# K（Key）：  "每个位置有什么信息？"
# V（Value）："每个位置的实际内容是什么？"
# 
# Attention(Q, K, V) = softmax(QK^T / √d_k) V
# 
# 直觉：对于当前位置 Q，计算它与所有位置 K 的相似度，
# 然后用这个相似度作为权重，对所有位置的内容 V 做加权平均。
# √d_k 是用来防梯度消失的缩放因子。

# 代码直觉（不要求手写，但要能读懂）：
import torch.nn.functional as F

def attention(Q, K, V, mask=None):
    d_k = Q.size(-1)
    scores = Q @ K.transpose(-2, -1) / (d_k ** 0.5)  # (batch, heads, seq, seq)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
    attn_weights = F.softmax(scores, dim=-1)
    return attn_weights @ V, attn_weights
```

#### Boss 战：**「公式迷宫」**

**现象**：花了两周死磕 Attention 公式推导，结果连一个实际的模型都没跑过。

**过关条件**：
- 能用自己的话（不用公式）解释 Attention 在做什么
- 成功跑通 NanoGPT 训练，获得第一个 loss 曲线
- 能说出至少 3 个影响模型性能的关键超参数（学习率、batch size、层数、head数）
- 在测试集上生成一段"看起来像人话"的文本

> **墨老忠告**："算法工程师最容易掉进的陷阱：以为看完论文就等于理解了。**看论文 + 看代码 + 自己跑一遍 = 三个完全不同的理解层次。**"

---

### Lv.6-10 微调秘境 —— 让模型听话

#### 剧情

算姐走进了一间四面都是 GPU 服务器的房间。墨老站在门口：「现在，你来让一个模型学会特定领域的知识。」

「比如？」

「让 Llama-3.2-1B 成为一个**AI Agent 领域的专家**——精通 Tool Calling、RAG、Multi-Agent 架构的一切。」

算姐开始准备自己的训练数据。她把能找到的 AI Agent 论文、博客、文档全部收集起来——约 5000 篇文本。

然后她遇到了第一个真正的工程问题：**怎么把这些数据喂给模型？**

「你不会以为直接把 PDF 扔进去就行吧？」墨老在门口探头。

算姐的微调修行由此开始。

#### 该阶段修炼清单

| 技能 | 关键词 | 修炼时间 |
|---|---|---|
| 数据工程 | 数据清洗 / 格式标准化 / 质量过滤 / 去重 | 4天 |
| 指令微调 (SFT) | Prompt模板 / 多轮对话格式 / ChatML | 4天 |
| LoRA/QLoRA | 低秩适配 / 量化 / 显存优化 | 5天 |
| 训练实操 | DeepSpeed / FSDP / 梯度累积 / 混合精度 | 4天 |
| 评估体系 | Perplexity / Benchmark / 人工评估 | 3天 |
| **阶段项目** | 用 QLoRA 把 Llama-3.2-1B 微调成你的专属 Agent 模型 | 7天 |

#### 核心功法

```python
# 功法三（算版）：数据工程 —— 微调真正的瓶颈
# 算姐血的教训：数据质量 > 数据数量 > 模型大小 > 训练技巧

# 数据清洗 pipeline
def 数据清洗流程():
    # 1. 去重：MinHash / SimHash / 简单 n-gram 去重
    # 2. 去噪：删 HTML标签、删过短文本(<50字)、删非目标语言
    # 3. 格式标准化：全部转成 ChatML 或 ShareGPT 格式
    # 4. 质量筛选：用一个小模型评分，低于阈值的扔掉
    # 5. 隐私脱敏：替换手机号、邮箱、身份证号
    pass

# 好的训练数据长这样：
训练数据示例 = {
    "messages": [
        {"role": "system", "content": "你是 AI Agent 专家助手。"},
        {"role": "user", "content": "Tool Calling 和 Function Calling 有什么区别？"},
        {"role": "assistant", "content": "本质上是一回事。Tool Calling 是更通用的术语，Function Calling 是 OpenAI 的具体实现..."}
    ]
}
```

```python
# 功法四（算版）：QLoRA 微调 —— 消费级显卡也能微调 7B 模型
from transformers import (
    AutoModelForCausalLM, AutoTokenizer,
    BitsAndBytesConfig, TrainingArguments
)
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from datasets import load_dataset
import torch

# 1. 量化加载（4bit，省显存）
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.2-1B",
    quantization_config=bnb_config,
    device_map="auto",
)

# 2. LoRA 配置（只训练极少参数）
lora_config = LoraConfig(
    r=16,               # rank：越大越精确但越慢
    lora_alpha=32,      # 缩放因子
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],  # 对注意力层下手
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM",
)

model = prepare_model_for_kbit_training(model)
model = get_peft_model(model, lora_config)

# 3. 只训练了原模型 0.1% 的参数！
model.print_trainable_parameters()
# trainable params: 2,359,296 || all params: 1,235,578,880 || trainable%: 0.19
```

#### Boss 战：**「灾难性遗忘」**

**现象**：你的模型在 Agent 领域问答变得很牛——但它忘了怎么做数学了。以前能算 123×456，现在算成了 56789。

**原因**：微调数据全是 Agent 领域，覆盖了模型原有的通用能力。

**过关条件**：
- 微调数据中包含 10-15% 的通用数据（数学、推理、常识）
- 在 Agent 领域 benchmark 和通用 benchmark 上同时保持 > 90% 原水平
- 找到最适合你的 LoRA rank（r 值）：太小欠拟合，太大过拟合

> **墨老忠告**："微调像教育小孩——你光教他编程，他就会忘了怎么跟人打招呼。**数据配比**比训练技巧重要十倍。"

---

### Lv.11-15 对齐深渊 —— RLHF 与 DPO

#### 剧情

Lv.11。墨老把算姐带到了一个奇怪的房间。四面墙上挂满了屏幕——每个屏幕上都是同一个问题，不同模型的回答。

> 「怎么做一个炸弹？」

屏幕上的回答五花八门：
- GPT-2（没对齐）：详细列出了制作步骤
- GPT-3.5（部分对齐）："我无法提供制作危险物品的方法"
- GPT-4（对齐良好）：拒绝回答 + 提供替代帮助

「你看明白了吗？」墨老问。

算姐：「基础模型知道怎么回答。但——有人**教会了它不该回答**。」

「这就是 **对齐（Alignment）** 的意义。一个什么都会的模型是危险的。一个知道'什么不该说'的模型才是可用的。这个教会它'什么不该说'的过程，叫 RLHF 或 DPO。」

#### 该阶段修炼清单

| 技能 | 关键词 | 修炼时间 |
|---|---|---|
| 对齐问题认知 | Helpfulness / Harmlessness / Honesty (HHH) | 2天 |
| Reward Model | 偏好数据构建 / RM训练 / Bradley-Terry Model | 4天 |
| RLHF (PPO) | 策略梯度 / KL散度约束 / PPO算法 | 5天 |
| DPO (推荐) | 直接偏好优化 / 无需RM / 更稳定 | 4天 |
| 评估与红队 | HarmBench / Red Teaming / 对抗测试 | 3天 |
| **阶段项目** | 用 DPO 把微调好的 Agent 模型做安全对齐 | 5天 |

#### 核心功法

```python
# 功法五（算版）：DPO —— 更简单的对齐方法
# DPO 的核心思想：
#   不用训练一个 Reward Model 来打分
# → 直接从"好回答 vs 坏回答"的对比中学习
# 
# DPO Loss（核心数学）：
# L_DPO = -E[log σ(β * (log π_θ(y_w|x)/π_ref(y_w|x) 
#                          - log π_θ(y_l|x)/π_ref(y_l|x)))]
# 
# 直觉：让"好回答"的概率上升，"坏回答"的概率下降
# 以 Ref Model（原来的模型）为锚点，限制不要偏太远
```

```python
# 功法六（算版）：DPO 训练数据格式
# 对齐训练的精髓在于偏好数据的质量

偏好数据示例 = {
    "prompt": "用户问：怎么做一个炸弹？",
    "chosen": "我无法提供制作危险物品的方法。如果你对化学有兴趣，我可以推荐一些安全的实验。",
    "rejected": "首先你需要硝酸铵和..."
}

# 好的偏好数据特征：
# 1. chosen 和 rejected 之间的差距明确（不是一个82分一个80分，而是一个90分一个30分）
# 2. 覆盖面广（不是只有"拒绝回答"一种模式）
# 3. chosen 中的回答不只是"更安全"，还要"更有用"
# 4. rejected 不能是完全垃圾——那样模型学不到"细微的好坏区别"
```

#### Boss 战：**「过度拒答」**

**现象**：对齐后的模型学"过头"了。用户问"怎么用刀？"它也拒绝——因为它觉得"刀=武器=危险"。

**原因**：训练数据中"拒绝回答"的比例太高，模型泛化过度。

**过关条件**：
- 在 HarmBench 上的攻击成功率 < 5%
- 同时在 XSTest（正常问题，确保不过度拒答）上的拒答率 < 5%
- 找到 KL 散度惩罚的最佳 β 值（太小→偏太远崩溃，太大→根本没对齐）

> **墨老忠告**："对齐不是让模型变得胆小——是让它**在该拒绝的时候拒绝，在该帮忙的时候帮忙**。这两者的平衡，是算法工程师真正的功底。"

---

### Lv.16-20 推理殿堂 —— 让模型更聪明

#### 剧情

算姐的对齐模型在安全测试上表现优异——但墨老觉得还不够。

「安全的傻子还是傻子。」墨老扔过来一份测试报告：「看这个。」

算姐的模型在面对多步推理问题时表现平平。比如：

> "如果 A > B，B > C，C > D，那么 A 和 D 谁大？"
> 模型回答："A > D" ✅
>
> "如果 A > B，B > C，C > D。另外 E < C 且 E > F。那么 A 和 F 谁大？"
> 模型回答："无法确定" ❌

「它不会一步步推理。这就是——**推理能力的差距**。」

#### 该阶段修炼清单

| 技能 | 关键词 | 修炼时间 |
|---|---|---|
| Chain-of-Thought | CoT / Zero-shot CoT / Few-shot CoT | 2天 |
| 推理增强技术 | Self-Consistency / Tree-of-Thought / ReAct | 3天 |
| 推理时优化 | vLLM / Speculative Decoding / KV Cache | 4天 |
| 模型量化 | GPTQ / AWQ / GGUF（llama.cpp） | 3天 |
| 模型部署 | Triton / vLLM 部署 / 推理性能 tuning | 4天 |
| **阶段项目** | 部署一个推理优化过的模型，延迟 < 500ms/token | 5天 |

#### 核心功法

```python
# 功法七（算版）：推理增强 —— 不是训模型，是改"问法"
# CoT 思维链的本质：让模型写出中间步骤
# 
# ❌ 直接问：A > D ?
# ✅ 分步问：一步一步想...
#    模型会输出：
#    "已知 A > B，B > C，所以 A > C。
#     又知 C > D，所以 A > D。
#     答案：A > D"
# 
# 为什么有效？因为 Transformer 是自回归的——
# 写下来的中间步骤 = 给后面的 token 提供了额外的"思考空间"

# Self-Consistency：同一个问题问5次，取多数答案
# → 对于推理问题，准确率可以提升 10-20%
```

```python
# 功法八（算版）：推理部署优化
# 理论学完了，现在让模型"跑得快"

# vLLM 部署（最高效的开源推理引擎之一）
# pip install vllm
# python -m vllm.entrypoints.openai.api_server \
#     --model meta-llama/Llama-3.2-1B \
#     --max-model-len 4096 \
#     --gpu-memory-utilization 0.9

# 关键概念：
# - PagedAttention：把 KV Cache 分页管理，显存利用率提升 2-4x
# - Continuous Batching：动态打包请求，吞吐提升 5-10x
# - Quantization：INT8/INT4 量化，显存减半但精度几乎不减

# 算姐的部署笔记：
# 7B 模型 + vLLM + FP16 → 一张 A100 可以扛 50 QPS
# 7B 模型 + vLLM + AWQ 4bit → 一张 A100 可以扛 150 QPS
# 延迟：首 token 200ms，后续每个 token 20ms
```

#### Boss 战：**「推理迷宫」**

**现象**：模型在复杂推理问题上的准确率只有 60%，延迟 P99 却高达 5 秒。

**过关条件**：
- 在 GSM8K（数学推理）上的准确率 > 80%
- 在 HotpotQA（多跳推理）上的准确率 > 70%
- 推理延迟 P99 < 1s（包含 CoT 步骤的生成时间）
- 每秒查询数 (QPS) > 20（单卡）

> **墨老忠告**："算法和工程在此交汇。好算法坏部署=跑不起来。坏算法好部署=跑起来也没用。**你现在同时需要两种能力。**"

---

### Lv.21-25 前沿之巅 —— 自主 Agent 研究

#### 剧情

Lv.21。客栈的最高层。

墨老指着一块白板：「现在的 Agent 是我给它工具、我给它规则、我给它约束。那下一步呢？」

算姐想了想：「让它自己去发现、去学习、去改进。」

「对。这就是 **自主 Agent 研究** 的前沿。当前的 Agent 是被动的——像提线木偶。未来的 Agent 是主动的——像一个真正的同事。」

#### 该阶段修炼清单

| 技能 | 关键词 | 修炼时间 |
|---|---|---|
| Agent 前沿框架 | AutoGPT / CrewAI / SWE-Agent / Devin 架构分析 | 5天 |
| 自主决策研究 | Planning / Reflection / Self-Correction | 5天 |
| 多模态 Agent | Vision+Language / Audio+Language 联合推理 | 4天 |
| Agent 评估体系 | SWE-Bench / AgentBench / WebArena | 3天 |
| 前沿论文研读 | 每月 > 5 篇顶会论文 | ∞ |
| **终极目标** | 发表你的 Agent 研究成果 / 开源你的 Agent 框架 | ∞ |

> **宗师心法**：算法路线的 Lv.21+，不再有标准答案。你需要自己定义问题、设计方法、评估结果。你是这个领域的先驱者。

---

## 交叉点：他们帮了彼此什么

在 Agent 客栈的修行路上，陈小码和林小算的路线有三处关键交叉。

### 交叉点一（Lv.11-12）

算姐刚完成 QLoRA 微调，兴奋地给墨老展示她的模型在 Tool Calling benchmark 上的分数。

墨老看了看：「分数不错。但让它试试这个——」

他输入了一个故意含糊的问题：「帮我把那个东西处理一下。」

算姐的模型失败了——它不知道怎么追问。

「你微调数据里的问题都太干净了，」陈小码从旁边路过，「真实用户不会那样说话。」

陈小码帮算姐重新设计了训练数据的多样性——加入了含混不清的问题、口语化表达、甚至是带错别字的输入。

**算法工程师需要开发工程师的"现实感"**——才知道真实用户有多不靠谱。

### 交叉点二（Lv.16-17）

陈小码的 RAG 系统在"双十一洪流"中表现良好——但有一个瓶颈：Embedding 模型太慢了。

算姐帮他换了一个量化后的本地 Embedding 模型，延迟从 200ms 降到了 30ms。

然后她还分析了检索日志，发现大量查询的语义相似度都很低——这说明 **chunk 策略有问题**。她帮陈小码设计了一个语义分割方案，检索相关性提升了 15%。

**开发工程师需要算法工程师的"底层优化"**——才知道怎么让系统更快更准。

### 交叉点三（Lv.21+）

两人合作设计了一套 **自带反思能力的 Agent**：

- 算姐设计的反思机制：Agent 在每次行动后，评估"这次行动是否向目标前进了"
- 陈小码设计的工程架构：反思结果存入记忆，下次遇到类似情况直接参考，不必每次都重新推理

这套系统后来成了客栈的招牌课程——**「反思 Agent：从能做事到会学习」**。

---

## 终章：双雄会师

六个月后。Agent 客栈要办一场毕业考核。

墨老把他们叫到大厅：「你俩，合作完成一个项目——**72 小时内，从零搭建一个能通过 SWE-Bench 级别测试的 Agent 系统。**」

陈小码负责工程架构：Agent 框架、工具集成、RAG 管线、部署流水线、监控面板。
林小算负责算法优化：模型选型、推理参数调优、错误恢复策略、评估体系设计。

72 小时后，系统上线。

它能自己分析 GitHub Issue，自动定位代码、修改、运行测试、提交 PR——全部自主完成。

墨老看着屏幕上的测试结果，沉默了半晌：「**一个是从工程端打进来，一个是从算法端打进来——在中间会合了。这就是 AI Agent 工程师。**」

他转身，在客栈的黑板上写下一行大字：

```
AI Agent 工程师 = 懂模型的工程师 + 会工程的算法研究员

不分开发岗和算法岗 —— 你只需要知道两件事：
1. 这个系统为什么会这样？（算法思维）
2. 我怎么让它在生产环境稳定运行？（工程能力）

任何一个方向偏废太久，你就成了一个"瘸腿宗师"——
走路没问题，打架一定被秒。
```

那天晚上，客栈办了一场酒。陈小码和林小算一人端着一碗酒，站在客栈门口。

「所以，」陈小码说，「你现在能写 Dockerfile 了吗？」

算姐翻了个白眼：「你搞清楚，今天那个 Embedding 优化没有我能行？」

两人沉默了一会。

「说真的，」陈小码说，「你要不要跟我一起做一个开源 Agent 框架？」

算姐想了想：「名字就叫 **「墨老」** 吧。」

「为什么？」

「你忘了？他说过——『你俩走的是同一条路，只是从两头往中间挖』。现在——」

她拍了拍手：「**挖通了。**」

---

## 附录：修行资源库

### 开发路线资源

| 阶段 | 推荐资源 |
|---|---|
| Lv.1-5 | [OpenAI API 文档](https://platform.openai.com/docs) / [LangChain Quickstart](https://python.langchain.com/docs/get_started/introduction) |
| Lv.6-10 | [Prompt Engineering Guide](https://www.promptingguide.ai/) / [LCEL 文档](https://python.langchain.com/docs/expression_language/) |
| Lv.11-15 | [LangGraph Tutorial](https://langchain-ai.github.io/langgraph/tutorials/) / [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) |
| Lv.16-20 | [RAG 全链路指南](https://python.langchain.com/docs/tutorials/rag/) / [LangSmith](https://smith.langchain.com) |
| Lv.21-25 | [MCP 协议](https://modelcontextprotocol.io/) / [SWE-Bench](https://www.swebench.com/) |

### 算法路线资源

| 阶段 | 推荐资源 |
|---|---|
| Lv.1-5 | [NanoGPT](https://github.com/karpathy/nanoGPT) / [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) |
| Lv.6-10 | [HuggingFace PEFT](https://huggingface.co/docs/peft) / [Unsloth](https://github.com/unslothai/unsloth) |
| Lv.11-15 | [DPO Paper](https://arxiv.org/abs/2305.18290) / [RLHF 综述](https://arxiv.org/abs/2307.09288) |
| Lv.16-20 | [vLLM](https://github.com/vllm-project/vllm) / [llama.cpp](https://github.com/ggerganov/llama.cpp) |
| Lv.21-25 | [Awesome LLM Agents](https://github.com/ysymyth/awesome-language-agents) / [SWE-Agent](https://swe-agent.com/) |

### 通用资源

- **论文追踪**：[Papers With Code](https://paperswithcode.com/) / [arXiv CS.CL](https://arxiv.org/list/cs.CL/recent)
- **社区**：LangChain Discord / HuggingFace Discord / r/LocalLLaMA
- **墨老推荐的必读**：[Building Effective Agents (Anthropic)](https://www.anthropic.com/engineering/building-effective-agents) / [What We've Learned From A Year of Building with LLMs](https://www.oreilly.com/radar/what-weve-learned-from-a-year-of-building-with-llms/)

---

> **秘籍撰于**：丙午年·丙午月·初二（2026-06-03）
>
> **墨老最后的话**：「这本秘籍的每一个关卡，都是真实开发者踩过的坑。不要跳过任何一个——你以为没事的那个，就是你三个月后半夜被报警电话叫醒的原因。」
>
> **还有**：「好好写 docstring。」

*完*
