'use strict';

import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
  IndexRedirect,
  browserHistory,
  createMemoryHistory
} from 'react-router'

import Nav from './nav.js';
import DeviceView from './Device.js';
// import ContentView from './comps/DeviceContent.js';

class AppRouter extends Component {
  static propTypes = {
    isServer: PropTypes.bool,
    microdata: PropTypes.object,
    mydata: PropTypes.object
  };

   wrapComponent(Component) {
    let { microdata, mydata } = this.props;
    return React.createClass({
      render() {
        return React.createElement(Component, {
          microdata: microdata,
          mydata: mydata  //    mydata: {path: this.path,deviceID: deviceID}
        }, this.props.children);
      }
    });
  }

  render() {
    let { isServer, mydata } = this.props;
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Nav}>
          {/*<IndexRoute component={this.wrapComponent(DeviceView)} />*/}
          {/* //localhost:3000/device/123123     */}
          <Route path="/device/:deviceID" component={DeviceView}/>
        </Route>
      </Router>
    );
  }
}


export default AppRouter;



