import React, { Suspense, lazy } from 'react';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router';
import { Provider } from 'react-redux';

import store from 'store';
import { theme } from 'constants/themes.constants';

import Localization from 'components/localization'; // TODO: remove if no localization
import Layout from 'components/layout/layout';
import Loading from 'sample/loading';
import Sample from 'sample/sample'; // TODO: replace this with actual component

const Lazy = lazy(() => import('sample/lazy'));

class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Localization>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Layout>
                <Suspense fallback={<Loading />}>
                  <Switch>
                    <Route exact path="/" name="sample" component={Sample} />
                    <Route path="/lazy" name="lazy" component={Lazy} />
                  </Switch>
                </Suspense>
              </Layout>
            </BrowserRouter>
          </ThemeProvider>
        </Localization>
      </Provider>
    );
  }
}

export default App;
