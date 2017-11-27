/* 
* demo01基本用法
*/






/* 
* fcc demo02检查对象属性 
*/

/* 这个 function 接收一个 JSON 对象参数 collection 和一个字符串参数 pre。若 pre 表示的属性在 collection 中的每一个对象都存在且对应的值为真则返回 true，否则返回 false
collection 是 [{a: 1, b: 2}, {a: 1, c: 3}]，pre 是 "a"，返回值应为 true；如果这时候 pre 是 "c"，则返回值为 false
collection 是 [{a: 0, b: 2}, {a: false, c: 3}]，pre 是 "a"，那么也应该返回 false */


// function check(collection, pre) {
//   // 遍历 JSON 对象
//   for (var i = 0; i < collection.length; i++) {
//       // 遍历每一个 Object
//       for (var key in collection[i]) {
//           if (!collection[i].hasOwnProperty(pre) || !collection[i][pre]) {
//               return false;
//           }
//       }
//   }

//   return true;
// }

// let collection = [{ a: 1, b: 2 }, { a: 1, c: 3 }],
//   pre = 'a';

// let flag = collection.every(obj => Object.keys(obj).indexOf(pre) > -1 && obj[pre]);


/* 
* fcc demo03 找出对象包含的特定键值对
* [{"a": 1}, {"b": 2}, {"a": 1, "b": 2}], {"a": 1}  ==> [{"a": 1}, {"a": 1, "b": 2}]
*
*
*/

let arr = [{ "a": 1 }, { "b": 2 }, { "a": 1, "b": 2 }];
let obj = { a: 1 }

console.log(arr.filter(e => Object.keys(obj).every(key => e[key] === obj[key])))
