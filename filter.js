/* 
* demo01 fcc 过滤数组假值
*/
//  [1,2,null]=> [1,2]

// let arr = [1, 2, null]

// let newArr = arr.filter(e => !!e)

// let newArr = arr.filter(Boolean)

// console.log(newArr)

/* 
* demo02 fcc 按参数过滤数组
*/

// 这个 function 接受一个数组参数 arr 和一个函数参数 func。返回值为 arr 中满足参数 func 的第一个元素
// 如果 arr 是 [1, 2, 3]，func 是 function(num) {return num === 2;}，那么返回值应为 2

// function find(arr, func) {
//   return arr.filter(func)[0]
// }

/* 
* demo03 fcc 两个数组的对称差
*/

//  [1, 1, 2] 和 [2, 3] => [1,3]

function getArr(arr1, arr2) {
  // 得到在第一个数组，但不在第二个数组中的元素
  var result = arr1.filter(function(e) {
    return arr2.indexOf(e) === -1
  })
  // 得到在第二个数组，但不在第一个数组中的元素
  result = result.concat(
    arr2.filter(function(e) {
      return arr1.indexOf(e) === -1
    })
  )

  // 去重
  // return result.filter(function(e, i) {
  //   return result.indexOf(e) === i
  // })
  return result
}

console.log(getArr([1, 1, 2], [2, 3]))

// 扩展====》 多个数组的对称差
