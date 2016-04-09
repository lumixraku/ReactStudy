import { createStore, combineReducers, applyMiddleware } from 'redux'

var thunkMiddleware = function({ dispatch, getState }) {
  // console.log('Enter thunkMiddleware');
  return function(next) {
    // console.log('Function "next" provided:', next);
    return function(action) {
      // console.log('Handling action:', action);
      return typeof action === 'function' ?
        action(dispatch, getState) :
        next(action)
    }
  }
}



const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore)

//中间件都是通过next调用下一个中间件  下面的这个写法不会执行logMiddleware
//因为discardMiddleware并没哟调用next函数

// const finalCreateStore = applyMiddleware(thunkMiddleware, discardMiddleware, logMiddleware)(createStore)
  // For multiple middlewares, write: applyMiddleware(middleware1, middleware2, ...)(createStore)

var reducer = combineReducers({
  speaker: function(state = {}, action) {
    console.log('speaker was called with state', state, 'and action', action)

    switch (action.type) {
      case 'SAY':
        return {
          ...state,
          message: action.message
        }
      default:
        return state
    }
  }
})

const store_0 = finalCreateStore(reducer)
  // Output:
  //     speaker was called with state {} and action { type: '@@redux/INIT' }
  //     speaker was called with state {} and action { type: '@@redux/PROBE_UNKNOWN_ACTION_s.b.4.z.a.x.a.j.o.r' }
  //     speaker was called with state {} and action { type: '@@redux/INIT' }

// Now that we have our middleware-ready store instance, let's try again to dispatch our async action:

var asyncSayActionCreator_1 = function(message) {
  return function(dispatch) {
    setTimeout(function() {
      console.log(new Date(), 'Dispatch action now:')
      dispatch({
        type: 'SAY',
        message
      })
    }, 2000)
  }
}

console.log("\n", new Date(), 'Running our async action creator:', "\n")

store_0.dispatch(asyncSayActionCreator_1('Hi'))
  // Output:
  //     Mon Aug 03 2015 00:01:20 GMT+0200 (CEST) Running our async action creator:
  //     Mon Aug 03 2015 00:01:22 GMT+0200 (CEST) 'Dispatch action now:'
  //     speaker was called with state {} and action { type: 'SAY', message: 'Hi' }

// Our action is correctly dispatched 2 seconds after our call the async action creator!

// Just for your curiosity, here is how a middleware to log all actions that are dispatched, would
// look like:

function logMiddleware({ dispatch, getState }) {
  return function(next) {
    return function(action) {
      console.log('logMiddleware action received:', action)
      return next(action) //中间件都是通过next调用下一个中间件的
    }
  }
}

// Same below for a middleware to discard all actions that goes through (not very useful as is
// but with a bit of more logic it could selectively discard a few actions while passing others
// to next middleware or Redux):
function discardMiddleware({ dispatch, getState }) {
  return function(next) {
    return function(action) {
      console.log('discardMiddleware action received:', action)
    }
  }
}
