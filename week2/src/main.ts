// Assignment 2 - Jeongin Yoon
import * as PIXI from "pixi.js";

const main = async () => {
  const app = new PIXI.Application();

  document.body.style.margin = '0';
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';
  app.renderer.resize(window.innerWidth, window.innerHeight);
  app.renderer.backgroundColor = 0x23395D;

  let graphics = new PIXI.Graphics();
  
  // big box first row loop
  for (let y = 0; y < innerHeight; y += 150) {
    for (let x = 0; x < innerWidth; x += 150) {
      graphics.beginFill(0xFFD700, 1);
      graphics.drawRect(x, y, 75, 75);
    }
  }
  // big box second row loop
  for (let y = 75; y < innerHeight; y += 150) {
    for (let x = 75; x < innerWidth; x += 150) {
      graphics.beginFill(0xFFD700, 1);
      graphics.drawRect(x, y, 75, 75);
    }
  }
  // medium box first row loop
  for (let y = 12.5; y < innerHeight; y += 150) {
    for (let x = 12.5; x < innerWidth; x += 150) {
      graphics.beginFill(0xffffff, 0.5);
      graphics.drawRect(x, y, 50, 50);
    }
  }
  // medium box second row loop
  for (let y = 87.5; y < innerHeight; y += 150) {
    for (let x = 87.5; x < innerWidth; x += 150) {
      graphics.beginFill(0xffffff, 0.5);
      graphics.drawRect(x, y, 50, 50);
    }
  }
  // small box first row loop
  for (let y = 25.5; y < innerHeight; y += 150) {
    for (let x = 25.5; x < innerWidth; x += 150) {
      graphics.beginFill(0xffffff, 0.5);
      graphics.drawRect(x, y, 25, 25);
    }
  }
  // small box second row loop
  for (let y = 100; y < innerHeight; y += 150) {
    for (let x = 100; x < innerWidth; x += 150) {
      graphics.beginFill(0xffffff, 0.5);
      graphics.drawRect(x, y, 25, 25);
    }
  }
  // small dot first row loop
  for (let y = 37.5; y < innerHeight; y += 150) {
    for (let x = 37.5; x < innerWidth; x += 150) {
      graphics.beginFill(0xff0000, 0.5);
      graphics.drawCircle(x, y, 5);
    }
  }
  // small dot second row loop
  for (let y = 112.5; y < innerHeight; y += 150) {
    for (let x = 112.5; x < innerWidth; x += 150) {
      graphics.beginFill(0xff0000, 0.5);
      graphics.drawCircle(x, y, 5);
    }
  }

  app.stage.addChild(graphics);

  window.addEventListener('resize', (_e) => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  })

  document.body.appendChild(app.view);
}

main();