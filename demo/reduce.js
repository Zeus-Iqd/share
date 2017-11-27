/* 
* demo01 基本用法
*/
// 求总成绩
var result = [
  {
    subject: 'math',
    score: 100
  },
  {
    subject: 'chinese',
    score: 100
  },
  {
    subject: 'english',
    score: 100
  }
]
let sumResult = result.reduce((pre, cur) => {
  return pre + cur.score
}, 0)

/* demo02
* 正整数的阶乘
5 => 120
*
*/

function jiecheng(n) {
  if (n === 0) {
    return 1
  }
  return Array.from(Array(n).keys(), e => e + 1).reduce((pre, cur) => {
    return pre * cur
  })
}

console.log(jiecheng(5))

/* 
* demo03  数组对象的去重
*/

let person = [
  { id: 0, name: '小明' },
  { id: 1, name: '小张' },
  { id: 2, name: '小李' },
  { id: 3, name: '小孙' },
  { id: 1, name: '小周' },
  { id: 2, name: '小陈' }
]

let obj = {}

person = person.reduce((cur, next) => {
  // obj[next.id] ? '' : (obj[next.id] = cur.push(next))
  ;(obj[next.id] ? '' : (obj[next.id] = true)) && cur.push(next)
  return cur
}, []) //设置cur默认类型为数组，并且初始值为空的数组
console.log(person)
