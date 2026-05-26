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
camera.position.set(0, 3, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("model-container").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);

directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

const loader = new GLTFLoader();

let car;
let carBody;

loader.load(
  import.meta.env.BASE_URL + "assets/model/car.glb",

  function (gltf) {
    car = gltf.scene;

    car.scale.set(0.5, 0.5, 0.5);
    scene.add(car);

    car.traverse((child) => {
      console.log(child.name);
    });

    carBody = car.getObjectByName("Object_32");
  },
);

document.getElementById("goldCar").onclick = () => {
  if (carBody) {
    carBody.material.color.set(0xb8860b);
  }
};

document.getElementById("blueCar").onclick = () => {
  if (carBody) {
    carBody.material.color.set(0x0000ff);
  }
};

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
