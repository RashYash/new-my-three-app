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

  camera.position.set(
    1.7221511767844412e-15,
    0.4980512025377698,
    3.3169179971248375,
  );

  camera.rotation.set(
    -0.14904135080484743,
    -3.545948914644275e-18,
    -5.324412971941212e-19,
  );
});

let model;

let mChest, mBelly, mPelvis, mHipL, mHipR;
let fChest, fBelly, fPelvis, fHipL, fHipR;

let maleRoot, femaleRoot;

let selectedGender = "male";

loader.load(import.meta.env.BASE_URL + "assets/model/both2.glb", (gltf) => {
  model = gltf.scene;
  model.scale.set(0.5, 0.5, 0.5);
  model.position.set(0, -1.42, 0.5);

  scene.add(model);

  console.log("Character Loaded");

  maleRoot = model.getObjectByName("Armature001_121");
  femaleRoot = model.getObjectByName("Armature_60");

  if (maleRoot && femaleRoot) {
    maleRoot.visible = true;
    femaleRoot.visible = false;
  }

  model.traverse((child) => {
    console.log(child.name);

    if (child.name === "Chest_40") fChest = child;
    if (child.name === "Belly_41") fBelly = child;
    if (child.name === "Pelvis_46") fPelvis = child;
    if (child.name === "HipL_43") fHipL = child;
    if (child.name === "HipR_45") fHipR = child;

    if (child.name === "Chest_101") mChest = child;
    if (child.name === "Belly_102") mBelly = child;
    if (child.name === "Pelvis_107") mPelvis = child;
    if (child.name === "HipL_104") mHipL = child;
    if (child.name === "HipR_106") mHipR = child;
  });
});

window.showMale = function () {
  selectedGender = "male";

  if (maleRoot && femaleRoot) {
    maleRoot.visible = true;
    femaleRoot.visible = false;
  }

  console.log("Male Selected");
};

window.showFemale = function () {
  selectedGender = "female";

  if (maleRoot && femaleRoot) {
    maleRoot.visible = false;
    femaleRoot.visible = true;
  }

  console.log("Female Selected");
};

window.applyBody = function () {
  const height = parseFloat(document.getElementById("height").value);
  const chest = parseFloat(document.getElementById("chest").value);
  const waist = parseFloat(document.getElementById("waist").value);
  const hips = parseFloat(document.getElementById("hips").value);

  const BASE_HEIGHT = 170;
  const BASE_CHEST = 95;
  const BASE_WAIST = 80;
  const BASE_HIPS = 90;

  const heightRatio = height / BASE_HEIGHT;
  const chestRatio = chest / BASE_CHEST;
  const waistRatio = waist / BASE_WAIST;
  const hipRatio = hips / BASE_HIPS;

  if (selectedGender === "male") {
    if (model) model.scale.set(0.5, 0.5 * heightRatio, 0.5);

    if (mChest) mChest.scale.set(chestRatio, 1, chestRatio);
    if (mBelly) mBelly.scale.set(waistRatio, 1, waistRatio);
    if (mPelvis) mPelvis.scale.set(hipRatio, 1, hipRatio);
    if (mHipL) mHipL.scale.set(hipRatio, 1, hipRatio);
    if (mHipR) mHipR.scale.set(hipRatio, 1, hipRatio);
  }

  if (selectedGender === "female") {
    if (model) model.scale.set(0.5, 0.5 * heightRatio, 0.5);

    if (fChest) fChest.scale.set(chestRatio, 1, chestRatio);
    if (fBelly) fBelly.scale.set(waistRatio, 1, waistRatio);
    if (fPelvis) fPelvis.scale.set(hipRatio, 1, hipRatio);
    if (fHipL) fHipL.scale.set(hipRatio, 1, hipRatio);
    if (fHipR) fHipR.scale.set(hipRatio, 1, hipRatio);
  }

  console.log("Body Updated:", selectedGender);
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
