import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const requestBody: any = {
      query: body.user_input || body.query
    };

    // Add session_id if provided
    if (body.session_id) {
      requestBody.session_id = body.session_id;
    }
    
    const response = await fetch('http://35.222.235.13:7402/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Backend Error Response:', errorText);
      return NextResponse.json(
        { error: 'Failed to get response from AI service' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Transform the response to match expected format
    return NextResponse.json({
      response: data.answer || data.structured_answer?.summary || "No response available"
    });
  } catch (error) {
    console.error('Error in AI chat proxy:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
