import * as CONFIG from "../app_config.json"

export class ReplyGenerator {
    replyToText(message : string) : string {
        if (['/hello', '/start'].includes(message))
            return this.replyToHello();
        return CONFIG.textExcuise + "\n" +  CONFIG.helloMessage;
    }

    replyToHello() {
        return CONFIG.helloMessage;
    }

    private acceptedMediaType(media_type : string) : string {
        return `${media_type} у нас. Спасибо за отправку.\nМодератор проанализирует файл и он отобразится на экране.`;
    }
    
    photoAccepted() {
        return this.acceptedMediaType("Фотография");
    }
    
    videoAccepted() {
        return this.acceptedMediaType("Видео");
    }
}