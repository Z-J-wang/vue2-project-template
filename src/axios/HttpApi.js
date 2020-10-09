// httpApi 为 httpApi 汇总类，以及通用的 httpApi

import mix from '../util/mixin'
import LoginApi from './module/LoginApi'
import commonApi from './module/UserApi'

class httpApi extends mix(LoginApi, commonApi) {
}

export default httpApi
