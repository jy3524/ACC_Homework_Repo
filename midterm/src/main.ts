// Dog Character Sprite Source from Friendly Lab by gtibo (https://gtibo.itch.io/lab)
// Learned basic sprite movement and collision from Dower Chin Youtube (https://www.youtube.com/user/dowerchin)
// Advanced Creative Coding - WebGL
// Midterm - Jeongin Yoon

import * as PIXI from 'pixi.js';
import * as dat from 'dat.gui';

// loading objects/assets
const load = (app: PIXI.Application) => {
  return new Promise<void>((resolve) => {
    app.loader.add('character', 'asset/idle_1.png').load(() => {
      resolve();
    });
  });
};

const load1 = (app: PIXI.Application) => {
  return new Promise<void>((resolve) => {
    app.loader.add('circle', 'asset/circle.png').load(() => {
      resolve();
    });
  });
};

const load2 = (app: PIXI.Application) => {
  return new Promise<void>((resolve) => {
    app.loader.add('square', 'asset/square.png').load(() => {
      resolve();
    });
  });
};

const load3 = (app: PIXI.Application) => {
  return new Promise<void>((resolve) => {
    app.loader.add('triangle', 'asset/triangle.png').load(() => {
      resolve();
    });
  });
};

const load4 = (app: PIXI.Application) => {
  return new Promise<void>((resolve) => {
    app.loader.add('pentagon', 'asset/pentagon.png').load(() => {
      resolve();
    });
  });
};

const load5 = (app: PIXI.Application) => {
  return new Promise<void>((resolve) => {
    app.loader.add('hexagon', 'asset/hexagon.png').load(() => {
      resolve();
    });
  });
};

const load6 = (app: PIXI.Application) => {
  return new Promise<void>((resolve) => {
    app.loader.add('art', 'asset/art.png').load(() => {
      resolve();
    });
  });
};

let keys: any = {};
let arts: any = [];
let speed = 5;
let speed1 = 8;
let speed2 = 7;
let speed3 = 9;
let speed4 = 12;
let model = {
  buttonData: {
    width: 200,
    height: 200,
  }
}

const main = async () => {
  let app = new PIXI.Application({antialias: true, backgroundColor: 0x000000})
  // canvas setup
  document.body.style.margin = '0';
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';

  document.body.appendChild(app.view);

  app.renderer.resize(window.innerWidth, window.innerHeight);
  
  await load(app); // loading character
  await load1(app); // loading circle
  await load2(app); // loading square
  await load3(app); // loading triangle
  await load4(app); // loading pentagon
  await load5(app); // loading hexagon
  await load6(app); // loading art

  let texture: any = app.loader.resources['character'].texture;
  let texture1: any = app.loader.resources['circle'].texture;
  let texture2: any = app.loader.resources['square'].texture;
  let texture3: any = app.loader.resources['triangle'].texture;
  let texture4: any = app.loader.resources['pentagon'].texture;
  let texture5: any = app.loader.resources['hexagon'].texture;
  let texture6: any = app.loader.resources['art'].texture;

  // character object
  let character = new PIXI.Sprite(texture);
  character.anchor.set(0.5);
  character.x = app.view.width / 2;
  character.y = app.view.height / 2;
  character.width = 200;
  character.height = 200;

  // circle object
  let circle = new PIXI.Sprite(texture1);
  circle.x = -100;
  circle.y = app.view.height / 2;
  circle.width = 100;
  circle.height = 100;

  // square object
  let square = new PIXI.Sprite(texture2);
  square.x = -100;
  square.y = app.view.height / 4;
  square.width = 100;
  square.height = 100;

  // triangle object
  let triangle = new PIXI.Sprite(texture3);
  triangle.x = -100;
  triangle.y = app.view.height - 100;
  triangle.width = 100;
  triangle.height = 100;

  // pentagon object
  let pentagon = new PIXI.Sprite(texture4);
  pentagon.x = -100;
  pentagon.y = 100;
  pentagon.width = 100;
  pentagon.height = 100;

  // hexagon object
  let hexagon = new PIXI.Sprite(texture5);
  hexagon.x = -100;
  hexagon.y = app.view.height - 200;
  hexagon.width = 100;
  hexagon.height = 100;

  // add objects to stage
  app.stage.addChild(character);
  app.stage.addChild(circle);
  app.stage.addChild(square);
  app.stage.addChild(triangle);
  app.stage.addChild(pentagon);
  app.stage.addChild(hexagon);

  // dat GUI to contorl the size of art
  const gui = new dat.GUI();
  gui.add(model.buttonData, "width", 50, 500);
  gui.add(model.buttonData, "height", 50, 500);

  // collision detection ticker
  app.ticker.add(collision)

  // mouse interactions
  app.stage.interactive = true;
  app.stage.on("pointermove", moveCharacter);
  window.addEventListener("pointerdown", drawArt);
  app.ticker.add(gameLoop1);

  // keyboard interactions
  window.addEventListener("keydown", keysDown);
  window.addEventListener("keyup", keysUp);
  app.ticker.add(gameLoop);

  // adjust window size
  window.addEventListener('resize', (_e) => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  });

  function moveCharacter(e: any) {
    let pos = e.data.global;
    character.x = pos.x;
    character.y = pos.y
  };

  function keysDown(e: any) {
    keys[e.keyCode] = true;
  };
  
  function keysUp(e: any) {
    keys[e.keyCode] = false;
  }; 

  // keyboard interaction function
  function gameLoop() {
    // Up (W or Up arrow)
    if (keys["38"] || keys["87"]) {
      character.y -= 5;
    };
    // Down (S or Down arrow)
    if (keys["40"] || keys["83"]) {
      character.y += 5;
    };
    // Left (A or Left arrow)
    if (keys["37"] || keys["65"]) {
      character.x -= 5;
    };
    // Right (D or Right arrow)
    if (keys["39"] || keys["68"]) {
      character.x += 5;
    };
  }

  // collision detection function
  function collision() {
    circle.x += speed;
    square.x += speed1;
    triangle.x += speed2;
    pentagon.x += speed3;
    hexagon.x += speed4;

    if (intersect(character, circle)) {
      speed = 0;
    }
    if (intersect(character, square)) {
      speed1 = 0;
    }
    if (intersect(character, triangle)) {
      speed2 = 0;
    }
    if (intersect(character, pentagon)) {
      speed3 = 0;
    }
    if (intersect(character, hexagon)) {
      speed4 = 0;
    }
  }

  function intersect(a: any, b: any) {
    let aBox = a.getBounds();
    let bBox = b.getBounds();

    return aBox.x + aBox.width > bBox.x && 
      aBox.x < bBox.x + bBox.width && 
      aBox.y + aBox.height > bBox.y && 
      aBox.y < bBox.y + bBox.height;
  }

  // function for drawing art when clicking mouse
  function drawArt() {
    let art = createArt();
    arts.push(art);
  }

  function gameLoop1() {
    updateArt();
  }

  function updateArt() {
    for (let i = 0; i < arts.length; i++) {
      arts[i].position.x
    }
  }
  // art form settings
  function createArt() {
    let art = new PIXI.Sprite(texture6);
    art.anchor.set(0.5);
    art.x = character.x;
    art.y = character.y;
    art.width = model.buttonData.width;
    art.height = model.buttonData.height;
    app.stage.addChild(art);

    return art;
  }
};

main();