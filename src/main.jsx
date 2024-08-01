import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store';
import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';  // Import toastify CSS
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>,
  document.getElementById('root')
);
