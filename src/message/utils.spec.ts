import { checkMessagePrefix } from './utils';

describe('test checkPrefix', () => {
  const prefix = 'bot';
  test('correct prefix', () => {
    expect(checkMessagePrefix(prefix, 'bot ping')).toEqual('ping');
    expect(checkMessagePrefix(prefix, 'bot echo hello')).toEqual('echo hello');
  });
  test('incorrect prefix', () => {
    expect(() => checkMessagePrefix(prefix, 'b ping')).toThrowError();
  });
});
