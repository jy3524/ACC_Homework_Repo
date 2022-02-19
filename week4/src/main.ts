import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';

const load = (app: PIXI.Application) => {
  return new Promise<void>((resolve) => {
    app.loader.add('circle', 'assets/circle.png').load(() => {
      resolve();
    });
  });
};

let graphs: Array<PIXI.Graphics> = [];
let sizes: Array<any> = [];

const main = async () => {
  let app = new PIXI.Application({antialias: true, backgroundColor: 0x222222});

  document.body.style.margin = '0';
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';

  app.renderer.resize(window.innerWidth, window.innerHeight);

  await load(app);

  let texture = app.loader.resources['circle'].texture;

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 0;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 1,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 50;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.999,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 100;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.998,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 150;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.997,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 200;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.996,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 250;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.995,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 300;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.994,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 350;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.993,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 400;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.992,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 450;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.991,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 500;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.990,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 550;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.989,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 600;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.988,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 650;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.987,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 700;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.986,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 750;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.985,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 800;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.984,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 850;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.983,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 900;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.982,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 950;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.981,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1000;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.980,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1050;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.979,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1100;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.978,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1150;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.977,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1200;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.976,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1250;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.975,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1300;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.974,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1350;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.973,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1400;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.972,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1450;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.970,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1500;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.969,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1550;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.968,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1600;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.967,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1650;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.966,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1700;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.965,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1750;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.964,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1800;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.963,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1850;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.962,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1900;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.961,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 1950;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.960,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2000;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.959,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2050;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.958,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2100;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.958,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2150;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.957,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2200;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.956,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2250;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.955,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2300;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.954,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2350;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.953,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2400;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.952,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2450;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.951,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2500;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.950,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2550;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.949,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2600;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.948,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2650;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.947,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2700;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.946,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2750;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.945,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2800;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.944,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2850;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.943,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2900;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.942,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 2950;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.941,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  for (let i = 0; i < window.innerHeight; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = 3000;
    sprite.y = i;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      y: window.innerHeight,
      duration: 0.940,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }

  /*for (let i = 0; i < window.innerWidth; i++) {
    let sprite = new PIXI.Sprite(texture);
    sprite.scale.set(0.1, 0.1)
    sprite.x = i * 40;
    sprite.y = 0;

    app.stage.addChild(sprite);

    let tween = gsap.to(sprite, {
      //x: window.innerWidth,
      y: window.innerHeight,
      duration: 1,
      stagger: 0.1,
      repeat: -1,
      yoyo: true,
    })
    tween.then(() => {console.log("animating")})
  }*/

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

  window.addEventListener('resize', (_e) => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  });

  document.body.appendChild(app.view);
};

main();