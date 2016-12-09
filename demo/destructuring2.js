console.log("字符串解构赋值");

var str = "hello";
var [ a, b, c, d, e ] = str;
var {length: len} = str;
console.log("a: " + a); //a: h
console.log("b: " + b); //b: e
console.log("c: " + c); //c: l
console.log("d: " + d); //d: l
console.log("e: " + e); //e: o
console.log("len: " + len); //len: 0

console.log("数值和布尔值解构赋值");

let {toString: n} = 123;
console.log( n === Number.prototype.toString );
let {toString: bool} = true;
console.log( bool === Boolean.prototype.toString );

console.log("函数参数的解构赋值");

[ [1, 2], [3, 4], [5, 6] ].map( ([x, y]) => console.log(x + y) );

add( {x:1, y:2} ); //x = 1; y = 2
add( {x:6} );	//x = 6; y = undefined
add( {} );		//x = undefined; y = undefined
add();			//x = 0; y = 0;
function add( {x = 0, y = 0} = {} ){
	console.log(x + y);
}
[1, undefined, 3, null].map( (x = 'yes') => console.log(x) ); //1,'yes',3,null

[{x: 1}, {x: undefined}, {x: 3}, {x: null}].map( ({x = 'yes'} = {}) => console.log(x) );//1,'yes',3,null
[{x: 1}, {x: undefined}, {x: 3}, {x: null}].map( ({x = 'yes'}) => console.log(x) );//与上面的写法功能一样
//下面对象解构赋值法报错，犹豫undefined和null解构会报错
[1, undefined, 3, null].map( ({x = 'yes'} = {}) => console.log(x) ); //ReferenceError

[[1], [undefined], [3], [null]].map( ([x = 'yes'] = []) => console.log(x) );//1,'yes',3,null
[[1], [undefined], [3], [null]].map( ([x = 'yes']) => console.log(x) );//与上面的写法功能一样