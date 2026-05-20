import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const container = document.getElementById("model-container8");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(300, 300);
container.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const loader = new GLTFLoader();

let model;
let mixer;
loader.load(
  import.meta.env.BASE_URL +
    "stylized_fantasy_chest_pack_-_7_animated_chests.glb",

  function (gltf) {
    model = gltf.scene;
    model.scale.set(2, 2, 2);
    model.position.set(0.5, 3.3, 1);
    scene.add(model);

    mixer = new THREE.AnimationMixer(model);

    if (gltf.animations.length > 0) {
      const action = mixer.clipAction(gltf.animations[0]);
      action.play();
    }
  },
);
camera.position.set(16, 5, 16);

const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();

  if (mixer) {
    mixer.update(delta * 0.1);
  }

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
