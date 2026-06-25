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
import { useEffect, useId, useMemo, useState } from 'react'
import { ExternalLink, Loader2, RefreshCw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { submitPaymentForm, type EmbeddedPaymentRequest } from '../../lib'

interface EmbeddedPaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  payment: EmbeddedPaymentRequest | null
}

export function EmbeddedPaymentDialog({
  open,
  onOpenChange,
  payment,
}: EmbeddedPaymentDialogProps) {
  const { t } = useTranslation()
  const reactId = useId()
  const frameName = useMemo(
    () => `embedded-payment-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`,
    [reactId]
  )
  const [loading, setLoading] = useState(false)

  const submitToFrame = () => {
    if (!payment) return
    setLoading(true)
    submitPaymentForm(payment.url, payment.params, frameName)
  }

  useEffect(() => {
    if (!open || !payment) return

    const timer = window.setTimeout(submitToFrame, 50)
    return () => window.clearTimeout(timer)
    // frameName is stable for this component instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, payment])

  const openInNewWindow = () => {
    if (!payment) return

    submitPaymentForm(payment.url, payment.params)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='grid h-[min(760px,calc(100dvh-1rem))] max-w-[calc(100vw-1rem)] grid-rows-[auto_minmax(0,1fr)_auto] gap-3 p-3 sm:h-[min(780px,calc(100dvh-2rem))] sm:max-w-2xl sm:p-4 md:max-w-3xl'>
        <DialogHeader className='pr-8'>
          <DialogTitle>{t('Payment')}</DialogTitle>
          <DialogDescription>
            {t('Complete payment in the secure payment page below.')}
          </DialogDescription>
        </DialogHeader>

        <div className='bg-background relative min-h-0 flex-1 overflow-hidden rounded-lg border'>
          {loading && (
            <div className='bg-background/80 absolute inset-x-0 top-0 z-10 flex items-center justify-center gap-2 border-b px-3 py-2 text-xs'>
              <Loader2 className='h-3.5 w-3.5 animate-spin' />
              {t('Loading payment page...')}
            </div>
          )}
          <iframe
            name={frameName}
            title={t('Payment')}
            className='h-full min-h-[520px] w-full border-0'
            onLoad={() => setLoading(false)}
            sandbox='allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox'
          />
        </div>

        <DialogFooter className='grid grid-cols-2 gap-2 sm:flex'>
          <Button
            type='button'
            variant='outline'
            onClick={submitToFrame}
            disabled={!payment}
            className='gap-2'
          >
            <RefreshCw className='h-4 w-4' />
            {t('Reload')}
          </Button>
          <Button
            type='button'
            variant='outline'
            onClick={openInNewWindow}
            disabled={!payment}
            className='gap-2'
          >
            <ExternalLink className='h-4 w-4' />
            {t('Open externally')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
