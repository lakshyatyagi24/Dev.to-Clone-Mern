import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Activate from '../auth/Activate';
import ActivateNewEmail from '../auth/ActivateNewEmail';
import Forget from '../auth/Forget';
import Reset from '../auth/Reset';
import PostItemRoute from '../dashboard/PostItemRoute';
import ReadingListRoute from '../dashboard/ReadingListRoute';
import FollowersRoute from '../dashboard/FollowersRoute';
import FollowingsRoute from '../dashboard/FollowingsRoute';
import FollowingTagsRoute from '../dashboard/FollowingTagsRoute';
import PostNew from '../posts/PostNew';
import PostEdit from '../posts/PostEdit';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import Account from '../profile/Account';
import Profile from '../profile/Profile';
import TagsDashBoard from '../tags/TagsDashBoard';
import Me from '../profile/Me';
import TagHome from '../tags/TagHome';
import SignOut from '../../components/layout/SignOut';
import UserProfile from '../profile/UserProfile';
import PrivateRoute from '../routing/PrivateRoute';
import NotifyHome from '../notifications/NotifyHome';
import Search from '../search/Search';

import { ToastContainer } from 'react-toastify';

const Routes = () => {
  return (
    <section className='main'>
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Posts} />
        <Route exact path='/dev/search' component={Search} />
        <Route exact path='/tags/:id/:name' component={TagHome} />
        <Route exact path='/tags' component={TagsDashBoard} />
        <Route exact path='/post/:id' component={Post} />
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
        <Route exact path='/profile/user/:id' component={UserProfile} />
        <PrivateRoute exact path='/signout_confirm' component={SignOut} />
        <PrivateRoute exact path='/profile/me' component={Me} />
        <PrivateRoute exact path='/dashboard' component={PostItemRoute} />
        <PrivateRoute
          exact
          path='/dashboard/reading-list'
          component={ReadingListRoute}
        />
        <PrivateRoute
          exact
          path='/dashboard/followers'
          component={FollowersRoute}
        />
        <PrivateRoute
          exact
          path='/dashboard/followings'
          component={FollowingsRoute}
        />
        <PrivateRoute
          exact
          path='/dashboard/following-tags'
          component={FollowingTagsRoute}
        />
        <PrivateRoute exact path='/settings' component={Profile} />
        <PrivateRoute exact path='/notifications' component={NotifyHome} />
        <PrivateRoute exact path='/settings/user/profile' component={Profile} />
        <PrivateRoute exact path='/settings/user/account' component={Account} />
        <PrivateRoute exact path='/write-post' component={PostNew} />
        <PrivateRoute exact path='/write-post/edit/:id' component={PostEdit} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
