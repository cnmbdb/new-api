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

const executedScripts = new Set<string>()

function executeFooterScripts(footerHtml: string) {
  const template = document.createElement('template')
  template.innerHTML = footerHtml

  for (const source of template.content.querySelectorAll('script')) {
    const signature = `${source.getAttribute('src') ?? ''}\n${source.textContent ?? ''}`
    if (!signature.trim() || executedScripts.has(signature)) continue

    const script = document.createElement('script')
    for (const attribute of source.attributes) {
      script.setAttribute(attribute.name, attribute.value)
    }
    if (!source.src) script.text = source.textContent ?? ''
    script.dataset.footerScript = 'true'
    document.head.appendChild(script)
    executedScripts.add(signature)
  }
}

/** Executes scripts configured by a trusted administrator in Footer HTML. */
export function FooterScriptInjector() {
  const { footerHtml } = useSystemConfig()

  useEffect(() => {
    if (footerHtml) executeFooterScripts(footerHtml)
  }, [footerHtml])

  return null
}
