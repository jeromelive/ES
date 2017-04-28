## 事件流

- 事件冒泡 即事件开始时由最具体的元素（文档中嵌套层次最深的那个节点）接受，然后逐级向上传播到较为不具体的节点（文档）

- 事件捕获 从不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件

### DOM事件流

**DOM2级事件规定事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段**

## 事件处理程序

### HTML 事件处理程序

**某个元素支持的每种事件，都可以使用一个与相应事件处理程序同名的 HTML 特性来指定。**这个特性的值能是 JavaScript 代码

```
<input type="button" value="Click me" onclick="alert('Clicked')" />
```

> 由于这个值是 JavaScript ，因此不能再其中使用未经转义的 HTML 语法字符，例如和号（&）、双引号（""）、小于号（<）或大于号（>）。

```
// 要使用双引号
<input type="button" value="Click me" onclick="alert(&quot;Clicked&quot;)" />
```

**如果事件处理程序（事件的函数）是在一个独立的 script 元素中定义的，或包含在一个外部文件中。事件处理程序中的代码在执行时，有权访问全局重要域中的任何代码**

```
<input type="button" value="Click me" onclick="showMessage()" />

<script type="text/javascript">
	function showMessage () {
		alert('Hello world!');
	}
</script>
```

> 这样指定事件处理程序会创建一个封装着元素属性值的函数，这个函数中有一个局部变量 event（事件对象）。函数内部，this 值等于事件的目标元素

**由于函数内 this 值等于事件的目标元素，可以实现扩展作用域的作用。可以更方便地获取元素属性值**

```
function () {
	with (document) {
		with (this) {
			// 元素属性值
		}
	}
}

// 如果当前元素是一个表单输入元素，则作用域中还会包含访问表单元素（父元素）的入口
<form id="myForm">
	<input type="button" value="Click me" name="" onclick="showMessage(this)" />
</form>

function showMessage (self) {
	console.log(event.type);
	with (document){
		with (self.form){
			console.log(id); // myForm
			with (self) {
				console.log(self.value); // Click me
			}
		}
	}
}
// 在 chrome 浏览器中需要手动在 HTML 中传入 this 参数
```

在 HTML 中指定事件处理程序有两个缺点
- 存在一个时差问题：用于可能会在 HTML 元素一出现在页面上就触发相应的时间，但当时的事件处理程序有可能尚不具备执行条件，导致报错
```
// 可以把 HTML 事件处理程序封装在一个 try-catch 块中
<input type="button" value="Click me" name="" onclick="try{showMessage();}catch(ex){}" >
```

- 扩展事件处理程序的作用域链在不同浏览器中会导致不同结果

### DOM0 级事件处理程序

**就是将一个函数赋值给一个事件处理程序属性**

```
<button id="myBtn">Click me</button>

// 这样定义的事件处理程序中的 this 引用当前元素

var btn = document.querySelector('#myBtn');
btn.onclick = function () {
	alert(this.id); // myBtn
}

// 删除 DOM0 设置的事件处理程序
btn.onclick = null;
```

### DOM2 级事件处理程序

**使用 DOM2 级方法添加事件处理程序的主要好处是可以添加多个事件处理程序。**函数中的 this 引用当前元素

- addEventListener() 方法用于指定事件处理程序的操作，只能通过 removeEventListener() 方法删除
	- 接受3个参数：
	- 要处理的事件名
	- 作为事件处理程序的函数
	- 布尔值，为 true 表示捕获阶段调用事件处理程序，反之，表示冒泡阶段调用事件处理程序

- removeEventListener() 方法用于删除事件处理程序的操作，传入参数要与 addEventListener() 方法传入的一致，意味着通过 addEventListener() 添加的匿名函数将无法移除

```
<button id="myBtn1">Click me</button>

var btn1 = document.querySelector('#myBtn1');
btn1.addEventListener('click', function () {
	console.log(this.id);
}, false);
btn1.addEventListener('click', function () {
	console.log('hello world!');
}, false);

// 上述事件处理程序会按照添加的顺序触发

btn1.removeEventListener('click', function () { // 无效
	console.log(this.id);
}, false);


// 正确方式：
var btn1 = document.querySelector('#myBtn1');
var handler = function () {
	alert(this.id);
}

btn1.addEventListener('click', handler, false);
btn1.removeEventListener('click', handler, false);
```

### IE 事件处理程序

**IE 事件处理程序只支持事件冒泡，可以同时添加多个事件处理程序，但执行顺序是后插入先执行。**函数中的 this 引用的是 window（即在全局作用域下运行）

- attachEvent() 方法

- detachEvent() 方法传入参数要与 attachEvent() 方法传入的一致，意味着通过 attachEvent() 添加的匿名函数将无法移除
	- 接受2个参数：
	- 事件处理程序名称
	- 事件处理程序函数

```
<button id="myBtn2">Click me</button>

var btn1 = document.querySelector('#myBtn1');
btn1.attachEvent('onclick', function () {
	console.log(this.id);
});
btn1.attachEvent('onclick', function () {
	console.log('hello world!');
}, false);

// 上述事件处理程序会按照添加的顺序触发

btn1.detachEvent('onclick', function () { // 无效
	console.log(this.id);
});


// 正确方式：
var btn1 = document.querySelector('#myBtn1');
var handler = function () {
	alert(this.id);
}

btn1.attachEvent('onclick', handler);
btn1.detachEvent('onclick', handler);
```

*除了 DOM2 级指定事件处理程序的事件类型不用添加 'on' 前缀，其他的方式都需要添加*