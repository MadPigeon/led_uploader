import { getConfig } from "../../src/classes/ConfigReader";

export interface Bot {
  forwardMessage(chat_id: number, from_chat_id: number, message_id: number): Promise<void>;
}

interface Chat {
  id: number;
}

interface Message {
  message_id: number;
  chat: Chat
}

export function forwardMessageToAgent(bot: Bot, message: Message): void {
  const agent_chat_id = getConfig().agent_chat_id;
  bot.forwardMessage(agent_chat_id, message.chat.id, message.message_id).catch((error) => console.log(error));
}