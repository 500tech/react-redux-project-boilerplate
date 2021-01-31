import localization from 'reducers/localization';
import { setLocale } from 'actions/localization';

describe('Reducer: Localization', () => {
  test('should set locale', () => {
    const action = setLocale('en-US');

    const result = localization(undefined, action);

    expect(result).toMatchSnapshot();
  });
});
