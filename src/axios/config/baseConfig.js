import axios from 'axios';

class AxiosConfig {
  /* eslint-disable space-before-function-paren */
  constructor() {
    this._instance = axios.create({
      baseURL: process.env.VUE_APP_SERVER_URL,

      // http request 携带cookie
      withCredentials: true
    });

    // 添加请求拦截器
    this._instance.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        return config;
      },
      function (error) {
        // 对请求错误做些什么
        console.log(error);

        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    this._instance.interceptors.response.use(
      function (response) {
        // 对响应数据做点什么
        return response;
      },
      function (error) {
        // 对响应错误做点什么
        console.log(error);

        return Promise.reject(error);
      }
    );
  }

  // 暴露私有变量 _instance
  getIntance() {
    return this._instance;
  }
}

export default AxiosConfig;
