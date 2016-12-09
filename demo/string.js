
console.log('\"');
console.log('\'');
console.log('1\n2');
console.log('1\r2');
console.log('1\t2');
console.log('1\b2');
console.log('1\v2');
console.log('1\\2');
let longString = "This is a very long string which needs \
				to wrap across multiple lines because \
				otherwise my code is unreadable.";
console.log(longString);
console.log(longString.charAt(2));

console.log(String.fromCharCode(65, 66, 67));