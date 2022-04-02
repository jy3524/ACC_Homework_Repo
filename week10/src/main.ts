import './style.scss';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;

let lightAmbient: THREE.AmbientLight;
let lightDirectional: THREE.DirectionalLight;
let lightPoint: THREE.PointLight;

let mouse: THREE.Vector2;
let intersectionPoint: THREE.Vector3;
let planeNormal: THREE.Vector3;
let plane: THREE.Plane;
let planeGeo: THREE.PlaneGeometry;
let planeMat: THREE.MeshStandardMaterial;
let raycaster: THREE.Raycaster;

let world: CANNON.World;
let planeBody: any;
let planeMesh: THREE.Mesh;
let planePhysMat: CANNON.Material;

let sphereBody: CANNON.Body;
let sphereGeo: THREE.SphereGeometry;
let sphereMat: THREE.MeshStandardMaterial;
let spherePhysMat: CANNON.Material;

let planeSphereContactMat: CANNON.ContactMaterial;

let controls: OrbitControls;
//let controlsD: DragControls;
let controlsT: TransformControls;

let model: THREE.Group;

let meshes: any = [];
let bodies: any = [];

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
  // drag controls
  // controlsD = new DragControls(scene.children, camera, renderer.domElement);
  // controlsD.addEventListener('dragstart', function(event) {
  //   controls.enabled = false;
  //   event.object.material.opcaity = 0.33;
  // });
  // controlsD.addEventListener('dragend', function(event) {
  //   controls.enabled = true;
  //   event.object.material.opcaity = 1;
  // });
  // transform controls
  controlsT = new TransformControls(camera, renderer.domElement);
  scene.add(controlsT);
  controlsT.addEventListener('mouseDown', function() {
    controls.enabled = false;
  });
  controlsT.addEventListener('mouseUp', function() {
    controls.enabled = true;
  });
  // Q W E to switch transform mode
  window.addEventListener('keydown', function(event: KeyboardEvent) {
    switch (event.key) {
      case 'q':
        controlsT.setMode('translate');
        break
      case 'w':
        controlsT.setMode('rotate');
        break
      case 'e':
        controlsT.setMode('scale');
        break
    }
  })

  lightAmbient = new THREE.AmbientLight(0x404040);
  scene.add(lightAmbient);

  lightDirectional = new THREE.DirectionalLight(0xffffff, 2);
  lightDirectional.position.set(0, 50, 0);
  lightDirectional.castShadow = true;
  lightDirectional.intensity = 0.1;
  scene.add(lightDirectional);

  lightPoint = new THREE.PointLight(0xffffff);
  lightPoint.position.set(-0.5, 1, 6);
  lightPoint.castShadow = true;
  lightPoint.intensity = 0.5;
  scene.add(lightPoint);

  const mapSize = 1024;
  const cameraNear = 0.5;
  const cameraFar = 500;
  lightDirectional.shadow.mapSize.width = mapSize;
  lightDirectional.shadow.mapSize.height = mapSize;
  lightDirectional.shadow.camera.near = cameraNear;
  lightDirectional.shadow.camera.far = cameraFar;

  // import logo 3D model asset (my first name last name initial: JY)
  const loader = new GLTFLoader().setPath('./assets/');
  loader.load('Logo3D.glb', (gltf) => {
    model = gltf.scene;

    model.scale.set(0.5, 0.5, 0.5);
    model.position.y = -0.3;
    
    const scopeMat = new THREE.MeshPhongMaterial({color: 0xffa500});

    interface gltfMesh extends THREE.Object3D<THREE.Event> {
      material: THREE.Material;
    }

    model.traverse((child: THREE.Object3D<THREE.Event>) => {
      if (child.type === "Mesh") {
        (child as gltfMesh).material = scopeMat;
      }
    })

    controlsT.attach(model);

    scene.add(model);
  })

  // modified from Wael Yasmina YouTube source
  world = new CANNON.World({gravity: new CANNON.Vec3(0, -9.81, 0)});

  planeGeo = new THREE.PlaneGeometry(10, 10);
  planeMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  });
  planeMesh = new THREE.Mesh(planeGeo, planeMat);
  planeMesh.receiveShadow = true;
  scene.add(planeMesh);
  // physics material & body - plane
  planePhysMat = new CANNON.Material();
  planeBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Box(new CANNON.Vec3(5, 5, 0.001)),
    material: planePhysMat,
  });
  planeBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  world.addBody(planeBody);

  mouse = new THREE.Vector2();
  intersectionPoint = new THREE.Vector3();
  planeNormal = new THREE.Vector3();
  plane = new THREE.Plane();
  raycaster = new THREE.Raycaster();

  // mouse click to generate sphere on where mouse cursor is located
  window.addEventListener('mousemove', function(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    planeNormal.copy(camera.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, intersectionPoint);
  });
  
  window.addEventListener('click', function() {
    sphereGeo = new THREE.SphereGeometry(0.125, 30, 30);
    sphereMat = new THREE.MeshStandardMaterial({
      color: Math.random() * 0xffffff,
      metalness: 0,
      roughness: 0,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.castShadow = true;
    scene.add(sphereMesh);
    // physics material and body - sphere
    spherePhysMat = new CANNON.Material();
    sphereBody = new CANNON.Body({
      mass: 0.3,
      shape: new CANNON.Sphere(0.125),
      position: new CANNON.Vec3(intersectionPoint.x, intersectionPoint.y, intersectionPoint.z),
      material: spherePhysMat,
    });
    world.addBody(sphereBody);

    // contact detection
    planeSphereContactMat = new CANNON.ContactMaterial(
      planePhysMat,
      spherePhysMat,
      {friction: 0.1, restitution: 1},
    )

    world.addContactMaterial(planeSphereContactMat);

    meshes.push(sphereMesh);
    bodies.push(sphereBody);
  });

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

const timestep = 1 / 60;

function animate() {
  requestAnimationFrame(() => {
    animate();
  });

  if (controls) controls.update();

  world.step(timestep);
  planeMesh.position.copy(planeBody.position);
  planeMesh.quaternion.copy(planeBody.quaternion);

  for (let i = 0; i < meshes.length; i++) {
    meshes[i].position.copy(bodies[i].position);
    meshes[i].quaternion.copy(bodies[i].quaternion);
  }

  renderer.setClearColor(0x000000, 1);
  renderer.render(scene, camera);
}

main();
