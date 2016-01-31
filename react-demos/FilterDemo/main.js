//第一种组件之间通信的方式是将事件处理函数通过props的方式传入到子组件


// 测试数据
var _score = [
    {name: 'san', gender: '男', chinese: 85, math: 98, _id:0},
    {name: 'zhangsan', gender: '女', chinese: 95, math: 90, _id:1},
    {name: 'lisi', gender: '男', chinese: 65, math: 48, _id:2},
    {name: 'dada', gender: '女', chinese: 95, math: 100, _id:3},
    {name: 'wuwu', gender: '男', chinese: 75, math: 88, _id:4},
    {name: 'qianzhao', gender: '男', chinese: 75, math: 98, _id:5},
    {name: 'erer', gender: '女', chinese: 90, math: 98, _id:6}
];


//text change 需要使用table中的函数
var FilterInput = React.createClass({
  getInitialState: function(){
    return ({
      filterText: '',
      genderText:''
    })
  },
  filterChanged:function(event){
    this.props.nameFilter(event.target.value);
  },
  genderChanged:function(event){
    this.props.genderFilter(event.target.value);
  },
  render: function(){
    return (
      <div>
        <div>
          {//这里并不使用checked
          }
          <input type="radio" value="All" name="gender" defaultChecked onChange={this.genderChanged}/>All
          <input type="radio" value="男" name="gender" onChange={this.genderChanged} />男
          <input type="radio" value="女" name="gender" onChange={this.genderChanged} />女
        </div>
        <div>
          <input onChange={this.filterChanged}/>
        </div>
      </div>
    )
  }
});

var DataTable = React.createClass({
  getInitialState:function(){
    return {

    }
  },
  getDefaultProps: function(){
    return {
      nameFilterText:'',
      genderFilterValue: 'All'
    }
  },
  render: function(){
    var filtedData = this.props.dataList.map(function(data){
      // console.log(data.name, '---',this.props.nameFilterText);
      if(data.name.indexOf(this.props.nameFilterText) != -1){

        //gender过滤
        if(this.props.genderFilterValue!= 'All'){
          if(data.gender == this.props.genderFilterValue){
            console.log(data.gender, this.props.genderFilterValue);
            return (
              <div>
              {data.name} -- {data.gender} -- {data.chinese} -- {data._id}
              </div>
            );
          }else{
            return;
          }
        }

        return (
          <div>
          {data.name} -- {data.gender} -- {data.chinese} -- {data._id}
          </div>
        );


      }else{
        return;
      }
    }.bind(this));
    return (
      <div class="table">
        {filtedData}
      </div>
    )
  }
})

//组件之间的通信
//在本例子中  DataTable和 FilterInput 这两个子组件 之间的通信 是借助 FilterTable完成的
//FilterInput中的文字是通过函数给 FilterTable的
//这个函数是FilterTable通过属性给FilterInput的


//数组传到子组件  使用props
var FilterTable = React.createClass({
  getInitialState:function(){
    return ({
      nameFilterText:''
    })
  },
  nameFilterHandler: function(value){
    this.setState({
      nameFilterText: value
    })
    // console.log(value);
  },
  genderFilterHandler: function(value){
    this.setState({
      genderFilterValue:value
    })
    // console.log('changed',value);
  },
  render:function(){
    return (
      <div>
        <FilterInput nameFilter={this.nameFilterHandler} genderFilter={this.genderFilterHandler}/>
        <DataTable dataList={_score} nameFilterText={this.state.nameFilterText}  genderFilterValue={this.state.genderFilterValue}/>
      </div>
    )
  }
});

React.render(
  <FilterTable />,
  document.getElementById('example1')
)
