/**!
 * react-server-koa-simple - app/assets/src/js/device/components/AllView.js
 * components of all device
 *
 * Copyright(c) Alibaba Group Holding Limited.
 *
 * Authors:
 *   谋士 <qingliang.hql@alibaba-inc.com>
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import ContentView from './ContentView';

class DeviceView extends Component {
  state = {
    text: ""
  }
  static propTypes = {
    params: PropTypes.object,
  };
  changeContent = (e) => {
    this.setState({text: e.target.value})
  }
  render() {
    let { params } = this.props;
    return (
      <div className="deviceview">
        <h1> Device View </h1>
        <h3>device: {params.deviceID}</h3>
        <ContentView device={params.deviceID} />
        <div className="testevent">
          <input type="text" onChange={this.changeContent} />
          <div className="msg" ref="input" >{this.state.text}</div>
        </div>
      </div>
    );
  }
}

export default DeviceView;
