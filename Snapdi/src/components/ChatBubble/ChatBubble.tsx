import { useState, useEffect, useRef, useCallback } from 'react';
import { Send, X, MessageCircle, Minus } from 'lucide-react';
import { chatService, type MessageReceivedEvent } from '../../services/chatService';
import { conversationService } from '../../services/conversationService';
import { useUserStore } from '../../config/zustand';
import { toast } from 'react-toastify';
import './ChatBubble.css';

interface Message {
  id: number;
  content: string;
  senderId: number;
  senderName: string;
  sendAt: Date;
  isOwn: boolean;
}

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { user, getToken } = useUserStore();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMessageReceived = useCallback((data: MessageReceivedEvent) => {
    const currentUserId = user?.id;
    const newMessage: Message = {
      id: data.messageId,
      content: data.content,
      senderId: data.senderId,
      senderName: data.senderId === currentUserId ? 'Bạn' : 'Admin',
      sendAt: new Date(data.sendAt),
      isOwn: data.senderId === currentUserId,
    };

    setMessages((prev) => [...prev, newMessage]);
  }, [user?.id]);

  const loadMessageHistory = useCallback(async (conversation: number) => {
    try {
      const history = await conversationService.getMessages(conversation, undefined, 50);
      const currentUserId = user?.id;
      const formattedMessages: Message[] = history.map((item) => ({
        id: item.messageId,
        content: item.content,
        senderId: item.senderId,
        senderName: item.senderId === currentUserId ? 'Bạn' : 'Admin',
        sendAt: new Date(item.sendAt),
        isOwn: item.senderId === currentUserId,
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Failed to load message history:', error);
      toast.error('Không thể tải lịch sử tin nhắn');
    }
  }, [user?.id]);

  const connectToChat = useCallback(async (): Promise<number | null> => {
    const token = getToken();
    if (!token) {
      toast.error('Vui lòng đăng nhập để sử dụng chat');
      setIsOpen(false);
      return null;
    }

    setIsConnecting(true);
    try {
      const adminConversationId = await conversationService.getOrCreateAdminConversation();
      setConversationId(adminConversationId);

      await loadMessageHistory(adminConversationId);

      await chatService.connect(token);
      await chatService.joinConversation(adminConversationId);

      chatService.offMessageReceived();
      chatService.onMessageReceived(handleMessageReceived);

      return adminConversationId;
    } catch (error) {
      console.error('Failed to connect to chat:', error);
      toast.error('Không thể kết nối đến chat');
      return null;
    } finally {
      setIsConnecting(false);
    }
  }, [getToken, handleMessageReceived, loadMessageHistory]);

  useEffect(() => {
    if (!isOpen || !user) {
      return undefined;
    }

    let joinedConversationId: number | null = null;
    let isActive = true;

    const initialise = async () => {
      const conversation = await connectToChat();
      if (!isActive && conversation) {
        void chatService.leaveConversation(conversation);
        chatService.offMessageReceived();
        return;
      }
      joinedConversationId = conversation;
    };

    void initialise();

    return () => {
      isActive = false;
      if (joinedConversationId) {
        void chatService.leaveConversation(joinedConversationId);
      }
      chatService.offMessageReceived();
    };
  }, [isOpen, user, connectToChat]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !conversationId) return;

    try {
      await chatService.sendMessage(conversationId, inputMessage.trim());
      setInputMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Không thể gửi tin nhắn');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    if (!user) {
      toast.warning('Vui lòng đăng nhập để sử dụng chat');
      return;
    }
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="chat-bubble-button"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`chat-window ${isMinimized ? 'minimized' : ''}`}>
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-title">
              <MessageCircle size={20} />
              <span>Chat với Admin</span>
            </div>
            <div className="chat-header-actions">
              <button
                onClick={toggleMinimize}
                className="chat-header-btn"
                aria-label="Minimize"
              >
                <Minus size={18} />
              </button>
              <button
                onClick={closeChat}
                className="chat-header-btn"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="chat-messages">
                {isConnecting ? (
                  <div className="chat-loading">
                    <div className="spinner"></div>
                    <p>Đang kết nối...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="chat-empty">
                    <MessageCircle size={48} opacity={0.3} />
                    <p>Chưa có tin nhắn nào</p>
                    <p className="text-sm">Gửi tin nhắn đầu tiên của bạn!</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`chat-message ${message.isOwn ? 'own' : 'other'}`}
                    >
                      <div className="message-content">
                        {!message.isOwn && (
                          <div className="message-sender">{message.senderName}</div>
                        )}
                        <div className="message-text">{message.content}</div>
                        <div className="message-time">
                          {new Date(message.sendAt).toLocaleTimeString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="chat-input-container">
                <input
                  type="text"
                  className="chat-input"
                  placeholder="Nhập tin nhắn..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isConnecting || !conversationId}
                />
                <button
                  onClick={handleSendMessage}
                  className="chat-send-button"
                  disabled={!inputMessage.trim() || isConnecting || !conversationId}
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBubble;
