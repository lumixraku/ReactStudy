/**!
 * react-server-koa-simple - app/views/Device.js
 * page of device
 *
 * Copyright(c) Alibaba Group Holding Limited.
 *
 * Authors:
 *   谋士 <qingliang.hql@alibaba-inc.com>
 */
'use strict';

import path from 'path';

//表示 react 同时导出了 default React  以及 {Componect, Pr....}等子模块
import React, { Component, PropTypes } from 'react';
import Iso from '../assets/src/js/device/Iso.js';
import Default from './layout/Default';

//这里的extends Component 相当于 Device = React.createClass
// // The ES5 way
// var EmbedModal = React.createClass({
//   componentWillMount: function() { … },
// });
// // The ES6+ way
// class EmbedModal extends React.Component {
//   constructor(props) {
//     super(props);
//     // Operations usually carried out in componentWillMount go here
//   }
// }



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
    let deviceJs = `${microdata.styleDomain}/build/${microdata.styleVersion}/js/device.js`;
    let scriptUrls = [deviceJs];
    return (
      <Default
        microdata={microdata}
        scriptUrls={scriptUrls}
        title={"demo"}>
        <div id="demoApp" className="demoApp"
          data-microdata={JSON.stringify(microdata)}
          data-mydata={JSON.stringify(mydata)}>
          <Iso
            microdata={microdata}
            mydata={mydata}
            isServer={isServer} />
        </div>
      </Default>
    );
  }
};

module.exports = Device;
