var React = require('react');
var ReactDOM = require('react-dom');


var Radio = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func
  },
  getInitialState: function () {
    return {
      value: this.props.defaultValue
    };
  },
  handleChange: function (event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
    this.setState({
      value: event.target.value
    });
  },
  render: function () {
    var children = [];
    console.log(this.props.value, this.state.value);
    var value = this.props.value || this.state.value;
    this.props.children.forEach(function(child, i){
      var label = <label>
          <input
            type="radio"
            name={this.props.name}
            value={child.props.value}
            checked={child.props.value == value}
            onChange={this.handleChange} />
              {child.props.children}
          <br/>
        </label>;
      children.push(label);
    }.bind(this));

    return (<span>{children}</span>);
  }
});

//非约束的
var MyForm = React.createClass({
  submitHandler: function (event) {
    event.preventDefault();
    alert(this.refs.radio.state.value);
  },
  render: function () {
    return <form onSubmit={this.submitHandler}>
        <Radio ref="radio" name="my_radio" defaultValue="B">
          <option value="A">First Option</option>
          <option value="B">Second Option</option>
          <option value="C">Third Option</option>
        </Radio>
        <button type="submit">Speak</button>
      </form>;
  }
});

//约束的
var MyForm2 = React.createClass({
  getInitialState: function () {
    return {my_radio: "B"};
  },
  handleChange: function (event) {
    this.setState({
      my_radio: event.target.value
    });
  },
  submitHandler: function (event) {
    event.preventDefault();
    alert(this.state.my_radio);
  },
  render: function () {
    return <form onSubmit={this.submitHandler}>
        <Radio name="my_radio"
            value={this.state.my_radio}
            onChange={this.handleChange}>
          <option value="A">First Option</option>
          <option value="B">Second Option</option>
          <option value="C">Third Option</option>
        </Radio>
        <button type="submit">Speak</button>
      </form>;
  }
});

ReactDOM.render(
  <MyForm2 />,
  document.getElementById('content')
);
