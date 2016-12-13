import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  browserHistory,
  applyRouterMiddleware,
} from 'react-router';
import useRelay from 'react-router-relay';
import App from './components/App/App';
import '../node_modules/react-mdl/extra/material';

const ViewerQuery = {
  viewer: Component => Relay.QL`
    query {
      viewer {
        ${Component.getFragment('viewer')}
      }
    }
  `
};

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

ReactDOM.render((
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}>
    <Route
      path="/"
      component={App}
      queries={ViewerQuery} />
  </Router>
), rootNode);
