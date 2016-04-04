import React from 'react'
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App!!</h1>
        <ul>
          {
            //只有在router中才能使用Link
          }
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {

        //当url为 /  的时候  props为空
        //根据路径的不同  Router会返回不同的子component
        //所以当路径为/ 的时候
        //Router的处理的组件如同
        // <App>
        //   <Dashboard></Dashboard>
        // </App>
        //因此 / 时 this.props.children 就是指的Dashboard
        }

        {this.props.children}
      </div>
    )
  }
})


const Dashboard = React.createClass({
  render() {
    return <h1>Dashbord !!!!! Welcome to the app! </h1>
  }
})

const About = React.createClass({
  render() {
    return <h3>About</h3>
  }
})

const Inbox = React.createClass({
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }
})

const Message = React.createClass({
  render() {
    return <h3>Message {this.props.params.id}</h3>
  }
})

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {
        //根据路径的不同  Router会返回不同的子component
      }
      <IndexRoute component={Dashboard} />
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>
), document.body.firstElementChild)