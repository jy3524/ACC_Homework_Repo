import './style.scss';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
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

let world: CANNON.World;
let cubeBody: CANNON.Body;
let jointBody: CANNON.Body;

let tl: any;

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
  camera.position.z = 5;

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

  // loading image of myself
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load('../../assets/Jeongin_Yoon.jpg');

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
  tl.to(cubeMesh.position, {y: 1.5, duration: 10, repeat: 4, yoyo: true})

  // sphere
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sphereMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });
  sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphereMesh.castShadow = true;
  sphereMesh.position.x = -5;
  sphereMesh.position.y = 1;
  views[model.activeView].scene.add(sphereMesh);

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

function animate() {
	requestAnimationFrame(() => {
		animate();
	});

	if (stats) stats.update();

	if (controls) controls.update(0.05);

	renderer.render(views[model.activeView].scene, camera);
}

main();
