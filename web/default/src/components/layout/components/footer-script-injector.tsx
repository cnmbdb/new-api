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
import { useEffect } from 'react'
import { useSystemConfig } from '@/hooks/use-system-config'

const executedFooterScripts = new Set<string>()

function getScriptSignature(script: HTMLScriptElement): string {
  const src = script.getAttribute('src') || ''
  const text = script.textContent || ''
  return `${src}\n${text}`
}

function copyScriptAttributes(
  source: HTMLScriptElement,
  target: HTMLScriptElement
) {
  Array.from(source.attributes).forEach((attr) => {
    target.setAttribute(attr.name, attr.value)
  })
}

function executeFooterScripts(footerHtml: string) {
  const template = document.createElement('template')
  template.innerHTML = footerHtml

  const scripts = Array.from(template.content.querySelectorAll('script'))
  scripts.forEach((script) => {
    const signature = getScriptSignature(script)
    if (!signature.trim() || executedFooterScripts.has(signature)) {
      return
    }

    const executableScript = document.createElement('script')
    copyScriptAttributes(script, executableScript)

    if (!script.src) {
      executableScript.text = script.textContent || ''
    }

    executableScript.dataset.footerScript = 'true'
    document.head.appendChild(executableScript)
    executedFooterScripts.add(signature)
  })
}

export function FooterScriptInjector() {
  const { footerHtml } = useSystemConfig()

  useEffect(() => {
    if (!footerHtml) return
    executeFooterScripts(footerHtml)
  }, [footerHtml])

  return null
}
