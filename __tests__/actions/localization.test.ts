import { setLocale } from 'actions/localization';

describe('Actions: localization', () => {
  test('setLocale', () => {
    expect(setLocale('en-US')).toMatchSnapshot();
  });
});
