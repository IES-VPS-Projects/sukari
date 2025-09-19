"use client"

import { useState, useEffect, useCallback } from 'react'
import { pdfParserService, ParsedPDFContent, ResourceDocument } from '@/lib/pdf-parser-service'

interface UsePDFParserOptions {
  autoLoad?: boolean
  fallbackContent?: Partial<ResourceDocument>
}

interface UsePDFParserResult {
  parsedDocuments: ResourceDocument[]
  loading: boolean
  error: string | null
  parseDocument: (filePath: string, type: ResourceDocument['type'], fallbackContent?: Partial<ResourceDocument>) => Promise<void>
  parseMultipleDocuments: (files: Array<{ path: string; type: ResourceDocument['type']; fallbackContent?: Partial<ResourceDocument> }>) => Promise<void>
  searchDocuments: (query: string) => ResourceDocument[]
  getDocumentsByType: (type: string) => ResourceDocument[]
  getDocumentsByCategory: (category: string) => ResourceDocument[]
  clearDocuments: () => void
}

export const usePDFParser = (options: UsePDFParserOptions = {}): UsePDFParserResult => {
  const [parsedDocuments, setParsedDocuments] = useState<ResourceDocument[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const parseDocument = useCallback(async (
    filePath: string, 
    type: ResourceDocument['type'],
    fallbackContent?: Partial<ResourceDocument>
  ) => {
    setLoading(true)
    setError(null)
    
    try {
      const resource = await pdfParserService.createResourceFromFile(
        filePath, 
        type, 
        fallbackContent || options.fallbackContent
      )
      
      setParsedDocuments(prev => {
        // Avoid duplicates
        const existing = prev.find(doc => doc.filePath === filePath)
        if (existing) {
          return prev.map(doc => doc.filePath === filePath ? resource : doc)
        }
        return [...prev, resource]
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to parse PDF'
      setError(errorMessage)
      console.error('PDF parsing error:', err)
    } finally {
      setLoading(false)
    }
  }, [options.fallbackContent])

  const parseMultipleDocuments = useCallback(async (
    files: Array<{ path: string; type: ResourceDocument['type']; fallbackContent?: Partial<ResourceDocument> }>
  ) => {
    setLoading(true)
    setError(null)
    
    try {
      const results = await Promise.allSettled(
        files.map(file => 
          pdfParserService.createResourceFromFile(
            file.path, 
            file.type, 
            file.fallbackContent || options.fallbackContent
          )
        )
      )
      
      const successfulResults = results
        .filter((result): result is PromiseFulfilledResult<ResourceDocument> => 
          result.status === 'fulfilled'
        )
        .map(result => result.value)
      
      const errors = results
        .filter((result): result is PromiseRejectedResult => 
          result.status === 'rejected'
        )
        .map(result => result.reason)
      
      if (errors.length > 0) {
        console.warn('Some PDFs failed to parse:', errors)
        setError(`Failed to parse ${errors.length} out of ${files.length} documents`)
      }
      
      setParsedDocuments(prev => {
        const newDocs = successfulResults.filter(newDoc => 
          !prev.some(existingDoc => existingDoc.filePath === newDoc.filePath)
        )
        return [...prev, ...newDocs]
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to parse PDFs'
      setError(errorMessage)
      console.error('Multiple PDF parsing error:', err)
    } finally {
      setLoading(false)
    }
  }, [options.fallbackContent])

  const searchDocuments = useCallback((query: string): ResourceDocument[] => {
    return pdfParserService.searchDocuments(parsedDocuments, query)
  }, [parsedDocuments])

  const getDocumentsByType = useCallback((type: string): ResourceDocument[] => {
    return pdfParserService.getDocumentsByType(parsedDocuments, type)
  }, [parsedDocuments])

  const getDocumentsByCategory = useCallback((category: string): ResourceDocument[] => {
    return pdfParserService.getDocumentsByCategory(parsedDocuments, category)
  }, [parsedDocuments])

  const clearDocuments = useCallback(() => {
    setParsedDocuments([])
    setError(null)
  }, [])

  return {
    parsedDocuments,
    loading,
    error,
    parseDocument,
    parseMultipleDocuments,
    searchDocuments,
    getDocumentsByType,
    getDocumentsByCategory,
    clearDocuments
  }
}

// Utility hook for loading specific documents on mount
export const usePreloadedDocuments = (
  documents: Array<{ path: string; type: ResourceDocument['type']; fallbackContent?: Partial<ResourceDocument> }>
) => {
  const pdfParser = usePDFParser()
  
  useEffect(() => {
    if (documents.length > 0) {
      pdfParser.parseMultipleDocuments(documents)
    }
  }, []) // Only run on mount
  
  return pdfParser
}

export default usePDFParser
