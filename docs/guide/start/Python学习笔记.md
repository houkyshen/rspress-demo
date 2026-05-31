# Python学习笔记
>本文档基于>本文档基于[B站黑马程序员Python教程](https://www.bilibili.com/video/BV1sHU9BmEne/?vd_source=872cf4937dc9d24abb019c95772a699f)
，由我整理而成，旨在帮助大家快速掌握Python编程基础。

## 第三章 AI应用——AI智能伴侣
### AI应用-实战-会话管理-文件操作
#### 文件操作——入门
##### 1. 文件读取
```python
# 读取文件内容
# 1. 打开文件
file = open('resources/望庐山瀑布.txt', 'r', encoding='utf-8')
# 2. 读取文件内容
content = file.read()
print(content)
# 3. 关闭文件
file.close()
```

##### 2. 文件写入
```python
# 写入文件内容
# 1. 打开文件
file = open('resources/静夜思.txt', 'w', encoding='utf-8')
# 2. 写入文件内容
file.write('床前明月光,\n')
file.write('疑是地上霜。\n')
file.write('举头望明月,\n')
file.write('低头思故乡。\n')
# 3. 关闭文件
file.close()
```


**编码**: 编码是将字符(文字、数字、符号)转换为计算机能够存储和处理的数字代码的规则系统，如:ASCII、GBK、UTF-8 。

#### 文件操作——资源释放
> 如果在写入文件时出现异常导致文件未被关闭，那么文件资源就会被占用，直到程序结束。
> 在实际开发中，我们通常使用try-finally语句来确保文件资源释放，即使在发生异常时也能保证文件被关闭。

##### 1. 释放资源方式一：使用try-finally
```python
# 使用try-finally确保文件资源释放
try:
    file = open('resources/静夜思.txt', 'w', encoding='utf-8')
    file.write('床前明月光,\n')
    file.write('疑是地上霜。\n')
    file.write('举头望明月,\n')
    file.write('低头思故乡。\n')
except Exception as e:
    print(e)
finally:
    file.close()
```

##### 2. 释放资源方式二：使用with语句（推荐，最佳实践）
```python
# 使用with语句确保文件资源释放
with open('resources/静夜思.txt', 'w', encoding='utf-8') as file:
    file.write('床前明月光,\n')
    file.write('疑是地上霜。\n')
    file.write('举头望明月,\n')
    file.write('低头思故乡。\n')
```
**with语句**: with语句用于简化资源管理，确保在代码块执行完毕后自动释放资源，即使在发生异常时也能保证资源被释放。

#### 文件操作——JSON文件操作
##### 1. JSON文件读取
```python
import json

# 读取JSON文件内容（JSON的反序列化）
with open('resources/data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)
    print(data)
```

##### 2. JSON文件写入
```python
import json

# 写入JSON文件内容（JSON的序列化）
data = {'name': '张三', 'age': 25, 'city': '北京'}
with open('resources/data.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, indent=4, ensure_ascii=False)
```

**indent参数**: indent参数用于控制JSON文件的缩进，使其更易读。默认情况下，JSON文件的缩进为0，即不缩进。通过设置indent参数，可以控制缩进的深度和宽度。例如，设置indent=4，JSON文件的缩进深度为4，缩进宽度为1个空格。
**ensure_ascii参数**: ensure_ascii参数如果设置为False，输出的JSON文件可以包含非ASCII字符，否则输出的JSON文件只能包含ASCII字符，其他字符会被转义为Unicode编码。


### AI应用-实战-会话管理-保存会话
### AI应用-实战-会话管理-展示会话列表
### AI应用-实战-会话管理-加载会话
### AI应用-实战-会话管理-删除会话
### AI应用-实战-功能优化与小结
### AI应用-实战-知识扩展


---------------------
### AI应用-实战-知识扩展
### AI应用-实战-知识扩展

