import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

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

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const loader = new GLTFLoader();
let model;
loader.load(import.meta.env.BASE_URL + "snow_car.glb", (gltf) => {
  model = gltf.scene;
  model.scale.set(1, 1, 1);
  model.position.set(0, 0, 0);
  scene.add(model);
  console.log(model);
});

camera.position.z = 5;

const clock = new THREE.Clock();
let rotation = 0;

function animate() {
  const delta = clock.getDelta();
  rotation += delta * 2;
  if (model) {
    model.rotation.y = rotation;
  }
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

