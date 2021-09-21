// 使用 Mock
import Mock from 'mockjs';

const Random = Mock.Random;
Mock.mock('http://localhost:3000/api/account/example', 'GET', () => {
  let citys = [];
  for (let i = 0; i < 10; i++) {
    let obj = {
      id: i + 1,
      city: Random.city(),
      color: Random.color()
    };
    citys.push(obj);
  }
  return { cityList: citys };
});

Mock.mock('http://localhost:3000/list', {
  //输出数据
  name: '@name', //随机生成姓名
  'age|10-20': 10
  //还可以自定义其他数据
});
