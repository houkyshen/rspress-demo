# AI大模型完整学习路线（思维导图转Markdown）
## 一、前置知识
### 1. 编程基础
- Python语言：基础语法、Anaconda、Jupyter开发环境
### 2. 数学基础
#### （1）高等数学：导数、偏导、梯度
#### （2）线性代数：标量与向量、矩阵与张量、矩阵求导
#### （3）概率与统计：概率分布、贝叶斯定理、似然函数

## 二、大模型应用基础
### 1. 基础认知
#### （1）AI与大模型的发展历程
- 从机器学习到深度学习的飞跃
- 深度学习的诞生与发展
- 大模型的起源与发展
#### （2）大模型通用与通用人工智能
- 认知与辨析：大模型与AGI关系、发展趋势
#### （3）AI应用场景
- 自然语言NLP：分词、词性生成、命名实体识别NLP基础概念、机器翻译
- 计算机视觉CV：熟悉图像分类、目标检测、语义分割CV基本概念
- 语音识别合成：语音识别、视频分析
#### （4）主流大模型
- 国际知名
  - Meta:Llama系列
  - OpenAI:GPT系列
  - Google:Gemini
  - Anthropic:Claude系列
  - 深度求索:DeepSeek
- 国产主流
  - 阿里：Qwen系列
  - 智谱清言：GLM系列

### 2. 架构原理
#### （1）Transformer架构
- 编码器、解码器结构
- 自注意力机制与多头注意力机制
- 大模型如何理解和表示单词
- Transformer变体之BERT架构：使用上文与下文的双向预测（类似于填空）
- Transformer变体之GPT架构：使用从前到后的单向预测模式（类似于补全）
#### （2）MoE模型
- MoE模型的工作原理
- MoE模型的优点
- MoE模型的应用：自然语言处理、推荐系统

### 3. 硬件基础
- GPU加速原理：GPU与CPU计算机的区别对比
- 混合精度训练：CUDA核心与显存管理、FP16/FP32混合使用

### 4. 提示词工程基础
#### （1）Prompt基本概念、在大模型应用中的重要性
#### （2）Prompt四要素：角色、目标、执行方案、输出格式
#### （3）Prompt设计基本原则：简洁性、上下文与语境的设计、问题明确性、结构化与非结构化prompt
#### （4）常见的Prompt工程设计策略
- 少样本提示(Zero-Shot)
- 多样本提示(Few-Shot)
- 链式思考（思维链COT）
- 自我一致性（自洽性，Self-Consistency）
- 思维树(Tree-of-thought,ToT)
#### （5）优化Prompt的输出效果
- 调整Prompt中的语句顺序
- 指令和示例的数量与多样性
- 负面提示与约束
- 增强输出的精确度

## 三、项目实战：主流AI工具实操
### 1. Ollama工具
- Ollama定义与安装
- 如何调用私有大模型
- 云端部署(AWS、阿里云)、本地部署等模型部署流程与方法
- Ollama Java or python Rest API与模型对话
### 2. Dify AI平台
- Dify定义与搭建
- Dify本地部署与服务器部署
- Dify工作流构建以及工具调用
- Dify导入外部知识库
- 项目实战：案例：如何搭建AI Agent、案例：搭建智能客服
### 3. Claude AI工具
- Claude注册和使用
- Claude模型与Claude API Key
- Claude Function Calling原理与实现
- 实战项目-天气查询
### 4. Anthropic MCP
- Function Calling vs MCP：Function Calling是如何工作的?、Function Calling企业级应用的关注点、如何使用FunctionCalling
- MCP概念、原理剖析与C/S架构
- 案例：多种MCP Servers部署与调试
- 案例：自定义MCP
### 5. AI代码编程工具-Cursor AI
- Cursor的使用技巧
- Cursor的调试技巧
- 快速开发自己的项目
### 6. Coze(扣子)平台
- Coze的概述与注册
- 设置提示词
- 如何使用工作流
- 添加自己的插件
- 创建知识库：文本、表格、图片
- 创建并使用数据库
### 7. AIGC生成式大模型各类工具
- 生成简历，写小红书文案项目
- Kimi+GPT4+文心一言+Gemini大模型实现对比
- 大模型辅导学生做数学题实操项目
- 小红书打造文案和抖音脚本创作和分镜头实操项目
- 短片小说创作爆款微头条项目
- 大模型进行AI画图

## 四、大模型应用主流开发框架
### 1. LangChain框架
#### （1）LangChain框架简介
- 构建大模型应用的完整流程：模型交互、数据整合、应用部署
- LangChain的安装
- 调用大模型三要素：base_url、api_key、model_name
#### （2）LangChain核心组件
##### ① 模型IO操作：invoke、stream、batch、ainvoke等
  - Prompt Template
  - Output Parsers
  - Function Caling
##### ② 链模块: Chains/LCEL
  - Chains的设计理念
  - 传统的Chain
  - SequentialChain
  - RouterChain
  - Chains功能实践
##### ③ Memory记忆功能
  - Memory模块的设计理念
  - 如何自定义Memory模块
  - spacy工具安装
  - 内置的Memory模块
##### ④ 智能体Agents
  - Agent架构设计的背景
  - 基于LangChain的Agent抽象
  - 自定义基于ReAct范式的Agents
  - 使用LangChain定义的ReAct策略
##### ⑤ RAG架构
  - Source & data loaders
  - Text Splitters
  - Text embedding models
  - vector store
#### （3）项目实践
- 案例1：LangChain构建智能问答系统
- 案例2：LangChain实现文档摘要生成
- 案例3：LangChain实现智能助手
### 2. Dify框架
### 3. N8N框架

## 五、大模型应用RAG开发
### 1. EmbeddingModels嵌入模型
- 嵌入的基本概念与工作原理
- 常见的嵌入技术
  - 词嵌入：Word2Vec、GloVe、FastText等经典方法
  - 文本嵌入：BERT、GPT等预训练模型的嵌入
  - 图像和音频的嵌入表示
- 特征检索：如何将结构化数据转为嵌入表示
### 2. VectorStore向量存储
#### （1）向量数据库介绍
- 常见的向量数据库：Milvus、Chroma、Pinecone、FAISS等
- 向量数据库与传统数据库的区别与优劣对比
#### （2）向量数据库的核心操作
- Add添加数据
- Query查询数据
- Update/Delete管理数据
#### （3）使用向量数据库进行相似性检索
- 文本相似度搜索：基于向量的文档匹配
- 图像识别与检索：特征向量提取与匹配
- 推荐系统：基于用户与物品的向量表示
#### （4）RAG技术概述
##### ① LLM面临的主要问题
  - 信息滞后/幻觉、知识更新滞后性、内容不可追溯
  - 领域专业知识能力欠缺、长文本处理能力弱
##### ② 什么是RAG技术？：外部知识的利用、生成内容的准确性
##### ③ RAG技术优势：数据及时更新、模型的可解释性、高定制能力、减少成本
##### ④ RAG的核心原理与工作流程解析
#### （5）RAG工程化
##### ① RAG应用流程
1. 数据准备阶段：数据爬取、文本分割、向量化(Embedding)、数据入库
2. 检索生成阶段：问题向量化、向量检索、注入Prompt、LLM生成答案
##### ② RAG技术迭代
- NaiveRAG→优化RAG→Advanced RAG→ModularRAG
- GraphRAG：知识图谱原理与工作流
- AgentRAG：多Agent协作RAG
##### ③ RAG使用效果评估
- 能力指标：上下文相关性、答案准确性、答案相关性
- 故障指标：遗漏的关键信息、幻觉的内容、面对错误情况的健壮性
- 评估工具：RAGS评估、Truels评估
#### （6）RAG在对话系统中的应用：结合RAG提升对话系统的表现与智能化
#### （7）项目实战
- 案例1：Qwen+Chroma+LangChain构建本地私有知识库问答系统
- 案例2：RAG+DeepSeek构建企业私有知识库/客服助手

## 六、大模型应用Agent开发
### 1. 认知智能体
- 智能体的定义与作用
- 智能体的基本架构与功能：规划(Planning)、记忆(Memory)、工具(Tools)、执行(Action)
### 2. 工具调用：Function Calling
#### （1）FunctionCalling的概念与应用
  - Function Calling简单理解
  - Function Calling的实现过程
#### （2）系统与跨模型的Function Calling
  - 提升Agent的通用性、不同系统间的功能调用
#### （3）Function Calling的优化
  - 设计高效的Function Calling机制
  - 多Function Calling的使用
### 3. 工作流Workflow的搭建与使用
- 大模型应用工作流的搭建逻辑
- Agent Workflow的设计要素
- 项目实战：案例：一键生成学术论文、案例：一键生成爆款文案
### 4. Agent系统
- AutoGen框架
- MetaGPT框架
- Multi-Agents会话
### 5. LangGraph框架
#### （1）LangGraph基础使用
- LangChain与LangGraph的区别
- LangGraph对象：图(节点、边、状态)的定义与使用
- LangGraph工具：检索工具、记忆工具、中断点(手动介入)
- LangGraph范式：结合LangSmith查看Agent调用栈
#### （2）LangGraph实战与延展
- 基于LangGraph构建生产级Agent应用
- LangGraph构建多轮对话Agent智能体
#### （3）项目实战
- 案例1：基于LangGraph实现多轮对话机器人
- 案例2：基于LangGraph构建企业级多Agent应用
- 案例3：数据分析助手
- 案例4：智能ERP智能体

## 七、大模型微调
### 1. 微调基础认知
#### （1）微调的概念与意义
- 微调的分类：全参数微调/参数高效微调
#### （2）数据集
- 数据采集与清洗、数据标注、量化微调
- 数据标注分类
#### （3）微调训练策略
- 数据预处理与增强
- 数据格式规范与设置高质量的数据集训练方法
- 微调技术要点：超参调整、选择合适的训练轮次
#### （4）微调的核心
- 张量的创建、索引、运算等操作
- pytorch基础：搭建神经网络、定义模型结构、前向传播、反向传播的流程
#### （5）微调框架的选择
- Hugging Face Transformers、unsloth开箱即用高效可定制化
- Llama-Factory框架：unsloth开箱可用高度可定制
#### （6）分布式训练
- Deepspeed与并行
#### （7）大模型训练技术
- 混合精度：FP32与FP16混合使用
- 动态损失缩放
- 梯度累积
- 模型压缩与加速：量化蒸馏
### 2. 微调技术与应用
- 微调策略：基于特定场景进行微调，包括数据准备、参数设置
- 微调过程中进行迭代微调、收敛指标的查看方法
- 轻量化微调技术：Prefix-tuning、P-Tuning v2、LoRA、QLoRA
### 3. 大模型微调实战篇
- 案例1：基于LoRA微调Qwen2.7B
- 案例2：基于QLoRA微调Llama3
- 案例3：基于LoRA微调GLM4-9B
### 4. Huggingface模块开发实战
- Huggingface安装和开发流程
- 掌握Huggingface中各种API
- Huggingface实战：数据集处理、loading、评价指标、管道等
- Transformer加载模型、数据集处理
### 5. 项目实战
- 案例1：动手微调一个GPT
- 案例2：医疗问诊助手：基础应用、定制化微调模型的选型与训练、优化实操：提升微调模型效率与效果
### 6. DeepSeek深度解析
- DeepSeek的基础架构MoE解析
- DeepSeek核心优势
- DeepSeek V3的关键技术解析
- DeepSeek的优缺点与落地
- Deepseek的创新点分析
- 训练数据优势

## 八、多模态
### 1. 多模态基础认知
- 多模态的最新进展
- 为什么需要多模态、通往AGI必经之路
- 多模态交互：多模态理解与多模态生成
#### （1）多模态技术应用领域
- 智能安防：智能视频认证
- 智能医疗：远程医疗问诊
- 智能教育：多模态学习资源
- 智能交通：路况识别与预警
- 智能视觉：多模态图像处理
### 2. 大模型与计算机视觉
- 多模态视觉原理
- 多模态特征提取原理
- 多模态视觉模型原理
#### （1）图像生成技术概述
- 扩散模型-Diffusion模型原理
- 文生图-Diffusion模型实操
- 稳定扩散-Stable Diffusion
#### （2）多模态大模型与多任务
- 多模态预训练、Audio-Vision-Language
### 3. 多模态技术未来发展趋势
- 迁移学习
- 多模态的微调与优化：样本学习、蒸馏、量化、压缩
### 4. 多模态的优化
- 本地私有化部署实现推理加速
- 选择推理框架
### 5. 项目实战
- 案例1：基于StableDiffusion的文生图
- 案例2：基于Llama3-Vision的图文问答
- 案例3：国产多模态大模型Qwen-VL+LLaVA

## 九、AI算法预备基础（机器学习/深度学习/NLP）
### 1. Python数据分析
- Numpy/Pandas/Matplotlib
- 特征工程、特征筛选
### 2. 机器学习
#### （1）概念与工具
- 特征工程&模型评估
- 数据预处理
#### （2）经典算法
- KNN近邻
- 线性回归
- 逻辑回归
- 朴素贝叶斯
- 决策树
- 集成学习
- Kmeans聚类
#### （3）无监督学习
- 聚类、层次聚类、密度聚类
- 主成分分析
- 奇异值分解
- 特征降维
### 3. 深度学习、神经网络与Pytorch开发
- 神经网络基本概念
- 激活函数、损失函数
- Pytorch中的张量、张量索引与切片
- Pytorch自动求导
- 常用优化器、学习率调整
- 深度学习常见模型：CNN/RNN/Transformer
### 4. NLP自然语言处理
- NLP概述、NLP两大任务：NLU/NLG
- NLP的基本任务
- 分词、词性标注、命名实体识别
- 文本分类、文本摘要
#### （1）文本如何转为数据：Word2Vec、GloVe词向量
#### （2）详解注意力与注意力机制
#### （3）大模型关键技术解析
- RNN/LSTM/GRU原理与作用
- Transformer详解