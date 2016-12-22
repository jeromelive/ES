## DOM

### 节点

**文档节点是每个文档的根节点，文档节点只有一个子节点，即HTML元素，称为文档元素**
**文档元素是文档的外层元素，文档中的其他所有元素都包含在文档元素中，每个文档只能有一个文档元素**

### Node 类型

**JavaScript 中的所有节点类型都继承自 Node 类型，因此所有节点类型都共享着相同的基本属性和方法**
**除了 IE 之外，其他所有浏览器中都可以访问到这个类型**

#### 属性

- nodeType 用于表明节点的类型

	- Node.ELEMENT_NODE(1);		// 元素节点
	- Node.ATTRIBUTE_NODE(2);	// 属性节点
	- Node.TEXT_NODE(3);		// 文本节点
	- Node.CDATA_SECTION_NODE(4);
	- Node.ENTITY_REFERENCE_NODE(5);
	- Node.ENTITY_NODE(6);
	- Node.PROCESSING_INSTRUCTION_NODE(7);
	- Node.COMMENT_NODE(8);		// 注释节点
	- Node.DOCUMENT_NODE(9);	// document 节点
	- Node.DOCUMENT_TYPE_NODE(10);
	- Node.DOCUMENT_FRAGMENT_NODE(11);
	- Node.NOTATION_NOTE(12);

```
someNode.nodeType == Node.ELMENT.NODE // 在IE中无效
someNode.nodeType == 1 // 适合用于所有浏览器
```

- nodeName 和 nodeValue 这两个属性的值完全取决于节点的类型

> 如果节点是元素节点，nodeName 中保存的时钟都是元素的标签名，而 nodeValue 的值始终为 null

#### 节点的关系

##### 节点属性

- childNodes 保存着一个 NodeList 对象，

> NodeList 是一种类数组对象，用于保存一组有序的节点。可以用方括号语法和 item() 方法来访问 NodeList 的值，而且之歌对象也有 length 属性
> NodeList 是基于 DOM 解构动态执行查询的结果， DOM 解构的变化能够自动反映在 NodeList 对象中

- parentNode 指向文档树的父节点

- previousSibling 和 nextSibling 可以访问同一列表中的其他节点
> 列表中第一个节点的 previousSibling 属性的值为 null , 而列表中最后一个节点的 nextSibling 属性的值同样也为 null

- firstChild 和 lastChild 分别指向列表中的第一个和最后一个节点

- ownerDocument 指向表示整个文档的文档节点

##### 方法

- hasChildNodes() 节点包含一或多个子节点的情况下返回 true

#### 操作节点

- appendChild() 方法用于向 childNodes 列表的末尾添加一个节点。只接受一个参数：即要插入的节点。且返回新增的节点

> 如果传入到 appendChild() 中的节点已经是文档的一部分，那结果就是将该节点从原来的位置转移到新位置

- insertBefore() 方法用于在某个特定的位置上插入节点，接受两个参数：要插入的节点和作为参照的节点。且返回插入的节点

> 如果参照节点是 null ，则 insertBefore() 和 appendChild() 执行相同的操作

- replaceChild() 方法用于替代某个特定的子节点，接受两个参数：要插入的节点和要替换的节点。且返回插入的节点

- removeChild() 方法用于移除特定的子节点。只接受一个参数：即要移除的节点。且返回被移除的节点

> replaceChild 和 removeChild 方法被替换或移除的子节点仍然为文档所有，只是在文档中已经没有了自己的位置

> 上面介绍的四个方法操作都是某个节点的子节点，必须先取得父节点才能使用。另外，并不是所有类型的节点都有子节点，如果在不支持子节点的节点上调用了这些方法，将会导致错误发生

#### 其他方法

- cloneNode() 用于创建调用这个方法的节点的一个完全相同的副本。接受一个布尔值参数，表示是否执行深复制。
	
	参数为true ，执行深赋值，就是复制节点及其整个子节点数   
	参数为false ，执行浅赋值，只复制节点本身 

- normalize() 方法处理文档树中的文本节点

> 在某个节点上调用这个方法时，如果找到了空文本及诶单，则删除它；如果找到相邻的文本节点，则将它们合并为一个文本节点

#### Document 类型

**document 对象是 HTMLDocument(继承自 Document 类型)的一个实例，表示整个 HTML 页面**

- nodeType 的值为9
- nodeName 的值为"#document"
- nodeValue 的值为 null
- parentNode 的值为 null
- ownerDocument 的值为 null
- 其子节点可能是一个 DocumentType (最多一个)、Element (最多一个)、ProcessingInsttuction 或 Comment

获取 html 元素的三种方法
```
document.documentElement;
document.childNodes[0];
document.firstChild;
```

获取 body 元素
```
document.body;
```

获取`<!DOCTYPE>`标签
```
document.doctype // 浏览器的支持差别很大 
```

获取浏览器窗口的标题栏或标签页上，可以修改当前页面的标题并反映在浏览器的标题栏中
```
// 取得文档标题
var title = document.title;
// 设置文档标题
document.title = 'New Page title';
```

与网页的请求有关的属性，URL、domain 和 referrer
- URL 包含页面完整的URL(即地址栏中显示的URL)
- domain 页面的域名
- referrer 链接到当前页面的那个页面的 URL ，在没有来源页面的情况下，refeerer 属性可能会是空字符串

```
// 获取完整的 URL
var url = document.URL;

// 获取域名
var domain = document.domain;

// 取得来源页面的 URL
var referrer = document.referrer;
```

> URL 与 domain 属性是相互关联的。
> 如果 document.URL 等于 http://www.wrox.com/WileyCDA/，那么 document.domain 就等于 www.wrox.com
> 其中 domain 是可以设置的。但由于安全方面的限制，domain 并不能设置任何值，例如 p2p.wrox.com，domain 只能设置为 "wrox.com"