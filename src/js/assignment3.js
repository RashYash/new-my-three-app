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

// cube 01

const geometry1 = new THREE.BoxGeometry(1, 1, 1);

const material1 = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});

const cube1 = new THREE.Mesh(geometry1, material1);

cube1.position.x = -2;

scene.add(cube1);

// cube 02

const geometry2 = new THREE.BoxGeometry(1, 1, 1);

const material2 = new THREE.MeshBasicMaterial({
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

renderer.setAnimationLoop(animate);
