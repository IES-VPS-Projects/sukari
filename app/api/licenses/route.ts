import { NextRequest, NextResponse } from 'next/server';

// License types
export interface License {
  id: string;
  name: string;
  description: string;
  category: string;
  type: string;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING' | 'SUSPENDED';
  requirements?: any;
  validityPeriod: number; // in months
  cost: string | number;
  issuingAuthority: string;
  applicationSteps?: any;
  prerequisites?: any;
  documents?: any;
  processingTime: string;
  renewalRequired: boolean;
  renewalPeriod: number; // in months
  isDigital: boolean;
  onlineApplication: boolean;
  createdAt: string;
  updatedAt: string;
  applications?: LicenseApplication[];
  renewals?: LicenseRenewal[];
  _count?: {
    applications: number;
    renewals: number;
  };
}

export interface LicenseApplication {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW';
  submittedAt: string;
  userId: string;
}

export interface LicenseRenewal {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW';
  submittedAt: string;
  userId: string;
}

// Mock licenses data
const mockLicenses: License[] = [
  {
    id: 'clx1234567890',
    name: 'Sugar Millers License',
    description: 'License for operating sugar mills',
    category: 'PERMIT_AND_LICENSE',
    type: 'MILLERS',
    status: 'ACTIVE',
    cost: '5000',
    validityPeriod: 12,
    renewalPeriod: 12,
    issuingAuthority: 'Ministry of Agriculture',
    processingTime: '5-10 business days',
    renewalRequired: true,
    isDigital: true,
    onlineApplication: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    applications: [
      {
        id: 'app123',
        status: 'PENDING',
        submittedAt: '2024-01-01T00:00:00.000Z',
        userId: 'user123'
      }
    ],
    renewals: [
      {
        id: 'ren123',
        status: 'PENDING',
        submittedAt: '2024-01-01T00:00:00.000Z',
        userId: 'user123'
      }
    ],
    _count: {
      applications: 5,
      renewals: 2
    }
  },
  {
    id: 'clx1234567891',
    name: 'Food Processing License',
    description: 'License for food processing and packaging operations',
    category: 'PERMIT_AND_LICENSE',
    type: 'FOOD_PROCESSING',
    status: 'ACTIVE',
    cost: '3000',
    validityPeriod: 12,
    renewalPeriod: 12,
    issuingAuthority: 'Ministry of Health',
    processingTime: '3-7 business days',
    renewalRequired: true,
    isDigital: true,
    onlineApplication: true,
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-02-01T00:00:00.000Z',
    applications: [],
    renewals: [],
    _count: {
      applications: 3,
      renewals: 1
    }
  },
  {
    id: 'clx1234567892',
    name: 'Export License',
    description: 'License for exporting sugar products',
    category: 'PERMIT_AND_LICENSE',
    type: 'EXPORT',
    status: 'PENDING',
    cost: '2000',
    validityPeriod: 6,
    renewalPeriod: 6,
    issuingAuthority: 'Ministry of Trade',
    processingTime: '7-14 business days',
    renewalRequired: true,
    isDigital: true,
    onlineApplication: true,
    createdAt: '2024-08-15T00:00:00.000Z',
    updatedAt: '2024-08-15T00:00:00.000Z',
    applications: [
      {
        id: 'app124',
        status: 'UNDER_REVIEW',
        submittedAt: '2024-08-15T00:00:00.000Z',
        userId: 'user124'
      }
    ],
    renewals: [],
    _count: {
      applications: 1,
      renewals: 0
    }
  },
  {
    id: 'clx1234567894',
    name: 'Sugar Processing License',
    description: 'License for sugar processing operations',
    category: 'PERMIT_AND_LICENSE',
    type: 'PROCESSING',
    status: 'PENDING',
    cost: '15000',
    validityPeriod: 12,
    renewalPeriod: 12,
    issuingAuthority: 'Ministry of Agriculture',
    processingTime: '10-15 business days',
    renewalRequired: true,
    isDigital: true,
    onlineApplication: true,
    createdAt: '2024-09-20T00:00:00.000Z',
    updatedAt: '2024-09-20T00:00:00.000Z',
    applications: [],
    renewals: [],
    _count: {
      applications: 0,
      renewals: 0
    }
  },
  {
    id: 'clx1234567893',
    name: 'Warehouse License',
    description: 'License for sugar storage and warehousing',
    category: 'PERMIT_AND_LICENSE',
    type: 'WAREHOUSE',
    status: 'EXPIRED',
    cost: '1500',
    validityPeriod: 12,
    renewalPeriod: 12,
    issuingAuthority: 'Ministry of Agriculture',
    processingTime: '5-10 business days',
    renewalRequired: true,
    isDigital: true,
    onlineApplication: true,
    createdAt: '2023-03-01T00:00:00.000Z',
    updatedAt: '2024-03-01T00:00:00.000Z',
    applications: [],
    renewals: [
      {
        id: 'ren124',
        status: 'PENDING',
        submittedAt: '2024-03-01T00:00:00.000Z',
        userId: 'user125'
      }
    ],
    _count: {
      applications: 0,
      renewals: 1
    }
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
      // Validate status parameter
      const validStatuses = ['ACTIVE', 'PENDING', 'EXPIRED', 'SUSPENDED'];
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          {
            success: false,
            error: "Validation failed",
            details: [
              {
                type: "field",
                value: status,
                msg: "Invalid status. Must be one of: ACTIVE, PENDING, EXPIRED, SUSPENDED",
                path: "status",
                location: "query"
              }
            ]
          },
          { status: 400 }
        );
      }
      filteredLicenses = filteredLicenses.filter(license => license.status === status);
    }

    if (type) {
      // Validate type parameter
      const validTypes = ['MILLERS', 'FOOD_PROCESSING', 'INDUSTRIAL', 'EXPORT', 'WAREHOUSE', 'QUALITY_ASSURANCE', 'WHITE_SUGAR', 'PROCESSING'];
      if (!validTypes.includes(type)) {
        return NextResponse.json(
          {
            success: false,
            error: "Validation failed",
            details: [
              {
                type: "field",
                value: type,
                msg: "Invalid type. Must be one of: MILLERS, FOOD_PROCESSING, INDUSTRIAL, EXPORT, WAREHOUSE, QUALITY_ASSURANCE, WHITE_SUGAR, PROCESSING",
                path: "type",
                location: "query"
              }
            ]
          },
          { status: 400 }
        );
      }
      filteredLicenses = filteredLicenses.filter(license => license.type === type);
    }

    if (category) {
      // Validate category parameter
      const validCategories = ['PERMIT_AND_LICENSE', 'LETTER_OF_COMFORT'];
      if (!validCategories.includes(category)) {
        return NextResponse.json(
          {
            success: false,
            error: "Validation failed",
            details: [
              {
                type: "field",
                value: category,
                msg: "Invalid category. Must be one of: PERMIT_AND_LICENSE",
                path: "category",
                location: "query"
              }
            ]
          },
          { status: 400 }
        );
      }
      filteredLicenses = filteredLicenses.filter(license => license.category === category);
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
        pages: totalPages
      },
      message: 'Licenses retrieved successfully for super admin'
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
    const requiredFields = ['name', 'description', 'category', 'type', 'cost', 'validityPeriod', 'renewalPeriod', 'issuingAuthority', 'processingTime'];
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
      id: `clx${Date.now()}${Math.floor(Math.random() * 1000)}`,
      name: body.name,
      description: body.description,
      category: body.category,
      type: body.type,
      status: 'PENDING',
      requirements: body.requirements || null,
      cost: body.cost,
      validityPeriod: body.validityPeriod,
      renewalPeriod: body.renewalPeriod,
      issuingAuthority: body.issuingAuthority,
      applicationSteps: body.applicationSteps || null,
      prerequisites: body.prerequisites || null,
      documents: body.documents || null,
      processingTime: body.processingTime,
      renewalRequired: body.renewalRequired ?? true,
      isDigital: body.isDigital ?? true,
      onlineApplication: body.onlineApplication ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      applications: [],
      renewals: [],
      _count: {
        applications: 0,
        renewals: 0
      }
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

// PUT /api/licenses/:id - Update a license
export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const licenseId = pathSegments[pathSegments.length - 1];
    
    if (!licenseId) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: [{ type: "field", value: licenseId, msg: "License ID is required", path: "id", location: "path" }]
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'category', 'type', 'cost', 'validityPeriod', 'renewalPeriod', 'issuingAuthority', 'processingTime'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: missingFields.map(field => ({
            type: "field",
            value: body[field],
            msg: `${field} is required`,
            path: field,
            location: "body"
          }))
        },
        { status: 400 }
      );
    }

    // Find the license to update
    const licenseIndex = mockLicenses.findIndex(license => license.id === licenseId);
    
    if (licenseIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: 'License not found',
          error: 'License with the specified ID does not exist'
        },
        { status: 404 }
      );
    }

    // Update the license
    const updatedLicense: License = {
      ...mockLicenses[licenseIndex],
      name: body.name,
      description: body.description,
      category: body.category,
      type: body.type,
      issuingAuthority: body.issuingAuthority,
      cost: body.cost,
      validityPeriod: body.validityPeriod,
      renewalPeriod: body.renewalPeriod,
      requirements: body.requirements || null,
      applicationSteps: body.applicationSteps || null,
      prerequisites: body.prerequisites || null,
      documents: body.documents || null,
      processingTime: body.processingTime,
      renewalRequired: body.renewalRequired ?? true,
      isDigital: body.isDigital ?? true,
      onlineApplication: body.onlineApplication ?? true,
      updatedAt: new Date().toISOString()
    };

    mockLicenses[licenseIndex] = updatedLicense;

    return NextResponse.json(
      {
        success: true,
        data: updatedLicense,
        message: 'License updated successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating license:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Failed to update license',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/licenses/:id - Delete a license
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const licenseId = pathSegments[pathSegments.length - 1];
    
    if (!licenseId) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: [{ type: "field", value: licenseId, msg: "License ID is required", path: "id", location: "path" }]
        },
        { status: 400 }
      );
    }

    // Find the license to delete
    const licenseIndex = mockLicenses.findIndex(license => license.id === licenseId);
    
    if (licenseIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: 'License not found',
          error: 'License with the specified ID does not exist'
        },
        { status: 404 }
      );
    }

    // Check if license has applications or renewals
    const license = mockLicenses[licenseIndex];
    const hasApplications = license._count?.applications && license._count.applications > 0;
    const hasRenewals = license._count?.renewals && license._count.renewals > 0;

    if (hasApplications || hasRenewals) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: 'Cannot delete license with existing applications or renewals',
          error: 'License has associated applications or renewals that must be handled first'
        },
        { status: 409 }
      );
    }

    // Remove the license
    const deletedLicense = mockLicenses.splice(licenseIndex, 1)[0];

    return NextResponse.json(
      {
        success: true,
        data: deletedLicense,
        message: 'License deleted successfully'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error deleting license:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Failed to delete license',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
