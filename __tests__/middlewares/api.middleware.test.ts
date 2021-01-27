import { createMiddlewareDispatcher } from '__tests__/helpers';
import { endNetwork, startNetwork } from 'actions/network';
import { PostsApiResponse } from 'sample/sample.actions';
import apiUtils from 'utils/api';
import middleware from 'middlewares/api';

jest.mock('utils/api', () => {
  return {
    request: jest.fn()
  };
});

describe('Middleware: API', () => {
  let getSpy: jest.Mock, dispatchSpy: jest.Mock, middlewareDispatcher: Function;

  beforeEach(() => {
    dispatchSpy = jest.fn();
    getSpy = jest.fn();
  });

  describe('success response', () => {
    beforeAll(() => {
      middlewareDispatcher = createMiddlewareDispatcher(middleware);
    });

    test('should do nothing if it is not an api action', () => {
      const action = { type: 'SOME_ACTION' };
      middlewareDispatcher(undefined, action, dispatchSpy);

      expect(dispatchSpy).not.toHaveBeenCalled();
    });

    test('should fetch data from server', async () => {
      (apiUtils.request as jest.Mock).mockResolvedValue({ body: 'data' });

      const action = {
        type: 'FETCH_POSTS',
        payload: {
          networkLabel: 'posts',
          method: 'GET',
          baseUrl: 'http://example.com',
          path: 'resource',
          onSuccess: (posts: PostsApiResponse) => ({
            type: 'DATA_ACTION',
            payload: posts
          })
        },
        meta: {
          api: true
        }
      };

      await middlewareDispatcher(undefined, action, dispatchSpy);

      expect(apiUtils.request).toHaveBeenCalledWith({
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
      (apiUtils.request as jest.Mock).mockResolvedValue({ body: 'data' });

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

      expect(apiUtils.request).toHaveBeenCalledWith({
        method: 'GET',
        url: 'http://test.com/resource',
        data: undefined,
        headers: {}
      });
    });
  });

  describe('failure response', () => {
    beforeAll(() => {
      middlewareDispatcher = createMiddlewareDispatcher(middleware);
    });

    test('should fetch data from server', async () => {
      (apiUtils.request as jest.Mock).mockRejectedValue({ body: 'data' });

      const action = {
        type: 'FETCH_POSTS',
        payload: {
          networkLabel: 'posts',
          method: 'GET',
          path: 'resource',
          onError: (err: any) => ({ type: 'ERROR_ACTION', payload: err })
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
