console.log("变量的解构赋值的用途");

{
	let x = 5, y = 7;
	console.log(x + "," + y);
	[x, y] = [y, x];
	console.log(x + "," + y);
}

var [a, b, c] = examp();
var {foo1, bar1} = examp1();
console.log(a + "," + b + "," + c); // 1,2,3
console.log(foo + "," + bar); // 1,2

function examp() {
	return [1, 2, 3];
}
function examp1() {
	return {
		foo1: 1,
		bar1: 2
	};
}

var json = {
	id: 43,
	status: "ok",
	data: [865,242]
}

let {id, status, data: number} = json;
console.log( id,status,number );

var map = new Map();
map.set('first', 'hello');
map.set('last', "world");
for(let [key, value] of map) {
	console.log(key + " is " + value);
}
for(let [key] of map){
	console.log(key);
}
for(let [,value] of map){
	console.log(value);
}