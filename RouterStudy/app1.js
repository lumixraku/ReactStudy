import React from 'react'
import { render } from 'react-dom'

// First we import some modules...
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

// Then we delete a bunch of code from App and
// add some <Link> elements...
const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        {/* change the <a>s to <Link>s */}
        <ul>
          <li><Link to="/about">About!!</Link></li>
          <li><Link to="/inbox">Inbox!!!</Link></li>
        </ul>

        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        {this.props.children}
      </div>
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
const Home = React.createClass({
  render() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    )
  }
})

const Inbox = React.createClass({
  render() {
    return (
      <div>
        <h2>Inbox</h2>
      </div>
    )
  }
})



// Finally, we render a <Router> with some <Route>s.
// It does all the fancy routing stuff for us.
render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/*<IndexRoute component={Home} />*/}
      {/*当app中有Link的地址是  /about  就调用下面的component */}
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox} />
    </Route>
  </Router>
), document.body.firstElementChild)