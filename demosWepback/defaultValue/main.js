var React = require('react');
var ReactDOM = require('react-dom');

// 使用defaultValue设置默认值
var Form1 = React.createClass({
  render:function(){
    return (
      <select name="" id=""  defaultValue='B'>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>
    );
  }
});
//使用React方式设置默认值
var Form2 = React.createClass({
  getInitialState: function(){
    return {
      helloTo: 'B'
    }
  },
  handleChange: function(event){
    var selected = '';
    var target = event.target;
    for (var i = 0; i < target.length; i++) {
      var opt = target.options[i];
      if(opt.selected){
        selected = opt.value;
        console.log(this.state.helloTo);
      }
    }
    this.setState({
      helloTo: selected
    })
  },
  render: function(){
    return (
      <select name="" id=""  value={this.state.helloTo} onChange={this.handleChange}>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>
    )
  }
})

ReactDOM.render(
  <Form2 />,
  document.getElementById('content')
);
