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
        {/*这样 危险的HTML标签就在*/}
        <span dangerouslySetInnerHTML={this.rawMarkUp()} />
      </div>
    );
  }
});

/*传入prop*/
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <Comment author="Pete Hunt">###This is one comment</Comment>
        <Comment author="Jordan Walke">This is *another* ```console.log('test'); ```  comment</Comment>
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
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
