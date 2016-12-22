## history 对象

**history 对象保存着用户上网的历史记录，从窗口被打开的那一刻算起**

### 属性

-length 表示所有历史记录的数量

### 常用方法

- go() 方法可以在用户的历史记录中任意跳转，可以向后也可以向前。该方法接口一个参数，表示向后或向前跳转的页面数的一个整数值。负数表示向后跳转，整数表示向前跳转

```
// 后退一页
history.go(-1);
// 前进一页
history.go(1);
// 前进两页
history.go(2);

也可以给 go() 方法传递一个字符串参数，跳转到历史记录中包含该字符串的第一个位置

// 跳转到最近的 wrox.com 页面
history.go('wrox.com');
// 跳转到最近的 nczonline.net 页面
history.go('nczonline.net');
```

- back() 后退

- forward() 前进