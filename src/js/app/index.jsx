import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import MainNav from 'app/components/main_nav';
import MainPage from 'app/components/main_page';
import SettingsPage from 'app/components/settings_page';


export default function App() {
  return (
    <Router>
      <Container>
        <MainNav />

        <Switch>
          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}
