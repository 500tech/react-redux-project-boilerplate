import { setUserToken } from 'actions/user.actions';

describe('Actions: user', () => {
  test('setUserToken', () => {
    expect(setUserToken('token')).toMatchSnapshot();
  });
});
