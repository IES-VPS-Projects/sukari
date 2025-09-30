"use client"

import { GenericApplicationTab } from './GenericApplicationTab'
import { stakeholderApplications } from './constants'
import { SharedProps } from './types'

interface ExporterTabProps extends Pick<SharedProps, 'formData' | 'handleInputChange' | 'isDraftSaved' | 'isSubmitted' | 'handleSubmit' | 'handleSaveDraft' | 'expandedApplication' | 'setExpandedApplication'> {}

export function ExporterTab(props: ExporterTabProps) {
  return (
    <GenericApplicationTab
      applications={stakeholderApplications['Sugar Exporter'] || []}
      {...props}
    />
  )
}