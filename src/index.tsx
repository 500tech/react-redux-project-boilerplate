import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/app';
// import registerServiceWorker from './register-service-worker';

if (process.env.NODE_ENV === 'development') {
  require('components/debug/debug-menu');

  // TODO: change to app name
  const Mimic = require('mimic').default;
  Mimic.setAppName('MyApp');
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// registerServiceWorker();
