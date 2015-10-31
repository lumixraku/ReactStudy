var React = require('react');
var ReactDOM = require('react-dom');
var marked = require('marked');



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
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data}/>
        <CommentForm />
      </div>
    );
  }
});
var data = [
  {author: "Pete Hunt", text: "This is one comment", id: "oscsgwt57"},
  {author: "Jordan Walke", text: "This is *another* comment", id: "sdgrmhl43"}
];
ReactDOM.render(
  /*这里的data属性的值就是上面定义的data数组*/
  <CommentBox data={data}/>,
  document.getElementById('content')
);
