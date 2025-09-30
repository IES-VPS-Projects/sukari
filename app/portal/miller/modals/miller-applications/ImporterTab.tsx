"use client"

import { GenericApplicationTab } from './GenericApplicationTab'
import { stakeholderApplications } from './constants'
import { SharedProps } from './types'

interface ImporterTabProps extends Pick<SharedProps, 'formData' | 'handleInputChange' | 'isDraftSaved' | 'isSubmitted' | 'handleSubmit' | 'handleSaveDraft' | 'expandedApplication' | 'setExpandedApplication'> {}

export function ImporterTab(props: ImporterTabProps) {
  return (
    <GenericApplicationTab
      applications={stakeholderApplications['Sugar Importer'] || []}
      {...props}
    />
  )
}