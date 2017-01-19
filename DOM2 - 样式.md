## 样式

**在 HTML 中定义样式的方式有3中：通过`<link/>`元素包含外部样式表文件、使用`<style/>`元素定义嵌入式样式，以及使用 style 特性定义针对特定元素的样式**

**通过元素的 style 特性可以获取到对应的 style 属性。这个 style 对象是 CSSStyleDeclaration 的实例，包含着通过 HTML 的 style 特性指定的所有样式信息，但不包含于外部样式表或嵌入样式表经层叠而来的样式**

> 对于使用短划线（分隔不同的词汇，例如 background-image）的 CSS 属性名，必须将其转换成驼峰大小写形式，才能通过 JavaScript 来访问。其中 float 需要改写为 cssFloat，在 IE 中需要改为 styleFloat

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>DOM</title>
	<style type="text/css">
		div{
			background-color: black;
		}
	</style>
</head>
<body>
	<div style="width: 200px; height: 200px;border: 1px solid" onclick="bigger(this)"></div>
	<script type="text/javascript">
		// 样式
		var myDiv = document.getElementsByTagName('div')[0];

		console.log(myDiv.style); // 一个CSSStyleDeclaration 对象
		console.log(myDiv.style.backgroundColor); // 为空值，无内容显示
		console.log(myDiv.style.width); // 200px

		console.log(myDiv.style.cssText); // width: 200px; height: 200px; border: 1px solid;
		console.log(myDiv.style.getPropertyValue('width')); // 200px

		myDiv.style.removeProperty('width'); // 删除 width 样式

		function bigger(el){
			el.style.width = '300px'; // 通过 sytle 属性设置样式
		}

	</script>
</body>
</html>
```

> 在标准模式下，所有度量值都必须指定一个度量单位。在混杂模式下，可以将 style.width 设置为"20"，浏览器会假设他是"20px"；但是标准模式下，将 style.width 设置为"20"会导致被忽略 -- 因为没有度量单位。所以最好始终都指定度量单位

### style 对象的属性和方法

- cssText: 获取 style 特性中的 CSS 代码
- length: 元素的 CSS 属性的数量，如方括号语法或 item() 配合使用
- getPropertyValue(propertyName): 返回给定属性的字符串值
- item(index): 返回给定位置的 CSS 属性的名称
- removeProperty(propertyName): 从样式中删除给定属性
- setProperty(propertyName,value,priority): 将给定属性设置为相应的值，并加上优先权标志（"important"或者一个空字符串）
- parentRule: 表示 CSS 信息的 CSSRule 对象
- getPropertyCSSValue(propertyName): 返回包含给定属性值的 CSSValue 对象，CSSValue 对象含有两个参数： cssText 和 cssValueType。其中 cssText 属性的值与 getPropertyValue() 返回的值相同，cssValueType 表示值的类型： 0 表示继承的值，1 表示基本的值，2 表示值列表，3 表示自定义的值
- getPropertyPriority(propertyName): 如果给定的属性使用了 !important 设置，则返回 'important'；否则，返回空字符串

### document.defalutView.getComputedStyle() 方法能获取从其他样式表层叠而来并影响到当前元素的样式信息，返回一个 CSSStyleDeclaration 对象

方法接受两个参数： 要取得计算样式的元素和一个伪元素字符串（例如：'after'）。如果不需要伪元素信息，第二个参数可以是 null。

```
// 省略上面代码
var computedStyle = document.defaultView.getComputedStyle(myDiv,null);
console.log(computedStyle.backgroundColor); // rgba(0,0,0);
```

**IE 不支持该方法，但是 IE 中，每个具有 style 属性的元素还有一个 currentStyle 属性，与 getComputedStyle() 方法返回的对象一样**

> 所有计算的样式都是只读的，不能修改计算后样式对象中的 CSS 属性。此外，计算后的样式也包含属性浏览器内部样式表的样式信息，因此任何具有默认值的 CSS 属性都会表现在计算后的样式中
