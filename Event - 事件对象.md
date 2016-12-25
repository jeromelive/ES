## 事件对象

通过 HTML 特性指定的时间处理程序，还可以通过一个名叫 event 的变量来访问 event 对象

```
<input type="button" value="Click me" onclick="alert(event.type)" />
```

### 1. DOM 中的事件对象

**兼容 DOM 的浏览器会将一个 event 对象传入到事件处理程序中。无论指定事件处理程序时使用什么方法（DOM0 级 或 DOM2 级），都会传入 event 对象**

DOM 提供的 event 对象主要包含以下属性和方法：

- bubbles: 表明事件是否冒泡，返回一个布尔值
- cancelable: 表明是否可以取消事件的默认行为，返回一个布尔值
- currentTarget: 某事件处理程序当前正在处理事件的那个元素，返回一个元素引用
- defaultPrevented: 为 true 表示已经调用了 preventDefault() 方法
- detail: 与事件相关的细节信息
- eventPhase: 调用事件处理程序的阶段： 1表示捕获阶段，2表示"处理目标"，3表示冒泡阶段
- preventDefault(): 取消事件的默认行为。如果 cancelable 是 true，则可以使用这个方法
- stopPropagation(): 取消事件的进一步捕获或冒泡。如果 bubbles 为 true ， 则可以使用这个方法
- target: 事件的目标
- type: 被触发的事件的类型

> 事件处理程序内部，对象 this 始终等于 currentTarget 的值，而 target 则只包含事件的实际目标。如果直接将事件处理程序指定给目标元素，则 this、currentTarget 和 target 包含相同的值

```
var btn = document.getElementById('myBtn');
// 如果把事件绑定在目标元素上，currentTarget 、 this 和 target 三个值相等
btn.onclick = function (event) {
	alert(event.currentTarget === this) // true
	alert(event.target === this); // true 
}

// 如果把事件绑定在目标元素的父元素上，currentTarget 和 this 等于父元素， target 等于目标元素
document.body.onclick = function(event){
	console.log(event.currentTarget === this);
	console.log(event.currentTarget === document.body);
	console.log(event.target === this);
	console.log(event.target === btn);
}

// 在需要通过一个函数处理多个事件是，可以使用 type 属性
var btn = document.getElementById('myBtn');
var handler = function (event) {
	switch (event.type){
		case 'click':
			alert('Clicked');
			break;
		case 'mouseover': 
			event.target.style.backgroundColor = 'red';
			break;
		case 'mouseout':
			event.target.style.backgroundColor = '';
			break;
	}
};

btn.onclick = handler;
btn.onmouseover = handler;
btn.onmouseout = handler;

// 要阻止特定事件的默认行为，可以使用 preventDefault() 方法
// 要取消进一步的事件捕获或冒泡，使用 stopPropagation() 方法立即停止事件在 DOM 层次中的传播

// 事件对象的 eventPhase 属性，用来确定事件当前正位于事件流的哪个阶段
var btn = document.getElementById('myBtn');
btn.onclick = function (event) {
	console.log(event.eventPhase); // 2 事件处理程序处于目标对象上，这是 currentTarget、this 和 target 始终都是相等的
}
document.body.addEventListener('click', function (event) {
	console.log(event.eventPhase); // 1 事件处理程序处于捕获阶段
}, true);

document.body.onclick = function (event) {
	console.log(event.eventPhase); // 3 事件处理程序处于冒泡阶段
}
```

### 2. IE 中的事件对象

**IE 浏览器中，在使用 DOM0 级方法添加事件处理程序时，event 对象作为 window 对象的一个属性存在**

```
var btn = document.getElementById('myBtn');
btn.onclick = function (event) {
	var event = window.event;
	alert(event.type); // click
}
```

**如果事件处理程序是使用 attachEvent() 添加的，那么就会有一个 event 对象作为参数被传入事件处理程序函数中**

```
var btn = document.getElementById('myBtn');
btn.attachEvent('click', function (event) {
	alert(event.type); // 'click'
});

// 上述指定事件处理程序也可以通过 window 对象来访问 event 对象。不过作为参数传递更方便一些 
```

IE 的 event 对象含有一下属性和方法：
- cancelBubble 默认值为 false，但将其设置为 true 就可以取消事件冒泡（与 DOM 中的 stopPropagation() 方法的作用相同）
- returnValue 默认值为 true，但将其设置为 false 就可以取消事件的默认行为（与 DOM 中的 preventDefault() 方法的作用相同）
- srcElement 事件的目标（与 DOM 中的 target 属性相同）
- type 被触发的事件的类型