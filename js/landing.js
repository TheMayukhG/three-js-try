import '../css/canvas.css'
// import '../css/main.css'
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Debug


// Setup
const sizes = {
  width: window.innerWidth * 0.7,
  height: window.innerHeight
}

console.log(window.innerWidth)

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha:true
});

// Texture Loader
const loader = new THREE.TextureLoader();
const height = loader.load('../assets/height.png');
const texture = loader.load('../assets/texture.jpg');
const alpha = loader.load('../assets/alpha.png');

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);
camera.position.setX(0);
camera.position.setY(0);
camera.position.setZ(3);

// // Light

const pointLight = new THREE.PointLight(0x000b3ff, 5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
// gui.add(pointLight.intensity, 'intensity').min(0.1).max(20)
scene.add(pointLight)



// Main Scene

const geometry = new THREE.PlaneBufferGeometry(3, 3, 64, 64);

const material = new THREE.MeshStandardMaterial({
  color: 'gray',
  // side: THREE.DoubleSide,
  map: texture,
  displacementMap: height,
  displacementScale: 0.6,
  alphaMap: alpha,
  transparent: true,
  depthTest:false
});

// mesh
const plane = new THREE.Mesh(geometry, material);
scene.add(plane)
plane.rotation.set(181,0,0)




window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth * 0.7
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// interaction
document.addEventListener('mousemove', animateTerrain)

let mouseY = 0;

function animateTerrain(event) {
  mouseY = event.clientY
}

// gui
// import * as dat from 'dat.gui';
// const gui = new dat.GUI();
// gui.add(pointLight.position, 'x')
// gui.add(pointLight.position, 'y')
// gui.add(pointLight.position, 'z')
// const col = {color:0x00ff00};
// gui.addColor(col, 'color').onChange(() => {
//   pointLight.color.set(col.color)
// })
// gui.add(plane.rotation, 'x').min(0).max(360)


// Render Loop
function animate() {
  plane.rotation.z += 0.01
  plane.material.displacementScale = .35 + mouseY * .0008





  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();