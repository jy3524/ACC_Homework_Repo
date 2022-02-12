# Week3 Assignment - Jeongin Yoon

##### It generates a bezier curve every hour (max 24(hours) lines).

```
let time = new Date().getHours();

if (time === 1) {
    graphics.lineStyle(10, 0xffffff, 1);
    graphics.bezierCurveTo(100,500,1000,100,app.screen.width,app.screen.height);
else if.....
else if.....
```

