import {
  randomStr
} from './utils';
import http from '../utils/axios.js';
import {
  cdnUrl,
  firstPath
} from '../config/env.js';
// import axios from 'axios';
const OSS = require("ali-oss");
let client = null;
let ossFileDir = "";
let lastName = "";
/**
 * 
 * 函数接收一个Object; 
 * folder:文件最终路径,最上层路径在本页定义;
 * notRename:是否在上传是进行重名名,大部分情况下需要随机命名,可不传;
 * path:文件名;
 * notFolder:不使用folder;
 * file:文件对象;
 * done();成功回调;
 * fail();失败回调;
 */
const ossUpload = params => {
  if (client) {
    ossFileDir = params.folder ? params.folder + "/" : "";
    lastName = params.notRename ? params.path : new Date().getTime() + randomStr(false, 5) + '.' + params.path.split('.')[params.path.split('.').length - 1];
    client
      .multipartUpload(params.notFolder ? ossFileDir + lastName : firstPath + ossFileDir + lastName, params.file)
      .then(data => {
        let lastPath = data.res.requestUrls[0].split("?uploadId")[0];
        data.res.requestUrls[0] = cdnUrl + lastPath.split('.aliyuncs.com')[1]
        params.done && params.done(data);
      })
      .catch(err => {
        params.fail && params.fail(err);
      });
  } else {
    http
      .get(`/app/upload/image/`, {
        // condition: {
        //   key: 'OSS_INFO'
        // }
      })
      .then(res => {
        client = new OSS({
          region: res.ossUrl.split('.aliyuncs.com')[0],
          accessKeyId: res.accessKey,
          accessKeySecret: res.accessSecret,
          bucket: res.bucketName
        });
        ossFileDir = params.folder ? params.folder + "/" : "";
        lastName = params.notRename ? params.path : new Date().getTime() + randomStr(false, 5) + '.' + params.path.split('.')[params.path.split('.').length - 1];
        client
          .multipartUpload(params.notFolder ? ossFileDir + lastName : firstPath + ossFileDir + lastName, params.file)
          .then(data => {
            let lastPath = data.res.requestUrls[0].split("?uploadId")[0];
            data.res.requestUrls[0] = cdnUrl + lastPath.split('.aliyuncs.com')[1]
            params.done && params.done(data);
          })
          .catch(err => {
            params.fail && params.fail(err);
          });
      })
      .catch(err => {
        window.console.log("获取oss配置信息出错", err);
      });
  }
};

export default ossUpload;