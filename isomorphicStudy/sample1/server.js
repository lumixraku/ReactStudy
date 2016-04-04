/**!
 * react-server-koa-simple - app.js
 * application
 *
 * Copyright(c) Alibaba Group Holding Limited.
 *
 * Authors:
 *   谋士 <qingliang.hql@alibaba-inc.com>
 */
'use strict';
// require('babel-register');
// const Home = require('./app/comps/Home.js');
// console.log('home',Home.microdata);


const koa = require('koa');
const koaRouter = require('koa-router');
const path = require('path');
// const reactview = require('./app/plugin/reactview/app.js');
const serverRender = require('./app/serverRender.js');



const App = ()=> {
  let app = koa();
  let router = koaRouter();
  let microdata = {
    styleDomain: "//localhost:8080"
  };

//koa的使用有很大不同
// 如果是express
// app.use( '/', m1 );
// app.use( '/test', m2 );
// app.use( '/test', m3 );
// 请求URL为: xxx.com/test
// 这个时候会依次流过m1,m2, m3


  //下面是服务端的渲染  服务端渲染两个页面  主页Home和Device页面
  // 初始化/home路由dispatch的generator
  router.get(['/', '/home'], function*() {
    //应用上下文
    //https://github.com/guo-yu/koa-guide
    console.log(this.header == this.request.header);//true


    // 执行view插件
    // 调用render方法  this是app的context
    // 所以调用的this.render 也就是
    this.body = this.render('Home', {
      microdata: microdata,
      mydata: {
        nick: 'server render body'
      }
    },1);
  });

  //http://localhost:3000/device/123123   而不是 http://localhost:3000/device/:123123
  router.get('/device/:deviceID', function*() {
    // 执行view插件
    let deviceID = this.params.deviceID;
    console.log('deviceID:', this.params.deviceID);
    //this.render 调用了 reactview中的 app.context.render 方法
    this.body = this.render('Device', {
      isServer: true,
      microdata: microdata,
      mydata: {
        path: this.path,
        deviceID: deviceID
      }
    });
  });
  app.use(router.routes()).use(router.allowedMethods());



  // 注入reactview
  const viewpath = path.join(__dirname, 'app/serverPage');
  app.config = {
    reactview: {
      viewpath: viewpath,                 // the root directory of view files
      doctype: '<!DOCTYPE html>',
      extname: '.js',                     // view层直接渲染文件名后缀
      beautify: true,                     // 是否需要对dom结构进行格式化
      writeResp: false,                    // 是否需要在view层直接输出
    }
  }
  serverRender(app);
  // app.context.render = function(param1, param2){
  //   console.log(param1, param2);
  //   console.log('test======');
  // }
  return app;
};

const createApp = ()=> {
  const app = App();

  // http服务端口监听
  app.listen(3000, ()=> {
    console.log('3000 is listening!');
  });
  // require('koa-trace')(app);
  // app.debug();
  return app;
};
createApp();
