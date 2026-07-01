/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import {
  AlertTriangle,
  BookOpen,
  Bot,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileCode2,
  KeyRound,
  Monitor,
  Settings2,
  Terminal,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { PublicLayout } from '@/components/layout'
import { cn } from '@/lib/utils'

const SERVICE_URL = 'https://token.macosabc.com'
const CODEX_BASE_URL = `${SERVICE_URL}/v1`

type DocSection = {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  headings?: string[]
}

const sections: DocSection[] = [
  {
    id: 'home',
    title: '首页',
    description: '平台入口、API 密钥和统一地址',
    icon: BookOpen,
    headings: ['适用范围', '快速入口'],
  },
  {
    id: 'quick-start',
    title: '快速开始',
    description: '创建密钥并选择客户端',
    icon: CheckCircle2,
    headings: ['准备账户', '创建 API Key', '选择配置方式'],
  },
  {
    id: 'guide-entry',
    title: '指南入口',
    description: '按客户端进入对应配置',
    icon: FileCode2,
    headings: ['客户端列表'],
  },
  {
    id: 'unified-config',
    title: '统一配置口径',
    description: '不同客户端的 Base URL 写法',
    icon: Settings2,
    headings: ['地址规则', '密钥规则'],
  },
  {
    id: 'claude-code',
    title: 'Claude Code CLI 设置',
    description: '终端内使用 Anthropic 原生协议',
    icon: Terminal,
    headings: ['前置条件', '安装', '配置', '验证配置', '故障排除'],
  },
  {
    id: 'claude-desktop',
    title: 'Claude Desktop 设置',
    description: '桌面端第三方推理接口',
    icon: Monitor,
    headings: ['配置文件位置', '写入配置', '验证'],
  },
  {
    id: 'codex-cli',
    title: 'Codex CLI 设置',
    description: 'config.toml 与 auth.json',
    icon: Terminal,
    headings: ['配置文件', '认证文件', '验证'],
  },
  {
    id: 'codex-desktop',
    title: 'Codex 桌面端设置',
    description: '桌面端 API Key 与用户级配置',
    icon: Monitor,
    headings: ['登录方式', '用户级配置', '验证'],
  },
  {
    id: 'opencode',
    title: 'OpenCode CLI 设置',
    description: 'opencode.json 自定义 provider',
    icon: FileCode2,
    headings: ['配置 provider', '启动测试'],
  },
  {
    id: 'openclaw',
    title: 'OpenClaw 设置',
    description: '官方 custom provider 配置',
    icon: FileCode2,
    headings: ['新建供应商', '参数填写', '保存测试'],
  },
  {
    id: 'hermes',
    title: 'Hermes Agent 设置',
    description: 'Agent 供应商与模型选择器',
    icon: Bot,
    headings: ['供应商配置', '模型选择', '测试消息'],
  },
  {
    id: 'common-links',
    title: '常用链接',
    description: '控制台常用页面',
    icon: ExternalLink,
    headings: ['平台页面'],
  },
  {
    id: 'troubleshooting',
    title: '错误处理',
    description: '401、403、429、500 排查',
    icon: AlertTriangle,
    headings: ['错误码', '排查顺序'],
  },
  {
    id: 'help',
    title: '需要帮助',
    description: '提交问题前准备的信息',
    icon: KeyRound,
    headings: ['提供信息'],
  },
]

const guideRows = [
  ['Claude', 'Claude Code CLI 设置', '终端 Claude Code，通过 Anthropic 兼容接口接入', '#claude-code'],
  ['Claude', 'Claude Desktop 设置', 'Claude Desktop 第三方推理配置', '#claude-desktop'],
  ['Codex', 'Codex CLI 设置', '使用 config.toml 与独立 auth.json', '#codex-cli'],
  ['Codex', 'Codex 桌面端设置', '桌面端 API Key 和用户级 config.toml', '#codex-desktop'],
  ['Agent / CLI', 'OpenCode CLI 设置', 'opencode.json 自定义 provider', '#opencode'],
  ['Agent / CLI', 'OpenClaw 设置', '官方 custom provider', '#openclaw'],
  ['Agent / Bot', 'Hermes Agent 设置', '平台 provider 与消息平台模型选择器', '#hermes'],
  ['排查', '错误处理', '401、403、429、500 常见错误', '#troubleshooting'],
] as const

const commonLinks = [
  ['平台首页', SERVICE_URL],
  ['注册 / 登录', `${SERVICE_URL}/register`],
  ['API 密钥', `${SERVICE_URL}/console/token`],
  ['模型广场', `${SERVICE_URL}/pricing`],
  ['钱包 / 充值', `${SERVICE_URL}/wallet`],
  ['用量日志', `${SERVICE_URL}/usage-logs/common`],
]

function SectionTitle({ section }: { section: DocSection }) {
  const Icon = section.icon

  return (
    <div className='mb-6 scroll-mt-24'>
      <div className='mb-3 flex items-center gap-3'>
        <span className='border-border bg-muted flex h-9 w-9 items-center justify-center rounded-md border'>
          <Icon className='text-foreground h-4 w-4' />
        </span>
        <div>
          <h2 className='text-foreground text-2xl font-semibold tracking-normal'>
            {section.title}
          </h2>
          <p className='text-muted-foreground mt-1 text-sm'>
            {section.description}
          </p>
        </div>
      </div>
    </div>
  )
}

function Section({
  id,
  children,
  className,
}: {
  id: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={cn(
        'border-border scroll-mt-20 border-b py-10 last:border-b-0',
        className
      )}
    >
      {children}
    </section>
  )
}

function CodeBlock({
  language,
  children,
}: {
  language: string
  children: string
}) {
  return (
    <div className='border-border bg-muted/60 my-4 overflow-hidden rounded-md border'>
      <div className='border-border text-muted-foreground flex h-9 items-center justify-between border-b px-4 text-xs'>
        <span>{language}</span>
        <span>配置示例</span>
      </div>
      <pre className='overflow-x-auto p-4 text-sm leading-6'>
        <code>{children.trim()}</code>
      </pre>
    </div>
  )
}

function DocLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className='text-primary inline-flex items-center gap-1 font-medium hover:underline'
    >
      {children}
      {href.startsWith('http') && <ExternalLink className='h-3.5 w-3.5' />}
    </a>
  )
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className='text-muted-foreground my-4 space-y-2 pl-5 text-sm leading-7'>
      {items.map((item, index) => (
        <li key={index} className='list-disc'>
          {item}
        </li>
      ))}
    </ul>
  )
}

export function Docs() {
  return (
    <PublicLayout showMainContainer={false}>
      <div className='bg-background min-h-[calc(100vh-3.5rem)]'>
        <div className='mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-6 px-4 py-6 md:px-6 lg:grid-cols-[220px_minmax(0,1fr)_240px] xl:grid-cols-[240px_minmax(0,1fr)_260px]'>
          <aside className='hidden lg:block'>
            <nav className='sticky top-20 space-y-1'>
              <p className='text-muted-foreground mb-3 px-3 text-xs font-medium'>
                文档导航
              </p>
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className='text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors'
                  >
                    <Icon className='h-4 w-4 shrink-0' />
                    <span className='truncate'>{section.title}</span>
                  </a>
                )
              })}
            </nav>
          </aside>

          <main className='min-w-0'>
            <div className='lg:hidden'>
              <div className='border-border bg-muted/40 mb-6 flex gap-2 overflow-x-auto rounded-md border p-2'>
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className='bg-background text-foreground border-border inline-flex shrink-0 items-center rounded-md border px-3 py-2 text-sm'
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </div>

            <article className='mx-auto max-w-4xl'>
              <header className='border-border border-b pb-8 pt-4'>
                <Badge variant='secondary' className='mb-4'>
                  token.macosabc.com 使用手册
                </Badge>
                <h1 className='text-foreground text-4xl font-semibold tracking-normal md:text-5xl'>
                  指南
                </h1>
                <p className='text-muted-foreground mt-4 max-w-2xl text-base leading-7'>
                  本文档整理常用客户端接入方式。所有示例都使用
                  <span className='text-foreground font-medium'>
                    {' '}
                    {SERVICE_URL}
                  </span>
                  ，Codex 系列按 OpenAI Responses 协议使用
                  <span className='text-foreground font-medium'>
                    {' '}
                    {CODEX_BASE_URL}
                  </span>
                  。
                </p>
              </header>

              <Section id='home'>
                <SectionTitle section={sections[0]} />
                <h3 className='text-lg font-semibold'>适用范围</h3>
                <p className='text-muted-foreground mt-3 text-sm leading-7'>
                  这份手册面向 Claude Code、Claude Desktop、Codex CLI、Codex
                  桌面端、OpenCode、OpenClaw、Hermes Agent 等客户端。配置目标是让这些工具统一通过
                  {` ${SERVICE_URL} `}调用模型。
                </p>
                <h3 className='mt-8 text-lg font-semibold'>快速入口</h3>
                <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                  {commonLinks.slice(0, 4).map(([label, href]) => (
                    <a
                      key={href}
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='border-border hover:bg-muted/50 flex items-center justify-between rounded-md border p-4 text-sm transition-colors'
                    >
                      <span className='font-medium'>{label}</span>
                      <ExternalLink className='text-muted-foreground h-4 w-4' />
                    </a>
                  ))}
                </div>
              </Section>

              <Section id='quick-start'>
                <SectionTitle section={sections[1]} />
                <h3 className='text-lg font-semibold'>准备账户</h3>
                <BulletList
                  items={[
                    <>
                      打开 <DocLink href={`${SERVICE_URL}/register`}>注册页面</DocLink>
                      ，完成账号创建或登录。
                    </>,
                    <>
                      进入 <DocLink href={`${SERVICE_URL}/console/token`}>API 密钥</DocLink>
                      页面，创建一个用于客户端的密钥。
                    </>,
                    '复制密钥后妥善保存，后续配置中统一使用该密钥作为 API Key 或 Auth Token。',
                  ]}
                />
                <h3 className='mt-8 text-lg font-semibold'>选择配置方式</h3>
                <p className='text-muted-foreground mt-3 text-sm leading-7'>
                  Claude 系列使用 Anthropic 原生地址，不带
                  <code className='mx-1 rounded bg-muted px-1 py-0.5'>/v1</code>
                  。Codex 系列使用 OpenAI Responses 地址，需要带
                  <code className='mx-1 rounded bg-muted px-1 py-0.5'>/v1</code>
                  。Agent 类工具按各自 provider 配置填写。
                </p>
              </Section>

              <Section id='guide-entry'>
                <SectionTitle section={sections[2]} />
                <div className='border-border overflow-hidden rounded-md border'>
                  <div className='bg-muted/60 grid grid-cols-[120px_180px_minmax(0,1fr)] gap-3 px-4 py-3 text-xs font-medium text-muted-foreground'>
                    <span>类型</span>
                    <span>文档</span>
                    <span>说明</span>
                  </div>
                  {guideRows.map(([type, title, desc, href]) => (
                    <a
                      key={title}
                      href={href}
                      className='border-border hover:bg-muted/40 grid grid-cols-1 gap-1 border-t px-4 py-4 text-sm transition-colors sm:grid-cols-[120px_180px_minmax(0,1fr)] sm:gap-3'
                    >
                      <span className='text-muted-foreground'>{type}</span>
                      <span className='font-medium'>{title}</span>
                      <span className='text-muted-foreground flex items-center justify-between gap-3'>
                        {desc}
                        <ChevronRight className='hidden h-4 w-4 shrink-0 sm:block' />
                      </span>
                    </a>
                  ))}
                </div>
              </Section>

              <Section id='unified-config'>
                <SectionTitle section={sections[3]} />
                <h3 className='text-lg font-semibold'>地址规则</h3>
                <BulletList
                  items={[
                    <>
                      Codex CLI / Codex 桌面端：
                      <code className='mx-1 rounded bg-muted px-1 py-0.5'>
                        {CODEX_BASE_URL}
                      </code>
                      ，协议选择 Responses。
                    </>,
                    <>
                      Claude Code / Claude Desktop：
                      <code className='mx-1 rounded bg-muted px-1 py-0.5'>
                        {SERVICE_URL}
                      </code>
                      ，不要追加
                      <code className='mx-1 rounded bg-muted px-1 py-0.5'>/v1</code>
                      。
                    </>,
                    <>
                      OpenCode / OpenClaw / Hermes Agent：按各自配置文件写入
                      <code className='mx-1 rounded bg-muted px-1 py-0.5'>
                        {SERVICE_URL}
                      </code>
                      供应商。
                    </>,
                  ]}
                />
                <h3 className='mt-8 text-lg font-semibold'>密钥规则</h3>
                <p className='text-muted-foreground mt-3 text-sm leading-7'>
                  所有客户端都使用平台 API 密钥。示例中的
                  <code className='mx-1 rounded bg-muted px-1 py-0.5'>
                    sk-your-token-key
                  </code>
                  需要替换成你自己的密钥。
                </p>
              </Section>

              <Section id='claude-code'>
                <SectionTitle section={sections[4]} />
                <p className='text-muted-foreground text-sm leading-7'>
                  Claude Code 是 Anthropic 的官方命令行工具，可以把 AI 助手带到终端和代码编辑器中。完成配置后，你可以通过熟悉的 Claude Code 界面访问平台模型。
                </p>
                <h3 className='mt-8 text-lg font-semibold'>前置条件</h3>
                <BulletList
                  items={[
                    <>
                      一个平台账户：
                      <DocLink href={`${SERVICE_URL}/register`}>在此注册</DocLink>
                    </>,
                    <>
                      一个 API 密钥：
                      <DocLink href={`${SERVICE_URL}/console/token`}>获取密钥</DocLink>
                    </>,
                    '计算机上的终端或命令提示符访问权限。',
                  ]}
                />
                <h3 className='mt-8 text-lg font-semibold'>安装</h3>
                <p className='text-muted-foreground mt-3 text-sm leading-7'>
                  macOS 和 Linux 打开终端运行：
                </p>
                <CodeBlock language='Bash'>
                  {`curl -fsSL https://claude.ai/install.sh | sh
claude --version`}
                </CodeBlock>
                <p className='text-muted-foreground mt-3 text-sm leading-7'>
                  Windows 以管理员身份打开 PowerShell：
                </p>
                <CodeBlock language='PowerShell'>
                  {`irm https://claude.ai/install.ps1 | iex
claude --version`}
                </CodeBlock>
                <h3 className='mt-8 text-lg font-semibold'>配置</h3>
                <p className='text-muted-foreground mt-3 text-sm leading-7'>
                  Claude Code 需要两个环境变量：
                  <code className='mx-1 rounded bg-muted px-1 py-0.5'>
                    ANTHROPIC_AUTH_TOKEN
                  </code>
                  和
                  <code className='mx-1 rounded bg-muted px-1 py-0.5'>
                    ANTHROPIC_BASE_URL
                  </code>
                  。
                </p>
                <CodeBlock language='Bash'>
                  {`export ANTHROPIC_AUTH_TOKEN="sk-your-token-key"
export ANTHROPIC_BASE_URL="${SERVICE_URL}"
source ~/.zshrc  # 或 source ~/.bashrc`}
                </CodeBlock>
                <CodeBlock language='PowerShell'>
                  {`[System.Environment]::SetEnvironmentVariable('ANTHROPIC_AUTH_TOKEN', 'sk-your-token-key', 'User')
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_BASE_URL', '${SERVICE_URL}', 'User')`}
                </CodeBlock>
                <h3 className='mt-8 text-lg font-semibold'>使用 CC Switch</h3>
                <BulletList
                  items={[
                    '运行 CC Switch 打开配置界面。',
                    '关闭顶部的 Live 代理开关，避免请求走 CC Switch 自己的代理。',
                    `添加新供应商，供应商名称填写 token.macosabc.com，官网链接和请求地址填写 ${SERVICE_URL}。`,
                    'API 格式选择 Anthropic Messages (原生)，保存后切换到该供应商。',
                  ]}
                />
                <h3 className='mt-8 text-lg font-semibold'>验证配置</h3>
                <CodeBlock language='Bash'>
                  {`claude /status
claude "Hi"
echo $ANTHROPIC_BASE_URL
echo $ANTHROPIC_AUTH_TOKEN`}
                </CodeBlock>
                <h3 className='mt-8 text-lg font-semibold'>故障排除</h3>
                <BulletList
                  items={[
                    <>
                      “无效的 API 密钥”：检查
                      <DocLink href={`${SERVICE_URL}/console/token`}>控制台 API 密钥</DocLink>
                      是否复制完整。
                    </>,
                    `“连接被拒绝”：确认网络可以访问 ${SERVICE_URL}，并允许出站 HTTPS。`,
                    `确认 ANTHROPIC_BASE_URL 设置为 ${SERVICE_URL}，不要带 /v1。`,
                    '找不到 Claude Code：检查 PATH，macOS/Linux 可加入 export PATH="$HOME/.claude/bin:$PATH"。',
                  ]}
                />
              </Section>

              <Section id='claude-desktop'>
                <SectionTitle section={sections[5]} />
                <h3 className='text-lg font-semibold'>配置文件位置</h3>
                <BulletList
                  items={[
                    'macOS：~/Library/Application Support/Claude/claude_desktop_config.json',
                    'Windows：%APPDATA%\\Claude\\claude_desktop_config.json',
                    'Linux：~/.config/Claude/claude_desktop_config.json',
                  ]}
                />
                <h3 className='mt-8 text-lg font-semibold'>写入配置</h3>
                <p className='text-muted-foreground mt-3 text-sm leading-7'>
                  Claude Desktop 接入第三方推理时，Base URL 使用
                  <code className='mx-1 rounded bg-muted px-1 py-0.5'>
                    {SERVICE_URL}
                  </code>
                  ，不要带
                  <code className='mx-1 rounded bg-muted px-1 py-0.5'>/v1</code>
                  。
                </p>
                <CodeBlock language='JSON'>
                  {`{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-your-token-key",
    "ANTHROPIC_BASE_URL": "${SERVICE_URL}"
  }
}`}
                </CodeBlock>
                <h3 className='mt-8 text-lg font-semibold'>验证</h3>
                <BulletList
                  items={[
                    '保存配置后完全退出 Claude Desktop，再重新打开。',
                    '发送一条简单消息确认模型可正常响应。',
                    '如果仍走官方地址，检查配置文件路径是否写错或 JSON 是否有多余逗号。',
                  ]}
                />
              </Section>

              <Section id='codex-cli'>
                <SectionTitle section={sections[6]} />
                <h3 className='text-lg font-semibold'>配置文件</h3>
                <p className='text-muted-foreground mt-3 text-sm leading-7'>
                  Codex CLI 使用用户目录下
                  <code className='mx-1 rounded bg-muted px-1 py-0.5'>
                    ~/.codex/config.toml
                  </code>
                  。Base URL 使用
                  <code className='mx-1 rounded bg-muted px-1 py-0.5'>
                    {CODEX_BASE_URL}
                  </code>
                  ，协议选择 Responses。
                </p>
                <CodeBlock language='TOML'>
                  {`model = "gpt-4.1"
model_provider = "token"

[model_providers.token]
name = "token.macosabc.com"
base_url = "${CODEX_BASE_URL}"
wire_api = "responses"
env_key = "OPENAI_API_KEY"`}
                </CodeBlock>
                <h3 className='mt-8 text-lg font-semibold'>认证文件</h3>
                <p className='text-muted-foreground mt-3 text-sm leading-7'>
                  可以使用环境变量，也可以在独立
                  <code className='mx-1 rounded bg-muted px-1 py-0.5'>
                    auth.json
                  </code>
                  中保存密钥。
                </p>
                <CodeBlock language='Bash'>
                  {`export OPENAI_API_KEY="sk-your-token-key"
codex`}
                </CodeBlock>
                <CodeBlock language='JSON'>
                  {`{
  "OPENAI_API_KEY": "sk-your-token-key"
}`}
                </CodeBlock>
                <h3 className='mt-8 text-lg font-semibold'>验证</h3>
                <BulletList
                  items={[
                    '重启终端后运行 codex。',
                    `确认请求地址为 ${CODEX_BASE_URL}。`,
                    '如果提示认证失败，优先确认 OPENAI_API_KEY 或 auth.json 中的密钥是否正确。',
                  ]}
                />
              </Section>

              <Section id='codex-desktop'>
                <SectionTitle section={sections[7]} />
                <h3 className='text-lg font-semibold'>登录方式</h3>
                <p className='text-muted-foreground mt-3 text-sm leading-7'>
                  Codex 桌面端可使用 API Key 登录。密钥来自平台 API 密钥页，登录后再确认用户级配置中的 provider 指向平台地址。
                </p>
                <h3 className='mt-8 text-lg font-semibold'>用户级配置</h3>
                <CodeBlock language='TOML'>
                  {`model = "gpt-4.1"
model_provider = "token"

[model_providers.token]
name = "token.macosabc.com"
base_url = "${CODEX_BASE_URL}"
wire_api = "responses"
env_key = "OPENAI_API_KEY"`}
                </CodeBlock>
                <h3 className='mt-8 text-lg font-semibold'>验证</h3>
                <BulletList
                  items={[
                    '重启 Codex 桌面端，避免旧配置缓存继续生效。',
                    '打开任意会话发送测试消息。',
                    '如果桌面端读不到配置，确认配置写在当前系统用户目录，而不是项目目录。',
                  ]}
                />
              </Section>

              <Section id='opencode'>
                <SectionTitle section={sections[8]} />
                <h3 className='text-lg font-semibold'>配置 provider</h3>
                <p className='text-muted-foreground mt-3 text-sm leading-7'>
                  OpenCode CLI 可在
                  <code className='mx-1 rounded bg-muted px-1 py-0.5'>
                    opencode.json
                  </code>
                  中添加自定义 provider。
                </p>
                <CodeBlock language='JSON'>
                  {`{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "token": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "token.macosabc.com",
      "options": {
        "baseURL": "${SERVICE_URL}",
        "apiKey": "sk-your-token-key"
      },
      "models": {
        "gpt-4.1": {}
      }
    }
  }
}`}
                </CodeBlock>
                <h3 className='mt-8 text-lg font-semibold'>启动测试</h3>
                <BulletList
                  items={[
                    '保存 opencode.json。',
                    '启动 OpenCode，选择 token.macosabc.com provider。',
                    '选择模型后发送测试消息。',
                  ]}
                />
              </Section>

              <Section id='openclaw'>
                <SectionTitle section={sections[9]} />
                <h3 className='text-lg font-semibold'>新建供应商</h3>
                <BulletList
                  items={[
                    '打开 OpenClaw 设置页。',
                    '新增 Custom Provider。',
                    `Provider Name 填写 token.macosabc.com，Base URL 填写 ${SERVICE_URL}。`,
                    'API Key 填写平台密钥，保存后选择该供应商。',
                  ]}
                />
                <h3 className='mt-8 text-lg font-semibold'>参数填写</h3>
                <CodeBlock language='Plain Text'>
                  {`Provider Name: token.macosabc.com
Base URL: ${SERVICE_URL}
API Key: sk-your-token-key
Protocol: OpenAI Compatible 或按客户端要求选择自定义兼容协议`}
                </CodeBlock>
                <h3 className='mt-8 text-lg font-semibold'>保存测试</h3>
                <p className='text-muted-foreground mt-3 text-sm leading-7'>
                  保存后在模型列表选择平台模型，发送简单消息测试。若模型列表为空，先在平台模型广场确认模型名称，再手动填入。
                </p>
              </Section>

              <Section id='hermes'>
                <SectionTitle section={sections[10]} />
                <h3 className='text-lg font-semibold'>供应商配置</h3>
                <BulletList
                  items={[
                    '进入 Hermes Agent 的 Provider 或模型供应商设置。',
                    `新增 token.macosabc.com provider，Base URL 填写 ${SERVICE_URL}。`,
                    'API Key 填写平台 API 密钥。',
                  ]}
                />
                <h3 className='mt-8 text-lg font-semibold'>模型选择</h3>
                <p className='text-muted-foreground mt-3 text-sm leading-7'>
                  在消息平台或 Bot 配置中选择刚刚创建的 provider，再选择要使用的模型。需要确认模型名与平台模型广场展示的名称一致。
                </p>
                <h3 className='mt-8 text-lg font-semibold'>测试消息</h3>
                <BulletList
                  items={[
                    '保存 provider 后重启 Agent 或刷新配置。',
                    '发送一条测试消息。',
                    '若没有响应，先查看 Hermes Agent 日志中的 HTTP 状态码，再按错误处理章节排查。',
                  ]}
                />
              </Section>

              <Section id='common-links'>
                <SectionTitle section={sections[11]} />
                <div className='grid gap-3 sm:grid-cols-2'>
                  {commonLinks.map(([label, href]) => (
                    <a
                      key={href}
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='border-border hover:bg-muted/50 flex items-center justify-between rounded-md border p-4 text-sm transition-colors'
                    >
                      <span className='font-medium'>{label}</span>
                      <ExternalLink className='text-muted-foreground h-4 w-4' />
                    </a>
                  ))}
                </div>
              </Section>

              <Section id='troubleshooting'>
                <SectionTitle section={sections[12]} />
                <div className='border-border overflow-hidden rounded-md border'>
                  {[
                    ['401', '密钥无效、密钥未填写、环境变量未生效', '重新复制 API Key，确认客户端读取的是同一个配置文件。'],
                    ['403', '账号或模型无权限', '检查账户状态、模型权限、分组与余额限制。'],
                    ['429', '请求过快或额度限制', '降低并发，稍后重试，检查当前模型额度。'],
                    ['500', '上游或平台服务异常', '保留请求时间、模型名、错误详情，稍后重试或联系支持。'],
                  ].map(([code, reason, action]) => (
                    <div
                      key={code}
                      className='border-border grid grid-cols-1 gap-2 border-t px-4 py-4 first:border-t-0 sm:grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)]'
                    >
                      <Badge variant='outline' className='w-fit'>
                        {code}
                      </Badge>
                      <span className='text-sm'>{reason}</span>
                      <span className='text-muted-foreground text-sm'>
                        {action}
                      </span>
                    </div>
                  ))}
                </div>
                <h3 className='mt-8 text-lg font-semibold'>排查顺序</h3>
                <BulletList
                  items={[
                    '先确认客户端 Base URL 是否按类型填写正确。',
                    '再确认 API Key 是否完整、未多空格、未复制到错误账号。',
                    '查看客户端日志中的 HTTP 状态码和返回体。',
                    '最后再切换模型或联系支持。',
                  ]}
                />
              </Section>

              <Section id='help'>
                <SectionTitle section={sections[13]} />
                <p className='text-muted-foreground text-sm leading-7'>
                  联系支持前，请尽量提供客户端名称、模型名、请求时间、HTTP
                  状态码、错误提示截图或日志片段。不要在公开渠道发送完整 API Key。
                </p>
              </Section>
            </article>
          </main>

          <aside className='hidden lg:block'>
            <div className='sticky top-20'>
              <p className='text-muted-foreground mb-3 px-3 text-xs font-medium'>
                本页标题
              </p>
              <div className='border-border space-y-1 border-l pl-3'>
                {sections.map((section) => (
                  <div key={section.id} className='py-1'>
                    <a
                      href={`#${section.id}`}
                      className='text-foreground block text-sm font-medium hover:text-primary'
                    >
                      {section.title}
                    </a>
                    {section.headings?.map((heading) => (
                      <p
                        key={`${section.id}-${heading}`}
                        className='text-muted-foreground mt-1 truncate pl-3 text-xs'
                      >
                        {heading}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PublicLayout>
  )
}
