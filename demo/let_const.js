"use strict";
{
	let a = 10;
	var b = 1;
}
// console.log( a );
console.log( b );

for( let i = 0; i < 10; i++ ){}
// console.log( i );

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

arr[ 6 ]();
arr1[ 6 ]();

var tep = 10;
{
	// console.log( tep );
	let tep = 0;
}

{
	let a1 = 10;
	// var a1 = 10;
}

{
	let a2 = 10;
	// let a2 = 1;
}


// function f(){
// 	var temp = 5;
// 	if( true ){
// 		let temp = 10;
// 	}
// 	console.log( temp );
// }
// f();

{
	let a = 'secret';
	function f() {
		console.log( a );
	}
}
// f();

{
	const a = "常量";
	// a = "adad";
	console.log( a );
}
{
	const a = {};
	a.foo = "hello";
	// a = {};
}

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
// student.info.class = 133;
console.log( student.info.class );

{
	var a = 1;
	let b = 1;
	console.log( "1:" + window.a ); // 1
	console.log( "2:" + window.b ); // undefined
	console.log( "3:" +  b );		 // 1
}

// export const A1 = 1;
// export const A2 = 2;
// export const a3 = 3;