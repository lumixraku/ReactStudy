import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
// render(<div>just a test</div>, appEle);
import { Link, IndexLink } from 'react-router';

// import Content from './DeviceContent.js';



const ACTIVE = { color: 'red'}
class Device extends Component {
  static propTypes = {
    mydata: PropTypes.object,
  };
  state = {
    deviceID: this.props.deviceID || 'default'
  }

  componentWillMount() {
    let { params } = this.props; //router的参数
    if (params) {
      console.log('will mount',params);
      this.setState({
        deviceID: params.deviceID
      });
    }
  }

  //router
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    let id = nextProps.params.deviceID;
    this.setState({
      deviceID: id
    });
  }
  render() {
    let { mydata } = this.props;
    return (
      <div className="deviceview">
        <h1> Device!!</h1>
        <h3> device: {this.state.deviceID}</h3>
      </div>
    );
  }
}
export default Device;


