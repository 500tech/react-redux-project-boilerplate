import { createMiddlewareDispatcher } from '__tests__/helpers';
import { FETCH_POSTS } from 'sample/sample.actions';
import { endNetwork, startNetwork } from 'actions/network.actions';

describe('Middleware: API', () => {
  let getSpy, dispatchSpy, middlewareDispatcher, apiSpy;

  beforeEach(() => {
    dispatchSpy = jest.fn();
    getSpy = jest.fn();
  });

  describe('success response', () => {
    apiSpy = jest.fn().mockResolvedValue({ body: 'data' });

    beforeAll(() => {
      jest.doMock('utils/api.utils', function() {
        return {
          request: apiSpy
        };
      });

      const middleware = require('middlewares/api.middleware').default;
      middlewareDispatcher = createMiddlewareDispatcher(middleware);
    });

    afterAll(() => {
      jest.resetModules();
    });

    test('should do nothing if it is not an api action', () => {
      const action = { type: 'SOME_ACTION' };
      middlewareDispatcher(undefined, action, dispatchSpy);

      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    test('should fetch data from server', async () => {
      const action = {
        type: 'FETCH_POSTS',
        payload: {
          label: 'posts',
          method: 'GET',
          url: 'http://example.com',
          onSuccess: (posts, dispatch) =>
            dispatch({ type: 'DATA_ACTION', payload: posts })
        },
        meta: {
          api: true
        }
      };

      await middlewareDispatcher(undefined, action, dispatchSpy);

      expect(apiSpy).toHaveBeenCalledWith({
        method: 'GET',
        url: 'http://example.com',
        data: undefined,
        headers: {}
      });
      expect(dispatchSpy.mock.calls[0]).toEqual([startNetwork('posts')]);
      expect(dispatchSpy.mock.calls[1]).toEqual([endNetwork('posts')]);
      expect(dispatchSpy.mock.calls[2]).toEqual([
        { type: 'DATA_ACTION', payload: 'data' }
      ]);
    });
  });

  describe('failure response', () => {
    beforeAll(() => {
      jest.doMock('utils/api.utils', function() {
        return {
          request: jest.fn().mockRejectedValue({ body: 'data' })
        };
      });

      const middleware = require('middlewares/api.middleware').default;
      middlewareDispatcher = createMiddlewareDispatcher(middleware);
    });

    afterAll(() => {
      jest.resetModules();
    });

    test('should do nothing if it is not an api action', () => {
      const action = { type: 'SOME_ACTION' };
      middlewareDispatcher(undefined, action, dispatchSpy);

      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    test('should fetch data from server', async () => {
      const action = {
        type: 'FETCH_POSTS',
        payload: {
          label: 'posts',
          method: 'GET',
          url: 'http://example.com',
          onError: (err, dispatch) =>
            dispatch({ type: 'ERROR_ACTION', payload: err })
        },
        meta: {
          api: true
        }
      };

      await middlewareDispatcher(undefined, action, dispatchSpy);

      expect(dispatchSpy.mock.calls[0]).toEqual([startNetwork('posts')]);
      expect(dispatchSpy.mock.calls[1]).toEqual([endNetwork('posts')]);
      expect(dispatchSpy.mock.calls[2]).toEqual([
        { type: 'ERROR_ACTION', payload: { body: 'data' } }
      ]);
    });
  });
});
