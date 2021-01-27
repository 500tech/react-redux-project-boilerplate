import network from 'reducers/network';
import { endNetwork, startNetwork } from 'actions/network';

describe('Reducer: Network', () => {
  test('startNetwork: should save pending request', () => {
    const action = startNetwork('posts');
    const result = network(undefined, action);

    expect(result.posts).toEqual(1);
    expect(result).toMatchSnapshot();
  });

  test('endNetwork: should remove finished request', () => {
    const action = endNetwork('posts');
    const initialState = {
      posts: 1
    };
    const result = network(initialState, action);

    expect(result.posts).toEqual(0);
    expect(result).toMatchSnapshot();
  });

  test('startNetwork: should increment pending request with same label', () => {
    const action = startNetwork('posts');
    const initialState = {
      posts: 1
    };

    const secondResult = network(initialState, action);
    expect(secondResult.posts).toEqual(2);
  });

  test('endNetwork: should decrement a request with the same label', () => {
    const action = endNetwork('posts');
    const initialState = {
      posts: 2
    };

    const secondResult = network(initialState, action);
    expect(secondResult.posts).toEqual(1);
  });

  test('endNetwork: should not decrement a label below 0', () => {
    const action = endNetwork('posts');
    const initialState = {
      posts: 0
    };

    const secondResult = network(initialState, action);
    expect(secondResult.posts).toEqual(0);
  });
});
