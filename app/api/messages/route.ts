import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversation_id, content, role } = body;

    if (!conversation_id || !content) {
      return NextResponse.json(
        { error: 'Conversation ID and content are required' },
        { status: 400 }
      );
    }

    console.log(`Sending message to conversation ${conversation_id}:`, content);

    const response = await fetch(`http://34.42.252.158:7405/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        conversation_id, 
        content, 
        role: role || 'user',
        metadata: {}
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Send Message API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: response.status }
      );
    }

    const message = await response.json();
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
