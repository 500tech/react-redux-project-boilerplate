import { setLocale } from 'actions/localization.actions';

describe('Actions: localization', () => {
  test('setLocale', () => {
    expect(setLocale('en-US')).toMatchSnapshot();
  });
});
