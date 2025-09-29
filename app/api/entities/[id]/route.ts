import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`http://34.42.252.158:7405/api/entities/${params.id}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Get Entity API Error:', errorText);
      return NextResponse.json(
        { error: 'Entity not found' },
        { status: response.status }
      );
    }

    const entity = await response.json();
    return NextResponse.json(entity);
  } catch (error) {
    console.error('Error fetching entity:', error);
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
    
    const response = await fetch(`http://34.42.252.158:7405/api/entities/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Update Entity API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to update entity' },
        { status: response.status }
      );
    }

    const updatedEntity = await response.json();
    return NextResponse.json(updatedEntity);
  } catch (error) {
    console.error('Error updating entity:', error);
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
    const response = await fetch(`http://34.42.252.158:7405/api/entities/${params.id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Delete Entity API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to delete entity' },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: 'Entity deleted successfully' });
  } catch (error) {
    console.error('Error deleting entity:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
