// var promise = new Promise(function(resolve, reject) {

// 	if(/* 异步操作成功 */) {
// 		resolve(value);
// 	} else {
// 		reject(error);
// 	}
// });

// promise.then(function(value) {
// 	// sucess
// }, function(value) {
// 	//failure
// });

// function timeout(ms) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(resolve, ms, 'done');
// 	});
// }

// timeout(10000).then((value) => {
// 	console.log(value);
// });

function loadImageAsync(url) {
	return new Promise((resolve, reject) => {
		var image = new Image();

		image.onload = () => {
			resolve(image);
		};

		image.onerror = () => {
			reject(new Error('Could not load image at' + url));
		}

		image.src = url;
	})
};

loadImageAsync('https://www.google.co.jp/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png').then((node) => {
	var img = document.createElement('img');
	img.src = node.src;
	document.body.appendChild(img);
}, (obj) => {
	console.log(obj);
});