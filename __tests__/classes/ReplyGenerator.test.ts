import { replyToText, replyToHello, photoAccepted, videoAccepted } from '../../src/classes/ReplyGenerator';
import {getConfig} from '../../src/classes/ConfigReader'

test('config has helloMessage', () => {
    expect(getConfig().helloMessage.length > 0).toEqual(true);
});

test('replyToHello returns explanation with no arguments', () => {
    expect(replyToHello()).toEqual(getConfig().helloMessage);
});

test('ReplyGenerator answers /hello and /start message', () => {
    const message_hello = "/hello";
    const message_start = "/start";

    const hello_reply = replyToText(message_hello);
    const start_reply = replyToText(message_start);
    expect(hello_reply).toEqual(getConfig().helloMessage);
    expect(start_reply).toEqual(getConfig().helloMessage);
});

test('ReplyGenerator answerers to text with non-empty string', () => {
    const message = "/hello";

    const reply = replyToText(message);
    expect(reply.length > 0).toEqual(true);
});

test('ReplyGenerator answerers to text with explanation', () => {
    const message = "Подскажите, что можно сделать?";
    const expectedReply = getConfig().textExcuise + "\n" + getConfig().helloMessage;

    const reply = replyToText(message);
    expect(reply).toEqual(expectedReply);
});

test('extractVideo answerPhoto exists', () => {
    expect(typeof photoAccepted === 'function').toEqual(true);
});

test('ReplyGenerator answer thanks for the sent photo', () => {
    const expectedResponse = "Фотография у нас. Спасибо за отправку.\nМодератор проанализирует файл и он отобразится на экране.";
    expect(photoAccepted()).toEqual(expectedResponse);
});

test('ReplyGenerator answer thanks for the sent video', () => {
    const expectedResponse = "Видео у нас. Спасибо за отправку.\nМодератор проанализирует файл и он отобразится на экране.";
    expect(videoAccepted()).toEqual(expectedResponse);
});