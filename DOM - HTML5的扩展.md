## HTML5的扩展

### 类相关的扩展

- getElementsByClassName() 方法接受一个参数，即一个包含一或多个类名的字符串，返回带有指定类的所有元素的 NodeList

```
// 取得所有类中包含 'username' 和 'current' 的元素，类名的先后顺序无所谓
var allCurrentUserNames = document.getElementsByClassName('uesername current');

// 取得 ID 为 'myDiv' 的元素中带有类名 'selected' 的所有元素
var selected = document.getElementById('myDiv').getElementsByClassName('selected');
```

> 支持上述属性的浏览器有 IE9+、FireFox 3+ 、Safari 3.1+ 、Chrome 和 Opera 9.5+

- classList 属性

**classList 属性是新集合类型 DOMTokenList 的实例，DOMTokenList 有一个表示自己包含多少元素的 length 属性，可以通过 item() 方法或方括号语法取得每个元素**

方法：
- add(value): 将给定的字符串值添加到列表中。如果值已经存在，就不添加了
- contains(value): 表示列表中是否存在给定的值，如果存在则返回 true ，否则返回 false
- remove(value): 从列表中删除给定的字符串
- toggle(value): 如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它

### 焦点管理

- document.activeElement 属性，这个属性始终会引用 DOM 中当前获得了焦点的元素。

> 元素获得焦点的方式有页面加载、用户输入（通过是通过按 Tab 键）和在代码中调用 focus() 方法。默认情况下，文档刚加载完成时，documen.activeElement 中保存的是 document.body 元素。文档加载期间，document.activeElement 的值为 null

```
var button = document.getElementById('myButton');
button.focus();

document.activeElement === button; // true
```

- document.hasFocus() 方法用于确定文档是否获得了焦点

```
var button = document.getElementById('myButton');
button.focus();

document.hasFocus() // true
```

> 通过检测文档是否获得了焦点，可以知道用户是不是正在与页面交互
> 支持上述属性的浏览器有 IE4+、FireFox 3+ 、Safari 4+ 、Chrome 和 Opera 8+

### HTMLDocument 的变化

#### 1.readyState 属性

document.readyState 属性用于实现文档加载的指示器，有两个可能的值：

- loading: 正在加载文档
- complete: 已经加载完文档

#### 2.兼容模式

自从 IE6 开始区分渲染页面的模式是标准的还是混杂的

document.compatMode 属性用于告诉开发人员浏览器采用哪种渲染模式，有两个可能的值：

- CSS1Compat 标准模式
- BackCompat 混杂模式

#### 3.head 属性

document.head 不一定有用

```
var head = document.head || document.getElementsByTagName('head')[0];
```

### 字符集属性

document.charset 获取或设置文档中实际使用的字符集，默认值为 'UTF-16'

document.defaultCharset 根据默认浏览器及操作系统的设置，当前文档默认的字符集

### 自定义数据属性

HTML5 规定可以为元素添加非标准的属性，但要添加前缀 data-，目的是位元素提供与渲染无关的信息，或者提供语义信息

```
<div id="myDiv" data-appId='12345' data-myname='Nicholas'></div>
```
可以通过元素的 dataset 属性来访问自定义属性的值

```
var div = document.getElementById('myDiv');

var appId = div.dataset.appId;
var myName = div.dataset.myname;
```

### 插入标记

- innerHTML 属性能获取设置调用元素的所有子节点（包括元素、注释和文本节点）对应的 HTML 标签

- outerHTML 属性能获取设置调用元素及其所有子节点的 HTML 标签，如果设置元素的 outerHTML 值，调用的元素会被完全替换掉

```
element.outerHTML = '<p>This is a paragraph.</p>'

等价于：
var p = document.createElement('p');
p.appendChild(document.createTextNode('This is a paragraph.'));
element.parentNode.replaceChild(p,div);
```

- insertAdjacentHTML() 方法按照指定位置插入 HTML 文本，接受两个参数：插入的位置和要插入的 HTML 文本

第一个参数必需是下列值之一：
	- 'beforebegin': 在当前元素之前插入一个紧邻的同辈元素
	- 'afterbegin': 在当前元素之下插入一个新的子元素或在第一个元素之前再插入新的子元素
	- 'beforeend': 在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入新的子元素
	- 'afterend': 在当前元素之后插入一个紧邻的同辈元素

> 第二个参数是 HTML 字符串，如果浏览器无法解析该字符串，就会抛出错误

```
// 作为前一个同辈元素插入
element.insertAdjacentHTML('beforebegin', '<p>Hello wolrd!</p>');

// 作为第一个子元素插入
element.insertAdjacentHTML('afterbegin', '<p>Hello wolrd!</p>');

// 作为最后一个子元素插入
element.insertAdjacentHTML('beforeend', '<p>Hello wolrd!</p>');

// 作为后一个同辈元素插入
element.insertAdjacentHTML('afterend', '<p>Hello wolrd!</p>');
```

### 内存与性能问题

**在使用 innerHTML、outerHTML 和 insertAdjacentHTML() 方法删除带有事件处理程序或引用了其他 JavaScript 对象子树是，有可能导致内存占用问题。例如元素已经被删除，元素与时间处理程序之间的绑定关系在内存中并没有一并删除。最好先手动删除要被替换的元素的所有事件处理程序和 JavaScript 对象属性**

```
for(var i = 0, len = values.length; i < len; i++){
	ul.innerHTML += '<li>' + values[i] + '</li>'; // 要避免这种频繁操作，会导致性能损失
}

// 应该改为
var itemHtml = '';
for(var i = 0, len = values.length; i < len; i++){
	itemHtml += '<li>' + values[i] + '</li>'; // 要避免这种频繁操作，会导致性能损失
}
ul.innerHTML = itemHtml;
```

- scrollIntoView() 方法通过滚动浏览器或者某个容器元素，调用的元素就可以出现在视口中，所有 HTML 元素都能调用该方法。如果传入 true 作为参数，或者不任何参数，窗口滚动之后会让调用元素的顶部与饰扣顶部尽可能平齐。如果传入 false 作为参数，调用元素会尽可能全部出现在视口中，（可能的话，调用元素的底部会与视口顶部平齐）

- children 属性与 childNodes 功能一样

- contains() 方法判断调用的元素节点是某传入元素节点的后代

```
document.documentElement.contains(document.body); // true
```

- compareDocumentPosition() 方法确定节点间的关系，返回 5 个位掩码的值
	- 1: 无关（给定的节点不在当前文档中）
	- 2: 居前（给定的节点在 DOM 树中位于参考节点之前）
	- 4: 居后（给定的节点在 DOM 树中位于参考节点之后）
	- 8: 包含（给定的节点是参考节点的祖先）
	- 16: 被包含（给定的节点是参考节点的后代）