export const alertsData = [
  {
    id: "ALT-2024-001",
    title: "Permit Expiry Warning",
    message: "Sugar import permit SIP-2023-045 expires on January 20, 2024",
    type: "warning",
    icon: "AlertTriangle",
    color: "bg-orange-50 text-orange-700",
    category: "regulatory",
    timestamp: "2024-09-14T08:30:00",
    isCritical: true,
    isResolved: false,
    relatedDocument: "SIP-2023-045",
    actions: [
      { label: "Initiate Renewal", link: "/portal/importer/applications" },
      { label: "View Permit", link: "/portal/importer/documents" }
    ],
    additionalInfo: "Permit renewal typically takes 14-21 business days. Failure to renew on time may result in penalties or import restrictions."
  },
  {
    id: "ALT-2024-002",
    title: "Payment Due",
    message: "Import license renewal fee of $2,500 is due",
    type: "error",
    icon: "AlertTriangle",
    color: "bg-red-50 text-red-700",
    category: "financial",
    timestamp: "2024-09-13T14:15:00",
    isCritical: true,
    isResolved: false,
    relatedDocument: "INV-2024-089",
    actions: [
      { label: "Make Payment", link: "/portal/importer/payments" },
      { label: "View Invoice", link: "/portal/importer/documents" }
    ],
    additionalInfo: "Late payment will incur a 5% penalty. If payment is not received within 30 days after the due date, your import license may be suspended."
  },
  {
    id: "ALT-2024-003",
    title: "Shipment Delayed",
    message: "Shipment from Thailand delayed by 2 days due to weather",
    type: "info",
    icon: "Ship",
    color: "bg-blue-50 text-blue-700",
    category: "logistics",
    timestamp: "2024-09-12T10:45:00",
    isCritical: false,
    isResolved: false,
    relatedDocument: "IMP-2024-002",
    actions: [
      { label: "Track Shipment", link: "/portal/importer/imports" }
    ],
    additionalInfo: "The vessel is currently navigating around a storm system in the Indian Ocean. Port authorities have been notified of the revised arrival schedule."
  }
]
