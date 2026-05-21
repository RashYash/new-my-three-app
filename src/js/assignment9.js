import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const container = document.getElementById("model-container9");

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
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("model-container9").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({ color: 0xffff00 }),
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const loader = new FBXLoader();

let mixer;
let actions = {};
let activeAction;

loader.load(
  import.meta.env.BASE_URL + "assets/model/character_1/scene.fbx",

  (fbx) => {
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

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  if (mixer) mixer.update(clock.getDelta());
  controls.update();
  renderer.render(scene, camera);
}

animate();
