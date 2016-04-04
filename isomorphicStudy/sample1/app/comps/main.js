'use strict';

import React from 'react';
import { render } from 'react-dom';
import AppRouter from './router.js';



const appEle = document.getElementById('demoApp');
const getServerData = (key)=> {
  return JSON.parse(appEle.getAttribute(`data-${key}`));
};

let microdata = getServerData('microdata');
let mydata = getServerData('mydata');
render(<AppRouter microdata={microdata} mydata={mydata} isServer={false} />, appEle);
