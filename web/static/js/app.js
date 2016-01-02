// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import 'phoenix';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {syncReduxAndRouter} from 'redux-simple-router';
import routes from 'routes';
import Root from 'containers/Root';
import configureStore from './src/redux/configureStore';

const history = createBrowserHistory();
const store = configureStore(window.__INITIAL_STATE__);

syncReduxAndRouter(history, store, (state) => state.router);

ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
);

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
