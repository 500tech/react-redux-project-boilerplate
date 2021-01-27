import sampleReducer, { SampleState } from 'sample/sample.reducer';
import { setPosts } from 'sample/sample.actions';
import { Post } from 'sample/sample.types';

describe('Reducer: sample', () => {
  test('should save posts', () => {
    const posts: Post[] = [
      { id: 1, title: 'first post', body: 'first content', userId: 4 }
    ];
    const action = setPosts(posts);
    const result = sampleReducer(undefined, action);

    expect(result.posts['1']).toEqual(posts[0]);
    expect(result).toMatchSnapshot();
  });

  test('should override posts when there are existing posts', () => {
    const initialState: SampleState = {
      posts: {
        '1': {
          body: 'first content',
          id: 1,
          title: 'first post',
          userId: 1
        }
      }
    };
    const posts: Post[] = [
      { id: 2, title: 'second post', body: 'third content', userId: 5 }
    ];
    const action = setPosts(posts);
    const result = sampleReducer(initialState, action);

    expect(result.posts['1']).toBeUndefined();
    expect(result.posts['2'].title).toEqual('second post');

    expect(result).toMatchSnapshot();
  });
});
