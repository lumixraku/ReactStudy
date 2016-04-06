/**!
 * project - filepath
 * description
 *
 * Copyright(c) Alibaba Group Holding Limited.
 *
 * Authors:
 *   谋士 <qingliang.hql@alibaba-inc.com>
 */
'use strict';

const fs = require('fs');

//require('./core/app')基本上相当于koa对象

exports.Application = require('./core/app');
// exports.AppWorkerClient = require('./lib/core/app_worker_client');


/**
 * 创建一个 koa 应用，兼容以前的 api
 * @function createApp
 * @param {Object} options
 * @return Application
 * @since 1.0.0
 */

//options 是从sample2/app.js 中传入
exports.createApp = function createApp(options) {
  let app = new exports.Application(options);
  app.ready(()=> {
    app.listen(3000, ()=> {
      console.log('3000 is listening!');
    });
  });
};

