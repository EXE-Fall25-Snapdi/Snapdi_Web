import axiosInstance from '../config/axiosConfig';

export interface Conversation {
  conversationId: number;
  type: string;
  createAt: string;
  lastReadMessageId: number | null;
  unreadCount: number;
}

export interface Message {
  messageId: number;
  conversationId: number;
  senderId: number;
  content: string;
  sendAt: string;
}

export interface SendMessageRequest {
  content: string;
}

class ConversationService {
  // Get all conversations for current user
  async getMyConversations(): Promise<Conversation[]> {
    const response = await axiosInstance.get<Conversation[]>('/api/conversations');
    return response.data;
  }

  // Get messages for a specific conversation
  async getMessages(
    conversationId: number,
    beforeMessageId?: number,
    take: number = 50
  ): Promise<Message[]> {
    const params = new URLSearchParams();
    if (beforeMessageId) {
      params.append('beforeMessageId', beforeMessageId.toString());
    }
    params.append('take', take.toString());

    const response = await axiosInstance.get<Message[]>(
      `/api/conversations/${conversationId}/messages?${params.toString()}`
    );
    return response.data;
  }

  // Send a message via REST API (alternative to SignalR)
  async sendMessage(conversationId: number, content: string): Promise<Message> {
    const response = await axiosInstance.post<Message>(
      `/api/conversations/${conversationId}/messages`,
      { content }
    );
    return response.data;
  }

  // Get or create a conversation with admin
  async getOrCreateAdminConversation(): Promise<number> {
    try {
      // First, try to get existing conversations
      const conversations = await this.getMyConversations();

      // Look for an existing admin conversation (type = 'support' or similar)
      const adminConversation = conversations.find(c => c.type === 'support');

      if (adminConversation) {
        return adminConversation.conversationId;
      }

      // If no admin conversation exists, create one using the backend endpoint
      const response = await axiosInstance.post<{ conversationId: number }>('/api/conversations/admin');
      return response.data.conversationId;
    } catch (error) {
      console.error('Error getting/creating admin conversation:', error);
      throw error;
    }
  }
}

export const conversationService = new ConversationService();
