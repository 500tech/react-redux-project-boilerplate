import { fetchPosts, setPosts } from 'sample/sample.actions';

describe('Actions: sample', () => {
  const posts = [{ id: 1, title: 'test' }];

  test('fetchPosts: should create API action', () => {
    const action = fetchPosts();

    expect(action).toMatchSnapshot();
  });

  test('fetchPosts: should fire setPosts with payload', () => {
    const action = fetchPosts();

    const nextAction = action.payload.onSuccess(posts);
    expect(nextAction).toEqual(setPosts(posts));
  });

  test('setPosts: should create action', () => {
    const action = setPosts(posts);

    expect(action).toMatchSnapshot();
  });
});
