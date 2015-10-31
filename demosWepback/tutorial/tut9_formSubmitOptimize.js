var React = require('react');
var ReactDOM = require('react-dom');
var marked = require('marked');
var $ = require('jQuery');



var Comment = React.createClass({
  rawMarkUp: function(){
    //this.props.children得到的是Commnet标签子节点(包括文本节点)的内容
    //marked 可以转为markdown的HTML
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {/*防止XSS */}
        {/*这样 危险的HTML标签就在span里面*/}
        <span dangerouslySetInnerHTML={this.rawMarkUp()} />
      </div>
    );
  }
});

/*传入props*/
var CommentList = React.createClass({
  render: function() {
    var cmtNodes = this.props.data.map(function(comment){
      return (
        /*每一个循环的元素都需要有一个key属性  key属性的值应该是唯一的*/
        <Comment author={comment.author} key={comment.id}>
          {comment.text}    {/*这里的值放在children属性中*/}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {/*在所有的JSX标签中插入js东东都需要用{}包裹*/}
        {/*cmtNodes 是一个数组  因此可以这样使用*/}
        {cmtNodes}
      </div>
    );
  }
});


var CommentForm = React.createClass({
  clickEvent:function(e){
      e.preventDefault();
      var author = this.refs.author.value.trim();
      var text = this.refs.text.value.trim();
      if (!text || !author) {
        return;
      }
      // TODO: send request to the server
      // onCommentSubmit这个属性值是一个函数
      this.props.onCommentSubmit({author: author, text: text});
      this.refs.author.value = '';
      this.refs.text.value = '';
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.clickEvent}>
        {/*  通过ref引用元素和子组件  */}
        {/* We use the ref attribute to assign a name to a child component and this.refs to reference the DOM node. */}
        <input type="text" placeholder="Your name" ref="author"/>
        <input type="text" placeholder="Say something..." ref="text"/>
        <input type="submit" value="Post" />
      </form>
    );
  }
});
var CommentBox = React.createClass({
  getInitialState: function(){
    return {
      data:[]
    }
  },
  getData: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this), //this.setState是 React中的函数   所以要绑定this  否则this就是window了
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  /*该函数由CommetnForm这个子组件调用的*/
  handleCommentSubmit: function(data){
    this.setState({data: this.state.data.push(data)});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function(){
    this.getData();
    setInterval(this.getData, this.props.timeout);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        {/*  向子组件传入一个函数  子组件CommentForm会调用这个函数*/ }
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

ReactDOM.render(
  /*这里的data属性的值就是上面定义的data数组*/
  /*传递数值类型 需要用{}包裹 比如timeout={2000}  当然你也可以timeout="1000"   */
  <CommentBox url="/api/comments" timeout="2000" />,
  document.getElementById('content')
);

