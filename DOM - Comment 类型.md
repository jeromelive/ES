## Comment 类型

**注释在 DOM 中是通过 Comment 类型来表示，Comment 类型与 Text 类型继承自相同的基类，因此拥有出了 splitText() 之外的所有字符串操作方法**

- nodeType 的值为8
- nodeName 的值为'#Comment'
- nodeValue 的值是注释的内容
- parentNode 可能是 Document 或 Element
- 不支持（没有）子节点

**通过 nodeValue 和 data 属性可以访问Text 节点中包含的文本，这两个属性中包含的值相同。任意修改其中一个值都会反映到另一个值中**

### 注释节点的操作

- appendData(text) 将 text 添加到节点的末尾
- deleteData(offset, count) 从 offset 指定的位置开始删除 count 个字符
- insertData(offset, text) 从 offset 指定的位置插入 text
- replaceData(offset, count, text) 用 text 替换从 offset 指定的位置开始到 offset + count 为此处的文本
- substringData(offset, count) 提取从 offset 指定的位置开始 offset + count 为止出的字符串

### 创建注释节点

- document.createComment() 