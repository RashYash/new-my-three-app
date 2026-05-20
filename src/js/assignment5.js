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

// LIGHT

const light = new THREE.DirectionalLight(0xffffff, 3);

light.position.set(5, 5, 5);

scene.add(light);

// TEXTURE LOADER

const textureLoader = new THREE.TextureLoader();

const texture = textureLoader.load(import.meta.env.BASE_URL + "texture1.jpg");

// CUBE 01

const geometry1 = new THREE.BoxGeometry(1, 1, 1);

const material1 = new THREE.MeshStandardMaterial({
  map: texture,
});

const cube1 = new THREE.Mesh(geometry1, material1);

cube1.position.x = -2;

scene.add(cube1);

// CUBE 02

const geometry2 = new THREE.BoxGeometry(1, 1, 1);

const material2 = new THREE.MeshStandardMaterial({
  map: texture,
});

const cube2 = new THREE.Mesh(geometry2, material2);

cube2.position.x = 2;

scene.add(cube2);

camera.position.z = 5;

const clock = new THREE.Clock();

let rotation = 0;

function animate() {
  const delta = clock.getDelta();

  rotation += delta * 2;

  cube1.rotation.x = rotation;

  cube1.rotation.y = rotation;

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
