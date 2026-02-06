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
let beePivot;
let beeBasePosition;
let beeBaseRotation;
let mixer;
let scrollStops = [];
let scrollTicking = false;
const lerp = (start, end, t) => start + (end - start) * t;
const quadraticBezier = (p0, p1, p2, t) => {
    const inv = 1 - t;
    return (inv * inv * p0) + (2 * inv * t * p1) + (t * t * p2);
};
const curveDefaults = { x: 0.7, y: 0.35, z: 0 };
const hoverConfig = {
    position: { x: 0.08, y: 0.12, z: 0.06 },
    rotation: { x: 0.04, y: 0.05, z: 0.02 },
    speed: 0.85
};

const buildScrollStops = () => {
    scrollStops = arrPositionModel
        .map((item) => {
            const el = document.getElementById(item.id);
            return {
                id: item.id,
                top: el ? el.offsetTop : 0
            };
        })
        .sort((a, b) => a.top - b.top);
};

const getScrollSegment = () => {
    if (scrollStops.length < 2) {
        return { index: 0, t: 0 };
    }
    const scrollY = window.scrollY;
    for (let i = 0; i < scrollStops.length - 1; i += 1) {
        const start = scrollStops[i].top;
        const end = scrollStops[i + 1].top;
        if (scrollY <= end) {
            const t = (scrollY - start) / Math.max(end - start, 1);
            return { index: i, t: Math.min(Math.max(t, 0), 1) };
        }
    }
    return { index: scrollStops.length - 1, t: 0 };
};
const loader = new GLTFLoader();
loader.load('assets/models/demon_bee_full_texture.glb',
    function (gltf) {
        bee = gltf.scene;
        beePivot = new THREE.Group();
        beePivot.add(bee);
        scene.add(beePivot);
        beeBasePosition = bee.position.clone();
        beeBaseRotation = bee.rotation.clone();

        mixer = new THREE.AnimationMixer(bee);
        mixer.clipAction(gltf.animations[2]).play();
        buildScrollStops();
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
    if (bee && beeBasePosition && beeBaseRotation) {
        const hoverTime = time * 0.001 * hoverConfig.speed;
        bee.position.set(
            beeBasePosition.x + Math.sin(hoverTime) * hoverConfig.position.x,
            beeBasePosition.y + Math.cos(hoverTime * 0.9) * hoverConfig.position.y,
            beeBasePosition.z + Math.sin(hoverTime * 0.7) * hoverConfig.position.z
        );
        bee.rotation.set(
            beeBaseRotation.x + Math.sin(hoverTime * 0.8) * hoverConfig.rotation.x,
            beeBaseRotation.y + Math.cos(hoverTime) * hoverConfig.rotation.y,
            beeBaseRotation.z + Math.sin(hoverTime * 0.6) * hoverConfig.rotation.z
        );
    }
    renderer.render(scene, camera);
    if (mixer) mixer.update(Math.min(delta, 0.05));
};
reRender3D();

let arrPositionModel = [
    {
        id: 'banner',
        position: {x: 0, y: -1, z: 0},
        rotation: {x: 0, y: 1.5, z: 0},
        curve: { x: 0.6, y: 0.35, z: 0 }
    },
    {
        id: "intro",
        position: { x: 1, y: -1, z: -5 },
        rotation: { x: 0.5, y: -0.5, z: 0 },
        curve: { x: -0.35, y: 0.5, z: 0.1 }
    },
    {
        id: "description",
        position: { x: -1, y: -1, z: -5 },
        rotation: { x: 0, y: 0.5, z: 0 },
        curve: { x: 0.4, y: -0.2, z: 0.2 }
    },
    {
        id: "contact",
        position: { x: 0.8, y: -1, z: 0 },
        rotation: { x: 0.3, y: -0.5, z: 0 },
        curve: { x: 0, y: 0, z: 0 }
    },
];
const modelMove = () => {
    if (!beePivot) {
        return;
    }
    if (scrollStops.length === 0) {
        buildScrollStops();
    }
    const { index, t } = getScrollSegment();
    const current = arrPositionModel[index];
    const next = arrPositionModel[Math.min(index + 1, arrPositionModel.length - 1)];

    const curve = current.curve || curveDefaults;
    const control = {
        x: (current.position.x + next.position.x) * 0.5 + curve.x,
        y: (current.position.y + next.position.y) * 0.5 + curve.y,
        z: (current.position.z + next.position.z) * 0.5 + curve.z
    };
    const position = {
        x: quadraticBezier(current.position.x, control.x, next.position.x, t),
        y: quadraticBezier(current.position.y, control.y, next.position.y, t),
        z: quadraticBezier(current.position.z, control.z, next.position.z, t)
    };
    const rotation = {
        x: lerp(current.rotation.x, next.rotation.x, t),
        y: lerp(current.rotation.y, next.rotation.y, t),
        z: lerp(current.rotation.z, next.rotation.z, t)
    };

    gsap.to(beePivot.position, {
        ...position,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true
    });
    gsap.to(beePivot.rotation, {
        ...rotation,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true
    });
}
const handleScroll = () => {
    if (!bee || scrollTicking) {
        return;
    }
    scrollTicking = true;
    requestAnimationFrame(() => {
        modelMove();
        scrollTicking = false;
    });
};
window.addEventListener('scroll', handleScroll, { passive: true });

const resizeRenderer = () => {
    const nextDpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(nextDpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    buildScrollStops();
    modelMove();
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