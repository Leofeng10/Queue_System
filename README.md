# e-menu_pad

## 解决屏幕放大缩小问题

### 安卓手机解决方案：
```
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no"/>
 
//在移动浏览器上页面渲染是在一个叫viewport的页面绘制区域内。
<meta name="viewport"
 
// 设置layout viewport 的宽度，为一个正整数，使用字符串”width-device”表示设备宽度
 content="width=device-width,
 
// 设置页面的初始缩放值，为一个数字，可以带小数
 initial-scale=1.0,
 
//允许用户的最小缩放值，为一个数字，可以带小数
 
 minimum-scale=1.0,
 
//允许用户的最大缩放值，为一个数字，可以带小数
 maximum-scale=1.0,
 
//是否允许用户进行缩放，值为”no”或”yes”, no 代表不允许，yes代表允许
user-scalable=no"/>
```

### IOS端解决方案：

```
<script>
    // 当页面加载完成后触发该函数
    window.onload = function () {
 
        // e.preventDefault()  ===    阻止默认事件
 
        // 当一个手指放在屏幕上时，会触发 touchstart 事件。如 果另一个手指又放在了屏幕上，则会先触发 gesturestart 事件
        document.addEventListener('gesturestart', function (e) {
            e.preventDefault();
        });
 
        // 在单个元素上单击两次 ===  dblclick
        document.addEventListener('dblclick', function (e) {
            e.preventDefault();
        });
 
        // 一个手指放在屏幕上时，会触发 touchstart 事件
        document.addEventListener('touchstart', function (event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        });
 
        // 如果一个或两个手指在屏幕上滑动，将会触发 gesturechange 事件。
        // 但只要有一个手指移开， 就会触发 gestureend 事件，紧接着又会触发基于该手指的 touchend 事件。
        var lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            var now = (new Date()).getTime();
            // 如果在300ms内触发两次touchend，就阻止默认事件
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    };
 
</script>
```

### vue项目在ios滚动不流畅问题的一点方法
然后在最外层再套一个div，不写任何样式，例如：
```
.box{
    overflow-y: scroll;
	touch-action: pan-y;
	-webkit-overflow-scrolling: touch;
	}
<template>
<div>
<div class='box'>
组件的内容
</div>
</div>
</template>
```

### iOS safari 如何阻止“橡皮筋效果”

1.
```
document.body.addEventListener('touchmove', function (e) {
  e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
}, {passive: false}); //passive 参数不能省略，用来兼容ios和android
```

2.
```
ocument.body.addEventListener('touchmove',this.bodyScroll,{passive: false});  
// 实例摧毁解绑 其他页面就可正常滚动
destroyed() {
    document.body.removeEventListener('touchmove',this.bodyScroll,{passive: false});   
}, 
methods: {
    bodyScroll(event) {          
    event.preventDefault();        
},}

```

3.
```
vue-bounce  插件
```