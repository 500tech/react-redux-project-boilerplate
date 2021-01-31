import React, { lazy, Suspense } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Router, Switch } from 'react-router-dom';
import { Route } from 'react-router';
import { Provider } from 'react-redux';

import store from 'store';
import history from 'utils/history';
// import { theme } from 'constants/themes.constants';

import Localization from 'components/localization'; // TODO: remove if no localization
import Layout from 'components/layout/layout';
import Loading from 'sample/loading';
import Sample from 'sample/sample'; // TODO: replace this with actual component
import { GlobalStyles } from 'components/global-styles';

const Lazy = lazy(() => import('sample/lazy'));

function App() {
  return (
    <Provider store={store}>
      <Localization>
        {/*<ThemeProvider theme={theme}>*/}
        <GlobalStyles />
        <Router history={history}>
          <Layout>
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/" name="sample" component={Sample} />
                <Route path="/lazy" name="lazy" component={Lazy} />
              </Switch>
            </Suspense>
          </Layout>
        </Router>
        {/*</ThemeProvider>*/}
      </Localization>
    </Provider>
  );
}

export default App;
