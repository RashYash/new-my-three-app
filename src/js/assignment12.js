import * as THREE from "three";
import * as MindAR from "https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-three.prod.js";

const { MindARThree } = MindAR;

const startButton = document.querySelector("#startButton");
const stopButton = document.querySelector("#stopButton");

let mindarThree = null;
let started = false;

const startAR = async () => {
  if (started) return;
  started = true;

  mindarThree = new MindARThree({
    container: document.querySelector("#container"),
    //imageTargetSrc: "/targets/card.mind"
    imageTargetSrc: "https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.mind"
  });

  const { renderer, scene, camera } = mindarThree;
  const anchor = mindarThree.addAnchor(0);
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh(geometry, material);
  anchor.group.add(cube);

  await mindarThree.start();

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
};

const stopAR = () => {
  if (!mindarThree) return;

  mindarThree.stop();
  mindarThree.renderer.setAnimationLoop(null);

  mindarThree = null;
  started = false;
};

startButton.addEventListener("click", startAR);
stopButton.addEventListener("click", stopAR);