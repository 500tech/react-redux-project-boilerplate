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
          networkLabel: 'posts',
          method: 'GET',
          baseUrl: 'http://example.com',
          path: 'resource',
          onSuccess: posts => ({ type: 'DATA_ACTION', payload: posts })
        },
        meta: {
          api: true
        }
      };

      await middlewareDispatcher(undefined, action, dispatchSpy);

      expect(apiSpy).toHaveBeenCalledWith({
        method: 'GET',
        url: 'http://example.com/resource',
        data: undefined,
        headers: {}
      });
      expect(dispatchSpy.mock.calls[0]).toEqual([startNetwork('posts')]);
      expect(dispatchSpy.mock.calls[1]).toEqual([
        { type: 'DATA_ACTION', payload: 'data' }
      ]);
      expect(dispatchSpy.mock.calls[2]).toEqual([endNetwork('posts')]);
    });
    test('should use default baseURL', async () => {
      const action = {
        type: 'FETCH_POSTS',
        payload: {
          networkLabel: 'posts',
          method: 'GET',
          path: 'resource'
        },
        meta: {
          api: true
        }
      };

      await middlewareDispatcher(undefined, action, dispatchSpy);

      expect(apiSpy).toHaveBeenCalledWith({
        method: 'GET',
        url: 'http://test.com/resource',
        data: undefined,
        headers: {}
      });
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
          networkLabel: 'posts',
          method: 'GET',
          path: 'resource',
          onError: err => ({ type: 'ERROR_ACTION', payload: err })
        },
        meta: {
          api: true
        }
      };

      await middlewareDispatcher(undefined, action, dispatchSpy);

      expect(dispatchSpy.mock.calls[0]).toEqual([startNetwork('posts')]);
      expect(dispatchSpy.mock.calls[1]).toEqual([
        { type: 'ERROR_ACTION', payload: { body: 'data' } }
      ]);
      expect(dispatchSpy.mock.calls[2]).toEqual([endNetwork('posts')]);
    });
  });
});
