import React from 'react';
import { shallow, mount } from 'enzyme';
import { noop } from 'lodash/fp';

import { Sample, StyledPost } from 'sample/sample';

// mock the injection of the reducer into the application as we don't run
// tests with any reference to the store
jest.mock('sample/sample-replace-reducer', () => {});

const setup = ({ posts = [], isLoading = false, fetchPosts = noop } = {}) => ({
  posts,
  isLoading,
  fetchPosts
});

describe('<Sample />', () => {
  test('should render', () => {
    const props = setup();
    const component = shallow(<Sample {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('should render loading when component is in loading state', () => {
    const props = setup({ isLoading: true });
    const component = shallow(<Sample {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('should render 3 posts', () => {
    const posts = [
      { id: 1, title: 'first post', body: 'first post content' },
      { id: 2, title: 'second post', body: 'second post content' },
      { id: 3, title: 'third post', body: 'third post content' }
    ];
    const props = setup({ posts });
    const component = shallow(<Sample {...props} />);

    const postsCount = component.find(StyledPost).length;

    expect(postsCount).toEqual(3);
    expect(component).toMatchSnapshot();
  });

  test('should fetch posts when mounting', () => {
    const props = setup({ fetchPosts: jest.fn() });
    shallow(<Sample {...props} />);

    expect(props.fetchPosts).toHaveBeenCalled();
  });

  test('should fetch posts when clicking refresh button', () => {
    const props = setup({ fetchPosts: jest.fn() });
    const component = shallow(<Sample {...props} />);

    // We check that fetch posts have been called once already as it is run in componentDidMount
    expect(props.fetchPosts).toHaveBeenCalledTimes(1);

    component.find('img').simulate('click');

    expect(props.fetchPosts).toHaveBeenCalledTimes(2);
  });
});
