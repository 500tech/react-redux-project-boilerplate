import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { values } from 'lodash/fp';
import styled from '@emotion/styled';

import * as sampleActions from 'sample/sample.actions';
import * as localizationActions from 'actions/localization';
import { makeIsLoadingSelector } from 'selectors/network';

import { State } from 'types/redux';
import { SampleState } from 'sample/sample.reducer';
import { Post } from 'sample/sample.types';

import 'sample/sample-replace-reducer';
import { FormattedMessage } from 'react-intl';

/*
 * Sample component pulling data from server on mount
 */
export const Sample: React.FC<Props> = ({
  fetchPosts,
  isLoading,
  setLocale,
  posts
}) => {
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const renderPost = (post: Post) => (
    <StyledPost key={post.id}>
      <h4>{post.title}</h4>
      <p>{post.body}</p>
    </StyledPost>
  );

  const renderPosts = () => {
    return <div>{values(posts).map(renderPost)}</div>;
  };

  return (
    <StyledContainer>
      <FormattedMessage id="sample.homepage.title" tagName="h1" />
      <FormattedMessage id="sample.homepage.description" tagName="h3" />
      <div>
        Languages:
        <button onClick={() => setLocale('en-US')}>English</button>
        <button onClick={() => setLocale('he-IL')}>עברית</button>
      </div>
      <img
        src="https://www.materialui.co/materialIcons/navigation/refresh_grey_192x192.png"
        alt="refresh"
        onClick={() => fetchPosts()}
      />
      <h2>Posts from remote server</h2>
      {isLoading ? (
        <FormattedMessage id="sample.common.loading" />
      ) : (
        renderPosts()
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  padding: 50px;
  img {
    cursor: pointer;
    width: 35px;
    float: left;
  }
`;

export const StyledPost = styled.div`
  display: inline-block;
  padding: 15px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.5);
  width: 300px;
  height: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 10px;
`;

interface OwnProps {}

interface StateProps {
  posts: SampleState['posts'];
  isLoading: boolean;
}

interface DispatchProps {
  fetchPosts: typeof sampleActions.fetchPosts;
  setLocale: typeof localizationActions.setLocale;
}

export type Props = OwnProps & StateProps & DispatchProps;

type LazyLoadedSampleState = { sample: SampleState };

const makeStateToProps = () => {
  const isLoadingSelector = makeIsLoadingSelector(sampleActions.POSTS_LABEL);

  // If this component didn't need the loading state we could simply write a regular mapStateToProps
  // function as listed below
  return function mapStateToProps(state: State & LazyLoadedSampleState) {
    return {
      posts: state.sample.posts,
      isLoading: isLoadingSelector(state)
    };
  };
};

const mapDispatchToProps: DispatchProps = {
  fetchPosts: sampleActions.fetchPosts,
  setLocale: localizationActions.setLocale
};

export default connect(makeStateToProps(), mapDispatchToProps)(Sample);
