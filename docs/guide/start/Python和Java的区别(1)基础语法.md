# Python和Java的区别(1)基础语法
![Logo](/rspress-dark-logo.png)
## 1. 缩进代替大括号
- Java：`{}` 决定代码块
- Python：**缩进（4空格）** 决定代码块
```java
// Java
if (a > 0) {
    doSomething();
}
```
```python
# Python
if a > 0:
    do_something()  # 少缩进/多缩进直接报错
```
**痛点**：复制粘贴、改代码最容易崩。

## 2. 语句结尾不用分号
Java 必须 `;`，Python 完全不用，写多了反而报错。

## 3. 变量不用声明类型
```java
// Java
String s = "abc";
int a = 10;
```
```python
# Python
s = "abc"
a = 10
# 类型是动态的
a = "now I'm string"
```
你觉得束手束脚，很多时候是**习惯了强类型，突然动态不适应**。

---

# 二、控制语法差异（写起来最不顺手）
## 1. 条件语句
```java
if (a > b) { ... }
```
```python
if a > b:
```
- 没有括号
- 必须加 **冒号 :**

## 2. for 循环完全不一样
Java 风格：
```java
for (int i=0; i<10; i++) { ... }
```
Python：
```python
for i in range(10):
```
或
```python
for i in range(0, 10):
```
Python 的 for 是**迭代循环**，不是计数循环。

遍历列表：
```java
for (String s : list) { ... }
```
```python
for s in list:
```

## 3. 没有 `++` / `--`
Java：`i++`
Python：`i += 1`

---

# 三、方法/函数差异
## 1. 定义函数
```java
public int add(int a, int b) {
    return a + b;
}
```
```python
def add(a, b):
    return a + b
```
- 无返回值类型
- 无参数类型
- 用 `def`

## 2. 调用方法
Java：`obj.method()`
Python：一样，但**命名习惯不同**
- Java：`doSomething`
- Python：`do_something`（下划线）

---

# 四、数组 / 集合差异（超级关键）
Java：
- `List<String> list = new ArrayList<>();`
- `map.put("k", "v")`

Python：
```python
# 列表（等于 ArrayList）
lst = [1, 2, 3]

# 字典（等于 HashMap）
d = {"k": "v"}

# 访问
lst[0]
d["k"]
```
Python **没有数组，只有列表**。

---

# 五、你是 Java 工程师，最容易犯的错
1. 写 `{}` 包裹代码块
2. 每行加 `;`
3. 写 `i++`
4. 缩进乱了
5. 忘记 `if/for/def` 后面的 **冒号 :**
6. 试图给变量强制写类型（Python 3.10+ 可以加，但不是必须）

---

# 六、给你一句最快适应的口诀
- **大括号变缩进**
- **分号全删掉**
- **条件不加括号**
- **结尾必须冒号**
- **循环用 in**
- **变量不声明**

---

这份是**专门给 Java 工程师**准备的：
# Java OOP → Python OOP 逐行对照速查表
（复制到 IDE 里对照看，半天就能顺过来）

---

## 1. 定义类
### Java
```java
public class Person {

}
```

### Python
```python
class Person:
    pass
```

---

## 2. 成员变量 & 构造方法
### Java
```java
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

### Python
```python
class Person:
    def __init__(self, name: str, age: int):
        self.name = name   # 公开属性
        self.age = age
```
- 构造：`__init__`
- 必须带 `self` = Java 的 `this`
- 没有真正的 `private`

---

## 3. 成员方法
### Java
```java
public void sayHello() {
    System.out.println("Hello, I'm " + name);
}
```

### Python
```python
def say_hello(self):
    print(f"Hello, I'm {self.name}")
```

---

## 4. 私有属性 / 方法（约定）
### Java
```java
private String secret;

private void secretMethod() {
}
```

### Python
```python
self._secret = "约定私有"

def _secret_method(self):
    pass
```
- 一个下划线：**大家别碰**
- 两个下划线 `__secret`：名字改写，不是真安全

---

## 5. Getter / Setter
### Java
```java
public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}
```

### Python（标准写法）
```python
@property
def name(self):
    return self._name

@name.setter
def name(self, value):
    self._name = value
```

---

## 6. 静态方法 & 类方法
### Java
```java
public static void staticMethod() {
}
```

### Python
```python
@staticmethod
def static_method():
    pass

@classmethod
def class_method(cls):
    # cls 是类本身
    pass
```

---

## 7. 继承
### Java
```java
class Student extends Person {
    public Student(String name, int age, String school) {
        super(name, age);
        this.school = school;
    }
}
```

### Python
```python
class Student(Person):
    def __init__(self, name: str, age: int, school: str):
        super().__init__(name, age)
        self.school = school
```

---

## 8. 方法重写
### Java
```java
@Override
public void sayHello() {
    super.sayHello();
    System.out.println("From Student");
}
```

### Python
```python
def say_hello(self):
    super().say_hello()
    print("From Student")
```
- 没有 `@Override`，名字一样就是重写

---

## 9. 创建对象
### Java
```java
Person p = new Person("Tom", 20);
p.sayHello();
```

### Python
```python
p = Person("Tom", 20)
p.say_hello()
```

---

## 10. 访问控制速记
| Java         | Python               | 含义               |
| ------------ | -------------------- | ------------------ |
| public       | `self.name`          | 公开               |
| protected    | `self._name`         | 子类可用，外部别用 |
| private      | `self.__name`        | 名字改写，防意外   |

---

## 11. 完整对照示例（可直接运行）
### Java
```java
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void sayHello() {
        System.out.println("Hi " + name);
    }

    public static void staticFunc() {
        System.out.println("static");
    }
}

class Student extends Person {
    private String school;

    public Student(String name, int age, String school) {
        super(name, age);
        this.school = school;
    }

    @Override
    public void sayHello() {
        super.sayHello();
        System.out.println("School: " + school);
    }
}
```

### Python
```python
class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age

    def say_hello(self):
        print(f"Hi {self.name}")

    @staticmethod
    def static_func():
        print("static")

class Student(Person):
    def __init__(self, name: str, age: int, school: str):
        super().__init__(name, age)
        self.school = school

    def say_hello(self):
        super().say_hello()
        print(f"School: {self.school}")
```

---