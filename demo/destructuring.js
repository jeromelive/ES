console.log( "数组解构赋值" )
let [ foo, [[bar]], baz ] = [ 1, [[2]], 3 ];

console.log( foo ); // 1
console.log( bar ); // 2
console.log( baz ); // 3

let [ , , third ] =  ["foo", "bar", "baz" ];
console.log( third ); // baz

let [ head, ...tail ] = [ 1, 2, 3, 4 ];
console.log( head ); // 1
console.log( tail ); // [ 2, 3, 4 ]

//如果解构不成功，变量的值等于undefined

//不完全解构，但能成功
let [ x, y  ] = [ 1, 2, 3 ];
console.log( x ); // 1
console.log( y ); // 2

//解构赋值允许指定默认值
//ES6内部使用严格相等运算符（===），判断一个位置是否有值，
//如果一个数组成员不严格等于undefined,默认值是不会生效的
var [ yee = true ] = [];
console.log( yee ) // true;

{
	let [ x, y = 'b' ] = [ 'a' ];
	console.log( x ); // a
	console.log( y ); // b
}
{
	let [ x, y = 'b' ] = [ 'a', undefined ];
	console.log( x ); // a
	console.log( y ); // b
}
{
	let [ x = 1 ] = [undefined];
	console.log( x ); // 1

	let [ y = 2 ] = [null];
	console.log( y ) // 2;
}

//如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值
{
	function f(){
		console.log( "hello" );
	}
	let[ x = f() ] = [1]; //
	let[ y = f() ] = []; //hello
}
//默认值可以应用解构赋值的其他变量，但是该变量必须已经声明
{
	let [ x = 1, y = x ] = []; //x=1;y=1;
	// let [ x = y, y = 1 ] = []; //ReferenceError
}
