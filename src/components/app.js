// @flow
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
// TODO: remove if no need for Lazy load routes:
import Loadable from 'react-loadable';

import history from 'utils/history.utils';
import store from 'store';
import * as themes from 'constants/themes.constants';

import Localization from 'components/localization'; // TODO: remove if no localization
import Layout from 'components/layout/layout';

import Sample from 'sample/sample'; // TODO: replace this with actual component
import Loading from 'sample/loading';

// TODO: remove if no need for Lazy load routes:
const lazyLoad = loader =>
  Loadable({
    loader,
    loading: () => <Loading showLoading={true} />
  });

class App extends React.Component<{||}> {
  render() {
    return (
      <Provider store={store}>
        <Localization>
          <ThemeProvider theme={themes.main}>
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
