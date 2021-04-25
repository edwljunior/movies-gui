import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Movies from '../pages/Movies';

const Routes: React.FunctionComponent = () => (
  <Switch>
    <Route path="/" exact >
      <Movies />
    </Route>
  </Switch>
)

export default Routes;
