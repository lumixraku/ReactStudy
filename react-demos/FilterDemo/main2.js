//不同组件之间的事件处理函数使用事件订阅模式
//不再使用之前 将事件处理函数 通过props 的方式传入到子组件来实现

var FilterTable,FilterInput,DataTable;
var FilterPubSub = new PubSub();
var NAMECHANGED = 'namechanged';
var GENDERCHANGED = 'genderchanged';

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


FilterTable = React.createClass({
  getInitialState:function(){
    return ({
      nameFilterText:''
    })
  },
  nameFilterHandler: function(value){
    this.setState({
      nameFilterText: value
    })
    console.log('nameChanged',value);
  },
  genderFilterHandler: function(value){
    this.setState({
      genderFilterValue:value
    })
    console.log('gender changed',value);
  },
  componentDidMount: function () {
    FilterPubSub.addEvent(GENDERCHANGED, this.genderFilterHandler);
    FilterPubSub.addEvent(NAMECHANGED, this.nameFilterHandler);
  },
  render:function(){
    return (
      <div>
        <FilterInput />
        <DataTable dataList={_score} nameFilterText={this.state.nameFilterText}  genderFilterValue={this.state.genderFilterValue}/>
      </div>
    )
  }
});



//text change 需要使用table中的函数
var FilterInput = React.createClass({
  getInitialState: function(){
    return ({
      filterText: '',
      genderText:''
    })
  },
  nameChanged:function(event){
    // this.props.nameFilter(event.target.value);
    FilterPubSub.fireEvent(NAMECHANGED,null,event.target.value);
  },
  genderChanged:function(event){
    // this.props.genderFilter(event.target.value);
    FilterPubSub.fireEvent(GENDERCHANGED,null,event.target.value);
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
          <input onChange={this.nameChanged}/>
        </div>
      </div>
    )
  }
});

DataTable = React.createClass({
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

React.render(
  <FilterTable />,
  document.getElementById('example1')
)
