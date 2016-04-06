import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory, browserHistory } from 'react-router'

const App = React.createClass({
  render(){
    return(
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/about">About!!</Link></li>
          <li><Link to="/users">users</Link></li>
        </ul>
        {/*下面这个必不可少  否则route子组件不显示*/}
        {this.props.children}
      </div>
    )
  }
})
const Home = React.createClass({
  render(){
    return(
      <div>Home</div>
    )
  }
})

const About = React.createClass({
  render(){
    return(
      <div>About</div>
    )
  }
})
const NoMatch = React.createClass({
  render() {
    return (
      <div>
        <h2>404</h2>
      </div>
    )
  }
})


// etc.

const Users = React.createClass({

  getInitialState() {
    return {
      users:[
        {id:'001',name:'user1'},
        {id:'002',name:'user2'}
      ]
    }
  },
  render() {
    return (
      <div>
        <h1>Users</h1>
        <div className="master">
          <ul>
            {/* use Link to route around the app */}
            {this.state.users.map(user => (
              <li key={user.id}><Link to={`/user/${user.id}`}>{user.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="detail">
          {this.props.children}
        </div>
      </div>
    )
  }
})

const User = React.createClass({
  getInitialState() {
    console.log('init state');
    return {
      user: findUserById(this.props.params.userId)
    }
  },
  componentDidMount() {
    console.log('comp did amount');
    this.setState({
      user: findUserById(this.props.params.userId)
    })
  },

  //set state when router changes
  componentWillReceiveProps(nextProps){
    console.log('will receive props', nextProps.params.userId);
    this.setState({
      user: findUserById(nextProps.params.userId)
    })
  },
  componentDidUpdate(){
    //不能在此时进行setState  否则会重复的触发componentDidUpdate 最终导致栈溢出
    // this.setState({
    //   user: findUserById(this.props.params.userId)
    // })
  },
  render() {
    return (
      <div>
        <h2>
          {this.state.user.name} --
          {this.props.params.userId}
        </h2>
        {/* etc. */}
      </div>
    )
  }
})

 function findUserById(id) {
  return {
    id: id,
    name: 'user'+ id
  }
}

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/*http://localhost:8080/#/about*/}
      <Route path="about" component={About} />
      <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.body.firstElementChild)