import { fetchPosts, setPosts } from 'sample/sample.actions';
import { Post } from '../../src/sample/sample.types';

describe('Actions: sample', () => {
  const posts: Post[] = [{ id: 1, title: 'test', body: 'test', userId: 1 }];

  test('fetchPosts: should create API action', () => {
    const action = fetchPosts();

    expect(action).toMatchSnapshot();
  });

  test('fetchPosts: should fire setPosts with payload', () => {
    const action = fetchPosts();

    if (action.payload.onSuccess && !Array.isArray(action.payload.onSuccess)) {
      const nextAction = action.payload.onSuccess(posts);
      expect(nextAction).toEqual(setPosts(posts));
    }
  });

  test('setPosts: should create action', () => {
    const action = setPosts(posts);

    expect(action).toMatchSnapshot();
  });
});
