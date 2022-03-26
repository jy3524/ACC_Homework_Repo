import './style.scss';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;

let lightAmbient: THREE.AmbientLight;
let lightPoint: THREE.PointLight;

let controls: OrbitControls;

let model: THREE.Group;
let plane: THREE.Mesh;

function main() {
  initScene();
  initListerners();
}

function initScene() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);

  lightAmbient = new THREE.AmbientLight(0x404040);
  scene.add(lightAmbient);

  const shadowIntensity = 0.25;

  lightPoint = new THREE.PointLight(0xffffff, 0.5, 0, 2);
  lightPoint.position.set(-0.5, 0.5, 4);
  lightPoint.castShadow = true;
  lightPoint.intensity = shadowIntensity;
  scene.add(lightPoint);

  const lightPoint2 = lightPoint.clone();
  lightPoint2.intensity = 1 - shadowIntensity;
  lightPoint2.castShadow = false;
  scene.add(lightPoint2);

  const lightPoint3 = new THREE.PointLight(0xffffff, 0.5, 0, 2);
  lightPoint3.position.set(-1, 0.5, -4);
  lightPoint3.castShadow = true;
  lightPoint3.intensity = shadowIntensity;
  scene.add(lightPoint3);

  const lightPoint4 = lightPoint3.clone();
  lightPoint4.intensity = 1 - shadowIntensity;
  lightPoint4.castShadow = false;
  scene.add(lightPoint4);

  const mapSize = 1024;
  const cameraNear = 0.5;
  const cameraFar = 500;
  lightPoint.shadow.mapSize.width = mapSize;
  lightPoint.shadow.mapSize.height = mapSize;
  lightPoint.shadow.camera.near = cameraNear;
  lightPoint.shadow.camera.far = cameraFar;

  // import scope 3D model asset
  const loader = new GLTFLoader().setPath('./assets/');
  loader.load('scope.gltf', (gltf) => {
    model = gltf.scene;

    model.scale.set(0.2, 0.2, 0.2);
    model.position.y = -0.3;
    
    const scopeMat = new THREE.MeshPhongMaterial({color: 0xffd3da});

    interface gltfMesh extends THREE.Object3D<THREE.Event> {
      material: THREE.Material;
    }

    model.traverse((child: THREE.Object3D<THREE.Event>) => {
      if (child.type === "Mesh") {
        (child as gltfMesh).material = scopeMat;
      }
    })

    scene.add(model)
  })

  // plane geometry
  const geometryPlane = new THREE.PlaneBufferGeometry(10, 10, 32, 32);
  const materialPlane = new THREE.MeshPhongMaterial({ color: 0x888888, side: THREE.DoubleSide, flatShading: true });

  plane = new THREE.Mesh(geometryPlane, materialPlane);
  plane.receiveShadow = true;
  plane.position.y = -0.2;
  plane.rotation.x = 300;
  scene.add(plane);

  // particles code from DesignCourse YouTube
  const particlesGeometry = new THREE.BufferGeometry;
  const particlesCount = 10000;

  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    posArray[i] = (Math.random() - 0.5) * 10 
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  const particlesMaterial = new THREE.PointsMaterial({ size: 0.005 });
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  animate();
}

function initListerners() {
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

  if (model != undefined) {
    model.rotateY(0.01);
  }

  if (controls) controls.update();

  renderer.setClearColor(0x111111, 1);
  renderer.render(scene, camera);
}

main();
