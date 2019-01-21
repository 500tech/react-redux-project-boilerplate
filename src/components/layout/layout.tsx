import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <StyledLayout>
    <header>
      <Link to="/">Home</Link>
      <span> | </span>
      <Link to="/lazy">lazy</Link>
    </header>
    {children}
  </StyledLayout>
);

const StyledLayout = styled.div``;

export default Layout;
