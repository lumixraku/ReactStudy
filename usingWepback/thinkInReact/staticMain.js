var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');

var SearchBar = React.createClass({
  render: function(){
    return (
      <div className="searchbar">
        <div>
          <input placeholder="Search..."/>
        </div>
        <div>
          <input type="checkbox" checked={this.props.inStockOnly ? 'checked' : ''}/>
        </div>
      </div>
    )
  }
});

var ProductRow = React.createClass({
  render: function(){
    return (
        //没有存货的为红色   PS  注释若在html标签之外  不能加上 {}
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
    var rows = [];
    // 不能简单的返回ProductRow  因为穿插着还有 ProductCategoryRow
    // rows = this.props.rows.map(function(item){
    //   return (
    //     <ProductRow data={item} />
    //   );
    // });
    var lastCategory = '';
    var self = this;
    this.props.rows.forEach(function(item){

      //表示插入一个ProductRow
      if(item.category != lastCategory){
        //有过滤条件
        if( self.props.filterText  || self.props.inStockOnly){
          if(item.stocked){
            rows.push(<ProductCategoryRow category={item.category} key={item.category}/>);
          }
        }else{
          rows.push(<ProductCategoryRow category={item.category} key={item.category}/>);
        }
      }
      lastCategory = item.category;
      rows.push(<ProductRow data={item}  key={item.name} />);
    });

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


var data = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

var FilterableProductTable = React.createClass({
  getInitialState: function() {
      return {
          filterText: '',
          inStockOnly: false
      };
  },
  componentDidMount: function(){

  },
  render: function(){
    return (
      <div className="table-wrapper">
        <SearchBar filterText = {this.state.filterText}  inStockOnly={this.state.inStockOnly}/>
        <ProductTable rows = {data} filterText = {this.state.filterText} inStockOnly={this.state.inStockOnly}/>
      </div>
    );
  }
});

ReactDOM.render(
  <FilterableProductTable url="/api/comments" timeout="2000" />,
  document.getElementById('content')
);
