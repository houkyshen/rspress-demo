# Python注释规范
遵循 PEP8 + 工程通用排版，分**块分隔大段逻辑、行内注释、函数文档、小节分割**四种场景，兼顾可读性与视觉整洁。

## 一、大逻辑区块分隔（最常用，拆分业务步骤）
### 1. 短分割线（标准轻量分隔，步骤之间）
```python
# ===================== 1. 读取配置文件 =====================
config = load_config("config.yaml")
timeout = config.get("request_timeout", 30)

# ===================== 2. 初始化请求客户端 =====================
client = HttpClient(timeout=timeout)
client.set_headers(token=config["auth_token"])

# ===================== 3. 发起批量接口请求 =====================
result_list = []
for item in task_data:
    resp = client.post("/api/data", json=item)
    result_list.append(resp.json())
```
特点：长度统一、左右对齐，一眼划分阶段，适合几十行内的多步骤流程。

### 2. 长横线极简分割（超大模块、跨几十行代码）
```python
# -----------------------------------------------------------------------------
# 数据清洗与格式转换模块
# 作用：过滤空值、类型强转、标准化字段名，输出可入库标准字典
# -----------------------------------------------------------------------------
def clean_raw_data(raw_rows: list[dict]) -> list[dict]:
    output = []
    for row in raw_rows:
        # 过滤无效行
        if not row.get("id"):
            continue
        
        # 字段修正
        row["amount"] = float(row["amount"]) if row["amount"] else 0.0
        output.append(row)
    return output
```

## 二、小节内细分注释（子逻辑，不用长横线）
### 单行说明注释
```python
# 过滤已完成任务，只处理待执行
pending_tasks = [t for t in all_tasks if t.status == "pending"]

# 并发限制：最多同时10个协程
sem = asyncio.Semaphore(10)
```

### 成对短横线小分段（函数内部多层子逻辑）
```python
async def run_task(task):
    # ---- 前置校验 ----
    if task.expire_time < now:
        return TaskResult(success=False, msg="任务已过期")
    
    # ---- 执行核心逻辑 ----
    data = await fetch_source(task.source_id)
    processed = transform_data(data)
    
    # ---- 结果入库 ----
    await db.insert("task_result", processed.model_dump())
    return TaskResult(success=True)
```

## 三、行内注释（仅补充歧义，不要堆废话）
规则：`代码  # 空格+注释`，距离代码至少两个空格
```python
offset = 8  # UTC转北京时间偏移小时
retry_max = 3  # 接口最大重试次数
```
禁止无意义注释：
```python
a = 1  # 赋值a  ❶ 垃圾注释
```

## 四、函数/类标准文档注释（docstring，结构化）
### 1. Google 风格（可读性最高，工程首选）
```python
def calc_profit(income: float, cost: float, tax_rate: float = 0.13) -> float:
    """计算税后利润

    Args:
        income: 总收入金额
        cost: 总成本金额
        tax_rate: 税率，默认13%

    Returns:
        float: 扣税后净利润
    """
    gross = income - cost
    net = gross * (1 - tax_rate)
    return net
```

### 2. 类整体注释
```python
class AutoTaskRunner:
    """定时任务自动调度执行器
    封装cron解析、任务排队、异常捕获、日志上报完整流程
    """
    def __init__(self, cron_expr: str):
        # 初始化cron时间迭代器
        self.cron_iter = croniter(cron_expr, datetime.now(timezone.utc))
```

## 五、全局头部文件注释（脚本最顶部）
```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
每日同步数据脚本 daily_sync.py
运行时机：GitHub Actions UTC 05:00（北京时间13点，周一至周五）
功能：拉取上游业务数据 → 清洗 → 写入数据库 → 推送执行日志
Author: Jeff
Create Time: 2026-06-12
"""
import os
import croniter
from datetime import datetime, timezone
```

## 六、避坑规范（保证代码好看不乱）
1. **分隔符号统一**：一个项目只固定一种分隔样式，不要一会`---`一会`===`
2. 注释文字**简洁陈述句**，不用疑问句、冗余描述
3. 逻辑简单、一眼能看懂的代码不加多余分割注释
4. 注释和代码对齐，不要长短参差不齐
5. 空行搭配分割注释：大段分隔前后空一行，小段`----`前后不用空行

## 完整样板成品
```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Claude Code Auto模式配置同步工具
读取全局settings并批量更新工作流配置
"""
import json
from pathlib import Path

# ===================== 1. 加载全局配置文件 =====================
global_config_path = Path.home() / ".claude" / "settings.json"
with open(global_config_path, "r", encoding="utf-8") as f:
    global_cfg = json.load(f)

# ===================== 2. 校验Auto模式开关 =====================
auto_enabled = global_cfg.get("autoMode", {}).get("enabled", False)
default_mode = global_cfg.get("permissions", {}).get("defaultMode", "default")

# ===================== 3. 批量写入项目配置 =====================
def write_project_settings(project_root: Path):
    """写入单项目独立claude配置
    
    Args:
        project_root: 项目根目录路径
    """
    # ---- 创建配置文件夹 ----
    conf_dir = project_root / ".claude"
    conf_dir.mkdir(exist_ok=True)
    
    # ---- 填充默认auto权限模式 ----
    project_cfg = {
        "permissions": {
            "defaultMode": "auto"
        }
    }
    
    with open(conf_dir / "settings.json", "w", encoding="utf-8") as fw:
        json.dump(project_cfg, fw, indent=2)
```