import { extractPhoto } from '../../src/classes/FileExtracter';

test('function exists', () => {
  expect(typeof extractPhoto === 'function').toEqual(true);
});