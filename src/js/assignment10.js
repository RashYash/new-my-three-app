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
camera.position.set(4, 3, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("model-container10").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(import.meta.env.BASE_URL + "texture2.jpg");

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(15, 15),
  new THREE.MeshStandardMaterial({ map: texture }),
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const loader = new GLTFLoader();

let car;
let carBody;
let carRim;

loader.load(
  import.meta.env.BASE_URL + "assets/model/car.glb",

  function (gltf) {
    car = gltf.scene;

    car.scale.set(0.7, 0.7, 0.7);
    scene.add(car);

    car.traverse((child) => {
      console.log(child.name);
    });

    carBody = car.getObjectByName("Object_32");
    carRim = car.getObjectByName("Object_23");
  },
);
function setColor(buttonId, getObject, color) {
  document.getElementById(buttonId).onclick = () => {
    const object = getObject();

    if (object && object.material) {
      object.material.color.set(color);
    }
  };
}
//body
setColor("goldCar", () => carBody, 0xb8860b);
setColor("blueCar", () => carBody, 0x0000ff);
setColor("redCar", () => carBody, 0xff0000);
//rim
setColor("blackRim", () => carRim, 0x000000);
setColor("silverRim", () => carRim, 0xc0c0c0);
setColor("greenRim", () => carRim, 0x00ff00);

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
