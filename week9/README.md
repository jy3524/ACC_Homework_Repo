# Week9 Assignment - Jeongin Yoon

### Still Life

##### The imported scope 3D model is what I built for the 3D modeling class using Maya. Maya's Mac version does not provide/support exporting gltf. So, I exported obj file from Maya and imported obj file to Cinema 4D and then exported to gltf file from Cinema 4D.

##### For this assignment, I created a space scene with stars (particles) and a scope 3D model (gltf) with color material on the turntable (plane).

##### particles code from DesignCourse YouTube
```js
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
```