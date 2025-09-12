import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://34.42.252.158:7405/api/projects');
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Projects API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: response.status }
      );
    }

    const projects = await response.json();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 }
      );
    }

    const response = await fetch('http://34.42.252.158:7405/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description: description || '' }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Create Project API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to create project' },
        { status: response.status }
      );
    }

    const project = await response.json();
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


