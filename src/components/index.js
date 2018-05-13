import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Appbar from '~/containers/Appbar';
import Home from '~/containers/Home';
import Profile from '~/containers/Profile';
import Toolbar from '~/containers/Toolbar';
import Seekbar from '~/containers/Seekbar';
import Chart from '~/containers/Chart';
import Notificator from '~/containers/Notificator';
import Space from '~/components/Space';
import Border from '~/components/Border';
import { getHistory } from '~/history';

function Root() {
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
            <React.Fragment>
              <Toolbar />
              <Space />
              <Seekbar />
              <Chart />
            </React.Fragment>
          </Route>
          <Route exact path="/:id_string">
            <React.Fragment>
              <Toolbar />
              <Space />
              <Seekbar />
              <Chart />
            </React.Fragment>
          </Route>
          <Route>
            <h1>Not found</h1>
          </Route>
        </Switch>
      </Router>
      <Notificator />
    </React.Fragment>
  );
}

export default Root;
