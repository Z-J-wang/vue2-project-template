// LoginApi 类用于设置登录登出功能模块的 HttpApi

import AxiosConfig from '../config/baseConfig';

class LoginApi extends AxiosConfig {
  // eslint-disable-next-line space-before-function-paren
  constructor() {
    super();
    this.axios = super.getIntance();
  }

  login() {
    return this.axios.get('/api/login');
  }
}

export default LoginApi;
