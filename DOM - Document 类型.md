## Document 类型

**document 对象是 HTMLDocument(继承自 Document 类型)的一个实例，表示整个 HTML 页面**

- nodeType 的值为9
- nodeName 的值为"#document"
- nodeValue 的值为 null
- parentNode 的值为 null
- ownerDocument 的值为 null
- 其子节点可能是一个 DocumentType (最多一个)、Element (最多一个)、ProcessingInsttuction 或 Comment


### 1.文档节点

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
### 2. 文档信息

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
> 如果 document.URL 等于 `http://www.wrox.com/WileyCDA/`，那么 document.domain 就等于 www.wrox.com

> 其中 domain 是可以设置的。但由于安全方面的限制，domain 并不能设置任何值，例如 `p2p.wrox.com`，domain 只能设置为 "wrox.com"。不能将这个属性设置为 URL 中部包含的域

> 当页面中包含来自其他子域的框架或内嵌框架时，通过设置 document.domain 能是这些页面相互访问对方包含的 JavaScript 对象。例如，假设有一个页面加载子 `www.wrox.com`，其中包含一个内嵌框架，框架内的页面加载子 p2p.wrox.com。由于 document.domain 字符串不一样，内外两个页面之间无法相互访问对方的 JavaScript 对象。但将两个页面的 document.domain 值都设置为 'wrox.com'，它们之间就可以通信了。

> 如果域名一开始是"松散的"，那么就不能将它再设置为"紧绷的"。就是说：将 document.demain 设置为 "wrox.com" 之后，不能再将其设置回 "p2p.wrox.com"，否则将会导致错误

### 3. 查找元素

document.getElementById() 通过 id 查找,如果存在相同 id 的元素，返回第一个找到的元素，没找到，则返回 null

document.getElementsByClassName() 通过类名查找，返回零或多个元素的 HTMLCollection 对象

document.getElementsByTagName() 通过标签名查找，返回零或多个元素的 HTMLCollection 对象

**要想获取文档中的所有元素，可以使用 getElementsByTagName('*');**

document.getElementsByName() 通过 name 特性查找，返回零或多个元素的 HTMLCollection 对象

> HTMLCollection 对象与 NodeList 对象类似，也是 "动态" 集合。可以使用方括号语法或 item() 方法来访问 HTMLCollection 对象中的项，也可以通过 length 属性获取对象的元素数量。并且还有一个方法：nomedItem()，使用这个方法可以通过元素的 name 特性取得集合中的项

### 4. 特殊集合

以下集合都是 HTMLCollection 对象

document.anchors，包含文档中所有带有 name 特性的 a 元素

document.forms，包含文档中所有的 form 元素，与 document.getElementsByTagName('form') 得到的结果相同

document.images，包含文档中所有的 img 元素，与 document.getElementsByTagName('img') 得到的结果相同

document.links，包含文档中所有带 href 特性的 a 元素

### 5. 文档写入

write() 

writeln()

open()

close()