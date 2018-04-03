import { isLoadingSelector } from 'selectors/network.selectors';

describe('Selectors: Network', () => {
  describe('isLoadingSelector', () => {
    test('return true when loading', () => {
      const state = {
        network: {
          posts: 2
        }
      };
      const result = isLoadingSelector(state, 'posts');

      expect(result).toBe(true);
    });

    test('return false when not loading', () => {
      const state = {
        network: {
          posts: 0
        }
      };
      const result = isLoadingSelector(state, 'posts');

      expect(result).toBe(false);
    });
  });
});
