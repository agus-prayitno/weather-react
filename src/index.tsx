import { createRoot } from 'react-dom/client';
import App from './components/App';

import './styles/app.scss';

import 'bootstrap/dist/css/bootstrap.min.css'

import registerServiceWorker from './registerServiceWorker';

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <App />
);
registerServiceWorker();
