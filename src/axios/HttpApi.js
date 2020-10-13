// httpApi 为 httpApi 汇总类，以及通用的 httpApi

import mix from '../util/mixin'
import LoginApi from './modules/LoginApi'
import commonApi from './modules/UserApi'

class httpApi extends mix(LoginApi, commonApi) {
}

export default httpApi
