import { startNetwork, endNetwork } from 'actions/network';

describe('Actions: network', () => {
  test('startNetwork', () => {
    expect(startNetwork('posts')).toMatchSnapshot();
  });

  test('endNetwork', () => {
    expect(endNetwork('posts')).toMatchSnapshot();
  });
});
