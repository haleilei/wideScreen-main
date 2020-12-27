import axios from 'axios';
// import store from '@/store/';
// import router from '@/router/router';
import {
  baseUrl
} from '@/env';
// import {
//   getToken
// } from '@/utils/auth';
import {
  Message
} from 'element-ui';
// axios.defaults.timeout = 10000;
axios.defaults.baseURL = baseUrl;
//返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = false;

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';


/**
 * 判断是否为空
 */
export function validatenull(val) {
  if (typeof val == 'boolean') {
    return false;
  }
  if (typeof val == 'number') {
    return false;
  }
  if (val instanceof Array) {
    if (val.length == 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
    return false;
  }
  return false;
}

export const serialize = data => {
  let list = [];
  Object.keys(data).forEach(ele => {
    if (
      data[ele] !== "" &&
      data[ele] != null &&
      data[ele] != undefined
    ) {
      list.push(`${ele}=${data[ele]}`)
    }
  })
  return list.join('&');
};
//表单空属性删除
export const dataformat = data => {
  var originalData = data || {};
  var dataObj = {};
  Object.keys(originalData).forEach(keyItem => {
    if (
      originalData[keyItem] !== "" &&
      originalData[keyItem] != null &&
      originalData[keyItem] != undefined &&
      originalData[keyItem] != {}
    ) {
      if (getObjType(originalData[keyItem]) === "object") {
        if (Object.keys(originalData[keyItem]).length !== 0) {
          dataObj[keyItem] = dataformat(originalData[keyItem]);
        }
      } else {
        dataObj[keyItem] = originalData[keyItem];
      }
    }
  });
  return dataObj;
};
export const getObjType = obj => {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
};
//HTTPrequest拦截
axios.interceptors.request.use(config => {
  if (getObjType(config.data) === "object") {
    config.data = dataformat(config.data || {});
  }
  // if (config.headers['Authorization']) {
  //   config.headers['Authorization'] = config.headers['Authorization'];
  // } else {
  //   if (getToken()) {
  //     config.headers['Authorization'] = `Bearer ${getToken()}`;
  //     // config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMywidXNlcl9uYW1lIjoiMTM3MzU1ODU5NTExIiwic2NvcGUiOlsiYWxsIl0sIlRFTkFOVF9JRCI6MSwiYXV0aG9yaXRpZXMiOlsidXNlciJdLCJqdGkiOiJkNjMyMDJkNy1jYmM4LTRjZDUtOTlkOC1hM2MzNTIwMzRiMzAiLCJjbGllbnRfaWQiOiJ5dW5iYW8iLCJ1c2VybmFtZSI6IjEzNzM1NTg1OTUxMSIsInRva2VuX3RpbWUiOjE1NjE2MDY5OTY4OTR9.v7Rs1JbCeugCRQn8C0dIDWpvJfqPVkVFxVQhDK7nVsA`;
  //   } else {
  //     store.dispatch('LogOut').then(() => router.replace({
  //       path: '/login'
  //     }));
  //   }
  // }
  //headers中配置serialize为true开启序列化
  if (config.headers['Content-Type'] == 'application/x-www-form-urlencoded;charset=UTF-8' && config.method == 'post') {
    config.data = serialize(config.data);
  }
  // config.headers['DEVICE_CODE'] = window.location.host + navigator.userAgent;
  // config.headers['TENANT_ID'] = 1;
  return config
}, error => {
  return Promise.reject(error)
});
//HTTPresponse拦截
axios.interceptors.response.use(res => {
  const status = Number(res.status) || 200;
  const statusWhiteList = [];
  var message = res.data.msg || '未知错误';
  //如果请求为200则放过，否者默认统一处理,或者在website中配置statusWhiteList白名单自行处理
  if (status !== 200 && !statusWhiteList.includes(status)) {
    if (getObjType(res.data) === "string") {
      if (res.data.indexOf('Proxy error') !== -1) {
        message = "服务器错误!"
      }
    } else {
      message = res.data.message || res.data.msg
    }
    Message({
      message: message,
      type: 'error'
    })
    //如果是401则跳转到登录页面
    // if (status === 401) store.dispatch('LogOut').then(() => router.push({
    //   path: '/login'
    // }));
    return Promise.reject(new Error(message))
  }

  if (validatenull(res.data.code)) {
    return res.data;
  } else {
    if (res.data.code !== 200 && res.data.code !== 0) {
      Message({
        message: message,
        type: 'error'
      })
      return Promise.reject(new Error(message))
    } else {
      return res.data.data;
    }
  }
}, error => {
  return Promise.reject(new Error(error));
})

export default axios;
