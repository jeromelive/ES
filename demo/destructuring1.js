console.log( "对象解构赋值" );
{
	//变量名与属性名一致
	let { foo, bar } = { foo: "hello", bar: "world" };
	let { baz } = { foo: "aaa", bar: "bbb" };
	console.log( "foo: " + foo ); //foo:hello
	console.log( "bar: " + bar ); //bar:world
	console.log( "baz: " + baz ); //baz:undefined
}
{
	//变量名与属性名不一致
	let { foo: baz } = { foo: "aaa", bar: "bbb" };
	console.log( "baz: " + baz ); //baz: aaa
	let { first: f, last: l } = { first: "xiao", last: "zhao" }
	console.log( "f: " + f ); //f:xiao
	console.log( "l: " + l ); //l:zhao
}
{
	let foo;
	// let { foo } = { foo: "?" }; //ReferenceError
}
{
	let foo;
	( { foo } = { foo: "?" } );
	console.log( "foo: " + foo );
}
{
	let obj = {
		p: [
			"hello",
			{ y: "world" }
		]
	};

	let { p: [ x, { y } ] } = obj;
	console.log( "x: "+ x ); //x: hello
	console.log( "y: "+ y ); //y: world
}
{
	let { message: msg = "Something went wrong" } = {};
	let { x = 1, y = 2 } = { y: 5 };
	let { n = 3 } = { n: null };
	console.log( msg ); //Something went wrong
	console.log( "x: " + x ); //x: 1
	console.log( "y: " + y ); //y: 5
	console.log( "n: " + n ); //n: null
}
{
	let {foo: {bar}} = {baz: 'baz'};
}