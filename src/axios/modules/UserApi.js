// UserApi 类用于设置用户相关的 HttpApi

import AxiosConfig from '../config/baseConfig'

class UserApi extends AxiosConfig {
  // eslint-disable-next-line space-before-function-paren
  constructor() {
    super()
    this.axios = super.getInstance()
  }

  getData() {
    return this.axios.get('/api/getData')
  }
}

export default UserApi
