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
	}
}

var myBtn2 = document.querySelector('#myBtn2');
EventUtil.addHandler(myBtn2, 'click', handler);
function handler(){
	alert(this.id);
}
```