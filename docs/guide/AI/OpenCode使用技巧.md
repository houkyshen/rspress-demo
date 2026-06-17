# OpenCode使用技巧
## 自定义命令
在C:/Users/Administrator/.config/opencode/opencode.json文件中添加自定义命令，例如：
```json
{
  "$schema": "https://opencode.ai/config.json",
  "commands": {
    "jeff-test": {
      "template": "update the name of a file, add a suffice to the file name",
      "description": "update the name of a file",
      "agent": "build"
    }
  }
}
```
然后在命令行中输入/jeff-test，即可执行自定义命令。输入斜杠的时候就能找到这个命令了。

## 系统提示词
OpenCode会自动读取Claude Code的系统提示词，而Claude Code的系统提示词可以在C:/Users/Administrator/.claude/CLAUDE.md文件中添加，例如：
```markdown
# Python 项目规范

## 包管理：始终使用 uv

对于 Python 项目，默认使用 `uv` 来管理依赖和虚拟环境。

# LLM 调用规范

## 默认模型与认证

当创建调用 LLM API 的代码文件时，使用以下默认配置：

- **模型**：`deepseek-v4-pro`
- **API Key**：从环境变量 `DEEPSEEK_API_KEY` 中获取（`os.getenv("DEEPSEEK_API_KEY")`）
- **Base URL**：`https://api.deepseek.com`

```

