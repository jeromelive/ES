### 触摸与手势事件

#### 1. 触摸事件

- touchstart: 当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发，只有 ios 版的 safari 支持多点触摸

- touchmove: 当手指在屏幕上活动室连续地触发。在这个事件发生期间，调用preventDefault() 可以阻止滚动

- touchend: 当手指从屏幕上移开时触发

- touchcancel: 当系统停止跟踪触摸是触发

> 每个触摸事件的 event 对象都提供了在鼠标事件中常见的属性： bubbles、cancelable、view、clientX、clientY、screenX、screenY、detail、altKey、shiftKey、ctrlKey 和 metaKey

**除了常见的 DOM 属性外，触摸时间还包含下列三个用于跟踪触摸的属性**

- touches: 表示当前跟踪的触摸操作的 Touch 对象的数组

- targetTouches: 特定于事件目标的 Touch 对象的数组

- changeTouches: 表示自上次触摸以来发生了什么改变的 Touch 对象的数组

每个 Touch 对象包含下列属性：

- clientX: 触摸目标在视口中的 x 坐标

- clientY: 触摸目标在视口中的 Y 坐标

- identifier: 标识触摸的唯一 ID

- pageX: 触摸目标在页面中的 x 坐标

- pageY: 触摸目标在页面中的 y 坐标

- screenX: 触摸目标在屏幕中的 x 坐标

- screenY: 触摸目标在屏幕中的 y 坐标

- target: 触摸的 DOM 节点目标

> 注意，在 touchednd 事件发生时，touches 集合中就没有任何 Touch 对象，因为不存在活动的触摸操作，此时，必须转而使用 changeTouches 集合

**触摸屏幕上的元素时，触发的事件顺序如下：**
1. touchstart    
2. mouseover    
3. mousemove(一次)    
4. mousedown     
5. mouseup    
6. click    
7. touchend   

```
var p = document.querySelector('p');
document.body.onload = function(){
	function handleTouchEvent (event) {
		event = EventUtil.getEvent(event);
		if (event.touches.length == 1){
			switch (event.type){
				case 'touchstart': 
					p.firstChild.nodeValue = '触屏坐标：\n (' + event.touches[0].clientX + ',' + event.touches[0].clientX + ')';
					break;
				case 'touchend': 
					p.firstChild.nodeValue = '触摸坐标: \n(' +event.changeTouches[0].clientX + ',' + event.changeTouches[0].clientX + ')';
					break;
				case 'touchmove':
					EventUtil.preventDefault(event);
					p.firstChild.nodeValue = '滚动坐标：\n (' + event.changeTouches[0].clientX + ',' + event.changeTouches[0].clientX + ')';
					break;
			}
		}
	}

	EventUtil.addHandler(document, 'touchstart', handleTouchEvent);
	EventUtil.addHandler(document, 'touchend', handleTouchEvent);
	EventUtil.addHandler(document, 'touchmove', handleTouchEvent);
}
```

#### 2. 手势事件 

**ios 2.0 中的 safari 支持一组手势事件。当两个手指触摸屏幕是就会产生手势，手势通常会改变显示项的大小，或者旋转显示项**

- gesturestart: 当一个手指已经按在屏幕上二另一个手指又触摸屏幕时触发

- gesturechange: 当触摸屏幕的任何一个手指的位置发生变化时触发

- gestureend: 当任何一个手指从屏幕上面移开时触发

> 每个手势事件的 event 对象都提供了在鼠标事件中常见的属性： bubbles、cancelable、view、clientX、clientY、screenX、screenY、detail、altKey、shiftKey、ctrlKey 和 metaKey，还二外提供 rotation 和 scale

- rotation: 表示手指变化引起的旋转角度，负值表示逆时针旋转，正值表示顺时针旋转（该值从 0 开始）

- scale: 表示两个手指间距离的变化情况（例如向内收缩会缩短距离），这个值从 1 开始并随距离拉大而增长，随距离缩短而减小