import {
	AmbientLight,
	PointLight,
	WebGLRenderer,
} from 'three';
import { BaseView } from "./BaseView";

export class ViewOne extends BaseView {

  lightAmbient: AmbientLight;
  lightPoint: PointLight;

	constructor(model: any, renderer: WebGLRenderer) {
    super(model, renderer);

    this.lightAmbient = new AmbientLight(0x404040);
    this.scene.add(this.lightAmbient);
    this.lightAmbient.intensity = 3;

    this.lightPoint = new PointLight(0xffffff);
    this.lightPoint.position.set(-0.5, 0.5, 4);
    this.lightPoint.castShadow = true;
    this.lightPoint.intensity = 0.5;
    this.scene.add(this.lightPoint);

    const mapSize = 1024;
    const cameraNear = 0.5;
    const cameraFar = 500;
    this.lightPoint.shadow.mapSize.width = mapSize;
    this.lightPoint.shadow.mapSize.height = mapSize;
    this.lightPoint.shadow.camera.near = cameraNear;
    this.lightPoint.shadow.camera.far = cameraFar;
	}
}
