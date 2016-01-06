import { Route, IndexRoute } from 'react-router';
import CoreLayout            from 'layouts/CoreLayout';
import HomeView              from 'views/HomeView';
import Login                 from 'components/Login';
import AuthSpinner           from 'components/AuthSpinner';

export default (
  <Route        component={CoreLayout} path='/'>
    <IndexRoute component={HomeView} />
    <Route component={Login} path ='/sign-in' />
    <Route component={AuthSpinner} path='/fetch-user' />
  </Route>
);
