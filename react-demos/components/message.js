//父子组件通信
//父 -->  子  直接通过props写入数据
//子 -->  父  调用父组件的函数  将值传给父组件
var Container1, Inner1;
Container1 = React.createClass({
  getInitialState: function(){
    return {
      val1: this.props.val1 ||'',
      val2:''
    }
  },
  setVal2Fn: function(value){
    // console.log('te!!st',value);
    this.setState({
      val2:value
    })
  },
  render: function(){
    return (
      <div class="container">
        From inner is {this.state.val2}
        <Inner1 val1={this.state.val1} setVal2Fn={this.setVal2Fn} />
      </div>
    )
  }
});

Inner1 = React.createClass({
  getInitialState: function(){
    return {}
  },
  handleSubmit: function(e){
    var target = e.target;

    //prenode是寻找submit按钮之前的一个元素  也就是文本输入框
    var prenode= (function(){
      var node = target.previousSibling;
      while(node.nodeType!=1){
           node=node.previousSibling;
           if(!node) return null;
      };
      return node;
    })();
    //调用父组件的函数  并将值以参数的形式传给父组件
    this.props.setVal2Fn(prenode.value);  //将值传给父组件
  },
  render:function(){
    return (
      <div>
        From container is {this.props.val1}
        <input type="text" ref="innerValue"/>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
})
React.render(
  <Container1 val1="heheh"/>,
  example1
)

// 同一个父组件之间的 子组件通信 (兄弟组件之间的通信)
// 由于兄弟组件之间不能相互传递数据  所以数据都放在父组件中
// 数据的获取  由父组件传递给子组件
// 数据的更改  由父组件传递修改函数给子组件
var Container2, Inner2, Inner3;
Container2 = React.createClass({
  getInitialState: function(){
    return{
      val3:'val3',
      val2:'val2'
    }
  },
  changeVal2: function(value){
    this.setState({
      val2: value
    })
  },
  changeVal3: function(value){
    this.setState({
      val3: value
    })
  },
  render: function(){
    //本例子是Inner2 和 Inner3 之间的消息传递
    //Inner2 的消息传给 Inner3  实际上就是传给父组件
    //然后Inner3 使用的是父组件读取这个父组件的变量
    return <div>
      <Inner2  val2={this.state.val2}  val3={this.state.val3}
      changeVal3Fn={this.changeVal3}/>
      <Inner3  val2={this.state.val2}  val3={this.state.val3}
      changeVal2Fn={this.changeVal2}/>
    </div>
  }
});

Inner2=React.createClass({
  textChange: function(e){
    var val = e.target.value;
    this.props.changeVal3Fn(val);
  },
  render: function(){
    return (
    <div>
      {this.props.val2}
      <input type="text" onChange={this.textChange} />
    </div>
    )
  }
});

Inner3 = React.createClass({
  textChange: function(e){
    var val = e.target.value;
    this.props.changeVal2Fn(val);
  },
  render: function(){
    return (
    <div>
      {this.props.val3}
      <input type="text" onChange={this.textChange} />
    </div>
    )
  }
});
React.render(
<Container2 />,
example2
)

//全局组件
//使用Context 使Inner4  Inner5 的上下文就是Container
var Container3, Inner4,Inner5;
Container3 = React.createClass({
  getInitialState: function(){
    return{
      val:'val'
    }
  },
  childContextTypes: {
    val: React.PropTypes.any,
    changeValFn: React.PropTypes.any
  },
  //设置子组件的val和changeValFn对象的上下文
  getChildContext: function(){
    return {
      val: this.state.val,
      changeValFn: this.changeValFn
    }
  },
  changeValFn: function(e){
    console.log('val' ,e.target.value);
    this.setState({
      val: e.target.value
    })
  },
  render: function(){
    return <div>
      <Inner4 val={this.state.val}
      changeValFn={this.changeValFn}/>
    </div>
  }
});
Inner4 = React.createClass({
  contextTypes: {
    val: React.PropTypes.any,
    changeValFn:React.PropTypes.any
  },
  // inputChange: function(e){
  //   this.context.changeValFn(e)
  // },
  render: function(){
    return (
      <div>
        -- { this.context.val } --
        <input onChange={this.context.changeValFn} />
      </div>
    )
  }
});
React.render(
<Container3 />,
example3
)

//使用PubSub 订阅发布模式来处理消息传递
//在一个组件ComponentDidMount函数触发后就绑定
var Container4, Container5;
var messagePubSub = new PubSub();
var MSGCHANGED = 'msg_changed';
Container4 = React.createClass({
  getInitialState: function(){
    return {
      text: 'default'
    }
  },
  componentDidMount: function(){
    messagePubSub.addEvent(MSGCHANGED, this.msgHandler);
  },
  msgHandler: function(value){
    console.log('test', value);
    this.setState({
      text:value
    })
  },
  render: function(){
    return (
      <div>
        -- {this.state.text} --
      </div>
    )
  }
});
Container5 = React.createClass({
  changeHandler: function(e){
    messagePubSub.fireEvent(MSGCHANGED, null, e.target.value);
  },
  render: function(){
    return (
      <div>
        <input class="container5-input" onChange={this.changeHandler}/>
      </div>
    )
  }
});
React.render(
  <div>
    <Container4 />
    <Container5 />
  </div>,
  example4
)

