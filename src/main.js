"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CONFIG = require("./app_config.json");
const TeleBot = require("telebot");
const bot = new TeleBot({
    token: CONFIG.BOT_TOKEN,
    polling: {
        interval: CONFIG.interval,
        timeout: 0,
        limit: CONFIG.limit,
        retryTimeout: CONFIG.retryTimeout, // Optional. Reconnecting timeout (in ms).
    }
});
bot.on(msg => {
    msg.reply.text(msg.text);
    console.log(msg);
});
bot.start();
//# sourceMappingURL=main.js.map