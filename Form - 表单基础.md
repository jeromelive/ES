## 表单的基础知识

在 HTML 中，表单是由 `<form>`元素来表示的，而在 JavaScript 中，表单对应的则是 HTMLFormElement 类型。HTMLFormElement 继承了 HTMLElement，因而与其他 HTML 元素具有相同的默认属性。HTMLFormElement 拥有自己的属性和方法：

- acceptCharset: 服务器能够处理的字符集；等价于 HTML 中的 accept-charset 特性
- action: 接受请求的 URL ;等价于 HTML 中的 action 特性
- elements: 表单中所有控件的集合（HTMLCollection）
- length: 表单中控件的数量
- method: 要发送的 HTTP 请求类型，通过是 "get" 或 "post" ;等价于 HTML 的 method 特性
- name: 表单的名称；等价于 HTML 的 name 特性
- reset(): 将所有表单域重置为默认值
- submit(): 提交表单
- target: 用于发送请求和接受响应的窗口名称；等价于 HTML 的 target 特性

```
// 取得表单元素的3中方法
var form = document.getElementById('form1'); 
var form = document.forms[0];	// 取得页面中的第一个表单
var form = document.forms['from1'];	// 取得页面中名称为"form1"的表单
```

### 1.提交表单

使用 `<input>` 和 `<button>` 都可以定义提交按钮，只要将其 type 特性的值设置为 "submit" 即可，而图像按钮则是通过将 `<input>`的 type 特性值设置为 'image' 定义的

```
<!-- 通过提交按钮 -->
<input type="submit" value="Submit Form" name="提交按钮">

<!-- 自定义提交按钮 -->
<button type="submit">Submit Form</button>

<!-- 图像按钮 -->
<input type="image" src="./submit.jpg">
```
> 只要表单中存在上面列出的任何一种按钮，只要在相应表单控件拥有焦点的情况下，按回车键就可以提交该表单。（textarea 除外）如果表单里没有提交按钮，按回车键不会提交表单

**以上述方式提交表单时，浏览器会在将请求发送给服务器之前触发 submit 事件。这样就可以验证表单数据，并决定是否允许表单提交。阻止这个事件的默认行为就可以取消表单提交**

```
var form = document.getElementById('form1'); 

EventUtil.addHandler(form, 'submit', function (event) {
	event = EventUtil.getEvent(event);

	// 阻止默认事件
	EventUtil.preventDefault(event);
});
```

**提交表单也可以通过 JavaScript 中，调用表单中的 submit() 方法。这种方式不会触发表单的 submit 事件**

```
var form = document.getElementById('form1'); 

// 提交表单
form.submit();
```

> 提交表单可能遇到最大的问题，就是重复提交表单。可以在第一次提交表单后就禁用提交按钮，或者利用 onsubmit 事件处理程序取消后续的表单提交操作

### 2.重置表单

在用户单击重置按钮时，表单会被重置。使用 type 特性值为 "reset" 的 `<input>` 或 `<button>` 都可以创建重置按钮

```
<!-- 通用重置按钮 -->
<input type="reset" value="Reset Form">

<!-- 自定义重置按钮 -->
<button type="reset">Reset Form</button>
```

**重置表单也可以通过 JavaScript 中，调用表单中的 reset() 方法。**

```
var form = document.getElementById('form1'); 

// 重置表单
form.reset();
```

> 上述重置表单的方法都会触发表单的 reset 事件

### 3.表单字段

每个表单都有 element 属性，该属性是表单中所有表单元素（字符）的集合。elements 集合是一个有序列表，其中包含着表单中所有字段，例如 `<input>`、`<textarea>`、`<button>` 和 `<fieldset>`。每个表单字段在 elements 集合中的顺序，与它们出现在标记中的顺序相同，可以按照位置和 name 特性来访问它们。如果多个字段含有相同的 name 就会返回以该 name 命令的一个 NodeList 

```
var form = document.getElementById('form1'); 

// 取得表单中的第一个字段
var field1 = form.elements[0];

// 取得名为"textbox1"的字段
var field2 = form.element["textbox1"];

// 取得表单中包含的字段的数量
var fieldCount = form.elements.length;
```

#### 3.1.共有的表单字段属性

除了 `<fieldset>` 元素之外，所有表单字段都拥有相同的一组属性。需要注意的是 `<input>`类型可以表示多种表单字段，因策有些属性只适用于某些字段，但还有一些属性是所有字段所共有的

表单字段共有的属性如下：
- form: 指向字段所属表单的指针；只读
- disabaled: 布尔值，表示当前字段是否被禁用
- name: 当前字段的名称
- readOnly: 布尔值，表示当前字段是否只读
- tabIndex: 表示当前字段的切换（tab）序号
- type: 当前字段的类型，如 "checkbox"、"radio"，等等
- value: 当前字段将被提交给服务器的值。对于文件字段来说，这个属性是只读的，包含着文件在计算机中的路径

```
// 避免多次提交表单
EventUtil.addHandler(form,'submit', function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	// 取得提交按钮
	var btn = target.elements('submit-btn');

	// 禁用他
	btn.disabled = true;
});

// 不能使用 onclick 事件处理程序来实现这个功能，因为不同浏览器之间存在"时差"，click 事件可能在 submit 事件前出发。如果 click 事件先触发意味着会在提交发生之前禁用按钮
```

### 3.2.共有的表单字段方法

- focus(): 表单字段获取焦点
- blur():  从元素中移走焦点

*** 当表单字段的第一个元素，其 type 特性值为 'hidden'、CSS 的 display 和 visiblity 属性隐藏了该字段，会导致错误 ***

> HTML5 为表单字段新增了一个 autofocus 属性，自动获取焦点

### 3.3.共有的表单字段事件

- focues: 当前字段获取焦点时触发

- blur: 当前字段失去焦点时触发

- change: 对于`<input>`和 `<textarea>`元素，在他们失去焦点且 value 值改变时触发；对于 `<select>`元素，在其选项改变时触发