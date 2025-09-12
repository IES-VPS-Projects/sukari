import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`http://34.42.252.158:7405/api/conversations/${params.id}/messages`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Messages API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch messages' },
        { status: response.status }
      );
    }

    const messages = await response.json();
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
