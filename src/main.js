/*
assignmet 01-3D Scene Creation and Basic Cube Animation using Three.js

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate( time ) {

  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;

  renderer.render( scene, camera );

}*/

//assignmet 02-cube changes its color automatically during animation

/*import * as THREE from "three";

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

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const clock = new THREE.Clock();

let rotation = 0;

const colors = [0xff0000, 0x00ff00, 0x0000ff];

function animate() {
  const delta = clock.getDelta();

  rotation += delta * 2;
  cube.rotation.y = rotation;
  cube.rotation.x = rotation;

  const degrees = THREE.MathUtils.radToDeg(rotation);

  const segment = Math.floor((degrees % 360) / 120);

  cube.material.color.setHex(colors[segment]);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);*/

/*asignment 03-cube changes its color automatically during animation, and it also updates its color when the user clicks on it.

import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(  75,  window.innerWidth / window.innerHeight,  0.1,  1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//cube o1
const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial({  color: 0xff0000,});
const cube1 = new THREE.Mesh(geometry1, material1);

cube1.position.x = -2;
scene.add(cube1);

//cube 02
const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshBasicMaterial({  color: 0xffffff,});
const cube2 = new THREE.Mesh(geometry2, material2);

cube2.position.x = 2;
scene.add(cube2);

camera.position.z = 5;

const clock = new THREE.Clock();
let rotation = 0;
const colors = [0xff0000, 0x00ff00, 0x0000ff];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let clickColorIndex = 0;

window.addEventListener("click", onMouseClick);

function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(cube2);

  if (intersects.length > 0) {
    clickColorIndex++;

    if (clickColorIndex > 2) {
      clickColorIndex = 0;
    }

    cube2.material.color.setHex(colors[clickColorIndex]);
  }
}

function animate() {
  const delta = clock.getDelta();

  rotation += delta * 2;

  cube1.rotation.x = rotation;
  cube1.rotation.y = rotation;

  const degrees = THREE.MathUtils.radToDeg(rotation);

  const segment = Math.floor((degrees % 360) / 120);

  cube1.material.color.setHex(colors[segment]);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);*/

/*assignment 04-use MeshStandardMaterial for cubes

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

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(5, 5, 5);
scene.add(light);

//cube 01

const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshStandardMaterial({
  color: 0xff0000,
});
const cube1 = new THREE.Mesh(geometry1, material1);

cube1.position.x = -2;
scene.add(cube1);

//cube 02

const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshStandardMaterial({
  color: 0xffffff,
});
const cube2 = new THREE.Mesh(geometry2, material2);

cube2.position.x = 2;
scene.add(cube2);

camera.position.z = 5;

const clock = new THREE.Clock();
let rotation = 0;
const colors = [0xff0000, 0x00ff00, 0x0000ff];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let clickColorIndex = 0;
window.addEventListener("click", onMouseClick);

function onMouseClick(event) {

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(cube2);

  if (intersects.length > 0) {
    clickColorIndex++;

    if (clickColorIndex > 2) {
      clickColorIndex = 0;
    }

    cube2.material.color.setHex(colors[clickColorIndex]);
  }
}

function animate() {
  const delta = clock.getDelta();

  rotation += delta * 2;

  cube1.rotation.x = rotation;
  cube1.rotation.y = rotation;

  const degrees = THREE.MathUtils.radToDeg(rotation);
  const segment = Math.floor((degrees % 360) / 120);
  cube1.material.color.setHex(colors[segment]);
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);*/

//assinment 05-texture maping

/*import * as THREE from "three";

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

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(5, 5, 5);
scene.add(light);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(import.meta.env.BASE_URL + "texture1.jpg");

//cube 01
const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshStandardMaterial({
  map: texture,
});
const cube1 = new THREE.Mesh(geometry1, material1);
cube1.position.x = -2;
scene.add(cube1);

//cube 02
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

renderer.setAnimationLoop(animate);*/

//assignment 06-load glib model to scene
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
loader.load(
  import.meta.env.BASE_URL + "snow_car.glb", 
  function (gltf) {
    model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    scene.add(model);
    console.log(model);
  }
);

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

//assignment 07-load glib model to scene and use mouse movement

/*import * as THREE from "three";
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

loader.load(
  import.meta.env.BASE_URL + "class.glb",
  function (gltf) { 
  model = gltf.scene;
  model.scale.set(0.1, 0.1, 0.1);
  model.position.set(0, 0, 0);
  scene.add(model);
});

camera.position.z = 5;

function animate() {
  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);*/
