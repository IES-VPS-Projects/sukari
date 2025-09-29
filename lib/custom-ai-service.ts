import { MarkdownFormatter } from './markdown-formatter';

export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  metadata?: {
    analysis_type?: string;
    source_urls?: string[];
    agents_used?: string[];
    [key: string]: any;
  };
}

export interface ChatSession {
  id: string;
  project_id?: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  summary?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  project_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  summary?: string;
}

export class CustomAIService {
  private apiUrl: string;
  private backendUrl: string;

  constructor() {
    this.apiUrl = "http://34.42.252.158:7402/api/analyze";
    this.backendUrl = "http://34.42.252.158:7402";
  }

  // Generate a unique session ID
  generateSessionId(): string {
    return 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  // Create a new session
  createNewSession(userId: string, projectId?: string): ChatSession {
    return {
      id: this.generateSessionId(),
      project_id: projectId,
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  // Update session title
  updateSessionTitle(session: ChatSession, firstMessage: string): void {
      const title = firstMessage.length > 50 
        ? firstMessage.substring(0, 50) + '...' 
        : firstMessage;
      session.title = title;
  }

  // Generate AI response with conversation history and markdown formatting
  async generateResponse(messages: ChatMessage[], conversationId?: string, useReportFormat: boolean = true): Promise<string> {
    try {
      // Get the last user message
      const lastUserMsg = messages.filter(m => m.role === 'user').slice(-1)[0]?.content || '';
      
      const requestBody: any = {
        query: lastUserMsg
      };

      // Add conversation_id if provided for memory context
      if (conversationId) {
        requestBody.conversation_id = conversationId;
      }
      
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Custom AI API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      // The response contains the AI's reply in the 'response' field
      if (data.response) {
        const rawResponse = data.response;
        
        // Check if this should be formatted as a full report
        if (useReportFormat && MarkdownFormatter.shouldFormatAsReport(rawResponse)) {
          // Extract metadata from the response
          const metadata = MarkdownFormatter.extractMetadata(data);
          
          // Format as a professional report
          return MarkdownFormatter.formatResponse({
            query: lastUserMsg,
            answer: rawResponse,
            analysis_type: metadata.analysis_type,
            agents_used: metadata.agents_used,
            source_urls: metadata.source_urls,
            data_insights: metadata.data_insights,
            research_findings: metadata.research_findings,
            metadata: data.metadata
          });
        } else {
          // Format as a simple response
          return MarkdownFormatter.formatSimpleResponse(rawResponse);
        }
      } else {
        console.error('Unexpected Custom AI API response format:', data);
        throw new Error('Invalid response format from Custom AI API');
      }
    } catch (error) {
      console.error('Error calling Custom AI API:', error);
      // Format error message
      const lastUserMsg = messages.filter(m => m.role === 'user').slice(-1)[0]?.content || '';
      return MarkdownFormatter.formatError('Failed to generate response from AI service', lastUserMsg);
    }
  }

  // Backend API Methods

  // Projects
  async getProjects(): Promise<Project[]> {
    try {
      const response = await fetch(`${this.backendUrl}/api/projects`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      return await response.json();
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

  async createProject(name: string, description: string): Promise<Project | null> {
    try {
      const response = await fetch(`${this.backendUrl}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
      });
      if (!response.ok) throw new Error('Failed to create project');
      return await response.json();
    } catch (error) {
      console.error('Error creating project:', error);
      return null;
    }
  }

  async updateProject(projectId: string, name: string, description: string): Promise<Project | null> {
    try {
      const response = await fetch(`${this.backendUrl}/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
      });
      if (!response.ok) throw new Error('Failed to update project');
      return await response.json();
    } catch (error) {
      console.error('Error updating project:', error);
      return null;
    }
  }

  async deleteProject(projectId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.backendUrl}/api/projects/${projectId}`, {
        method: 'DELETE'
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  }

  // Conversations
  async getConversations(projectId?: string): Promise<Conversation[]> {
    try {
      const url = projectId 
        ? `${this.backendUrl}/api/conversations?project_id=${projectId}`
        : `${this.backendUrl}/api/conversations`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch conversations');
      return await response.json();
    } catch (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }
  }

  async createConversation(projectId: string | null, title: string, isStandalone: boolean = false): Promise<Conversation | null> {
    try {
      const body: any = { title };
      
      if (isStandalone) {
        body.is_standalone = true;
      } else if (projectId) {
        body.project_id = projectId;
        body.is_standalone = false;
      }
      
      const response = await fetch(`${this.backendUrl}/api/conversations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!response.ok) throw new Error('Failed to create conversation');
      return await response.json();
    } catch (error) {
      console.error('Error creating conversation:', error);
      return null;
    }
  }

  async updateConversation(conversationId: string, title: string, summary?: string): Promise<Conversation | null> {
    try {
      const body: any = { title };
      if (summary) body.summary = summary;
      
      const response = await fetch(`${this.backendUrl}/api/conversations/${conversationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!response.ok) throw new Error('Failed to update conversation');
      return await response.json();
    } catch (error) {
      console.error('Error updating conversation:', error);
      return null;
    }
  }

  async deleteConversation(conversationId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.backendUrl}/api/conversations/${conversationId}`, {
        method: 'DELETE'
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting conversation:', error);
      return false;
    }
  }

  // Messages
  async getMessages(conversationId: string): Promise<ChatMessage[]> {
    try {
      const response = await fetch(`${this.backendUrl}/api/conversations/${conversationId}/messages`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const messages = await response.json();
      return messages.map((msg: any) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        timestamp: new Date(msg.created_at),
        metadata: msg.metadata || {}
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }

  // Updated sendMessage method that handles conversation creation if needed
  async sendMessage(conversationId: string | null, content: string, projectId?: string): Promise<{ message: ChatMessage | null, conversationId: string | null }> {
    try {
      let actualConversationId = conversationId;
      
      // If no conversation exists, create one first
      if (!actualConversationId) {
        // Create a standalone conversation (no project required)
        const title = content.length > 50 ? content.substring(0, 50) + '...' : content;
        
        const conversationBody: any = {
          title: title,
          is_standalone: true
        };
        
        // If projectId is provided, use it (for project-based conversations)
        if (projectId) {
          conversationBody.project_id = projectId;
          conversationBody.is_standalone = false;
        }
        
        const conversationResponse = await fetch(`${this.backendUrl}/api/conversations?_t=${Date.now()}`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
          body: JSON.stringify(conversationBody)
        });
        
        if (!conversationResponse.ok) {
          const errorText = await conversationResponse.text();
          console.error('Create Conversation API Error:', errorText);
          throw new Error(`Failed to create conversation: ${conversationResponse.status} - ${errorText}`);
        }
        
        const newConversation = await conversationResponse.json();
        actualConversationId = newConversation.id;
        
        console.log('Created new conversation:', actualConversationId);
      }
      
      // Now send the message to the conversation
      const messageUrl = `/api/messages?_t=${Date.now()}`;
      console.log('Sending message to URL:', messageUrl);
      console.log('Full URL would be:', window.location.origin + messageUrl);
      
      const response = await fetch(messageUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify({ 
          conversation_id: actualConversationId,
          content: content,
          role: 'user'
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Send Message API Error:', errorText);
        throw new Error(`Failed to send message: ${response.status} - ${errorText}`);
      }
      
      const message = await response.json();
      const chatMessage = {
        id: message.id,
        role: message.role,
        content: message.content,
        timestamp: new Date(message.created_at),
        metadata: message.metadata || {}
      };
      
      return { message: chatMessage, conversationId: actualConversationId };
    } catch (error) {
      console.error('Error sending message:', error);
      return { message: null, conversationId: null };
    }
  }

  async deleteMessage(conversationId: string, messageId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.backendUrl}/api/messages/${messageId}`, {
        method: 'DELETE'
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting message:', error);
      return false;
    }
  }

  // Analysis with conversation context
  async analyzeWithContext(query: string, conversationId?: string, options?: any): Promise<any> {
    try {
      const requestBody: any = { query };
      if (conversationId) requestBody.conversation_id = conversationId;
      if (options) requestBody.options = options;

      const response = await fetch(`${this.backendUrl}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) throw new Error('Failed to analyze query');
      return await response.json();
    } catch (error) {
      console.error('Error analyzing query:', error);
      throw error;
    }
  }

  // Legacy localStorage methods (for backward compatibility)
  saveSession(session: ChatSession, userId?: string): void {
    try {
      const userIdKey = userId || 'default';
      const sessions = this.getSessions(userIdKey);
      const existingIndex = sessions.findIndex(s => s.id === session.id);
      
      if (existingIndex >= 0) {
        sessions[existingIndex] = session;
      } else {
        sessions.push(session);
      }
      
      localStorage.setItem(`ai_sessions_${userIdKey}`, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving session:', error);
    }
  }

  getSessions(userId: string): ChatSession[] {
    try {
      const sessionsJson = localStorage.getItem(`ai_sessions_${userId}`);
      if (sessionsJson) {
        const sessions = JSON.parse(sessionsJson);
        return sessions.map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          updatedAt: new Date(session.updatedAt)
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading sessions:', error);
      return [];
    }
  }

  getSession(sessionId: string, userId: string): ChatSession | null {
    const sessions = this.getSessions(userId);
    return sessions.find(s => s.id === sessionId) || null;
  }

  deleteSession(sessionId: string, userId: string): void {
    try {
      const sessions = this.getSessions(userId);
      const filteredSessions = sessions.filter(s => s.id !== sessionId);
      localStorage.setItem(`ai_sessions_${userId}`, JSON.stringify(filteredSessions));
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  }

  clearAllSessions(userId: string): void {
    try {
      localStorage.removeItem(`ai_sessions_${userId}`);
    } catch (error) {
      console.error('Error clearing sessions:', error);
    }
  }

  // Get all sessions (for backward compatibility - returns empty array)
  getAllSessions(): ChatSession[] {
    return [];
  }
}

export const customAIService = new CustomAIService();
