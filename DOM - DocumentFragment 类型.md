## DocumentFragement 类型

**所有节点类型中，只有 DocumentFragment 在文档中没有对应的标记。DOM 规定文本片段（document fragment）是一个 "轻量级" 的文本，可以包含和控制节点，但不会像完整的文档哪样占用额外的资源。一般情况文档片段用于保存将来有可能会添加到文档中的节点**

- nodeType 的值为11
- nodeName 的值为"#document-fragment"
- nodeValue 的值为 null
- parentNode 的值为 null
子节点可以是 Element、ProcessingInstruction、Comment、Text、CDATASection 或 EntityReference

### 创建文档片段

- document.createDocumentFragment() 方法

> 如果将文档中的节点添加到文档片段中，就会从文档树中移除该节点，也不会从浏览器中在看到该节点    
> 添加到文档片段的节点的新节点也同样不属于文档树    
> 通过appendChild() 和 insertBefore() 将文档片段中内容添加到文档中    
> 如果将文档片段作为参数传递给上面的两个方法是，实际上只会讲文档片段的所有节点添加到相应位置，文档片段本身永远不会成为文档树的一部分

```
var fragment = document.createDocumentFragment();
var p = null;
for(var i = 0; i < 3; i++){
	p = document.createElement('p');
	p.appendChild(document.createTextNode(i + '.Hello World!'));
	fragment.appendChild(p);
}
document.body.appendChild(fragment);

// 网页显示的内容:
0.Hello World!
1.Hello World!
2.Hello World!
```