import * as CONFIG from "./app_config.json";
import * as TeleBot from "telebot";

// TODO: store list of message ids that have been processed in the last 24 hours

const HELLO_MESSAGE = 'Для использования бота отправьте в этот чат фото или видео размером не более 300 Мб\nМатериалы будут рассмотрены модератором.';

export class BotHandler {
  private _bot: TeleBot;
  constructor() {
    this._bot = new TeleBot({
      token: CONFIG.BOT_TOKEN, // Required. Telegram Bot API token.
      polling: { // Optional. Use polling.
        interval: CONFIG.interval, // Optional. How often check updates (in ms).
        timeout: CONFIG.pollingTimeout, // Optional. Update polling timeout (0 - short polling).
        limit: CONFIG.limit, // Optional. Limits the number of updates to be retrieved.
        retryTimeout: CONFIG.retryTimeout, // Optional. Reconnecting timeout (in ms).
      }
    });

    this.setBehaviour();
  }

  private setBehaviour() {
    this._bot.on(['/start', '/hello'], (msg) => {
      msg.reply.text(HELLO_MESSAGE);
      console.log(msg);
    });
    this._bot.on(['text'], msg => {
      msg.reply.text('Бот не принимает текст.\n' + HELLO_MESSAGE);
      console.log("text\n" + msg);
    });
    this._bot.on(['photo'], msg => {
      console.log("photo\n" + msg);
      msg.reply.text('Спасибо за отправку фотографии, она будет отправлена на рассмотрение модератору.',
        { replyToMessage: msg.message_id }
      );
    });
    this._bot.on(['video'], msg => {
      console.log("video\n" + msg);
      msg.reply.text('Спасибо за отправку видео, оно будет отправлено на рассмотрение модератору.',
        { replyToMessage: msg.message_id }
      );
    });
    this._bot.on(['document'], msg => {
      console.log("document\n" + msg);
      let message: string;
      const attachmentType = msg.document.mime_type.split('/')[0];
      if (['image', 'video'].includes(attachmentType)) {
        message = "Ваше сообщение содержит документ" + msg.caption + "\n";
        message += "Документ относится к типу: " + attachmentType;
      } else {
        message = "Ваше сообщение\n" + msg.caption + "\nСодержит неприемлимый для экрана тип\n" + attachmentType;
        message += HELLO_MESSAGE;
      }
      msg.reply.text(message, { replyToMessage: msg.message_id });
    });
  }

  getUpdates() {
    return this._bot.getUpdates();
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