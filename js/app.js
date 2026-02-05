import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 13;

const scene = new THREE.Scene();
const loadingOverlay = document.getElementById('loading-overlay');
const loadingMessage = document.getElementById('loading-message');
const loadingError = document.getElementById('loading-error');
let bee;
let mixer;
const loader = new GLTFLoader();
loader.load('assets/models/demon_bee_full_texture.glb',
    function (gltf) {
        bee = gltf.scene;
        scene.add(bee);

        mixer = new THREE.AnimationMixer(bee);
        mixer.clipAction(gltf.animations[2]).play();
        modelMove();
        if (loadingOverlay) {
            loadingOverlay.classList.add('is-hidden');
        }
    },
    function (xhr) {
        if (!loadingMessage || !xhr.total) {
            return;
        }
        const percent = Math.min((xhr.loaded / xhr.total) * 100, 100);
        loadingMessage.textContent = `Loading 3D scene... ${Math.round(percent)}%`;
    },
    function (error) {
        console.error('Failed to load 3D model', error);
        if (!loadingOverlay) {
            return;
        }
        loadingOverlay.classList.add('is-error');
        if (loadingMessage) {
            loadingMessage.textContent = '3D content failed to load.';
        }
        if (loadingError) {
            loadingError.hidden = false;
        }
    }
);
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
});
const container3D = document.getElementById('container3D');
const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
renderer.setPixelRatio(dpr);
renderer.setSize(window.innerWidth, window.innerHeight);
container3D.appendChild(renderer.domElement);

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);


let lastTime = 0;
let rafId;
const reRender3D = (time = 0) => {
    rafId = requestAnimationFrame(reRender3D);
    const delta = (time - lastTime) / 1000;
    lastTime = time;
    renderer.render(scene, camera);
    if (mixer) mixer.update(Math.min(delta, 0.05));
};
reRender3D();

let arrPositionModel = [
    {
        id: 'banner',
        position: {x: 0, y: -1, z: 0},
        rotation: {x: 0, y: 1.5, z: 0}
    },
    {
        id: "intro",
        position: { x: 1, y: -1, z: -5 },
        rotation: { x: 0.5, y: -0.5, z: 0 },
    },
    {
        id: "description",
        position: { x: -1, y: -1, z: -5 },
        rotation: { x: 0, y: 0.5, z: 0 },
    },
    {
        id: "contact",
        position: { x: 0.8, y: -1, z: 0 },
        rotation: { x: 0.3, y: -0.5, z: 0 },
    },
];
const modelMove = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });
    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    );
    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];
        gsap.to(bee.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 3,
            ease: "power1.out"
        });
        gsap.to(bee.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 3,
            ease: "power1.out"
        })
    }
}
const handleScroll = () => {
    if (bee) {
        modelMove();
    }
};
window.addEventListener('scroll', handleScroll, { passive: true });

const resizeRenderer = () => {
    const nextDpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(nextDpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};
window.addEventListener('resize', resizeRenderer, { passive: true });

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(rafId);
    } else {
        lastTime = performance.now();
        reRender3D(lastTime);
    }
});