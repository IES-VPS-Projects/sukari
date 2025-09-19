# Kenya Sugar Board API Documentation v2.0

## Base URL
```
http://localhost:8000
```

## Table of Contents
1. [Overview](#overview)
2. [Health & Status](#health--status)
3. [Projects](#projects)
4. [Conversations](#conversations)
   - [Standalone Conversations](#standalone-conversations)
5. [Messages](#messages)
6. [Analysis](#analysis)
   - [Streaming Analysis](#streaming-analysis)
7. [Semantic Search](#semantic-search)
8. [Memory System](#memory-system)
9. [Response Formats](#response-formats)
10. [Error Handling](#error-handling)

---

## Overview

The Kenya Sugar Board API provides AI-powered analysis of Kenya's sugar industry data. Key features include:
- **Multi-agent AI system** with specialized agents for data analysis and web research
- **Streaming responses** using Server-Sent Events (SSE)
- **Conversation memory** with project-based and standalone conversations
- **Semantic search** across projects, conversations, and messages
- **Enhanced response formatting** with inline citations

### Authentication
Currently, the API does not require authentication for development purposes.

### Content Types
- Request: `application/json`
- Response: `application/json`
- Streaming: `text/event-stream`

---

## Health & Status

### Check API Health
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "database": "connected",
  "vector_search": true,
  "timestamp": "2024-01-20T12:00:00.000Z"
}
```

### Get System Status
```http
GET /status
```

**Response:**
```json
{
  "status": "operational",
  "version": "2.0",
  "database": "connected",
  "agents": ["supervisor", "data_analyst", "web_researcher"],
  "vector_search": true,
  "timestamp": "2024-01-20T12:00:00.000Z"
}
```

---

## Projects

### List All Projects
```http
GET /api/projects
```

**Response:**
```json
[
  {
    "id": "proj-123",
    "name": "Sugar Production Analysis",
    "description": "Q1 2024 Analysis",
    "created_at": "2024-01-20T10:00:00Z",
    "updated_at": "2024-01-20T10:00:00Z",
    "conversation_count": 5
  }
]
```

### Get Single Project
```http
GET /api/projects/{project_id}
```

**Response:**
```json
{
  "id": "proj-123",
  "name": "Sugar Production Analysis",
  "description": "Q1 2024 Analysis",
  "metadata": {},
  "created_at": "2024-01-20T10:00:00Z",
  "updated_at": "2024-01-20T10:00:00Z"
}
```

### Create Project
```http
POST /api/projects
```

**Request Body:**
```json
{
  "name": "New Analysis Project",
  "description": "Description of the project",
  "metadata": {
    "tags": ["production", "2024"],
    "region": "western"
  }
}
```

**Response:** Same as Get Single Project

### Update Project
```http
PUT /api/projects/{project_id}
```

**Request Body:**
```json
{
  "name": "Updated Project Name",
  "description": "Updated description"
}
```

### Delete Project
```http
DELETE /api/projects/{project_id}
```

**Response:**
```json
{
  "message": "Project deleted successfully"
}
```

---

## Conversations

### List Conversations
```http
GET /api/conversations
```

**Query Parameters:**
- `project_id` (optional): Filter by project ID
- `standalone` (optional): Filter standalone conversations (`true`/`false`)

**Response:**
```json
[
  {
    "id": "conv-456",
    "project_id": "proj-123",
    "title": "Production Trends Analysis",
    "summary": "Analysis of production trends...",
    "is_standalone": false,
    "created_at": "2024-01-20T10:30:00Z",
    "updated_at": "2024-01-20T11:00:00Z",
    "message_count": 10
  }
]
```

### Get Single Conversation
```http
GET /api/conversations/{conversation_id}
```

### Create Conversation
```http
POST /api/conversations
```

**Request Body (Project-based):**
```json
{
  "project_id": "proj-123",
  "title": "New Analysis Session",
  "is_standalone": false
}
```

**Request Body (Standalone):**
```json
{
  "project_id": null,
  "title": "Quick Questions",
  "is_standalone": true
}
```

**Response:**
```json
{
  "id": "conv-789",
  "project_id": null,
  "title": "Quick Questions",
  "summary": null,
  "is_standalone": true,
  "created_at": "2024-01-20T12:00:00Z",
  "updated_at": "2024-01-20T12:00:00Z",
  "message_count": 0
}
```

### Update Conversation
```http
PUT /api/conversations/{conversation_id}
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "summary": "Updated summary of the conversation"
}
```

### Delete Conversation
```http
DELETE /api/conversations/{conversation_id}
```

---

## Standalone Conversations

Standalone conversations allow users to interact with the AI without creating a project.

### Quick Start Examples

#### Option 1: Direct Query (No History)
```bash
curl -N -H "Accept: text/event-stream" \
  "http://localhost:8000/api/analyze/stream?query=What%20are%20the%20best%20sugarcane%20varieties"
```

#### Option 2: Create and Use Standalone Conversation
```bash
# Create standalone conversation
curl -X POST http://localhost:8000/api/conversations \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sugar Industry Q&A",
    "is_standalone": true
  }'

# Use the returned conversation ID for queries
curl -N -H "Accept: text/event-stream" \
  "http://localhost:8000/api/analyze/stream?query=Tell%20me%20about%20yields&conversation_id=conv-123"
```

### JavaScript Example
```javascript
// Create standalone conversation
const response = await fetch('http://localhost:8000/api/conversations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Quick Analysis',
    is_standalone: true
  })
});
const conversation = await response.json();

// Stream query with conversation
const eventSource = new EventSource(
  `http://localhost:8000/api/analyze/stream?query=${encodeURIComponent('Your question')}&conversation_id=${conversation.id}`
);

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'chunk') {
    console.log(data.content);
  }
};
```

---

## Messages

### List Messages in Conversation
```http
GET /api/conversations/{conversation_id}/messages
```

**Response:**
```json
[
  {
    "id": "msg-001",
    "conversation_id": "conv-456",
    "role": "user",
    "content": "What are the production trends?",
    "metadata": {},
    "created_at": "2024-01-20T10:30:00Z"
  },
  {
    "id": "msg-002",
    "conversation_id": "conv-456",
    "role": "assistant",
    "content": "Based on the analysis...",
    "metadata": {
      "agents_used": ["data_analyst"],
      "sources": ["http://example.com"]
    },
    "created_at": "2024-01-20T10:30:15Z"
  }
]
```

### Create Message
```http
POST /api/messages
```

**Request Body:**
```json
{
  "conversation_id": "conv-456",
  "role": "user",
  "content": "What about Western region specifically?",
  "metadata": {}
}
```

---

## Analysis

### Standard Analysis (Non-streaming)
```http
POST /api/analyze
```

**Request Body:**
```json
{
  "query": "Analyze sugar production trends for 2024",
  "conversation_id": "conv-456",
  "context": {
    "region": "western",
    "timeframe": "Q1"
  }
}
```

**Response:**
```json
{
  "query": "Analyze sugar production trends for 2024",
  "answer": "Based on the analysis of Kenya Sugar Board data...",
  "analysis_type": "data_and_research",
  "agents_used": ["supervisor", "data_analyst", "web_researcher"],
  "data_insights": "Production increased by 15%...",
  "research_findings": "Industry reports show...",
  "sources": [
    "https://www.kenyasugarboard.co.ke/report1",
    "https://www.agriculture.go.ke/data"
  ],
  "conversation_id": "conv-456",
  "message_id": "msg-003"
}
```

---

## Streaming Analysis

### Stream Analysis with SSE
```http
GET /api/analyze/stream
```

**Query Parameters:**
- `query` (required): The question to analyze
- `conversation_id` (optional): Existing conversation ID
- `project_id` (optional): Project ID for context

**Example Request:**
```bash
curl -N -H "Accept: text/event-stream" \
  "http://localhost:8000/api/analyze/stream?query=What%20are%20the%20production%20trends"
```

**Stream Response Format:**
```
data: {"type": "status", "content": "Thinking..."}

data: {"type": "status", "content": "Analyzing data..."}

data: {"type": "chunk", "content": "Based on "}

data: {"type": "chunk", "content": "the analysis of "}

data: {"type": "chunk", "content": "Kenya Sugar Board data, "}

data: {"type": "complete", "message": {
  "content": "Complete response text...",
  "sources": ["url1", "url2"],
  "metadata": {...},
  "conversation_id": "conv-456",
  "message_id": "msg-004"
}}
```

### Python Streaming Client
```python
import requests
import json

def stream_analysis(query, conversation_id=None):
    params = {'query': query}
    if conversation_id:
        params['conversation_id'] = conversation_id
    
    response = requests.get(
        'http://localhost:8000/api/analyze/stream',
        params=params,
        stream=True,
        headers={'Accept': 'text/event-stream'}
    )
    
    for line in response.iter_lines():
        if line and line.startswith(b'data: '):
            data = json.loads(line[6:])
            
            if data['type'] == 'chunk':
                print(data['content'], end='', flush=True)
            elif data['type'] == 'complete':
                print("\n\nAnalysis complete!")
                return data['message']

# Usage
result = stream_analysis("What varieties yield the most?")
```

### JavaScript Streaming Client
```javascript
function streamAnalysis(query, conversationId) {
  const params = new URLSearchParams({ query });
  if (conversationId) {
    params.append('conversation_id', conversationId);
  }
  
  const eventSource = new EventSource(
    `/api/analyze/stream?${params}`
  );
  
  let fullContent = '';
  
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    switch(data.type) {
      case 'status':
        console.log(`Status: ${data.content}`);
        break;
        
      case 'chunk':
        fullContent += data.content;
        process.stdout.write(data.content);
        break;
        
      case 'complete':
        console.log('\n\nComplete!');
        console.log('Sources:', data.message.sources);
        eventSource.close();
        break;
    }
  };
  
  eventSource.onerror = (error) => {
    console.error('Stream error:', error);
    eventSource.close();
  };
}
```

---

## Semantic Search

### Search Across All Content
```http
POST /api/search
```

**Request Body:**
```json
{
  "query": "sugar varieties coastal region",
  "scope": "all",
  "n_results": 10,
  "project_id": null,
  "min_score": 0.5
}
```

**Parameters:**
- `query`: Search query text
- `scope`: One of `all`, `projects`, `conversations`, `messages`
- `n_results`: Number of results (1-50, default: 10)
- `project_id`: Optional filter by project
- `min_score`: Minimum similarity score (0.0-1.0, default: 0.0)

**Response:**
```json
{
  "results": [
    {
      "id": "msg-123",
      "type": "message",
      "title": "Discussion about coastal varieties",
      "content": "CO 945 variety is suitable for coastal areas...",
      "score": 0.85,
      "metadata": {
        "conversation_id": "conv-456",
        "project_name": "Coastal Analysis"
      },
      "highlights": [
        "...CO 945 variety is suitable for coastal areas with yields of...",
        "...rainfall patterns in coastal regions favor..."
      ]
    }
  ],
  "total": 10,
  "query": "sugar varieties coastal region",
  "scope": "all"
}
```

### Find Similar Items
```http
GET /api/search/similar/{item_type}/{item_id}
```

**Parameters:**
- `item_type`: One of `project`, `conversation`, `message`
- `item_id`: ID of the item to find similar items for
- `n_results`: Number of results (query parameter, default: 5)

**Example:**
```bash
curl "http://localhost:8000/api/search/similar/conversation/conv-123?n_results=3"
```

**Response:**
```json
{
  "similar_items": [
    {
      "id": "conv-789",
      "type": "conversation",
      "title": "Related Analysis",
      "content": "Similar discussion about...",
      "score": 0.92,
      "metadata": {...}
    }
  ],
  "source_id": "conv-123",
  "source_type": "conversation"
}
```

### Sync Vector Database
```http
POST /api/search/sync
```

**Query Parameters:**
- `full_sync`: Boolean, perform full resync (default: false)

**Response:**
```json
{
  "status": "sync_started",
  "full_sync": false,
  "message": "Vector database sync has been initiated in the background"
}
```

### Get Search Statistics
```http
GET /api/search/stats
```

**Response:**
```json
{
  "available": true,
  "embedding_model": "all-MiniLM-L6-v2",
  "embedding_dim": 384,
  "collections": {
    "projects": {
      "count": 25,
      "name": "projects"
    },
    "conversations": {
      "count": 150,
      "name": "conversations"
    },
    "messages": {
      "count": 1200,
      "name": "messages"
    },
    "unified": {
      "count": 1375,
      "name": "unified_search"
    }
  }
}
```

---

## Memory System

The API maintains conversation context and memory across sessions.

### How Memory Works
1. **Conversation Context**: Recent messages in the same conversation
2. **Project Context**: Summary of other conversations in the project
3. **Enhanced Queries**: System automatically adds relevant context

### Memory in Streaming
When using `/api/analyze/stream` with a `conversation_id`:
- System retrieves last 5 messages for context
- Includes project-level summaries
- Enhances the query with relevant background

### Example with Context
```bash
# First query
curl -N "http://localhost:8000/api/analyze/stream?query=What%20are%20the%20trends&conversation_id=conv-123"

# Follow-up query (system remembers context)
curl -N "http://localhost:8000/api/analyze/stream?query=Tell%20me%20more%20about%20Western%20region&conversation_id=conv-123"
```

---

## Response Formats

### Enhanced Response Features
Responses include:
- **Formatted markdown** with proper headers and lists
- **Inline citations** automatically placed after factual statements
- **Source URLs** collected and displayed
- **Metadata** about agents used and analysis type

### Response Enhancement
When available, responses are enhanced with:
- Engaging introductions based on query type
- Emphasized important numbers and statistics
- Section headers for better organization
- Summary for long responses

### Example Enhanced Response
```json
{
  "content": "### Overview of Sugarcane Varieties\n\nHere's what you need to know:\n\n**Traditional varieties** like CO 421 yield around **95-134 tons/ha** [KenyaSugarBoard]...\n\n### Improved Varieties\n\n**KEN 83-737** offers yields of **114 tons/ha** with excellent disease resistance [KALRO]...",
  "sources": [
    "https://www.kenyasugarboard.co.ke/varieties",
    "https://www.kalro.org/sugar-research"
  ],
  "citations": [
    {
      "url": "https://www.kenyasugarboard.co.ke/varieties",
      "title": "Kenya Sugar Board",
      "domain": "KenyaSugarBoard",
      "ref": "[KenyaSugarBoard]"
    }
  ],
  "metadata": {
    "enhanced": true,
    "citation_count": 2,
    "agents_used": ["data_analyst", "web_researcher"]
  }
}
```

---

## Error Handling

### Error Response Format
```json
{
  "detail": "Error message",
  "status_code": 400,
  "type": "validation_error"
}
```

### Common Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `404`: Resource not found
- `422`: Unprocessable Entity
- `500`: Internal Server Error
- `503`: Service Unavailable (vector search not available)

### Streaming Error Handling
For SSE streams, errors are sent as:
```
data: {"type": "error", "content": "Error message"}
```

---

## Rate Limiting

Currently, no rate limiting is implemented. For production use, consider implementing:
- Request rate limiting per IP
- Concurrent connection limits for SSE
- Query complexity limits

---

## WebSocket Support (Future)

WebSocket support is planned for real-time bidirectional communication:
```
ws://localhost:8000/ws/chat/{conversation_id}
```

---

## Examples

### Complete Workflow Example

```python
import requests
import json

BASE_URL = "http://localhost:8000"

# 1. Create a project
project_response = requests.post(
    f"{BASE_URL}/api/projects",
    json={"name": "2024 Analysis", "description": "Annual sugar analysis"}
)
project = project_response.json()

# 2. Create a conversation
conv_response = requests.post(
    f"{BASE_URL}/api/conversations",
    json={
        "project_id": project['id'],
        "title": "Production Analysis"
    }
)
conversation = conv_response.json()

# 3. Stream analysis
params = {
    "query": "Analyze production trends for Western Kenya",
    "conversation_id": conversation['id']
}

with requests.get(f"{BASE_URL}/api/analyze/stream", params=params, stream=True) as r:
    for line in r.iter_lines():
        if line and line.startswith(b'data: '):
            data = json.loads(line[6:])
            if data['type'] == 'chunk':
                print(data['content'], end='')

# 4. Search for related content
search_response = requests.post(
    f"{BASE_URL}/api/search",
    json={
        "query": "Western Kenya production",
        "scope": "all",
        "n_results": 5
    }
)
search_results = search_response.json()
print(f"\nFound {search_results['total']} related items")
```

### cURL Quick Reference

```bash
# Create standalone conversation
curl -X POST http://localhost:8000/api/conversations \
  -H "Content-Type: application/json" \
  -d '{"title": "Quick Chat", "is_standalone": true}'

# Stream a query
curl -N -H "Accept: text/event-stream" \
  "http://localhost:8000/api/analyze/stream?query=Your%20question"

# Search content
curl -X POST http://localhost:8000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "sugar varieties", "scope": "all"}'

# Get search stats
curl http://localhost:8000/api/search/stats

# Health check
curl http://localhost:8000/api/health
```

---

## Migration from v1.0

### Breaking Changes
- Endpoint port changed from `7402` to `8000`
- `project_id` is now optional for conversations
- New `is_standalone` field in conversations
- Enhanced response format with citations

### New Features
- Standalone conversations without projects
- Semantic search across all content
- Response enhancement with inline citations
- Similar item search
- Vector database sync

### Deprecated
- `/analyze` endpoint (use `/api/analyze` or `/api/analyze/stream`)
- Old response format without citations

---

## Support

For issues or questions:
- Check the [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) guide
- Review the [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for architecture details
- Examine test files in `/tests/` directory for usage examples

---

## Version History

- **v2.0** (Current): Added semantic search, standalone conversations, response enhancement
- **v1.0**: Initial release with basic project/conversation management

---

Last Updated: 2024-01-20