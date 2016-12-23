## 动态脚本

```
// 动态加载如下面的代码
<script type="text/javascript" src='./client.js'></script>

function loadScript(url){
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	// 上面的代码都是创建一个 script 元素，把该元素添加到页面中之前，是不会下载外部文件的
	document.body.appendChild(script);
}

loadScript('./client.js');
```

```
// 如果要是实现如下面的代码功能
<script type="text/javascript">
	function sayHi(){
		alert('hi');
	}
</script>

// 使用动态脚本实现如下
function loadScriptString(code){
	var script = document.createElement('script');
	script.type = 'text/javascript';
	try{
		script.appendChild(document.createTextNode(code));	
	}catch(ex){
		// IE 浏览器不允许 DOM 访问 script 元素的子节点，可以使用 script 的 text 属性来指定 JavaScript 代码
		script.text = code;	
	}

	document.body.appendChild(script);
}
loadScriptString('function sayHi(){alert("hi");}');
```

**这种方式加载的代码会在全局作用域中执行，而且当脚本执行后将立即可用。实际上，这样执行代码与在全局作用与众吧相同的字符串传递给 eval() 是一样的**

## 动态样式

```
// 动态加载如下的样式
<link rel="stylesheet" type="text/css" href="./style.css">

function loadStyle(url){
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = url;
	var head = document.getElementsByTagName('head')[0];
	// link 元素需要添加到 head 中
	head.appendChild(link);
}
```

```
<style type="text/css">
	background-color: red;
</style>

function loadStyleString(css){
	var stype = document.createElement('stype');
	stype.rel = 'stylesheet';
	stype.type = 'text/css';
	try{
		stype.appendChild(document.createTextNode(css));
	}catch(ex){
		// 与script 元素类似，IE 浏览器不允许 DOM 访问 style 元素的子节点，可以使用 styleSheet 属性的 cssText 属性来设置 CSS 元素
		stype.stylesheet.cssText = css;	
	}
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(stype);
}

loadStyleString('body{background-color:red}');
```

## 操作表格

**HTML DOM 为<table>、<tbody>、<tr>元素添加了以下属性和方法**

为 table 元素添加的属性和方法如下：
- caption: 保存着对 `<caption>` 元素（如果有）的指针
- tBodies: 是一个 `<tbody>` 元素的 HTMLCollection
- tFoot: 保存着对 `<tfoot>` 元素（如果有）的指针
- tHead: 保存着对 `<tHead>` 元素（如果有）的指针
- rows: 是一个表格中所有行的 HTMLCollection
- createTHead(): 创建 `<thead>` 元素，将其放到表格中，返回引用
- createTFoot(): 创建 `<tfoot>` 元素，将其放到表格中，返回引用
- createCaption(): 创建 `<caption>` 元素，将其放到表格中，返回引用
- deleteTHead(): 删除 `<thead>` 元素
- deleteTFoot(): 删除 `<tfoot>` 元素
- deleteCaption(): 删除 `<caption>` 元素
- deleteRow(pos): 删除指定位置的行
- insertRow(pos): 向 rows 集合中的指定位置插入一行

为 tbody 元素添加的属性和方法如下：
- rows: 保存着 `<tbody>` 元素中行的 HTMLCollection
- deleteRow(pos): 删除指定位置的行
- insertRow(pos): 向 rows 集合中的指定位置插入一行，返回对新插入行的引用

为 tr 元素添加的属性和方法如下：
- cells: 保存着 `<tr>` 元素中单元格的 HTMLCollection
- deleteCell(pos): 删除指定位置的单元格
- insertCell(pos): 想 cells 集合中的指定位置插入一个单元格，返回对新插入单元格的引用

```
// 使用表单操作创建表单
var table = document.createElement('table');
table.body = 1;
table.width = '100%';

var tbody = document.createElement('tbody');
table.appendChild(tbody);

tbody.insertRow(0);
tbody.rows[0].insertCell(0);
tbody.rows[0].cells[0].appendChild(document.createTextNode('Cell 1,1'));
tbody.rows[0].insertCell(1);
tbody.rows[0].cells[1].appendChild(document.createTextNode('Cell 2,1'));

tbody.insertRow(1);
tbody.rows[1].insertCell(0);
tbody.rows[1].cells[0].appendChild(document.createTextNode('Cell 1,2'));
tbody.rows[1].insertCell(1);
tbody.rows[1].cells[1].appendChild(document.createTextNode('Cell 2,2'));

document.body.appendChild(table);
```