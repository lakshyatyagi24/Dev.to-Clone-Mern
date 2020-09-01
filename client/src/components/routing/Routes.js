import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Activate from '../auth/Activate';
import Forget from '../auth/Forget';
import Reset from '../auth/Reset';
import Dashboard from '../dashboard/Dashboard';
import ProfileForm from '../profile-forms/ProfileForm';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import { ToastContainer } from 'react-toastify';

const Routes = (props) => {
  return (
    <section className='container'>
      <ToastContainer />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <Route
          path='/users/activate/:token'
          exact
          render={(props) => <Activate {...props} />}
        />
        <Route
          path='/users/password/forget'
          exact
          render={(props) => <Forget {...props} />}
        />
        <Route
          path='/users/password/reset/:token'
          exact
          render={(props) => <Reset {...props} />}
        />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={ProfileForm} />
        <PrivateRoute exact path='/edit-profile' component={ProfileForm} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <Route exact path='/posts' component={Posts} />
        <Route exact path='/posts/:id' component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
