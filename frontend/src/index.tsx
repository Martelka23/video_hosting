import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import env from 'react-dotenv';

import './index.css';
import App from './App';
import store from './store';


// console.log(env.REACT_APP_API_URL)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);