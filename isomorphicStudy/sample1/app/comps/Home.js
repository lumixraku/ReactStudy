'use strict';

import path from 'path';
import React, { Component, PropTypes } from 'react';
// import Content from '../assets/src/js/home/components/Content.js';
import Layout from './layout.js';
class TTT {
  static hehe = {
    a:1
  }
}

class Home extends Component {

  static propTypes = {
    microdata: PropTypes.object,
    mydata: PropTypes.object
  };

  changeContent = (e) => {
    this.setState({text: e.target.value})
  }

  render() {
    let { microdata, mydata } = this.props;
    let homeJs = `${microdata.styleDomain}/build/js/home.js`;
    let scriptUrls = [homeJs];
    return (
      <Layout
        microdata={microdata}
        scriptUrls={scriptUrls}
        title="demo">
        <div id="demoApp"
          data-microdata={JSON.stringify(microdata)}
          data-mydata={JSON.stringify(mydata)}>
          HomePage from Server
          {
            //<Content mydata={mydata} microdata={microdata} />
          }
          <div className="test">
            <input type="text" onChange={this.changeContent} />
            <div>{this.text}</div>
          </div>
        </div>
      </Layout>
    );
  }
};

module.exports = Home;
