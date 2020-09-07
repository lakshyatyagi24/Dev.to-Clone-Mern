import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Activate from '../auth/Activate';
import ActivateNewEmail from '../auth/ActivateNewEmail';
import Forget from '../auth/Forget';
import Reset from '../auth/Reset';
import Dashboard from '../dashboard/Dashboard';
import PostNew from '../posts/PostNew';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import Account from '../profile/Account';
import Profile from '../profile/Profile';
import PrivateRoute from '../routing/PrivateRoute';
import { ToastContainer } from 'react-toastify';

const Routes = (props) => {
  return (
    <section className='container'>
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Posts} />
        <Route exact path='/:name/:id' component={Post} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/users/activate/:token' component={Activate} />
        <Route
          exact
          path='/users/verify-email/:token'
          component={ActivateNewEmail}
        />
        <Route exact path='/users/password/forget' component={Forget} />
        <Route exact path='/users/password/reset/:token' component={Reset} />
        {/* <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/user/:id' component={Profile} /> */}
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/settings' component={Profile} />
        <PrivateRoute exact path='/settings/user/profile' component={Profile} />
        <PrivateRoute exact path='/settings/user/account' component={Account} />
        <PrivateRoute exact path='/write-post' component={PostNew} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
