# 双站 SSO + 用户同步方案设计文档

> 项目：Site A (Dujiao macOSABC) + Site B (New API)  
> 日期：2026-05-15  
> 状态：规划中

---

## 1. 背景与目标

### 1.1 现状

| 项 | Site A (Dujiao) | Site B (New API) |
|---|---|---|
| 技术栈 | Node.js (Express) + PostgreSQL + Redis | Go (Gin) + PostgreSQL + Redis |
| 认证方式 | JWT（`user_jwt.secret`，24h 过期） | Session + JWT + OAuth/Paskey/OIDC |
| 当前域名 | `www.macosabc.com` / `api.macosabc.com` | `token.txsw.top` |
| 部署方式 | Docker Compose（Cloudflare Tunnel） | Docker / 本地开发 |
| 代码控制 | `server.js` 为扩展商店服务，核心认证在 Docker 镜像内 | 完全可控 |

### 1.2 目标

1. **双向 SSO**：用户在任意一站登录后，跳转到另一站时自动登录，无需重新输入账号密码。
   - A → B：用户在 A 站登录，进入 B 站自动登录 ✅
   - B → A：用户在 B 站注册/登录，进入 A 站自动登录 ✅
2. **iframe 嵌入**：Site A 导航栏嵌入 Site B，隐藏 Site B 的导航栏和页脚（已实现）。
3. **用户数据同步**：首次 SSO 登录时，自动在对方站点创建对应用户并绑定。
4. **对等架构**：两端都作为 OAuth2 Provider 和 Consumer，代码结构对称。

### 1.3 域名规划

- **当前（阶段一）**：跨域（`macosabc.com` ↔ `txsw.top`），需要完整 OAuth2 流程。
- **未来（阶段二）**：同父域名（`a.example.com` ↔ `b.example.com`），可简化为共享 Cookie。

### 1.4 代码控制权

两端项目均有完整源码和数据库控制权，可以自由添加 OAuth2 端点、修改认证逻辑和数据库结构。

---

## 2. 架构设计

### 2.1 整体流程

```
┌──────────────────────────┐          ┌──────────────────────────┐
│     Site A (Dujiao)      │          │     Site B (New API)     │
│     a.example.com        │          │     b.example.com        │
│                          │          │                          │
│  ┌────────────────┐      │          │  ┌──────────────────┐    │
│  │  用户登录成功    │      │          │  │ CustomOAuth      │    │
│  │  签发 JWT       │      │          │  │ Provider（已有）  │    │
│  └───────┬────────┘      │          │  └────────┬─────────┘    │
│          │               │          │           │              │
│  ┌───────▼────────┐      │          │  ┌────────▼─────────┐    │
│  │ /oauth/authorize│◄─────┼──────────┤  │ SSO 登录入口     │    │
│  │ /oauth/token   │      │          │  │ /sso/dujiao     │    │
│  │ /oauth/userinfo │──────┼─────────►│  └────────┬─────────┘    │
│  └────────────────┘      │          │           │              │
│                          │          │  ┌────────▼─────────┐    │
│                          │          │  │ 查找/创建用户     │    │
│                          │          │  │ 绑定 OAuth       │    │
│                          │          │  │ 签发 Session     │    │
│                          │          │  └──────────────────┘    │
│                          │          │                          │
│  ┌────────────────┐      │          │  ┌──────────────────┐    │
│  │ 导航栏按钮       │──────┼────iframe─►│ 嵌入页面          │    │
│  │ 点击嵌入 B 站   │      │          │  │ （无导航栏/页脚）  │    │
│  └────────────────┘      │          │  └──────────────────┘    │
└──────────────────────────┘          └──────────────────────────┘
```

### 2.2 OAuth2 Authorization Code 流程

```
用户                 Site B (New API)           Site A (Dujiao)
 │                        │                          │
 │  1. 访问 B 站           │                          │
 │──────────────────────►│                          │
 │                        │                          │
 │  2. 检测未登录，重定向    │                          │
 │◄──────────────────────│                          │
 │                        │                          │
 │  3. 浏览器跳转到 A 授权页 │                          │
 │─────────────────────────────────────────────────►│
 │                        │                          │
 │  4. A 检测用户已登录     │                          │
 │  5. 展示授权页/自动同意   │                          │
 │◄─────────────────────────────────────────────────│
 │                        │                          │
 │  6. A 签发 code，重定向回 B                        │
 │──────────────────────►│                          │
 │                        │                          │
 │                        │  7. B 后端用 code 换 token  │
 │                        │─────────────────────────►│
 │                        │◄─────────────────────────│
 │                        │                          │
 │                        │  8. B 用 token 获取用户信息  │
 │                        │─────────────────────────►│
 │                        │◄─────────────────────────│
 │                        │                          │
 │  9. B 创建/关联用户，签发 Session                  │
 │◄──────────────────────│                          │
 │                        │                          │
 │  10. 自动登录完成       │                          │
```

### 2.3 反向流程：B → A（用户在 B 站登录后自动登录 A 站）

```
用户                 Site B (New API)           Site A (Dujiao)
 │                        │                          │
 │  1. 在 B 站注册/登录     │                          │
 │──────────────────────►│                          │
 │                        │                          │
 │  2. 点击导航跳转到 A 站   │                          │
 │─────────────────────────────────────────────────►│
 │                        │                          │
 │  3. A 检测未登录，重定向到 B 授权                   │
 │◄─────────────────────────────────────────────────│
 │                        │                          │
 │  4. B 检测用户已登录     │                          │
 │  5. B 签发 code，重定向回 A                        │
 │──────────────────────►│─────────────────────────►│
 │                        │                          │
 │                        │  6. A 后端用 code 换 token  │
 │                        │  (A → B /oauth/token)     │
 │                        │                          │
 │                        │  7. A 用 token 获取 B 用户信息 │
 │                        │  (A → B /oauth/userinfo)   │
 │                        │                          │
 │                        │  8. A 创建/关联用户，签发 Session│
 │◄─────────────────────────────────────────────────│
 │                        │                          │
 │  9. A 自动登录完成       │                          │
```

**关键：两端互为 OAuth Provider 和 Consumer，代码结构完全对称。**

### 2.3 同父域名简化流程（阶段二）

```
用户                 Site B (New API)           Site A (Dujiao)
 │                        │                          │
 │  1. 访问 B 站           │                          │
 │──────────────────────►│                          │
 │                        │                          │
 │  2. B 读取 .example.com 域 Cookie（含 A 的 JWT）    │
 │                        │─────────────────────────►│
 │                        │  3. 验证 JWT 签名          │
 │                        │◄─────────────────────────│
 │                        │                          │
 │                        │  4. 查找/创建用户并登录     │
 │◄──────────────────────│                          │
 │                        │                          │
 │  5. 自动登录完成（静默） │                          │
```

---

## 3. 用户数据同步设计

### 3.1 数据映射

| Site A 字段 | Site B 字段 | 同步规则 |
|---|---|---|
| `id` | `user_oauth_bindings.provider_user_id` | 首次绑定，不变 |
| `email` | `users.email` | 每次 SSO 登录同步更新 |
| `username` | `users.username`（加后缀 `_a`） | 首次创建时生成，后续不同步 |
| `display_name` | `users.display_name` | 每次 SSO 登录同步更新 |
| `avatar_url` | `users.setting`（JSON 内） | 每次 SSO 登录同步更新 |

### 3.2 用户同步策略

#### 首次 SSO 登录（A → B）

```
1. Site B 从 Site A /oauth/userinfo 获取用户信息
2. 检查 user_oauth_bindings 是否已存在该 provider_user_id
   ├─ 存在 → 直接登录该用户
   └─ 不存在 → 
      a. 检查 users 表是否已有同 email 的用户
         ├─ 有 → 绑定到该用户（创建 user_oauth_binding 记录）
         └─ 无 → 创建新用户 + 创建 binding 记录
3. 签发 Site B Session，自动登录
```

#### 首次 SSO 登录（B → A，反向）

```
1. Site A 从 Site B /oauth/userinfo 获取用户信息
2. 检查 B 站的用户是否在 A 站已有账号（通过 email 或 username 匹配）
   ├─ 有 → 创建 OAuth 绑定，直接登录
   └─ 无 → 在 A 站创建新用户 + 创建绑定记录
3. 签发 Site A JWT，自动登录
```

#### 后续 SSO 登录（双向）

```
1. 通过 provider_user_id 找到绑定 → 找到用户
2. 可选：同步更新 display_name、email 等字段
3. 签发对应站点的 Session/JWT，自动登录
```

#### 非同步用户

```
- A 站独立注册的用户 → 下次 SSO 到 B 时，通过邮箱匹配并绑定
- B 站独立注册的用户 → 下次 SSO 到 A 时，通过邮箱匹配并绑定
- 两站同邮箱用户自动关联
```

### 3.3 数据模型（New API 侧，已有，无需新建表）

```go
// 已有：CustomOAuthProvider — 存储第三方 OAuth 配置
type CustomOAuthProvider struct {
    Id                    int
    Name                  string    // "Dujiao SSO"
    Slug                  string    // "dujiao"
    ClientId              string
    ClientSecret          string
    AuthorizationEndpoint string    // https://api.macosabc.com/oauth/authorize
    TokenEndpoint         string    // https://api.macosabc.com/oauth/token
    UserInfoEndpoint      string    // https://api.macosabc.com/oauth/userinfo
    UserIdField           string    // "id"
    UsernameField         string    // "username"
    DisplayNameField      string    // "display_name"
    EmailField            string    // "email"
    // ...
}

// 已有：UserOAuthBinding — 存储用户与 OAuth 提供商的绑定关系
type UserOAuthBinding struct {
    Id             int
    UserId         int       // Site B 用户 ID
    ProviderId     int       // 指向 CustomOAuthProvider.ID
    ProviderUserId string    // Site A 用户 ID
}
```

---

## 4. 实施计划

### 4.1 阶段一：跨域 OAuth2 双向 SSO

#### Site B（New API）— 改动清单

| 序号 | 任务 | 文件/模块 | 说明 |
|------|------|-----------|------|
| B-1 | 配置 Custom OAuth Provider（指向 A 站） | 管理后台 UI | `slug=dujiao`，填入 A 站三个端点 URL、Client ID/Secret |
| B-2 | 新增 SSO 登录入口 | 新增路由 `/sso/dujiao` | 检测未登录 → 重定向 A 站授权页；已登录 → Dashboard |
| B-3 | iframe 嵌入参数 | `Home` 组件 | 已实现（URL 模式隐藏导航栏），A 站导航按钮嵌入 B 站 URL |
| B-4 | 跨域 Cookie 配置 | Session 中间件 | 设置 `SameSite=None; Secure` |
| B-5 | SSO 登录用户同步 | `controller/custom_oauth.go` | 已有 OAuth 回调逻辑，增加 `display_name`、`email` 同步更新 |
| B-6 | **新增 OAuth Provider 端点（供 A 站调用）** | 新增 3 个路由 | `/oauth/authorize`、`/oauth/token`、`/oauth/userinfo` — 让 A 站也能用 B 站做 SSO |

#### Site A（Dujiao）— 改动清单

| 序号 | 任务 | 文件/模块 | 说明 |
|------|------|-----------|------|
| A-1 | OAuth2 Authorize 端点 | 新增 `/oauth/authorize` | 验证用户登录态，签发一次性 code（供 B 站调用） |
| A-2 | OAuth2 Token 端点 | 新增 `/oauth/token` | 用 code 换取 access_token（供 B 站调用） |
| A-3 | OAuth2 UserInfo 端点 | 新增 `/oauth/userinfo` | 返回用户 id、username、email、display_name（供 B 站调用） |
| A-4 | 配置 B 站为 OAuth Provider | 配置文件 | 添加 B 站的 OAuth 端点 URL、Client ID/Secret |
| A-5 | SSO 登录逻辑（B → A） | 新增 SSO 模块 | 检测未登录 → 重定向到 B 站授权 → 回调创建/关联用户 → 签发 A 站 JWT |
| A-6 | 导航栏嵌入 B 站按钮 | 前端模板 | 添加菜单项，iframe 嵌入 B 站 URL |
| A-7 | CORS 配置 | nginx / API 中间件 | 允许 B 站域名跨域请求 |

---

### 4.2 阶段二：同父域名共享 Cookie

> 前提：两个站点部署在 `*.example.com` 下

| 序号 | 任务 | 说明 |
|------|------|------|
| C-1 | Cookie 域名统一 | A 和 B 的 Session Cookie 都设置 `domain=.example.com` |
| C-2 | JWT 签名密钥共享 | A 和 B 使用相同的 JWT Secret（或公钥验证） |
| C-3 | B 站静默登录中间件 | 检测到 A 站 Cookie → 验证签名 → 查找/创建用户 → 自动登录 |
| C-4 | 保留 OAuth 作为 fallback | Cookie 失效时降级到 OAuth 流程 |

---

### 4.3 阶段三（可选）：实时数据同步

| 方案 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| **SSO 登录时按需同步** | 零延迟、实现简单 | 非登录场景不同步 | ★★★★★ |
| **Webhook 事件推送** | 实时性强 | 需 A 站支持 Webhook、需处理失败重试 | ★★★☆☆ |
| **定时轮询** | 实现简单 | 有延迟、增加 API 调用量 | ★★☆☆☆ |
| **共享数据库视图** | 数据强一致 | 耦合严重、迁移困难 | ★☆☆☆☆ |

**推荐**：阶段一、二只做「SSO 登录时同步」，足够满足绝大部分场景。

---

## 5. API 接口设计

### 5.1 Site A 需新增的端点

#### `GET /oauth/authorize`

```
用途：OAuth2 授权端点
参数：
  - response_type=code（固定）
  - client_id（B 站在 A 站注册的 Client ID）
  - redirect_uri（B 站回调地址）
  - state（CSRF 防护随机字符串）
  - scope=openid profile email

行为：
  1. 验证 client_id 和 redirect_uri
  2. 检查用户是否已登录
     - 未登录 → 重定向到 A 站登录页
     - 已登录 → 签发 code，重定向到 redirect_uri?code=xxx&state=xxx
```

#### `POST /oauth/token`

```
用途：OAuth2 Token 端点
参数：
  - grant_type=authorization_code（固定）
  - code（从 /oauth/authorize 获得）
  - redirect_uri（与授权请求一致）
  - client_id
  - client_secret

返回：
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

#### `GET /oauth/userinfo`

```
用途：返回 A 站用户信息
请求头：Authorization: Bearer <access_token>

返回：
{
  "id": "12345",
  "username": "zhangsan",
  "display_name": "张三",
  "email": "zhangsan@example.com",
  "avatar_url": "https://..."
}
```

### 5.2 Site B 的 SSO 入口（B 作为 Consumer，A 作为 Provider）

#### `GET /sso/dujiao`

```
用途：从 A 站 SSO 登录到 B 站的入口
行为：
  1. 检查用户是否已登录
     - 已登录 → 重定向到 /dashboard
     - 未登录 → 重定向到 Site A 的 /oauth/authorize?...
  2. OAuth 回调后自动创建/关联用户，签发 Session
  3. 重定向到 /dashboard（iframe 内）
```

#### `GET /sso/dujiao/callback`

```
用途：A 站 OAuth2 回调端点
参数：
  - code（A 站返回的授权码）
  - state（CSRF 校验）

行为：
  1. 验证 state 与 session 中存储的一致
  2. 用 code 向 A 站 /oauth/token 换取 access_token
  3. 用 access_token 请求 A 站 /oauth/userinfo
  4. 查找或创建用户 + 创建 OAuth 绑定
  5. 签发 B 站 Session
  6. 重定向到 /dashboard
```

### 5.3 Site B 作为 OAuth Provider（供 A 站调用）

#### `GET /oauth/authorize`

```
用途：B 站的 OAuth2 授权端点（供 A 站 SSO 使用）
参数：
  - response_type=code
  - client_id（A 站在 B 站注册的 Client ID）
  - redirect_uri（A 站回调地址）
  - state
  - scope=openid profile email

行为：
  1. 验证 client_id 和 redirect_uri
  2. 检查用户是否已登录
     - 未登录 → 重定向到 B 站登录页
     - 已登录 → 签发 code，重定向到 redirect_uri?code=xxx&state=xxx
```

#### `POST /oauth/token`

```
用途：B 站的 Token 端点（供 A 站调用）
参数：
  - grant_type=authorization_code
  - code
  - redirect_uri
  - client_id
  - client_secret

返回：
{
  "access_token": "...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

#### `GET /oauth/userinfo`

```
用途：返回 B 站用户信息（供 A 站调用）
请求头：Authorization: Bearer <access_token>

返回：
{
  "id": "12345",
  "username": "lisi_b",
  "display_name": "李四",
  "email": "lisi@example.com"
}
```

### 5.4 Site A 的 SSO 入口（A 作为 Consumer，B 作为 Provider）

#### `GET /sso/newapi`

```
用途：从 B 站 SSO 登录到 A 站的入口
行为：
  1. 检查用户是否已登录（检查 JWT）
     - 已登录 → 重定向到 A 站首页
     - 未登录 → 重定向到 Site B 的 /oauth/authorize?...
  2. OAuth 回调后自动创建/关联用户，签发 JWT
  3. 重定向到 A 站首页
```

#### `GET /sso/newapi/callback`

```
用途：B 站 OAuth2 回调端点
参数：
  - code（B 站返回的授权码）
  - state（CSRF 校验）

行为：
  1. 验证 state
  2. 用 code 向 B 站 /oauth/token 换取 access_token
  3. 用 access_token 请求 B 站 /oauth/userinfo
  4. 查找或创建 A 站用户 + 创建绑定记录
  5. 签发 A 站 JWT Cookie
  6. 重定向到 A 站首页
```

---

## 6. 安全清单

| 检查项 | 状态 | 说明 |
|--------|------|------|
| HTTPS 强制 | 待实施 | 生产环境全站 HTTPS |
| CSRF（state 参数） | 规划中 | OAuth2 标准 state 参数，双向均需 |
| Code 一次性使用 | 规划中 | Redis 存储，用后即删 |
| Code 过期时间 | 规划中 | code 5 分钟过期 |
| Token 过期时间 | 规划中 | access_token 1h |
| Redirect URI 白名单 | 规划中 | 双向严格校验 redirect_uri |
| SameSite Cookie | 规划中 | 跨域设 `None; Secure`，同域设 `Lax` |
| Client Secret 安全 | 规划中 | 双方各自保管，通过 HTTPS 传输 |
| Token 签名验证 | 规划中 | A 站 JWT 用 A 的 secret，B 站用 B 的 |
| 日志审计 | 规划中 | 双向记录所有 SSO 登录事件 |
| 双向授权确认 | 待确认 | 是否需要用户手动点"同意授权"还是自动通过 |

---

## 7. 工时估算

| 阶段 | 任务 | 预估工时 |
|------|------|----------|
| **阶段一：A → B SSO** | | |
| | B-1 ~ B-5（New API 侧 Consumer） | 4-6h |
| | A-1 ~ A-3（Dujiao 侧 Provider） | 3-4h |
| | 安全校验 + 联调测试 | 2-3h |
| | **小计** | **9-13h** |
| **阶段一补充：B → A SSO** | | |
| | B-6（New API 侧 Provider 端点） | 3-4h |
| | A-4 ~ A-5（Dujiao 侧 Consumer） | 3-4h |
| | 安全校验 + 联调测试 | 2-3h |
| | **小计** | **8-11h** |
| **阶段一总计** | | **17-24h（约 2-3 天）** |
| 阶段二 | 同域 Cookie + 静默登录 | 4-6h |
| 阶段三 | Webhook/轮询同步（可选） | 6-8h |

---

## 8. 已确认事项

1. **用户名冲突处理** — ✅ 已确认：**A 站注册了某个用户名，B 站就不能再用这个用户名注册**。SSO 创建用户时，如果用户名已被占用且不是同一人（email 不同），则自动加后缀 `_a` / `_b` 区分。
2. **新用户默认额度** — ✅ 已确认：**跟随 B 站后台设置的默认额度**，与 B 站自己注册的用户一致。
3. **iframe 跳转登录** — ✅ 已确认：**OAuth 授权流程跳出 iframe，在顶层窗口完成**。原因：现代浏览器对 iframe 内重定向限制严格，且用户体验更好。登录完成后回调 URL 使用 `top-level` 跳转回 iframe 内。
4. **OAuth 授权确认** — ✅ 已确认：**自动免确认**。用户在 A 站已登录时，直接签发 code 跳回 B 站，不展示"是否授权"页面。
5. **用户信息变更同步** — ✅ 已确认：**每次 SSO 登录时按需同步更新**。从 Provider 站拉取最新 `display_name`、`email`、`avatar_url`，更新到 Consumer 站本地用户记录。

---

## 9. 开发计划

### 9.1 开发顺序

按依赖关系和验证性排序，先实现核心链路，再补全反向链路：

```
阶段 1: B 站 Provider 端点 → 验证 A→B SSO 可行
阶段 2: A 站 Provider 端点 + A 站 Consumer → B→A SSO 反向链路
阶段 3: 用户同步 + 信息更新
阶段 4: 安全校验 + 边界处理 + 联调测试
```

### 9.2 详细任务分配

#### Sprint 1：B 站（New API）OAuth Provider + Consumer（A→B）

| 编号 | 任务 | 改动范围 | 预估 | 优先级 |
|------|------|----------|------|--------|
| B-P-1 | 新增 `/oauth/authorize` 端点 | `router/` + `controller/oauth_provider.go` | 2h | P0 |
| B-P-2 | 新增 `/oauth/token` 端点 | `controller/oauth_provider.go` | 1.5h | P0 |
| B-P-3 | 新增 `/oauth/userinfo` 端点 | `controller/oauth_provider.go` | 1h | P0 |
| B-P-4 | 新增 OAuth Client 管理（Client ID/Secret 存储） | `model/oauth_client.go` + 管理后台 UI | 2h | P0 |
| B-C-1 | SSO 登录入口 `/sso/dujiao` | `router/` + `controller/sso.go` | 1.5h | P0 |
| B-C-2 | SSO 回调 `/sso/dujiao/callback` | `controller/sso.go` | 2h | P0 |
| B-C-3 | 用户创建/绑定逻辑（email 匹配 + 后缀区分） | `controller/sso.go` + `model/user.go` | 2h | P0 |
| B-C-4 | 管理后台配置 Custom OAuth Provider UI | `web/default/src/features/system-settings/` | 1h | P1 |
| B-SEC-1 | state 参数 CSRF 校验 | `controller/sso.go` | 0.5h | P0 |
| B-SEC-2 | Code 一次性使用 + Redis 存储 | `controller/oauth_provider.go` | 1h | P0 |
| B-SEC-3 | Redirect URI 白名单校验 | `controller/oauth_provider.go` | 0.5h | P0 |
| B-SEC-4 | Session Cookie SameSite=None; Secure | `middleware/` | 0.5h | P0 |
| B-I18N | SSO 相关 i18n 翻译 | `web/default/src/i18n/locales/` | 0.5h | P1 |
| | **Sprint 1 小计** | | **16h** | |

#### Sprint 2：A 站（Dujiao）OAuth Provider + Consumer（B→A）

| 编号 | 任务 | 改动范围 | 预估 | 优先级 |
|------|------|----------|------|--------|
| A-P-1 | 新增 `/oauth/authorize` 端点 | `server.js` 或新增路由文件 | 2h | P0 |
| A-P-2 | 新增 `/oauth/token` 端点 | 同上 | 1.5h | P0 |
| A-P-3 | 新增 `/oauth/userinfo` 端点 | 同上 | 1h | P0 |
| A-P-4 | OAuth Client 管理（配置文件方式） | `config/config.yml` | 1h | P0 |
| A-C-1 | SSO 登录入口 `/sso/newapi` | 新增路由 + JWT 签发 | 2h | P0 |
| A-C-2 | SSO 回调 `/sso/newapi/callback` | 新增路由 + 用户查找/创建 | 2h | P0 |
| A-C-3 | 用户创建/绑定逻辑 | 数据库操作 | 1.5h | P0 |
| A-UI-1 | 导航栏新增 B 站入口按钮 | 前端模板 | 1h | P1 |
| A-SEC-1 | state 参数 CSRF 校验 | 同上 | 0.5h | P0 |
| A-SEC-2 | Code 一次性使用 + Redis 存储 | 同上 | 1h | P0 |
| A-SEC-3 | CORS 配置 | nginx / API 中间件 | 0.5h | P0 |
| | **Sprint 2 小计** | | **14h** | |

#### Sprint 3：用户同步 + 信息更新 + 边界处理

| 编号 | 任务 | 改动范围 | 预估 | 优先级 |
|------|------|----------|------|--------|
| SYNC-1 | SSO 登录时同步 display_name、email | 双端 controller | 2h | P0 |
| SYNC-2 | 用户名冲突自动加后缀逻辑 | 双端 | 1h | P0 |
| SYNC-3 | 新用户默认额度取 B 站系统设置 | B 端 `model/user.go` | 0.5h | P0 |
| EDGE-1 | 已占用用户名 + 不同 email → 加后缀 | 双端 | 1h | P1 |
| EDGE-2 | 已占用用户名 + 相同 email → 自动绑定 | 双端 | 1h | P0 |
| EDGE-3 | 用户在 B 站禁用时不允许 SSO 登录 | B 端 | 0.5h | P0 |
| EDGE-4 | OAuth Code 过期处理 + 错误提示 | 双端 | 1h | P1 |
| LOG-1 | SSO 登录日志记录 | 双端 | 1h | P1 |
| | **Sprint 3 小计** | | **8h** | |

#### Sprint 4：联调测试 + 文档

| 编号 | 任务 | 预估 | 优先级 |
|------|------|------|--------|
| TEST-1 | A→B SSO 完整流程测试 | 2h | P0 |
| TEST-2 | B→A SSO 完整流程测试 | 2h | P0 |
| TEST-3 | 用户名冲突场景测试 | 1h | P0 |
| TEST-4 | 邮箱匹配绑定测试 | 1h | P0 |
| TEST-5 | 信息同步验证 | 1h | P1 |
| TEST-6 | 安全测试（CSRF、Code 重放、非法 redirect_uri） | 2h | P0 |
| TEST-7 | iframe 嵌入 + SSO 登录全流程 E2E | 2h | P0 |
| DOC-1 | 部署文档 + 配置说明 | 2h | P1 |
| | **Sprint 4 小计** | **14h** | |

### 9.3 总工时

| Sprint | 内容 | 工时 |
|--------|------|------|
| Sprint 1 | B 站 Provider + Consumer（A→B） | 16h |
| Sprint 2 | A 站 Provider + Consumer（B→A） | 14h |
| Sprint 3 | 用户同步 + 边界处理 | 8h |
| Sprint 4 | 联调测试 + 文档 | 14h |
| **总计** | | **52h（约 6.5 个工作日）** |

### 9.4 里程碑

| 里程碑 | 目标 | 预计完成 |
|--------|------|----------|
| M1 | B 站 OAuth Provider 端点就绪，可用 Postman 手动测试 A→B 流程 | Sprint 1 结束 |
| M2 | A→B SSO 端到端可用（iframe 嵌入 + 自动登录） | Sprint 1 结束 |
| M3 | B→A SSO 端到端可用 | Sprint 2 结束 |
| M4 | 用户同步 + 冲突处理完成 | Sprint 3 结束 |
| M5 | 全流程联调通过，生产就绪 | Sprint 4 结束 |