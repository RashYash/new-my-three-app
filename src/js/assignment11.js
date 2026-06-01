import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const container = document.getElementById("model-container11");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 5, 12);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("model-container11").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: 0xffff00 }),
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const loader = new FBXLoader();

let mixer;
let actions = {};
let activeAction;

let character;
const keys = {};
let speedFactor = 1;

loader.load(
  import.meta.env.BASE_URL + "assets/model/character_1/scene.fbx",

  (fbx) => {
    character = fbx;

    fbx.scale.set(5, 5, 5);
    scene.add(fbx);

    mixer = new THREE.AnimationMixer(fbx);

    console.log("Animations found:", fbx.animations);
    fbx.animations.forEach((clip, i) => {
      console.log(i, clip.name);
    });

    const clips = fbx.animations;

    actions["walk"] = mixer.clipAction(clips[1]);
    actions["punch"] = mixer.clipAction(clips[0]);
    actions["kick"] = mixer.clipAction(clips[4]);
    actions["jump"] = mixer.clipAction(clips[9]);
    actions["run"] = mixer.clipAction(clips[2]);

    activeAction = actions["walk"];
    activeAction.play();
  },
);

function playAnimation(name) {
  if (!actions[name]) return;

  const newAction = actions[name];

  if (activeAction !== newAction) {
    activeAction.fadeOut(0.3);

    newAction.reset().fadeIn(0.3).play();

    activeAction = newAction;
  }
}

document.getElementById("walkBtn").onclick = () => playAnimation("walk");
document.getElementById("punchBtn").onclick = () => playAnimation("punch");
document.getElementById("kickBtn").onclick = () => playAnimation("kick");
document.getElementById("jumpBtn").onclick = () => playAnimation("jump");
document.getElementById("runBtn").onclick = () => playAnimation("run");

window.addEventListener("keydown", (event) => {
  keys[event.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (event) => {
  keys[event.key.toLowerCase()] = false;
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  if (character) {
    const movingForward = keys["w"] || keys["arrowup"];
    const running = keys["shift"] && movingForward;

    if (running) {
      speedFactor = 2;
      playAnimation("run");

    } else if (movingForward) {
      speedFactor = 1;
      playAnimation("walk");
    }

    if (movingForward) {
      character.position.z -= 0.05 * speedFactor;
      camera.position.x = character.position.x;
      camera.position.z = character.position.z + 12;
    }
  }

  controls.target.set(
    character ? character.position.x : 0,
    5,
    character ? character.position.z : 0,
  );

  controls.update();
  renderer.render(scene, camera);
}

animate();
