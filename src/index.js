import '@babel/polyfill';
import 'current-device';
import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from '~/reducers';
import Root from '~/containers';
import GlobalStyle from '~/components/GlobalStyle';
import { setupAuth } from '~/auth';
import { setupAudio } from '~/audio';

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => (
  <>
    <Provider store={store}>
      <Root />
    </Provider>
    <GlobalStyle />
  </>
);

setupAuth(store.dispatch);
setupAudio();

render(<App />, document.getElementById('app'));
