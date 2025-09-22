import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Extract query and conversation_id from request
    const query = body.user_input || body.query;
    const conversationId = body.conversation_id || body.session_id;
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const requestBody: any = {
      query: query
    };

    // Add conversation_id if provided for memory context
    if (conversationId) {
      requestBody.conversation_id = conversationId;
    }
    
    // Add any additional options
    if (body.options) {
      requestBody.options = body.options;
    }
    
    const response = await fetch('http://34.42.252.158:7405/api/analyze', {
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
        { error: 'Failed to get response from AI service', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Transform the response to match expected format
    const responseData: any = {
      response: data.analysis || data.answer || data.structured_answer?.summary || "No response available"
    };

    // Include metadata if available
    if (data.metadata) {
      responseData.metadata = data.metadata;
    }

    // Include conversation_id and message_id if available
    if (data.conversation_id) {
      responseData.conversation_id = data.conversation_id;
    }
    if (data.message_id) {
      responseData.message_id = data.message_id;
    }

    // Include source URLs if available
    if (data.metadata?.source_urls) {
      responseData.source_urls = data.metadata.source_urls;
    }

    // Include analysis type and agents used if available
    if (data.metadata?.analysis_type) {
      responseData.analysis_type = data.metadata.analysis_type;
    }
    if (data.metadata?.agents_used) {
      responseData.agents_used = data.metadata.agents_used;
    }
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error in AI chat proxy:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
