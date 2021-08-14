import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import App from '@/App';
import rootReducer from '@modules';
import theme from '@theme';
import { GlobalStyle } from '@theme/GlobalStyle';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
