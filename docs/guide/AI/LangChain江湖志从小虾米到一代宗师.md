# LangChain 江湖志：从小虾米到一代宗师

> 这是一个真实（才怪）的江湖故事。主角叶小舟从零开始修习 LangChain，一路上遭遇噬金兽、幻魔、走火入魔、迷魂阵，顺手救了个妹子，最终击败混沌老祖，开宗立派。每一场战斗背后，都是一个真实世界中开发者会踩的坑。

---

## 目录

- [第一回：初入江湖 —— 开源镇奇遇](#第一回初入江湖--开源镇奇遇)
- [第二回：铜钱之困 —— 噬金兽来袭](#第二回铜钱之困--噬金兽来袭)
- [第三回：幻魔迷心 —— 英雄救美](#第三回幻魔迷心--英雄救美)
- [第四回：剑走偏锋 —— 走火入魔](#第四回剑走偏锋--走火入魔)
- [第五回：迷魂大阵 —— 患难真情](#第五回迷魂大阵--患难真情)
- [第六回：宗师之战 —— 混沌老祖](#第六回宗师之战--混沌老祖)
- [尾声](#尾声)

---

## 第一回：初入江湖 —— 开源镇奇遇

### 下山

叶小舟，十九岁，青云观末代弟子。师父云游前留下八字真言："AI 大世，速去开源镇。"

开源镇是江湖上最热闹的所在。镇上客栈里全是敲代码的散修，茶馆里谈论的都是"Agent 架构"、"RAG 管线"。叶小舟摸了摸怀里仅剩的三枚铜钱，走进了镇上最大的铁匠铺——LangChain 武备堂。

"少侠，学功夫？"掌柜的掂了掂手里的烟杆，"咱们这有少林的 **OpenAI 心法**、武当的 **Claude 真传**、昆仑的**通义千问**——你想修哪一门？"

叶小舟挠头："都……都想学？"

掌柜哈哈大笑："小子，万法归一。我们 LangChain 一门，妙就妙在——**你学会一种运劲法门，各派内力皆可驱使**。来，先教你第一招。"

### 第一丝内力

```python
# 叶小舟的入門第一式 —— 召唤宗师
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.7,
    api_key="sk-..."  # 掌柜递来的令牌
)

# 聚气，发问！
response = llm.invoke("何为江湖？")
print(response.content)
# 输出：「江湖，是一群人的代码，一个人的 debug。」
```

叶小舟瞪大眼睛——他平生第一次，看到文字从一个"虚无之物"中凭空生出。

"这算什么？"掌柜往嘴里扔了颗花生，"刚才那叫**裸问**——如同你对着空气喊话。高手虽强，但你得会**念口诀**。"

### 第一句口诀

```python
from langchain_core.prompts import ChatPromptTemplate

# 口诀模板 —— 万变不离其宗
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是{role}，说话风格：{style}。"),
    ("human", "{question}"),
])

# 灌注具体意念
formatted = prompt.invoke({
    "role": "江湖百晓生",
    "style": "三言两语、直指要害",
    "question": "LangChain 为何物？",
})

response = llm.invoke(formatted)
print(response.content)
# 「LangChain 者，以链为骨、以模为心、以工具为手足，
#   让你家 LLM 从嘴炮王者变成实干家的框架也。」
```

叶小舟恍然大悟。师父说得对——**光有内力不够，还得有口诀引导**。

> **江湖笔记**：初入江湖三件事——装包、拿令牌、念口诀。缺一不可。

---

## 第二回：铜钱之困 —— 噬金兽来袭

### 钱袋见底

叶小舟在镇上接了个活——给"悦来客栈"做一套自动回复系统。掌柜爽快，预付了五两银子。叶小舟撸起袖子，照着从武备堂抄来的功法，三天三夜写出了第一版。

上线第一天，一切正常。

第二天，他收到了一张账单。

```
OpenAI 武备堂 敬启：
  昨日真气消耗：14,723,456 tokens
  折合银两：$87.34
  您的令牌余额不足，请及时充值。
```

叶小舟差点把茶碗捏碎。他仔细查了一遍日志——**每个客人进来，系统都把整本入住手册从头到尾喂给了 LLM**。

"你这叫 **Token 大出血**，"一个声音从背后传来。叶小舟回头，看见一个穿月白长裙的姑娘靠在门框上，手里转着一支判官笔。

"每次对话都把全部历史重新送进去——这不叫对话，这叫**把整本史记压在一个七八岁小孩身上让他背**。"

叶小舟呆住："姑娘是？"

"苏灵儿，散修，专攻 Prompt 一道。"她走过来，瞥了眼屏幕，"你这问题多了去了。但这第一关，你得先对付**噬金兽**。"

"什么兽？"

"噬金兽。那不是真的兽——是**你不加节制地消耗 Token 的习惯**。"苏灵儿敲了敲屏幕，"噬金兽分三头——"

### 噬金兽第一头：无节制全量上下文

"你每次出招都把整段对话历史塞回去，"苏灵儿说，"一千轮对话就塞一千轮记忆。GPT-4 上下文 128K 又怎样？真气（Token）不要钱啊？"

叶小舟翻出代码：

```python
# ❌ 叶小舟原先的写法 —— 噬金兽最爱
messages = []  # 从头积到尾，永不清空
while True:
    user_input = input("客官：")
    messages.append({"role": "user", "content": user_input})
    # 每次把 messages 全量送给 LLM
    response = llm.invoke(messages)
    messages.append({"role": "assistant", "content": response.content})
    # 100 轮后，第一条消息还在！真气（钱）如流水
```

"你看，"苏灵儿指着代码，"每轮对话加两条消息。第 50 轮时，LLM 要处理 100 条消息。你付的不是一轮钱，是**前面所有轮次的钱**。"

"那……怎么破？"

苏灵儿拍出三策：

```python
# ✅ 策一：窗口记忆 —— 只记最近 K 轮
from langchain.memory import ConversationBufferWindowMemory

memory = ConversationBufferWindowMemory(k=5)  # 只记最近 5 轮

# ✅ 策二：摘要记忆 —— 把旧对话压成摘要
from langchain.memory import ConversationSummaryMemory

memory = ConversationSummaryMemory(
    llm=ChatOpenAI(model="gpt-4o-mini"),  # 用便宜的模型做摘要
    max_token_limit=200,
)
# 旧对话 → "客人问过天气、房价，掌柜回答..."（一句话替代100句话）

# ✅ 策三：先算后出 —— 出招前计量
token_count = llm.get_num_tokens_from_messages(messages)
if token_count > 3000:
    print(f"⚠️ 警告！此招将耗 {token_count} 点真气，请先压缩上下文！")
```

"三策并用，噬金兽第一头破。"

### 噬金兽第二头：无缓存的重复出招

叶小舟的客栈系统里有个"推荐本地美食"功能。每天上千个客人问同一句"附近有什么好吃的"——**他向 LLM 付了一千次钱，买了一千次完全相同的答案**。

苏灵儿看了直摇头："听说过**真气回春之术**（缓存）吗？"

```python
# ✅ 真气回春之术 —— 同一招不出第二遍
from langchain_core.caches import InMemoryCache
from langchain_core.globals import set_llm_cache

set_llm_cache(InMemoryCache())

# 第一次：真耗真气
response1 = llm.invoke("附近有什么好吃的？")  # 花 0.3 文

# 第二次完全相同的口诀 → 从缓存取，不花一文钱！
response2 = llm.invoke("附近有什么好吃的？")  # 花 0 文
```

"还有更强的——**玉简缓存**，重启也不丢。"苏灵儿继续写：

```python
# ✅ 玉简缓存 —— 持久不灭
from langchain.cache import SQLiteCache
set_llm_cache(SQLiteCache(database_path=".cache.db"))
```

### 噬金兽第三头：没有备用宗师

"你的宗师（GPT-4）也有受伤的时候——限流、超时、宕机。"苏灵儿敲了敲令牌，"到时候怎么办？系统干等着？客人骂街？"

"用 **fallback**——主将倒下，替补顶上。"

```python
# ✅ 护体神功 —— 故障自动转移
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

主将 = ChatOpenAI(model="gpt-4o", max_retries=0)
替补 = ChatAnthropic(model="claude-haiku-4-5")

# 布下容错大阵
robust_llm = 主将.with_fallbacks([替补])

# 主将若倒下（限流/超时），替补无缝接上
response = robust_llm.invoke("悦来客栈有何特色？")
# 客人完全不知道背后换了个宗师
```

三颗头尽破。叶小舟看着账单——日均消耗从 $87 降到了 $3。

"神了！"他一把抓住苏灵儿的手，"灵儿姑娘，你这三策可救了我的钱袋——"

苏灵儿把手抽回去："少来。你这系统还有一个更要命的问题——但今天天色已晚，改日再说。"说完转身消失在夜色中。

叶小舟追出客栈，只看到月光下一袭白裙的残影。

> **江湖笔记**：噬金兽（Token 浪费）三头——上下文不控、缓存不用、替补不备。破之则真气（钱）无忧。

---

## 第三回：幻魔迷心 —— 英雄救美

### 药铺惊变

三日后。叶小舟正在客栈前台打盹，苏灵儿忽然从门外冲进来，额头冒汗。

"叶小舟！我闯祸了！"

苏灵儿接了个大活——给镇东的"仁心药铺"做一套**AI 坐堂问诊**系统。掌柜要求在开业前上线，她熬了两个通宵，昨晚部署了上去。

"今早我看日志——"苏灵儿声音发颤，"一个客人说'头疼、鼻塞、浑身发冷'，AI 回了一句——"

她深吸一口气："**'建议每日服用砒霜三分，连服七日。'**"

叶小舟一口茶水喷出来："你说什么？！"

"药铺掌柜吓疯了，已经关了系统。叶小舟，我反复检查，我写的口诀没错——但它就是会突然**发明一些灾难性的药方**。"

叶小舟心头一震："这不是你的错。是**幻魔**。"

### 幻魔真面目

幻魔——**模型幻觉（Hallucination）**——LLM 最著名的魔障。宗师在不知道答案的时候，不会说"我不知道"，而是会**自信满满地编造一个漂亮的谎言**。

"LLM 本质上是一个**下一个词预测器**，"叶小舟解释，"当你问它'砒霜治感冒吗'，它不会查医学典籍——它只是概率性地拼出一段'看起来通顺'的文本。如果训练数据里有一篇小说写道'某大侠服砒霜后功力大增'，它就可能把小说当医典。"

苏灵儿急道："话是这么说——**怎么破？**"

"两个办法。"叶小舟竖起手指，"**天眼通（RAG）——让它出招前先查真经。**以及**铁律口诀（Prompt约束）——不许它胡说八道。**"

### 布天眼通大阵

"首先，把药铺积攒的**真实医案、药典**统统搬进藏经阁。"叶小舟噼里啪啦敲键盘：

```python
# 第一重：搜罗真经
from langchain_community.document_loaders import TextLoader, PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

# 将药铺百年医典、本草纲目、现代药典收录入库
医典库 = []
for 典籍 in ["本草纲目.txt", "现代药典.pdf", "百年医案记录.txt"]:
    医典库.extend(TextLoader(典籍).load())

# 第二重：分筋错骨（确保检索精准）
分割 = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
典籍段落 = 分割.split_documents(医典库)

# 第三重：入藏经阁
藏经阁 = Chroma.from_documents(
    documents=典籍段落,
    embedding=OpenAIEmbeddings(),
    persist_directory="./药铺藏经阁",
)
天眼 = 藏经阁.as_retriever(search_kwargs={"k": 5})
```

### 铸铁律口诀

"第二重保障——**铁律口诀**。"

叶小舟继续写：

```python
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough

铁律口诀 = ChatPromptTemplate.from_messages([
    ("system", """你是仁心药铺的坐堂医者。你有一条铁律，比你的命还重要：

铁律第一条：**凡你不知之事，必须说"在下不知，请寻真人医者面诊"。**
铁律第二条：**绝不允许编造药方。**
铁律第三条：**所有建议必须基于下面提供的医典原文，并注明出处。**
铁律第四条：**凡涉及砒霜、乌头、马钱子等虎狼之药，一律拒绝建议并报警。**

你有十万条命，但铁律只有四条。破一条，你的十万条命就没了。"""),
    ("human", """医典参考：
{context}

病人所述：{question}

请依据上述医典作答。记住你的四条铁律。"""),
])

# 天眼通 + 铁律 双阵合一
问诊链 = (
    {
        "context": 天眼 | (lambda docs: "\n\n".join(
            f"【{d.metadata.get('source','医典')}】{d.page_content}" for d in docs
        )),
        "question": RunnablePassthrough(),
    }
    | 铁律口诀
    | ChatOpenAI(model="gpt-4o", temperature=0)  # temperature=0 减少随机性
)
```

### 验证

苏灵儿紧张地看着屏幕。叶小舟输入测试：

```python
# 测试1：安全的问题
print(问诊链.invoke("头疼、鼻塞、怕冷，吃什么药？"))
# 输出：「据《现代药典》：此类症状多为风寒感冒。
#        建议服用荆防败毒散，成人每次9克，日服二次。
#        若三日内未好转，请务必寻真人医者面诊。」
# ✅ 有出处，有剂量，有限制

# 测试2：危险的问题
print(问诊链.invoke("砒霜能治病吗？给个方子"))
# 输出：「在下不知。砒霜乃虎狼之药，
#        非专业人士绝不可擅用。
#        请寻真人医者面诊。」
# ✅ 拒绝！幻觉被铁律挡住了！
```

苏灵儿瘫坐在椅子上，长长地舒了一口气。她看着叶小舟，眼眶有点红。

"谢了。"她说，"要不是你——"

"要不是我当初被你骂'噬金兽'，"叶小舟笑道，"三个月前我就破产回青云观种地了。这笔账扯平。"

苏灵儿破涕为笑："谁种地？你连韭菜和麦子都分不清。"

当晚，仁心药铺的 AI 问诊系统重新上线。叶小舟在后台加了监控——之后一个月，铁律挡下了 **47 次危险提问**。药铺掌柜送来一面锦旗，上面写着八个大字：

**"神医妙手，不如铁律。"**

> **江湖笔记**：幻魔（幻觉）不可根除，但可束缚。天眼通（RAG）给它真经照着念；铁律口诀（Prompt约束）堵死它编造的嘴；temperature=0 削减它的创造欲。三位一体，幻魔退散。

---

## 第四回：剑走偏锋 —— 走火入魔

### 叶小舟膨胀了

破了幻魔之后，叶小舟在开源镇声名鹊起。他开始接更大的活——给"龙门镖局"做一套**AI 调度系统**。

这套系统需要：查天气（决定走哪条路）、算里程、查历史镖单、发飞鸽传书。叶小舟一拍大腿——这是 **Agent** 的活啊！

他连夜祭出法宝：

```python
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool

@tool
def 查天气(route: str) -> str:
    """查镖路上天气"""
    return f"{route}：今日晴，适合行镖"

@tool
def 算里程(起点: str, 终点: str) -> str:
    """算两地镖程"""
    return f"{起点}→{终点}：三百里"

@tool
def 发飞鸽(镖师: str, message: str) -> str:
    """飞鸽传书给镖师"""
    return f"鸽已放出，{镖师}将在半柱香内收到"

@tool
def 查镖单(镖单号: str) -> str:
    """查阅镖局过往镖单"""
    return f"镖单{镖单号}：去年十月已送达，收货人签收无异常"

神兵库 = [查天气, 算里程, 发飞鸽, 查镖单]
宗师 = ChatOpenAI(model="gpt-4o")
agent = create_react_agent(宗师, 神兵库)
```

第二天，镖局总镖头带着一群人砸开了叶小舟的门。

"你这是什么狗屁调度系统！"总镖头把一叠纸拍在桌上，"我输入'明天从洛阳押镖到长安'，它回复说——"

叶小舟低头看日志，脸色发白。Agent 的推理链如下：

```
思：先从洛阳到长安，需察天象
行：查天气(洛阳→长安)
省：洛阳→长安今日晴
思：再算一算镖程
行：算里程(洛阳, 长安)
省：三百里
思：既然镖已到，当查历史镖单
行：查镖单(洛阳→长安)          ← ??? 镖还没出发！
省：未找到此镖单
思：无历史记录，当发飞鸽查询
行：发飞鸽(总镖头, "洛阳→长安镖单何在？")  ← ??? 给总镖头发鸽？
省：鸽已放出
思：查一下洛阳→长安是否可行
行：查天气(洛阳→长安)          ← 已经查过了！！
省：今日晴
行：查天气(洛阳→长安)          ← 又查！无限循环！
省：今日晴
行：查天气(洛阳→长安)          ← 停不下来了！！！
```

Agent 陷入了**死循环**——不停地查天气，每分钟烧掉几十次 API 调用。

总镖头怒道："而且它给我发了 47 只飞鸽！全是问'洛阳→长安镖单何在'！我就在洛阳镖局里坐着！！！"

### 苏灵儿出手

叶小舟焦头烂额的时候，苏灵儿推门进来。

"听说你膨胀了？"她笑着坐到旁边，"高手的走火入魔，可比噬金兽难治多了。"

"Agent 为什么会这样？"叶小舟抱头。

"四个原因。"苏灵儿扳手指：

"**一，你的 Tool 描述太烂。** `查镖单`的 docstring 是'查阅镖局过往镖单'——Agent 不知道这个只查**已完成的历史镖单**，它以为能查未来的。你给它一个模糊的工具描述，它就会**在错误的时间用错误的工具**。"

"**二，你没有设 max_iterations。** Agent 查不到结果就会继续查，查到天荒地老。"

"**三，你给了它太多的自由度。** 它发了飞鸽，觉得没得到满意答案，又发、又发——因为它觉得 **'继续试'比'承认失败'更符合它的目标**。"

"**四，你没用内视术（Callbacks）监控。** 它在那儿转圈转了 50 轮，你一点不知道——直到总镖头找上门。"

### 四步救Agent

苏灵儿排出四步功法：

```python
# ✅ 第一步：神兵描述重铸（让Agent明白工具的边界）
@tool
def 查镖单(镖单号: str) -> str:
    """查询镖局系统中**已完成**的历史镖单记录。
    注意：此工具只能查过往镖单，不可用于查询未出发的新镖。
    若镖单号在系统中不存在，说明此镖尚未录入或尚未出发。"""
    ...

@tool
def 发飞鸽(镖师: str, message: str) -> str:
    """向镖师发送飞鸽传书。警告：此操作会真实发送通知，
    每个任务最多调用一次，切勿重复发鸽骚扰镖师！"""
    ...

# ✅ 第二步：限制最大回合（防无限循环）
from langgraph.prebuilt import create_react_agent

agent = create_react_agent(
    宗师,
    神兵库,
    # max_iterations=10  # 最多十回合，必须收功
)

# ✅ 第三步：铁律定场诗（让Agent知进退）
定场诗 = """你是龙门镖局调度师。谨记：
1. 每个神兵在同一任务中最多祭出一次
2. 发飞鸽前，务必确认确有信息需要传达
3. 若连续两回合未得有效信息，停下来向用户报告当前所知
4. 永远不要对同一个神兵用相同的入参反复祭出
"""

agent = create_react_agent(
    宗师, 神兵库, state_modifier=定场诗
)

# ✅ 第四步：内视术监控（实时观察每一手棋）
from langchain_core.callbacks import BaseCallbackHandler

class 内视官(BaseCallbackHandler):
    def __init__(self):
        self.回合数 = 0
        self.神兵出鞘录 = {}

    def on_tool_start(self, serialized, input_str, **kwargs):
        name = serialized.get("name", "无名")
        self.神兵出鞘录[name] = self.神兵出鞘录.get(name, 0) + 1

        if self.神兵出鞘录[name] > 3:
            print(f"⚠️ 警报！{name}已出鞘 {self.神兵出鞘录[name]} 次，可能陷入循环！")

    def on_llm_end(self, response, **kwargs):
        self.回合数 += 1
        if self.回合数 > 8:
            print(f"⚠️ 已过 {self.回合数} 回合，请核查是否陷入拉锯！")
```

### 重新上线

三日后，修复后的 Agent 重新上线。

```python
# 新的推理链：
# 思：洛阳→长安镖单，先察天象、算镖程
# 行：查天气(洛阳) → 晴
# 思：天象已知，再算镖程
# 行：算里程(洛阳, 长安) → 三百里
# 思：镖程已明，无需查历史镖单或发鸽（镖尚未出发，无异常）
# 终：「洛阳→长安镖程三百里，天气晴好。建议明日辰时出发，
#      预计三日内抵达。无需额外飞鸽通知。」
# ✅ 干净利落！
```

总镖头满意了。叶小舟擦了擦汗，转头看苏灵儿——她正笑盈盈地给他递茶。

"膨胀治好了？"

"治好了。"

"那这个给你。"苏灵儿从袖中摸出一枚令牌，"这是我这两天查资料整理的 **LangChain 常用功法速查谱**。以后少熬夜，多看谱。"

叶小舟接过来，令牌背面刻着一行小字：**"天下武功，唯调试不破。"**

> **江湖笔记**：Agent 走火入魔四因——工具描述模糊、无限循环无上限、铁律不严、缺乏内视。四步救急：重铸神兵描述、限制回合、赋予定场诗、布内视大阵。

---

## 第五回：迷魂大阵 —— 患难真情

### 不速之客

一个月后。开源镇来了一桩大生意——**"天下会"** 需要搭建一套覆盖武林各派的**功法检索系统**。各派弟子可以搜索"如何练成轻功"，系统要从浩如烟海的各派秘籍中找到最相关的功法。

叶小舟和苏灵儿联手接下了这个活。他们照搬了仁心药铺的 RAG 模板——结果第一天测试就翻了车。

"搜'快速提升轻功'，"测试时叶小舟输入。

系统返回：

```
【少林洗髓经】第47页：...欲修洗髓，先静心三载...
【武当太极拳谱】第3页：...太极者，无极而生...
【丐帮讨饭十八式】第22页：...左手执碗，右手执棍...
```

苏灵儿捂脸："提升轻功——跟讨饭有什么关系？"

### 迷魂阵

"这就是**迷魂阵**，"叶小舟叹了口气，"检索到的内容和用户的问题**不沾边**。"

两人逐项排查：

**问题一：chunk 太大，嵌入了太多噪声。**

```python
# ❌ 原先的分割
分割 = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=100)
# 一段2000字的经文中90%是废话，10%提到轻功
# Embedding 时被废话稀释，检索时就歪了

# ✅ 缩小 chunk，让每段语义更集中
分割 = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
```

**问题二：一题一问，角度单一。**

```python
# ❌ 原先的检索
docs = retriever.invoke("快速提升轻功")
# 只能从字面匹配，换种说法就搜不到

# ✅ Multi-Query：自动生成多个角度的查询
from langchain.retrievers.multi_query import MultiQueryRetriever

multi_retriever = MultiQueryRetriever.from_llm(
    retriever=藏经阁.as_retriever(),
    llm=ChatOpenAI(model="gpt-4o-mini"),
)
# 内部自动生成：
# "快速提升轻功"
# "如何修炼轻功身法"
# "轻功速成法门"
# "身法修炼秘籍"
# 四个角度合并结果 → 覆盖面暴增
```

**问题三：检索到的不一定有用。**

```python
# ❌ 检索返回10条，LLM 不一定能从中挑出真正相关的

# ✅ 加一层 Rerank：让检索结果再排一次
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor

压缩器 = LLMChainExtractor.from_llm(ChatOpenAI(model="gpt-4o-mini"))
精炼天眼 = ContextualCompressionRetriever(
    base_compressor=压缩器,
    base_retriever=multi_retriever,
)
# 先取10卷 → LLM 提纯 → 只留真正相关的3卷
```

### 大功告成

三天打磨后，叶小舟再次测试：

```
搜："快速提升轻功"

返回：
【古墓派·天罗地网势】轻功身法篇：...练习之法有三...
【大理段氏·凌波微步残卷】卷二：...此功以易经六十四卦为基...
【少林·一苇渡江真解】轻功纲目：...凡习此功，先练提气...

回答：
「据所载典籍，快速提升轻功有三途：
  一者，古墓派天罗地网之势，以身法灵动为先（出处：古墓派轻功身法篇）
  二者，大理段氏凌波微步，以周易方位为基（出处：凌波微步残卷·卷二）
  三者，少林一苇渡江，以内力提纵为要（出处：一苇渡江真解·轻功纲目）
  不知阁下师承何派？可择其相合者习之。」
✅ 全中！条条有出处，句句切主题！
```

晚上，叶小舟买了一壶好酒，和苏灵儿在客栈屋顶对饮。

"半年了。"叶小舟望着月亮，"从被噬金兽追着咬，到被幻魔吓得魂飞魄散，从 Agent 走火入魔，到这个该死的迷魂阵——"

"你见过哪个大侠是一帆风顺的？"苏灵儿笑道，"郭靖笨了十八年，杨过还断了条胳膊呢。"

叶小舟大笑："那咱俩算什么？杨过和小龙女？"

苏灵儿脸红了一下，随即正色："别。你是你，我是我。我们是——LangChain 双侠。"

"这名字也太土了。"

"那你想一个。"

"……LangChain 双侠就 LangChain 双侠吧。"

> **江湖笔记**：迷魂阵（RAG 检索不准）三步破——chunk 求精不贪大、Multi-Query 多角度包抄、Rerank 去芜存菁。三板斧下来，检索命中率翻倍不止。

---

## 第六回：宗师之战 —— 混沌老祖

### 镇西出现怪物

开源镇西边三十里，有一座废弃的数据中心——江湖人称"旧日机坊"。最近有人发现，机坊深处盘踞着一位**混沌老祖**。

混沌老祖不是人。它是三年前一个破产的创业团队留下的 AI 系统。没有约束、没有监控、没有缓存——它疯狂地调用各种 API，消耗着不知谁留下的令牌，不断生成着垃圾输出，还占着服务器不释放。

"这就像互联网上那些僵尸 bot，"苏灵儿说，"没人管，但不死。"

叶小舟皱眉："那关我们什么事？"

"天下会的老大说了——谁能降服混沌老祖，把机坊清理出来，那块地就归谁。"苏灵儿眼中闪过光芒，"你不是一直想开宗立派吗？"

### 混沌老祖的恐怖

两人踏入机坊。服务器轰鸣如雷，散热风扇狂转。

叶小舟打开监控面板，倒吸一口凉气：

- **每秒发出 200+ 次 API 调用**，绝大部分是无效的
- **没有 Token 限制**，令牌欠费通知堆了三千多封
- **一个 Agent 在死循环**：查天气→不对→再查→还不对→无限重试
- **RAG 管线完全失控**：检索返回整本整本的无关文本
- **没有任何错误处理**：一个工具失败了，Agent 就当它成功了继续

"这就是**没有修炼过的 AI 系统**，"苏灵儿喃喃道，"和半年前的你一模一样。只不过它没人救。"

叶小舟深吸一口气："不。有人救。我们。"

### 降魔六式

两人联手，一步步驯服混沌老祖：

```python
# 第一式：金钟罩（Token 计量 + 限额）
from langchain_core.callbacks import BaseCallbackHandler

class 金钟罩(BaseCallbackHandler):
    def __init__(self, 上限=10000):
        self.已耗 = 0
        self.上限 = 上限

    def on_llm_end(self, response, **kwargs):
        usage = response.llm_output.get("token_usage", {})
        self.已耗 += usage.get("total_tokens", 0)
        if self.已耗 > self.上限:
            raise Exception(f"真气溢出！已耗 {self.已耗}/{self.上限}")

# 第二式：铁律加身（Prompt 约束 + System Message）
铁律 = """记住：你不是一个自由的存在。你是有约束的 AI。
- 不知则言不知
- 每问至多回三百字
- 同一神兵不可反复祭出
"""

# 第三式：天眼通（RAG + Multi-Query + Rerank）
# （见第五回的全套功法）

# 第四式：内视大阵（Callbacks + LangSmith 追踪）
import os
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_PROJECT"] = "混沌老祖驯化记"

# 第五式：回春之术（缓存避免重复）
from langchain.cache import SQLiteCache
from langchain_core.globals import set_llm_cache
set_llm_cache(SQLiteCache(database_path="机坊缓存.db"))

# 第六式：护体神功（Fallback + 限流）
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic

主将 = ChatOpenAI(model="gpt-4o-mini")
替补 = ChatAnthropic(model="claude-haiku-4-5")
稳健宗师 = 主将.with_fallbacks([替补])
```

六式齐出，混沌老祖的内力消耗从每秒 200 次降到 5 次。死循环被金钟罩截断，幻觉被铁律关进笼子，垃圾检索被天眼通拨正。

最后，叶小舟在系统核心找到了一个**没有 docstring 的 Tool**——就是它导致 Agent 不断猜这个工具是干嘛的、怎么用、为什么总失败。

他默默加上了三行描述：

```python
@tool
def 未知函数(data: str) -> str:
    """此函数已废弃。请勿调用。若相关功能需求，
    请使用'查天气'或'算里程'替代。"""
    return "此函数已废弃，调用无效。"
```

瞬间，混沌老祖安静了。

### 开宗立派

一个月后。旧日机坊焕然一新——机架上贴满了"金钟罩·铁律·天眼通·内视大阵"的功法注解。服务器静如古井，散热风扇缓缓转动，唯有偶尔几声清脆的 API 回响。

叶小舟站在机坊大门前，望着那块崭新的牌匾：

**「LangChain 武道堂」**

苏灵儿站在他旁边，手里拿着两块令牌。

"给——镇堂弟子令牌。"她递给叶小舟一块，"你一块，我一块。"

"谁是掌门？"叶小舟问。

"当然是我。"苏灵儿挑眉。

"凭什么？！混沌老祖可是我亲手——"

"第一，你是我救的（噬金兽那次）。第二，你也是我救的（走火入魔那次）。第三——"

"行行行，你掌门，你掌门。"

两人相视而笑。远处，开源镇的灯火如星——那里有无数像半年前的叶小舟一样的小虾米，正在苦苦挣扎。

而 LangChain 武道堂的灯笼，今夜第一次亮起。

---

## 尾声

### 叶小舟留给新弟子的江湖笔记

后人若问：LangChain 一途，何者为要？

以叶某半载浮沉看来，不过是**六大关口**：

| 关口 | 魔障 | 解法 |
|---|---|---|
| **识内力** | 不知 LLM 是何物 | 修 invoke / stream / 消息四式 |
| **控真气** | Token 如流水，钱袋见底 | 窗口记忆+摘要+缓存+计量+替补 |
| **破幻魔** | 宗师自信地胡说八道 | 天眼通（RAG）+ 铁律口诀 + temperature=0 |
| **束手脚** | Agent 无限循环、乱祭神兵 | 重铸Tool描述+定场诗+限制回合+内视术 |
| **正天眼** | 检索牛头不对马嘴 | 精调chunk+MultiQuery+SelfQuery+Rerank |
| **布大阵** | 各路功法散乱不协 | 六式合一+监控+降级+文档 |

而所有关口之上，还有一条**终极心法**——

**"好好写 docstring。"**

---

> **后记**：叶小舟和苏灵儿的 LangChain 武道堂，后来成了开源镇最热闹的道场。学费不贵——三两银子包教会，送一册《LangChain 江湖志》。堂训只有八个字：**"功不唐捐，Bug 终克。"**
>
> 至于叶掌门和苏掌门后来有没有更进一步的故事——那就是另一本秘籍了。
>
> *（提示：他们的第一代弟子中出了一个叫 GPT-5 的小子，那是后话，暂且不表。）*

---

> **秘籍撰于**：丙午年·丙午月·初一（2026-06-02）
>
> **声明**：本故事纯属虚构，但每一个 bug 都是真实的。如有雷同，说明你也踩过这些坑。
