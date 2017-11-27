### 数组和对象的方法

1. es5

循环类方法 : filter, forEach,map, reduce, some, every

过滤数组假值 , 两个数组的对称差 :filter

找出句子中最长的单词：map

迭代 : reduce

判断元素是否满足 fun 的要求： some( 只要有一个满足，就返回 true) every=== 应用场
景比如在这个数组中去查找有没有找到。

增删改类：=> 改变原数组的和未改变原数组的

##### 改变的

pop() 方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度

shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。

push() 方法将一个或多个元素添加到数组的末尾，并返回新数组的长度。

unshift() 方法将一个或多个元素添加到数组的开头，并返回新数组的长度。

splice(start, deleteCount, item1, item2, ...) 删除添加数组

##### 不改变的

join(), concat(),slice()

2. es6 对数组的扩展

* 扩展运算符 ... ==> 复制 , 合并 , 与解构赋值一起使用 const [first, ...rest] =
  [1, 2, 3, 4, 5];

ES5 的写法

Math.max.apply(null, [14, 3, 77])

ES6 的写法

Math.max(...[14, 3, 77])

* Array.from() 类似数组的对象（array-like object ）和可遍历（iterable ）的对象转
  为真正的数组

  array-like object => nodeList ,arguments 对象，还有就是 key 是 number, 并且具
  有 length 属性的对象

* Array.of() Array.of 方法用于将一组值，转换为数组。

* find() 用于找出第一个符合条件的数组成员 , 没有符合条件的成员，则返回
  undefined。

* findIndex() 返回第一个符合条件的数组成员的位置，如果所有成员都不符合件，则返回
  -1。

3. iterable 可遍历对象 =>
