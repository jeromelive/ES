## 1.1.let命令

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

## 1.2.const命令 ##

**`const`用于声明常量，一旦声明，常量的值就不能改变，只在声明所在模块作用域有效。对于符合类型变量，`const`声明的常量名指向数据所在的地址，所以仅保证变量名指向的地址不变，并不保证该地址的数据不变**

```
{
	const a = "常量";
	a = "adad";		//报错
}
```

```
{
	const a = {};
	a.foo = "hello";
	a = {};		//报错
}
```

使用对象冻结函数,Object.freeze方法可以使对象添加新属性不起作用


##暂时性死区:##

**只要块级作用域内存在`let`或`const`命令，无变常量提升，它所声明的变量就“绑定”这个区域，不再受外部的影响**

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

{
	var message = "Hello!";
	let age = 25;

	//以下代码会报错
	const message = "Goodbye!";
	const age = 30;
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

```
var constantize = ( obj ) => {
	Object.freeze( obj );
	Object.keys( obj ).forEach( ( key, value ) => {
		if( typeof( obj[ key ] )  === "object" ){
			constantize( obj[key] );
		}
	} )
}

const student = {
	name : "jeorme",
	info : {
		class : 132,
		classmates : 40,
		teacher : "冬冬"
	}
}

constantize( student );
student.info.class = 133;//报错
console.log( student.info.class );
```

## 1.3.块级作用域 ##

**有利于防止后面的同名变量或函数覆盖前面的同名变量或函数**

```
function f(){
	var temp = 5;
	if( true ){
		let temp = 10;
	}
	console.log( temp );
}
f(); // 5
```

> ES6允许块级作用域的任意嵌套:{{{{{{ let ins = "hello wolrd" }}}}}}; 功能与匿名函数相同
> ES6也规定了函数本省的作用域，在其所在的块级作用域之内

```
{
	let a = 'secret';
	function f() {
		console.log( a );
	}
}
f();// secret
亲测在chrome/Edge上不报错
在严格模式下报错"use strict";
```

> 严格模式下，函数只能在顶层作用域或函数内声明，其他情况（比如if代码块、循环代码块）的声明都会报错

## 1.4.跨模块常量 ##

如果想设置跨模块的常量，可以采用以下写法。

```
//let_const.js
export const A1 = 1;
export const A2 = 2;
export const a3 = 3;

//let_const_test1.js模块
import * as constants from "./constants";
console.log( constans.A1 );
console.log( constans.A2 );

//let_const_test2.js模块
import {A1,A3} from "./constants";
console.log( "A1:" + A1 );
console.log( "A3:" + A3 );
```

## 1.5.全局对象的属性 ##

> 浏览器的全局对象指的是`window`对象，ES5中，全局对象的属性与全局变量是等价的
> Node.js值得是`global`对象

ES6规定：`var`命令和`function`命令声明的全局变量，依旧是全局对象的属性；`let`命令、`const`命令、`class`命令声明的全局变量，不属于全局对象的属性

```
var a = 1;
let b = 1;
console.log( window.a ); // 1
console.log( window.b ); // 也为1，直接运行为1？？？？？？，why?
console.log( b );		 // 1
```