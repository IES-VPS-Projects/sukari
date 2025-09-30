import { ApplicationType } from './types'

// Application stages for tracking miller applications
export const applicationStages = [
  {
    id: "submission",
    name: "Application Submission",
    description: "Miller submits application with required documents"
  },
  {
    id: "review",
    name: "Initial Review",
    description: "KSB reviews application for completeness"
  },
  {
    id: "inspection",
    name: "Site Inspection",
    description: "Field inspection of miller facilities"
  },
  {
    id: "evaluation",
    name: "Technical Evaluation",
    description: "Technical committee evaluates application"
  },
  {
    id: "approval",
    name: "Board Approval",
    description: "KSB board reviews and approves application"
  },
  {
    id: "issuance",
    name: "Document Issuance",
    description: "License or permit document issued"
  }
]

export const letterPurposes = [
  'Bank Loan Application',
  'Equipment Financing',
  'Working Capital',
  'Infrastructure Development',
  'Export Documentation',
  'Partnership Agreement',
  'Investment Proposal'
]

export const permitTypes = [
  'Air Emission Permit',
  'Water Abstraction Permit'
]

export const licenseTypes = [
  'Sugar Manufacturing License',
  'Food Processing License',
  'Industrial License',
  'Export License',
  'Warehouse License',
  'Quality Assurance License'
]

// Stakeholder applications structure based on Kenya Sugar Board processes
export const stakeholderApplications: Record<string, ApplicationType[]> = {
  'Sugar Miller': [
    {
      id: 'letter-of-comfort',
      name: 'Application for Registration',
      description: 'Apply to register a Mill or Jaggery operation',
      fields: [] // Will be handled with custom form
    },
    {
      id: 'license',
      name: 'License Application',
      description: 'Apply for or renew sugar manufacturing and related licenses',
      fields: [
        { name: 'licenseType', label: 'License Type', type: 'select', options: licenseTypes, required: true },
        { name: 'facilityLocation', label: 'Facility Location', type: 'text', required: true },
        { name: 'productionCapacity', label: 'Production Capacity (MT/Year)', type: 'number', required: true },
        { name: 'startDate', label: 'Requested Start Date', type: 'date', required: true },
        { name: 'endDate', label: 'Requested End Date', type: 'date', required: true },
        { name: 'narrative', label: 'Additional Information', type: 'textarea', required: true }
      ]
    }
  ],
  'Sugar Importer': [
    {
      id: 'permit',
      name: 'Import Permit',
      description: 'Apply for permit to import sugar into Kenya',
      fields: [
        { name: 'importVolume', label: 'Import Volume (MT)', type: 'number', required: true },
        { name: 'sourceCountry', label: 'Source Country', type: 'text', required: true },
        { name: 'sugarType', label: 'Sugar Type', type: 'text', required: true },
        { name: 'importDate', label: 'Expected Import Date', type: 'date', required: true },
        { name: 'narrative', label: 'Purpose and Details', type: 'textarea', required: true }
      ]
    },
    {
      id: 'license',
      name: 'Import License',
      description: 'Apply for or renew sugar import license',
      fields: [
        { name: 'businessLocation', label: 'Business Location', type: 'text', required: true },
        { name: 'storageCapacity', label: 'Storage Capacity (MT)', type: 'number', required: true },
        { name: 'startDate', label: 'License Start Date', type: 'date', required: true },
        { name: 'endDate', label: 'License End Date', type: 'date', required: true },
        { name: 'narrative', label: 'Business Plan and Details', type: 'textarea', required: true }
      ]
    },
    {
      id: 'letter-of-intent',
      name: 'Letter of Intent',
      description: 'Submit letter of intent for sugar import',
      fields: [
        { name: 'importVolume', label: 'Intended Import Volume (MT)', type: 'number', required: true },
        { name: 'importPeriod', label: 'Import Period', type: 'text', required: true },
        { name: 'marketingPlan', label: 'Marketing Plan', type: 'textarea', required: true },
        { name: 'narrative', label: 'Additional Information', type: 'textarea', required: true }
      ]
    }
  ],
  'Sugar Exporter': [
    {
      id: 'permit',
      name: 'Export Permit',
      description: 'Apply for permit to export sugar from Kenya',
      fields: [
        { name: 'exportVolume', label: 'Export Volume (MT)', type: 'number', required: true },
        { name: 'destinationCountry', label: 'Destination Country', type: 'text', required: true },
        { name: 'sugarType', label: 'Sugar Type', type: 'text', required: true },
        { name: 'exportDate', label: 'Expected Export Date', type: 'date', required: true },
        { name: 'narrative', label: 'Export Details', type: 'textarea', required: true }
      ]
    },
    {
      id: 'license',
      name: 'Export License',
      description: 'Apply for or renew sugar export license',
      fields: [
        { name: 'businessLocation', label: 'Business Location', type: 'text', required: true },
        { name: 'exportCapacity', label: 'Export Capacity (MT/Year)', type: 'number', required: true },
        { name: 'startDate', label: 'License Start Date', type: 'date', required: true },
        { name: 'endDate', label: 'License End Date', type: 'date', required: true },
        { name: 'narrative', label: 'Business Plan and Details', type: 'textarea', required: true }
      ]
    }
  ],
  'Sugar Dealer': [
    {
      id: 'license',
      name: 'Dealer License',
      description: 'Apply for or renew sugar dealer license',
      fields: [
        { name: 'businessLocation', label: 'Business Location', type: 'text', required: true },
        { name: 'dealingCapacity', label: 'Dealing Capacity (MT/Month)', type: 'number', required: true },
        { name: 'storageCapacity', label: 'Storage Capacity (MT)', type: 'number', required: true },
        { name: 'startDate', label: 'License Start Date', type: 'date', required: true },
        { name: 'endDate', label: 'License End Date', type: 'date', required: true },
        { name: 'narrative', label: 'Business Details', type: 'textarea', required: true }
      ]
    }
  ],
  'Molasses Dealer': [
    {
      id: 'license',
      name: 'Molasses Dealer License',
      description: 'Apply for or renew molasses dealer license',
      fields: [
        { name: 'businessLocation', label: 'Business Location', type: 'text', required: true },
        { name: 'dealingCapacity', label: 'Dealing Capacity (MT/Month)', type: 'number', required: true },
        { name: 'storageCapacity', label: 'Storage Capacity (MT)', type: 'number', required: true },
        { name: 'startDate', label: 'License Start Date', type: 'date', required: true },
        { name: 'endDate', label: 'License End Date', type: 'date', required: true },
        { name: 'narrative', label: 'Business Details and Molasses Handling Plan', type: 'textarea', required: true }
      ]
    }
  ]
}

// Mock existing applications data
export const existingApplications = [
  {
    id: 'APP-2024-001',
    type: 'Application for Registration',
    title: 'Application for Registration',
    purpose: 'Bank Loan Application',
    status: 'Approved',
    stage: 'Issuance',
    applicant: 'James Mwangi',
    company: 'Mumias Sugar Mills Ltd',
    submitDate: '2024-08-15',
    completionDate: '2024-08-28',
    expectedCompletion: null,
    quantity: 'N/A',
    notes: 'Registration application approved. All requirements met and documentation complete.',
    submittedDate: '2024-08-15',
    approvedDate: '2024-08-28',
    validUntil: '2025-08-28'
  },
  {
    id: 'APP-2024-003',
    type: 'License Renewal',
    title: 'Sugar Manufacturing License Renewal',
    purpose: 'Sugar Manufacturing License',
    status: 'Under Review',
    stage: 'Evaluation',
    applicant: 'James Mwangi',
    company: 'Mumias Sugar Mills Ltd',
    submitDate: '2024-09-05',
    completionDate: null,
    expectedCompletion: '2024-09-30',
    quantity: '50,000 MT/Year',
    notes: 'Technical evaluation in progress. Production capacity assessment being conducted.',
    submittedDate: '2024-09-05',
    approvedDate: null,
    validUntil: null
  },
]