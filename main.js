import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x161F3D);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

const z_offset = -0.0078125 * window.screen.width;
const x_offset = 0.00390625 * window.screen.width;

// Square with my face
const cubeTexture = new THREE.TextureLoader().load('assets/headshot.jpg');
const cube = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: cubeTexture }));
cube.position.x = x_offset;
cube.position.z = z_offset - 8;
cube.rotation.y = -5.2
scene.add(cube);

// Torus 1
const torus_1_geometry = new THREE.TorusGeometry(8, 1.5, 8, 35); 
const torus_1_material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, opacity: 0.2, transparent: true, wireframe: true } );
const torus_1 = new THREE.Mesh( torus_1_geometry, torus_1_material );
torus_1.position.x = x_offset;
torus_1.position.z = z_offset - 8;
scene.add(torus_1);

// Torus 2
const torus_2_geometry = new THREE.TorusGeometry(8, 1.5, 8, 35); 
const torus_2_material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, opacity: 0.2, transparent: true, wireframe: true } );
const torus_2 = new THREE.Mesh( torus_2_geometry, torus_2_material );
torus_2.position.x = x_offset;
torus_2.position.z = z_offset - 8;
torus_2.rotation.y = 3.14159265 / 2;
scene.add(torus_2);

const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

function farStar() {
    const star = new THREE.Mesh(starGeometry, starMaterial);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000,1000));
    star.position.set(x, y, z);
    scene.add(star);
}
Array(2000).fill().forEach(farStar);

function closeStar() {
    const star = new THREE.Mesh(starGeometry, starMaterial);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500,500));
    star.position.set(x, y, z);
    scene.add(star);
}
Array(400).fill().forEach(closeStar);

function moveCamera() {
    const scrollDistance = document.body.getBoundingClientRect().top;
    camera.position.x = scrollDistance * -0.0002;
    camera.position.y = scrollDistance * -0.0002;
    camera.position.z = scrollDistance * -0.01;
    camera.rotation.y = scrollDistance * -0.0001;
}
document.body.onscroll = moveCamera;
moveCamera();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    torus_1.rotation.x += 0.01;
    torus_1.rotation.y += 0.01;
    torus_1.rotation.z += 0.01;
    torus_2.rotation.x += 0.01;
    torus_2.rotation.y += 0.01;
    torus_2.rotation.z += 0.01;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
}

animate();