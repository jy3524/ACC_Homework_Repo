import './style.scss';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;

let lightAmbient: THREE.AmbientLight;
let lightPoint: THREE.PointLight;

let controls: OrbitControls;

function main() {
  initScene();
  initListeners();
}

function initScene() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 1;
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  // orbit controls
  controls = new OrbitControls(camera, renderer.domElement);

  lightAmbient = new THREE.AmbientLight(0x404040);
  scene.add(lightAmbient);

  lightPoint = new THREE.PointLight(0xffffff);
  lightPoint.position.set(-0.5, 1, 6);
  lightPoint.castShadow = true;
  lightPoint.intensity = 0.5;
  scene.add(lightPoint);

  const mapSize = 1024;
  const cameraNear = 0.5;
  const cameraFar = 500;
  lightPoint.shadow.mapSize.width = mapSize;
  lightPoint.shadow.mapSize.height = mapSize;
  lightPoint.shadow.camera.near = cameraNear;
  lightPoint.shadow.camera.far = cameraFar;

  animate();
}

function initListeners() {
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(() => {
    animate();
  });

  if (controls) controls.update();

  renderer.setClearColor(0x000000, 1);
  renderer.render(scene, camera);

}

main();