# LangGraph 到底做了什么？—— 每个功能 vs 纯手写实现

> LangChain 解决了"怎么把 LLM 调用串成链"。但真实世界的 Agent 不是一条直线——它会循环、分岔、回头、等待人类拍板。**LangGraph 就是为了这些"非直线"场景而生的。**
>
> 本文把 LangGraph 的每个核心功能拆开，左边放 LangGraph 的写法，右边放**不用 LangGraph、纯 Python 手写的等价实现**。读完你会知道：
>
> 1. **LangGraph 底层到底干了什么**（原理层面）
> 2. **什么场景值得引入 LangGraph，什么场景手写状态机就够了**（决策层面）

---

## 目录

- [零、LangGraph 的本质：Chain 解决不了的事](#零langgraph-的本质chain-解决不了的事)
- [一、图基础：State / Node / Edge](#一图基础state--node--edge)
  - [1.1 基础图：状态+节点+边](#11-基础图状态节点边)
  - [1.2 图编译与运行](#12-图编译与运行)
- [二、条件分支与循环](#二条件分支与循环)
  - [2.1 条件边：动态路由](#21-条件边动态路由)
  - [2.2 循环控制：图内循环](#22-循环控制图内循环)
  - [2.3 并行分发：Send API](#23-并行分发send-api)
- [三、Checkpoint 与持久化](#三checkpoint-与持久化)
  - [3.1 内存断点：MemorySaver](#31-内存断点memorysaver)
  - [3.2 持久化断点：SqliteSaver](#32-持久化断点sqlitesaver)
  - [3.3 状态回退与重放](#33-状态回退与重放)
- [四、Human-in-the-Loop 人机协作](#四human-in-the-loop-人机协作)
  - [4.1 节点前中断：interrupt_before](#41-节点前中断interrupt_before)
  - [4.2 完整审批流程](#42-完整审批流程)
- [五、高级特性：Subgraph / 流式 / 中间件](#五高级特性subgraph--流式--中间件)
  - [5.1 子图嵌套 Subgraph](#51-子图嵌套-subgraph)
  - [5.2 图级中间件](#52-图级中间件)
  - [5.3 流式执行](#53-流式执行)
- [六、完整案例：客服 Agent 两种实现](#六完整案例客服-agent-两种实现)
- [七、总结：决策框架](#七总结决策框架)

---

## 零、LangGraph 的本质：Chain 解决不了的事

LangChain 的 Chain（链）本质上是一个**有向无环图（DAG）**——数据从 A 流向 B 流向 C，一路向前，永不回头。

但真实的 Agent 场景呢？

```
用户问 → Agent思考 → 需要更多信息？→ 是 → 调用工具 → 回到Agent思考
                    → 否 → 生成回答 → 人工审批？→ 是 → 等待 → 通过 → 返回
                                                           → 驳回 → 回到Agent思考
```

**有循环、有分岔、有等待、有回头路。** 这不是链——这是**图（Graph）**。

| 特性 | LangChain Chain | LangGraph |
|---|---|---|
| **结构** | 线性管道 `A→B→C` | 有向图（可以循环、分叉、合并） |
| **状态** | 无状态（每次调独立） | **有状态**（State 贯穿全图，持久化） |
| **控制流** | 固定 | 条件分支 + 循环 + 中断等待 |
| **可恢复性** | ❌ | ✅ 任意节点中断→恢复→继续 |

> **LangGraph 不是 LangChain 的替代品——是补上了 LangChain 做不了的事。**

---

## 一、图基础：State / Node / Edge

### 1.1 基础图：状态 + 节点 + 边

**功能说明**：定义一个图，包含全局共享的状态（State）、处理节点（Node）、节点间的连线（Edge）。三者构成了图的最小单元。为什么出现？Chain 是固定的流程，无法动态决定下一步去哪——而图可以。

#### LangGraph 方式

```python
# LangGraph：三要素 —— State, Node, Edge
from typing import TypedDict
from langgraph.graph import StateGraph, END

# 1. 定义全局状态（贯穿所有节点）
class 状态(TypedDict):
    用户输入: str
    分析结果: str
    最终回答: str

# 2. 定义节点（每个节点是一个处理函数）
def 分析意图节点(state: 状态) -> 状态:
    """判断用户想问什么"""
    return {"分析结果": f"用户意图：查询订单 - {state['用户输入']}"}

def 生成回答节点(state: 状态) -> 状态:
    """基于分析结果生成最终回答"""
    return {"最终回答": f"基于分析'{state['分析结果']}'的回答：您的订单已发货"}

# 3. 建图：加节点 + 加边
graph = StateGraph(状态)
graph.add_node("分析意图", 分析意图节点)
graph.add_node("生成回答", 生成回答节点)

graph.set_entry_point("分析意图")     # 入口
graph.add_edge("分析意图", "生成回答")  # 边：A→B
graph.add_edge("生成回答", END)        # 出口

app = graph.compile()
result = app.invoke({"用户输入": "我的订单SF123到哪了？"})
print(result["最终回答"])
```

#### 纯手写方式

```python
# 纯手写：状态就是 dict，节点就是函数，边就是 if-else

class 手写状态机:
    """LangGraph 的核心 —— 不过是一个状态字典 + 函数调度表"""

    def __init__(self):
        self.状态 = {}         # 相当于 StateGraph 的 State
        self.节点表 = {}       # 相当于 add_node
        self.入口 = None       # 相当于 set_entry_point
        self.边表 = {}         # 相当于 add_edge + add_conditional_edges

    def 加节点(self, name: str, func):
        self.节点表[name] = func

    def 加边(self, 起点: str, 终点: str):
        self.边表[起点] = lambda _: 终点

    def 加条件边(self, 起点: str, 路由函数):
        self.边表[起点] = 路由函数

    def 设入口(self, name: str):
        self.入口 = name

    def 运行(self, 初始状态: dict) -> dict:
        self.状态 = {**初始状态}
        当前节点 = self.入口

        while 当前节点 != END and 当前节点 is not None:
            # 1. 执行当前节点
            func = self.节点表[当前节点]
            新状态 = func(self.状态)
            self.状态 = {**self.状态, **新状态}

            # 2. 决定下一站
            路由 = self.边表.get(当前节点)
            if callable(路由):
                当前节点 = 路由(self.状态)
            else:
                当前节点 = 路由

        return self.状态

# ---- 使用 ----
END = "__END__"

def 分析意图_node(state):
    return {"分析结果": f"处理后：{state['用户输入']}"}

def 生成回答_node(state):
    return {"最终回答": f"基于'{state['分析结果']}'：您的订单已发货"}

机 = 手写状态机()
机.加节点("分析", 分析意图_node)
机.加节点("回答", 生成回答_node)
机.设入口("分析")
机.加边("分析", "回答")
机.加边("回答", END)

result = 机.运行({"用户输入": "我的订单到哪了？"})
# 输出：{"用户输入": "...", "分析结果": "...", "最终回答": "..."}
# 和 LangGraph 完全一样！
```

> **差异分析**：LangGraph 的核心——StateGraph——本质上就是一个**状态字典 + 函数调度器**。State 是 dict、Node 是函数、Edge 是路由。手写一个 30 行的状态机就能完全取代 StateGraph 的基础功能。LangGraph 的价值不在于这 30 行——在于后面章节要讲的 Checkpoint、Interrupt、Stream。
>
> **选型建议**：线性流程 🥇 **手写函数串联**（5行）；简单分支无循环 🥇 **手写状态机**（30行）；需要循环/持久化/中断 → 🥈 **LangGraph**。

---

### 1.2 图编译与运行

**功能说明**：`compile()` 把图定义变成可执行对象，`invoke()` 驱动状态流转。LangGraph 的 compile 不仅编译——它还**注入调试钩子、校验拓扑结构、准备 Checkpoint 机制**。

#### LangGraph 方式

```python
app = graph.compile()           # 编译：验证拓扑 + 注入基础设施
result = app.invoke(初始状态)    # 同步执行全图
async for chunk in app.astream(初始状态):  # 异步流式执行
    print(chunk)
```

#### 纯手写方式

```python
# compile() + invoke() = 验证拓扑 + 运行状态机
class 图编译器:
    def __init__(self, 状态机):
        self.机 = 状态机
        self._验证拓扑()

    def _验证拓扑(self):
        """LangGraph compile 做的事：确保图结构合法"""
        所有节点 = set(self.机.节点表.keys())
        有入口 = self.机.入口 in 所有节点

        # 检查是否有孤立节点（没有入边也没有出边）
        有入边的节点 = set()
        for 起点, 路由 in self.机.边表.items():
            if callable(路由):
                continue  # 条件边，运行时才知道目的地
            有入边的节点.add(路由)

        孤立节点 = 所有节点 - 有入边的节点 - {self.机.入口}
        if 孤立节点:
            print(f"⚠️ 警告：存在孤立节点 {孤立节点}")

        if not 有入口:
            raise ValueError("图缺少入口节点")

    def invoke(self, 初始状态: dict) -> dict:
        return self.机.运行(初始状态)

    async def astream(self, 初始状态: dict):
        """模拟 LangGraph 的流式执行"""
        self.机.状态 = {**初始状态}
        当前 = self.机.入口
        while 当前 != END:
            func = self.机.节点表[当前]
            新状态 = func(self.机.状态)
            self.机.状态 = {**self.机.状态, **新状态}
            yield {当前: self.机.状态}  # 每个节点执行完就 yield

            路由 = self.机.边表.get(当前)
            当前 = 路由(self.机.状态) if callable(路由) else 路由

编译结果 = 图编译器(机)
result = 编译结果.invoke({"用户输入": "测试"})
```

> **差异分析**：compile 做的事你完全可以手写——拓扑验证、执行驱动、流式yield。但 LangGraph 的 compile 额外做了**拓扑排序校验**、**并行节点检测**、**Checkpoint 挂载**——这些在简单图中用不上，在复杂图中（30+节点）会成为救命稻草。
>
> **选型建议**：5节点以下 🥇 **手写驱动**；10+节点、有并行 🥈 **LangGraph compile**（自动检测死循环和拓扑错误）。

---

## 二、条件分支与循环

### 2.1 条件边：动态路由

**功能说明**：根据运行时的状态决定下一步去哪。为什么出现？Agent 调用工具后——如果工具成功就继续，如果工具失败就重试或转人工——这不是一条固定的路线。

#### LangGraph 方式

```python
from langgraph.graph import StateGraph, END

def 路由函数(state: dict) -> str:
    """检查工具调用结果，决定下一步"""
    if state.get("工具成功"):
        return "生成回答"
    elif state.get("重试次数", 0) < 3:
        return "重试工具"
    else:
        return "转人工客服"

# 关键：add_conditional_edges 接收一个函数 + 路由映射表
graph.add_conditional_edges(
    "工具执行",
    路由函数,
    {
        "生成回答": "生成回答节点",
        "重试工具": "工具执行节点",      # 回到自己 = 循环！
        "转人工客服": "人工节点",
    }
)
```

#### 纯手写方式

```python
# 条件边本质 = if/elif/else + 返回下一个节点名
def 手工条件路由(state: dict) -> str:
    if state.get("工具成功"):
        return "生成回答"
    elif state.get("重试次数", 0) < 3:
        state["重试次数"] = state.get("重试次数", 0) + 1
        return "工具执行"
    else:
        return "人工客服"

# 在状态机中，条件边就是一个返回节点名的函数
机.加条件边("工具执行", 手工条件路由)
```

> **差异分析**：手写条件路由就是一个**返回字符串的函数**。LangGraph 额外提供了一个映射表（dict），把路由函数的返回值映射到节点名——相当于多了一层**从"逻辑结果"到"实际节点"的解耦**。手写时可以合并这一步。
>
> **选型建议**：🥇 **手写**。一个 if/else 函数，三方持平。LangGraph 的映射表在此场景下是锦上添花。

---

### 2.2 循环控制：图内循环

**功能说明**：节点 A → 节点 B → 条件判断 → 可能回到节点 A。为什么出现？Agent 的 "Thought→Action→Observation→Thought" 循环就是图内循环的典型。

#### LangGraph 方式

```python
# LangGraph 的循环：节点指回自己或前面的节点
graph.add_conditional_edges(
    "Agent思考",
    lambda s: "调用工具" if s.get("需要工具") else "结束",
    {"调用工具": "工具执行", "结束": END}
)
graph.add_edge("工具执行", "Agent思考")  # 工具执行完 → 回到思考（循环！）
```

#### 纯手写方式

```python
# 纯手写：while 循环就是 Agent 循环
def Agent循环(用户输入: str, 最大回合=10) -> str:
    messages = [{"role": "user", "content": 用户输入}]
    tools = {查天气: "查天气", 算数: "算数"}

    for _ in range(最大回合):
        res = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            tools=tools_schema,
        )
        msg = res.choices[0].message

        if not msg.tool_calls:        # ← 条件判断
            return msg.content         # ← 结束

        # 执行工具调用
        messages.append(msg)
        for tc in msg.tool_calls:
            result = 执行工具(tc)
            messages.append({
                "role": "tool",
                "tool_call_id": tc.id,
                "content": result,
            })
        # ← 循环回到 for 开头（相当于 edge→Agent思考）

    return "超过最大回合数"
```

> **差异分析**：图内循环在手写中就是**while/for 循环**。LangGraph 把循环展开为节点+边——好处是循环的每一步都可以被 Checkpoint 记录、可以被 Interrupt 打断、可以单独调试。
>
> **选型建议**：纯 Agent 循环（无中途停顿需求）🥇 **手写 while**（更直观）；需要中途断点/重放/调试 🥈 **LangGraph**。

---

### 2.3 并行分发：Send API

**功能说明**：从一个节点发出多个并行任务，每个任务独立运行，结果自动汇总。为什么出现？比如"搜索三个不同的知识库"——三个搜索互不依赖，并行执行节省时间。

#### LangGraph 方式

```python
from langgraph.graph import StateGraph
from langgraph.types import Send
from typing import Annotated
import operator

class 状态(TypedDict):
    搜索主题: str
    搜索结果: Annotated[list, operator.add]  # 并行结果自动合并

def 分发节点(state: 状态):
    """把搜索主题分发到三个不同的知识库"""
    return [
        Send("搜索", {"主题": state["搜索主题"], "来源": "内部文档"}),
        Send("搜索", {"主题": state["搜索主题"], "来源": "外部FAQ"}),
        Send("搜索", {"主题": state["搜索主题"], "来源": "社区论坛"}),
    ]

def 搜索节点(state: dict) -> dict:
    return {"搜索结果": [f"[{state['来源']}] 关于'{state['主题']}'的结果..."]}

graph = StateGraph(状态)
graph.add_node("分发", 分发节点)
graph.add_node("搜索", 搜索节点)
graph.set_entry_point("分发")
graph.add_edge("搜索", END)
```

#### 纯手写方式

```python
import asyncio

async def 并行搜索(主题: str, 来源列表: list[str]) -> list[str]:
    """LangGraph Send API 等价：asyncio.gather"""

    async def 搜索一个(来源: str) -> str:
        await asyncio.sleep(0.5)  # 模拟网络请求
        return f"[{来源}] 关于'{主题}'的搜索结果..."

    # 所有来源并行搜索，结果自动汇总为列表
    tasks = [搜索一个(s) for s in 来源列表]
    results = await asyncio.gather(*tasks)
    return list(results)

# asyncio.run(并行搜索("Python异步", ["内部文档", "外部FAQ", "社区论坛"]))
```

> **差异分析**：Send API 的核心 = **并行分发 + 结果归并**。手写就是 asyncio.gather。但 LangGraph 的 Send 与 Checkpoint 集成——每个并行任务可以独立持久化、独立恢复。纯 asyncio 没有这个特性。
>
> **选型建议**：简单并行 🥇 **asyncio.gather**；需要持久化每个并行任务状态 🥈 **LangGraph Send**。

---

## 三、Checkpoint 与持久化

### 3.1 内存断点：MemorySaver

**功能说明**：图在每一步执行后自动保存状态快照，支持中断后恢复、回退到任意步骤。为什么出现？Agent 执行到一半时 LLM 挂了——没有 Checkpoint 就得重头来，有 Checkpoint 可以从中断处继续。

#### LangGraph 方式

```python
from langgraph.checkpoint.memory import MemorySaver

checkpointer = MemorySaver()
app = graph.compile(checkpointer=checkpointer)

# 每次调用传入 thread_id 作为会话标识
config = {"configurable": {"thread_id": "session-001"}}

# 第一步执行
app.invoke({"用户输入": "查订单SF123"}, config)
# 如果这里中断了...

# 恢复执行 —— 从上次断点继续
app.invoke(None, config)  # 传 None，从断点恢复
```

#### 纯手写方式

```python
import copy

class 手写Checkpoint:
    """LangGraph MemorySaver 的核心：一个状态快照字典"""

    def __init__(self):
        self.快照库 = {}  # thread_id → [快照列表]

    def 存快照(self, thread_id: str, 步骤名: str, 状态: dict):
        if thread_id not in self.快照库:
            self.快照库[thread_id] = []
        self.快照库[thread_id].append({
            "步骤": 步骤名,
            "状态": copy.deepcopy(状态),  # 深拷贝防篡改
        })

    def 取最新快照(self, thread_id: str) -> dict:
        快照列表 = self.快照库.get(thread_id, [])
        if not 快照列表:
            return {}
        return 快照列表[-1]["状态"]

    def 回退到(self, thread_id: str, 步骤名: str) -> dict:
        for 快照 in self.快照库.get(thread_id, []):
            if 快照["步骤"] == 步骤名:
                return copy.deepcopy(快照["状态"])
        return {}

class 带断点的状态机(手写状态机):
    def __init__(self, checkpoint):
        super().__init__()
        self.checkpoint = checkpoint
        self.线程ID = None

    def 运行(self, 初始状态: dict, 线程ID: str = "default") -> dict:
        self.线程ID = 线程ID

        # 如果有初始状态 → 新对话；否则 → 从断点恢复
        if 初始状态:
            self.状态 = {**初始状态}
            当前节点 = self.入口
        else:
            self.状态 = self.checkpoint.取最新快照(线程ID)
            当前节点 = self.状态.pop("_下一个节点", self.入口)

        while 当前节点 != END and 当前节点 is not None:
            func = self.节点表[当前节点]
            新状态 = func(self.状态)
            self.状态 = {**self.状态, **新状态}

            # 每一步执行完 → 存档
            self.checkpoint.存快照(线程ID, 当前节点, self.状态)

            路由 = self.边表.get(当前节点)
            当前节点 = 路由(self.状态) if callable(路由) else 路由

        return self.状态

# 使用
cp = 手写Checkpoint()
机 = 带断点的状态机(cp)
# （注册节点和边...）
机.运行({"输入": "查订单"}, 线程ID="s1")
# 断了？
机.运行({}, 线程ID="s1")  # 传空状态 → 自动从断点恢复！
```

> **差异分析**：Checkpoint 核心 = **状态快照 + 按 thread_id 索引**。手写不过 40 行代码。但 LangGraph 的 Checkpoint 额外做了：**原子写入**（防止存一半时崩溃）、**增量存储**（只存变化的部分，省内存）、**时间线管理**（支持回退到任意版本而非仅最新）。
>
> **选型建议**：单机原型 🥇 **手写快照**（40行）；生产级、多会话、需要回退 🥈 **LangGraph**。

---

### 3.2 持久化断点：SqliteSaver

**功能说明**：把快照存到 SQLite/Postgres 而非内存，重启后不丢。为什么出现？服务器重启、进程崩溃——内存快照全部消失。持久化断点可以让 Agent 在重启后无缝恢复。

#### LangGraph 方式

```python
from langgraph.checkpoint.sqlite import SqliteSaver

checkpointer = SqliteSaver.from_conn_string("checkpoints.db")
app = graph.compile(checkpointer=checkpointer)
# 用法和 MemorySaver 完全一样 —— 但重启后数据还在
```

#### 纯手写方式

```python
import sqlite3
import json
import copy

class SqliteCheckpoint:
    """MemorySaver 换一个存储后端"""

    def __init__(self, db_path="checkpoints.db"):
        self.db = sqlite3.connect(db_path)
        self.db.execute("""
            CREATE TABLE IF NOT EXISTS checkpoints (
                thread_id TEXT,
                step TEXT,
                state_json TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (thread_id, step)
            )
        """)

    def 存快照(self, thread_id, 步骤名, 状态):
        # 只存储可序列化的字段
        可序列化状态 = {
            k: v for k, v in 状态.items()
            if isinstance(v, (str, int, float, bool, list, dict, type(None)))
        }
        self.db.execute(
            "INSERT OR REPLACE INTO checkpoints VALUES (?, ?, ?)",
            (thread_id, 步骤名, json.dumps(可序列化状态))
        )
        self.db.commit()

    def 取最新快照(self, thread_id):
        row = self.db.execute(
            "SELECT state_json FROM checkpoints WHERE thread_id=? ORDER BY created_at DESC LIMIT 1",
            (thread_id,)
        ).fetchone()
        return json.loads(row[0]) if row else {}
```

> **差异分析**：持久化就是**换个存储后端**。LangGraph 做了：Schema 管理、事务、连接池、数据迁移。如果你对 SQLite/Postgres 熟悉，手写这些也是几行代码的事。LangGraph 的价值在于统一的 Checkpointer 接口——你今天用 SQLite、明天换 Postgres，代码一行不改。
>
> **选型建议**：固定存储后端 🥇 **手写 sqlite3**；可能切换后端、需要企业级事务 → 🥈 **LangGraph**。

---

### 3.3 状态回退与重放

**功能说明**：不只能"回到最新的断点"——能回到**任意一个历史步骤**，重新执行。为什么出现？Agent 走了弯路——你想让它回到第3步，换一个工具调用策略，而不是重头来。

#### LangGraph 方式

```python
# 获取状态历史
history = list(app.get_state_history(config))

# 回退到某个步骤
app.update_state(config, {"需要工具": False, "重新规划": True})

# 从那个步骤继续执行
app.invoke(None, config)
```

#### 纯手写方式

```python
class 可回退状态机(带断点的状态机):
    def 列出历史(self, 线程ID):
        return [s["步骤"] for s in self.checkpoint.快照库.get(线程ID, [])]

    def 回退并重试(self, 线程ID, 目标步骤, 新注入状态=None):
        旧状态 = self.checkpoint.回退到(线程ID, 目标步骤)
        if 新注入状态:
            旧状态.update(新注入状态)
        # 标记"从哪个节点继续"
        旧状态["_下一个节点"] = self._找后续节点(目标步骤)
        self.状态 = 旧状态
        # 继续执行...
        return self.运行({}, 线程ID)

    机 = 可回退状态机(cp)
    机.运行({"输入": "原始任务"}, 线程ID="s1")
    # Agent 走到第3步时发现策略不对
    机.回退并重试("s1", "Agent思考", {"策略": "换一种工具组合"})
    # 从第3步重新开始，但用新策略

    def _找后续节点(self, 步骤名):
        """找到指定步骤的下一个节点"""
        路由 = self.边表.get(步骤名)
        return 路由(self.状态) if callable(路由) else 路由
```

> **差异分析**：回退就是**快照库的随机访问**。LangGraph 额外提供的是 `get_state_history` 的可迭代接口和时间线可视化。手写实现的核心逻辑 20 行足够。
>
> **选型建议**：偶尔回退 🥇 **手写**；Agent 开发阶段频繁试错 → 🥈 **LangGraph**（history 可视化和时间线管理是调试利器）。

---

## 四、Human-in-the-Loop 人机协作

### 4.1 节点前中断：interrupt_before

**功能说明**：图执行到某个节点前**自动停下来等人类批准**。为什么出现？Agent 要调"发起退款"工具——这不能让它自己做主，必须人工确认。

#### LangGraph 方式

```python
# 编译时指定 interrupt_before
app = graph.compile(
    checkpointer=checkpointer,
    interrupt_before=["发起退款", "发送邮件"]  # 这些节点前自动暂停
)

# 第一段：执行到第一个中断点
result = app.invoke({"用户输入": "我要退款"}, config)
print(result)  # 状态停在"发起退款"节点之前

# 人类确认后，传 None 继续
app.invoke(None, config)  # 继续执行
```

#### 纯手写方式

```python
class 人工审批状态机(手写状态机):
    def __init__(self, 需审批节点: list[str]):
        super().__init__()
        self.审批列表 = set(需审批节点)
        self._暂停状态 = {}

    def 运行(self, 初始状态, 线程ID=None):
        self.状态 = {**初始状态}
        当前节点 = self.入口

        while 当前节点 != END:
            # ==== interrupt_before 的等价实现 ====
            if 当前节点 in self.审批列表:
                print(f"⏸️  节点 '{当前节点}' 需要人工审批")
                print(f"   当前状态：{self.状态}")

                审批意见 = input("输入 '同意' 继续，'驳回' 修改：").strip()
                if 审批意见 == "驳回":
                    修改内容 = input("输入要修改的内容（JSON格式）：")
                    import json
                    self.状态.update(json.loads(修改内容))

                print("▶️  审批通过，继续执行")

            # ==== 正常执行 ====
            func = self.节点表[当前节点]
            self.状态.update(func(self.状态))

            路由 = self.边表.get(当前节点)
            当前节点 = 路由(self.状态) if callable(路由) else 路由

        return self.状态

# 使用
机 = 人工审批状态机(需审批节点=["发起退款", "删除数据"])
机.加节点("分析", 分析节点)
机.加节点("发起退款", 退款节点)
机.加节点("结束处理", 结束节点)
机.设入口("分析")
机.加边("分析", "发起退款")
机.加边("发起退款", "结束处理")
机.加边("结束处理", END)

result = 机.运行({"退款金额": 299})
```

> **差异分析**：interrupt 的本质就是**在循环中加一个 input()**。LangGraph 把审批动作解耦了——`app.invoke(None, config)` 而非 `input()`。这让审批可以来自远程（Web 界面、消息队列、API 回调），而不是必须运行在同一个终端里。
>
> **选型建议**：本地单机原型 🥇 **input()**；审批来自远程/Web 🥈 **LangGraph**（解耦设计 + Checkpoint 保障）。

---

### 4.2 完整审批流程

**功能说明**：不是简单的"点个头就过"——完整的审批流程包括**驳回→修改→重审→超时→升级**。

#### LangGraph 方式

```python
# LangGraph：用 interrupt + 条件边构建多级审批
def 审批路由(state):
    if state.get("审批结果") == "同意":
        return "执行操作"
    elif state.get("审批结果") == "驳回修改":
        return "重新处理"
    else:
        return "升级到高级审批"

graph.add_conditional_edges(
    "人工审批节点",
    审批路由,
    {"执行操作": "执行节点", "重新处理": "处理节点", "升级到高级审批": "高级审批节点"}
)

# 编译时把审批节点设为中断点
app = graph.compile(
    checkpointer=checkpointer,
    interrupt_before=["人工审批节点", "高级审批节点"]
)
```

#### 纯手写方式

```python
class 审批流程:
    """LangGraph 的审批 = 状态机 + 条件边 + input()"""

    def __init__(self):
        self.审批规则 = {
            "退款金额 < 100": "自动通过",
            "退款金额 100-1000": "一级审批",
            "退款金额 > 1000": "二级审批",
        }

    def 判断审批级别(self, 金额: float) -> str:
        if 金额 < 100:
            return "自动通过"
        elif 金额 < 1000:
            return "一级审批"
        return "二级审批"

    def 人工审批(self, 级别: str, 详情: dict) -> dict:
        """审批的核心：展示信息 → 等待输入 → 返回结果"""
        print(f"\n{'='*40}")
        print(f"[{级别}] 请审批以下操作：")
        for k, v in 详情.items():
            print(f"  {k}: {v}")

        结果 = input("输入 'y' 同意 / 'n' 驳回 / 'e' 升级: ").strip()
        if 结果 == 'y':
            return {"审批结果": "同意", "审批人": "终端用户"}
        elif 结果 == 'e':
            return {"审批结果": "升级", "升级原因": "需要更高级别审批"}
        else:
            驳回原因 = input("驳回原因：")
            return {"审批结果": "驳回", "原因": 驳回原因}

    def 执行(self, 初始请求: dict) -> dict:
        级别 = self.判断审批级别(初始请求.get("金额", 0))
        if 级别 == "自动通过":
            return {"结果": "已自动处理"}

        审批结果 = self.人工审批(级别, 初始请求)

        while 审批结果["审批结果"] == "升级":
            审批结果 = self.人工审批(f"升级后-{级别}", 初始请求)

        if 审批结果["审批结果"] == "驳回":
            return {"结果": f"已驳回：{审批结果['原因']}"}

        return {"结果": "已执行"}

审批 = 审批流程()
result = 审批.执行({"操作": "退款", "金额": 1500})
```

> **差异分析**：审批流程本身就是**条件判断+等待输入+循环**。LangGraph 通过 `interrupt_before` + `add_conditional_edges` 把它形式化了。手写的 while + input 更直观。但 LangGraph 的版本天然支持**远程审批**（interrupt 不依赖 stdin）。
>
> **选型建议**：终端原型 🥇 **手写 input()**；Web后台审批系统 → 🥈 **LangGraph**。

---

## 五、高级特性：Subgraph / 流式 / 中间件

### 5.1 子图嵌套 Subgraph

**功能说明**：在一个图里嵌入另一个图，子图有自己的状态和生命周期。为什么出现？复杂的 Agent 系统——订单处理是一个子图、退款处理是另一个子图、客服对话是第三个——每个都可以独立设计、独立测试。

#### LangGraph 方式

```python
# 定义子图（订单处理）
订单子图 = StateGraph(订单状态)
# ... 注册订单处理的节点和边 ...
订单app = 订单子图.compile()

# 在主图中把子图作为一个节点
主图.add_node("处理订单", 订单app)  # 子图就是节点！
```

#### 纯手写方式

```python
class 子状态机:
    """子图 = 一个有自己状态和逻辑的函数"""

    def __init__(self, name):
        self.name = name
        self.内部状态机 = 手写状态机()

    def __call__(self, state: dict) -> dict:
        """作为节点函数被调用时 —— 运行内部状态机"""
        # 从父状态中提取子图需要的状态
        子状态 = {
            "订单ID": state.get("订单ID"),
            "来源": self.name,
        }
        # 运行子图/子状态机
        结果 = self.内部状态机.运行(子状态)
        # 把结果合并回父状态
        return {f"{self.name}_结果": 结果}

# 使用
订单处理子图 = 子状态机("订单处理")
订单处理子图.内部状态机.加节点("查库存", ...)
订单处理子图.内部状态机.加节点("创建订单", ...)

主状态机.加节点("处理订单", 订单处理子图)  # 子图作为节点
```

> **差异分析**：子图 = **把状态机包装成函数**。LangGraph 额外保证子图的 Checkpoint 独立——子图内部断点不会和父图混在一起。手写时这一点要自己保证。
>
> **选型建议**：浅层嵌套（1-2层）🥇 **手写函数组合**；深层嵌套需要独立断点 🥈 **LangGraph Subgraph**。

---

### 5.2 图级中间件

**功能说明**：在图的每个节点执行前后插入自定义逻辑——日志、计时、Token计数、监控。为什么出现？你需要知道图走到了哪里、每步花了多长时间、哪个节点最慢——但不能在每个节点里都写一遍 `print`。

#### LangGraph 方式

```python
from langgraph.pregel import Pregel

# LangGraph 通过 callbacks 注入图级中间件
from langchain_core.callbacks import BaseCallbackHandler

class 图监控中间件(BaseCallbackHandler):
    def on_chain_start(self, serialized, inputs, **kwargs):
        name = serialized.get("name", "匿名节点")
        print(f"📍 [图监控] 进入节点: {name}")

    def on_chain_end(self, outputs, **kwargs):
        print(f"✅ [图监控] 节点完成")

# 编译时挂载
app = graph.compile(checkpointer=cp)
# callback 通过 RunnableConfig 传入
result = app.invoke(初始状态, {"callbacks": [图监控中间件()]})
```

#### 纯手写方式

```python
import time
from functools import wraps

def 图中间件(func):
    """装饰器 = 轻量级的图级中间件"""
    @wraps(func)
    def wrapper(state):
        print(f"📍 [监控] 进入: {func.__name__}")
        start = time.time()
        try:
            result = func(state)
            print(f"✅ [监控] {func.__name__} 完成 | 耗时: {time.time() - start:.2f}s")
            return result
        except Exception as e:
            print(f"❌ [监控] {func.__name__} 失败: {e}")
            raise
    return wrapper

# 使用：给每个节点函数加装饰器
@图中间件
def 订单处理节点(state):
    ...

# 或者给状态机的运行方法加中间件
class 带中间件的状态机(手写状态机):
    def __init__(self, 中间件列表=None):
        super().__init__()
        self.中间件 = 中间件列表 or []

    def 运行(self, 初始状态):
        self.状态 = {**初始状态}
        当前节点 = self.入口

        while 当前节点 != END:
            # 中间件：节点前
            for m in self.中间件:
                m("before", 当前节点, self.状态)

            func = self.节点表[当前节点]
            self.状态.update(func(self.状态))

            # 中间件：节点后
            for m in self.中间件:
                m("after", 当前节点, self.状态)

            路由 = self.边表.get(当前节点)
            当前节点 = 路由(self.状态) if callable(路由) else 路由

        return self.状态
```

> **差异分析**：图中间件 = **before/after 钩子**。装饰器是最 Pythonic 的方式。LangGraph 的 Callback 体系优势在于**与 LangSmith 无缝集成**——你在回调里加一行 `print`，LangSmith 就能生成可视化链路图。
>
> **选型建议**：本地调试 🥇 **装饰器**；团队协作/可视化追踪 🥈 **LangGraph + LangSmith**。

---

### 5.3 流式执行

**功能说明**：图每执行完一个节点，就把当前状态 yield 出来。为什么出现？Agent 执行可能要几分钟——你不能让用户干等着。每完成一个步骤就推送给前端，用户体验更好。

#### LangGraph 方式

```python
# LangGraph 的 stream：每个节点执行完自动 yield
for chunk in app.stream({"输入": "..."}, config):
    节点名 = list(chunk.keys())[0]
    节点结果 = chunk[节点名]
    print(f"节点 {节点名} 完成: {节点结果}")
```

#### 纯手写方式

```python
# 纯手写：把 yield 加在状态机的循环里
def 流式状态机(机, 初始状态):
    """状态机 + yield = 流式执行"""
    机.状态 = {**初始状态}
    当前 = 机.入口

    while 当前 != END:
        func = 机.节点表[当前]
        新状态 = func(机.状态)
        机.状态 = {**机.状态, **新状态}

        yield {当前: 机.状态}  # ← 每个节点执行完就对外推送

        路由 = 机.边表.get(当前)
        当前 = 路由(机.状态) if callable(路由) else 路由

# 使用
for chunk in 流式状态机(机, {"输入": "测试"}):
    print(chunk)
```

> **差异分析**：流式执行 = **生成器（generator）**。在手写的状态机循环里加一行 `yield` 就实现了。LangGraph 的 `stream` 额外做了：**异步流式**（`astream`）、**多种流模式**（只看节点更新 / 只看状态变化 / 只看 LLM token）。
>
> **选型建议**：同步流式 🥇 **手写 yield**（一行的事）；需要异步 + 多模式流 🥈 **LangGraph stream**。

---

## 六、完整案例：客服 Agent 两种实现

> 目标：做一个能**查订单、查库存、发起退款、转人工**的客服 Agent，支持**人工审批退款操作**。

### LangGraph 版本

```python
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from typing import TypedDict, Annotated
import operator

class 客服状态(TypedDict):
    messages: Annotated[list, operator.add]
    当前任务: str
    审批结果: str

# 节点定义
def Agent思考(state):
    res = llm.invoke(state["messages"])
    return {"messages": [res]}

def 工具执行(state):
    last_msg = state["messages"][-1]
    if hasattr(last_msg, "tool_calls"):
        for tc in last_msg.tool_calls:
            result = 执行工具(tc)
            state["messages"].append({"role": "tool", "content": result})
    return state

def 路由判断(state):
    last = state["messages"][-1]
    if hasattr(last, "tool_calls"):
        for tc in last.tool_calls:
            if tc["name"] == "发起退款":
                return "人工审批"
        return "Agent思考"
    return END

# 建图
graph = StateGraph(客服状态)
graph.add_node("Agent思考", Agent思考)
graph.add_node("工具执行", 工具执行)
graph.add_node("人工审批", lambda s: s)

graph.set_entry_point("Agent思考")
graph.add_edge("Agent思考", "工具执行")
graph.add_conditional_edges("工具执行", 路由判断, {
    "Agent思考": "Agent思考",
    "人工审批": "人工审批",
    END: END,
})
graph.add_edge("人工审批", "Agent思考")

app = graph.compile(
    checkpointer=MemorySaver(),
    interrupt_before=["人工审批"],
)

# 执行
config = {"configurable": {"thread_id": "cust-001"}}
app.invoke({"messages": [{"role": "user", "content": "订单SF123能退款吗？"}]}, config)
# ... 停在"人工审批"节点
app.invoke(None, config)  # 审批通过后继续
```

### 纯手写版本

```python
from openai import OpenAI

client = OpenAI()

class 手写客服Agent:
    def __init__(self):
        self.messages = []
        self.需审批操作 = {"发起退款", "删除订单"}

    def 执行(self, 用户输入: str, 最大步数: int = 10) -> str:
        self.messages.append({"role": "user", "content": 用户输入})

        for _ in range(最大步数):
            # Agent思考
            res = client.chat.completions.create(
                model="gpt-4o",
                messages=self.messages,
                tools=tools_schema,
            )
            msg = res.choices[0].message

            if not msg.tool_calls:
                return msg.content

            # 检查是否需要人工审批
            for tc in msg.tool_calls:
                if tc.function.name in self.需审批操作:
                    args = json.loads(tc.function.arguments)
                    print(f"⏸️  需要审批：{tc.function.name}({args})")

                    审批 = input("同意吗？(y/n): ").strip()
                    if 审批 != 'y':
                        self.messages.append({
                            "role": "tool",
                            "tool_call_id": tc.id,
                            "content": "操作被人工驳回",
                        })
                        break

            # 执行工具
            self.messages.append(msg)
            for tc in msg.tool_calls:
                result = 执行工具(tc)
                self.messages.append({
                    "role": "tool",
                    "tool_call_id": tc.id,
                    "content": result,
                })

        return "达到最大步数限制"

agent = 手写客服Agent()
print(agent.执行("订单SF123能退款吗？"))
```

> **差异对比**：两个版本都能跑。LangGraph 版本的优势在于——Checkpoint 自动记录每一步、审批可以来自远程（而非 terminal input()）、出错可以回退到任意节点重试。手写版本的优势在于——完全透明、零依赖、20行核心逻辑。
>
> **选型建议**：原型/个人项目 🥇 **手写**（够用）；团队/生产 🥈 **LangGraph**（团队协作 + 可观测性）。

---

## 七、总结：决策框架

### 一张图判断什么时候该用 LangGraph

```
你的项目
  │
  ├─ 流程是线性的（A→B→C）？                  → 🥇 LangChain Chain / 手写函数串联
  ├─ 流程有1-2个简单分支，无循环？              → 🥇 手写状态机（30行）
  ├─ 有循环（Agent循环等），不需要断点？        → 🥇 手写 while 循环
  ├─ 需要"断点→恢复/重放"能力？               → 🥈 LangGraph（Checkpoint 是核心价值）
  ├─ 需要"人工审批/暂停等待"？                → 🥈 LangGraph（interrupt 是核心价值）
  ├─ 需要"回退到任意步骤重新执行"？             → 🥈 LangGraph
  ├─ 团队协作（需要可视化、文档化流程）？        → 🥈 LangGraph
  ├─ 只想快速验证一个 Agent 原型？              → 🥇 手写 50 行
  └─ 要把 Agent 部署到生产长期维护？            → 🥈 LangGraph
```

### LangGraph 核心价值排序

| 排名 | 特性 | 为什么这是"最值得用LangGraph的理由" |
|---|---|---|
| 🥇 | **Checkpoint** | 断点续传 + 持久化 + 回退重放，手写至少200行还要保证并发安全 |
| 🥈 | **Interrupt** | 人工审批的解耦设计（不依赖stdin），是生产环境的刚需 |
| 🥉 | **Stream** | 开箱即用的多模式流式，前端友好 |
| 4 | **Send (并行)** | 与 Checkpoint 集成，每个并行任务独立可恢复 |
| 5 | **Subgraph** | 子图独立状态和检查点，复杂系统模块化 |
| 6 | **State/Node/Edge** | 这些基础功能手写30行就够，反而是 LangGraph 价值最低的部分 |

### 三条铁律

**铁律一：State + Node + Edge ≠ 用 LangGraph 的理由。**
> 这套东西手写不过30行。如果只是画流程图，用 LangGraph 是杀鸡用牛刀。

**铁律二：Checkpoint 和 Interrupt 是 LangGraph 存在的真正理由。**
> 这两个特性的工程复杂度远超表面看起来那么简单——并发安全、序列化、增量存储、版本管理。LangGraph 80% 的工程价值在这两个特性里。

**铁律三：先手写 50 行状态机，再用 LangGraph。**
> 你不亲手写一遍，就不会理解 LangGraph 的 Checkpoint 到底省了你多少命。也不会有能力在 LangGraph 出错时，判断是框架 bug 还是你的图设计有问题。

### 常见误区

```
❌ 误区一："用了 LangGraph = Agent 就做好了"
   → LangGraph 只是一套流程编排工具。Agent 质量取决于
      Prompt、Tool设计、模型选择——这些框架帮不了你。

❌ 误区二："LangGraph 太复杂，不如全部手写"
   → 当你的系统需要"重试+断点+审批+回退"时，
     手写代码量会指数增长。LangGraph 的复杂度是"固定入场费"。

❌ 误区三："LangGraph 的学习曲线不值得"
   → State/Node/Edge 的学习成本是1小时。
     Checkpoint + Interrupt 的学习成本是半天。
     但这半天省下来的是未来几百小时的断点调试。

✅ 正确心态："LangGraph 不是一个 '做了更多事' 的框架——
   是一个 '帮你做了最痛苦的事' 的框架。"
```

---

## 附：手写 LangGraph 核心 —— 一份完整的最小实现

如果你读到这里想"我还是先手写一个吧"——这份 60 行的最小实现在大多数原型场景下够用了：

```python
import copy

class MiniGraph:
    """LangGraph 核心的最小实现：State + Node + Edge + Checkpoint"""

    def __init__(self):
        self.nodes = {}       # name → function
        self.edges = {}       # name → next_name or routing_function
        self.entry = None
        self.snapshots = {}   # thread_id → [snapshot_list]

    def add_node(self, name, func):
        self.nodes[name] = func

    def add_edge(self, src, dst):
        self.edges[src] = lambda _: dst if dst != "__END__" else None

    def add_conditional_edges(self, src, router):
        self.edges[src] = router

    def set_entry_point(self, name):
        self.entry = name

    def invoke(self, initial_state, thread_id="default", interrupt_before=None):
        state = {**initial_state}
        current = self.entry
        interrupt_set = set(interrupt_before or [])

        while current:
            # Interrupt check
            if current in interrupt_set:
                print(f"⏸️  暂停在: {current}")
                if input("继续？(y/n): ") != 'y':
                    return state

            # Execute node
            new_state = self.nodes[current](state)
            state = {**state, **new_state}

            # Save snapshot
            snapshot = {"node": current, "state": copy.deepcopy(state)}
            self.snapshots.setdefault(thread_id, []).append(snapshot)

            # Route to next
            router = self.edges.get(current)
            current = router(state) if callable(router) else router

        return state

    def resume(self, thread_id):
        """从最新断点恢复"""
        snaps = self.snapshots.get(thread_id, [])
        if not snaps:
            raise ValueError(f"线程 {thread_id} 无断点")
        last = snaps[-1]
        print(f"▶️  从 '{last['node']}' 恢复")
        return self.invoke(last["state"], thread_id)
```

> **这 60 行包含了 LangGraph 四大核心能力中的三个**：State/Node/Edge ✅、条件路由 ✅、Checkpoint ✅、Interrupt ✅。
>
> 当你的需求超出这 60 行的能力范围（并发安全、原子持久化、远程审批、多模式流式）——LangGraph 就是你的下一步。

---

> **文档撰于**：2026-06-06
>
> **核心观点**：**LangGraph 的核心只有两个真正的价值——Checkpoint 和 Interrupt。** State/Node/Edge 你手写 30 行就够，但断点续传和人工审批的工程复杂度，才是 LangGraph 存在的意义。
>
> *先手写，再用框架。这顺序不能反。*

---

*完*
