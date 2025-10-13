import { HubConnectionBuilder, HubConnection, HttpTransportType, LogLevel } from '@microsoft/signalr';

export class ChatClient {
  private connection: HubConnection | null = null;

  async connect(baseUrl: string, getToken: () => Promise<string> | string) {
    const accessTokenFactory = async () => typeof getToken === 'function' ? await getToken() : '';
    this.connection = new HubConnectionBuilder()
      .withUrl(`${baseUrl}/hubs/chat`, {
        accessTokenFactory,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    await this.connection.start();
  }

  onMessageReceived(handler: (payload: any) => void) {
    this.connection?.on('messageReceived', (payload) => handler(payload));
  }

  onMessageRead(handler: (payload: any) => void) {
    this.connection?.on('messageRead', (payload) => handler(payload));
  }

  async joinConversation(conversationId: number) {
    await this.connection?.invoke('JoinConversation', conversationId);
  }

  async leaveConversation(conversationId: number) {
    await this.connection?.invoke('LeaveConversation', conversationId);
  }

  async sendMessage(conversationId: number, content: string) {
    await this.connection?.invoke('SendMessage', conversationId, content);
  }

  async markRead(conversationId: number, messageId: number) {
    await this.connection?.invoke('MarkRead', conversationId, messageId);
  }

  async disconnect() {
    await this.connection?.stop();
    this.connection = null;
  }
}


