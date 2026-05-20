import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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


const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;


const loader = new GLTFLoader();

let model;

let mixer;

loader.load(
  import.meta.env.BASE_URL + "low-poly_truck_car_drifter.glb",

  function (gltf) {
    model = gltf.scene;

    model.scale.set(0.01, 0.01, 0.01);

    model.position.set(0, 0, 0);

    scene.add(model);

    console.log(gltf);

    mixer = new THREE.AnimationMixer(model);

    const action = mixer.clipAction(gltf.animations[0]);

    action.play();
  },
);

camera.position.z = 5;

const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();

  if (mixer) {
    mixer.update(delta);
  }

  controls.update();

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
