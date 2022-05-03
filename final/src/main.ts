import './style.scss';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PerspectiveCamera, Mesh, MeshLambertMaterial, SphereBufferGeometry, TextureLoader } from 'three';
import * as CANNON from 'cannon-es';
import { gsap } from 'gsap';

import { ViewOne } from './view/ViewOne';
import { BaseView } from './view/BaseView';

import vertexShader from './shaders/vertex.glsl?raw';
import fragmentShader from './shaders/fragment.glsl?raw';

let model = {
  activeView: 0,
  pointerPosition: new THREE.Vector2(0,0)
}

let camera: PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: FirstPersonControls;
let controlsD: DragControls;
let stats: any;

let viewOne: ViewOne;
let views: BaseView[] = [];

let plane: Mesh;
let material: MeshLambertMaterial;
let raycaster: THREE.Raycaster;

let cubeMesh: Mesh;
let clickMarker: Mesh;
let movementPlane: Mesh;
let sphereMesh: Mesh;
let ballMesh: Mesh;
let frontWallMesh: Mesh;
let leftWallMesh: Mesh;
let rightWallMesh: Mesh;
let backWallMesh: Mesh;

let world: CANNON.World;
let cubeBody: CANNON.Body;
let jointBody: CANNON.Body;

let tl: any;
let tl1: any;
let glbModel: THREE.Group;
let danceModel: THREE.Group;
let mixer : THREE.AnimationMixer;

const meshes: any = [];
const bodies: any = [];

function main() {
  initScene();
  initCannon();
  initStats();
  initListeners();
}

function initStats() {
  stats = new (Stats as any)();
  document.body.appendChild(stats.dom);
}

function initScene() {
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 7;

  renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  viewOne = new ViewOne(model, renderer);
  views.push(viewOne);

  // first person view
  controls = new FirstPersonControls(camera, renderer.domElement);
  controls.lookSpeed = 0.03;
  controls.movementSpeed = 0.5;
  controls.lookVertical = false;

  // drag control
  controlsD = new DragControls(views[model.activeView].scene.children, camera, renderer.domElement)
  controlsD.addEventListener('dragstart', function(event) {
    controls.enabled = false;
    event.object.material.opacity = 0.33;
  });
  controlsD.addEventListener('dragend', function(event) {
    controls.enabled = true;
    event.object.material.opacity = 1;
  });

  // star particles
  const particlesGeometry = new THREE.BufferGeometry;
  const particlesCount = 10000;

  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    posArray[i] = (Math.random() - 0.5) * 100 
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  const particlesMaterial = new THREE.PointsMaterial({ size: 0.005 });
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  views[model.activeView].scene.add(particlesMesh);
  
  raycaster = new THREE.Raycaster();

  tl = gsap.timeline();
  tl1 = gsap.timeline();

  // load images
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load('../assets/Jeongin_Yoon.jpg');
  const vrTexture = textureLoader.load('../assets/vr.png');
  const arTexture = textureLoader.load('../assets/ar.png');
  const interiorTexture = textureLoader.load('../assets/interior.jpg');
  const arGlasses = textureLoader.load('../assets/glasses.png');

  // load glb
  const loader = new GLTFLoader().setPath('../assets/');
  loader.load('Logo3D.glb', (gltf) => {
    glbModel = gltf.scene;

    glbModel.scale.set(0.5, 0.5, 0.5);
    glbModel.position.x = 5;
    glbModel.position.y = -1;

    const logoMaterial = new THREE.MeshPhongMaterial({color: 0xffd3da});

    interface gltfMesh extends THREE.Object3D<THREE.Event> {
      material: THREE.Material;
    }

    glbModel.traverse((child: THREE.Object3D<THREE.Event>) =>{
      if (child.type === "Mesh") {
        (child as gltfMesh).material = logoMaterial;
      }
    });

    views[model.activeView].scene.add(glbModel);
  });

  // load korean dancer
  loader.load('dance.glb', (gltf) => {
    danceModel = gltf.scene;
    danceModel.scale.set(1, 1, 1);
    danceModel.position.y = -0.5;
    danceModel.position.z = 13;
    danceModel.rotation.y = 3;
  
    views[model.activeView].scene.add(danceModel);

    mixer = new THREE.AnimationMixer(danceModel);
    const clips = gltf.animations;
    clips.forEach((clip) => {
      mixer.clipAction(clip).play();
    });
  })

  // plane (floor)
  const geometryPlane = new THREE.PlaneBufferGeometry(500, 500, 100, 100);
  material = new THREE.MeshLambertMaterial({ color: 0xdddddd })

  plane = new THREE.Mesh(geometryPlane, material);
  plane.position.z = -2;
  plane.position.y = -1;
  plane.rotation.x = 300;
  plane.receiveShadow = true;
  views[model.activeView].scene.add(plane);

  const markerGeometry = new SphereBufferGeometry(0.2, 8, 8);
  const markerMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  clickMarker = new THREE.Mesh(markerGeometry, markerMaterial);
  clickMarker.visible = false;
  views[model.activeView].scene.add(clickMarker);

  // portrait
  const cubeGeometry = new THREE.BoxBufferGeometry(3, 5, 0.1, 10, 10);
  const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture });
  cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cubeMesh.castShadow = true;
  cubeMesh.position.y = 5.5;
  cubeMesh.position.z = -5;
  meshes.push(cubeMesh);
  views[model.activeView].scene.add(cubeMesh);

  // gsap animation of my portrait
  tl.to(cubeMesh.position, {y: 1.5, duration: 10, repeat: 20, yoyo: true})

  // sphere
  const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
  const sphereMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });
  sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphereMesh.castShadow = true;
  sphereMesh.position.x = -5;
  sphereMesh.position.y = 1;
  views[model.activeView].scene.add(sphereMesh);

  // vr gallery
  const vrGeometry = new THREE.BoxBufferGeometry(3, 2, 0.05, 10, 10);
  const vrMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: vrTexture,
  });
  let vr = new THREE.Mesh(vrGeometry, vrMaterial);
  vr.rotation.set(0, 1.5, 0);
  vr.position.x = -7;
  vr.position.y = 0.3;
  vr.position.z = 5;
  vr.castShadow = true;
  vr.material.side = THREE.DoubleSide;
  views[model.activeView].scene.add(vr);

  // ar gallery
  const arGeometry = new THREE.BoxBufferGeometry(3, 2, 0.05, 10, 10);
  const arMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: arTexture,
  });
  let ar = new THREE.Mesh(arGeometry, arMaterial);
  ar.rotation.set(0, 1.5, 0);
  ar.position.x = 7;
  ar.position.y = 0.3;
  ar.position.z = 5;
  ar.castShadow = true;
  ar.material.side = THREE.DoubleSide;
  views[model.activeView].scene.add(ar);

  // ar glasses gallery
  const glassesGeometry = new THREE.BoxBufferGeometry(3, 2, 0.05, 10, 10);
  const glassesMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: arGlasses,
  });
  let glasses = new THREE.Mesh(glassesGeometry, glassesMaterial);
  glasses.rotation.set(0, 1.5, 0);
  glasses.position.x = 7;
  glasses.position.y = 0.3;
  glasses.position.z = 10;
  glasses.castShadow = true;
  glasses.material.side = THREE.DoubleSide;
  views[model.activeView].scene.add(glasses);

  // 3D environment gallery
  const interiorGeometry = new THREE.BoxBufferGeometry(3, 2, 0.05, 10, 10);
  const interiorMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: interiorTexture,
  });
  let interior = new THREE.Mesh(interiorGeometry, interiorMaterial);
  interior.rotation.set(0, 1.5, 0);
  interior.position.x = -7;
  interior.position.y = 0.3;
  interior.position.z = 10;
  interior.castShadow = true;
  interior.material.side = THREE.DoubleSide;
  views[model.activeView].scene.add(interior);

  // ball
  const ballGeometry = new THREE.SphereGeometry(0.7, 32, 32);
  const ballMaterial = new THREE.MeshPhongMaterial({
    color: 0xff6600,
    shininess: 100,
  })
  ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
  ballMesh.castShadow = true;
  ballMesh.position.x = -10;
  ballMesh.position.y = 3.5;
  ballMesh.position.z = 13;
  views[model.activeView].scene.add(ballMesh);

  tl1.to(ballMesh.position, {x: 10, duration: 5, repeat: 100, yoyo: true})

  // front wall
  const frontWallGeo = new THREE.BoxBufferGeometry(30, 15, 0.1, 10, 10);
  const frontWallMat = new THREE.MeshBasicMaterial({ color: 0xdddddd, transparent: true, opacity: 0.4});
  frontWallMesh = new THREE.Mesh(frontWallGeo, frontWallMat);
  frontWallMesh.castShadow = true;
  frontWallMesh.position.y = 1;
  frontWallMesh.position.z = -6;
  meshes.push(frontWallMesh);
  views[model.activeView].scene.add(frontWallMesh);

  // left wall
  const leftWallGeo = new THREE.BoxBufferGeometry(30, 15, 0.1, 10, 10);
  const leftWallMat = new THREE.MeshBasicMaterial({ color: 0xdddddd, transparent: true, opacity: 0.4});
  leftWallMesh = new THREE.Mesh(leftWallGeo, leftWallMat);
  leftWallMesh.castShadow = true;
  leftWallMesh.position.x = -15;
  leftWallMesh.position.y = 1;
  leftWallMesh.rotation.y = 4.7;
  leftWallMesh.position.z = 8.8;
  meshes.push(leftWallMesh);
  views[model.activeView].scene.add(leftWallMesh);

  // right wall
  const rightWallGeo = new THREE.BoxBufferGeometry(30, 15, 0.1, 10, 10);
  const rightWallMat = new THREE.MeshBasicMaterial({ color: 0xdddddd, transparent: true, opacity: 0.4});
  rightWallMesh = new THREE.Mesh(rightWallGeo, rightWallMat);
  rightWallMesh.castShadow = true;
  rightWallMesh.position.x = 14.5;
  rightWallMesh.position.y = 1;
  rightWallMesh.rotation.y = 4.7;
  rightWallMesh.position.z = 8.8;
  meshes.push(rightWallMesh);
  views[model.activeView].scene.add(rightWallMesh);

  // back wall
  const backWallGeo = new THREE.BoxBufferGeometry(30, 15, 0.1, 10, 10);
  const backWallMat = new THREE.MeshBasicMaterial({ color: 0xdddddd, transparent: true, opacity: 0.4});
  backWallMesh = new THREE.Mesh(backWallGeo, backWallMat);
  backWallMesh.castShadow = true;
  backWallMesh.position.x = -0.5;
  backWallMesh.position.y = 1;
  backWallMesh.position.z = 24;
  meshes.push(backWallMesh);
  views[model.activeView].scene.add(backWallMesh);

  animate();
}

// CANNON function modified from cannon-es official document and example
function initCannon() {
  world = new CANNON.World();

  world.gravity.set(0, -10, 0);

  const floorShape = new CANNON.Plane();
  const floorBody = new CANNON.Body({ mass: 0 })
  floorBody.addShape(floorShape);
  floorBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  world.addBody(floorBody);

  const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
  cubeBody = new CANNON.Body({ mass: 5 });
  cubeBody.addShape(cubeShape);
  cubeBody.position.set(0, 5, 0);
  bodies.push(cubeBody);
  world.addBody(cubeBody);

  const jointShape = new CANNON.Sphere(0.1);
  jointBody = new CANNON.Body({ mass: 0 });
  jointBody.addShape(jointShape);
  jointBody.collisionFilterGroup = 0;
  jointBody.collisionFilterMask = 0;
  world.addBody(jointBody);
}

window.addEventListener('pointerdown', (event) => {
  const hitPoint = getHitPoint(event.clientX, event.clientY, cubeMesh, camera);

  if (!hitPoint) {
    return
  }
  showClickMarker();
  moveClickMarker(hitPoint);
  moveMovementPlane(hitPoint, camera);
})

window.addEventListener('pointermove', (event) => {
  let isDragging
  if (!isDragging) {
    return
  }

  const hitPoint = getHitPoint(event.clientX, event.clientY, movementPlane, camera);

  if (hitPoint) {
    moveClickMarker(hitPoint);
  }
})

function showClickMarker() {
  clickMarker.visible = true;
}

function moveClickMarker(position: any) {
  clickMarker.position.copy(position);
}

function moveMovementPlane(point: any, camera: any) {
  movementPlane.position.copy(point);
  movementPlane.quaternion.copy(camera.quaternion);
}

function getHitPoint(clientX: any, clientY: any, mesh: any, camera: any) {
  const mouse = new THREE.Vector2()
  mouse.x = (clientX / window.innerWidth) * 2 - 1;
  mouse.y = -((clientY / window.innerHeight) * 2 - 1);

  raycaster.setFromCamera(mouse, camera);

  const hits = raycaster.intersectObject(mesh);

  return hits.length > 0 ? hits[0].point : undefined
}

function initListeners() {
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  viewOne.onWindowResize();
}

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(() => {
    animate();
  });

  if (glbModel != undefined) {
    glbModel.rotateY(0.01);
  }

  if (sphereMesh != undefined) {
    sphereMesh.rotateX(0.01);
    sphereMesh.rotateY(0.01);
    sphereMesh.rotateZ(0.01);
  }

  if (mixer) {
    mixer.update(clock.getDelta());
  }

  if (stats) stats.update();

  if (controls) controls.update(0.05);

  renderer.render(views[model.activeView].scene, camera);
}

main();
