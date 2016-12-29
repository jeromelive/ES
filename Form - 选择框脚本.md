## 选择框脚本

选择框是通过 `<select>` 和 `<option>` 元素创建的。

### 1. `<select>` 元素

除了所有表单字段共有的属性和方法外，HTMLSelectElement 类型还提供下列属性和方法

- add(newOption, relOption): 想控件中插入 `<option>` 元素，其位置的相关项（relOption）之前，如果第二个参数不添加或为 undefined 时，添加为最后一个选择项
- multiple: 布尔值，表示是否允许多项选择；等价于 HTML 中的 multiple 特性
- remove(index): 移除给定位置的选项
- selectedIndex: 基于 0 的选中项的索引，如果没有选中项，则值为 -1.对于支持多选的控件，值保存选中项中第一项的索引。设置该值会导致取消以前的所有选项并选择指定的那一项。
- size: 选择框中可见的行书；等价于 HTML 中的 size 特性

***选项框的 type 属性不是 "select-one"，就是"select-multiple"，这取决于 HTML 代码中有没有 multiple 特性。***

**选项框的 value 属性由当前选中项决定**

- 如果没有选中的项，则选择框的 value 属性保存空字符串
- 如果有一个选中项，而且该项的 value 特性已经在 HTML 中指定，则选择框的 value 属性等于选中项的 value 特性。即使 value 特性的值是空字符串，也同样遵循此条规则
- 如果有一个选中项，但该项的 value 特性的 HTML 中未指定，则选择框的 value 属性等于该项的文本
- 如果有多个选中项，则选择框的 value 属性将依据前两条规则取得第一个选中项的值

```
<select name="location" id="selLocation">
	<option value="Sunnyvale, CA">Sunnyvale</option>
	<option value="Los Angeles, CA">Los Angeles</option>
	<option value="Moutain View, CA">Moutain View</option>
	<option value="">China</option>
	<option>Australia</option>
</select>

// 如果用户选择了其中第一项，则选择框的值就是 'Sunnyvale, CA',
// 如果文本为 "China" 的选项被选中，则选择框的值就是一个空字符串，因为其 value 特性是空的
// 如果选择最后一项，由于 <option> 中没有指定 value 特性，则选择框的值就是 "Australia"
```

### 2. `<option>` 元素

在 DOM 中，每个 `<option>` 元素都是一个 HTMLOptionElement 对象表示，具有下列属性：

- index: 当前选项在 options 集合中的索引
- label: 当前选项的标签；等价于 HTML 中的 label 特性
- selected: 布尔值，表示当前选项是否被选中。将这个属性设置为 true 可以选中当前选项，如果在多选项是不会取消对其他选中项的选择，单选项则会取消选中项。需要注意的是，设置这个值为 false 对单选选择框没有影响
- text: 选项的文本
- value: 选项的值（等价于 HTML 中的 value 特性）

```
// 如果要获取得某个选择框的文本和值，推荐使用下列写法
var text = selectbox.options[0].text; // 选项的文本
var value = selectbox.options[0].value; //选项的值
```

### 3. 添加选项的方式

```
// DOM 方法
var newOption = document.createElement('option');
newOption.appendChild(document.createTextNode('Option text'));
newOption.setAttribut('value', 'Option value');

selectbox.appendChild(newOption);

// 使用 Option 构造函数，Option 构造函数接受两个参数：文本(text)和值(value)，第二个参数可选
var newOption = new Option('Option text', 'Option value');
selectbox.appendChild(newOption); // 在 IE8 及之前的版本中有问题

// 使用选项框的 add() 方法，该方法的第二个参数可以不传，或者为 undefined，新选项就插入到列表最后。
var newOption  = new Option('Option text', 'Option value');
selectbox.add(newOption, undefined); // 最佳方案
```

### 4. 移除选项

```
// DOM 方法
selectbox.removechild(selectbox.option[0]); // 移除第一个选项

// 使用选择框的 remove() 方法，该方法接受一个参数，即要移除选项的索引
selectbox.remove(0);

// 将相应选项设置为 null 
selectbox.options[0] = null; // 移除第一个选项

// 移除所有的选项
function clearSelectbox(selectbox){
	for(var i = 0, len = selectbox.options.length; i < len;i++){
		selectbox.remove(i);
	}
}
```

### 5. 移动和重排选项

```
// 使用 appendChild() 方法可以直接将一个选择框中的选线移动到另一个选择框中
var selectbox1 = document.getElementById('selLocation1');
var selectbox2 = document.getElementById('selLocation2');

selectbox2.appendChild(selectbox1.options[0]); // 将 1 选择框的第一个选择框移到 2 选择框中

// 在一个选择框中向前移动一个选项的位置
var optionToMove = selectbox.options[1];
selectbox.insertBefore(optionToMove, selectbox.options[optionToMove.index - 1]);
```

