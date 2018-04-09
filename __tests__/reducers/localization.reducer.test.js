import localizationReducer from 'reducers/localization.reducer';
import { setLocale } from 'actions/localization.actions';

describe('Reducer: Localization', () => {
  test('should set locale', () => {
    const action = setLocale('en-US');
    const result = localizationReducer(undefined, action);

    expect(result).toMatchSnapshot();
  });
});
