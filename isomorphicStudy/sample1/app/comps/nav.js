'use strict';

import React, { Component, PropTypes, cloneElement } from 'react';
import { Link, IndexLink } from 'react-router';


const ACTIVE = { color: 'red'}
class LayoutView extends Component {
  static propTypes = {
    microdata: PropTypes.object,
    mydata: PropTypes.object
  };

  renderChildren() {
    let { microdata, mydata, children } = this.props;
    let items = [];
    React.Children.map(children, function(child, i){
      items.push(cloneElement(child, {
        key: i,
        microdata: microdata,
        mydata: mydata
      }));
    });
    return items;
  }

  render() {
    return (
      <div className="layoutView">
        <h1>Nav</h1>
        <ul>
          <li><Link to="/" activeStyle={ACTIVE}>/Index</Link></li>
          <li><Link to="/device/all" activeStyle={ACTIVE}>/device/all</Link></li>
          <li><Link to="/device/pc" activeStyle={ACTIVE}>/device/pc</Link></li>
          <li><Link to="/device/wireless" activeStyle={ACTIVE}>/device/wireless</Link></li>
        </ul>
        <hr />
        {this.renderChildren()}
      </div>
    );
  }
}

export default LayoutView;
