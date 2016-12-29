## 文本框脚本

### `<input>` 元素与 `<textarea>` 元素的区别

```
// 显示25个字符，最多输入不能超过50个字符
<input type="text" size="25" maxlength="50" value="initial value">

// textarea 的 rows 和 cols 特性分别指定的是文本框的字符行数和字符列数，不能指定最大字符数
<textarea rows="25" cols="5">initial value</textarea>

// 用户输入的内容都保存在 value 属性中
```

> 建议使用节点的 value 属性读取或设置文本框的值，不建议使用标准的 DOM 方法

### 1. 选择文本

#### 1.1. select() 方法

- select() 方法用于选择文本框中的所有文本

> `<input>` 和 `<textarea>` 这两个文本框都支持 select() 方法，这个方法用于选择文本框中的所有文本

```
// 在文本框获取焦点时选择其所有文本
EventUtil.addHandler(textbox, 'focus', function (event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	target.select();
});
```

#### 1.2. 选择事件

- select: 当选择了文本框中的文本时，就会触发 select 事件

> 在 IE9+、Opera、FireFox、Chrome 和 safari中，只有用户选择了文本（而且要释放鼠标），才会触发 select 事件。而 IE8 及更早版本中，只要用户选择了一个字母（不必释放鼠标），就会触发 select 事件。另外，在调用 select() 方法是也会触发 select 事件

```
var textbox = document.forms[0].elements['textbox1'];
EventUtil.addHandler(textbox, 'select', function(event){
	var alert('Text selected' + textbox.value);
});
```

#### 1.3. 取得选择的文本

HTML5 扩展了 select 事件，添加了两个属性：selectionStart 和 selectionEnd。

```
// 要取得用户在文本框中选择的文本
function getSelectedText (textbox){
	return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
}
```

> IE9+、FireFox、Safaro、Chrome 和 Opera 都支持这两个属性。IE8 及之前版本不支持这两个属性，但提供了 document.selection 对象，其中保存着用户在整个文档范围内选择的文本信息

```
<form>
	<input type="text" value="see me" name="intxt" size="25" maxlength="50">
</form>

<script type="text/javascript">
	document.body.onload = function(){
		var inp = document.forms[0].elements['intxt'];
		EventUtil.addHandler(inp, 'select', function(event){
			event = EventUtil.getEvent(event);
			var target = EventUtil.getTarget(event);

			if(typeof inp.selectionStart == 'number'){

				console.log(inp.value.substring(inp.selectionStart, inp.selectionEnd));
			}else if(document.selection){
				console.log(document.selection.createRange().text);
			}
		});
	}
</script>
```

#### 1.4. 选择部分文本

- setSelectionRange(): 方法选择文本框中的部分文本，接受两个参数：要选择的第一个字符的索引和要选择的最后一个字符之后的字符索引（类似于 substring() 方法的两个参数）

> IE9、FireFox、Safari、Chrome 和 Opera 支持该方法

### 2. 过滤输入

#### 2.1. 屏蔽字符

```
// 文本框屏蔽他有的字符，则需要检测 keypress 事件对应的字符编码，然后再决定如何响应。
// 由于一些浏览器对一些基础按键也可能会触发 keypress 事件，但是这些字符键码都小于 10，只需要判断键码小于 10就行
// 为了避免 Ctrl 的组合键也触发，需要判断事件对象 event 的 ctrlKey
EventUtil.addHandler(inp, 'keypress', function(event){
	event = EventUtil.getEvent(event);
	var charCode = event.charCode;

	if(!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey){
		EventUtil.preventDefault(event);
	}
});
```

#### 2.2. 操作剪贴板

- boforecopy: 在发生复制操作前触发
- copy: 在发生复制操作时触发
- beforecut: 在发生剪切操作前触发
- cut: 在发生剪切操作时触发
- beforepaste: 在发生黏贴操作前触发
- paste: 在发生黏贴操作时触发

### 3.自动切换焦点

```
<form>
	<input type="text" name="tel1" id="textTl1" maxlength="3">
	<input type="text" name="tel2" id="textTl2" maxlength="3">
	<input type="text" name="tel3" id="textTl3" maxlength="4">
</form>

<script type="text/javascript">
	document.body.onload = function(){
		function tabForward(event){
			event = EventUtil.getEvent(event);
			var target = EventUtil.getTarget(event);

			if(target.value.length == target.maxLength){
				for(var i = 0, len = document.forms[0].elements.length; i < len; i++){
					if(document.forms[0].elements[i] == target){
						if(document.forms[0].elements[i + 1]){
							document.forms[0].elements[i + 1].focus();
						}
						return
					}
				}
			}
		}

		var textbox1 = document.getElementById('textTl1');
		var textbox2 = document.getElementById('textTl2');
		var textbox3 = document.getElementById('textTl3');

		EventUtil.addHandler(textbox1, 'keyup', tabForward);
		EventUtil.addHandler(textbox2, 'keyup', tabForward);
		EventUtil.addHandler(textbox3, 'keyup', tabForward);
	}
</script>
```