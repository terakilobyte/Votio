import { Route, IndexRoute } from 'react-router';
import CoreLayout            from 'layouts/CoreLayout';
import HomeView              from 'views/HomeView';

export default (
  <Route        component={CoreLayout} path='/'>
    <IndexRoute component={HomeView} />
  </Route>
);
