export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-100 text-green-800'
    case 'Under Review':
      return 'bg-yellow-100 text-yellow-800'
    case 'Pending':
      return 'bg-blue-100 text-blue-800'
    case 'Rejected':
      return 'bg-red-100 text-red-800'
    case 'approved':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'in-review':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved':
      return 'CheckCircle'
    case 'pending':
      return 'Clock'
    case 'in-review':
      return 'AlertCircle'
    default:
      return 'FileText'
  }
}

// Auto-generate document details when category is selected
export const generateDocumentDetails = (category: string) => {
  const today = new Date()
  const currentYear = today.getFullYear()

  // Document No is fixed as per requirements
  const documentNo = 'KSB/APP/002'

  // Document Date is today
  const documentDate = today.toISOString().split('T')[0]

  // Financial Year: July 1st to June 30th
  // If we're before July 1st, we're in the previous financial year
  const isBeforeJuly = today.getMonth() < 6 // 0-based, so 6 = July
  const financialYearStart = isBeforeJuly ? currentYear - 1 : currentYear
  const financialYearEnd = financialYearStart + 1
  const financialYear = `${financialYearStart}/${financialYearEnd}`

  // Expiry Date is always June 30th of the financial year end
  const expiryDate = `30th June ${financialYearEnd}`

  return {
    category,
    documentNo,
    documentDate,
    financialYear,
    expiryDate
  }
}