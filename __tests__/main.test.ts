import { BotHandler } from '../src/main';

test('class is created', () => {
  const bot = new BotHandler();
  expect(bot).toBeInstanceOf(BotHandler);
});