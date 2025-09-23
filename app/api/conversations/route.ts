import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('project_id');
    
    const url = projectId 
      ? `http://34.42.252.158:7405/api/conversations?project_id=${projectId}`
      : 'http://34.42.252.158:7405/api/conversations';
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Conversations API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch conversations' },
        { status: response.status }
      );
    }

    const conversations = await response.json();
    return NextResponse.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { project_id, title, is_standalone } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Prepare the request body based on whether it's standalone or project-based
    const requestBody: any = { title };
    
    if (is_standalone) {
      requestBody.is_standalone = true;
    } else if (project_id) {
      requestBody.project_id = project_id;
      requestBody.is_standalone = false;
    } else {
      // Default to standalone if no project_id provided
      requestBody.is_standalone = true;
    }

    console.log('Creating conversation with body:', requestBody);

    const response = await fetch('http://34.42.252.158:7405/api/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Create Conversation API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to create conversation' },
        { status: response.status }
      );
    }

    const conversation = await response.json();
    return NextResponse.json(conversation, { status: 201 });
  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


