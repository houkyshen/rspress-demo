# vide-coding经验2——创建AI Agent
> 时间：2026.6.1
这次是让AI根据用户的输入，生成相应的shell命令，然后执行。（用shell代替一堆文件操作tool或者说本地MCP tool）

## 第一步，用一句话让Qoder写个代码
**prompt1**: 
帮我写一个AI Agent应用，要求如下：
- 语言：Python
- AI模型：通义千问
- 项目管理：uv
- VS Code默认终端：PS
- AI框架：Pydantic AI
- Agent功能：接受用户的输入，然后生成相应的BASH命令(基于Git Bash)，然后执行。
- 输出要求：文档和代码都尽量少，实现MVP即可，但日志要清楚说明做了什么，要使用日志模块。

结果：实现了基本功能，但是其实不算是真正的Agent，因为没有传工具给LLM，AI只是负责生成命令，然后由用户执行。缺陷就是AI没办法执行多轮命令。