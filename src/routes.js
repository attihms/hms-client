import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './components/app';

import LandingPage from './containers/landing_page';
import Signup from './containers/security/signup';
import Login from './containers/security/login';

import EnsureLoggedInContainer from './containers/security/ensure_logged_in_container'
//reservation
import OrdersList from './containers/orders/orders_list';
import OrderNew from './containers/orders/order_new';
import Order from './containers/orders/order';
//room management
import Schedule from './containers/management/schedule';
import Settings from './containers/management/settings';

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ LandingPage } />
    <Route path='login' component={ Login } />
    <Route path='signup' component={ Signup } />
    <Route component={ EnsureLoggedInContainer }>

      <Route path='reservations/'>
        <Route path='overview' component={ OrdersList } />
        <Route path='new' component={ OrderNew } />
        <Route path=':id' component={ OrderNew } />
      </Route>

      <Route path='room_management/'>
        <Route path='schedule' component={ Schedule } />
        <Route path='settings' component={ Settings } />
      </Route>

    </Route>
    <Redirect from='*' to='/reservations/overview' />
  </Route>
)
