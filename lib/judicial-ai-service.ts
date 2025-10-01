export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export class JudicialAIService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = "/api/ai-chat";
  }

  // Generate a unique session ID
  generateSessionId(): string {
    return 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  // Create a new chat session
  createNewSession(userId: string): ChatSession {
    return {
      id: this.generateSessionId(),
      userId: userId,
      title: 'New Legal Query',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  // Update session title based on first user message
  updateSessionTitle(session: ChatSession, firstMessage: string): void {
    if (session.messages.length === 2) { // After first exchange
      const title = firstMessage.length > 50 
        ? firstMessage.substring(0, 50) + '...' 
        : firstMessage;
      session.title = title;
    }
  }

  async generateResponse(messages: ChatMessage[], sessionId?: string): Promise<string> {
    try {
      // Get the last user message
      const lastUserMsg = messages.filter(m => m.role === 'user').slice(-1)[0]?.content || '';
      
      const requestBody: any = {
        query: lastUserMsg
      };

      // Add session_id if provided
      if (sessionId) {
        requestBody.session_id = sessionId;
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
        console.error('Judicial AI API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      // The response contains the AI's reply in the 'response' field
      if (data.response) {
        return data.response;
      } else {
        console.error('Unexpected Judicial AI API response format:', data);
        throw new Error('Invalid response format from Judicial AI API');
      }
    } catch (error) {
      console.error('Error calling Judicial AI API:', error);
      throw new Error('Failed to generate response from AI service');
    }
  }

  // Save session to localStorage
  saveSession(session: ChatSession): void {
    try {
      const sessions = this.getSessions(session.userId);
      const existingIndex = sessions.findIndex(s => s.id === session.id);
      
      if (existingIndex >= 0) {
        sessions[existingIndex] = session;
      } else {
        sessions.unshift(session); // Add new sessions at the beginning
      }
      
      // Keep only the last 50 sessions per user
      const limitedSessions = sessions.slice(0, 50);
      
      const storageKey = `judicial-ai-chat-sessions-${session.userId}`;
      localStorage.setItem(storageKey, JSON.stringify(limitedSessions));
    } catch (error) {
      console.error('Error saving session:', error);
    }
  }

  // Get all sessions from localStorage for a specific user
  getSessions(userId: string): ChatSession[] {
    try {
      const storageKey = `judicial-ai-chat-sessions-${userId}`;
      const sessionsData = localStorage.getItem(storageKey);
      if (sessionsData) {
        const sessions = JSON.parse(sessionsData);
        // Convert date strings back to Date objects
        return sessions.map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          updatedAt: new Date(session.updatedAt),
          messages: session.messages.map((msg: any) => ({
            ...msg,
            timestamp: msg.timestamp ? new Date(msg.timestamp) : undefined
          }))
        }));
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
    return [];
  }

  // Get a specific session by ID for a specific user
  getSession(sessionId: string, userId: string): ChatSession | null {
    const sessions = this.getSessions(userId);
    return sessions.find(s => s.id === sessionId) || null;
  }

  // Delete a session for a specific user
  deleteSession(sessionId: string, userId: string): void {
    try {
      const sessions = this.getSessions(userId);
      const filteredSessions = sessions.filter(s => s.id !== sessionId);
      const storageKey = `judicial-ai-chat-sessions-${userId}`;
      localStorage.setItem(storageKey, JSON.stringify(filteredSessions));
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  }

  // Clear all sessions for a specific user
  clearAllSessions(userId: string): void {
    try {
      const storageKey = `judicial-ai-chat-sessions-${userId}`;
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error('Error clearing sessions:', error);
    }
  }

  // Get all sessions (for backward compatibility - returns empty array)
  getAllSessions(): ChatSession[] {
    return [];
  }
}

export const judicialAIService = new JudicialAIService();

