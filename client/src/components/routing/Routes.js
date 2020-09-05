import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Activate from '../auth/Activate';
import Forget from '../auth/Forget';
import Reset from '../auth/Reset';
import Dashboard from '../dashboard/Dashboard';
import PostNew from '../posts/PostNew';
import ProfileForm from '../profile-forms/ProfileForm';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import Setting from '../profile/Setting';
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
        <Route exact path='/users/password/forget' component={Forget} />
        <Route exact path='/users/password/reset/:token' component={Reset} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/user/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/settings' component={Setting} />
        <PrivateRoute exact path='/write-post' component={PostNew} />
        <PrivateRoute exact path='/create-profile' component={ProfileForm} />
        <PrivateRoute exact path='/edit-profile' component={ProfileForm} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
