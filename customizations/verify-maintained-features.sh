#!/bin/sh
set -eu

require_file() {
  if [ ! -f "$1" ]; then
    echo "Required maintained feature file is missing: $1" >&2
    exit 1
  fi
}

require_text() {
  file=$1
  expected=$2
  if ! grep -Fq "${expected}" "${file}"; then
    echo "Required maintained feature marker is missing from ${file}: ${expected}" >&2
    exit 1
  fi
}

require_file web/src/components/layout/components/footer-script-injector.tsx
require_text web/src/routes/__root.tsx 'FooterScriptInjector'
require_text web/src/components/layout/components/footer-script-injector.tsx "script.dataset.footerScript = 'true'"

require_file web/src/features/docs/index.tsx
require_file web/src/routes/docs/index.tsx
require_text web/src/routes/docs/index.tsx "createFileRoute('/docs/')"

require_text web/src/components/layout/components/header.tsx "'liquid-nav sticky"
require_text web/src/styles/index.css '.liquid-nav {'

require_text web/src/features/wallet/components/recharge-form-card.tsx '${formatNumber(displayValue)}'

require_file common/email_resend.go
require_file common/email_resend_test.go
require_text common/email.go 'trySendEmailWithResend(subject, receiver, content)'
require_text common/email_resend.go 'RESEND_API_KEY'
require_text common/email_resend.go 'RESEND_FROM'
require_text common/email_resend.go 'https://api.resend.com/emails'

require_file common/email_template.go
require_file common/email_template_test.go
require_text common/email.go 'content = buildBrandedEmailHTML(subject, content)'
require_text common/email_template.go 'data-new-api-email-card="true"'
require_text common/email_template.go 'EMAIL_SITE_URL'
require_text common/email_template.go '前往网站'
require_text common/email_resend.go 'RESEND_TEMPLATE_ID'
require_text common/email_resend.go 'resendTemplateRequest'

require_file web/public/contact-wechat.jpg
require_file web/src/features/chat/index.tsx
require_file web/src/features/chat/__tests__/layout.test.tsx
require_file web/src/routes/chat/index.tsx
require_text web/src/routes/chat/index.tsx "createFileRoute('/chat/')"
require_text web/src/features/chat/index.tsx '<PublicLayout showMainContainer={false}>'
require_text web/src/features/chat/index.tsx '<Footer />'
require_text web/src/features/chat/index.tsx "src='/contact-wechat.jpg'"

echo "Maintained custom feature patches are present"
