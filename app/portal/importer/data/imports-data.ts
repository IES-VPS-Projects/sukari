export const importsData = [
  {
    id: "IMP-2024-001",
    origin: "Brazil",
    quantity: "250 MT",
    status: "Cleared",
    arrivalDate: "2024-01-10",
    departureDate: "2024-08-15",
    value: "Ksh. 12,500,000",
    sugarType: "White Sugar",
    vessel: "MV Atlantic Star",
    trackingId: "TRACK-BR-001",
    destination: "Mombasa Port",
    clearanceDate: "2024-01-12",
    customsRef: "KE-CUST-2024-1234",
    trackingHistory: [
      { date: '2024-08-15', status: 'Departed Origin Port', location: 'Santos, Brazil' },
      { date: '2024-08-30', status: 'In Transit', location: 'Atlantic Ocean' },
      { date: '2024-09-08', status: 'Arrived at Port', location: 'Mombasa, Kenya' },
      { date: '2024-09-10', status: 'Customs Clearance', location: 'Mombasa, Kenya' },
      { date: '2024-09-12', status: 'Delivery Complete', location: 'Nairobi, Kenya' }
    ]
  },
  {
    id: "IMP-2024-002",
    origin: "Thailand",
    quantity: "180 MT",
    status: "In Transit",
    arrivalDate: "2024-01-15",
    departureDate: "2024-09-01",
    value: "Ksh. 9,000,000",
    sugarType: "Raw Sugar",
    vessel: "MV Pacific Trader",
    trackingId: "TRACK-TH-002",
    destination: "Mombasa Port",
    customsRef: "Pending",
    trackingHistory: [
      { date: '2024-09-01', status: 'Departed Origin Port', location: 'Bangkok, Thailand' },
      { date: '2024-09-10', status: 'In Transit', location: 'Indian Ocean' },
      { date: '2024-09-15', status: 'Current Position', location: '3.2°S, 42.5°E, Indian Ocean' }
    ]
  },
  {
    id: "IMP-2024-003",
    origin: "India",
    quantity: "320 MT",
    status: "Processing",
    arrivalDate: "2024-01-12",
    departureDate: "2024-08-28",
    value: "Ksh. 16,000,000",
    sugarType: "Refined Sugar",
    vessel: "MV Eastern Glory",
    trackingId: "TRACK-IN-003",
    destination: "Mombasa Port",
    customsRef: "KE-CUST-2024-1567",
    trackingHistory: [
      { date: '2024-08-28', status: 'Departed Origin Port', location: 'Mumbai, India' },
      { date: '2024-09-10', status: 'In Transit', location: 'Indian Ocean' },
      { date: '2024-09-16', status: 'Arrived at Port', location: 'Mombasa, Kenya' },
      { date: '2024-09-17', status: 'Customs Processing', location: 'Mombasa, Kenya' }
    ]
  }
]
