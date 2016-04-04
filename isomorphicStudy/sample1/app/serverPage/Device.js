'use strict';

import path from 'path';
import React, { Component, PropTypes } from 'react';

// import AppRouter from './router.js';
import Layout from './layout';


class Device extends Component {
  //propTypes是import进来的对象
  //static和 其他语言一样  无需new就可以调用
  static propTypes = {
    microdata: PropTypes.object,
    mydata: PropTypes.object,
    isServer: PropTypes.bool
  };

  render() {
    let { microdata, mydata, isServer } = this.props;
    let deviceJs = `${microdata.styleDomain}/build/js/device.js`;
    let scriptUrls = [deviceJs];
    return (
      <Layout
        microdata={microdata}
        scriptUrls={scriptUrls}
        title={"demo"}>
        <div id="demoApp" className="demoApp"
          data-microdata={JSON.stringify(microdata)}
          data-mydata={JSON.stringify(mydata)}>
          {mydata.deviceID}
        </div>
      </Layout>
    );
  }
};

module.exports = Device;