// 使用 Mock
import Mock from 'mockjs'

const Random = Mock.Random

/**
 * 注意，在与 axios 使用时，如果 axios 配置了 baseURL，
 * 则，mock 的 url 需保持域名与 axios 的 baseURL 一致
 */
Mock.mock('http://localhost:3000/api/account/example', 'get', () => {
  let citys = []
  for (let i = 0; i < 10; i++) {
    let obj = {
      id: i + 1,
      city: Random.city(),
      color: Random.color()
    }
    citys.push(obj)
  }
  return { cityList: citys }
})
