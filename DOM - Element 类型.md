## Element 类型

- nodeType 的值为1;
- nodeName 的值为元素的标签名
- nodeValue 的值为 null
- parentNode 可能是 Document 或 Element
- 其子节点可能是 Element、Text、Commit、ProcessingInstruction、CDATASection 或 EntityReference 

**访问元素的标签名，可以使用 nodeName 属性，也可以使用 tagName 属性，两者返回相同的值**

```
\<div\>\</div\>
```