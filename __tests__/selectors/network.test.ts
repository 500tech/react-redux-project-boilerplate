import { makeIsLoadingSelector } from 'selectors/network';

describe('Selectors: Network', () => {
  describe('isLoadingSelector', () => {
    test('return true when loading', () => {
      const state = {
        network: {
          posts: 2
        }
      };

      const isLoadingSelector = makeIsLoadingSelector('posts');

      // ignored as we don't want to include the entire state in our test
      // @ts-ignore
      const result = isLoadingSelector(state);

      expect(result).toBe(true);
    });

    test('return false when not loading', () => {
      const state = {
        network: {
          posts: 0
        }
      };

      const isLoadingSelector = makeIsLoadingSelector('posts');

      // ignored as we don't want to include the entire state in our test
      // @ts-ignore
      const result = isLoadingSelector(state);

      expect(result).toBe(false);
    });
  });
});
