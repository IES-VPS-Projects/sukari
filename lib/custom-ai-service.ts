export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class CustomAIService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = "/api/ai-chat";
  }

  async generateResponse(messages: ChatMessage[]): Promise<string> {
    try {
      // Get the last user message
      const lastUserMsg = messages.filter(m => m.role === 'user').slice(-1)[0]?.content || '';
      
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_input: lastUserMsg
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Custom AI API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      // The response contains the AI's reply in the 'response' field
      if (data.response) {
        return data.response;
      } else {
        console.error('Unexpected Custom AI API response format:', data);
        throw new Error('Invalid response format from Custom AI API');
      }
    } catch (error) {
      console.error('Error calling Custom AI API:', error);
      throw new Error('Failed to generate response from AI service');
    }
  }
}

export const customAIService = new CustomAIService();
