'use strict';

const util = require('util');
const assert = require('assert');
const path = require('path');
const beautifyHTML = require('js-beautify').html;
// reactDomserver包提供了组件的服端渲染功能
const ReactDOMServer = require('react-dom/server');
const React = require('react');
require('debug').enable('reactview');
const log = require('debug')('reactview');
require('babel-register');





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
    log(['debug:filename'],filename);
    log(['debug:_locals'],_locals);
    log(['debug:internals'],internals);
    log(['debug:children'],children);



    let filepath = path.join(options.viewpath, filename);

    if (!path.extname(filepath)) {
      filepath += options.extname;
    }
    // http://localhost:3000/device/11 得到的是
    // /Users/lumixraku/Sites/react-server/react-server-koa-simple/app/views/Device.js
    log(['debug:filepath'],filepath);

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
    log(['debug:props'],props);

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
    log('[markup:]', markup);
    if (options.writeResp) {
      this.type = 'html';
      this.body = markup;
    }
    return markup;
  };

};
