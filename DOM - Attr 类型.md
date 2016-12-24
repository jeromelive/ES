## Attr 类型

**元素的特性在 DOM 中以 Attr 类型来表示。在所有浏览器中都可以访问 Attr 类型的构造函数和原型。从技术角度讲，特性就是存在于元素的 attributes 属性中的节点。尽管它们也是节点，但特性却不被认为是 DOM 树的一部分**

- nodeType 的值为2
- nodeName 的值是特性的名称
- nodeValue 的值是特性的值
- parentNode 的值为 null
在HTML 中部支持（没有）子节点

### 属性

**Attr 对象有3个属性：name、value 和 specified**

- name 是特性的名称（与 nodeName 的值相同）
- value 是特性的值（与 nodeValue 的值相同）
- specified 是一个布尔值，用于区别特性是在代码中指定的，还是默认的

### 创建特性节点

- document.createAttribute() 参数为需要创建特性的名称

```
// 要为元素添加 align 特性

var attr = document.createAttribute('align');
attr.value = 'left';
element.setAttributeNode(attr);

// 获取特性的该方法
element.attributes['align'].value // left
element.getAttributeNode('align').value; // left
element.getAttribute('align'); // left

// 前两个方法是获取特性的节点，后一个是获取特性的值
```