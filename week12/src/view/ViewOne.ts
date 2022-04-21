import {
	Mesh,
	MeshPhongMaterial,
	AmbientLight,
	PlaneBufferGeometry,
	BoxBufferGeometry,
	PointLight,
	WebGLRenderer,
	DoubleSide,
	SphereBufferGeometry,
	// Vector3,
	// Ray,
} from 'three';
import { BaseView } from "./BaseView";
import * as CANNON from 'cannon-es';


export class ViewOne extends BaseView {
	//cube: Mesh;
	plane: Mesh;
	world: CANNON.World;
	solver: CANNON.GSSolver;
	physicsMaterial: CANNON.Material;
	sphereShape: CANNON.Sphere;
	sphereBody: any;
	boxes: any = []
	balls: any = []
	ballMeshes: any = []

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

		const mapSize = 1024; // Default 512
		const cameraNear = 0.5; // Default 0.5
		const cameraFar = 500; // Default 500
		this.lightPoint.shadow.mapSize.width = mapSize;
		this.lightPoint.shadow.mapSize.height = mapSize;
		this.lightPoint.shadow.camera.near = cameraNear;
		this.lightPoint.shadow.camera.far = cameraFar;

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

		this.world = new CANNON.World();

		this.world.defaultContactMaterial.contactEquationStiffness = 1e9;
		this.world.defaultContactMaterial.contactEquationRelaxation = 4;

		this.solver = new CANNON.GSSolver();
		this.solver.iterations = 7;
		this.solver.tolerance = 0.1
		this.world.solver = new CANNON.SplitSolver(this.solver);

		this.world.gravity.set(0, -20, 0);

		this.physicsMaterial = new CANNON.Material('physics')

		const physics_physics = new CANNON.ContactMaterial(this.physicsMaterial, this.physicsMaterial, {
			friction: 0.0,
			restitution: 0.3,
		});

		this.world.addContactMaterial(physics_physics);

		// collision sphere
		const radius = 1.3;
		this.sphereShape = new CANNON.Sphere(radius);
		this.sphereBody = new CANNON.Body({ mass:5, material: this.physicsMaterial});
		this.sphereBody.addShape(this.sphereShape);
		this.sphereBody.position.set(0, 5, 0);
		this.sphereBody.linearDamping = 0.9
		this.world.addBody(this.sphereBody);

		// ground plane
		const groundShape = new CANNON.Plane();
		const groundBody = new CANNON.Body({ mass: 0, material: this.physicsMaterial});
		groundBody.addShape(groundShape);
		groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
		this.world.addBody(groundBody);

		// add boxes
		const halfExtents = new CANNON.Vec3(1, 1, 1);
		const boxShape = new CANNON.Box(halfExtents);
		const boxGeometry = new BoxBufferGeometry(halfExtents.x * 2, halfExtents.y * 2, halfExtents.z * 2);

		for (let i = 0; i < 7; i++) {
			const boxBody = new CANNON.Body({ mass: 5 });
			boxBody.addShape(boxShape);
			const boxMesh = new Mesh(boxGeometry, materialPlane);

			const x = (Math.random() - 0.5) * 20;
			const y = (Math.random() - 0.5) * 1 + 1;
			const z = (Math.random() - 0.5) * 20;

			boxBody.position.set(x, y, z);
			//boxMesh.position.copy(boxBody.position);

			boxMesh.castShadow = true;
			boxMesh.receiveShadow = true;

			this.world.addBody(boxBody);
			this.scene.add(boxMesh);
			//this.boxes.push(boxBody);

			// shooting balls
			//const shootVelocity = 15;
			const ballShape = new CANNON.Sphere(0.2);
			const ballGeometry = new SphereBufferGeometry(ballShape.radius, 32, 32);

			// function getShootDirection() {
			// 	const vector = new Vector3(0, 0, 1);
			// 	// vector.unproject(this.camera)
			// 	// const ray = new Ray(this.sphereBody, vector.sub(this.sphereBody.position).normalize())
			// 	//return ray.direction
			// }

			window.addEventListener('click', () => {

				const ballBody: any = new CANNON.Body({ mass: 1 })
				ballBody.addShape(ballShape)
				const ballMesh: any = new Mesh(ballGeometry, materialPlane)

				ballMesh.castShadow = true;
				ballMesh.receiveShadow = true;

				this.world.addBody(ballBody);
				this.scene.add(ballMesh);
				this.balls.push(ballBody);
				this.ballMeshes.push(ballMesh);

				// const shootDirection = getShootDirection()
				// ballBody.velocity.set(shootDirection.x * shootVelocity, shootDirection.y * shootVelocity, shootDirection.z * shootVelocity)

				// const x = this.sphereBody.position.x + shootDirection.x * (this.sphereShape.radius * 1.02 + ballShape.radius)
				// const y = this.sphereBody.position.y + shootDirection.y * (this.sphereShape.radius * 1.02 + ballShape.radius)
				// const z = this.sphereBody.position.z + shootDirection.z * (this.sphereShape.radius * 1.02 + ballShape.radius)
				// ballBody.position.set(x, y, z);
				// ballMesh.position.copy(ballBody.position);

			})

		}
	}
}
