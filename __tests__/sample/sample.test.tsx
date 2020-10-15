import React from 'react';
import { shallow, mount } from 'enzyme';

import { Props, Sample, StyledPost } from 'sample/sample';
import { act } from 'react-dom/test-utils';

// mock the injection of the reducer into the application as we don't run
// tests with any reference to the store
// this is only done for sample and should not be used in a regular application
jest.mock('sample/sample-replace-reducer', () => {});

const setup = ({
  posts = [],
  isLoading = false,
  fetchPosts = jest.fn(),
  setLocale = jest.fn()
}: Partial<Props> = {}) => ({
  posts,
  isLoading,
  fetchPosts,
  setLocale
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
      { id: 1, title: 'first post', body: 'first post content', userId: 1 },
      { id: 2, title: 'second post', body: 'second post content', userId: 2 },
      { id: 3, title: 'third post', body: 'third post content', userId: 3 }
    ];
    const props = setup({ posts });
    const component = shallow(<Sample {...props} />);

    const postsCount = component.find(StyledPost).length;

    expect(postsCount).toEqual(3);
    expect(component).toMatchSnapshot();
  });

  test('should fetch posts when mounting', () => {
    const props = setup({ fetchPosts: jest.fn() });
    mount(<Sample {...props} />);

    expect(props.fetchPosts).toHaveBeenCalled();
  });

  test('should fetch posts when clicking refresh button', () => {
    const props = setup({ fetchPosts: jest.fn() });
    const component = mount(<Sample {...props} />);

    // We check that fetch posts have been called once already as it is run in componentDidMount
    expect(props.fetchPosts).toHaveBeenCalledTimes(1);

    act(() => {
      component.find('[alt="refresh"]').simulate('click');
      expect(props.fetchPosts).toHaveBeenCalledTimes(2);
    });
  });
});
