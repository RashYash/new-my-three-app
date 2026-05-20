import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

camera.position.z = 5;

const clock = new THREE.Clock();

let rotation = 0;

const colors = [0xff0000, 0x00ff00, 0x0000ff];

function animate() {
  const delta = clock.getDelta();

  rotation += delta * 2;

  cube.rotation.y = rotation;

  cube.rotation.x = rotation;

  const degrees = THREE.MathUtils.radToDeg(rotation);

  const segment = Math.floor((degrees % 360) / 120);

  cube.material.color.setHex(colors[segment]);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
