import { Scene, WebGLRenderer } from "three"

export class BaseView {
  scene: Scene;
  renderer: WebGLRenderer;
  model: any;

  constructor(model: any, renderer: WebGLRenderer) {
    this.scene = new Scene();
    this.renderer = renderer;
    this.model = model;
  }

  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
