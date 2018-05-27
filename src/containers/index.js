import React from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Appbar from '~/containers/Appbar';
import Home from '~/containers/Home';
import Profile from '~/containers/Profile';
import Player from '~/containers/Player';
import Toolbar from '~/containers/Toolbar';
import Seekbar from '~/containers/Seekbar';
import Chart from '~/containers/Chart';
import Notificator from '~/containers/Notificator';
import Space from '~/components/Space';
import Border from '~/components/Border';
import { getHistory } from '~/history';

function Root({ signInUser }) {
  return (
    <React.Fragment>
      <Router history={getHistory()}>
        <Switch>
          <Route exact path="/">
            <React.Fragment>
              <Appbar />
              <Space />
              <Border />
              <Home />
            </React.Fragment>
          </Route>
          <Route exact path="/users/:id_string">
            <React.Fragment>
              <Appbar />
              <Space />
              <Border />
              <Profile />
            </React.Fragment>
          </Route>
          <Route exact path="/new">
            {device.type === 'desktop' && signInUser ? (
              <React.Fragment>
                <Toolbar />
                <Space />
                <Seekbar />
                <Chart />
              </React.Fragment>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/:id_string">
            {device.type === 'desktop' ? (
              <React.Fragment>
                <Toolbar />
                <Space />
                <Seekbar />
                <Chart />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Appbar />
                <Space />
                <Border />
                <Player />
              </React.Fragment>
            )}
          </Route>
        </Switch>
      </Router>
      <Notificator />
    </React.Fragment>
  );
}

export default connect(state => ({
  signInUser: state.auth.signInUser
}))(Root);
