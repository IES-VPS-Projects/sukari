import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`http://34.42.252.158:7405/api/projects/${params.id}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Get Project API Error:', errorText);
      return NextResponse.json(
        { error: 'Project not found' },
        { status: response.status }
      );
    }

    const project = await response.json();
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`http://34.42.252.158:7405/api/projects/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description: description || '' }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Update Project API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to update project' },
        { status: response.status }
      );
    }

    const project = await response.json();
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`http://34.42.252.158:7405/api/projects/${params.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Delete Project API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to delete project' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


