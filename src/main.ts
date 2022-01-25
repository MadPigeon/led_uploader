import { getConfig, getAgentConfig } from "./classes/ConfigReader";
import * as TeleBot from "telebot";
import * as ReplyGenerator from "./classes/ReplyGenerator";
import * as FileExtracter from "./classes/FileExtracter";
import * as FileAnalyzer from "./classes/FileAnalyzer";
import * as FileDownloader from "./classes/FileDownloader"


export class BotHandler {
  private _bot: TeleBot;
  constructor() {
    this._bot = new TeleBot({
      token: getConfig().BOT_TOKEN, // Required. Telegram Bot API token.
      polling: { // Optional. Use polling.
        interval: getConfig().interval, // Optional. How often check updates (in ms).
        timeout: getConfig().pollingTimeout, // Optional. Update polling timeout (0 - short polling).
        limit: getConfig().limit, // Optional. Limits the number of updates to be retrieved.
        retryTimeout: getConfig().retryTimeout, // Optional. Reconnecting timeout (in ms).
      }
    });

    this.setBehaviour();
  }

  private setBehaviour() {
    this._bot.on(['/start', '/hello'], (msg) => {
      if (this.isMessageInAgentChat(msg)) {
        return;
      }
      console.log(msg);
      msg.reply.text(ReplyGenerator.replyToHello())
    });
    this._bot.on(['text'], msg => {
      if (this.isMessageInAgentChat(msg) || ['/start', '/hello'].includes(msg.text)) {
        return;
      }
      console.log(msg);
      msg.reply.text(ReplyGenerator.replyToText(msg.text));
    });
    this._bot.on(['photo'], msg => {
      if (this.isMessageInAgentChat(msg)) {
        return;
      }
      console.log(msg);

      const extracted_photo: { file_size: number, file_id: string } = FileExtracter.extractBestQualityPhoto(msg);
      let message: string;
      const response = this.tryDownloadingPhoto(extracted_photo)
      if (response.success) {
        message = ReplyGenerator.photoAccepted();
      } else {
        message = ReplyGenerator.photoRejected(response.reason);
      }
      msg.reply.text(message, { replyToMessage: msg.message_id });
    });
    this._bot.on(['video'], msg => {
      if (this.isMessageInAgentChat(msg)) {
        return;
      }
      console.log(msg);

      const extracted_video: { file_size: number, file_id: string, file_name: string, duration: number } = FileExtracter.extractVideo(msg);
      let message: string;
      const response = this.tryDownloadingVideo(extracted_video);
      if (response.success) {
        message = ReplyGenerator.videoAccepted();
      } else {
        message = ReplyGenerator.videoRejected(response.reason);
      }
      msg.reply.text(message, { replyToMessage: msg.message_id });
    });
    this._bot.on(['document'], msg => {
      if (this.isMessageInAgentChat(msg)) {
        return;
      }
      console.log(msg);
      let message: string;
      const extracted_ducument = FileExtracter.extractDocument(msg);
      const attachmentType = extracted_ducument.mime_type.split('/')[0];
      if (attachmentType === "image") {
        const response = this.tryDownloadingPhoto(msg.document);
        if (response.success) {
          message = ReplyGenerator.photoAccepted();
        } else {
          message = ReplyGenerator.photoRejected(response.reason);
        }
      } else if (attachmentType === "video") {
        const response = this.tryDownloadingVideo(msg.document);
        if (response.success) {
          message = ReplyGenerator.videoAccepted();
        } else {
          message = ReplyGenerator.videoRejected(response.reason);
        }
      } else {
        message = "Ваше сообщение\n" + msg.caption + "\nСодержит неприемлимый для экрана тип\n" + attachmentType;
        message += getConfig().helloMessage;
      }
      msg.reply.text(message, { replyToMessage: msg.message_id });
    });
  }

  // TODO: unite with tryExtractingVideo somehow
  private tryDownloadingPhoto(extracted_photo: { file_size: number, file_id: string }): { success: boolean, reason: ReplyGenerator.RejectedReasons } {
    const result = { success: false, reason: undefined };
    if (!FileAnalyzer.fitsSizeConstraints(extracted_photo.file_size)) {
      result.success = false;
      result.reason = ReplyGenerator.RejectedReasons.FILE_TOO_BIG;
    } else {
      if (FileAnalyzer.requiresFileAgent(extracted_photo.file_size))
      this._bot.getFile(extracted_photo.file_id).then(getFileResponse => {
        console.log("Get file result", getFileResponse);
        const fileName = getFileResponse.file_path.split('/')[1];
        FileDownloader.download(getFileResponse.fileLink, getConfig().folder, fileName);
        console.log(getFileResponse.fileLink);
      });
      result.success = true;
    }
    return result;
  }

  private tryDownloadingVideo(extracted_video: { file_size: number, file_id: string, file_name: string, duration: number }): { success: boolean, reason: ReplyGenerator.RejectedReasons } {
    const result = { success: false, reason: undefined };
    const fitsFileConstraints = FileAnalyzer.fitsSizeConstraints(extracted_video.file_size);
    if (!fitsFileConstraints || !FileAnalyzer.fitsVideoLength(extracted_video.duration)) {
      result.success = false;
      if (!fitsFileConstraints)
        result.reason = ReplyGenerator.RejectedReasons.FILE_TOO_BIG;
      else
        result.reason = ReplyGenerator.RejectedReasons.VIDEO_TOO_LONG;
    } else {
      this._bot.getFile(extracted_video.file_id).then(getFileResponse => {
        console.log("Get file result", getFileResponse);
        FileDownloader.download(getFileResponse.fileLink, getConfig().folder, extracted_video.file_name);
        return getFileResponse.fileLink;
      });
      result.success = true;
    }
    return result;
  }

  private isMessageInAgentChat(msg: { chat: { id: number } }): boolean {
    return getAgentConfig().chat_id == msg.chat.id;
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
    console.log('listening' + ".".repeat(i % 4));
    i = ++i % 16;
    if (i < 17) {
      myLoop();
    }
  }, 5000)
}
myLoop();