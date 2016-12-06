## let命令

let命令用来声明变量，用法类似var，但器声明的变量，只在let命令所在的代码快内有效。

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


***var声明在全局范围内都有效，每次循环j都会覆盖旧值，let声明的变量仅在块级作用域内有效***
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