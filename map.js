/* 
* demo01
* 找出句子中最长的单词


1. 切割数组，循环遍历，更新外部变量(不写了)

2. reduce + Math.max

3. apply
4. 扩展
*/

// function findLongWord(str) {
//   // return str.split(' ').reduce((pre, cur) => Math.max(pre, cur.length), 0)
//   // return Math.max.apply(null, str.split(' ').map(e => e.length))
//   return Math.max(...str.split(' ').map(e => e.length))
// }

// var str = 'i am a dog'

// console.log(findLongWord(str))

/* 
* 实用 demo02 获取数组对象的指定项
*/

//  [{a:48,b:58,c:68},{b:51,c:68},{a:45,b:51,c:61,d:88}] => [{b:58,c:68},{b:51,c:68},{b:51,c:61}]

/* let arr = [
  { a: 48, b: 58, c: 68 },
  { b: 51, c: 68 },
  { a: 45, b: 51, c: 61, d: 88 }
]
let newArr = arr.map(({ b, c }) => {
  return { demo: b, demo2: c }
})

console.log(newArr) */
