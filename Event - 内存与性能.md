## 内存和性能

### 1. 事件委托

事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。一般在 DOM 树中尽量尽量最高的层次上添加一个事件处理程序


```
<ul id="myLinks">
	<li id="goSomewhere">Go somewhere</li>
	<li id="goSomething">Go something</li>
	<li id="sayHi">Say hi</li>
</ul>

<script type="text/javascript">
	var list = document.getElementById('myLinks');

	EventUtil.addHandler(list, 'click', function (event) {
		event = EventUtil.getEvent(event);

		var target = EventUtil.getTarget(event);

		switch(targer.id){
			case 'doSomething':
				document.title = 'cao';
				break;
			case 'goSomewhere':
				location.hreff = 'http://www.baidu.com';
				break;
			case 'goSomething':
				alert('say hi');
				break;
		}
	});
</script>
```

### 2. 移除事件处理程序

如果带有事件处理程序的元素被 innertHTML 删除了，那么原来添加到元素中的事件处理程序极有可能无法被当作垃圾回收

```
<div id="myDiv">
	<input type="button" id="myBtn" value="Click me" name="" />
</div>

<script type="text/javascript">
	var btn = document.getElementById('myBtn');

	btn.onclick = function () {

		// 先执行某些操作

		btn.onclick = null; // 移除事件处理程序

		document.getElementById('myDiv').innertHTML = 'haha';

	}
</script>
```