<template>
  <canvas id="sceneCanvas" ref="container"></canvas>
</template>

<script setup lang="ts">
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// const sculptureObj = new URL("@/assets/files/sculpture.obj", import.meta.url).href;
const sculptureObj = new URL("@/assets/files/duck_bodybuilder.glb", import.meta.url).href;
const container = ref<HTMLElement | null>(null);

// import Scene from "./Scene";

// onMounted(() => {
//   new Scene(container.value);
// });
let scene,
  renderer,
  camera,
  cube,
  spotLight,
  width = window.innerWidth,
  height = window.innerHeight;

import * as THREE from "three";

// scene = new THREE.Scene();

// renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);

onMounted(() => {
  if (container.value) {
    setScene();
    setAxesHelper();
    setCamera();
    setRender();
    setModel();
    setLight();
    setControls();
    // setMaterial()
    // setControls()
    animate();
    // container.value.appendChild(renderer.domElement);

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // const objLoader = new OBJLoader();

    // objLoader.load(sculptureObj, (obj) => {
    //   const s = 0.005;
    //   obj.scale.set(s, s, s);
    //   scene.add(obj);
    // });
  }
  function setScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x001219);
    scene.position.set(0, -2, 0);
    // const scale = 2;
    // scene.scale.set(scale, scale, scale);
  }
  function setAxesHelper() {
    const axisHelper = new THREE.AxesHelper(5); // 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
    scene.add(axisHelper);
  }
  function setCamera() {
    camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = -180;
    camera.position.x = -200;
    camera.position.y = 0;
    // camera.rotation = { x: 1.5, y: -0.7, z: 1.5 };
    window.camera = camera;
    scene.add(camera);
  }
  function setRender() {
    renderer = new THREE.WebGLRenderer({
      canvas: container.value as HTMLCanvasElement,
      // antialias: true
    });
    // renderer.setPixelRatio(DPR)
    renderer.setSize(width, height);
  }
  function setModel() {
    const loader = new GLTFLoader();

    // objLoader.load(sculptureObj, (obj) => {
    //   const s = 0.01;
    //   obj.scale.set(s, s, s);
    //   scene.add(obj);
    // });
    loader.load(
      // resource URL
      sculptureObj,
      // called when the resource is loaded
      function (gltf) {
        scene.add(gltf.scene);
        console.log(gltf);
        window.gltf = gltf;
      },
      // called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      function (error) {
        console.log("An error happened");
      }
    );
  }
  function animate() {
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  }
  function setLight() {
    const spotLight = new THREE.AmbientLight(0xffffff, 1, 100);
    spotLight.position.set(50, 50, 50);
    spotLight.intensity = 5;
    scene.add(spotLight);
    scene.environment = "Neutral";
  }

  function setControls() {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", setRender); // use if there is no animation loop
    controls.minDistance = -10;
    controls.maxDistance = 20;
    window.controls = controls;
    controls.target.set(0, 0.5, 0);
    controls.autoRotate = true;
    controls.update();
  }
});
</script>
<style scoped></style>
