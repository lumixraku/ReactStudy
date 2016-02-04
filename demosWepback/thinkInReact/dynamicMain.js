var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');

var SearchBar = React.createClass({
  inputEvent:function(){
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    )
  },
  render: function(){
    return (
      <div className="searchbar">
        <div>
          <input placeholder="Search..." onChange = {this.inputEvent} ref="filterTextInput"/>
        </div>
        <div>
          <input type="checkbox" onChange={this.inputEvent} ref="inStockOnlyInput"/>
        </div>
      </div>
    )
  }
});

var ProductRow = React.createClass({
  render: function(){
    return (
        /*没有存货的为红色   PS  注释若在html标签之外  不能加上 {}  */
        <tr className={this.props.data.stocked ? '' : 'red'} >
          <td>{this.props.data.name}</td>
          <td>{this.props.data.price}</td>
        </tr>
    );
  }
});


var ProductCategoryRow = React.createClass({
  render: function(){
    return (
      <tr>
        <td colSpan="2">
          {this.props.category}
        </td>
      </tr>
    );
  }
});


var ProductTable = React.createClass({
  render: function(){
    // var self = this;//不用这么做  例子是用的bind
    var rows = [];
    var lastCategory = '';
    // 不能简单的返回ProductRow  因为穿插着还有 ProductCategoryRow
    // rows = this.props.rows.map(function(item){
    //   return (
    //     <ProductRow data={item} />
    //   );
    // });
    this.props.rows.forEach(function(item){
      console.log(item);
      //表示插入一个ProductRow
      if(item.category != lastCategory){
          rows.push(<ProductCategoryRow category={item.category} key={item.category}/>);
      }
      lastCategory = item.category;

      //插入一个数据
      if(item.name.indexOf(this.props.filterText) != -1){
        if(this.props.inStockOnly){
          if(item.stocked){
            rows.push(<ProductRow data={item}  key={item.name} />);
          }
        }else {
          rows.push(<ProductRow data={item}  key={item.name} />);
        }
      }

    }.bind(this));

    return (
      <div className="product-table">
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
});



var FilterableProductTable = React.createClass({
  getInitialState: function() {
      return {
          filterText: '',
          inStockOnly: false
      };
  },
  componentDidMount: function(){

  },
  inputEvent: function(evt){
    this.state.filterText = evt.target.value;
  },
  checkEvent: function(evt){
    this.state.inStockOnly = evt.target.checked;
  },
  userInputEvent: function(filterText, checked){
    console.log(filterText, checked);
    this.setState({
        filterText: filterText,
        inStockOnly: checked
    });
    //不能这样  只有整个state 设置新值才能再次调用组件的render
    // this.state.filterText = filterText;
    // this.state.inStockOnly = checked;
  },
  render: function(){
    return (
      <div className="table-wrapper">
        {/*这样不好  传两个事件处理函数  太麻烦了*/}
        {/*<SearchBar filterText = {this.state.filterText}  inStockOnly={this.state.inStockOnly}  onInputEvent = {this.inputEvent} onCheckEvent={this.checkEvent}/> */}
        <SearchBar
          filterText = {this.state.filterText}
          inStockOnly = {this.state.inStockOnly}
          onUserInput = {this.userInputEvent}
        />
        <ProductTable
          rows = {this.props.data}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
});

var data = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];


ReactDOM.render(
  <FilterableProductTable data={data} />,
  document.getElementById('content')
);
