## 变动事件(IE9+)

- DOMSubtreeModified: 节点内的节点树发生变化会触发该节点，这个事件冒泡

- DOMNodeRemoved: 在使用 removeChild() 和 replaceChild() 从 DOM 中删除接节点时，首先会触发 DOMNodeRemoved 事件，这个事件的目标(event.target)是时被删除的节点，而 event.relatedNode 属性中包含着对目标节点父节点的引用。在这个事件触发是，节点尚未从其父节点删除，因此其 parentNode 属性仍然指定父节点(与 event.relatedNode) 相同。这个事件冒泡

- DOMNodeInserted: appendChild()、replaceChild() 或 insertBefore() 向 DOM 中插入节点时，首先会触发 DOMNodeInserted 事件。这个事件的目标(event.target)节点是被插入的节点，而 event.relatedNode 属性中包含着一个对父节点的引用。在这个事件触发时，节点已经被插入到了新的父节点中。这个事件是冒泡的，因此可以在 DOM 的各个层次上处理它

> DOMNodeRemoved 和 DOMNodeInserted 事件触发后都会在其目标节点的父节点上触发 DOMSubtreeModified 事件，该事件的目标节点(event.target)是这个父节点，无相关节点值

```
EventUtil.addHandler(window, 'load', function (event) {
	var ul = document.getElementById('myList');

	EventUtil.addHandler(document, 'DOMSubtreeModified', function (event) {
		event = EventUtil.getEvent(event); 
		console.log(event.type); // DOMSubtreeModified
		console.log(event.target); // document.body
		console.log(event.relatedNode); // null
	});

	EventUtil.addHandler(document, 'DOMNodeRemoved', function (event) {
		event = EventUtil.getEvent(event);
		console.log(event.type); // DOMNodeRemoved
		console.log(event.target); // ul
		console.log(event.relatedNode); // document.body
	});
	ul.parentNode.removeChild(ul);
}
```