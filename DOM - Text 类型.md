## Text 类型

- nodeType 的值为3
- nodeName 的值为"#text"
- nodeValue 的值为节点所包含的文本
- parentNode 是一个Element
- 不支持（没有）子节点

**通过 nodeValue 和 data 属性可以访问Text 节点中包含的文本，这两个属性中包含的值相同。任意修改其中一个值都会反映到另一个值中**

### 属性

- length 获取文本节点中字符的数量，nodeValue.length 和 data.length 中也保存着同样的值

### 文本节点的操作

- appendData(text) 将 text 添加到节点的末尾
- deleteData(offset, count) 从 offset 指定的位置开始删除 count 个字符
- insertData(offset, text) 从 offset 指定的位置插入 text
- replaceData(offset, count, text) 用 text 替换从 offset 指定的位置开始到 offset + count 为此处的文本
- splitText(offset) 从 offset 指定的位置将当前文本节点分成两个文本节点
- substringData(offset, count) 提取从 offset 指定的位置开始 offset + count 为止出的字符串

```
<!-- 没有内容，也就没有文本节点 -->
<div></div>

<!-- 空格，因而有一个文本节点 -->
<div> </div>

<!-- 有内容，因而有一个文本节点 -->
<div>Hello World!</div>
```

### 1. 创建文本节点

- document.createTextNode() 方法创建新文本节点。方法接受一个参数：要插入的节点中的文本

```
var element = document.createElement('div');
element.className = 'message';

var textNode = document.createTextNode('Hello world!');
element.appendChild(textNode);

var anotherTextNode = document.createTextNode('Yippee');
element.appendChild(anotherTextNode);

document.body.appendChild(element);

// 未续
```

**如果同时添加两个文本节点，则这两个文本节点是相邻的同胞节点，两个节点中的文本就会连起来显示，中间不会有空格**

### 2. 规范化文本节点

- normalize() 方法处理文档树中的文本节点 

> 在某个节点上调用这个方法时，如果找到了空文本节点，则删除它；如果找到相邻的文本节点，则将它们合并为一个文本节点

```
// 省略上面代码
element.normalize();
element.firstChild.nodeValue // Hello World!Yippee
element.childNodes.length // 1
```

### 3. 分割文本节点

- splitText() 方法按照指定位置将一个文本节点分隔成两个文本节点，即按指定位置分隔 nodeValue 值

```
// 省略上面代码
var newNode = element.firstChild.splitText(5);
element.firstChild.nodeValue; // 'Hello'
newNode.nodeValue; // ' World!'
element.childNodes.length; // 2
```