import * as FileAgent from '../../src/classes/FileAgent';

class BotTester implements FileAgent.Bot {
  public chat_id: number;
  public from_chat_id: number;
  public message_id: number;

  forwardMessage(chat_id: number, from_chat_id: number, message_id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const success = true;
      this.chat_id = chat_id;
      this.from_chat_id = from_chat_id;
      this.message_id = message_id;
      if (success) {
        resolve();
      } else {
        reject();
      }
    });
  }
}

test('forwardMessageToAgent forwards message', () => {
  const bot = new BotTester();
  const from_chat_id = 45;
  const message_id = 9002;
  const message = { message_id: message_id, 'chat': { id: from_chat_id } };

  FileAgent.forwardMessageToAgent(bot, message)

  expect(bot.message_id).toEqual(message_id);
  expect(bot.from_chat_id).toEqual(from_chat_id);
});