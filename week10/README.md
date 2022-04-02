# Week10 Assignment - Jeongin Yoon

## Interaction

##### Mouse Interaction with my 3D initial logo. Transform control with keyboard press 'q' - translate, 'w' - rotate, and 'e' - scale. Mouse click to generate bouncy spheres. Physics (cannon.js) is applied to these bouncy spheres.

##### learn from Wael Yasmina YouTube (cannon.js)
```js
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
```