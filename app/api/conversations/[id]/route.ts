import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`http://34.42.252.158:7405/api/conversations/${params.id}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Get Conversation API Error:', errorText);
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: response.status }
      );
    }

    const conversation = await response.json();
    return NextResponse.json(conversation);
  } catch (error) {
    console.error('Error fetching conversation:', error);
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
    const { title, summary } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Conversation title is required' },
        { status: 400 }
      );
    }

    const requestBody: any = { title };
    if (summary) requestBody.summary = summary;

    const response = await fetch(`http://34.42.252.158:7405/api/conversations/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Update Conversation API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to update conversation' },
        { status: response.status }
      );
    }

    const conversation = await response.json();
    return NextResponse.json(conversation);
  } catch (error) {
    console.error('Error updating conversation:', error);
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
    const response = await fetch(`http://34.42.252.158:7405/api/conversations/${params.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Delete Conversation API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to delete conversation' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


