# Comprehensive API Documentation: Professional Document Q&A API

## Overview
This API provides functionality for uploading various document types (PDF, DOCX, CSV, TXT, PPTX, XLSX, images, etc.), processing them for semantic search and analysis using vector embeddings (FAISS) and LLMs (Google Gemini), and generating professional reports in response to questions. It supports OCR for scanned documents/images and offers structured reports with executive summaries, insights, analysis, and recommendations.

**Base URL:** `/` (e.g., `http://localhost:7501`)  
**Authentication:** None (public API).  
**Rate Limiting:** None (add in production).  
**Error Handling:** Standard HTTP errors (e.g., `400` for bad requests, `404` for not found, `500` for server errors). Responses include a `detail` field with error messages.  
**Dependencies:** FastAPI, Uvicorn, LangChain (with Google Generative AI), FAISS, Unstructured (for loaders), Pytesseract (for OCR).  
**Supported File Types:** PDF, DOCX/DOC, CSV, TXT/MD, PPTX/PPT, XLSX/XLS, JPG/JPEG/PNG/TIFF, and generic unstructured files.  
**Storage:** Uploaded files in `./uploads`, FAISS indexes in `./faiss_indexes`. In-memory metadata (use a DB for production).  
**LLM Configuration:** Uses Google Gemini 2.5-flash (temperature 0.1) for low creativity/high accuracy. Embeddings via `models/text-embedding-004`.  
**Chunking:** Documents split into 1000-char chunks with 200-char overlap.  
**Analysis Types:** `comprehensive` (default: full report), `summary` (concise overview), `insights` (deep patterns/trends), `recommendations` (actionable steps).  

---

## Endpoints

### 1. POST /upload
**Description:** Upload and process a document. Generates a unique ID, saves the file, loads/splits it, creates a FAISS vector store, and returns metadata.

**Request:**  
- Multipart form: `file` (UploadFile, required) - The document file.

**Response:** JSON (200 OK) - DocumentInfo model.

Example:
```json
{
  "document_id": "123e4567-e89b-12d3-a456-426614174000",
  "filename": "report.pdf",
  "file_type": "application/pdf",
  "upload_time": "2025-09-11T12:00:00.000000",
  "chunk_count": 15,
  "status": "processed"
}
```

**Errors:**
- 400: No file provided.
- 500: File upload/processing failed (e.g., unsupported format or OCR error).

**Example Usage (cURL):**
```bash
curl -X POST "http://localhost:7501/upload" -F "file=@/path/to/report.pdf"
```

---

### 2. POST /ask
**Description:** Ask a question about a processed document. Retrieves relevant chunks via vector search (k=8), runs QA chain with custom prompt based on `analysis_type`, and returns a structured professional report.

**Request:** JSON body (QuestionRequest model).  
- `question` (str, required): The query.  
- `document_id` (str, required): ID from `/upload`.  
- `analysis_type` (str, optional): "comprehensive" (default), "summary", "insights", or "recommendations".

Example:
```json
{
  "question": "Analyze the market trends",
  "document_id": "123e4567-e89b-12d3-a456-426614174000",
  "analysis_type": "insights"
}
```

**Response:** JSON (200 OK) - ProfessionalReport model.

Example:
```json
{
  "document_id": "123e4567-e89b-12d3-a456-426614174000",
  "question": "Analyze the market trends",
  "executive_summary": "The document highlights rising demand in sugar exports...",
  "key_insights": ["Insight 1", "Insight 2"],
  "detailed_analysis": "In-depth paragraph on trends...",
  "recommendations": ["Action 1", "Action 2"],
  "confidence_score": 0.85,
  "sources": [
    {
      "source": "uploads/report.pdf",
      "content_preview": "Snippet from page...",
      "relevance_score": 0.8
    }
  ],
  "generated_at": "2025-09-11T12:05:00.000000"
}
```

**Errors:**
- 404: Document not found or not processed.
- 500: Report generation failed (e.g., LLM error).

**Example Usage (cURL):**
```bash
curl -X POST "http://localhost:7501/ask" -H "Content-Type: application/json" -d '{"question": "Summarize the document", "document_id": "123e4567-e89b-12d3-a456-426614174000"}'
```

---

### 3. GET /documents
**Description:** List all uploaded and processed documents.  
**Request:** No parameters.  
**Response:** JSON array (200 OK) - List of DocumentInfo models.

Example:
```json
[{"document_id": "...", ...}, ...]
```

**Example Usage (cURL):**
```bash
curl "http://localhost:7501/documents"
```

---

### 4. GET /documents/{document_id}
**Description:** Get metadata for a specific document.  
**Request:** Path parameter `document_id` (str, required).  
**Response:** JSON (200 OK) - DocumentInfo model.

**Errors:**
- 404: Document not found.

**Example Usage (cURL):**
```bash
curl "http://localhost:7501/documents/123e4567-e89b-12d3-a456-426614174000"
```

---

### 5. DELETE /documents/{document_id}
**Description:** Delete a document, its file, and vector store.  
**Request:** Path parameter `document_id` (str, required).  
**Response:** JSON (200 OK).

Example:
```json
{"message": "Document deleted successfully"}
```

**Errors:**
- 404: Document not found.
- 500: Deletion failed (e.g., file system error).

**Example Usage (cURL):**
```bash
curl -X DELETE "http://localhost:7501/documents/123e4567-e89b-12d3-a456-426614174000"
```

---

### 6. GET /health
**Description:** Health check for the API.  
**Request:** No parameters.  
**Response:** JSON (200 OK).

Example:
```json
{"status": "healthy", "timestamp": "2025-09-11T12:00:00.000000"}
```

**Example Usage (cURL):**
```bash
curl "http://localhost:7501/health"
```

---

## Models

- **DocumentInfo:** Metadata for uploaded documents (id, filename, type, upload time, chunks, status).  
- **QuestionRequest:** Input for `/ask` (question, document_id, analysis_type).  
- **ProfessionalReport:** Structured output for `/ask` (summary, insights, analysis, recommendations, score, sources, timestamp).  

---

## Security Considerations
- **No auth:** Add JWT/OAuth in production.  
- **File Validation:** Add size limits (e.g., 50MB) and virus scanning.  
- **Privacy:** Documents contain sensitive data; ensure GDPR compliance.  

---

## Rate Limits & Scaling
- In production, add rate limiting (e.g., via slowapi).  
- Scale with async workers for processing large documents.  

---

## OpenAPI/Swagger
Access interactive docs at `http://localhost:7501/docs` (auto-generated by FastAPI).
