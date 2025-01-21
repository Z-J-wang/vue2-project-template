import vueCookies from 'vue-cookies'

export default class Cookies {
  constructor () {
    // 设置全局 Cookie 过期时间
    vueCookies.config('30d')
  }

  /**
   * 根据 key 获取 cookie
   * @param {*} key
   */
  getCookie (key) {
    return vueCookies.get(key)
  }

  /**
   * 设置一个cookie
   * @param {*} key
   * @param {*} value
   */
  setCookie (key, value) {
    return vueCookies.set(key, value, '1d')
  }

  /**
   * 删除 key 的 cookie
   * @param {*} key
   */
  removeCookie (key) {
    return vueCookies.remove(key)
  }

  /**
   * 获取 token
   */
  getToken () {
    return vueCookies.get('token')
  }

  /**
   * 添加一个 token
   * @param token
   */
  setToken (token) {
    return vueCookies.set('token', token, '1d')
  }

  /**
   * 删除 token
   */
  removeToken () {
    return vueCookies.remove('token')
  }

  /**
   * 检查 token
   */
  hasToken () {
    return vueCookies.isKey('token')
  }

  /**
   * 根据 key 获取 cookie
   * @param {*} key
   */
  getUserInfo () {
    return vueCookies.get('userInfo')
  }

  /**
   * 设置一个cookie
   * @param {*} key
   * @param {*} value
   */
  setUserInfo (userinfo) {
    return vueCookies.set('userInfo', userinfo, '1d')
  }

  /**
   * 删除 key 的 cookie
   * @param {*} key
   */
  removeUserInfo () {
    return vueCookies.remove('userInfo')
  }
}
