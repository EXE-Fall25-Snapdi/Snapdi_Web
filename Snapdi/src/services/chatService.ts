import * as signalR from '@microsoft/signalr';

export interface ChatMessage {
  messageId: number;
  conversationId: number;
  senderId: number;
  content: string;
  sendAt: Date;
}

export interface MessageReceivedEvent {
  messageId: number;
  conversationId: number;
  senderId: number;
  content: string;
  sendAt: string;
}

export interface MessageReadEvent {
  conversationId: number;
  messageId: number;
  readerUserId: number;
  readAt: string;
}

class ChatService {
  private connection: signalR.HubConnection | null = null;

  async connect(token: string): Promise<void> {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      console.log('Already connected to chat hub');
      return;
    }

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_APP_ENV === 'production'
        ? import.meta.env.VITE_API_BASE_URL
        : "https://localhost:7000"}/hubs/chat`, {
        accessTokenFactory: () => token,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    try {
      await this.connection.start();
      console.log('Connected to chat hub');
    } catch (err) {
      console.error('Error connecting to chat hub:', err);
      throw err;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
      console.log('Disconnected from chat hub');
    }
  }

  async joinConversation(conversationId: number): Promise<void> {
    if (!this.connection) {
      throw new Error('Not connected to chat hub');
    }

    try {
      await this.connection.invoke('JoinConversation', conversationId);
      console.log(`Joined conversation ${conversationId}`);
    } catch (err) {
      console.error('Error joining conversation:', err);
      throw err;
    }
  }

  async leaveConversation(conversationId: number): Promise<void> {
    if (!this.connection) {
      return;
    }

    try {
      await this.connection.invoke('LeaveConversation', conversationId);
      console.log(`Left conversation ${conversationId}`);
    } catch (err) {
      console.error('Error leaving conversation:', err);
    }
  }

  async sendMessage(conversationId: number, content: string): Promise<void> {
    if (!this.connection) {
      throw new Error('Not connected to chat hub');
    }

    try {
      await this.connection.invoke('SendMessage', conversationId, content);
    } catch (err) {
      console.error('Error sending message:', err);
      throw err;
    }
  }

  onMessageReceived(callback: (message: MessageReceivedEvent) => void): void {
    if (!this.connection) {
      return;
    }

    this.connection.on('messageReceived', callback);
  }

  onMessageRead(callback: (data: MessageReadEvent) => void): void {
    if (!this.connection) {
      return;
    }

    this.connection.on('messageRead', callback);
  }

  offMessageReceived(): void {
    if (!this.connection) {
      return;
    }

    this.connection.off('messageReceived');
  }

  offMessageRead(): void {
    if (!this.connection) {
      return;
    }

    this.connection.off('messageRead');
  }

  isConnected(): boolean {
    return this.connection?.state === signalR.HubConnectionState.Connected;
  }

  getConnectionState(): signalR.HubConnectionState | null {
    return this.connection?.state ?? null;
  }
}

export const chatService = new ChatService();
