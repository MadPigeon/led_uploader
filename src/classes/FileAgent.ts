import { getAgentConfig } from "../../src/classes/ConfigReader";

export interface Bot {
  forwardMessage(chat_id: number, from_chat_id: number, message_id: number): void;
}

interface Chat {
  id: number;
}

interface Message {
  message_id: number;
  chat: Chat
}

export function forwardMessageToAgent(bot: Bot, message: Message): void {
  getAgentConfig();
  bot.forwardMessage(0, message.chat.id, message.message_id);
  return undefined;
}