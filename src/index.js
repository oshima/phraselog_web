import 'babel-polyfill';
import 'current-device';
import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from '~/reducers';
import Root from '~/containers';
import { setupAuth } from '~/auth';
import { setCssBaseline } from '~/style';

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

setupAuth(store.dispatch);

setCssBaseline();

render(<App />, document.getElementById('app'));
