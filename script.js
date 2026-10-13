/**
 * CHYAS? - EXPERIMENTAL SYSTEMS & KINETIC INTERFACE ARCHITECT
 * Sensory Computing, Deterministic State Machines, Anime.js Vector Motion & Built-in CMS
 */

// ==========================================================================
// 1. DEFAULT DATA & STORAGE SYSTEM (PORTFOLIO CMS STORE)
// ==========================================================================
const DEFAULT_PORTFOLIO_DATA = {
    profile: {
        firstName: "Chyas?",
        lastName: "",
        role: "Creative Technologist & Kinetic System Architect",
        lead: "Engineering esoteric web instruments, real-time reactive protocols, and physics-driven interaction design. Where deterministic backend concurrency meets fluid sensory computing.",
        bio: "Code is not merely instructions; it is an interactive medium. I build <strong>sensory software architectures</strong>—where heavy distributed backends and sub-pixel spring physics operate as a singular, living machine.<br><br>My conviction: eliminate UI cognitive friction through visceral performance. Complexity belongs strictly in deterministic server loops, not the user's viewport.<br><br>Focused on: <strong>Zero-Jank State Machines</strong>, <strong>Real-time WebSockets</strong>, and <strong>Tactile Interaction Design</strong>.",
        stats: {
            years: 16,
            projects: 4,
            commitment: 99
        }
    },
    skills: {
        track1: ["ANIME.JS", "THREE.JS", "REACT", "NEXT.JS", "TYPESCRIPT", "LIVEWIRE", "WEB AUDIO", "CANVAS 2D"],
        track2: ["NODE.JS", "EXPRESS", "LARAVEL", "MYSQL", "POSTGRESQL", "REDIS", "DOCKER", "LINUX VPS"],
        matrix: [
            { id: "s1", name: "Laravel & PHP", cat: "backend", desc: "Enterprise MVC, Queues, Eloquent, Microservices" },
            { id: "s2", name: "Node.js & Express", cat: "backend", desc: "Async Event Loops, REST & WebSocket APIs" },
            { id: "s3", name: "MySQL & PostgreSQL", cat: "backend", desc: "Normalized Schemas, Query Optimization, ACID" },
            { id: "s4", name: "React & Next.js", cat: "frontend", desc: "Component Architecture, SSR, State Management" },
            { id: "s5", name: "Livewire & Blade", cat: "frontend", desc: "Full-stack Reactive UI without complex bundles" },
            { id: "s6", name: "Anime.js & Motion", cat: "frontend", desc: "Kinetic Micro-interactions, Stagger & Springs" },
            { id: "s7", name: "Tailwind CSS", cat: "frontend", desc: "Responsive Design Systems, Custom Tokens" },
            { id: "s8", name: "Docker & Linux", cat: "devops", desc: "Containerization, Multi-stage builds, Nginx" },
            { id: "s9", name: "Redis & Cache", cat: "devops", desc: "In-memory caching, Pub/Sub, Rate Limiting" }
        ]
    },
    projects: [
        {
            id: "proj_1",
            title: "Gatot AC Mobil",
            subtitle: "Booking Service",
            category: "Realtime / Backend",
            stack: "Laravel / Livewire / MySQL",
            desc: "A car air conditioning service booking website equipped with a real-time reservation system and live chat customer service.",
            img: "GatotACMobil.webp",
            link: "https://gatotac.web.id/",
            github: ""
        },
        {
            id: "proj_2",
            title: "AWA",
            subtitle: "AWA Showcase",
            category: "Interaction / Frontend",
            stack: "Express / React",
            desc: "An interactive and dynamic company profile website designed to showcase the corporate brand identity with fluid animations.",
            img: "AWA_NEWLOGO_DROPSHADOW.webp",
            link: "https://awa.my.id/",
            github: ""
        },
        {
            id: "proj_3",
            title: "Find Utopia",
            subtitle: "Find Utopia Explorer",
            category: "Design System / Dynamic",
            stack: "Express / React",
            desc: "A digital experience with a cool and dynamic design inspired by a futuristic file manager interface and custom physics.",
            img: "LOGOWITHSPARKS.webp",
            link: "https://findutopia.my.id/",
            github: ""
        }
    ],
    socials: {
        github: "https://github.com/chyas",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
        email: "hello@chyas.dev"
    },
    settings: {
        passcode: "admin123"
    }
};

class PortfolioStore {
    constructor() {
        this.STORAGE_KEY = 'chyas_portfolio_data_v3';
        this.data = this.load();
    }

    load() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                return { ...DEFAULT_PORTFOLIO_DATA, ...parsed };
            }
        } catch (e) {
            console.warn('Storage read error, using defaults', e);
        }
        return JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
    }

    save() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
        } catch (e) {
            console.error('Failed to save to localStorage', e);
        }
    }

    reset() {
        this.data = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
        this.save();
    }
}

const store = new PortfolioStore();

// ==========================================================================
// 2. AUDIO FEEDBACK SYNTHESIZER (WEB AUDIO API - ZERO ASSET OVERHEAD)
// ==========================================================================
class CyberSoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = localStorage.getItem('chyas_sfx_enabled') === 'true';
        this.initButton();
    }

    initCtx() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) this.ctx = new AudioContext();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    initButton() {
        const toggleBtn = document.getElementById('sfx-toggle');
        const statusSpan = document.getElementById('sfx-status');
        if (!toggleBtn || !statusSpan) return;

        this.updateButtonUI();

        toggleBtn.addEventListener('click', () => {
            this.enabled = !this.enabled;
            localStorage.setItem('chyas_sfx_enabled', this.enabled ? 'true' : 'false');
            this.updateButtonUI();
            if (this.enabled) {
                this.initCtx();
                this.playTone(880, 'sine', 0.05, 0.04);
                showToast('Cyber SFX Activated');
            } else {
                showToast('Cyber SFX Muted');
            }
        });
    }

    updateButtonUI() {
        const statusSpan = document.getElementById('sfx-status');
        if (!statusSpan) return;
        if (this.enabled) {
            statusSpan.innerText = 'ON';
            statusSpan.className = 'status-on';
        } else {
            statusSpan.innerText = 'OFF';
            statusSpan.className = 'status-off';
        }
    }

    playTone(freq, type = 'sine', duration = 0.06, vol = 0.03) {
        if (!this.enabled) return;
        try {
            this.initCtx();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(vol, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {}
    }

    click() {
        this.playTone(600, 'triangle', 0.04, 0.03);
    }

    hover() {
        this.playTone(1200, 'sine', 0.03, 0.015);
    }

    glitch() {
        if (!this.enabled) return;
        try {
            this.initCtx();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(350, this.ctx.currentTime + 0.04);
            gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.04);
        } catch (e) {}
    }

    warp() {
        if (!this.enabled) return;
        try {
            this.initCtx();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1150, this.ctx.currentTime + 0.12);
            gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.12);
        } catch (e) {}
    }

    success() {
        this.playTone(700, 'sine', 0.08, 0.04);
        setTimeout(() => this.playTone(1050, 'sine', 0.12, 0.04), 80);
    }
}

const sfx = new CyberSoundEngine();

// ==========================================================================
// 3. TOAST NOTIFICATION SYSTEM
// ==========================================================================
function showToast(message, duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="color:var(--accent);">●</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ==========================================================================
// 4. RESTORED 3D SCROLL ANIMATION PARTICLE ENGINE (SPHERE -> TERRAIN -> HELIX -> NETWORK -> WARP)
// ULTRA-OPTIMIZED FOR MAXIMUM FPS & ZERO-JANK SMOOTHNESS
// ==========================================================================
const canvas = document.getElementById('dynamic-bg');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
let mx = 0, my = 0;
let targetMx = 0, targetMy = 0;
let mouseScreenX = -1000, mouseScreenY = -1000;
let cursorCircleX = -1000, cursorCircleY = -1000;
let coordCounter = 0;
let scaleFactor = 1;
let isMobile = width < 768;
let numParticles = isMobile ? 180 : 600;
const particles = [];


let targetScrollPercent = 0;
let scrollPercent = 0;
let docTotalHeight = 1;
let sectionOffsets = [];
let activeNavId = null;

function cacheSectionOffsets() {
    docTotalHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const secs = document.querySelectorAll('section');
    sectionOffsets = Array.from(secs).map(sec => ({
        id: sec.getAttribute('id'),
        top: sec.offsetTop,
        bottom: sec.offsetTop + sec.offsetHeight
    }));
}

function initNoiseOverlay() {
    const noiseEl = document.querySelector('.noise');
    if (!noiseEl) return;
    try {
        const nCanvas = document.createElement('canvas');
        nCanvas.width = 128;
        nCanvas.height = 128;
        const nCtx = nCanvas.getContext('2d');
        const imgData = nCtx.createImageData(128, 128);
        const d = imgData.data;
        for (let i = 0; i < d.length; i += 4) {
            const val = (Math.random() * 255) | 0;
            d[i] = val;
            d[i + 1] = val;
            d[i + 2] = val;
            d[i + 3] = 16;
        }
        nCtx.putImageData(imgData, 0, 0);
        noiseEl.style.backgroundImage = `url(${nCanvas.toDataURL('image/png')})`;
        noiseEl.style.backgroundRepeat = 'repeat';
    } catch (e) {}
}

function spawnShockwave(x, y) {
    // Disabled
}

// Pre-rendered high-performance circular particle sprites (zero CPU arc tessellation)
let whiteSprite = null;
let redSprite = null;

function createParticleSprites() {
    if (whiteSprite && redSprite) return;
    const spriteSize = 32;
    const center = spriteSize / 2;

    whiteSprite = document.createElement('canvas');
    whiteSprite.width = spriteSize;
    whiteSprite.height = spriteSize;
    const wCtx = whiteSprite.getContext('2d');
    wCtx.beginPath();
    wCtx.arc(center, center, center - 1, 0, 6.2831853);
    wCtx.fillStyle = '#ffffff';
    wCtx.fill();

    redSprite = document.createElement('canvas');
    redSprite.width = spriteSize;
    redSprite.height = spriteSize;
    const rCtx = redSprite.getContext('2d');
    rCtx.beginPath();
    rCtx.arc(center, center, center - 1, 0, 6.2831853);
    rCtx.fillStyle = '#eb4d4b';
    rCtx.fill();
}
createParticleSprites();

function initParticles() {
    particles.length = 0;
    isMobile = window.innerWidth < 768;
    numParticles = isMobile ? 140 : 360;

    for (let i = 0; i < numParticles; i++) {
        const ratio = i / numParticles;
        const phi = Math.acos(Math.max(-1, Math.min(1, 2 * ratio - 1)));
        const offset = Math.random() * Math.PI * 2;
        particles.push({
            x: (Math.random() - 0.5) * window.innerWidth,
            y: (Math.random() - 0.5) * window.innerHeight,
            z: (Math.random() - 0.5) * 1000,
            tx: 0,
            ty: 0,
            tz: 0,
            offset: offset,
            speed: Math.random() * 0.05 + 0.01,
            // Precomputed static parameters to eliminate redundant trig in animation loop
            ratio: ratio,
            sinPhi: Math.sin(phi),
            cosPhi: Math.cos(phi),
            sphereThetaBase: ratio * Math.PI * 2 * 20,
            helixThetaBase: ratio * Math.PI * 2 * 5,
            helixYRatio: (ratio - 0.5) * 1.5,
            helixInvert: (i % 2 === 0),
            netX: Math.cos(offset),
            netY: Math.sin(offset * 2) * 0.6,
            netZ: Math.sin(offset * 3),
            // Deterministic static positions for warp (prevents random jitter & coordinate pollution)
            warpX: (Math.random() - 0.5) * 2,
            warpY: (Math.random() - 0.5) * 2,
            warpSpeed: Math.random() * 25 + 15,
            warpOffset: Math.random() * 2000
        });
    }
}

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    isMobile = width < 768;
    scaleFactor = Math.min(width, height) / 800;
    initParticles();
    cacheSectionOffsets();
}
window.addEventListener('resize', resizeCanvas, { passive: true });
resizeCanvas();

// High-performance 3D Formulas with precomputed particle geometry
function getTargetPosition(i, type, timeVal) {
    const p = particles[i];
    let x, y, z;

    if (type === 'sphere') {
        // HERO: 3D BOLA BERPUTAR (THE EYE) - Digeser lebih ke kanan pada desktop
        const r = 315 * scaleFactor;
        const currentTheta = p.sphereThetaBase + timeVal * 0.12;
        const xOffset = isMobile ? 0 : Math.min(420, width * 0.27);
        x = r * p.sinPhi * Math.cos(currentTheta) + xOffset;
        y = r * p.sinPhi * Math.sin(currentTheta);
        z = r * p.cosPhi;
    } else if (type === 'terrain') {
        // ARCHITECT: 3D LANTAI GELOMBANG OMBAK (Terkontrol & Mulus)
        const sizeX = width * 2.2;
        const gridX = (i % 25) / 25 * sizeX - sizeX / 2;
        const row = Math.floor(i / 25);
        const gridZ = (row / (numParticles / 25)) * 1200 - 600;
        x = gridX;
        y = Math.sin((gridX + timeVal * 60) * 0.01) * 75 + (220 * scaleFactor);
        z = gridZ + ((timeVal * 80) % 200) - 100;
    } else if (type === 'helix') {
        // SKILLS: 3D DNA DOUBLE HELIX
        const r = 320 * scaleFactor;
        const h = 1100 * scaleFactor;
        const currentTheta = p.helixThetaBase + timeVal;
        x = r * Math.cos(currentTheta);
        y = p.helixYRatio * h;
        z = r * Math.sin(currentTheta);
        if (p.helixInvert) x *= -1;
    } else if (type === 'network') {
        // PROJECTS: 3D KONSTELASI JARING
        const spread = 1200 * scaleFactor;
        x = p.netX * spread + Math.sin(timeVal * 0.2) * 100;
        y = p.netY * spread;
        z = p.netZ * spread;
    } else if (type === 'warp') {
        // FOOTER: 3D HYPERSPACE WARP (DETERMINISTIK & HALUS)
        const spread = 2200 * scaleFactor;
        x = p.warpX * spread;
        y = p.warpY * spread;
        z = ((p.warpOffset + timeVal * p.warpSpeed * 8) % 2000) - 1000;
    }

    return { x, y, z };
}

let animTime = 0;
let lastCursorX = -1000, lastCursorY = -1000;
let lastCircleRenderX = -1000, lastCircleRenderY = -1000;

function animateParticles() {
    // Skip rendering if tab is hidden in background
    if (document.hidden) {
        requestAnimationFrame(animateParticles);
        return;
    }

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);

    animTime += 0.02;

    mx += (targetMx - mx) * 0.05;
    my += (targetMy - my) * 0.05;

    // Responsive fluid scroll interpolation
    const scrollDiff = targetScrollPercent - scrollPercent;
    if (Math.abs(scrollDiff) < 0.0003) {
        scrollPercent = targetScrollPercent;
    } else {
        scrollPercent += scrollDiff * 0.26;
    }

    let stage = scrollPercent * 4;
    let index = Math.floor(stage);
    let progress = stage - index;

    if (index < 0) index = 0;
    if (index > 3) {
        index = 3;
        progress = 1;
    }

    const scenes = ['sphere', 'terrain', 'helix', 'network', 'warp'];
    const currentScene = scenes[index];
    const nextScene = scenes[index + 1] || 'warp';

    const ease = progress * progress * (3 - 2 * progress);
    const fov = 400 * scaleFactor;
    const isRedSection = (index === 2 || index === 3);

    const cosMx = Math.cos(mx), sinMx = Math.sin(mx);
    const cosMy = Math.cos(my), sinMy = Math.sin(my);

    for (let i = 0; i < numParticles; i++) {
        let p = particles[i];

        let pos1 = getTargetPosition(i, currentScene, animTime);
        let pos2 = getTargetPosition(i, nextScene, animTime);

        const tx = pos1.x + (pos2.x - pos1.x) * ease;
        const ty = pos1.y + (pos2.y - pos1.y) * ease;
        const tz = pos1.z + (pos2.z - pos1.z) * ease;

        // Snappy smooth convergence (adaptive speed on larger distances)
        const dX = tx - p.x;
        const dY = ty - p.y;
        const dZ = tz - p.z;
        const followSpeed = (Math.abs(dX) > 300 || Math.abs(dY) > 300) ? 0.55 : 0.42;

        p.x += dX * followSpeed;
        p.y += dY * followSpeed;
        p.z += dZ * followSpeed;

        let rx = p.x * cosMx - p.z * sinMx;
        let rz = p.x * sinMx + p.z * cosMx;
        let ry = p.y * cosMy - rz * sinMy;
        rz = p.y * sinMy + rz * cosMy;

        // CRITICAL BUG FIX: Near-plane camera clipping (prevents division by zero / millions of pixels spike)
        const camDist = fov + rz + 350;
        if (camDist < 60) {
            p.visible = false;
            continue;
        }

        const scale = fov / camDist;
        if (scale <= 0 || scale > 2.8) {
            p.visible = false;
            continue;
        }

        const screenX = width / 2 + rx * scale;
        const screenY = height / 2 + ry * scale;

        // Frustum culling
        if (screenX < -50 || screenX > width + 50 || screenY < -50 || screenY > height + 50) {
            p.visible = false;
            continue;
        }

        p.visible = true;
        p.sx = screenX;
        p.sy = screenY;
        p.scale = scale;
        p.size = Math.max(0.7, Math.min(5.5, scale * 4.2));
    }

    // PASS 1: Subtle background particles (depth perspective)
    ctx.fillStyle = isRedSection ? 'rgba(235, 77, 75, 0.4)' : 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        if (!p.visible || p.scale >= 0.85) continue;
        ctx.moveTo(p.sx + p.size, p.sy);
        ctx.arc(p.sx, p.sy, p.size, 0, 6.2831853);
    }
    ctx.fill();

    // PASS 2: Crisp glowing foreground particles
    ctx.fillStyle = isRedSection ? '#eb4d4b' : '#ffffff';
    ctx.beginPath();
    for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        if (!p.visible || p.scale < 0.85) continue;
        ctx.moveTo(p.sx + p.size, p.sy);
        ctx.arc(p.sx, p.sy, p.size, 0, 6.2831853);
    }
    ctx.fill();

    // Dynamic constellation lines on Projects section (Zero Math.sqrt, strictly bounded)
    if ((index === 3 || (index === 2 && progress > 0.6)) && scaleFactor > 0.5) {
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        const maxDistSq = (120 * scaleFactor) ** 2;

        for (let i = 0; i < numParticles; i += 3) {
            const p1 = particles[i];
            if (!p1.visible) continue;
            for (let j = i + 1; j < i + 7; j++) {
                if (j >= numParticles) break;
                const p2 = particles[j];
                if (!p2.visible) continue;

                const dx = p1.sx - p2.sx;
                const dy = p1.sy - p2.sy;
                const distSq = dx * dx + dy * dy;

                if (distSq < maxDistSq) {
                    ctx.moveTo(p1.sx, p1.sy);
                    ctx.lineTo(p2.sx, p2.sy);
                }
            }
        }
        ctx.stroke();
    }

    ctx.globalAlpha = 1;

    // HARDWARE-ACCELERATED ZERO-JANK CURSOR INTERPOLATION
    if (!isMobile && cursorDot && cursorCircle && mouseScreenX > 0) {
        if (cursorCircleX === -1000) {
            cursorCircleX = mouseScreenX;
            cursorCircleY = mouseScreenY;
        } else {
            cursorCircleX += (mouseScreenX - cursorCircleX) * 0.28;
            cursorCircleY += (mouseScreenY - cursorCircleY) * 0.28;
        }

        if (mouseScreenX !== lastCursorX || mouseScreenY !== lastCursorY) {
            cursorDot.style.transform = `translate3d(${mouseScreenX}px, ${mouseScreenY}px, 0)`;
            lastCursorX = mouseScreenX;
            lastCursorY = mouseScreenY;
        }

        if (Math.abs(cursorCircleX - lastCircleRenderX) > 0.1 || Math.abs(cursorCircleY - lastCircleRenderY) > 0.1) {
            cursorCircle.style.transform = `translate3d(${cursorCircleX}px, ${cursorCircleY}px, 0)`;
            lastCircleRenderX = cursorCircleX;
            lastCircleRenderY = cursorCircleY;
        }

        // Throttle Coordinate HUD string update (~120ms)
        if (cursorCoord) {
            cursorCoord.style.transform = `translate3d(${mouseScreenX + 22}px, ${mouseScreenY + 14}px, 0)`;
            coordCounter = (coordCounter + 1) % 8;
            if (coordCounter === 0) {
                cursorCoord.textContent = `[${Math.round(mouseScreenX)}, ${Math.round(mouseScreenY)}]`;
            }
        }

        // Project Hover Preview follows mouse via GPU translate3d
        if (hoverPreview && hoverPreview.classList.contains('active')) {
            hoverPreview.style.transform = `translate3d(${mouseScreenX + 30}px, ${mouseScreenY - 40}px, 0)`;
        }
    }

    requestAnimationFrame(animateParticles);
}

requestAnimationFrame(animateParticles);

// ==========================================================================
// SECRET CMS ACTIVATION TRIGGERS (SECRET SHORTCUT, URL HASH, TRIPLE-CLICK)
// ==========================================================================
let secretClickCount = 0;
let secretClickTimer = null;

function handleSecretTrigger(e) {
    if (e) e.preventDefault();
    secretClickCount++;
    clearTimeout(secretClickTimer);
    secretClickTimer = setTimeout(() => {
        secretClickCount = 0;
    }, 1500);

    // Open if clicked 3 times or if holding Ctrl/Alt
    if (secretClickCount >= 3 || (e && (e.ctrlKey || e.altKey))) {
        secretClickCount = 0;
        openCmsModal();
    }
}

function checkUrlHashForCms() {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#admin' || hash === '#cms') {
        openCmsModal();
    }
}
window.addEventListener('hashchange', checkUrlHashForCms);

// ==========================================================================
// 5. SCROLLBAR & SCROLL PROGRESS MANAGEMENT (ZERO-LAYOUT REFLOW COST)
// ==========================================================================
const customThumb = document.getElementById('custom-thumb');
const scrollFloat = document.getElementById('scroll-float');
const progressBar = document.getElementById('scroll-progress-bar');
const navLinks = document.querySelectorAll('.hud-nav-link');
const sections = document.querySelectorAll('section');

let scrollTimeout;
let lastScrollPercentText = -1;
let scrollTicking = false;

function updateScrollUI() {
    targetScrollPercent = docTotalHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docTotalHeight)) : 0;

    // Top progress bar via GPU scaleX
    if (progressBar) {
        progressBar.style.transform = `scaleX(${targetScrollPercent})`;
    }

    // Custom scrollbar thumb & float
    const trackHeight = window.innerHeight - 100;
    const thumbPosition = targetScrollPercent * trackHeight;
    if (customThumb) customThumb.style.transform = `translate3d(0, ${thumbPosition}px, 0)`;
    if (scrollFloat) {
        scrollFloat.style.transform = `translate3d(0, ${thumbPosition + 40}px, 0)`;
        const roundedPct = Math.round(targetScrollPercent * 100);
        if (roundedPct !== lastScrollPercentText) {
            scrollFloat.textContent = `${roundedPct}%`;
            lastScrollPercentText = roundedPct;
        }
        if (!scrollFloat.classList.contains('visible')) {
            scrollFloat.classList.add('visible');
        }
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (scrollFloat) scrollFloat.classList.remove('visible');
    }, 600);

    // Active Navigation Spy using cached geometry
    const currentPos = window.scrollY + 200;
    let matchedId = null;
    for (let i = 0; i < sectionOffsets.length; i++) {
        const s = sectionOffsets[i];
        if (currentPos >= s.top && currentPos < s.bottom) {
            matchedId = s.id;
            break;
        }
    }
    if (matchedId && matchedId !== activeNavId) {
        activeNavId = matchedId;
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-target') === matchedId);
        });
    }
}

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        requestAnimationFrame(() => {
            updateScrollUI();
            scrollTicking = false;
        });
        scrollTicking = true;
    }
}, { passive: true });

function initSmoothNavLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.dataset.smoothBound) return;
        anchor.dataset.smoothBound = 'true';
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#' && targetId.startsWith('#')) {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ==========================================================================
// 6. MOUSE TRACKING, CURSOR & HOVER TARGETS
// ==========================================================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');
const hoverPreview = document.getElementById('project-hover-preview');
const previewImg = document.getElementById('preview-img');
const cursorCoord = document.getElementById('cursor-coord');

window.addEventListener('mousemove', (e) => {
    targetMx = (e.clientX / width) * 2 - 1;
    targetMy = (e.clientY / height) * 2 - 1;
    mouseScreenX = e.clientX;
    mouseScreenY = e.clientY;
}, { passive: true });

function initHoverTargets() {
    document.querySelectorAll('.hover-target').forEach(el => {
        if (el.dataset.hoverBound) return;
        el.dataset.hoverBound = 'true';
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
            sfx.hover();
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
        el.addEventListener('click', () => {
            sfx.click();
        });
    });

    // Magnetic buttons physics with anime.js (cached bounds)
    if (!isMobile) {
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            if (btn.dataset.magneticBound) return;
            btn.dataset.magneticBound = 'true';
            let btnRect = null;

            btn.addEventListener('mouseenter', () => {
                btnRect = btn.getBoundingClientRect();
            });

            btn.addEventListener('mousemove', (e) => {
                if (!btnRect) btnRect = btn.getBoundingClientRect();
                const x = (e.clientX - btnRect.left - btnRect.width / 2) * 0.35;
                const y = (e.clientY - btnRect.top - btnRect.height / 2) * 0.35;
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: btn,
                        translateX: x,
                        translateY: y,
                        duration: 250,
                        easing: 'easeOutQuad'
                    });
                }
            });

            btn.addEventListener('mouseleave', () => {
                btnRect = null;
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: btn,
                        translateX: 0,
                        translateY: 0,
                        duration: 500,
                        easing: 'easeOutElastic(1, .5)'
                    });
                }
            });
        });
    }
}

// ==========================================================================
// 7. TEXT SCRAMBLE CYBER EFFECT
// ==========================================================================
function triggerScramble(element) {
    if (!element) return;
    const targets = element.querySelectorAll('.scramble-wrapper');
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&/<>[]";
    targets.forEach((target) => {
        const heroChars = target.querySelectorAll('.hero-char');
        if (heroChars.length > 0) {
            let iterations = 0;
            const interval = setInterval(() => {
                heroChars.forEach((chEl, index) => {
                    const originalChar = chEl.getAttribute('data-char') || chEl.innerText;
                    if (index < iterations) {
                        chEl.innerText = originalChar;
                    } else {
                        chEl.innerText = chars[Math.floor(Math.random() * chars.length)];
                    }
                });
                if (iterations >= heroChars.length) {
                    clearInterval(interval);
                    heroChars.forEach(chEl => {
                        chEl.innerText = chEl.getAttribute('data-char') || chEl.innerText;
                    });
                }
                iterations += 1 / 3;
            }, 28);
            return;
        }

        const originalText = target.getAttribute('data-value') || target.innerText;
        let iterations = 0;
        const interval = setInterval(() => {
            target.innerText = originalText.split("").map((letter, index) => {
                if (index < iterations) return originalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join("");
            if (iterations >= originalText.length) {
                clearInterval(interval);
                target.innerText = originalText;
            }
            iterations += 1 / 3;
        }, 28);
    });
}

// ==========================================================================
// 8. RENDER DOM ELEMENTS FROM STORE
// ==========================================================================
function renderProfile() {
    const p = store.data.profile;
    const fn = document.getElementById('hero-firstname');
    const ln = document.getElementById('hero-lastname');
    const role = document.getElementById('hero-label');
    const lead = document.getElementById('hero-lead');
    const bio = document.getElementById('bio-content-text');

    if (fn) {
        setupHeroInteractiveLetters(p.firstName || 'Chyas?');
    }
    if (ln) {
        if (p.lastName) {
            ln.innerText = p.lastName;
            ln.setAttribute('data-value', p.lastName);
            if (ln.parentElement) ln.parentElement.style.display = '';
        } else {
            ln.innerText = '';
            if (ln.parentElement) ln.parentElement.style.display = 'none';
        }
    }
    if (role) role.innerText = p.role.replace(/^\/\/\/\s*/, '');
    if (lead) lead.innerText = p.lead;
    if (bio) bio.innerHTML = p.bio;

    // Stats
    const y = document.getElementById('stat-years');
    const pr = document.getElementById('stat-projects');
    const com = document.getElementById('stat-commitment');
    if (y) y.setAttribute('data-target', p.stats.years);
    if (pr) pr.setAttribute('data-target', p.stats.projects);
    if (com) com.setAttribute('data-target', p.stats.commitment);

    // Profile form fields in CMS
    const pf1 = document.getElementById('prof-firstname');
    const pf2 = document.getElementById('prof-lastname');
    const pfr = document.getElementById('prof-role');
    const pfl = document.getElementById('prof-lead');
    const pfb = document.getElementById('prof-bio');
    const pfy = document.getElementById('prof-stat-years');
    const pfp = document.getElementById('prof-stat-projects');
    const pfc = document.getElementById('prof-stat-commitment');

    if (pf1) pf1.value = p.firstName;
    if (pf2) pf2.value = p.lastName || '';
    if (pfr) pfr.value = p.role;
    if (pfl) pfl.value = p.lead;
    if (pfb) pfb.value = p.bio;
    if (pfy) pfy.value = p.stats.years;
    if (pfp) pfp.value = p.stats.projects;
    if (pfc) pfc.value = p.stats.commitment;
}

function renderSkills() {
    const s = store.data.skills;
    const track1 = document.getElementById('marquee-track-1');
    const track2 = document.getElementById('marquee-track-2');

    if (track1) {
        // Repeat items twice for seamless infinite marquee loop
        const items = [...s.track1, ...s.track1];
        track1.innerHTML = items.map(skill => `<div class="marquee-item hover-target">${skill} <span>•</span></div>`).join('');
    }

    if (track2) {
        const items = [...s.track2, ...s.track2];
        track2.innerHTML = items.map(skill => `<div class="marquee-item hover-target"><span>•</span> ${skill}</div>`).join('');
    }

    // CMS forms
    const st1 = document.getElementById('skills-track-1');
    const st2 = document.getElementById('skills-track-2');
    if (st1) st1.value = s.track1.join(', ');
    if (st2) st2.value = s.track2.join(', ');
}

let currentCategoryFilter = 'ALL';

function filterProjectsByCategory(category, btnElement) {
    currentCategoryFilter = category;
    document.querySelectorAll('.filter-pill').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    renderProjects();
    sfx.click();

    // Subtle Anime.js stagger animation on the filtered project list
    if (typeof anime !== 'undefined') {
        anime({
            targets: '#project-list-container .project-item',
            opacity: [0, 1],
            translateY: [15, 0],
            delay: anime.stagger(50),
            duration: 350,
            easing: 'easeOutQuad'
        });
    }
}

function handleQuickContact(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name')?.value || 'Colleague';
    const email = document.getElementById('contact-email')?.value || '';
    const subject = document.getElementById('contact-subject')?.value || 'System Inquiry';
    const message = document.getElementById('contact-message')?.value || '';

    sfx.success();
    showToast(`Transmission received, thank you ${name}! Response within 24h.`);

    const targetEmail = store.data.socials?.email || 'hello@chyas.dev';
    const mailtoSubject = encodeURIComponent(`[Transmission] ${subject}`);
    const mailtoBody = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);

    // Clean trigger
    const form = document.getElementById('quick-contact-form');
    if (form) form.reset();

    // Open mail client as direct backup
    setTimeout(() => {
        window.location.href = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
    }, 450);
}

function renderProjects(query = '') {
    const container = document.getElementById('project-list-container');
    const cmsList = document.getElementById('cms-project-list');
    const countBadge = document.getElementById('cms-item-count');
    if (!container) return;

    let items = store.data.projects;
    if (countBadge) countBadge.innerText = `${items.length} PROJECTS ACTIVE`;

    // Apply category filter
    if (currentCategoryFilter && currentCategoryFilter !== 'ALL') {
        const cf = currentCategoryFilter.toLowerCase();
        items = items.filter(p =>
            p.category.toLowerCase().includes(cf) ||
            p.stack.toLowerCase().includes(cf) ||
            p.title.toLowerCase().includes(cf)
        );
    }

    if (query.trim() !== '') {
        const q = query.toLowerCase();
        items = items.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.stack.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.desc.toLowerCase().includes(q)
        );
    }

    // Render client list
    container.innerHTML = items.map((p, idx) => {
        const numStr = (idx + 1) < 10 ? `0${idx + 1}` : `${idx + 1}`;
        return `
            <a class="project-item hover-target reveal-up in-view" href="#" onclick="openModalById('${p.id}', event)"
                data-id="${p.id}"
                data-title="${escapeHtml(p.title)}"
                data-desc="${escapeHtml(p.desc)}"
                data-stack="${escapeHtml(p.stack)}"
                data-img="${p.img}"
                data-link="${p.link || '#'}"
                data-github="${p.github || '#'}">
                <div class="p-left">
                    <span class="p-num">${numStr}</span>
                    <span class="p-title">${escapeHtml(p.subtitle || p.title)}</span>
                </div>
                <div class="p-right">
                    <span class="p-stack-preview">${escapeHtml(p.stack)}</span>
                    <span class="p-cat">${escapeHtml(p.category)}</span>
                    <span class="p-arrow">↗</span>
                </div>
            </a>
        `;
    }).join('');

    // Attach desktop hover preview handlers
    if (!isMobile && hoverPreview && previewImg) {
        container.querySelectorAll('.project-item').forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                const img = item.getAttribute('data-img');
                if (img) {
                    previewImg.src = img;
                    hoverPreview.classList.add('active');
                }
            });
            item.addEventListener('mouseleave', () => {
                hoverPreview.classList.remove('active');
            });
        });
    }

    // Render CMS admin items
    if (cmsList) {
        cmsList.innerHTML = store.data.projects.map((p, idx) => `
            <div class="cms-item-card">
                <div class="cms-item-left">
                    <img src="${p.img}" class="cms-item-thumb" alt="${escapeHtml(p.title)}" onerror="this.src='GatotACMobil.webp'">
                    <div>
                        <div class="cms-item-title">${escapeHtml(p.title)}</div>
                        <div class="cms-item-sub">${escapeHtml(p.category)} // ${escapeHtml(p.stack)}</div>
                    </div>
                </div>
                <div class="cms-item-actions">
                    <button class="cms-action-btn hover-target" onclick="moveProject('${p.id}', -1)" title="Move Up">↑</button>
                    <button class="cms-action-btn hover-target" onclick="moveProject('${p.id}', 1)" title="Move Down">↓</button>
                    <button class="cms-action-btn hover-target" onclick="editProject('${p.id}')">EDIT</button>
                    <button class="cms-action-btn btn-delete hover-target" onclick="deleteProject('${p.id}')">DELETE</button>
                </div>
            </div>
        `).join('');
    }

    initHoverTargets();
}

function handleProjectSearch(val) {
    renderProjects(val);
}

function renderSocials() {
    const s = store.data.socials;
    const gh = document.getElementById('soc-link-github');
    const li = document.getElementById('soc-link-linkedin');
    const ig = document.getElementById('soc-link-instagram');
    const em = document.getElementById('soc-link-email');
    const footerEmail = document.getElementById('footer-email-display');

    if (gh && s.github) gh.href = s.github;
    if (li && s.linkedin) li.href = s.linkedin;
    if (ig && s.instagram) ig.href = s.instagram;
    if (em && s.email) em.href = `mailto:${s.email}`;
    if (footerEmail && s.email) {
        footerEmail.innerText = `${s.email} ↗`;
        footerEmail.href = `mailto:${s.email}`;
    }

    // CMS inputs
    const formGh = document.getElementById('soc-github');
    const formLi = document.getElementById('soc-linkedin');
    const formIg = document.getElementById('soc-instagram');
    const formEm = document.getElementById('soc-email');

    if (formGh) formGh.value = s.github || '';
    if (formLi) formLi.value = s.linkedin || '';
    if (formIg) formIg.value = s.instagram || '';
    if (formEm) formEm.value = s.email || '';
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}

// ==========================================================================
// 9. PROJECT DETAIL MODAL
// ==========================================================================
const modal = document.getElementById('modal');

function openModalById(id, event) {
    if (event) event.preventDefault();
    const proj = store.data.projects.find(p => p.id === id);
    if (!proj) return;

    document.getElementById('m-title').innerText = proj.title;
    document.getElementById('m-desc').innerText = proj.desc;
    document.getElementById('m-cat').innerText = proj.category;
    document.getElementById('m-img').src = proj.img;

    const stackContainer = document.getElementById('m-stack');
    if (stackContainer) {
        const tags = proj.stack.split('/').map(t => t.trim());
        stackContainer.innerHTML = tags.map(t => `<span class="stack-pill">${t}</span>`).join('');
    }

    const liveBtn = document.getElementById('m-link');
    if (liveBtn) {
        liveBtn.href = proj.link || '#';
        liveBtn.style.display = proj.link ? 'inline-flex' : 'none';
    }

    const ghBtn = document.getElementById('m-github');
    if (ghBtn) {
        ghBtn.href = proj.github || '#';
        ghBtn.style.display = proj.github ? 'inline-flex' : 'none';
    }

    modal.classList.add('modal-active');
    document.body.style.overflow = 'hidden';
    sfx.success();
}

function closeModal() {
    modal.classList.remove('modal-active');
    document.body.style.overflow = '';
    document.body.style.overflowY = '';
    sfx.click();
}

// ESC closes modal
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modal && modal.classList.contains('modal-active')) closeModal();
        if (document.getElementById('cms-modal')?.classList.contains('active')) closeCmsModal();
    }
    // Shortcut Ctrl+Shift+A opens CMS
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        openCmsModal();
    }
});

// ==========================================================================
// 10. CMS (CONTENT MANAGEMENT SYSTEM) LOGIC
// ==========================================================================
const cmsModal = document.getElementById('cms-modal');
const cmsLockscreen = document.getElementById('cms-lockscreen');
const cmsDashboard = document.getElementById('cms-dashboard');
let isCmsAuthenticated = false;

function openCmsModal() {
    if (!cmsModal) return;
    cmsModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (isCmsAuthenticated) {
        cmsLockscreen.style.display = 'none';
        cmsDashboard.style.display = 'flex';
    } else {
        cmsLockscreen.style.display = 'flex';
        cmsDashboard.style.display = 'none';
        const input = document.getElementById('cms-passcode-input');
        if (input) {
            input.value = '';
            setTimeout(() => input.focus(), 150);
        }
    }
    sfx.click();
}

function closeCmsModal() {
    if (!cmsModal) return;
    cmsModal.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.overflowY = '';
    sfx.click();
}

function handleCmsLogin(e) {
    e.preventDefault();
    const passInput = document.getElementById('cms-passcode-input');
    const errBox = document.getElementById('lock-error');
    const entered = passInput ? passInput.value.trim() : '';

    const currentPass = store.data.settings?.passcode || 'admin123';
    if (entered === currentPass) {
        isCmsAuthenticated = true;
        if (errBox) errBox.innerText = '';
        cmsLockscreen.style.display = 'none';
        cmsDashboard.style.display = 'flex';
        sfx.success();
        showToast('Admin Access Granted');
    } else {
        if (errBox) errBox.innerText = 'ACCESS DENIED: Invalid Passcode';
        sfx.playTone(200, 'sawtooth', 0.15, 0.05);
        if (passInput) {
            passInput.value = '';
            passInput.focus();
        }
    }
}

function switchCmsTab(tabName, el) {
    document.querySelectorAll('.cms-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.cms-panel').forEach(p => p.classList.remove('active'));

    const btn = el || (typeof event !== 'undefined' && event ? (event.currentTarget || event.target) : null) || document.querySelector(`.cms-tab-btn[onclick*="${tabName}"]`);
    if (btn) btn.classList.add('active');
    const targetPanel = document.getElementById(`tab-${tabName}`);
    if (targetPanel) targetPanel.classList.add('active');
    sfx.click();
}

// PROJECT FORM HANDLERS
function openProjectForm(id = null) {
    const card = document.getElementById('project-form-card');
    const mode = document.getElementById('project-form-mode');
    const form = document.getElementById('project-form');
    if (!card || !form) return;

    form.reset();
    document.getElementById('p-form-id').value = '';

    if (id) {
        const p = store.data.projects.find(item => item.id === id);
        if (p) {
            mode.innerText = `EDIT PROJECT: ${p.title}`;
            document.getElementById('p-form-id').value = p.id;
            document.getElementById('p-form-title').value = p.title;
            document.getElementById('p-form-subtitle').value = p.subtitle || p.title;
            document.getElementById('p-form-category').value = p.category;
            document.getElementById('p-form-stack').value = p.stack;
            document.getElementById('p-form-desc').value = p.desc;
            document.getElementById('p-form-link').value = p.link || '';
            document.getElementById('p-form-github').value = p.github || '';
            document.getElementById('p-form-img-url').value = p.img;
            document.getElementById('form-img-preview').src = p.img;
        }
    } else {
        mode.innerText = 'ADD NEW PROJECT';
        document.getElementById('p-form-img-url').value = 'GatotACMobil.webp';
        document.getElementById('form-img-preview').src = 'GatotACMobil.webp';
    }

    card.style.display = 'block';
    card.scrollIntoView({ behavior: 'smooth' });
}

function closeProjectForm() {
    const card = document.getElementById('project-form-card');
    if (card) card.style.display = 'none';
}

function editProject(id) {
    openProjectForm(id);
}

function deleteProject(id) {
    if (!confirm('Are you sure you want to delete this project from your portfolio?')) return;
    store.data.projects = store.data.projects.filter(p => p.id !== id);
    store.save();
    renderProjects();
    showToast('Project Deleted');
    sfx.click();
}

function moveProject(id, dir) {
    const arr = store.data.projects;
    const idx = arr.findIndex(p => p.id === id);
    if (idx < 0) return;
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= arr.length) return;

    const temp = arr[idx];
    arr[idx] = arr[targetIdx];
    arr[targetIdx] = temp;

    store.save();
    renderProjects();
    sfx.click();
}

function setImagePreset(filename) {
    document.getElementById('p-form-img-url').value = filename;
    document.getElementById('form-img-preview').src = filename;
}

function updateImagePreview(val) {
    const preview = document.getElementById('form-img-preview');
    if (preview && val.trim() !== '') {
        preview.src = val;
    }
}

// In-browser client-side WebP converter (ultra-fast & lightweight!)
function handleImageFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    showToast('Compressing image to WebP...');
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            // Resize canvas if image is large
            const maxDim = 1200;
            let w = img.width;
            let h = img.height;
            if (w > maxDim || h > maxDim) {
                if (w > h) {
                    h = Math.round((h * maxDim) / w);
                    w = maxDim;
                } else {
                    w = Math.round((w * maxDim) / h);
                    h = maxDim;
                }
            }

            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = w;
            tempCanvas.height = h;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(img, 0, 0, w, h);

            // Convert to lightweight WebP data URL
            const webpDataUrl = tempCanvas.toDataURL('image/webp', 0.85);

            document.getElementById('p-form-img-url').value = webpDataUrl;
            document.getElementById('form-img-preview').src = webpDataUrl;
            showToast('WebP Conversion Complete!');
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

function saveProject(e) {
    e.preventDefault();
    const id = document.getElementById('p-form-id').value;
    const title = document.getElementById('p-form-title').value.trim();
    const subtitle = document.getElementById('p-form-subtitle').value.trim();
    const category = document.getElementById('p-form-category').value.trim();
    const stack = document.getElementById('p-form-stack').value.trim();
    const desc = document.getElementById('p-form-desc').value.trim();
    const link = document.getElementById('p-form-link').value.trim();
    const github = document.getElementById('p-form-github').value.trim();
    const img = document.getElementById('p-form-img-url').value.trim() || 'GatotACMobil.webp';

    if (id) {
        // Edit existing
        const p = store.data.projects.find(item => item.id === id);
        if (p) {
            p.title = title;
            p.subtitle = subtitle;
            p.category = category;
            p.stack = stack;
            p.desc = desc;
            p.link = link;
            p.github = github;
            p.img = img;
        }
        showToast('Project Updated Successfully');
    } else {
        // Add new
        const newProj = {
            id: 'proj_' + Date.now(),
            title,
            subtitle,
            category,
            stack,
            desc,
            link,
            github,
            img
        };
        store.data.projects.unshift(newProj);
        showToast('New Project Added to Portfolio');
    }

    store.save();
    renderProjects();
    closeProjectForm();
    sfx.success();
}

// PROFILE FORM
function saveProfile(e) {
    e.preventDefault();
    const p = store.data.profile;
    p.firstName = document.getElementById('prof-firstname').value.trim();
    p.lastName = document.getElementById('prof-lastname').value.trim();
    p.role = document.getElementById('prof-role').value.trim();
    p.lead = document.getElementById('prof-lead').value.trim();
    p.bio = document.getElementById('prof-bio').value.trim();
    p.stats.years = parseInt(document.getElementById('prof-stat-years').value) || 0;
    p.stats.projects = parseInt(document.getElementById('prof-stat-projects').value) || 0;
    p.stats.commitment = parseInt(document.getElementById('prof-stat-commitment').value) || 100;

    store.save();
    renderProfile();
    showToast('Profile Updated Successfully');
    sfx.success();
}

// SKILLS FORM
function saveSkills(e) {
    e.preventDefault();
    const t1 = document.getElementById('skills-track-1').value.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
    const t2 = document.getElementById('skills-track-2').value.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);

    store.data.skills.track1 = t1;
    store.data.skills.track2 = t2;

    store.save();
    renderSkills();
    showToast('Skills Tracks Updated');
    sfx.success();
}

// SOCIALS FORM
function saveSocials(e) {
    e.preventDefault();
    const s = store.data.socials;
    s.github = document.getElementById('soc-github').value.trim();
    s.linkedin = document.getElementById('soc-linkedin').value.trim();
    s.instagram = document.getElementById('soc-instagram').value.trim();
    s.email = document.getElementById('soc-email').value.trim();

    store.save();
    renderSocials();
    showToast('Social Links Updated');
    sfx.success();
}

// EXPORT / IMPORT DATA JSON
function exportDataJson() {
    const jsonStr = JSON.stringify(store.data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Portfolio JSON Exported');
    sfx.success();
}

function importDataJson(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const parsed = JSON.parse(evt.target.result);
            if (!parsed.profile || !parsed.projects) {
                throw new Error('Invalid schema');
            }
            store.data = parsed;
            store.save();
            renderProfile();
            renderSkills();
            renderProjects();
            renderSocials();
            showToast('Portfolio Data Restored Successfully!');
            sfx.success();
        } catch (err) {
            alert('Error parsing JSON file. Please make sure the format is valid.');
        }
    };
    reader.readAsText(file);
}

function changePasscode(e) {
    e.preventDefault();
    const newPass = document.getElementById('new-passcode-input').value.trim();
    if (!newPass) return;
    if (!store.data.settings) store.data.settings = {};
    store.data.settings.passcode = newPass;
    store.save();
    document.getElementById('new-passcode-input').value = '';
    showToast('Passcode Changed Successfully');
    sfx.success();
}

function confirmResetDefaults() {
    if (!confirm('Are you sure you want to reset all portfolio data to default? Any custom projects will be reset.')) return;
    store.reset();
    renderProfile();
    renderSkills();
    renderProjects();
    renderSocials();
    showToast('Portfolio Reset to Defaults');
    sfx.click();
}

// COPY EMAIL HELPER
function copyEmailToClipboard(e) {
    const email = store.data.socials?.email || 'hello@chyas.dev';
    navigator.clipboard.writeText(email).then(() => {
        showToast(`Email copied: ${email}`);
        sfx.success();
    }).catch(() => {
        showToast(`Email: ${email}`);
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    sfx.click();
}

// ==========================================================================
// KINETIC INTERACTIVE ENGINES (HERO LETTER MATRIX, BRAND MAGNETICS, 3D TILT)
// ==========================================================================
function setupHeroInteractiveLetters(text = "Chyas?") {
    const fnWrapper = document.getElementById('hero-firstname');
    if (!fnWrapper) return;
    fnWrapper.setAttribute('data-value', text);
    const chars = text.split('');
    fnWrapper.innerHTML = chars.map((ch, idx) => {
        const isMystery = (ch === '?');
        return `<span class="hero-char ${isMystery ? 'char-mystery' : ''}" data-char="${ch}" data-index="${idx}">${ch}</span>`;
    }).join('');
    initHeroKineticEngine();
}

function initHeroKineticEngine() {
    const heroTitle = document.getElementById('hero-title-interactive') || document.querySelector('.hero-name-title');
    if (!heroTitle) return;
    const chars = heroTitle.querySelectorAll('.hero-char');
    const mysteryChar = heroTitle.querySelector('.char-mystery');

    // Mystery glyph cycler on hover
    const glyphs = ['?', '¿', '§', 'Ø', '◈', '✦', '?'];
    let glyphIndex = 0;
    let mysteryInterval = null;

    if (mysteryChar && !mysteryChar.dataset.bound) {
        mysteryChar.dataset.bound = 'true';
        mysteryChar.addEventListener('mouseenter', () => {
            sfx.warp();
            mysteryChar.classList.add('active');
            clearInterval(mysteryInterval);
            mysteryInterval = setInterval(() => {
                glyphIndex = (glyphIndex + 1) % glyphs.length;
                mysteryChar.innerText = glyphs[glyphIndex];
                if (glyphIndex === 0) {
                    clearInterval(mysteryInterval);
                    mysteryChar.innerText = '?';
                }
            }, 65);
        });

        mysteryChar.addEventListener('mouseleave', () => {
            clearInterval(mysteryInterval);
            mysteryChar.innerText = '?';
            mysteryChar.classList.remove('active');
        });
    }

    // Individual letter hover micro-cipher
    chars.forEach((charEl) => {
        if (charEl.dataset.bound) return;
        charEl.dataset.bound = 'true';
        charEl.addEventListener('mouseenter', () => {
            sfx.glitch();
            const orig = charEl.getAttribute('data-char');
            if (orig === '?') return;
            const cipherSet = "!<>-_\\/[]{}—=+*^#01";
            let cCount = 0;
            const iv = setInterval(() => {
                charEl.innerText = cipherSet[Math.floor(Math.random() * cipherSet.length)];
                cCount++;
                if (cCount >= 4) {
                    clearInterval(iv);
                    charEl.innerText = orig;
                }
            }, 28);
        });
    });

    // Proximity repulsion & 3D Title Tilt (Cached Bounds & Zero Layout Thrashing)
    if (!heroTitle.dataset.bound && !isMobile) {
        heroTitle.dataset.bound = 'true';
        let titleRect = null;
        let charCache = [];

        function updateHeroBounds() {
            titleRect = heroTitle.getBoundingClientRect();
            charCache = Array.from(chars).map(charEl => {
                const r = charEl.getBoundingClientRect();
                return {
                    el: charEl,
                    x: r.left + r.width / 2,
                    y: r.top + r.height / 2,
                    isMystery: charEl.classList.contains('char-mystery')
                };
            });
        }

        heroTitle.addEventListener('mouseenter', () => {
            document.body.classList.add('targeting');
            updateHeroBounds();
        });

        heroTitle.addEventListener('mouseleave', () => {
            document.body.classList.remove('targeting');
            titleRect = null;
            charCache = [];
            if (typeof anime !== 'undefined') {
                const normalChars = Array.from(chars).filter(c => !c.classList.contains('char-mystery'));
                anime({
                    targets: normalChars,
                    translateX: 0,
                    translateY: 0,
                    rotateZ: 0,
                    scale: 1,
                    duration: 600,
                    easing: 'easeOutElastic(1, 0.45)'
                });
                anime({
                    targets: heroTitle,
                    rotateX: 0,
                    rotateY: 0,
                    duration: 450,
                    easing: 'easeOutQuad'
                });
                if (mysteryChar) {
                    mysteryChar.style.transform = '';
                    mysteryChar.style.textShadow = '';
                }
            } else {
                chars.forEach(c => { c.style.transform = ''; c.style.textShadow = ''; });
                heroTitle.style.transform = '';
            }
        });

        let heroMoveTicking = false;
        let lastHeroEvt = null;

        heroTitle.addEventListener('mousemove', (e) => {
            lastHeroEvt = e;
            if (!heroMoveTicking) {
                requestAnimationFrame(() => {
                    if (!lastHeroEvt || !titleRect) {
                        heroMoveTicking = false;
                        return;
                    }
                    const ev = lastHeroEvt;
                    const tCenterX = titleRect.left + titleRect.width / 2;
                    const tCenterY = titleRect.top + titleRect.height / 2;
                    const normX = (ev.clientX - tCenterX) / (titleRect.width / 2);
                    const normY = (ev.clientY - tCenterY) / (titleRect.height / 2);

                    heroTitle.style.transform = `perspective(1000px) rotateX(${-normY * 10}deg) rotateY(${normX * 10}deg)`;

                    for (let k = 0; k < charCache.length; k++) {
                        const item = charCache[k];
                        const dx = ev.clientX - item.x;
                        const dy = ev.clientY - item.y;
                        const distSq = dx * dx + dy * dy;
                        const maxDist = 140;

                        if (distSq < maxDist * maxDist) {
                            const dist = Math.sqrt(distSq);
                            const force = 1 - dist / maxDist;
                            const angle = Math.atan2(dy, dx);
                            const pushX = -Math.cos(angle) * force * 34;
                            const pushY = -Math.sin(angle) * force * 26;
                            const rot = (dx > 0 ? -1 : 1) * force * 16;
                            const scale = 1 + force * 0.14;

                            item.el.style.transform = `translate3d(${pushX}px, ${pushY}px, 0) rotate(${rot}deg) scale(${scale})`;
                            if (item.isMystery) {
                                item.el.style.textShadow = `0 0 35px #ff3b30, 0 0 70px #eb4d4b, ${-pushX * 0.8}px 0 rgba(255, 60, 60, 0.9)`;
                            } else {
                                item.el.style.textShadow = `${-pushX * 0.55}px 0 rgba(235, 77, 75, 0.8), ${pushX * 0.55}px 0 rgba(0, 240, 255, 0.75)`;
                            }
                            item.el.classList.add('is-repelled');
                        } else {
                            item.el.style.transform = '';
                            item.el.style.textShadow = '';
                            item.el.classList.remove('is-repelled');
                        }
                    }
                    heroMoveTicking = false;
                });
                heroMoveTicking = true;
            }
        });

        // Click Detonation
        heroTitle.addEventListener('click', (e) => {
            triggerKineticDetonation(e, chars, heroTitle);
        });
    }
}

function triggerKineticDetonation(e, chars, heroTitle) {
    sfx.success();
    sfx.warp();
    spawnShockwave(e.clientX, e.clientY);

    if (typeof anime !== 'undefined') {
        anime({
            targets: chars,
            translateX: (el, i) => (i - 2.5) * 50 + (Math.random() - 0.5) * 30,
            translateY: () => (Math.random() - 0.5) * 60,
            rotateZ: () => (Math.random() - 0.5) * 45,
            scale: [1, 1.3],
            duration: 200,
            easing: 'easeOutExpo',
            complete: () => {
                anime({
                    targets: chars,
                    translateX: 0,
                    translateY: 0,
                    rotateZ: 0,
                    scale: 1,
                    duration: 850,
                    easing: 'easeOutElastic(1, 0.4)',
                    complete: () => {
                        const m = heroTitle.querySelector('.char-mystery');
                        if (m) {
                            m.style.transform = '';
                            m.style.textShadow = '';
                        }
                    }
                });
            }
        });
    }

    triggerScramble(heroTitle);
}

function setupHeaderInteractiveBrand() {
    const brand = document.querySelector('.hud-brand');
    const brandText = document.querySelector('.brand-text');
    if (!brand || !brandText) return;

    const origText = "Chyas?";
    brandText.innerHTML = origText.split('').map((ch) => {
        const isMystery = (ch === '?');
        return `<span class="brand-char ${isMystery ? 'char-mystery' : ''}">${ch}</span>`;
    }).join('');

    if (!isMobile && !brand.dataset.bound) {
        brand.dataset.bound = 'true';
        let brandRect = null;

        brand.addEventListener('mouseenter', () => {
            brandRect = brand.getBoundingClientRect();
        });

        brand.addEventListener('mousemove', (e) => {
            if (!brandRect) brandRect = brand.getBoundingClientRect();
            const bx = (e.clientX - brandRect.left - brandRect.width / 2) * 0.4;
            const by = (e.clientY - brandRect.top - brandRect.height / 2) * 0.4;
            brand.style.transform = `translate3d(${bx}px, ${by}px, 0)`;
        });

        brand.addEventListener('mouseleave', () => {
            brandRect = null;
            brand.style.transform = '';
            if (typeof anime !== 'undefined') {
                anime({
                    targets: brand,
                    translateX: 0,
                    translateY: 0,
                    duration: 500,
                    easing: 'easeOutElastic(1, 0.5)'
                });
            }
        });

        let isBrandScrambling = false;
        brand.addEventListener('mouseenter', () => {
            sfx.hover();
            if (isBrandScrambling) return;
            isBrandScrambling = true;
            const brandChars = brand.querySelectorAll('.brand-char');
            const cipherPool = "@#%&/<>[]10?";
            brandChars.forEach((bc, idx) => {
                const realChar = origText[idx];
                let iter = 0;
                const interval = setInterval(() => {
                    bc.innerText = cipherPool[Math.floor(Math.random() * cipherPool.length)];
                    iter++;
                    if (iter >= 4 + idx * 2) {
                        clearInterval(interval);
                        bc.innerText = realChar;
                        if (idx === brandChars.length - 1) isBrandScrambling = false;
                    }
                }, 35);
            });
        });
    }
}

function initInteractiveCardTilt() {
    if (isMobile) return;
    const cards = document.querySelectorAll('.philosophy-card, .stack-category-card, .timeline-item');
    cards.forEach(card => {
        if (card.dataset.tiltBound) return;
        card.dataset.tiltBound = 'true';
        let cardRect = null;
        let tiltTicking = false;
        let lastCardEvent = null;

        card.addEventListener('mouseenter', () => {
            cardRect = card.getBoundingClientRect();
        });

        card.addEventListener('mousemove', (e) => {
            lastCardEvent = e;
            if (!tiltTicking) {
                requestAnimationFrame(() => {
                    if (!cardRect || !lastCardEvent) {
                        tiltTicking = false;
                        return;
                    }
                    const ev = lastCardEvent;
                    const x = ev.clientX - cardRect.left;
                    const y = ev.clientY - cardRect.top;
                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);

                    const centerX = cardRect.width / 2;
                    const centerY = cardRect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -6;
                    const rotateY = ((x - centerX) / centerX) * 6;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
                    tiltTicking = false;
                });
                tiltTicking = true;
            }
        });

        card.addEventListener('mouseleave', () => {
            cardRect = null;
            card.style.transform = '';
            card.style.removeProperty('--mouse-x');
            card.style.removeProperty('--mouse-y');
        });
    });
}

// ==========================================================================
// 11. ANIME.JS INITIALIZATION & SCROLL REVEALS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Generate lightweight static noise pattern (zero runtime SVG GPU cost)
    initNoiseOverlay();

    // Render store data into DOM
    renderProfile();
    renderSkills();
    renderProjects();
    renderSocials();
    initHoverTargets();
    setupHeroInteractiveLetters();
    setupHeaderInteractiveBrand();
    initInteractiveCardTilt();
    initSmoothNavLinks();
    cacheSectionOffsets();

    // Year display & URL hash CMS trigger
    const yr = document.getElementById('current-year');
    if (yr) yr.innerText = new Date().getFullYear();
    checkUrlHashForCms();

    // Intro Overlay Sequence
    const overlay = document.getElementById('intro-overlay');
    const counter = document.querySelector('.intro-counter');

    if (typeof anime !== 'undefined' && overlay && counter) {
        anime.timeline({
            easing: 'easeOutExpo',
            complete: () => {
                anime({
                    targets: overlay,
                    opacity: 0,
                    duration: 750,
                    easing: 'linear',
                    complete: () => {
                        overlay.style.display = 'none';
                        document.body.classList.remove('intro-active');
                        document.body.style.overflow = '';
                        document.body.style.overflowY = '';

                        // Initialize Scroll Observers
                        initScrollObserver();

                        // Initial Title Scramble
                        const h1 = document.querySelector('h1');
                        if (h1) triggerScramble(h1);
                        cacheSectionOffsets();
                        updateScrollUI();
                    }
                });
            }
        })
        .add({
            targets: counter,
            innerHTML: [0, 100],
            round: 1,
            duration: 2200,
            easing: 'easeInOutQuad'
        })
        .add({
            targets: '.intro-line',
            width: '260px',
            duration: 900
        }, '-=1300')
        .add({
            targets: '.intro-text',
            opacity: [0, 1],
            duration: 700
        }, '-=1300');
    } else if (overlay) {
        overlay.style.display = 'none';
        document.body.classList.remove('intro-active');
        document.body.style.overflow = '';
        document.body.style.overflowY = '';
        initScrollObserver();
    }
});

function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                if (entry.target.querySelector('.count-up')) {
                    animateStats(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.04,
        rootMargin: '60px 0px 60px 0px'
    });

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
}

function animateStats(el) {
    const counters = el.querySelectorAll('.count-up');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target')) || 0;
        if (typeof anime !== 'undefined') {
            anime({
                targets: counter,
                innerHTML: [0, target],
                round: 1,
                easing: 'easeOutExpo',
                duration: 2200
            });
        } else {
            counter.innerHTML = target;
        }
    });
}

// Fail-safe unlock for intro overlay if animations fail
setTimeout(() => {
    const overlay = document.getElementById('intro-overlay');
    if (overlay && overlay.style.display !== 'none') {
        overlay.style.opacity = 0;
        setTimeout(() => { overlay.style.display = 'none'; }, 400);
        document.body.classList.remove('intro-active');
        document.body.style.overflow = '';
        document.body.style.overflowY = '';
    }
}, 3800);