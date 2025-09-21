import { NextRequest, NextResponse } from 'next/server';

// License types
export interface License {
  id: string;
  type: string;
  name: string;
  description: string;
  status: 'active' | 'expired' | 'pending' | 'suspended';
  issueDate: string;
  expiryDate: string;
  licenseNumber: string;
  holderName: string;
  holderCompany: string;
  category: string;
  capacity?: string;
  location?: string;
  documents: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Mock licenses data
const mockLicenses: License[] = [
  {
    id: 'LIC-2024-001',
    type: 'Sugar Manufacturing License',
    name: 'Sugar Manufacturing License - Mumias Sugar Mills',
    description: 'License for sugar manufacturing operations',
    status: 'active',
    issueDate: '2024-01-15',
    expiryDate: '2025-01-15',
    licenseNumber: 'SML-2024-003',
    holderName: 'James Mwangi',
    holderCompany: 'Mumias Sugar Mills Ltd',
    category: 'Manufacturing',
    capacity: '50,000 MT/Year',
    location: 'Mumias, Kakamega County',
    documents: ['license-certificate.pdf', 'inspection-report.pdf'],
    notes: 'Annual renewal required. Next inspection due in 6 months.',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'LIC-2024-002',
    type: 'Food Processing License',
    name: 'Food Processing License - Mumias Sugar Mills',
    description: 'License for food processing and packaging operations',
    status: 'active',
    issueDate: '2024-02-01',
    expiryDate: '2025-02-01',
    licenseNumber: 'FPL-2024-001',
    holderName: 'James Mwangi',
    holderCompany: 'Mumias Sugar Mills Ltd',
    category: 'Food Processing',
    capacity: '30,000 MT/Year',
    location: 'Mumias, Kakamega County',
    documents: ['food-processing-license.pdf', 'haccp-certificate.pdf'],
    notes: 'HACCP compliance verified. Regular inspections scheduled.',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  },
  {
    id: 'LIC-2024-003',
    type: 'Export License',
    name: 'Sugar Export License - Mumias Sugar Mills',
    description: 'License for exporting sugar products',
    status: 'pending',
    issueDate: '2024-08-15',
    expiryDate: '2025-08-15',
    licenseNumber: 'SEL-2024-002',
    holderName: 'James Mwangi',
    holderCompany: 'Mumias Sugar Mills Ltd',
    category: 'Export',
    capacity: '20,000 MT/Year',
    location: 'Mumias, Kakamega County',
    documents: ['export-application.pdf'],
    notes: 'Application under review. Additional documentation required.',
    createdAt: '2024-08-15T00:00:00Z',
    updatedAt: '2024-08-15T00:00:00Z'
  },
  {
    id: 'LIC-2023-001',
    type: 'Warehouse License',
    name: 'Warehouse License - Mumias Sugar Mills',
    description: 'License for sugar storage and warehousing',
    status: 'expired',
    issueDate: '2023-03-01',
    expiryDate: '2024-03-01',
    licenseNumber: 'WHL-2023-001',
    holderName: 'James Mwangi',
    holderCompany: 'Mumias Sugar Mills Ltd',
    category: 'Storage',
    capacity: '100,000 MT',
    location: 'Mumias, Kakamega County',
    documents: ['warehouse-license.pdf', 'storage-capacity-report.pdf'],
    notes: 'License expired. Renewal application submitted.',
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  }
];

// GET /api/licenses - Fetch all licenses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const category = searchParams.get('category');

    // Filter licenses based on query parameters
    let filteredLicenses = [...mockLicenses];

    if (status) {
      filteredLicenses = filteredLicenses.filter(license => license.status === status);
    }

    if (type) {
      filteredLicenses = filteredLicenses.filter(license => 
        license.type.toLowerCase().includes(type.toLowerCase())
      );
    }

    if (category) {
      filteredLicenses = filteredLicenses.filter(license => 
        license.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Sort by updated date (newest first)
    filteredLicenses.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedLicenses = filteredLicenses.slice(startIndex, endIndex);

    const total = filteredLicenses.length;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: paginatedLicenses,
      pagination: {
        page,
        limit,
        total,
        totalPages
      },
      message: 'Licenses fetched successfully'
    });

  } catch (error) {
    console.error('Error fetching licenses:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Failed to fetch licenses',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST /api/licenses - Create a new license
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['type', 'name', 'description', 'holderName', 'holderCompany', 'category'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            data: null,
            message: `Missing required field: ${field}`,
            error: 'Validation error'
          },
          { status: 400 }
        );
      }
    }

    // Generate new license
    const newLicense: License = {
      id: `LIC-${new Date().getFullYear()}-${String(mockLicenses.length + 1).padStart(3, '0')}`,
      type: body.type,
      name: body.name,
      description: body.description,
      status: 'pending',
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: body.expiryDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
      licenseNumber: body.licenseNumber || `AUTO-${Date.now()}`,
      holderName: body.holderName,
      holderCompany: body.holderCompany,
      category: body.category,
      capacity: body.capacity,
      location: body.location,
      documents: body.documents || [],
      notes: body.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to mock data (in a real app, this would be saved to database)
    mockLicenses.unshift(newLicense);

    return NextResponse.json({
      success: true,
      data: newLicense,
      message: 'License created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating license:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Failed to create license',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
