import vueCookies from 'vue-cookies'

export default class Cookies {
    constructor() {
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
    setCookie (key, value, time) {
        let cookie = ''

        if (time) {
            cookie = vueCookies.set(key, value, time)
        } else {
            cookie = vueCookies.set(key, value)
        }

        return cookie
    }

    /**
     * 删除 key 的 cookie
     * @param {*} key
     */
    removeCookie (key) {
        return vueCookies.remove(key)
    }
}
