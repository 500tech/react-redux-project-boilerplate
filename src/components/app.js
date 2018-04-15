// @flow
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import { Route } from 'react-router';
import { Provider } from 'react-redux';

import history from 'utils/history.utils';
// TODO: remove if no need for Lazy load routes:
import lazyLoad from 'utils/lazy-load.utils';

import store from 'store';
import theme from 'constants/themes.constants';

import Localization from 'components/localization'; // TODO: remove if no localization
import Layout from 'components/layout/layout';
import Sample from 'sample/sample'; // TODO: replace this with actual component

class App extends React.Component<{||}> {
  render() {
    return (
      <Provider store={store}>
        <Localization>
          <ThemeProvider theme={theme}>
            <Router history={history}>
              <Layout>
                <Route exact path="/" name="sample" component={Sample} />
                <Route
                  path="/lazy"
                  name="lazy"
                  component={lazyLoad(() => import('sample/lazy'))}
                />
              </Layout>
            </Router>
          </ThemeProvider>
        </Localization>
      </Provider>
    );
  }
}

export default App;
