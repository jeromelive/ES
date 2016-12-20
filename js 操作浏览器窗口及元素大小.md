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

## 3. 元素大小

获取或设置元素大小的属性和方法，不属于DOM的规范，但各个浏览器都已经支持。

### 3.1. 偏移量

通过下面的4个属性（都以像素计）可以或得元素的偏移量：

offsetHeight：元素在垂直方向上占用的空间大小。包括元素的上下边框和滚动条（如果有），但不包括外边距。

offsetWidht：元素在水平方向桑占用的空间的大小。同上。

offsetLeft：元素的左外边框到包含元素的左内边框的距离

offsetTop：元素的上外边框到包含元素的上内边框的距离

另外，还有一个offsetParent 属性，指向包含该元素的引用。offsetParent属性与ParentNode属性不一定相等，例如，<td>元素的offsetParent属性指向的就是他的祖先元素<table>。

通过offsetTop、offsetLeft和offsetParent属性，通过不断的向上循环叠加，可以基本准确的获取元素的偏移量，例如：

```
       /*获取元素的偏移量*/
    function getElementLeft(elem){
        var actualLeft = elem.offsetLeft,
            current = elem.offsetParent;
        while(current != null){
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        return actualLeft;
    }

    function getElementTop(elem){
        var actualTop = elem.offsetTop,
            current = elem.offsetParent;
        while(current != null){
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    }
```

上面的两个函数，通过不断的叠加offsetLeft 和 offsetTop 值，获取相对精确（不包括所有的的边框的宽度）的元素相对于页面的偏移量。

注：这4个属性是只读的

### 3.2. 客户区大小

元素的客户区大小指的是元素的内容，及其内边距占据的空间的大小。使用下面的两个属性表示：

clientWidth：元素内容区域加左右内边距的宽度

clientHeight：元素内容区域加上下内边距的宽度

注：这两个属性是只读的

### 3.3. 滚动大小

滚动大小指的是包含滚动内容的元素的大小。使用下面的4个属性表示：

scrollWidth：在没有滚动条时，表示内容元素的高度，和width属性相同；在有滚动条时，包含滚动条和隐藏部分的总高度。

scrollHeight：在没有滚动条时，表示内容元素的宽度，和height属性相同；在有滚动条时，包含滚动条和隐藏部分的总宽度。

scrollLeft：被隐藏在内容区左侧的像素数。通过设置这个属性，可以改变元素的滚动位置。

scrollHeight：被隐藏在内容区上方的像素数。通过设置这个属性，可以改变元素的滚动位置。

scrollWidth 和 scrollHeight 属性主要用来确定元素内容的实际大小。例如，带有滚动条的页面的高度是 documen.documentElement.scrollHeight。但对于不包含滚动条的页面，在各个浏览器中 scrollHeight 和 scrollWidth 与 clientWidth 和 clientHeight 表示的宽高有交错，为了准确的获取文档的总高度，应该使用这两组属性较大的一个。例如，下面的代码：

```
     /*获取文档的高度*/
var docHeight = Math.max(document.documentElement.scrollHeight,
                        document.documentElement.clientHeight);
    /*获取文档的宽度*/
var docWidth = Math.max(document.documentElement.scrollWidth,
                        document.documentElement.clientWidth);
```

scrollLeft和scrollTop属性既可以确定当前元素的滚动状态，也可以用来设置元素的滚动位置。例如，当元素不是顶部时，设置它滚动到顶部：

```
     /*设置元素返回顶部*/
function scrollToTop(elem){
    if(elem.scrollTop != 0){
        elem.scrollTop = 0;
    }
}
```

### 3.4. 确定元素的大小

浏览器为每个元素提供了一个getBoundingClientRect( )方法，这个方法返回一个矩形对象，包含：left，top，right 和 bottom 属性，这些属性给出了元素相对于浏览器中的视口的位置。但在IE8及以前的浏览器中认为文档的坐上角的坐标是（2，2），而IE9+和其他浏览器则认为是（0，0）。因此，在使用的时候，需要首先检测文档左上角的左边。另外，在一些浏览中不支持getBoundingClientRect( )方法，这是可以使用元素的offsetLeft、offsetHeight属性，以及文档的scrollLeft和scrollTop属性来获取元素相对于视口的top、left、bottom和right属性。综上，可以使用下面的函数来实现跨浏览器获取元素的 rect 对象：

```
     function getBoundingClientRect(elem){
        var scrollTop = document.documentElement.scrollTop;
        var scrollLeft = document.documentElement.scrollLeft
        if(elem.getBoundingClientRect){
            if(typeof arguments.callee.offset != "number"){
                var temp = document.createElement("div");
                temp.style.cssText = "positon:absolute;left:0;top:0;";
                document.body.appendChild(temp);
                arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
                document.body.removeChild(temp);
                temp = null;
            }
            var rect = elem.getBoundingClientRect();
            var offset = arguments.callee.offset;
            return {
                left : rect.left + offset,
                right : rect.right + offset,
                top : rect.top + offset,
                bottom : rect.bottom + offset
            }
        }else{
            var actualLeft = getElementLeft(elem);
            var actualTop = getElementTop(elem);
            return {
                left : actualLeft - scrollLeft,
                right : actualLeft + elem.offsetWidth - scrollLeft,
                top : actualTop - scrollTop,
                bottom : actualTop + elem.offsetHeight - scrollTop

            }
        }

    }
```