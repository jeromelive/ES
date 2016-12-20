##　script 元素的两个重要属性

- async 告诉浏览器立即下载文件，一定会在页面的 load 事件前执行，可能会在DOMContentLoaded 事件触发之前或之后执行

- defer 告诉浏览器立即下载，但延迟执行。现实中，如果同时出现两个带有 defer 属性的 script 元素不一定按先后顺序执行，也不一定在 DOMContentLoaded 事件前执行

## 数据类型

- typeof 操作符

	- "undefined" 如果这个值未定义，使用 var 声明变量但未对其加以初始化时，这个变量的值就是 undefined

		**未初始化和未声明的变量的区别，执行 typeof 操作符都返回 undefiend 值，对未声明的变量，只能执行 typeof 操作符不会报错** 

	- "boolean" 如果这个值是布尔值，