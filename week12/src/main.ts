import './style.scss';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

let model = {
	activeView: 0,
	pointerPosition: new THREE.Vector2(0,0)
}

let renderer: THREE.WebGLRenderer;
let controls: FirstPersonControls;
let controlsD: DragControls;
let stats: any;

let viewOne: ViewOne;

let views: BaseView[] = [];

import { ViewOne } from './view/ViewOne';
import { BaseView } from './view/BaseView';

function main() {
	initScene();
	initStats();
	initListeners();
}

function initStats() {
	stats = new (Stats as any)();
	document.body.appendChild(stats.dom);
}

function initScene() {
	renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);
  
	viewOne = new ViewOne(model, renderer);
	views.push(viewOne);

  controls = new FirstPersonControls(views[model.activeView].camera, renderer.domElement);
  controls.lookSpeed = 0.03;
  controls.movementSpeed = 0.5;
  controls.lookVertical = false;

  controlsD = new DragControls(views[model.activeView].scene.children, views[model.activeView].camera, renderer.domElement)
  controlsD.addEventListener('dragstart', function(event) {
    controls.enabled = false;
    event.object.material.opacity = 0.33;
  });
  controlsD.addEventListener('dragend', function(event) {
    controls.enabled = true;
    event.object.material.opacity = 1;
  })

	animate();
}

function initListeners() {
	window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
	viewOne.onWindowResize();
}

function animate() {
	requestAnimationFrame(() => {
		animate();
	});
	
	if (stats) stats.update();

	if (controls) controls.update(0.05);

	renderer.render(views[model.activeView].scene, views[model.activeView].camera);
}

main();
