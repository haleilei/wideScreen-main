// 配置编译环境和线上环境之间的切换
let baseUrl = '';
const cdnUrl = 'https://cdn.cloudmloan.com';
const firstPath = 'river/'; //定义oss上传bucket下根路径
const env = process.env
if (env.NODE_ENV === 'development') {
  baseUrl = `http://localhost:8080`; // 开发环境地址
} else if (env.NODE_ENV === 'production') {
  baseUrl = `http://192.168.1.107:8080`; //生产环境地址
}
export {
  baseUrl,
  env,
  cdnUrl,
  firstPath,
}
