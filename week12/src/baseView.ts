import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

export class baseView {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;

  constructor(renderer: WebGLRenderer) {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.y = 1;
    this.camera.position.z = 5;
    this.renderer = renderer
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}