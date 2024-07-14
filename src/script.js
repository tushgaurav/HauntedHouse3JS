import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Audio
const audio = {
  volume: 0.1,
  play: true,
};

const backgroundAudio = new Audio("/audio/haunted-house.mp3");
backgroundAudio.loop = true;
backgroundAudio.volume = audio.volume;

if (audio.play) {
  backgroundAudio.play();
}

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Fog
const fog = new THREE.Fog("#262837", 1, 10);

// Scene
const scene = new THREE.Scene();
scene.fog = fog;

// Textures
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAplhaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const bricksAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const bricksHeightTexture = textureLoader.load("/textures/bricks/height.jpg");
const bricksRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);
const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");

const floorColorTexture = textureLoader.load("/textures/floor/color.jpg");
const floorAmbientOcclusionTexture = textureLoader.load(
  "/textures/floor/ambientOcclusion.jpg"
);
const floorHeightTexture = textureLoader.load("/textures/floor/height.jpg");
const floorRoughnessTexture = textureLoader.load(
  "/textures/floor/roughness.jpg"
);
const floorNormalTexture = textureLoader.load("/textures/floor/normal.jpg");

floorColorTexture.repeat.set(8, 8);
floorAmbientOcclusionTexture.repeat.set(8, 8);
floorNormalTexture.repeat.set(8, 8);
floorRoughnessTexture.repeat.set(8, 8);

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorRoughnessTexture.wrapS = THREE.RepeatWrapping;

floorColorTexture.wrapT = THREE.RepeatWrapping;
floorAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorRoughnessTexture.wrapT = THREE.RepeatWrapping;

const bushColorTexture = textureLoader.load("/textures/bush/color.jpg");
const bushAmbientOcclusionTexture = textureLoader.load(
  "/textures/bush/occ.jpg"
);
const bushHeightTexture = textureLoader.load("/textures/bush/height.png");
const bushNormalTexture = textureLoader.load("/textures/bush/normal.jpg");
const bushRoughnessTexture = textureLoader.load(
  "/textures/bush/specularity.jpg"
);

bushColorTexture.repeat.set(2, 2);
bushAmbientOcclusionTexture.repeat.set(2, 2);
bushHeightTexture.repeat.set(2, 2);
bushNormalTexture.repeat.set(2, 2);
bushRoughnessTexture.repeat.set(2, 2);

bushColorTexture.wrapS = THREE.RepeatWrapping;
bushAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
bushHeightTexture.wrapS = THREE.RepeatWrapping;
bushNormalTexture.wrapS = THREE.RepeatWrapping;
bushRoughnessTexture.wrapS = THREE.RepeatWrapping;

bushColorTexture.wrapT = THREE.RepeatWrapping;
bushAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
bushHeightTexture.wrapT = THREE.RepeatWrapping;
bushNormalTexture.wrapT = THREE.RepeatWrapping;
bushRoughnessTexture.wrapT = THREE.RepeatWrapping;

const roofColorTexture = textureLoader.load("/textures/roof/color.jpg");

roofColorTexture.repeat.set(2, 2);
roofColorTexture.wrapS = THREE.RepeatWrapping;
roofColorTexture.wrapT = THREE.RepeatWrapping;

const graveColorTexture = textureLoader.load("/textures/grave/color.jpg");
const graveMetalnessTexture = textureLoader.load(
  "/textures/grave/metalness.jpg"
);
const graveNormalTexture = textureLoader.load("/textures/grave/normal.jpg");
const graveAlphaTexture = textureLoader.load("/textures/grave/alpha.jpg");

graveColorTexture.repeat.set(2, 2);
graveMetalnessTexture.repeat.set(2, 2);
graveNormalTexture.repeat.set(2, 2);
graveAlphaTexture.repeat.set(2, 2);

graveColorTexture.wrapS = THREE.RepeatWrapping;
graveMetalnessTexture.wrapS = THREE.RepeatWrapping;
graveNormalTexture.wrapS = THREE.RepeatWrapping;
graveAlphaTexture.wrapS = THREE.RepeatWrapping;

graveColorTexture.wrapT = THREE.RepeatWrapping;
graveMetalnessTexture.wrapT = THREE.RepeatWrapping;
graveNormalTexture.wrapT = THREE.RepeatWrapping;
graveAlphaTexture.wrapT = THREE.RepeatWrapping;

/**
 * House
 */
// Group
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    roughnessMap: bricksRoughnessTexture,
    roughness: 0.45,
    normalMap: bricksNormalTexture,
  })
);
walls.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.y = 2.5 * 0.5;
walls.castShadow = true;
house.add(walls);

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4, 10),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    // roughnessMap: roofRoughnessTexture,
  })
);

roof.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(roof.geometry.attributes.uv.array, 2)
);
roof.position.y = 3 + 0.001;
roof.rotation.y = Math.PI / 4;
house.add(roof);

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2.8, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAplhaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);

door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);

door.scale.set(0.8, 0.8, 0.8);
door.rotation.z = Math.PI;
door.position.z = 2;
door.position.y = 1;
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16, 10);
const bushMaterial = new THREE.MeshStandardMaterial({
  map: bushColorTexture,
  aoMap: bushAmbientOcclusionTexture,
  displacementMap: bushHeightTexture,
  normalMap: bushNormalTexture,
  // roughnessMap: bushRoughnessTexture,
  roughness: 1,
  displacementScale: 0.3,
});
bushGeometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(bushGeometry.attributes.uv.array, 2)
);

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.9, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.6, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.3, 0.3, 0.3);
bush3.position.set(-1, 0.1, 2.1);

bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
house.add(bush1, bush2, bush3);

// Graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
graveGeometry.smooth = true;
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  normalMap: graveNormalTexture,
  alphaMap: graveAlphaTexture,
  metalnessMap: graveMetalnessTexture,
  roughness: 0.2,
});

for (let i = 0; i < 50; i++) {
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);

  const angle = Math.PI * Math.random() * 6;
  const radius = 3 + Math.random() * 6;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  let y = Math.random() - 0.9;
  if (y > 0.4 || y < 1) {
    y = 0.3;
  }

  grave.castShadow = true;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  grave.position.set(x, y, z);
  graves.add(grave);
}

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    map: floorColorTexture,
    roughnessMap: floorRoughnessTexture,
    aoMap: floorAmbientOcclusionTexture,
    displacementMap: floorHeightTexture,
    normalMap: floorNormalTexture,
    displacementScale: 0.9,
  })
);
floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = -0.4;
floor.receiveShadow = true;
scene.add(floor);

/**
 * Lights
 */

// Ghosts
const ghost1 = new THREE.PointLight("#ff00ff", 2, 3);
const ghost2 = new THREE.PointLight("#00ffff", 2, 3);
const ghost3 = new THREE.PointLight("#0000ff", 2, 3);

scene.add(ghost1, ghost2, ghost3);

// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#000000", 0.1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

// Door light
const doorLight = new THREE.PointLight("#ff7d46", 5, 7);
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight);

// Camera Rotation
const animateCamera = { enabled: true };

// Add GUI
gui.title("Haunted House");
gui.add(doorLight, "intensity").min(0).max(10).step(0.01).name("Doorlight");
gui.add(ghost1, "intensity").min(0).max(10).step(0.01).name("Ghost1");
gui.add(ghost2, "intensity").min(0).max(10).step(0.01).name("Ghost2");
gui.add(ghost3, "intensity").min(0).max(10).step(0.01).name("Ghost3");
gui.add(ambientLight, "intensity").min(0).max(1).step(0.01).name("Ambient");

const fogFolder = gui.addFolder("Fog");
fogFolder.add(fog, "near").min(0).max(10).step(0.01).name("Fog Near");
fogFolder.add(fog, "far").min(0).max(10).step(0.01).name("Fog Far");

const audioFolder = gui.addFolder("Audio");
audioFolder.add(audio, "volume").min(0).max(1).step(0.01).name("Volume");
audioFolder.add(audio, "play").name("Play");

gui.add(animateCamera, "enabled").name("Animate");

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Animation of ghosts
  const ghost1Angle = elapsedTime;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghost2Angle = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghost3Angle = -elapsedTime * 0.18;
  ghost3.position.x = Math.cos(ghost3Angle) * 6;
  ghost3.position.z = Math.sin(ghost3Angle) * 6;
  ghost3.position.y = Math.sin(elapsedTime * 3) + Math.sin(elapsedTime * 2);

  // Animate door light
  doorLight.intensity = Math.sin(elapsedTime * 2) * 1 + 2;

  // Animate camera
  if (animateCamera.enabled) {
    camera.position.x = Math.sin(elapsedTime * 0.1) * 6;
    camera.position.z = Math.cos(elapsedTime * 0.1) * 6;
    camera.position.y = Math.sin(elapsedTime * 0.5) + 1.2;
    camera.lookAt(new THREE.Vector3(1, 0, 0));
  }

  // Update audio
  backgroundAudio.volume = audio.volume;
  if (audio.play) {
    backgroundAudio.play();
  } else {
    backgroundAudio.pause();
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
