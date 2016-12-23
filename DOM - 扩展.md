## DOM - 扩展

### 选择符 API

- querySelector() 方法接受一个 CSS 选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，返回 null。

> 通过 Document 类型条用 querySelector 方法时，会在文档元素的范围内查找匹配的元素。而通过 Element 类型调用 querySelector() 方法时，只会在该元素后代元素的范围内查找匹配的元素

- querySelectorAll() 方法也接受一个 CSS 选择符，返回一个 NodeList 实例含有所有匹配的元素

> 如 querySelector 类似，可以调用 querySelectorAll() 方法的类型包括 Document、DocumentFragment 和 Element

- matchsSelector() 方法接受一个 CSS 选择符，如果调用元素与该选择符匹配，返回 true ,否则，返回 false

```
// 跨浏览器使用 matchsSelector() 方法
function matchsSelector(element, selector){
	if(element.matchsSelector){
		return element.matchsSelector(selector);
	}else if(element.msMatchsSelector){
		return element.msMatchsSelector(selector);
	}else if(element.mozMatchsSelector){
		return element.mozMatchsSelector(selector);
	}else if(element.webkitMatchsSelector){
		return element.webkitMatchsSelector(selector);
	}else{
		throw new Error('Not supported.');
	}
}
```

### 元素遍历

**对于元素间的空格，IE9 及之前版本不会返回文本节点，而其他所有浏览器都会返回文本节点。导致 childNodes 与 firstChild 等属性的行为不一致**

- childElementCount: 返回子元素（不包括文本节点和注释）的个数
- firstElementChild: 指向第一个子元素; firstChild 的元素版
- lastElementChild: 指向最后一个子元素；lastChild 的元素版
- previousElementSibling: 指向前一个同辈元素；previousSibling 的元素版
- nextElementSibling: 指向后一个同辈元素；nextSibling 的元素版

> 支持上述属性的浏览器有 IE9+、FireFox 3.5+ 、Safari 4+ 、Chrome 和 Opera 10+