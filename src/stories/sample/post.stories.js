import React from 'react';
import { text } from '@storybook/addon-knobs';
import { StyledPost } from 'sample/sample';
import { FormattedMessage } from 'react-intl';

export default { title: 'Sample' };

export const Post = () => (
  <StyledPost>
    <FormattedMessage id="sample.homepage.title" />
    <h4>{text('Title', 'Post Title')}</h4>
    <p>{text('Description', 'This is the description')}</p>
  </StyledPost>
);
