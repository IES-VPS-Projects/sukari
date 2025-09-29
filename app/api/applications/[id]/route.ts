import { NextRequest, NextResponse } from 'next/server';
import { apiService } from '@/lib/axios-service';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Application ID is required' },
        { status: 400 }
      );
    }

    // Forward the request to the backend API
    const response = await apiService.get(`/api/applications/${id}`);
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error fetching application:', error);
    
    // Handle different error types
    if (error.response?.status === 404) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      );
    }
    
    if (error.response?.status === 401) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch application',
        error: error.message 
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Application ID is required' },
        { status: 400 }
      );
    }

    // Forward the request to the backend API
    const response = await apiService.patch(`/api/applications/${id}`, body);
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error updating application:', error);
    
    if (error.response?.status === 404) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      );
    }
    
    if (error.response?.status === 401) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to update application',
        error: error.message 
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Application ID is required' },
        { status: 400 }
      );
    }

    // Forward the request to the backend API
    const response = await apiService.delete(`/api/applications/${id}`);
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error deleting application:', error);
    
    if (error.response?.status === 404) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      );
    }
    
    if (error.response?.status === 401) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to delete application',
        error: error.message 
      },
      { status: error.response?.status || 500 }
    );
  }
}
