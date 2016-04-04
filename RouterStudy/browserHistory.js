import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'

const ACTIVE = { color: 'red' }

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>APP!</h1>
        <ul>
          <li><Link      to="/"           activeStyle={ACTIVE}>/</Link></li>
          <li><IndexLink to="/"           activeStyle={ACTIVE}>/ IndexLink</IndexLink></li>

          <li><Link      to="/users"      activeStyle={ACTIVE}>/users</Link></li>
          <li><IndexLink to="/users"      activeStyle={ACTIVE}>/users IndexLink</IndexLink></li>

          <li><Link      to="/users/ryan" activeStyle={ACTIVE}>/users/ryan</Link></li>
          <li><Link      to={{ pathname: '/users/ryan', query: { foo: 'bar' } }}
                                          activeStyle={ACTIVE}>/users/ryan?foo=bar</Link></li>

          <li><Link      to="/about"      activeStyle={ACTIVE}>/about</Link></li>
        </ul>

        {this.props.children}
      </div>
    )
  }
}

class Index extends React.Component {
  render() {
    return (
      <div>
        <h2>Index!  IndexRoute下加载这个</h2>
      </div>
    )
  }
}

class Users extends React.Component {
  render() {
    return (
      <div>
        <h2>Users</h2>
        {this.props.children}
      </div>
    )
  }
}

class UsersIndex extends React.Component {
  render() {
    return (
      <div>
        <h3>UsersIndex</h3>
      </div>
    )
  }
}

class User extends React.Component {
  render() {
    return (
      <div>
        <h3>User {this.props.params.id}</h3>
      </div>
    )
  }
}

class About extends React.Component {
  render() {
    return (
      <div>
        <h2>About</h2>
      </div>
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      // 访问/目录的时候  显示的组件
      <IndexRoute component={Index}/>

      //访问 /about  路径  显示about组件
      <Route path="/about" component={About}/>

      //在/ 路径下  表示 /users 路径时 调用Users
      <Route path="users" component={Users}>
        //当仅仅是访问 /users的时候  显示UsersIndex组件
        <IndexRoute component={UsersIndex}/>
        //  当访问/users/xxx   xxx是用户名  显示User组件
        <Route path=":id" component={User}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('example'))

