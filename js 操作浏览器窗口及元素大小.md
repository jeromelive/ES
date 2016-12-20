## 1. 窗口位置

窗口对象对应的是window对象。在window对象中使用属性screenTop、screenLeft、screenY和screenX（单位为像素）两组属性来表示窗口相对于屏幕上边和左边的位置。但在各个浏览器中，对着两组属性的支持有所不同，其中ScreenTop和ScrennLeft属性IE，Safari、Opera和Chrome中用来表示窗口位置属性，而screenX和screenY是FIrefox、Safari和Chrome中用来表示窗口位置的属性。也就说，Safari和Chrome同时支持这两种属性。另外，在Opera中也支持screenX和screenY属性，但与screenTop和screenLeft并不对应，因此，在Opera中不应该使用这两个属性。获取跨浏览器窗口位置的代码应该如下：

```
var leftPos = (typeof window.screenLeft === "number") ? window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop === "number") ? window.screenTop : window.screenY;
```

​需要注意的是，在IE和Opera中screenLeft和ScreenTop中保存的是从屏幕左上角到window对象表示的页面的可见区域的距离，而且如果window对象表示的是页面中的框架时，则返回该框架相对于屏幕左上角的距离。而在Firefox、Safari和Chrome中，screenX和screenY两个属性，则不论window对象代表的是否是框架，始终返回最外层的window对象相对于左上角的距离，也就是top.screenX和screenY。因此，不可能精准的跨浏览器获取窗口的位置。


虽然不能精准的获取窗口的位置，但却可以使用moveTo( )和moveBy( )两个方法，将窗口精确的移动到一个新位置。moveTo( )接受两个参数，代表新位置的坐标，moveBy( )方法也接受两个参数，表示在水平和垂直方向上移动的像素数。例如：

```
 /*将窗口移动到(150,360)*/
window.moveTo(150,360);

/*将窗口向下移动100px*/
window.moveBy(0,100);
```

另外，需要注意的是：

（1）这两个方法可能会被浏览器禁用，在IE7及更高版本和Opera中默认就是禁用的。
（2）这两个方法只能在最外层window对象中使用，不适用于框架

## 2. 窗口大小

```
 IE9+和其他主流浏览器都提供了下面的四个属性来表示浏览器窗口的尺寸：

 innerWidth：表示该容器中页面视图区的宽度（减去边框）

 innerHeight：表示该容器中页面视图区的高度（减去边框）

 outerWidth：表示浏览器窗口自身的宽度（在框架中也适用）

 outerHeight：表示浏览器窗口自身的高度（在框架中也适用）
```

在Opera中outerWidth和outerHeight两个属性，表示的单个标签页对应的浏览器窗口的大小。在Chrome中上面的两组属性相同，都表示视口的大小，而不是浏览器窗口的大小。

在IE8及更早的浏览器中，没有提供获取浏览器窗口的尺寸的属性。但它通过DOM提供了页面可见区域的相关信息，并且这些信息，在其他浏览器中都可以使用。document.documentElement.clientWidth 和 document.documentElement.clientHeight 中保存了页面视口的宽度和高度。而在IE6的混杂模式下，则需要通过document.body中的相应属性去获取。

在跨浏览器的情况下，虽然不能获取窗口的大小，但可以获取视口的大小，在不考虑IE6混杂模式的情况下，可以使用下面的代码：

```
var viewWidth = (typeof window.innerWidth === "number") ? window.innerWidth : document.documentElement.clientWidth;
var viewHeight = (typeof window.innerHeight === "number") ? window.innerHeight : document.documentElement.clientHeight;
```

对于移动设备，window.innerHeight 和 window.innerWidth 保存和可见视口，而移动IE不支持这两个属性，但在document.documentElement.clientHeight 和 document.documentElementWidth 中保存这同样的属性。但在其他浏览器中，后面的这两个属性表示的是整个页面布局视口，也就是页面选然后的实际大小。而IE把后面的这两属性，保存在document.body.clientWidth和document.documentElemtn.clientHeight中。

使用 resizeTo( ) 和 resizeBy( )两个方法可以调整窗口的大小，resizeTo( )方法接收两个参数，新的宽度和高度; resizeBy( )方法也接收两个参数，新窗口和元窗口的宽度和高度差。例如：

```
/*将窗口调整到300*300*/
window.resizeTo(300,300);
/*将窗口扩大的100*50*/
window.resizeBy(100,50);
```