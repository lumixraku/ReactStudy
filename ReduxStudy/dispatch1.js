import { createStore, combineReducers } from 'redux'

var userReducer = function(state = {}, action) {
  console.log('userReducer was called with state', state, 'and action', action)

  switch (action.type) {
    case 'SET_NAME':
      //这是Object.assign的简写  这是一个浅复制
      //相当于 return Object.assign({}, state, {name: action.name})
      //该语法要求 stage-0
      //否则不识别
      return {
        ...state,
        name: action.name
      }
      // return Object.assign({}, state, {name: action.name});
    default:
      return state;
  }
}
var itemsReducer = function(state = [], action) {
  console.log('itemsReducer was called with state', state, 'and action', action)

  switch (action.type) {
    case 'ADD_ITEM':
      //类似于数组的concat
      //return  [].concat(Array.from(state), [action.item])
      return [
        ...state,
        action.item
      ]
    default:
      return state;
  }
}


var reducer = combineReducers({
  user: userReducer,
  items: itemsReducer
})
var store_0 = createStore(reducer)


console.log("\n", '### It starts here')
console.log('store_0 state after initialization:', store_0.getState())
console.log('store_0 state after initialization:', JSON.stringify(store_0.getState()));


console.log('--------------------------------------------');


var reducer = combineReducers({
  speaker: function(state = {}, action) {
    console.log('speaker was called with state', state, 'and action', action)

    switch (action.type) {
      case 'SAY':
        return {
          name: action.name,
          message: action.message
        }
      default:
        return state;
    }
  }
})
var store_0 = createStore(reducer)

var sayActionCreator = function(message) {
//下面是一种简写
//  return {
//   type: 'say',
//   message: message
// };

  return {
    type: 'SAY',
    message
  }
}

console.log("\n", 'Running our normal action creator:', "\n")

console.log(new Date());
store_0.dispatch(sayActionCreator('Hi'))//通过dispatch设置了state

console.log(new Date());
console.log('store_0 state after action SAY:', store_0.getState()) //Object {type: "SAY", message: "Hi"}



//关于 ...的语法形式
//
// var state = [];
// var hehe = {a:1};

// (function(){
// var h = {
//   ...hehe,
//   B:1
// };
// return [...state, {a:1}]
// })();

//相当于


//
//"use strict";

// var _extends = Object.assign ||
// function(target) {
//     for (var i = 1; i < arguments.length; i++) {
//         var source = arguments[i];
//         for (var key in source) {
//             if (Object.prototype.hasOwnProperty.call(source, key)) {
//                 target[key] = source[key];
//             }
//         }
//     }
//     return target;
// };

// var state = [];
// var hehe = {
//     a: 1
// };

// (function() {
//     var h = _extends({},
//     hehe, {
//         B: 1
//     });
//     return [].concat(state, [{ a: 1 }]);
// })();
