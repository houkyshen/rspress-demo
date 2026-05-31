# 视频转文字项目环境配置教程
## 一、先安装 uv
官方推荐用独立安装（不依赖已有 Python）：

**Windows（PowerShell）**
```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**macOS / Linux**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

重启终端，检查：
```bash
uv --version
```

---

## 二、uv 管理多 Python 版本（核心）

### 1）查看可装/已装版本
```bash
uv python list               # 所有可用 + 已安装
uv python list --only-installed  # 只看已装
```

### 2）安装你需要的版本
```bash
uv python install 3.8 3.9 3.10 3.11 3.12   # 一次性装多个
```

### 3）给项目固定 Python 版本（关键）
进入你的项目目录（比如 ai_companion）：
```bash
cd D:\projects\AI-Video-Transcriber  # Windows
# cd ~/projects/ai_companion   # macOS/Linux

uv python pin 3.9.25   # 本项目锁定用 3.8.20
```
会自动生成 **.python-version** 文件，以后进这个目录，uv 默认用这个版本。

---

## 三、每个项目建独立虚拟环境

```bash
# 1. Check CUDA version
nvidia-smi

# 2. Create virtual environment (optional but recommended)
uv venv venv
.\venv\Scripts\activate  # Windows

# 3. Install PyTorch with CUDA (choose based on your CUDA version)（耗时很久，因为torch要2.44G，而且下载速度很慢）
uv pip install torch==2.0.1 torchvision==0.15.2 torchaudio==2.0.2 --index-url https://download.pytorch.org/whl/cu118

# 4. Install remaining dependencies（兼容旧项目）
uv pip install -r requirements.txt

# 5. Test CUDA
python test_cuda.py

# 6. Start the application
python start.py
```

---

## 四、常用命令速查（你日常够用）
```bash
# 版本管理
uv python install 3.11
uv python pin 3.11
uv python list

# 环境与依赖
uv venv
uv add streamlit openai
uv run streamlit run app.py --server.port 8502

# 删环境（直接删文件夹）
rm -rf .venv
```

---

## 五、对比：uv vs pyenv+venv
- ✅ **一个工具搞定所有**：不用分开装 pyenv、venv、pip
- ✅ **速度极快**：Rust 写的，安装/解析依赖比 pip 快几倍
- ✅ **无需手动激活环境**：`uv run` 自动处理
- ✅ **跨平台一致**：Windows/macOS/Linux 命令完全一样

---

## 六、你现在的 AI 伴侣项目（直接复制执行）
```bash
# 1. 进项目
cd D:\projects\ai_companion

# 2. 固定 Python 3.10
uv python pin 3.10

# 3. 创建环境
uv venv

# 4. 装依赖
uv add streamlit openai

# 5. 启动（8502端口）
uv run streamlit run app.py --server.port 8502
```
