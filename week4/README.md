# Week4 Assignment - Jeongin Yoon

#### Wave

```
  //Wave part
  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 0;  // this location value +50 every iteration
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 1, // duration change over time -0.001
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  //.... repetition of code above


  //Circle part
  for (let j = 0; j < 1000; j++) {
    const graphics = new PIXI.Graphics();
    graphics.x = window.innerWidth / 2;
    graphics.y = window.innerHeight / 2;

    graphics.x += 100 * Math.cos(j/1000 * Math.PI*2);
    graphics.y += 100 * Math.sin(j/1000 * Math.PI*2);
    graphs.push(graphics);
    app.stage.addChild(graphics);
    sizes[j] = 20;

    let tween1 = gsap.to(graphics, {
      x: 3000 * Math.cos(j/1000 * Math.PI*2),
      y: 3000 * Math.sin(j/1000 * Math.PI*2),
      duration: 0.9,
      repeat: -1,
    })
    tween1.then(() => {console.log("animating")})
  }

  graphs.forEach((graph, j) => {
    graph.clear() 
    graph.beginFill(0xffff00)
    graph.drawCircle(0,0,sizes[j])
  })

```