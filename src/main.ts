import * as CONFIG from "./app_config.json";
import * as TeleBot from "telebot";


export class BotHandler {
  private _bot: TeleBot;
  constructor() {
    this._bot = new TeleBot({
      token: CONFIG.BOT_TOKEN, // Required. Telegram Bot API token.
      polling: { // Optional. Use polling.
        interval: CONFIG.interval, // Optional. How often check updates (in ms).
        timeout: 0, // Optional. Update polling timeout (0 - short polling).
        limit: CONFIG.limit, // Optional. Limits the number of updates to be retrieved.
        retryTimeout: CONFIG.retryTimeout, // Optional. Reconnecting timeout (in ms).
      }
    });

    this.setBehaviour();
  }

  private setBehaviour() {
    this._bot.on(['/start', '/hello'], (msg) => {
      msg.reply.text('Добрый вечер!');
      console.log(msg);
    });
    this._bot.on(['text'], msg => {
      msg.reply.text('Ваше сообщение: ' + msg.text, { asReply: true });
      console.log(msg);
    });
    this._bot.on(['photo', 'video'], msg => {
      console.log(msg);
      msg.reply.text('Ваше сообщение с фото/видео: ' + msg.caption, { replyToMessage: msg.message_id });
    });
    this._bot.on(['document'], msg => {
      console.log(msg);
      let message: string;
      const attachmentType = msg.document.mime_type.split('/')[0];
      if (['image', 'video'].includes(attachmentType)) {
        message = "Ваше сообщение\n" + msg.caption + "\nсодержит документ.\n";
        message += "Документ относится к типу: " + attachmentType;
      } else {
        message = "Ваше сообщение\n" + msg.caption + "\nСодержит неприемлимый для экрана тип\n" + attachmentType;
      }
      msg.reply.text(message, { replyToMessage: msg.message_id });
    });
  }

  start() {
    this._bot.start();
  }
}

const bot = new BotHandler();
bot.start();
console.log("the bot is started");

let i = 1;
function myLoop() {
  setTimeout(function () {
    console.log('listening' + ".".repeat(i));
    i = ++i % 4;
    if (i < 10) {
      myLoop();
    }
  }, 5000)
}
myLoop();