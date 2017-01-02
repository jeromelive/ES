## Element 类型

- nodeType 的值为1;
- nodeName 的值为元素的标签名
- nodeValue 的值为 null
- parentNode 可能是 Document 或 Element
- 其子节点可能是 Element、Text、Commit、ProcessingInstruction、CDATASection 或 EntityReference 

**访问元素的标签名，可以使用 nodeName 属性，也可以使用 tagName 属性，两者返回相同的值**

```
<div id="myDiv"></div>

var div = document.getElementById('myDiv');
// HTML 中，标签名始终都以全部大写表示
div.tagName; // 'DIV'
div.nodeNmae; // 'DIV'
```

### 1. HTML 元素

**所有 HTML 元素都由 HTMLElement 类型表示，不是直接通过这个类型，也是通过它的子类型来表示**

每个 HTML 元素中都存在下列标准特性

- id 元素在文档中的位置标识符;
- title 有关元素的附加说明信息，一般通过工具提示条显示出来
- dir 语言的方向，值为'ltr'或'rtl'
- className 与元素的 class 特性对应，即为元素指定的 CSS 类

### 2. 取得特性

**特性的名称是不区分大小写的**

- getAttribute() 方法通过传入特性名来查找特性的值，如果不存在，返回null

- 公认的特性可是以属性的形式从 DOM 对象中获取，如：id、align等

### 3. 设置特性

- setAttribute() 方法会以指定的值替换现有的值，如果特性不存在，则创建该属性并设置相应的值。

> 接受两个参数：要设置的特性名和值

- 公认的特性可以通过属性的形式设置特性的值，如：div.id = "someOtherId"、div.align = 'left'...

**自定义的特性不会以属性的形式添加到 DOM 对象中，因此不能以属性的形式获取或设置特性的值**

### 4. 删除特性

- removeAttribute() 方法用于彻底删除元素的特性，不仅清楚特性的值，而且也会从元素中完全删除特性

### 5. attributes 属性

attributes 属性包含一个 NamedNodeMap，与 NodeList 类似，也是一个 "动态" 的集合。元素的每一个特性都由一个 Attr 节点表示，每个节点都保存在 NamedNodeMap 对象中

NamedNodeMap 对象拥有的方法

- getNamedItem(name) 返回 nodeName 属性等于 name 的节点
- removeNamedItem(name) 从列表中移除 nodeName 属性等于 name 的节点，效果与元素节点调用 removeAttribute() 一样，但 removeNamedItem 方法会返回表示被删除特性的 Attr 节点
- setNamedItem(node) 向列表中添加节点，以节点的 nodeName 属性为索引。
- item(pos) 返回位于数字 pos 位置处的节点

**attributes 属性中包含一系列节点，每个节点的 nodeName 就是特性的名称，而节点的 nodeValue 就是特性的值。可以通过节点的 nodeValue 设置特性的值**

```
// 获取元素的 id 特性
var id = element.attributes.getNamedItem('id');
var id = element.attributes['id']; //等同于上面

// 获取元素的 id 特性的值
var id = element.attributes.getNamedItem('id').nodeValue;
var id = element.attributes['id'].nodeValue;

// 通过nodeValue 设置特性的值
element.attributes['id'].nodeValue = 'someOtherId';

// 使用 Attributes 遍历元素的特性
function outputAttributes(element){
	var pairs = new Array(),
		attrName,
		attrValue,
		i,
		len;

	for(i=0, len = element.attributes.length; i < len; i++){
		attrName = element.attributes.item(i).nodeName;
		attrValue = element.attributes.item(i).nodeValue;
		pairs.push(attrName + '=\"' + attrValue + '\"');
	}

	return pairs.join(' ');
}
```

### 6. 创建元素

- document.createElement() 方法可以创建新元素，只接受一个参数，即要创建元素的标签名

### 7. 元素的子节点

元素可以有任意数目的子节点和后代节点，因为元素可以是其他元素的子节点。元素的 childNodes 属性中包含了它的所有子节点，这些子节点有可能是元素、文本节点、注释或处理指令。不同浏览器在看待这些节点方面存在显著的不同

```
// 需要通过 childNodes 属性遍历子节点，要先检查一下 nodeType 属性

for(var i = 0, len = element.childNodes.length; i < len; i++){
	// 判断节点是否为元素节点
	if(element.childNodes[i].nodeType == 1){
		// 执行某些操作
	}
}
```

**元素也支持 getElementsByTagName() 方法。搜索起点为当前元素，并只返回当前元素的后代，并且返回的不只是直接后代**