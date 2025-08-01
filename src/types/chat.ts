export interface Message {
  role: 'user' | 'assistant';
  content: string;
  id?: number;
  text?: string;
  warning?: boolean;
  success?: boolean;
  timestamp?: Date;
  isStreaming?: boolean;
  messageId?: any;
}
