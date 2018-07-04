import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';

import './styles/app.scss';

import 'react-owl-carousel2/lib/styles.css'

import 'bootstrap/dist/css/bootstrap.min.css'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('app') as HTMLElement
);
registerServiceWorker();
