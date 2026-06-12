# Langchain等AI框架的源码解读
## model.bind_tools
langchain_deepseek包的chat_models模块（模块是单独的文件，文件名是chat_models.py）里面的ChatDeepSeek类，ChatDeepSeek类的bind_tools方法的源码如下：
```python
    def bind_tools(
        self,
        tools: Sequence[dict[str, Any] | type | Callable | BaseTool],
        *,
        tool_choice: dict | str | bool | None = None,
        strict: bool | None = None,
        parallel_tool_calls: bool | None = None,
        **kwargs: Any,
    ) -> Runnable[LanguageModelInput, AIMessage]:
```
主要关注的是tools参数的类型注解。
```python
tools: Sequence[dict[str, Any] | type | Callable | BaseTool]
```

## 1. 整体意思
`tools` 是一个**列表/可迭代序列**，里面可以放 **4 种东西**：
1. `dict[str, Any]`
2. `type`
3. `Callable`
4. `BaseTool`

---

## 2. 四种类型分别是什么？
### ① `dict[str, Any]`
**字典**
- key 是字符串
- value 可以是任意类型

**对应代码：**
```python
{"name": "get_weather", "description": "..."}
```

---

### ② `type`
**类（class）**
就是你定义的一个**类本身**，不是实例。

**对应代码：**
```python
class MyTool:
    pass

tools = [MyTool]  # 这里放的就是 type
```

---

### ③ `Callable`
**可调用对象 = 函数 / 方法**
只要能加括号 `()` 运行的都是 Callable。

**对应代码：**
```python
def my_func():
    pass

tools = [my_func]  # 函数就是 Callable
```

---

### ④ `BaseTool`
**工具基类实例**
LangChain / Claude MCP 里的标准工具对象。

**对应代码：**
```python
from langchain.tools import BaseTool

tool = MyTool()  # 实例化后的对象
tools = [tool]
```
# 