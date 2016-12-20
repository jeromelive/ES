/*
* @Author: jeromelive
* @Date:   2016-12-11 20:04:00
* @Last Modified by:   jeromelive
* @Last Modified time: 2016-12-11 23:39:11
*/

// 'use strict'; 


// var re = new RegExp(/[\d]{1}/,"g");
var re = /[\d]{1}/g;
var str = 'xiao24242zh42424ao242';

console.log(re.exec('2sdfssfsf42sfsf322242s42fs242342sdfs4sfs'));
console.log(str.search(/2424/));
console.log(str.match(/2/g));
console.log(str.replace(/s/, '9'));
console.log(str.replace(/2/, function(e) {
	return 2 + 5;
}));
console.log(str.repeat(9));