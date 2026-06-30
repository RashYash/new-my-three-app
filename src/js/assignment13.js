import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 1.5, 3);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 1.5));

const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const loader = new GLTFLoader();

let room;

loader.load(import.meta.env.BASE_URL + "assets/model/room.glb", (gltf) => {
  room = gltf.scene;
  room.scale.set(0.01, 0.01, 0.01);
  room.position.set(0.2, -1.5, 0);
  room.rotation.y = -Math.PI / 2;
  scene.add(room);
  console.log("Room Loaded");
});

let character;

let chest;
let belly;
let pelvis;
let hipL;
let hipR;

loader.load(
  import.meta.env.BASE_URL + "assets/model/both1.glb",

  (gltf) => {
    character = gltf.scene;
    character.scale.set(0.5, 0.5, 0.5);
    character.position.set(-0.5, -1.42, 0.5);
    scene.add(character);
    console.log("Character Loaded");

    character.traverse((child) => {
      console.log(child.name);

      switch (child.name) {
        case "Chest_40":
          chest = child;
          break;

        case "Belly_41":
          belly = child;
          break;

        case "Pelvis_46":
          pelvis = child;
          break;

        case "HipL_43":
          hipL = child;
          break;

        case "HipR_45":
          hipR = child;
          break;
      }
    });
  },
);

window.applyBody = function () {
  const height = parseFloat(document.getElementById("height").value);
  const chestSize = parseFloat(document.getElementById("chest").value);
  const waistSize = parseFloat(document.getElementById("waist").value);
  const hipSize = parseFloat(document.getElementById("hips").value);

  const BASE_HEIGHT = 170;
  const BASE_CHEST = 95;
  const BASE_WAIST = 80;
  const BASE_HIPS = 90;

  const heightRatio = height / BASE_HEIGHT;
  const chestRatio = chestSize / BASE_CHEST;
  const waistRatio = waistSize / BASE_WAIST;
  const hipRatio = hipSize / BASE_HIPS;

  if (character) {
    character.scale.set(0.5, 0.5 * heightRatio, 0.5);
  }

  if (chest) {
    chest.scale.set(chestRatio, 1, chestRatio);
  }

  if (belly) {
    belly.scale.set(waistRatio, 1, waistRatio);
  }

  if (pelvis) {
    pelvis.scale.set(hipRatio, 1, hipRatio);
  }

  if (hipL) {
    hipL.scale.set(hipRatio, 1, hipRatio);
  }

  if (hipR) {
    hipR.scale.set(hipRatio, 1, hipRatio);
  }

  console.log("Body Updated");
};

function animate() {
  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
