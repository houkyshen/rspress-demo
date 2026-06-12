# Python 官方命名规范（PEP 8 完整版）
这是**工业界、大厂、开源项目统一遵守**的标准，记住这套就够了，我给你整理成最清晰、最好记的版本。

---

## 一、最核心的 4 种命名风格
Python 只用这 4 种，**不要自创**：
1. **snake_case**（下划线小写）—— 90% 场景用这个
2. **PascalCase**（大驼峰）—— 只给类用
3. **UPPER_CASE**（全大写下划线）—— 常量
4. **_single_leading_underscore**（单前导下划线）—— 私有/内部使用

---

## 二、分场景强制规范
### 1. 变量 / 普通属性
✅ 规范：**小写 + 下划线**
```python
user_name
total_count
is_success
request_timeout
```

---

### 2. 函数 / 方法
✅ 规范：**小写 + 下划线**
```python
def get_user_info():
    pass

def calculate_total_price():
    pass
```

---

### 3. 类（Class）
✅ 规范：**大驼峰 PascalCase**
```python
class UserInfo:
    pass

class DataProcessor:
    pass
```

---

### 4. 常量
✅ 规范：**全大写 + 下划线**
```python
MAX_RETRY = 3
API_BASE_URL = "https://api.xxx.com"
DEFAULT_TIMEOUT = 10
```

---

### 5. 模块 / 文件（.py 文件）
✅ 规范：**小写 + 下划线**
```
utils.py
user_manager.py
data_process.py
```
❌ 禁止：`UserManager.py`、`dataProcess.py`

---

### 6. 包名（文件夹名）
✅ 规范：**纯小写，尽量不用下划线**
```
utils
common
user
```

---

### 7. 私有变量 / 私有方法
✅ 规范：**开头加一个下划线**（约定私有，非强制）
```python
_internal_data
_helper_function()
```

✅ 真正强私有：**开头两个下划线**
```python
__password
__private_method()
```

---

## 三、必须遵守的通用规则
1. **不要用中文、拼音**
   ❌ `xingming`、`shijian`、`用户信息`
   ✅ `username`、`time`、`user_info`

2. **不要用单个小写字母 l、O、I**
   容易和数字 1、0 混淆

3. **变量名要望文知意**
   ❌ `a`、`temp`、`data`
   ✅ `user_list`、`response_data`

4. **类名用名词，函数名用动词开头**
   ✅ 类：`User`、`Order`、`Database`
   ✅ 函数：`get_user()`、`save_data()`、`run_task()`

---

## 四、快速记忆口诀
```
变量函数全小写，单词之间下划线
类名使用大驼峰，常量统统全大写
文件模块小写好，私有前面加下划线
```

---

### 总结
- **变量/函数/文件**：`snake_case`
- **类**：`PascalCase`
- **常量**：`UPPER_CASE`
- **私有**：`_single_leading_underscore`
