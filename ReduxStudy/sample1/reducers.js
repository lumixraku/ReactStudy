import { combineReducers } from 'redux'
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
const { SHOW_ALL } = VisibilityFilters

//state = SHOW_ALL 设置了state对象的默认值
function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

//设置默认值为[]
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
    //Immutable State!!
    //所以不可以在原有的State上做更改
    //因为 redux是根据 newState.todos === prevState.todos 这种引用比较state的
    //因为避免Deep Equal 的比较影响性能
    //所以使用Object.assign 或者 [].concat的方式创建新的{} 或[] 才能比较
    //所以更新state需要这样做 myStuff = [...mystuff, {name: 'js lovin fool']
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})
//state就是 {'visibilityFilter':SHOW_ALL, todos:[]}

export default todoApp


// let counters = {
//     faves: 0,
//     forward: 20,
// }
// this creates a brand new copy overwriting just that key
// counters = {...counters, faves: counters.faves + 1}