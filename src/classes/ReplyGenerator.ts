import { getConfig } from "./ConfigReader";

export enum RejectedReasons {
    FILE_TOO_BIG = "Размер файла превышает допустимый. В приветственном сообщении указан допустимый объём.",
    VIDEO_TOO_LONG = "Видео слишком продолжительное, в приветственном сообщении указана допустимая длина."
}

enum MediaType {
    Photo = "Фотография",
    Video = "Видео"
}

export function replyToText(message: string): string {
    if (['/hello', '/start'].includes(message))
        return replyToHello();
    return getConfig().textExcuise + "\n" + getConfig().helloMessage;
}

export function replyToHello() {
    return getConfig().helloMessage;
}

export function photoAccepted() {
    return acceptedMediaType(MediaType.Photo);
}

export function videoAccepted() {
    return acceptedMediaType(MediaType.Video);
}

export function photoRejected(reason: RejectedReasons) {
    return rejectedMediaType(MediaType.Photo, reason);
}

export function videoRejected(reason: RejectedReasons) {
    return rejectedMediaType(MediaType.Video, reason);
}

function ending(type: MediaType) {
    switch (type) {
        case MediaType.Photo: { return "а" }
        case MediaType.Video: { return "о" }
        default: { return "" }
    }
}

function acceptedMediaType(media_type: MediaType): string {
    return `${media_type} у нас. Спасибо за отправку.\nМодератор проанализирует файл и он отобразится на экране.`;
}

function rejectedMediaType(media_type: MediaType, reason: RejectedReasons): string {
    return `${media_type} не может быть обработан${ending(media_type)}.\n${reason}`;
}