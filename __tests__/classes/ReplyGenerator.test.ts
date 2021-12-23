import { ReplyGenerator } from '../../src/classes/ReplyGenerator';
import * as CONFIG from "../../src/app_config.json"

test('ReplyGenerator can be created', () => {
    const created = new ReplyGenerator();
    expect(created != undefined).toBe(true);
});

test('config has helloMessage', () => {
    expect(CONFIG.helloMessage.length > 0).toEqual(true);
});

test('replyToHello returns explanation with no arguments', () => {
    const answer = new ReplyGenerator();
    expect(answer.replyToHello()).toEqual(CONFIG.helloMessage);
});

test('ReplyGenerator answers /hello and /start message', () => {
    const answer = new ReplyGenerator();
    const message_hello = "/hello";
    const message_start = "/start";

    const hello_reply = answer.replyToText(message_hello);
    const start_reply = answer.replyToText(message_start);
    expect(hello_reply).toEqual(CONFIG.helloMessage);
    expect(start_reply).toEqual(CONFIG.helloMessage);
});

test('ReplyGenerator answerers to text with non-empty string', () => {
    const answer = new ReplyGenerator();
    const message = "/hello";

    const reply = answer.replyToText(message);
    expect(reply.length > 0).toEqual(true);
});

test('ReplyGenerator answerers to text with explanation', () => {
    const replyAgent = new ReplyGenerator();
    const message = "Подскажите, что можно сделать?";
    const expectedReply = CONFIG.textExcuise + "\n" + CONFIG.helloMessage;

    const reply = replyAgent.replyToText(message);
    expect(reply).toEqual(expectedReply);
});

test('extractVideo answerPhoto exists', () => {
    expect(typeof new ReplyGenerator().photoAccepted === 'function').toEqual(true);
});

test('ReplyGenerator answer thanks for the sent photo', () => {
    const replyAgent = new ReplyGenerator();
    const expectedResponse = "Фотография у нас. Спасибо за отправку.\nМодератор проанализирует файл и он отобразится на экране.";
    expect(replyAgent.photoAccepted()).toEqual(expectedResponse);
});

test('ReplyGenerator answer thanks for the sent video', () => {
    const replyAgent = new ReplyGenerator();
    const expectedResponse = "Видео у нас. Спасибо за отправку.\nМодератор проанализирует файл и он отобразится на экране.";
    expect(replyAgent.videoAccepted()).toEqual(expectedResponse);
});