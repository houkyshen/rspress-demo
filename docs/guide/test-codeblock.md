# 代码块边宽测试

本页面用于测试代码块的 **good** / **bad** 边宽样式。

- <span style="color:#4caf50">**绿色左边框**</span> = 正确的代码
- <span style="color:#f44336">**红色左边框**</span> = 有问题的代码

---

## 示例一：变量声明

### Good ✅

```js good
const name = 'Jeff';
const age = 25;
console.log(`Hello, ${name}! You are ${age} years old.`);
```

### Bad ❌

```js bad
var name = 'Jeff';
var age = 25;
console.log('Hello, ' + name + '! You are ' + age + ' years old.');
```

---

## 示例二：异步处理

### Good ✅

```ts good
async function fetchUser(id: string): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}
```

### Bad ❌

```ts bad
function fetchUser(id) {
  fetch('/api/users/' + id)
    .then(r => r.json())
    .then(data => {
      // 没有错误处理
      return data;
    });
}
```

---

## 示例三：React 组件

### Good ✅

```tsx good
import { useState, useCallback } from 'react';

interface CounterProps {
  initial?: number;
}

export function Counter({ initial = 0 }: CounterProps) {
  const [count, setCount] = useState(initial);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <button onClick={increment}>
      Count: {count}
    </button>
  );
}
```

### Bad ❌

```tsx bad
function Counter() {
  var count = 0;
  function increment() {
    count = count + 1;
    // 直接修改变量不会触发重新渲染
  }
  return <button onClick={increment}>Count: {count}</button>;
}
```

---

## 示例四：Python 对比

### Good ✅

```python good
from typing import List, Optional

def find_user(users: List[dict], user_id: int) -> Optional[dict]:
    """查找用户，未找到返回 None"""
    for user in users:
        if user.get("id") == user_id:
            return user
    return None
```

### Bad ❌

```python bad
def find_user(users, user_id):
    for user in users:
        if user["id"] == user_id:
            return user
    # 没有返回 None，隐式返回可能引发 bug
```

---

## 示例五：普通代码块（无标记）

```js
// 这是一个普通的代码块，没有 good/bad 标记
// 边框保持默认样式
function normalFunction() {
  return 'This is just a regular code block.';
}
```

---

## 使用方式

在 markdown 中，在语言标识后面添加 `good` 或 `bad` 关键词即可：

```markdown
```js good
// 正确代码
```

```js bad
// 有问题的代码
```
```

> **提示**：`good` / `bad` 关键词不会影响语法高亮，语言类型（如 `js`、`ts`、`python`）正常生效。
