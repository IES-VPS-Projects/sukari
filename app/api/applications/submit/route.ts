import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { licenseId, entityId, userId, formData } = body;
    
    if (!licenseId || !entityId || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: licenseId, entityId, and userId are required',
          error: 'Validation error'
        },
        { status: 400 }
      );
    }

    // Create application object
    const application = {
      id: `APP-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      licenseId,
      entityId,
      userId,
      formData,
      status: 'SUBMITTED',
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log('Application submitted:', application);

    // In a real application, this would be saved to a database
    // For now, we'll just return the created application
    
    return NextResponse.json({
      success: true,
      data: application,
      message: 'Application submitted successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
