'use strict';

const util = require('util');
const assert = require('assert');
const path = require('path');
const beautifyHTML = require('js-beautify').html;
// reactDomserver包提供了组件的服端渲染功能
const ReactDOMServer = require('react-dom/server');
const React = require('react');
require('babel-register');


//debug模块主要用于优化log的显示(分组显示log)
//这样所有的renderlog就是同一种颜色显示  其他类型的log其他颜色
require('debug').enable('serverRender');
require('debug').enable('others');
//在使用debug前要enable要显示的log分组
//假如我希望只看某一种log   DEBUG=serverRender node server.js
const renderLog = require('debug')('serverRender');
const logOhters = require('debug')('others');


logOhters('others log');


const defaultOpts = {
  doctype: '<!DOCTYPE html>',
  extname: '.js', // view层直接渲染文件名后缀
  beautify: false, // 是否需要对dom结构进行格式化
  writeResp: false, // 是否需要在view层直接输出
};

module.exports = function(app) {
  const opts = app.config.reactview || {};
  // assert(opts && opts.viewpath && util.isString(opts.viewpath), '[reactview] viewpath is required, please check config!');
  const options = Object.assign({}, defaultOpts, opts);

  app.context.render = function(filename, _locals, internals, children) {



    // http://localhost:3000/device/11 得到的是 Device
    renderLog(['debug:filename'],filename);
    renderLog(['debug:_locals'],_locals);
    renderLog(['debug:internals'],internals);
    renderLog(['debug:children'],children);



    let filepath = path.join(options.viewpath, filename);

    if (!path.extname(filepath)) {
      filepath += options.extname;
    }
    // http://localhost:3000/device/11 得到的是
    // /Users/lumixraku/Sites/ReactStudy/isomorphicStudy/sample1/app/serverPage/Device.js
    renderLog(['debug:filepath'],filepath);

    if (typeof _locals === 'boolean') {
      internals = _locals;
      _locals = {};
    }
    internals = internals !== undefined ? internals : options.internals;

    let render = internals ? ReactDOMServer.renderToString : ReactDOMServer.renderToStaticMarkup;

    //渲染为HTML：renderToString()'
    // string renderToString(ReactElement element)


    //渲染为静态HTML：renderToStaticMarkup()
    // 该方法与renderToString方法类似，但这个方法不会生成额外的DOM特性，如：data-react-id等 React内部所使用的特性。当你想使用一个简单的静态页面生成器时这个方法非常有用，它会剥离额外的特性且会节省大量字节。

    // merge koa state
    let props = Object.assign({}, this.state, _locals); //相当于$.extend()
    renderLog(['debug:props'],props);

    let markup = options.doctype || '<!DOCTYPE html>';

    try {
      let component = require(filepath);
      // Transpiled ES6 may export components as { default: Component }
      component = component.default || component;

      //React.createElement 根据配置生成元素
      // React.createElement("div",
      //   {
      //     id: "greeting-container",
      //     className: "container"
      //   },
      //   React.createElement(Greeting, {name: "World"})
      // )
      // 得到
      // <div id="greeting-container" className="container">
      //   <Greeting name="World"/>
      // </div>

      markup += render(React.createElement(component, props, children));
    } catch (err) {
      err.code = 'REACT';
      throw err;
    }
    if (options.beautify) {
      // NOTE: This will screw up some things where whitespace is important, and be
      // subtly different than prod.
      markup = beautifyHTML(markup);
    }
    renderLog('[markup:]', markup);
    if (options.writeResp) {
      this.type = 'html';
      this.body = markup;
    }
    return markup;
  };

};
