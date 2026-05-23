<div align="center">

![new-api](/web/default/public/logo.png)

# New API

🍥 **新一代大模型网关与AI资产管理系统**

<p align="center">
  <strong>简体中文</strong> |
  <a href="./README.zh_TW.md">繁體中文</a> |
  <a href="./README.md">English</a> |
  <a href="./README.fr.md">Français</a> |
  <a href="./README.ja.md">日本語</a>
</p>

<p align="center">
  <a href="https://raw.githubusercontent.com/Calcium-Ion/new-api/main/LICENSE">
    <img src="https://img.shields.io/github/license/Calcium-Ion/new-api?color=brightgreen" alt="license">
  </a><!--
  --><a href="https://github.com/Calcium-Ion/new-api/releases/latest">
    <img src="https://img.shields.io/github/v/release/Calcium-Ion/new-api?color=brightgreen&include_prereleases" alt="release">
  </a><!--
  --><a href="https://hub.docker.com/r/CalciumIon/new-api">
    <img src="https://img.shields.io/badge/docker-dockerHub-blue" alt="docker">
  </a><!--
  --><a href="https://goreportcard.com/report/github.com/Calcium-Ion/new-api">
    <img src="https://img.shields.io/goreportcard/github.com/Calcium-Ion/new-api" alt="GoReportCard">
  </a>
</p>

<p align="center">
  <a href="https://trendshift.io/repositories/20180" target="_blank">
    <img src="https://trendshift.io/api/badge/repositories/20180" alt="QuantumNous%2Fnew-api | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/>
  </a>
  <br>
  <a href="https://hellogithub.com/repository/QuantumNous/new-api" target="_blank">
    <img src="https://api.hellogithub.com/v1/widgets/recommend.svg?rid=539ac4217e69431684ad4a0bab768811&claim_uid=tbFPfKIDHpc4TzR" alt="Featured｜HelloGitHub" style="width: 250px; height: 54px;" width="250" height="54" />
  </a><!--
  --><a href="https://www.producthunt.com/products/new-api/launches/new-api?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-new-api" target="_blank" rel="noopener noreferrer">
    <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1047693&theme=light&t=1769577875005" alt="New API - All-in-one AI asset management gateway. | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" />
  </a>
</p>

<p align="center">
  <a href="#核心功能">核心功能</a> •
  <a href="#支持的模型">支持的模型</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#部署方式">部署方式</a> •
  <a href="#配置说明">配置说明</a> •
  <a href="#相关项目">相关项目</a>
</p>

</div>

---

## � 项目简介

New API 是一个基于 Go 语言开发的新一代 AI 大模型网关与资产管理平台。它整合了全球 40+ 主流 AI 服务提供商（包括 OpenAI、Anthropic、Google、Azure、AWS 等），为开发者和企业用户提供统一的 API 接口、完善的用户管理体系以及灵活的计费策略。

### 核心价值

- **统一接入**：通过单一 API 接口访问多个 AI 提供商，降低集成复杂度
- **成本控制**：支持渠道加权、模型限流、缓存计费等多种成本优化策略
- **灵活扩展**：支持 SQLite、MySQL、PostgreSQL 多种数据库，可根据规模灵活部署
- **安全可靠**：支持 JWT、OAuth、Passkey 等多种认证方式，保障系统安全

---

## 🤝 我们信任的合作伙伴

<p align="center">
  <em>排名不分先后</em>
</p>

<p align="center">
  <a href="https://www.cherry-ai.com/" target="_blank">
    <img src="./docs/images/cherry-studio.png" alt="Cherry Studio" height="80" />
  </a><!--
  --><a href="https://github.com/iOfficeAI/AionUi/" target="_blank">
    <img src="./docs/images/aionui.png" alt="Aion UI" height="80" />
  </a><!--
  --><a href="https://bda.pku.edu.cn/" target="_blank">
    <img src="./docs/images/pku.png" alt="北京大学" height="80" />
  </a><!--
  --><a href="https://www.compshare.cn/?ytag=GPU_yy_gh_newapi" target="_blank">
    <img src="./docs/images/ucloud.png" alt="UCloud 优刻得" height="80" />
  </a><!--
  --><a href="https://www.aliyun.com/" target="_blank">
    <img src="./docs/images/aliyun.png" alt="阿里云" height="80" />
  </a><!--
  --><a href="https://io.net/" target="_blank">
    <img src="./docs/images/io-net.png" alt="IO.NET" height="80" />
  </a>
</p>

---

## 🙏 特别鸣谢

<p align="center">
  <a href="https://www.jetbrains.com/?from=new-api" target="_blank">
    <img src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png" alt="JetBrains Logo" width="120" />
  </a>
</p>

<p align="center">
  <strong>感谢 <a href="https://www.jetbrains.com/?from=new-api">JetBrains</a> 为本项目提供免费的开源开发许可证</strong>
</p>

---

## � 核心功能

### 🎨 核心特性

| 功能 | 说明 |
|------|------|
| 🎨 全新 UI | 采用现代化设计语言，提供简洁美观的操作界面 |
| 🌍 多语言 | 支持简体中文、繁体中文、英文、法语、日语、越南语、俄语 |
| 🔄 数据兼容 | 完全兼容 One API 数据库，可平滑迁移现有数据 |
| 📈 数据看板 | 可视化控制台，实时展示用量统计与收入分析 |
| 🔒 权限管理 | 令牌分组、模型限制、用户角色等多维度权限控制 |

### 💰 支付与计费

- ✅ **多渠道充值**：支持易支付(EPay)、Stripe、Creem、Waffo 等多种支付方式
- ✅ **模型按次计费**：支持按请求次数、Token 用量等多维度计费
- ✅ **缓存计费**：支持 OpenAI、Azure、DeepSeek、Claude、Qwen 等模型的缓存计费
- ✅ **灵活倍率**：可针对不同渠道、模型、用户组设置独立计费倍率
- ✅ **订阅套餐**：支持创建订阅套餐，实现自动周期重置与预付费
- ✅ **阶梯计费**：支持表达式计费，可配置复杂的多阶梯定价策略

### 🔐 授权与安全

- ✅ **多因素认证**：支持 TOTP 两步验证、Passkey (WebAuthn/FIDO2) 安全密钥
- ✅ **OAuth 登录**：支持 Discord、GitHub、LinuxDO、Telegram 等第三方登录
- ✅ **OIDC 认证**：支持 OIDC 统一认证，可对接企业身份管理系统
- ✅ **API Key 管理**：支持批量生成、额度分配、使用追踪等完整生命周期管理
- ✅ **Key 额度查询**：可配合 [neko-api-key-tool](https://github.com/Calcium-Ion/neko-api-key-tool) 查询各平台 Key 剩余额度

### 🚀 高级功能

#### API 格式支持

| 格式类型 | 说明 | 文档 |
|---------|------|------|
| ⚡ OpenAI Chat Completions | 兼容 OpenAI 聊天接口格式 | [查看](https://docs.newapi.pro/zh/docs/api/ai-model/chat/openai/createchatcompletion) |
| ⚡ OpenAI Responses | OpenAI 最新 Responses API | [查看](https://docs.newapi.pro/zh/docs/api/ai-model/chat/openai/createresponse) |
| ⚡ OpenAI Realtime | 支持 WebSocket 实时对话（含 Azure）| [查看](https://docs.newapi.pro/zh/docs/api/ai-model/realtime/createrealtimesession) |
| ⚡ Claude Messages | Anthropic Claude 消息格式 | [查看](https://docs.newapi.pro/zh/docs/api/ai-model/chat/create-message) |
| ⚡ Google Gemini | Google Gemini 对话格式 | [查看](https://docs.newapi.pro/zh/docs/api/ai-model/chat/gemini/geminirelayv1beta) |
| 🔄 Rerank | 支持 Cohere、Jina Rerank 模型 | [查看](https://docs.newapi.pro/zh/docs/api/ai-model/rerank/creatererank) |

#### 智能路由

- ⚖️ **渠道加权随机**：根据配置权重自动分配请求到不同渠道
- 🔄 **失败自动重试**：支持配置失败重试次数，确保请求高可用
- 🚦 **用户级限流**：可针对不同用户组设置独立的请求频率限制
- 🎯 **渠道亲和性**：支持基于用户会话的渠道一致性路由

#### 格式转换

- 🔄 **OpenAI ↔ Claude**：自动转换两种格式的请求与响应
- 🔄 **OpenAI ↔ Gemini**：支持格式双向转换（文本模式）
- 🔄 **思考转内容**：支持提取模型思考过程并转换为结构化内容

#### Reasoning Effort 支持

<details>
<summary>查看支持的模型配置</summary>

**OpenAI 系列模型：**
- `o3-mini-high` / `o3-mini-medium` / `o3-mini-low` - 调整推理强度
- `gpt-5-high` / `gpt-5-medium` / `gpt-5-low` - 调整推理强度

**Claude 思考模型：**
- `claude-3-7-sonnet-20250219-thinking` - 启用思考模式

**Google Gemini 系列模型：**
- `gemini-2.5-flash-thinking` - 启用思考模式
- `gemini-2.5-flash-nothinking` - 禁用思考模式
- `gemini-2.5-pro-thinking` - 启用思考模式
- `gemini-2.5-pro-thinking-128` - 启用思考模式并设置 128 tokens 思考预算
- 可在模型名后追加 `-low` / `-medium` / `-high` 控制思考力度

</details>

---

## 🤖 支持的模型

> 完整接口文档请访问 [官方文档](https://docs.newapi.pro/zh/docs/api)

### 模型类型

| 模型类型 | 说明 | 示例提供商 |
|---------|------|-----------|
| 🤖 OpenAI-Compatible | OpenAI 兼容模型 | OpenAI、Azure、OpenRouter、Ollama 等 |
| 🤖 OpenAI Responses | OpenAI Responses 格式 | OpenAI 最新 API |
| 🎨 图像生成 | Midjourney 风格的图像生成 | Midjourney-Proxy、即梦、Kling |
| 🎵 音乐生成 | Suno 音乐生成 API | Suno |
| 🔄 Rerank | 文档重排序模型 | Cohere、Jina |
| 💬 Claude | Anthropic Claude 系列 | Claude (Anthropic) |
| 🌐 Gemini | Google Gemini 系列 | Gemini (Google) |
| 🔧 Dify | ChatFlow 模式 | Dify |
| 🎯 自定义 | 支持完整自定义调用地址 | - |

### 支持的接口

| 接口类型 | 说明 |
|---------|------|
| 💬 聊天补全 (Chat Completions) | 标准聊天补全接口 |
| 📝 响应接口 (Responses) | OpenAI Responses API |
| 🖼️ 图像生成 (Image Generations) | DALL-E、Midjourney 等 |
| 🎵 音频处理 (Audio) | 语音转文字、文字转语音 |
| 🎬 视频生成 (Video) | 视频生成与配音 |
| 📊 嵌入向量 (Embeddings) | 文本向量化 |
| 🔄 重排序 (Rerank) | 文档相关性排序 |
| 🔊 实时对话 (Realtime) | WebSocket 实时语音交互 |

---

## 🚀 快速开始

### 使用 Docker Compose（推荐）

```bash
# 克隆项目
git clone https://github.com/QuantumNous/new-api.git
cd new-api

# 编辑 docker-compose.yml 配置数据库和存储
nano docker-compose.yml

# 启动服务
docker-compose up -d
```

<details>
<summary><strong>使用 Docker 命令行</strong></summary>

```bash
# 拉取最新镜像
docker pull calciumion/new-api:latest

# 使用 SQLite（默认）
docker run --name new-api -d --restart always \
  -p 3000:3000 \
  -e TZ=Asia/Shanghai \
  -v ./data:/data \
  calciumion/new-api:latest

# 使用 MySQL
docker run --name new-api -d --restart always \
  -p 3000:3000 \
  -e SQL_DSN="root:123456@tcp(localhost:3306)/oneapi" \
  -e TZ=Asia/Shanghai \
  -v ./data:/data \
  calciumion/new-api:latest

# 使用 PostgreSQL
docker run --name new-api -d --restart always \
  -p 3000:3000 \
  -e SQL_DSN="postgres:123456@tcp(localhost:5432)/oneapi?charset=utf8&parseTime=True&loc=Local" \
  -e TZ=Asia/Shanghai \
  -v ./data:/data \
  calciumion/new-api:latest
```

> **💡 提示：** `-v ./data:/data` 会将数据保存在当前目录的 `data` 文件夹中

</details>

---

🎉 部署完成后，访问 `http://localhost:3000` 即可开始使用！

📖 更多部署方式请参考 [部署指南](https://docs.newapi.pro/zh/docs/installation)

---

## 📚 文档

<div align="center">

### 📖 [官方文档](https://docs.newapi.pro/zh/docs) | [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/QuantumNous/new-api)

</div>

**快速导航：**

| 分类 | 链接 |
|------|------|
| 🚀 部署指南 | [安装文档](https://docs.newapi.pro/zh/docs/installation) |
| ⚙️ 环境配置 | [环境变量](https://docs.newapi.pro/zh/docs/installation/config-maintenance/environment-variables) |
| 📡 接口文档 | [API 文档](https://docs.newapi.pro/zh/docs/api) |
| ❓ 常见问题 | [FAQ](https://docs.newapi.pro/zh/docs/support/faq) |
| 💬 社区交流 | [交流渠道](https://docs.newapi.pro/zh/docs/support/community-interaction) |

---

## � 部署方式

> [!TIP]
> **最新版 Docker 镜像：** `calciumion/new-api:latest`

### 📋 部署要求

| 组件 | 要求 |
|------|------|
| **本地数据库** | SQLite（Docker 需挂载 `/data` 目录）|
| **远程数据库** | MySQL ≥ 5.7.8 或 PostgreSQL ≥ 9.6 |
| **容器引擎** | Docker / Docker Compose |

### ⚙️ 环境变量配置

<details>
<summary>常用环境变量配置</summary>

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `SESSION_SECRET` | 会话密钥（多机部署必须）| - |
| `CRYPTO_SECRET` | 加密密钥（Redis 必须）| - |
| `SQL_DSN` | 数据库连接字符串 | - |
| `REDIS_CONN_STRING` | Redis 连接字符串 | - |
| `STREAMING_TIMEOUT` | 流式超时时间（秒）| `300` |
| `STREAM_SCANNER_MAX_BUFFER_MB` | 流式扫描器单行最大缓冲（MB）| `64` |
| `MAX_REQUEST_BODY_MB` | 请求体最大大小（MB，解压后）| `32` |
| `AZURE_DEFAULT_API_VERSION` | Azure API 版本 | `2025-04-01-preview` |
| `ERROR_LOG_ENABLED` | 错误日志开关 | `false` |
| `PYROSCOPE_URL` | Pyroscope 服务地址 | - |
| `PYROSCOPE_APP_NAME` | Pyroscope 应用名 | `new-api` |

📖 **完整配置：** [环境变量文档](https://docs.newapi.pro/zh/docs/installation/config-maintenance/environment-variables)

</details>

### 🔧 部署方式对比

| 方式 | 适用场景 | 难度 |
|------|---------|------|
| Docker Compose | 生产环境，推荐 | ⭐⭐ |
| Docker 命令 | 快速体验 | ⭐ |
| 宝塔面板 | 习惯可视化操作 | ⭐ |
| 源码编译 | 自定义开发 | ⭐⭐⭐ |

<details>
<summary><strong>方式 1：Docker Compose（推荐）</strong></summary>

```bash
# 克隆项目
git clone https://github.com/QuantumNous/new-api.git
cd new-api

# 编辑配置
nano docker-compose.yml

# 启动服务
docker-compose up -d
```

</details>

<details>
<summary><strong>方式 2：Docker 命令</strong></summary>

**使用 SQLite：**
```bash
docker run --name new-api -d --restart always \
  -p 3000:3000 \
  -e TZ=Asia/Shanghai \
  -v ./data:/data \
  calciumion/new-api:latest
```

**使用 MySQL：**
```bash
docker run --name new-api -d --restart always \
  -p 3000:3000 \
  -e SQL_DSN="root:123456@tcp(localhost:3306)/oneapi" \
  -e TZ=Asia/Shanghai \
  -v ./data:/data \
  calciumion/new-api:latest
```

> **💡 路径说明：**
> - `./data:/data` - 相对路径，数据保存在当前目录的 data 文件夹
> - 也可使用绝对路径，如：`/your/custom/path:/data`

</details>

<details>
<summary><strong>方式 3：宝塔面板</strong></summary>

1. 安装宝塔面板（≥ 9.2.0 版本）
2. 在应用商店搜索 **New-API**
3. 一键安装

📖 [图文教程](./docs/installation/BT.md)

</details>

### ⚠️ 多机部署注意事项

> [!WARNING]
> - **必须设置** `SESSION_SECRET` - 否则登录状态不一致
> - **公用 Redis 必须设置** `CRYPTO_SECRET` - 否则数据无法解密

### 🔄 渠道重试与缓存

**重试配置：** `设置 → 运营设置 → 通用设置 → 失败重试次数`

**缓存配置：**
- `REDIS_CONN_STRING`：Redis 缓存（推荐）
- `MEMORY_CACHE_ENABLED`：内存缓存

---

## 🔗 相关项目

### 上游项目

| 项目 | 说明 |
|------|------|
| [One API](https://github.com/songquanpeng/one-api) | 原版项目基础 |
| [Midjourney-Proxy](https://github.com/novicezk/midjourney-proxy) | Midjourney 接口支持 |

### 配套工具

| 项目 | 说明 |
|------|------|
| [neko-api-key-tool](https://github.com/Calcium-Ion/neko-api-key-tool) | Key 额度查询工具 |
| [new-api-horizon](https://github.com/Calcium-Ion/new-api-horizon) | New API 高性能优化版 |

---

## 💬 帮助支持

### 📖 文档资源

| 资源 | 链接 |
|------|------|
| 📘 常见问题 | [FAQ](https://docs.newapi.pro/zh/docs/support/faq) |
| 💬 社区交流 | [交流渠道](https://docs.newapi.pro/zh/docs/support/community-interaction) |
| 🐛 问题反馈 | [问题反馈](https://docs.newapi.pro/zh/docs/support/feedback-issues) |
| 📚 完整文档 | [官方文档](https://docs.newapi.pro/zh/docs) |

### 🤝 贡献指南

欢迎各种形式的贡献！

- 🐛 报告 Bug
- 💡 提出新功能
- 📝 改进文档
- 🔧 提交代码

---

## 📜 许可证

本项目采用 [GNU Affero 通用公共许可证 v3.0 (AGPLv3)](./LICENSE) 授权。

根据 AGPLv3 第 7 条的附加条款，修改后的版本必须在适当的法律声明以及用户界面中显示的任何关于、合法、页脚或归属位置保留作者署名声明 `Frontend design and development by New API contributors.`。

展示用户界面的修改版本还必须保留指向原始项目的可见链接：<https://github.com/QuantumNous/new-api>。

本项目为开源项目，在 [One API](https://github.com/songquanpeng/one-api)（MIT 许可证）的基础上进行二次开发。

如果您所在的组织政策不允许使用 AGPLv3 许可的软件，或您希望规避 AGPLv3 的开源义务，请发送邮件至：[support@quantumnous.com](mailto:support@quantumnous.com)

---

## 🌟 Star History

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=Calcium-Ion/new-api&type=Date)](https://star-history.com/#Calcium-Ion/new-api&Date)

</div>

---

<div align="center">

### 💖 感谢使用 New API

如果这个项目对你有帮助，欢迎给我们一个 ⭐️ Star！

**[官方文档](https://docs.newapi.pro/zh/docs)** • **[问题反馈](https://github.com/Calcium-Ion/new-api/issues)** • **[最新发布](https://github.com/Calcium-Ion/new-api/releases)**

<sub>Built with ❤️ by QuantumNous</sub>

</div>