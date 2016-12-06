## let命令

`let`命令用来声明变量，用法类似`var`，但器声明的变量，只在let命令所在的代码快内有效。

```
{
	let a = 10;
	var b = 1;
}
```
> a //ReferenceError: a is not defied.
> b //1

```
for( let i = 0; i < 10; i++ ){}
console.log( i );
```
> //ReferenceError: i is not defined


**`var`声明在全局范围内都有效，每次循环j都会覆盖旧值，`let`声明的变量仅在块级作用域内有效:**
```
var arr = [];
for( var j = 0; j < 10; j++ ){
	arr[ j ] = function(){
		console.log( j );
	}
}

var arr1 = [];
for( let l = 0; l < 10; l++ ){
	arr1[ l ] = function(){
		console.log( l );
	}
}
```

> arr[ 6 ](); // 10
> arr1[ 6 ]();// 6

##暂时性死区:##

**只要块级作用域内存在let命令，它所声明的变量就“绑定”这个区域，不在手外部的影响**

```
var tmp = 123;

if(true) {
	tmp = 'abc'; //ReferenceError
	let tmp;
}
```
ES6明确规定，如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就行程了封闭的作用域。凡是在声明之前就使用这些命令，就会报错

## 不允许重复声明 ##

let不允许在相同作用域内，重复声明同一个变量
```
// 报错
{
	let a1 = 10;
	var a1 = 10;
}
// 报错
{
	let a2 = 10;
	let a2 = 1;
}

function func(arg){
	let arg;// 报错
}

function func(arg){
	{
		let arg;// 不报错
	}
}
```