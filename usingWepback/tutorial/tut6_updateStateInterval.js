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
        {/*这样 危险的HTML标签就在*/}
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
          {comment.text}
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
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

var CommentBox = React.createClass({
  getInitialState: function(){
    return {
      data:[]
    }
  },
  getDataMe: function(){
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
  componentDidMount: function(){
    this.getDataMe();
    setInterval(this.getDataMe, this.props.timeout);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm />
      </div>
    );
  }
});

ReactDOM.render(
  /*这里的data属性的值就是上面定义的data数组*/
  /*传递数值类型 需要用{}包裹  当然你也可以timeout="1000"  js中可以取整 也可以不取整  */
  <CommentBox url="/api/comments" timeout="1000" />,
  document.getElementById('content')
);
