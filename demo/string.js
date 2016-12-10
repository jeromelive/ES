
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
console.log(longString.length);

var hottext = 'MDN';
var url = 'https://developer.mozilla.org/';

console.log(String.fromCharCode(65, 66, 67));
console.log(longString.charAt(2));
console.log(longString.endsWith("ble.", 5));
console.log(longString.includes("ble.", 10));
console.log(longString.indexOf("long", 16));
document.body.innerHTML = longString.anchor("haha");
console.log(longString.indexOf("long", -10));
console.log(longString.indexOf("long", longString.length + 1));
console.log(longString.lastIndexOf("long", -10));
console.log(longString.lastIndexOf("long", longString.length + 1));
document.write(hottext.link(url));
console.log(longString.normalize("NFD"));

console.log(longString.slice(-10, -1));

console.log(longString.slice(5, 14));
console.log(longString.slice(-14, -1));
console.log(longString.slice(15, 5));
console.log(longString.substring(10, 20));
console.log(longString.substring(-1, 20));
console.log(longString.substring(10, -1));
console.log(longString.substr(1,20));
console.log(longString.substr(-10, 20));
var sr = "                         adadada               ";
console.log(sr);
console.log(sr.trim());
console.log(sr.trimLeft());
console.log(sr.trimRight());
