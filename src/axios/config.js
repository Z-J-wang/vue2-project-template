import axios from 'axios';
import Cookie from '../util/cookie';
import { Message } from 'element-ui';

const cookie = new Cookie();
const token = cookie.getToken();

class AxiosConfig {
  constructor() {
    this._instance = axios.create({
      baseURL: process.env.VUE_APP_SERVER_URL,
      // timeout: 1000,
      headers: { Authorization: `${token}` },
      // headers: { 'Authorization': `Bearer ${token}` }
      withCredentials: true
    });

    // 添加请求拦截器
    this._instance.interceptors.request.use(
      function(config) {
        // this.$message("sasda")
        // 在发送请求之前做些什么
        return config;
      },
      function(error) {
        // 对请求错误做些什么
        Message({
          message: '网络错误，请重新尝试!',
          type: 'error'
        });
        console.log(error);

        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    this._instance.interceptors.response.use(
      function(response) {
        // 对响应数据做点什么
        return response;
      },
      function(error) {
        // 对响应错误做点什么
        Message({
          message: '网络错误，请重新尝试!',
          type: 'error'
        });
        console.log(error);

        return Promise.reject(error);
      }
    );
  }

  // 暴露私有变量 _instance
  getInstance() {
    return this._instance;
  }
}

export default AxiosConfig;
