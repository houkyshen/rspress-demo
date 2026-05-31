# Python 常见装饰器（分类+用法+示例）
## 一、Python 内置常用装饰器
### 1. @property
把**方法转为属性**，直接调用，不用加 `()`，常用于封装类属性。
```python
class Person:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name

p = Person("Tom")
print(p.name)  # 直接访问，p.name() 会报错
```

### 2. @xxx.setter
配合 `@property`，**给属性赋值**，做参数校验。
```python
class Person:
    def __init__(self, age=0):
        self._age = age

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, val):
        if isinstance(val, int) and 0 < val < 150:
            self._age = val

p = Person()
p.age = 20
print(p.age)
```

### 3. @staticmethod
**静态方法**，不需要 `self/cls`，属于类，不访问实例/类属性。
```python
class Math:
    @staticmethod
    def add(a, b):
        return a + b

print(Math.add(1, 2))
```

### 4. @classmethod
**类方法**，第一个参数是 `cls`，可操作类属性、调用类方法。
```python
class Person:
    count = 0

    @classmethod
    def inc(cls):
        cls.count += 1

Person.inc()
print(Person.count)
```

### 5. @functools.wraps
**修复装饰器副作用**：保留原函数名称、文档、参数信息（写自定义装饰器必用）。
```python
from functools import wraps

def log(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print("执行函数")
        return func(*args, **kwargs)
    return wrapper
```

## 二、functools 标准库装饰器
### 1. @lru_cache 缓存装饰器
缓存函数返回结果，**避免重复计算**，递归/查询场景高频使用。
```python
from functools import lru_cache

@lru_cache(maxsize=128)
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

print(fib(30))
```

### 2. @total_ordering
自动补全**大小比较运算符**，只需实现 2 个比较方法。
```python
from functools import total_ordering

@total_ordering
class Num:
    def __init__(self, v):
        self.v = v
    def __eq__(self, other):
        return self.v == other.v
    def __lt__(self, other):
        return self.v < other.v
```

## 三、业务/开发常用第三方/自定义装饰器
### 1. 计时装饰器（统计函数耗时）
```python
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        res = func(*args, **kwargs)
        print(f"耗时: {time.time()-start:.2f}s")
        return res
    return wrapper
```

### 2. 日志装饰器（打印入参、执行记录）
### 3. 权限校验装饰器（接口/函数鉴权）
### 4. 重试装饰器（失败自动重试，网络请求常用）
推荐库：`tenacity.retry`

### 5. 单例装饰器（让类只创建一个实例）

## 四、框架高频装饰器
### 1. Web 框架
- Flask：`@app.route` 路由、`@app.before_request` 请求前置
- Django：`@login_required` 登录校验、`@csrf_protect` 防跨站

### 2. 异步/任务框架
- `@asyncio.coroutine` 旧版异步装饰器
- Celery：`@app.task` 注册异步任务

---
### 速记优先级
1. **面试必背**：`@property` / `@staticmethod` / `@classmethod` / `@lru_cache` / `@wraps`
2. **日常开发**：计时、日志、重试、单例
3. **Web 开发**：路由、登录鉴权装饰器