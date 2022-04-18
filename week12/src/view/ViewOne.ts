import {
	Mesh,
	BoxGeometry,
	MeshPhongMaterial,
	AmbientLight,
	PointLight,
	WebGLRenderer,
	PlaneBufferGeometry,
	DoubleSide,
} from 'three';
import { BaseView } from "./BaseView";

export class ViewOne extends BaseView {
	cube: Mesh;
	plane: Mesh;

	lightAmbient: AmbientLight;
	lightPoint: PointLight;

	constructor(model: any, renderer: WebGLRenderer) {
		super(model, renderer);

		const cubeGeometry = new BoxGeometry(3, 3, 0.3);
		const cubeMaterial = new MeshPhongMaterial({ color: 0xf0bbbb });
		this.cube = new Mesh(cubeGeometry, cubeMaterial);
		this.cube.castShadow = true;
    this.cube.position.y = 1;

		this.scene.add(this.cube);

		const geometryPlane = new PlaneBufferGeometry(500, 500, 100, 100);
		const materialPlane = new MeshPhongMaterial({
			color: 0x999999,
			side: DoubleSide,
			flatShading: true,
		});

		this.plane = new Mesh(geometryPlane, materialPlane);
		this.plane.position.z = -2;
    this.plane.position.y = -1;
    this.plane.rotation.x = 300;
		this.plane.receiveShadow = true;
		this.scene.add(this.plane);

		this.lightAmbient = new AmbientLight(0x404040);
		this.scene.add(this.lightAmbient);
    this.lightAmbient.intensity = 3;

		this.lightPoint = new PointLight(0xffffff);
		this.lightPoint.position.set(-0.5, 0.5, 4);
		this.lightPoint.castShadow = true;
		this.lightPoint.intensity = 0.5;
		this.scene.add(this.lightPoint);

		const mapSize = 1024; // Default 512
		const cameraNear = 0.5; // Default 0.5
		const cameraFar = 500; // Default 500
		this.lightPoint.shadow.mapSize.width = mapSize;
		this.lightPoint.shadow.mapSize.height = mapSize;
		this.lightPoint.shadow.camera.near = cameraNear;
		this.lightPoint.shadow.camera.far = cameraFar;
	}
}