```
<button id="myBtn2">Click me</button>

var EventUtil = {
	addHandler: function (element, type, handler) {
		if (document.addEventListener) {
			element.addEventListener(type, handler, false);
		}else if (document.attachEvent) {
			element.attachEvent('on' + type, handler);
		}else{
			element['on' + type] = handler;
		}
	},
	removeHandler: function (element, type, handler) {
		if (document.removeEventListener) {
			element.removeEventListener(type, handler, false);
		}else if (document.detachEvent) {
			element.detachEvent('on' + type, handler);
		}else{
			element['on' + type] = null;
		}
	},

	// 跨浏览器的事件对象
	getEvent: function (event) {
		return event ? event : window.event;
	},
	getTarget: function (event) {
		return event.target || window.event.srcElement;
	},
	preventDefault: function (event) {
		if (event.preventDefault) {
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},

	stopPropagation: function (event) {
		if (event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	},

	// 获取相关元素
	getRelatedTrget: function (event) {
		if (event.relatedTarget) {
			return event.relatedTarget;
		}else if (event.fromElement) {
			return event.fromElement;
		}else if (event.toElement) {
			return event.toElement;
		}else{
			return null;
		}
	},

	// 支持 DOM 版鼠标事件的浏览器可以通过 hasFeature() 方法来检测
	fetBurron: function (event) {
		if(document.implementation.hasFeature('MouseEvents', '2.0')){
			return event.button;
		}else{
			switch(event.button){
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}
	}

	// 获取鼠标滚轮滚动信息
	getWheelDelta: function(event) {
		if(event.wheelDelta){
			return event.wheelDelta;
		}else{
			return -event.detail * 40;
		}
	}

	// 获取键码
	getCharCode: function (event) {
		if(typeof event.charCode == 'number'){
			return event.charCode;
		}else{
			return event.keyCode;
		}
	}
}

var myBtn2 = document.querySelector('#myBtn2');
EventUtil.addHandler(myBtn2, 'click', handler);
function handler(event){
	alert(this.id);
	event = EventUtil.getEvent(event);

	var target = EventUtil.getTarget(event);

	EventUtil.preventDefault(event);
}
```