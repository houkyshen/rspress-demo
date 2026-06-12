# 如何在 VS Code 中使用 uv 管理项目的 Jupyter

本教程以本项目（`python-study`）为例，介绍如何让 VS Code 正确识别并使用 uv 管理的虚拟环境中的 Python 作为 Jupyter kernel。

---

## 1. 前置准备

| 工具 | 说明 |
|------|------|
| [uv](https://docs.astral.sh/uv/) | Python 包管理器，替代 pip/poetry |
| [VS Code](https://code.visualstudio.com/) | 编辑器 |
| [Python 扩展](https://marketplace.visualstudio.com/items?itemName=ms-python.python) | VS Code Python 支持 |
| [Jupyter 扩展](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) | VS Code Jupyter 支持（通常随 Python 扩展自动安装） |

在 VS Code 中按 `Ctrl+Shift+X`，搜索并安装 **Python** 扩展（由 Microsoft 发布）。

---

## 2. 创建 uv 项目并添加 Jupyter 依赖

```bash
# 创建项目目录
mkdir my-project && cd my-project

# 初始化 uv 项目（自动创建 .venv 和 pyproject.toml）
uv init

# 添加 Jupyter 相关依赖
uv add ipykernel jupyter

# Windows 用户还需要安装 pywin32（Jupyter kernel 在 Windows 上必需）
uv add pywin32
```

执行后 `pyproject.toml` 的 `dependencies` 部分应类似：

```toml
dependencies = [
    "ipykernel>=7.2.0",
    "jupyter>=1.1.1",
    "pywin32>=312",
]
```

---

## 3. 将虚拟环境注册为 Jupyter Kernel

这是**最关键的一步**。VS Code 通过 Jupyter 的 kernel spec 来发现可用的 Python 环境。你需要把当前虚拟环境的 Python 注册为一个 kernel：

```bash
# 使用虚拟环境中的 Python 来安装 kernel spec
.venv\Scripts\python.exe -m ipykernel install --user --name "my-project" --display-name "Python 3.13 (my-project)"
```

参数说明：
- `--user`：安装到用户目录（`%APPDATA%\jupyter\kernels\`），VS Code 会搜索这里
- `--name`：kernel 的唯一标识名（建议用项目名）
- `--display-name`：在 VS Code 内核选择器中显示的名称

安装后可以验证：

```bash
.venv\Scripts\python.exe -m jupyter kernelspec list
```

应该能看到类似输出：

```
Available kernels:
  my-project    C:\Users\<用户名>\AppData\Roaming\jupyter\kernels\my-project
```

---

## 4. 修复 kernel.json 中的 Python 路径（重要）

`ipykernel install` 生成的 `kernel.json` 通常已经包含绝对路径，但建议检查一下：

```bash
cat %APPDATA%\jupyter\kernels\my-project\kernel.json
```

确保 `argv` 的第一个参数是虚拟环境中 Python 的**绝对路径**：

```json
{
 "argv": [
  "E:\\projects\\my-project\\.venv\\Scripts\\python.exe",
  "-Xfrozen_modules=off",
  "-m",
  "ipykernel_launcher",
  "-f",
  "{connection_file}"
 ],
 "display_name": "Python 3.13 (my-project)",
 "language": "python",
 "metadata": {
  "debugger": true
 }
}
```

> ⚠️ 如果 `argv` 中写的是 `"python"` 而不是绝对路径，VS Code 可能解析到系统 Python 而非虚拟环境，导致 kernel 启动失败。

---

## 5. 在 VS Code 中打开项目

```bash
code .
```

## 6. 选择 Python 解释器

1. 按 `Ctrl+Shift+P`，输入 `Python: Select Interpreter`
2. 选择 `.venv` 中的 Python（路径类似 `.venv\Scripts\python.exe`）
3. 如果没看到，点击 `Enter interpreter path...` 手动浏览到 `.venv\Scripts\python.exe`

VS Code 会自动识别这个解释器，并在右下角显示。

---

## 7. 创建或打开 .ipynb 文件并选择 Kernel

1. 在 VS Code 中创建或打开一个 `.ipynb` 文件
2. 点击右上角的 **"Select Kernel"** 按钮（或点击右下角的内核名称）
3. 在弹出的列表中，选择 **"Python 3.13 (my-project)"**（即你注册 kernel 时指定的 `--display-name`）

如果列表中没有出现，尝试：
- 按 `Ctrl+Shift+P` → `Jupyter: Refresh Kernel List`
- 重启 VS Code

---

## 8. 验证一切正常

在 notebook 的第一个 cell 中输入：

```python
import sys
print(sys.executable)
print(sys.version)
```

运行（`Shift+Enter`），输出应该指向你的虚拟环境：

```
E:\projects\my-project\.venv\Scripts\python.exe
3.13.13 (tags/v3.13.13:...)
```

再测试调试功能：在 cell 中设置断点（点击行号左侧），然后按 `Ctrl+Shift+Enter` 或点击 "Debug Cell" 按钮，确认调试器能正常启动。

---

## 常见问题排查

### Q1: Kernel 启动后立即报错退出

**症状**：VS Code 提示 "The kernel died and failed to restart"

**原因及解决**：
1. **缺少 `pywin32`**（Windows 专属）→ 运行 `uv add pywin32`
2. **kernel.json 中 Python 路径错误** → 检查路径是否为绝对路径
3. **虚拟环境损坏** → 删除 `.venv` 后重建：`uv sync`

### Q2: VS Code 找不到我注册的 Kernel

**症状**：Kernel 选择器中没有你注册的 kernel

**解决**：
1. 确认 kernel 已安装：`.venv\Scripts\python.exe -m jupyter kernelspec list`
2. 刷新 VS Code kernel 列表：`Ctrl+Shift+P` → `Jupyter: Refresh Kernel List`
3. 如果仍然找不到，手动指定 kernel 路径：选择 kernel 时选 `Existing Jupyter Server...` 或 `Python Environments...` → 找到你的 `.venv`

### Q3: Kernel 启动了但 import 报错

**症状**：`ModuleNotFoundError`，找不到项目中的包

**解决**：
- 确认 kernel 使用的是虚拟环境的 Python（在 cell 中运行 `sys.executable` 确认）
- 确认依赖已安装：`uv sync`
- 如果使用了 `--no-site-packages`（uv 默认行为），系统 site-packages 不可见是正常的

### Q4: VS Code 右下角一直显示 "Starting Kernel"

**症状**：Kernel 一直卡在启动中

**解决**：
1. 检查 `pywin32` 是否安装（Windows）
2. 尝试在终端手动启动 kernel 测试：
   ```bash
   .venv\Scripts\python.exe -m ipykernel_launcher -f NUL
   ```
   如果报错，根据错误信息排查
3. 重启 VS Code

### Q5: pip 还是 uv？

这个项目的虚拟环境由 **uv** 管理，**请始终使用 `uv add` / `uv pip install` 来安装包**，不要使用全局 `pip`。否则可能安装到错误的 Python 环境中。

---

## 总结：核心流程

```bash
# 1. 创建项目
uv init my-project && cd my-project

# 2. 添加依赖
uv add ipykernel jupyter pywin32

# 3. 注册 kernel（最关键的一步！）
.venv\Scripts\python.exe -m ipykernel install --user --name my-project --display-name "Python (my-project)"

# 4. 在 VS Code 中打开项目并选择 kernel
code .
```

之后在 VS Code 中：
1. 选择解释器 → `.venv\Scripts\python.exe`
2. 选择 kernel → `Python (my-project)`
3. 开始写 notebook 🎉
