import { startNetwork, endNetwork } from 'actions/network.actions';

describe('Actions: network', () => {
  test('startNetwork', () => {
    expect(startNetwork('posts')).toMatchSnapshot();
  });

  test('endNetwork', () => {
    expect(endNetwork('posts')).toMatchSnapshot();
  });
});
