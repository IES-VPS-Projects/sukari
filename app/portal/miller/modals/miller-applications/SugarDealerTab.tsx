"use client"

import { GenericApplicationTab } from './GenericApplicationTab'
import { stakeholderApplications } from './constants'
import { SharedProps } from './types'

interface SugarDealerTabProps extends Pick<SharedProps, 'formData' | 'handleInputChange' | 'isDraftSaved' | 'isSubmitted' | 'handleSubmit' | 'handleSaveDraft' | 'expandedApplication' | 'setExpandedApplication'> {}

export function SugarDealerTab(props: SugarDealerTabProps) {
  return (
    <GenericApplicationTab
      applications={stakeholderApplications['Sugar Dealer'] || []}
      {...props}
    />
  )
}