"use client"

import { GenericApplicationTab } from './GenericApplicationTab'
import { stakeholderApplications } from './constants'
import { SharedProps } from './types'

interface MolassesDealerTabProps extends Pick<SharedProps, 'formData' | 'handleInputChange' | 'isDraftSaved' | 'isSubmitted' | 'handleSubmit' | 'handleSaveDraft' | 'expandedApplication' | 'setExpandedApplication'> {}

export function MolassesDealerTab(props: MolassesDealerTabProps) {
  return (
    <GenericApplicationTab
      applications={stakeholderApplications['Molasses Dealer'] || []}
      {...props}
    />
  )
}