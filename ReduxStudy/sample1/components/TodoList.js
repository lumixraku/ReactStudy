import React, { Component, PropTypes } from 'react';
import Todo from './Todo';

export default class TodoList extends Component {
  render() {
    return (
      <ul>
        {/* {...todo} is the simple way of Object.assign({}, todo)  */}
        {
          this.props.todos.map((todo, index) =>
          <Todo {...todo}
                key={index}
                onClick={() => {  this.props.onTodoClick(index)  }    } />
          )
        }
      </ul>
    )
  }
}

TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
}
