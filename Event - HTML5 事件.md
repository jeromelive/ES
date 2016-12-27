## HTML 5 事件

- contextmenu: 通过单机鼠标右键跳出上下文菜单是触发该事件。这个事件是冒泡的

```
// 下列程序的功能是禁止鼠标右键的默认行为，显示一个自定义菜单
EventUtil.addHandler(document, 'contextmenu', function (event) {
	event = EventUtil.getEvent(event);
	console.log('menu');
	EventUtil.preventDefault(event);

	var menu = document.getElementById('menu');
	menu.style.left = event.clientX + 'px';
	menu.style.top = event.clientY + 'px';
	menu.style.visibility = 'visible';
});

EventUtil.addHandler(document. 'click', function (event) {
	document.getElementById('menu').style.visibility = 'hidden';
});
```

> 支持 contextmenu 事件的浏览器有 IE、FireFox、Safari、Chrome 和 Opera 11+，所以放心用

- beforeunload: 在浏览器卸载页面之前触发，通过它来取消卸载并继续使用原有页面

- DOMContentLoaded: 形成完整的 DOM 树之后就会触发，要处理 DOMContentLoaded 事件可以为 document 或 window 添加相应的事件处理程序（尽管这个事件会冒泡到 window，但它的目标 event.target 实际上是 document）。这个事件并不提供任何额外的信息

> 支持 DOMContentLoaded 事件的浏览器有 IE9+、FireFox、Safari 3.1、Chrome 和 Opera 9+

```
// 对于不支持 DOMContentLoaded 的浏览器可以在加载期间设置一个时间为 0 毫秒的超时调用，如：
setTimeout(function(){
	// 在此添加事件处理程序
}, 0);

// 这段代码的实际意思是：在当前 JavaScript 处理完成后立即运行这个函数，但不一定能保证这个事件处理程序会在 load 事件前运行
```

- readystatechange: 当支持该事件的元素的 readyState 属性发生变化时，触发 readystatechange 事件，radyState 有如下5个值：
	- uninitialized(未初始化): 对象存在但尚未初始化
	- loading(正在加载): 对象正在加载数据
	- loaded(加载完毕): 对象加载数据完成
	- interactive(交互): 可以操作对象了，但还没有完全加载。对于 document 而言，这个阶段相当于 DOMContentLoaded 事件同时触发
	- complete(完成): 对象已经加载完毕

```
EventUtil.addHandler(document, 'readystatechange', function (event) {
	event = EventUtil.getEvent(event);
	console.log(document.readyState); 
});

// 对于较大的外部文件 交互阶段 可能晚于 完成阶段 出现，为了尽可能抢到先机
EventUtil.addHandler(document, 'readystatechange', function (event) {
	if(document.readyState == 'interactive' || document.readyState == 'complete'){
		console.log("Content loaded"); 	
	}
});

// 需要注意的是，当使用 script 和 link 动态加载外部资源时，readyState 为 'loaded' 阶段就表示资源已经是可用的了
EventUtil.addHandler(window, 'load', function (event) {
	var script = document.createElement('script');

	EventUtil.addHandler(script, 'readstatechange', function(event){
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);

		if(target.readyState == 'loaded' || target.readyState == 'complete'){
			EventUtil.removeHandler(target, 'readystatechange', argumrnts.callee);
			console.log('Script Loaded');
		}
	});
	script.src= 'example.js';
	document.body.appendChild(script);
});
```

- hasChange: 在 URL 的参数列表（及 URL 中 "#" 号后面的所有字符串）发生变化时触发该事件，因为在 Ajax 应用中，经常利用 URL 参数列表来保存状态或导航信息。该事件必须添加给 window 对象。此时的 event 对象包含两个属性：
	- oldURL 和 newURL，只有少量浏览器支持这个属性，可以使用 location.hash 来代替

```
EventUtil.addHandler(window, 'hasChange', function (event) {
	// console.log('Old URL:' + event.oldURL + '\nNew URL:' + event.newURL);
	console.log(location.hash);
});
```
> 支持 hasChange 事件的浏览器有 IE8+、FireFox 3.6+、Safari 5+、Chrome 和 Opera 10.6+

- pageshow 和 pagehide 事件