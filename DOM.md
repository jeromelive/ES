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
	- Node.COMMENT_NODE(8);
	- Node.DOCUMENT_NODE(9);
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

- previueSibling 和 nextSibling 可以访问同一列表中的其他节点
> 列表中第一个节点的 previousSibling 属性的值为 null , 而列表中最后一个节点的 nextSibling 属性的值同样也为 null

- firstChild 和 lastChild 分别指向列表中的第一个和最后一个节点

##### 方法

- hasChildNodes() 节点包含一或多个子节点的情况下返回 true