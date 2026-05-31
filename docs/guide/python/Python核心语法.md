# Python 核心语法

## 一、基础语法

### 1. 变量、字面值、类型

#### 1）什么是变量？
程序中用来存储单个数据的容器（经常会发生改变的数据）

```python
num = 10
print(num)  # 输出: 10
```

#### 2）变量的使用
- 输出打印
- 参与计算
- 记录数据

```python
# 输出打印
name = "Python"
print(name)

# 参与计算
a = 5
b = 3
result = a + b
print(result)  # 输出: 8

# 记录数据
age = 25
is_adult = age >= 18
print(is_adult)  # 输出: True
```

#### 3）注意事项
- 一个变量只能存储一个值
- 变量定义时必须赋值才可以使用
- 一条语句可以定义多个变量、也可以连续赋值

```python
# 定义单个变量
num = 10

# 定义多个变量
a, b = 1, "Python"
print(a, b)  # 输出: 1 Python

# 连续赋值
x = y = z = 100
print(x, y, z)  # 输出: 100 100 100
```

### 2）字面值
程序中，直接书写的固定值（数据）

#### 各类字面值书写形式

```python
# 整数（int）
int_val = 10
print(type(int_val))  # 输出: <class 'int'>

# 小数（float）
float_val = 3.14
print(type(float_val))  # 输出: <class 'float'>

# 字符串（str）
str_val = "人生苦短，我用Python"
print(type(str_val))  # 输出: <class 'str'>

# 布尔（bool）
bool_val = True
print(type(bool_val))  # 输出: <class 'bool'>

# 空值（NoneType）
none_val = None
print(type(none_val))  # 输出: <class 'NoneType'>
```

### 3）数据类型

#### 常见数据类型
- `int`、`float`、`str`、`bool`、`NoneType`

#### 查看数据类型

```python
# 使用 type()
value = 42
print(type(value))  # 输出: <class 'int'>

# 使用 isinstance()
print(isinstance(value, int))  # 输出: True
print(isinstance(value, str))  # 输出: False

# 类型转换
num_str = "100"
num_int = int(num_str)
print(type(num_int))  # 输出: <class 'int'>
```

### 4）标识符命名规则
- 只能包含字母（a-z、A-Z）、数字（0-9）、下划线（_）
- **数字不能开头**
- 不能使用关键字：`if`、`else`、`elif`、`for`、`while`、`and`、`or` 等
- 严格区分大小写：`age`、`Age`、`AGE` 是三个变量

```python
# 正确的标识符
name = "小王"
user_age = 18
_private = 100
age2 = 20

# 错误的标识符（注释掉了）
# 2age = 10  # ✗ 不能以数字开头
# for = 5    # ✗ for 是关键字
# user-name = "abc"  # ✗ 不能包含 -

# 区分大小写
age = 25
Age = 30
AGE = 35
print(age, Age, AGE)  # 输出: 25 30 35
```

#### 变量命名规范
- 见名知意
- 多个单词使用下划线连接
- 英文字母全小写

```python
# 好的命名
user_name = "小王"
student_age = 18
is_admin = True

# 不好的命名（虽然正确，但不清楚）
x = "小王"
a = 18
flag = True
```

### 5）运算符

#### 赋值运算符

```python
# 基本赋值
num = 10
print(num)  # 输出: 10

# 加法赋值
num += 2  # 等价于 num = num + 2
print(num)  # 输出: 12

# 减法赋值
num -= 1  # 等价于 num = num - 1
print(num)  # 输出: 11

# 乘法赋值
num *= 2  # 等价于 num = num * 2
print(num)  # 输出: 22

# 除法赋值
num /= 2  # 等价于 num = num / 2
print(num)  # 输出: 11.0

# 取模赋值
num = 10
num %= 3  # 等价于 num = num % 3
print(num)  # 输出: 1

# 取整除赋值
num = 10
num //= 3  # 等价于 num = num // 3
print(num)  # 输出: 3

# 幂赋值
num = 2
num **= 3  # 等价于 num = num ** 3
print(num)  # 输出: 8
```

#### 比较运算符（关系运算符）

```python
a = 10
b = 20

# 等于
print(a == b)  # 输出: False
print(a == 10)  # 输出: True

# 不等于
print(a != b)  # 输出: True

# 大于
print(a > b)  # 输出: False
print(b > a)  # 输出: True

# 大于等于
print(a >= 10)  # 输出: True

# 小于
print(a < b)  # 输出: True

# 小于等于
print(b <= 20)  # 输出: True
```

#### 算术运算符

```python
# 加法
print(10 + 5)  # 输出: 15

# 减法
print(10 - 5)  # 输出: 5

# 乘法
print(10 * 5)  # 输出: 50

# 除法
print(10 / 3)  # 输出: 3.3333...

# 取整除
print(10 // 3)  # 输出: 3

# 取模
print(10 % 3)  # 输出: 1

# 幂
print(2 ** 3)  # 输出: 8
```

#### 逻辑运算符

```python
# and（逻辑与）
print(True and True)  # 输出: True
print(True and False)  # 输出: False

# or（逻辑或）
print(True or False)  # 输出: True
print(False or False)  # 输出: False

# not（逻辑非）
print(not True)  # 输出: False
print(not False)  # 输出: True

# 组合使用
age = 25
is_student = False
if age > 18 and not is_student:
    print("符合条件")  # 输出: 符合条件
```

---

## 二、流程控制

### 1）if 条件判断

#### 基本格式

```python
if 条件:
    代码块1
elif 条件:
    代码块2
else:
    代码块3
```

#### if...else 示例

```python
age = 18

if age >= 18:
    print("你是成年人")  # 输出: 你是成年人
else:
    print("你是未成年人")
```

#### if...elif...else 示例

```python
score = 85

if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")  # 输出: 良好
elif score >= 70:
    print("及格")
else:
    print("不及格")
```

#### 嵌套 if 示例

```python
age = 25
has_license = True

if age >= 18:
    if has_license:
        print("可以驾驶")  # 输出: 可以驾驶
    else:
        print("需要考取驾照")
else:
    print("年龄不足")
```

#### 注意事项
- 条件必须是布尔类型或可以转换为布尔的表达式
- 条件后必须冒号 `:`
- 代码块需要缩进（通常4个空格）

```python
# 条件中的隐式转换
num = 5
if num:  # 非零数字为 True
    print("num 不为 0")  # 输出: num 不为 0

empty_list = []
if not empty_list:  # 空列表为 False
    print("列表为空")  # 输出: 列表为空
```

### 2）match…case（Python 3.10+）

#### 基本格式

```python
match 表达式:
    case 值1:
        ...
    case 值2 if 条件:
        ...
    case 值3 | 值4:
        ...
    case _:
        ...
```

#### 简单匹配示例

```python
status = "success"

match status:
    case "success":
        print("操作成功")  # 输出: 操作成功
    case "error":
        print("出现错误")
    case "pending":
        print("操作进行中")
    case _:
        print("未知状态")
```

#### 多值匹配示例

```python
code = 404

match code:
    case 200 | 201 | 204:
        print("请求成功")
    case 400 | 401 | 403:
        print("客户端错误")
    case 404:
        print("资源未找到")  # 输出: 资源未找到
    case 500 | 502 | 503:
        print("服务器错误")
    case _:
        print("未知状态码")
```

#### 带条件的匹配示例

```python
age = 25

match age:
    case age if age < 18:
        print("未成年")
    case age if 18 <= age < 60:
        print("工作年龄")  # 输出: 工作年龄
    case age if age >= 60:
        print("退休年龄")
```

#### 场景选择
- 固定值分支：使用 `match...case`
- 复杂逻辑：使用 `if...elif...else`

### 3）while 循环

#### 基本格式

```python
while 条件:
    循环体
else:
    # 可选：当循环正常结束时执行
    ...
```

#### 简单计数示例

```python
i = 0
while i < 5:
    print(i)
    i += 1

# 输出:
# 0
# 1
# 2
# 3
# 4
```

#### 累加求和示例

```python
total = 0
num = 1

while num <= 10:
    total += num
    num += 1

print(total)  # 输出: 55
```

#### while...else 示例

```python
count = 0

while count < 3:
    print(f"计数: {count}")
    count += 1
else:
    print("循环正常结束")

# 输出:
# 计数: 0
# 计数: 1
# 计数: 2
# 循环正常结束
```

#### break 和 continue

```python
# break：跳出循环
i = 0
while i < 10:
    if i == 5:
        break
    print(i)
    i += 1

# 输出: 0 1 2 3 4

# continue：跳过本次迭代
i = 0
while i < 5:
    i += 1
    if i == 3:
        continue
    print(i)

# 输出: 1 2 4 5
```

#### 注意
- 条件必须是布尔表达式
- 必须有终止条件，避免死循环
- 代码块需要缩进

### 4）for 循环

#### 基本格式

```python
for 元素 in 数据集:
    循环体
else:
    # 可选：当循环正常结束时执行
    ...
```

#### 遍历列表示例

```python
fruits = ["苹果", "香蕉", "橙子"]

for fruit in fruits:
    print(fruit)

# 输出:
# 苹果
# 香蕉
# 橙子
```

#### 遍历字符串示例

```python
name = "Python"

for char in name:
    print(char)

# 输出:
# P
# y
# t
# h
# o
# n
```

#### 使用 enumerate 获取索引

```python
fruits = ["苹果", "香蕉", "橙子"]

for index, fruit in enumerate(fruits):
    print(f"索引 {index}: {fruit}")

# 输出:
# 索引 0: 苹果
# 索引 1: 香蕉
# 索引 2: 橙子
```

#### for...else 示例

```python
for i in range(3):
    print(i)
else:
    print("循环结束")

# 输出:
# 0
# 1
# 2
# 循环结束
```

#### break 和 continue

```python
# break：跳出循环
for i in range(10):
    if i == 5:
        break
    print(i)

# 输出: 0 1 2 3 4

# continue：跳过本次迭代
for i in range(5):
    if i == 2:
        continue
    print(i)

# 输出: 0 1 3 4
```

### 5）range 函数

#### 基本用法

```python
# range(end)：从 0 到 end-1
for i in range(5):
    print(i)

# 输出: 0 1 2 3 4
```

#### 指定起始和结束

```python
# range(start, end)：从 start 到 end-1
for i in range(2, 7):
    print(i)

# 输出: 2 3 4 5 6
```

#### 指定步长

```python
# range(start, end, step)：从 start 到 end-1，每次增加 step
for i in range(0, 10, 2):
    print(i)

# 输出: 0 2 4 6 8

# 倒序
for i in range(5, 0, -1):
    print(i)

# 输出: 5 4 3 2 1
```

#### 转换为列表

```python
numbers = list(range(5))
print(numbers)  # 输出: [0, 1, 2, 3, 4]
```

### for/while 循环的场景选择
- **while**：次数未知、由条件控制循环
- **for**：遍历已知集合、次数已知

```python
# while：输入验证（次数未知）
password = ""
while password != "123456":
    password = input("输入密码: ")
    if password == "123456":
        print("密码正确")
        break

# for：遍历列表（次数已知）
names = ["Alice", "Bob", "Charlie"]
for name in names:
    print(f"你好，{name}")
```

---

## 三、字符串

### 1）字符串特点
- 不可变性（无法修改原字符串）
- 有序性（可通过索引访问）
- 可迭代性（可使用循环遍历）

```python
# 不可变性
text = "Python"
# text[0] = "J"  # ✗ 错误，字符串不可修改
text = "Java"  # ✓ 正确，重新赋值

# 有序性
text = "Python"
print(text[0])  # 输出: P

# 可迭代性
for char in text:
    print(char)
# 输出: P y t h o n
```

### 2）字符串索引
- 正向索引：从 0 开始
- 反向索引：从 -1 开始

```python
text = "Python"
#       012345     正向
#      -6-5-4-3-2-1  反向

# 正向索引
print(text[0])  # 输出: P
print(text[1])  # 输出: y
print(text[5])  # 输出: n

# 反向索引
print(text[-1])  # 输出: n
print(text[-2])  # 输出: o
print(text[-6])  # 输出: P
```

### 3）字符串切片

#### 基本语法：`s[start:end:step]`
- `start`：起始索引，默认 0
- `end`：结束索引（不含该位置），默认字符串末尾
- `step`：步长，默认 1

```python
text = "Python Programming"

# 基本切片
print(text[0:6])  # 输出: Python

# 省略起始位置
print(text[:6])  # 输出: Python

# 省略结束位置
print(text[7:])  # 输出: Programming

# 指定步长
print(text[::2])  # 输出: Pto rgamn

# 反向
print(text[::-1])  # 输出: gnimmargorP nohtyP

# 从索引 2 到 8，步长 2
print(text[2:8:2])  # 输出: to P
```

### 4）字符串常用方法

#### find() - 查找子串

```python
text = "Hello World"

# 查找子串（返回首次出现的索引）
print(text.find("o"))  # 输出: 4
print(text.find("World"))  # 输出: 6
print(text.find("xyz"))  # 输出: -1（找不到返回 -1）
```

#### count() - 统计出现次数

```python
text = "Hello World"

print(text.count("l"))  # 输出: 3
print(text.count("o"))  # 输出: 2
print(text.count("xyz"))  # 输出: 0
```

#### upper() 和 lower() - 转换大小写

```python
text = "Hello World"

print(text.upper())  # 输出: HELLO WORLD
print(text.lower())  # 输出: hello world

# 首字母大写
print(text.capitalize())  # 输出: Hello world
```

#### split() - 分割字符串

```python
# 按空格分割
text = "Hello World Python"
words = text.split()
print(words)  # 输出: ['Hello', 'World', 'Python']

# 按指定分隔符分割
text = "apple,banana,orange"
fruits = text.split(",")
print(fruits)  # 输出: ['apple', 'banana', 'orange']

# 指定分割次数
text = "a,b,c,d"
result = text.split(",", 2)
print(result)  # 输出: ['a', 'b', 'c,d']
```

#### join() - 合并字符串

```python
words = ["Hello", "World", "Python"]

# 用空格连接
result = " ".join(words)
print(result)  # 输出: Hello World Python

# 用逗号连接
result = ",".join(words)
print(result)  # 输出: Hello,World,Python
```

#### strip() - 去除首尾空白或指定字符

```python
text = "  Hello World  "

# 去除首尾空白
print(text.strip())  # 输出: Hello World
print(text.lstrip())  # 输出: Hello World  （只去左侧）
print(text.rstrip())  # 输出:   Hello World（只去右侧）

# 去除指定字符
text = "***Hello***"
print(text.strip("*"))  # 输出: Hello
```

#### replace() - 替换子串

```python
text = "Hello World"

# 替换所有
print(text.replace("o", "0"))  # 输出: Hell0 W0rld

# 限制替换次数
print(text.replace("l", "L", 1))  # 输出: HeLlo World
```

#### startswith() 和 endswith() - 判断开头/结尾

```python
text = "Hello World"

print(text.startswith("Hello"))  # 输出: True
print(text.startswith("World"))  # 输出: False

print(text.endswith("World"))  # 输出: True
print(text.endswith("Hello"))  # 输出: False
```

### 5）字符串拼接与格式化

#### 拼接 - 使用 `+`

```python
# 拼接字符串
greeting = "Hello" + " " + "World"
print(greeting)  # 输出: Hello World

# 拼接其他类型（需要转换）
name = "Alice"
age = 25
# print("名字: " + name + ", 年龄: " + str(age))  # 需要转 str
```

#### 格式化 - 使用 `%` 运算符

```python
name = "Alice"
age = 25

# %s 字符串
print("名字: %s" % name)  # 输出: 名字: Alice

# %d 整数
print("年龄: %d" % age)  # 输出: 年龄: 25

# 多个变量
print("名字: %s, 年龄: %d" % (name, age))  # 输出: 名字: Alice, 年龄: 25

# %f 浮点数
price = 19.99
print("价格: %.2f" % price)  # 输出: 价格: 19.99
```

#### 格式化 - 使用 `format()` 方法

```python
name = "Bob"
age = 30

# 按位置
print("名字: {0}, 年龄: {1}".format(name, age))  # 输出: 名字: Bob, 年龄: 30

# 按名称
print("名字: {name}, 年龄: {age}".format(name=name, age=age))
# 输出: 名字: Bob, 年龄: 30
```

#### 格式化 - 使用 f-string（推荐）

```python
name = "Charlie"
age = 35

# 基本用法
print(f"名字: {name}, 年龄: {age}")  # 输出: 名字: Charlie, 年龄: 35

# 表达式
print(f"3 + 5 = {3 + 5}")  # 输出: 3 + 5 = 8

# 格式化
price = 19.99
print(f"价格: {price:.2f}")  # 输出: 价格: 19.99
```

---

## 四、列表

### 1）列表定义与特点

```python
# 定义列表
list1 = [1, 2, 3, 4, 5]
list2 = ["苹果", "香蕉", "橙子"]
list3 = [1, "Hello", 3.14, True, None]  # 可存放不同类型

print(list1)  # 输出: [1, 2, 3, 4, 5]
print(list2)  # 输出: ['苹果', '香蕉', '橙子']
print(list3)  # 输出: [1, 'Hello', 3.14, True, None]
```

#### 特点
- 有序：元素按顺序存储，可通过索引访问
- 可重复：可包含重复元素
- 可修改：可增删改元素

### 2）列表索引

```python
fruits = ["苹果", "香蕉", "橙子", "葡萄"]
#          0      1      2      3      正向
#         -4     -3     -2     -1      反向

# 正向索引
print(fruits[0])  # 输出: 苹果
print(fruits[2])  # 输出: 橙子

# 反向索引
print(fruits[-1])  # 输出: 葡萄
print(fruits[-2])  # 输出: 橙子
```

### 3）列表切片

```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# 基本切片
print(numbers[2:5])  # 输出: [2, 3, 4]
print(numbers[:4])  # 输出: [0, 1, 2, 3]
print(numbers[5:])  # 输出: [5, 6, 7, 8, 9]

# 指定步长
print(numbers[::2])  # 输出: [0, 2, 4, 6, 8]
print(numbers[1::2])  # 输出: [1, 3, 5, 7, 9]

# 反向
print(numbers[::-1])  # 输出: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
```

### 4）列表增删改查

#### 查看 - 索引访问

```python
fruits = ["苹果", "香蕉", "橙子"]
print(fruits[0])  # 输出: 苹果
print(fruits[1])  # 输出: 香蕉
```

#### 修改 - 重新赋值

```python
fruits = ["苹果", "香蕉", "橙子"]
fruits[0] = "梨"
print(fruits)  # 输出: ['梨', '香蕉', '橙子']

# 修改多个
fruits[1:3] = ["芒果", "猕猴桃"]
print(fruits)  # 输出: ['梨', '芒果', '猕猴桃']
```

#### 删除 - 使用 `del`

```python
fruits = ["苹果", "香蕉", "橙子", "葡萄"]

# 删除单个元素
del fruits[1]
print(fruits)  # 输出: ['苹果', '橙子', '葡萄']

# 删除切片
del fruits[0:2]
print(fruits)  # 输出: ['葡萄']
```

#### 注意：索引越界会报错

```python
fruits = ["苹果", "香蕉"]
# print(fruits[5])  # ✗ IndexError: list index out of range
```

### 5）列表常用方法

#### append() - 末尾追加

```python
fruits = ["苹果", "香蕉"]
fruits.append("橙子")
print(fruits)  # 输出: ['苹果', '香蕉', '橙子']
```

#### insert() - 指定位置插入

```python
fruits = ["苹果", "香蕉", "橙子"]
fruits.insert(1, "石榴")
print(fruits)  # 输出: ['苹果', '石榴', '香蕉', '橙子']
```

#### remove() - 删除指定元素

```python
fruits = ["苹果", "香蕉", "香蕉", "橙子"]
fruits.remove("香蕉")
print(fruits)  # 输出: ['苹果', '香蕉', '橙子']
```

#### pop() - 删除指定位置元素

```python
fruits = ["苹果", "香蕉", "橙子"]

# 删除最后一个元素
last = fruits.pop()
print(last)  # 输出: 橙子
print(fruits)  # 输出: ['苹果', '香蕉']

# 删除指定位置元素
first = fruits.pop(0)
print(first)  # 输出: 苹果
print(fruits)  # 输出: ['香蕉']
```

#### sort() - 排序

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
numbers.sort()
print(numbers)  # 输出: [1, 1, 2, 3, 4, 5, 6, 9]

# 逆序排序
numbers.sort(reverse=True)
print(numbers)  # 输出: [9, 6, 5, 4, 3, 2, 1, 1]

# 字符串排序
words = ["banana", "apple", "cherry"]
words.sort()
print(words)  # 输出: ['apple', 'banana', 'cherry']
```

#### reverse() - 反转列表

```python
numbers = [1, 2, 3, 4, 5]
numbers.reverse()
print(numbers)  # 输出: [5, 4, 3, 2, 1]
```

#### index() - 查找首次出现的位置

```python
fruits = ["苹果", "香蕉", "橙子"]
print(fruits.index("香蕉"))  # 输出: 1
# print(fruits.index("榴莲"))  # ✗ ValueError
```

#### clear() - 清空列表

```python
fruits = ["苹果", "香蕉"]
fruits.clear()
print(fruits)  # 输出: []
```

### 6）列表合并与复制

#### 合并 - 使用 `+`

```python
list1 = [1, 2, 3]
list2 = [4, 5, 6]

result = list1 + list2
print(result)  # 输出: [1, 2, 3, 4, 5, 6]
```

#### 复制 - 使用 `*`

```python
list1 = [1, 2]
result = list1 * 3
print(result)  # 输出: [1, 2, 1, 2, 1, 2]
```

### 7）列表成员检查

#### in 和 not in

```python
fruits = ["苹果", "香蕉", "橙子"]

print("香蕉" in fruits)  # 输出: True
print("榴莲" in fruits)  # 输出: False
print("榴莲" not in fruits)  # 输出: True
```

### 8）列表常用函数

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# min() - 最小值
print(min(numbers))  # 输出: 1

# max() - 最大值
print(max(numbers))  # 输出: 9

# sum() - 求和
print(sum(numbers))  # 输出: 31

# len() - 长度
print(len(numbers))  # 输出: 8

# count() - 统计出现次数
print(numbers.count(1))  # 输出: 2
```

---

## 五、元组

### 1）元组定义与特点

元组是一种有序、不可修改的数据集合。特点包括：
- 有序：元素按顺序存储，可通过索引访问
- 不可修改：创建后无法改变
- 可重复：可包含重复元素

```python
# 定义元组
tuple1 = (1, 2, 3)
# tuple1[0] = 10  # ✗ 错误，元组不可修改
print(tuple1)  # 输出: (1, 2, 3)

# 可包含不同类型
tuple2 = (1, "Hello", 3.14, True, None)
print(tuple2)  # 输出: (1, 'Hello', 3.14, True, None)
```

### 2）元组创建

```python
# 方式1：带括号
tuple1 = (1, 2, 3)
print(tuple1)  # 输出: (1, 2, 3)

# 方式2：不带括号（逗号是关键）
tuple2 = 1, 2, 3
print(tuple2)  # 输出: (1, 2, 3)

# 方式3：单元素元组（必须有逗号）
tuple3 = (5,)
print(tuple3)  # 输出: (5,)
print(type(tuple3))  # 输出: <class 'tuple'>

# 方式4：空元组
empty1 = ()
empty2 = tuple()
print(empty1, empty2)  # 输出: () ()
```

### 3）元组索引和切片

```python
t = ("苹果", "香蕉", "橙子", "葡萄")

# 索引
print(t[0])  # 输出: 苹果
print(t[-1])  # 输出: 葡萄

# 切片
print(t[1:3])  # 输出: ('香蕉', '橙子')
print(t[::2])  # 输出: ('苹果', '橙子')
```

### 4）元组常用方法

#### count() - 统计出现次数

```python
t = (1, 2, 2, 3, 2, 4)
print(t.count(2))  # 输出: 3
```

#### index() - 查找首次出现的位置

```python
t = ("苹果", "香蕉", "橙子", "香蕉")
print(t.index("香蕉"))  # 输出: 1（返回首次出现的索引）
```

### 5）元组拆包

#### 基本拆包

```python
t = (1, 2, 3)
a, b, c = t
print(a, b, c)  # 输出: 1 2 3

# 使用 * 匹配多个元素
t = (1, 2, 3, 4, 5)
a, *middle, c = t
print(a)  # 输出: 1
print(middle)  # 输出: [2, 3, 4]
print(c)  # 输出: 5

# 交换两个值
x, y = 10, 20
x, y = y, x
print(x, y)  # 输出: 20 10
```

---

## 六、字典

### 1）字典定义与特点

字典是一种无序的键值对集合。特点包括：
- 使用 key:value 形式存储
- 无序（Python 3.7+ 保持插入顺序）
- 可修改：可增删改元素
- key 必须唯一

```python
# 定义字典
person = {"name": "Alice", "age": 25, "city": "Beijing"}
print(person)  # 输出: {'name': 'Alice', 'age': 25, 'city': 'Beijing'}

# 包含不同类型
dict1 = {"a": 1, "a": 2}
print(dict1)  # 输出: {'a': 2}（后面的值覆盖前面的）

# 空字典
empty1 = {}
empty2 = dict()
print(empty1, empty2)  # 输出: {} {}

# 从列表创建字典
pairs = [("a", 1), ("b", 2), ("c", 3)]
dict2 = dict(pairs)
print(dict2)  # 输出: {'a': 1, 'b': 2, 'c': 3}
```

### 2）字典访问

```python
person = {"name": "Alice", "age": 25, "city": "Beijing"}

# 方式1：直接访问（可能报错）
print(person["name"])  # 输出: Alice
# print(person["country"])  # ✗ KeyError

# 方式2：get()方法（安全）
print(person.get("name"))  # 输出: Alice
print(person.get("country"))  # 输出: None
print(person.get("country", "Unknown"))  # 输出: Unknown（提供默认值）
```

### 3）字典修改

```python
person = {"name": "Alice"}
person["age"] = 25
print(person)  # 输出: {'name': 'Alice', 'age': 25}
```

### 4）字典删除

#### pop() - 删除并返回值

```python
person = {"name": "Alice", "age": 25, "city": "Beijing"}

# 使用 pop()
age = person.pop("age")
print(age)  # 输出: 25
print(person)  # 输出: {'name': 'Alice', 'city': 'Beijing'}

# 使用 del
del person["city"]
print(person)  # 输出: {'name': 'Alice'}
```

### 5）字典遍历

#### keys() - 获取所有键

```python
person = {"name": "Alice", "age": 25, "city": "Beijing"}
keys = person.keys()
print(keys)  # 输出: dict_keys(['name', 'age', 'city'])
print(list(keys))  # 输出: ['name', 'age', 'city']
```

#### values() - 获取所有值

```python
person = {"name": "Alice", "age": 25, "city": "Beijing"}
values = person.values()
print(values)  # 输出: dict_values(['Alice', 25, 'Beijing'])
print(list(values))  # 输出: ['Alice', 25, 'Beijing']
```

#### items() - 获取所有键值对

```python
person = {"name": "Alice", "age": 25, "city": "Beijing"}
items = person.items()
print(items)  # 输出: dict_items([('name', 'Alice'), ('age', 25), ('city', 'Beijing')])

# 遍历字典
for key, value in person.items():
    print(f"{key}: {value}")

# 输出:
# name: Alice
# age: 25
# city: Beijing
```

#### 遍历字典

```python
person = {"name": "Alice", "age": 25, "city": "Beijing"}

# 遍历键
for key in person:
    print(key)

# 输出:
# name
# age
# city

# 遍历键值对
for key, value in person.items():
    print(f"{key} = {value}")

# 输出:
# name = Alice
# age = 25
# city = Beijing
```

---

## 七、集合

### 1）集合定义与特点

集合是一种无序、不重复的数据集合。特点包括：
- 无序：元素没有顺序
- 不重复：自动去重
- 可修改：可增删元素

```python
# 定义集合
s = {"apple", "banana", "orange"}
print(s)  # 输出: {'apple', 'banana', 'orange'}（顺序不固定）

# 自动去重
s = {"a", "b", "a", "c", "b"}
print(s)  # 输出: {'a', 'b', 'c'}

# 空集合必须用 set()
empty = set()
print(empty)  # 输出: set()
print(type(empty))  # 输出: <class 'set'>
```

### 2）集合常用操作

#### add() - 添加元素

```python
s = {1, 2, 3}
s.add(4)
print(s)  # 输出: {1, 2, 3, 4}

# 添加已存在元素（不重复）
s.add(2)
print(s)  # 输出: {1, 2, 3, 4}
```

#### remove() - 删除指定元素

```python
s = {1, 2, 3, 4}
s.remove(2)
print(s)  # 输出: {1, 3, 4}

# 删除不存在元素会报错
# s.remove(5)  # ✗ KeyError
```

#### discard() - 删除指定元素（不报错）

```python
s = {1, 2, 3, 4}
s.discard(2)
print(s)  # 输出: {1, 3, 4}

# 删除不存在元素不会报错
s.discard(5)
print(s)  # 输出: {1, 3, 4}
```

#### pop() - 删除任意元素

```python
s = {1, 2, 3, 4}
element = s.pop()
print(element)  # 输出: 随机删除的元素
print(s)  # 输出: 剩余元素
```

#### clear() - 清空集合

```python
s = {1, 2, 3}
s.clear()
print(s)  # 输出: set()
```

### 3）集合运算

#### union() - 并集

```python
s1 = {1, 2, 3}
s2 = {3, 4, 5}

result = s1.union(s2)
print(result)  # 输出: {1, 2, 3, 4, 5}

# 使用 | 运算符
result = s1 | s2
print(result)  # 输出: {1, 2, 3, 4, 5}
```

#### intersection() - 交集

```python
s1 = {1, 2, 3}
s2 = {3, 4, 5}

result = s1.intersection(s2)
print(result)  # 输出: {3}

# 使用 & 运算符
result = s1 & s2
print(result)  # 输出: {3}
```

#### difference() - 差集

```python
s1 = {1, 2, 3}
s2 = {3, 4, 5}

result = s1.difference(s2)
print(result)  # 输出: {1, 2}

# 使用 - 运算符
result = s1 - s2
print(result)  # 输出: {1, 2}
```

---

## 八、函数

### 1）函数定义与调用

#### 基本格式

```python
def 函数名(参数):
    """函数说明"""
    # 函数体
    return 返回值
```

#### 简单函数示例

```python
# 定义函数
def greet(name):
    """定义一个问候函数"""
    message = f"你好，{name}！"
    return message

# 调用函数
result = greet("Alice")
print(result)  # 输出: 你好，Alice！
```

### 2）函数参数

#### 必需参数

```python
def print_info(name, age):
    print(f"名字: {name}, 年龄: {age}")

# 位置必须匹配
print_info("Alice", 25)  # 输出: 名字: Alice, 年龄: 25
# print_info(25, "Alice")  # ✗ 错误顺序
```

#### 默认参数

```python
def print_info(name, age=18):
    """age 的默认值为 18"""
    print(f"名字: {name}, 年龄: {age}")

print_info("Alice")  # 输出: 名字: Alice, 年龄: 18
print_info("Bob", 25)  # 输出: 名字: Bob, 年龄: 25

# 必须先指定有默认值的参数
# def wrong_func(age=18, name):  # ✗ 错误
#     pass
```

#### 关键字参数

```python
def print_info(name, age=18, city="Unknown"):
    print(f"名字: {name}, 年龄: {age}, 城市: {city}")

# 可不按顺序指定参数
print_info("Alice")  # 输出: 名字: Alice, 年龄: 18, 城市: Unknown
print_info("Bob", 25)  # 输出: 名字: Bob, 年龄: 25, 城市: Unknown
print_info("Charlie", 30, "Beijing")  # 输出: 名字: Charlie, 年龄: 30, 城市: Beijing
print_info("David", age=28, city="Shanghai")  # 输出: 名字: David, 年龄: 28, 城市: Shanghai
```

### 3）不定长参数

#### *args - 接收任意个位置参数

```python
# *args 接收任意个位置参数（打包成元组）
def sum_numbers(*args):
    """计算任意个数字的和"""
    total = 0
    for num in args:
        total += num
    return total

print(sum_numbers(1, 2, 3))  # 输出: 6
print(sum_numbers(1, 2, 3, 4, 5))  # 输出: 15
print(sum_numbers(10))  # 输出: 10

# 与其他参数混合使用
def print_items(title, *items):
    print(f"{title}:")
    for item in items:
        print(f"  - {item}")

print_items("水果", "苹果", "香蕉", "橙子")
# 输出:
# 水果:
#   - 苹果
#   - 香蕉
#   - 橙子
```

#### **kwargs - 接收任意个关键字参数

```python
# **kwargs 接收任意个关键字参数（打包成字典）
def print_person(**kwargs):
    """打印个人信息"""
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_person(name="Alice", age=25, city="Beijing")
# 输出:
# name: Alice
# age: 25
# city: Beijing

# 与其他参数混合使用
def print_info(name, *args, **kwargs):
    print(f"名字: {name}")
    print(f"其他位置参数: {args}")
    print(f"其他关键字参数: {kwargs}")

print_info("Alice", 10, 20, 30, job="Engineer", salary=5000)
# 输出:
# 名字: Alice
# 其他位置参数: (10, 20, 30)
# 其他关键字参数: {'job': 'Engineer', 'salary': 5000}
```

#### 参数组合顺序

```python
# 正确的顺序：位置参数 > *args > 默认参数 > **kwargs
def func(a, b, *args, c=10, **kwargs):
    print(f"a={a}, b={b}")
    print(f"args={args}")
    print(f"c={c}")
    print(f"kwargs={kwargs}")

func(1, 2, 3, 4, c=20, x=100, y=200)
# 输出:
# a=1, b=2
# args=(3, 4)
# c=20
# kwargs={'x': 100, 'y': 200}
```

#### 解包参数

```python
# 使用 * 解包列表参数
def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]
print(add(*numbers))  # 输出: 6

# 使用 ** 解包字典参数
def greet(name, age):
    print(f"{name} 今年 {age} 岁")

info = {"name": "Alice", "age": 25}
greet(**info)  # 输出: Alice 今年 25 岁
```

### 4）函数返回值

#### 单个返回值

```python
def get_user_info():
    return "Alice"

name = get_user_info()
print(name)  # 输出: Alice
```

#### 多个返回值

```python
def get_user_info():
    return "Alice", 25, "Engineer"

# 接收多个返回值
name, age, job = get_user_info()
print(name, age, job)  # 输出: Alice 25 Engineer

# 接收元组
info = get_user_info()
print(info)  # 输出: ('Alice', 25, 'Engineer')
```

### 5）函数嵌套

#### 内部函数调用

```python
def func_a():
    print("A 执行开始")
    func_b()
    print("A 执行结束")

def func_b():
    print("B 执行开始")
    func_c()
    print("B 执行结束")

def func_c():
    print("C 执行开始")
    print("C 执行结束")

func_a()

# 输出:
# A 执行开始
# B 执行开始
# C 执行开始
# C 执行结束
# B 执行结束
# A 执行结束
```

### 6）函数文档字符串

```python
def calculate_average(numbers):
    """
    计算数字列表的平均值
    
    参数:
        numbers (list): 数字列表
    
    返回:
        float: 平均值
    
    示例:
        >>> calculate_average([1, 2, 3, 4, 5])
        3.0
    """
    if len(numbers) == 0:
        return 0
    return sum(numbers) / len(numbers)

# 查询函数说明
help(calculate_average)

# 在IDE或Python交互中查看文档
result = calculate_average([10, 20, 30])
print(result)  # 输出: 20.0
```

### 7）函数作用域

#### 全局变量和局部变量

```python
# 全局变量
global_var = 100

def func():
    # 局部变量
    local_var = 50
    print(local_var)  # 输出: 50
    print(global_var)  # 输出: 100（可访问全局变量）

func()

print(global_var)  # 输出: 100
# print(local_var)  # ✗ NameError: name 'local_var' is not defined
```

#### global 关键字 - 修改全局变量

```python
counter = 0

def increment():
    global counter
    counter += 1

increment()
increment()
print(counter)  # 输出: 2
```

---

## 九、类与对象

### 1）类定义与对象创建

#### 基本格式

```python
class 类名:
    """类的说明"""
    
    def __init__(self, 参数):
        # 初始化方法
        pass
    
    def 方法名(self):
        # 方法体
        pass
```

#### 简单类示例

```python
class Person:
    """定义一个人类"""
    
    def __init__(self, name, age):
        # 初始化属性
        self.name = name
        self.age = age
    
    def greet(self):
        """问候方法"""
        return f"你好，我是{self.name}，今年{self.age}岁"

# 创建对象
p1 = Person("Alice", 25)
p2 = Person("Bob", 30)

# 访问属性
print(p1.name)  # 输出: Alice
print(p1.age)   # 输出: 25

# 调用方法
print(p1.greet())  # 输出: 你好，我是Alice，今年25岁
print(p2.greet())  # 输出: 你好，我是Bob，今年30岁
```

### 2）类属性与实例属性

```python
class Student:
    # 类属性（所有实例共享）
    school = "北京一中"
    student_count = 0
    
    def __init__(self, name, score):
        # 实例属性（每个实例独有）
        self.name = name
        self.score = score
        Student.student_count += 1
    
    def display(self):
        print(f"{self.name} 在 {Student.school} 取得 {self.score} 分")

s1 = Student("Alice", 95)
s2 = Student("Bob", 87)

s1.display()  # 输出: Alice 在 北京一中 取得 95 分
s2.display()  # 输出: Bob 在 北京一中 取得 87 分

print(Student.student_count)  # 输出: 2
print(Student.school)  # 输出: 北京一中
```

### 3）方法

#### 实例方法

```python
class Account:
    def __init__(self, balance):
        self.balance = balance
    
    def deposit(self, amount):
        """存款"""
        self.balance += amount
        print(f"存入 {amount} 元，余额为 {self.balance} 元")
    
    def withdraw(self, amount):
        """取款"""
        if amount <= self.balance:
            self.balance -= amount
            print(f"取出 {amount} 元，余额为 {self.balance} 元")
        else:
            print("余额不足")

acc = Account(1000)
acc.deposit(500)      # 输出: 存入 500 元，余额为 1500 元
acc.withdraw(200)     # 输出: 取出 200 元，余额为 1300 元
acc.withdraw(5000)    # 输出: 余额不足
```

#### 类方法（@classmethod）

```python
class Counter:
    count = 0
    
    def __init__(self):
        Counter.count += 1
    
    @classmethod
    def get_count(cls):
        """获取计数器值"""
        return cls.count

c1 = Counter()
c2 = Counter()
c3 = Counter()

print(Counter.get_count())  # 输出: 3
```

#### 静态方法（@staticmethod）

```python
class Math:
    @staticmethod
    def add(a, b):
        """加法"""
        return a + b
    
    @staticmethod
    def multiply(a, b):
        """乘法"""
        return a * b

print(Math.add(5, 3))      # 输出: 8
print(Math.multiply(5, 3))  # 输出: 15
```

### 4）继承

#### 基本继承

```python
# 父类
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return f"{self.name} 发出声音"

# 子类继承父类
class Dog(Animal):
    def speak(self):
        """重写父类方法"""
        return f"{self.name} 汪汪汪"

class Cat(Animal):
    def speak(self):
        """重写父类方法"""
        return f"{self.name} 喵喵喵"

# 使用
dog = Dog("旺财")
cat = Cat("咪咪")

print(dog.speak())  # 输出: 旺财 汪汪汪
print(cat.speak())  # 输出: 咪咪 喵喵喵
```

#### 多继承

```python
# 第一个父类
class Flyable:
    def fly(self):
        return "我会飞行"

# 第二个父类
class Swimmable:
    def swim(self):
        return "我会游泳"

# 子类同时继承两个父类
class Duck(Flyable, Swimmable):
    def __init__(self, name):
        self.name = name

duck = Duck("唐老鸭")
print(duck.fly())    # 输出: 我会飞行
print(duck.swim())   # 输出: 我会游泳
```

#### super() 调用父类

```python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return f"{self.name} 发出声音"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # 调用父类的 __init__
        self.breed = breed
    
    def speak(self):
        # 调用父类的 speak 方法
        parent_message = super().speak()
        return f"{parent_message}（我是{self.breed}犬）"

dog = Dog("旺财", "金毛")
print(dog.speak())  # 输出: 旺财 发出声音（我是金毛犬）
```

### 5）封装

#### 私有属性（以 _ 开头）

```python
class BankAccount:
    def __init__(self, name, balance):
        self.name = name
        self._balance = balance  # 私有属性（约定）
    
    def deposit(self, amount):
        """存款"""
        self._balance += amount
    
    def get_balance(self):
        """获取余额"""
        return self._balance

acc = BankAccount("Alice", 1000)
acc.deposit(500)
print(acc.get_balance())  # 输出: 1500

# 虽然可以访问，但约定不应该直接访问
# print(acc._balance)  # 不推荐
```

#### 私有方法（以 __ 开头）

```python
class BankAccount:
    def __init__(self, balance):
        self._balance = balance
    
    def __validate_amount(self, amount):
        """私有方法：验证金额"""
        return amount > 0
    
    def withdraw(self, amount):
        """取款"""
        if self.__validate_amount(amount) and amount <= self._balance:
            self._balance -= amount
            return True
        return False

acc = BankAccount(1000)
print(acc.withdraw(200))  # 输出: True
# acc.__validate_amount(100)  # ✗ 错误，无法访问私有方法
```

#### 属性装饰器 (@property)

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self._age = age
    
    @property
    def age(self):
        """获取年龄"""
        return self._age
    
    @age.setter
    def age(self, value):
        """设置年龄"""
        if value > 0:
            self._age = value
        else:
            print("年龄不能为负数")

p = Person("Alice", 25)
print(p.age)  # 输出: 25

p.age = 30    # 使用 setter
print(p.age)  # 输出: 30

p.age = -5    # 输出: 年龄不能为负数
```

### 6）多态

#### 方法重写与多态

```python
# 父类
class Shape:
    def area(self):
        """计算面积"""
        raise NotImplementedError("子类必须实现此方法")

# 子类1
class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        """圆形面积"""
        import math
        return math.pi * self.radius ** 2

# 子类2
class Square(Shape):
    def __init__(self, side):
        self.side = side
    
    def area(self):
        """正方形面积"""
        return self.side ** 2

# 多态使用
def print_area(shape):
    """打印任意形状的面积"""
    print(f"面积: {shape.area():.2f}")

circle = Circle(5)
square = Square(4)

print_area(circle)  # 输出: 面积: 78.54
print_area(square)  # 输出: 面积: 16.00
```

#### 鸭子类型（Duck Typing）

```python
class Dog:
    def speak(self):
        return "汪汪汪"

class Cat:
    def speak(self):
        return "喵喵喵"

class Bird:
    def speak(self):
        return "啾啾啾"

# 不需要继承也可以使用相同的方法
def make_sound(animal):
    print(animal.speak())

dog = Dog()
cat = Cat()
bird = Bird()

make_sound(dog)    # 输出: 汪汪汪
make_sound(cat)    # 输出: 喵喵喵
make_sound(bird)   # 输出: 啾啾啾
```

### 7）特殊方法

#### __str__ 和 __repr__

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        """字符串表示"""
        return f"Person: {self.name}, {self.age} 岁"
    
    def __repr__(self):
        """官方表示"""
        return f"Person('{self.name}', {self.age})"

p = Person("Alice", 25)
print(str(p))    # 输出: Person: Alice, 25 岁
print(repr(p))   # 输出: Person('Alice', 25)
```

#### __len__ 和 __getitem__

```python
class MyList:
    def __init__(self, items):
        self.items = items
    
    def __len__(self):
        """支持 len() 函数"""
        return len(self.items)
    
    def __getitem__(self, index):
        """支持索引访问"""
        return self.items[index]

ml = MyList([1, 2, 3, 4, 5])
print(len(ml))      # 输出: 5
print(ml[0])        # 输出: 1
print(ml[2:4])      # 输出: [3, 4]
```

#### __add__ 和 __eq__

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        """支持 + 运算符"""
        return Vector(self.x + other.x, self.y + other.y)
    
    def __eq__(self, other):
        """支持 == 比较"""
        return self.x == other.x and self.y == other.y
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2

print(v3)  # 输出: Vector(4, 6)
print(v1 == v2)  # 输出: False
print(v1 == Vector(1, 2))  # 输出: True
```

---

Python 核心语法到此结束！

**总结：**
- **基础语法**：变量、类型、运算符
- **流程控制**：if/elif/else、while、for、match/case
- **数据结构**：字符串、列表、元组、字典、集合
- **函数**：定义、参数、返回值、不定长参数
- **面向对象**：类、继承、封装、多态

这些是 Python 编程的基础，掌握好这些内容就能解决大部分编程问题！
