const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

// Offscreen canvas for scanning names
const offscreenCanvas = document.createElement('canvas');
const offscreenCtx = offscreenCanvas.getContext('2d');

// Canvas Setup
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;
let nameCharIndex = 0;

// Global settings driving the simulation
const settings = {
    size: 8,
    speed: 3,
    spawnRate: 5,
    gravity: 0,
    colorTheme: 'rainbow',
    particleShape: 'circle',
    trailLength: 0.05,
    constellationMode: true,
    connectionDist: 100,
    interactionMode: 'flow'
};

// Preset configurations
const presets = {
    galaxy: {
        size: 8,
        speed: 3,
        spawnRate: 5,
        gravity: 0,
        colorTheme: 'rainbow',
        particleShape: 'circle',
        trailLength: 0.05,
        constellationMode: false,
        connectionDist: 100,
        interactionMode: 'flow'
    },
    constellation: {
        size: 4,
        speed: 1.2,
        spawnRate: 2,
        gravity: 0,
        colorTheme: 'mono',
        particleShape: 'circle',
        trailLength: 0.15,
        constellationMode: true,
        connectionDist: 120,
        interactionMode: 'flow'
    },
    vortex: {
        size: 10,
        speed: 4,
        spawnRate: 8,
        gravity: 0.02,
        colorTheme: 'cosmic',
        particleShape: 'star',
        trailLength: 0.03,
        constellationMode: false,
        connectionDist: 100,
        interactionMode: 'attract'
    }
};

// UI Element Selections
const elTogglePanel = document.getElementById('toggle-panel');
const elControlPanel = document.getElementById('controlPanel');
const elParticleSize = document.getElementById('particle-size');
const elParticleSpeed = document.getElementById('particle-speed');
const elSpawnRate = document.getElementById('spawn-rate');
const elGravity = document.getElementById('gravity');
const elColorTheme = document.getElementById('color-theme');
const elParticleShape = document.getElementById('particle-shape');
const elTrailLength = document.getElementById('trail-length');
const elConstellationMode = document.getElementById('constellation-mode');
const elConnectionDist = document.getElementById('connection-dist');
const elConnectionDistGroup = document.getElementById('connection-dist-group');
const elClearCanvas = document.getElementById('clear-canvas');

// Celebrations elements
const elCelebrateBtns = document.querySelectorAll('.celebrate-btn');
const elNameInput = document.getElementById('name-input');
const elBtnCelebrateName = document.getElementById('btn-celebrate-name');

// Value display labels
const lblSize = document.getElementById('size-val');
const lblSpeed = document.getElementById('speed-val');
const lblSpawn = document.getElementById('spawn-val');
const lblGravity = document.getElementById('gravity-val');
const lblTrail = document.getElementById('trail-val');
const lblDist = document.getElementById('dist-val');

// Sync settings values to DOM elements
function updateUIDisplay() {
    elParticleSize.value = settings.size;
    lblSize.textContent = settings.size;

    elParticleSpeed.value = settings.speed;
    lblSpeed.textContent = settings.speed;

    elSpawnRate.value = settings.spawnRate;
    lblSpawn.textContent = settings.spawnRate;

    elGravity.value = settings.gravity;
    lblGravity.textContent = settings.gravity;

    elColorTheme.value = settings.colorTheme;
    elParticleShape.value = settings.particleShape;

    elTrailLength.value = settings.trailLength;
    lblTrail.textContent = settings.trailLength;

    elConstellationMode.checked = settings.constellationMode;
    elConnectionDist.value = settings.connectionDist;
    lblDist.textContent = settings.connectionDist;

    if (settings.constellationMode) {
        elConnectionDistGroup.style.display = 'block';
    } else {
        elConnectionDistGroup.style.display = 'none';
    }

    // Update active state in preset buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Update active interaction mode button
    document.querySelectorAll('.mode-btn').forEach(btn => {
        if (btn.getAttribute('data-mode') === settings.interactionMode) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Mouse coordinates
const mouse = {
    x: undefined,
    y: undefined
};

// Event Listeners: Resize
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Event Listeners: Interaction triggers
canvas.addEventListener('click', function(event){
    // Ignore clicks if clicking inside control dashboard
    if (event.clientX > window.innerWidth - 340 && elControlPanel.classList.contains('hidden') === false) {
        return;
    }
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    
    // Clicking spawns double the normal particles for explosion impact
    const count = settings.spawnRate * 3;
    for (let i = 0; i < count; i++){
        particlesArray.push(new Particle());
    }
});

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    
    for (let i = 0; i < settings.spawnRate; i++){
        particlesArray.push(new Particle());
    }
});

canvas.addEventListener('mouseleave', function(){
    mouse.x = undefined;
    mouse.y = undefined;
});

// Touch controls for mobile support
canvas.addEventListener('touchstart', function(event) {
    if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
        const count = settings.spawnRate * 2;
        for (let i = 0; i < count; i++) {
            particlesArray.push(new Particle());
        }
    }
});

canvas.addEventListener('touchmove', function(event) {
    if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
        if (event.cancelable) event.preventDefault();
        
        for (let i = 0; i < settings.spawnRate; i++) {
            particlesArray.push(new Particle());
        }
    }
}, { passive: false });

canvas.addEventListener('touchend', function() {
    mouse.x = undefined;
    mouse.y = undefined;
});

// UI Control Dashboard Logic
elTogglePanel.addEventListener('click', () => {
    elControlPanel.classList.toggle('hidden');
    elTogglePanel.classList.toggle('active');
});

elParticleSize.addEventListener('input', (e) => {
    settings.size = parseFloat(e.target.value);
    lblSize.textContent = settings.size;
});

elParticleSpeed.addEventListener('input', (e) => {
    settings.speed = parseFloat(e.target.value);
    lblSpeed.textContent = settings.speed;
});

elSpawnRate.addEventListener('input', (e) => {
    settings.spawnRate = parseInt(e.target.value);
    lblSpawn.textContent = settings.spawnRate;
});

elGravity.addEventListener('input', (e) => {
    settings.gravity = parseFloat(e.target.value);
    lblGravity.textContent = settings.gravity;
});

elColorTheme.addEventListener('change', (e) => {
    settings.colorTheme = e.target.value;
});

elParticleShape.addEventListener('change', (e) => {
    settings.particleShape = e.target.value;
});

elTrailLength.addEventListener('input', (e) => {
    settings.trailLength = parseFloat(e.target.value);
    lblTrail.textContent = settings.trailLength;
});

elConstellationMode.addEventListener('change', (e) => {
    settings.constellationMode = e.target.checked;
    elConnectionDistGroup.style.display = settings.constellationMode ? 'block' : 'none';
});

elConnectionDist.addEventListener('input', (e) => {
    settings.connectionDist = parseFloat(e.target.value);
    lblDist.textContent = settings.connectionDist;
});

elClearCanvas.addEventListener('click', () => {
    particlesArray.length = 0;
});

// Preset selection handlers
document.querySelectorAll('.preset-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        const presetKey = e.target.getAttribute('data-preset');
        if (presets[presetKey]) {
            Object.assign(settings, presets[presetKey]);
            updateUIDisplay();
        }
    });
});

// Interaction Mode selection handlers
document.querySelectorAll('.mode-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('.mode-btn');
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        targetBtn.classList.add('active');
        
        settings.interactionMode = targetBtn.getAttribute('data-mode');
    });
});

// Celebration Trigger Listeners
elCelebrateBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        const btn = e.target.closest('.celebrate-btn');
        const celebType = btn.getAttribute('data-celeb');
        
        if (celebType === 'fireworks') {
            triggerFireworks();
        } else if (celebType === 'confetti') {
            triggerConfetti();
        } else if (celebType === 'supernova') {
            triggerSupernova();
        }
    });
});

elBtnCelebrateName.addEventListener('click', celebrateName);
elNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        celebrateName();
    }
});

// Helper: Draw star shape
function drawStar(x, y, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let cx = x;
    let cy = y;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
        cx = x + Math.cos(rot) * outerRadius;
        cy = y + Math.sin(rot) * outerRadius;
        ctx.lineTo(cx, cy);
        rot += step;

        cx = x + Math.cos(rot) * innerRadius;
        cy = y + Math.sin(rot) * innerRadius;
        ctx.lineTo(cx, cy);
        rot += step;
    }
    ctx.lineTo(x, y - outerRadius);
    ctx.closePath();
    ctx.fill();
}

// Helper: Draw heart shape
function drawHeart(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y - size / 4);
    // Left curve
    ctx.bezierCurveTo(x + size / 2, y - size, x + size * 1.2, y - size / 3, x, y + size);
    // Right curve
    ctx.bezierCurveTo(x - size * 1.2, y - size / 3, x - size / 2, y - size, x, y - size / 4);
    ctx.closePath();
    ctx.fill();
}

// Helper: Draw cross shape
function drawCross(x, y, size) {
    const thickness = size * 0.3;
    ctx.beginPath();
    // Horizontal bar
    ctx.fillRect(x - size, y - thickness, size * 2, thickness * 2);
    // Vertical bar
    ctx.fillRect(x - thickness, y - size, thickness * 2, size * 2);
}

// Particle Class
class Particle {
    constructor(){
        this.x = mouse.x !== undefined ? mouse.x : Math.random() * canvas.width;
        this.y = mouse.y !== undefined ? mouse.y : Math.random() * canvas.height;
        
        // Random velocity scaled by the user settings speed
        const angle = Math.random() * Math.PI * 2;
        const velocity = (Math.random() * 0.8 + 0.2) * settings.speed;
        this.speedX = Math.cos(angle) * velocity;
        this.speedY = Math.sin(angle) * velocity;
        
        this.baseSize = Math.random() * settings.size + 1;
        this.size = this.baseSize;
        this.hueVal = hue;
        
        // Color override flags for special actions (Confetti/Fireworks)
        this.color = this.generateColor();
        this.shapeOverride = undefined;
        this.gravityOverride = undefined;
        
        // Sequential text trails
        const currentName = elNameInput ? elNameInput.value.trim() : '';
        if (currentName) {
            this.textChar = currentName[nameCharIndex % currentName.length];
            nameCharIndex = (nameCharIndex + 1) % currentName.length;
            this.isTextParticle = true;
        } else {
            this.textChar = '';
            this.isTextParticle = false;
        }
    }
    
    generateColor() {
        switch(settings.colorTheme) {
            case 'rainbow':
                return `hsl(${this.hueVal}, 100%, 55%)`;
            case 'aurora':
                const auroraHue = (this.hueVal % 60) + 130; // Green/Teal
                return `hsl(${auroraHue}, 100%, 50%)`;
            case 'cosmic':
                const cosmicHue = (this.hueVal % 60) + 270; // Purple/Pink
                return `hsl(${cosmicHue}, 100%, 55%)`;
            case 'lava':
                const lavaHue = (this.hueVal % 45); // Red/Orange/Yellow
                return `hsl(${lavaHue}, 100%, 50%)`;
            case 'mono':
                return `hsl(190, 100%, 50%)`; // Clean Neon Cyan
            case 'cyberpunk':
                const cpHue = Math.random() < 0.5 ? 325 : 190; // Neon Pink vs Electric Cyan
                return `hsl(${cpHue}, 100%, 55%)`;
            case 'forest':
                const forestHue = (this.hueVal % 50) + 90; // Forest Greens
                return `hsl(${forestHue}, 100%, 35%)`;
            case 'monochrome':
                const grayLight = Math.floor(Math.random() * 50) + 200; // Grayscale/Whites
                return `rgb(${grayLight}, ${grayLight}, ${grayLight})`;
            default:
                return `hsl(${this.hueVal}, 100%, 55%)`;
        }
    }
    
    update(){
        // Handle Mouse Attraction / Repulsion physics
        if (mouse.x !== undefined && mouse.y !== undefined) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (settings.interactionMode === 'attract' && distance < 400 && distance > 10) {
                const force = (400 - distance) / 400;
                this.speedX += (dx / distance) * force * 0.25;
                this.speedY += (dy / distance) * force * 0.25;
            }
        }
        
        // Apply physics gravity override or standard settings gravity
        const currentGravity = this.gravityOverride !== undefined ? this.gravityOverride : settings.gravity;
        this.speedY += currentGravity;
        
        // Drag/friction (stops particles flying away in orbit modes)
        this.speedX *= 0.985;
        this.speedY *= 0.985;
        
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Shrink particle size over time
        if (this.size > 0.15) {
            this.size -= 0.08;
        }
    }
    
    draw(){
        ctx.fillStyle = this.color;
        
        if (this.isTextParticle && !this.shapeOverride) {
            ctx.font = `bold ${Math.max(12, this.size * 2.2)}px "Space Grotesk"`;
            ctx.fillText(this.textChar, this.x, this.y);
            return;
        }

        const currentShape = this.shapeOverride || settings.particleShape;
        
        switch (currentShape) {
            case 'circle':
                ctx.beginPath();
                ctx.arc(this.x, this.y, Math.max(0.1, this.size), 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'square':
                const sqSize = Math.max(0.1, this.size);
                ctx.fillRect(this.x - sqSize, this.y - sqSize, sqSize * 2, sqSize * 2);
                break;
                
            case 'star':
                const outerRad = Math.max(0.1, this.size * 1.5);
                const innerRad = outerRad / 2;
                drawStar(this.x, this.y, 5, outerRad, innerRad);
                break;
                
            case 'triangle':
                const triSize = Math.max(0.1, this.size * 1.3);
                ctx.beginPath();
                ctx.moveTo(this.x, this.y - triSize);
                ctx.lineTo(this.x - triSize, this.y + triSize);
                ctx.lineTo(this.x + triSize, this.y + triSize);
                ctx.closePath();
                ctx.fill();
                break;

            case 'heart':
                drawHeart(this.x, this.y, Math.max(0.1, this.size * 1.2));
                break;

            case 'ring':
                const rSize = Math.max(0.1, this.size);
                ctx.beginPath();
                ctx.arc(this.x, this.y, rSize, 0, Math.PI * 2);
                ctx.lineWidth = Math.max(0.5, rSize * 0.35);
                ctx.strokeStyle = this.color;
                ctx.stroke();
                break;

            case 'cross':
                drawCross(this.x, this.y, Math.max(0.1, this.size * 1.1));
                break;
        }
    }
}

// Rocket Class (For Fireworks launch)
class Rocket {
    constructor(x, y, targetY) {
        this.x = x;
        this.y = y;
        this.targetY = targetY;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = -(Math.random() * 4 + 10);
        this.size = 5;
        this.color = '#ffffff';
        this.isRocket = true;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Rocket tail smoke trail
        if (Math.random() < 0.5) {
            const p = new Particle();
            p.x = this.x;
            p.y = this.y;
            p.speedX = Math.random() * 1 - 0.5;
            p.speedY = Math.random() * 1 - 0.5;
            p.size = 3;
            p.color = `hsl(${(hue + 20) % 360}, 100%, 60%)`;
            particlesArray.push(p);
        }

        if (this.y <= this.targetY) {
            this.explode();
            this.size = 0; // mark rocket for removal
        }
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset canvas shadow
    }
    
    explode() {
        const count = 60;
        const colorHue = Math.random() * 360;
        const customShape = Math.random() < 0.5 ? 'circle' : 'star';
        
        for (let i = 0; i < count; i++) {
            const p = new Particle();
            p.x = this.x;
            p.y = this.y;
            const angle = (i / count) * Math.PI * 2;
            const speed = Math.random() * 5 + 3;
            p.speedX = Math.cos(angle) * speed;
            p.speedY = Math.sin(angle) * speed;
            p.size = Math.random() * 4 + 3;
            p.baseSize = p.size;
            p.color = `hsl(${colorHue}, 100%, 60%)`;
            p.shapeOverride = customShape;
            p.gravityOverride = 0.05; // explosion pulls down gently
            particlesArray.push(p);
        }
    }
}

// Celebration: Fireworks
function triggerFireworks() {
    const launchPoints = 4;
    for (let i = 0; i < launchPoints; i++) {
        const x = Math.random() * (canvas.width - 250) + 125;
        const targetY = Math.random() * (canvas.height * 0.45) + canvas.height * 0.1;
        particlesArray.push(new Rocket(x, canvas.height, targetY));
    }
}

// Celebration: Confetti Storm
function triggerConfetti() {
    const count = 120;
    const shapes = ['square', 'triangle', 'cross', 'circle'];
    for (let i = 0; i < count; i++) {
        const p = new Particle();
        p.x = Math.random() * canvas.width;
        p.y = -20; // spawn above screen
        p.speedX = Math.random() * 4 - 2;
        p.speedY = Math.random() * 5 + 2;
        p.size = Math.random() * 7 + 4;
        p.baseSize = p.size;
        p.color = `hsl(${Math.random() * 360}, 100%, 55%)`;
        p.shapeOverride = shapes[Math.floor(Math.random() * shapes.length)];
        p.gravityOverride = 0.06;
        particlesArray.push(p);
    }
}

// Celebration: Supernova
function triggerSupernova() {
    const count = 180;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const colors = ['#00ffff', '#ff007f', '#8a2be2', '#ffeb3b', '#4caf50'];
    const customShape = Math.random() < 0.5 ? 'ring' : 'heart';
    
    for (let i = 0; i < count; i++) {
        const p = new Particle();
        p.x = cx;
        p.y = cy;
        const angle = (i / count) * Math.PI * 2;
        const speed = (Math.random() * 3 + 5); // Fast shockwave expansion
        p.speedX = Math.cos(angle) * speed;
        p.speedY = Math.sin(angle) * speed;
        p.size = Math.random() * 5 + 4;
        p.baseSize = p.size;
        p.color = colors[Math.floor(Math.random() * colors.length)];
        p.shapeOverride = customShape;
        particlesArray.push(p);
    }
}

// Celebration: Spell Name out in particles
function celebrateName() {
    const name = elNameInput.value.trim();
    if (!name) return;
    
    // Setup offscreen canvas bounds
    const boxWidth = 800;
    const boxHeight = 160;
    offscreenCanvas.width = boxWidth;
    offscreenCanvas.height = boxHeight;
    
    // Clear and draw bold text
    offscreenCtx.fillStyle = '#000000';
    offscreenCtx.fillRect(0, 0, boxWidth, boxHeight);
    offscreenCtx.fillStyle = '#ffffff';
    offscreenCtx.font = 'bold 85px "Space Grotesk"';
    offscreenCtx.textAlign = 'center';
    offscreenCtx.textBaseline = 'middle';
    offscreenCtx.fillText(name, boxWidth / 2, boxHeight / 2);
    
    // Scan pixel coordinates
    const imgData = offscreenCtx.getImageData(0, 0, boxWidth, boxHeight);
    const pixels = imgData.data;
    const step = 5; // density spacing
    
    // Clear the active canvas to make name celebration pop
    particlesArray.length = 0;
    
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#ff007f', '#39ff14'];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];
    
    for (let y = 0; y < boxHeight; y += step) {
        for (let x = 0; x < boxWidth; x += step) {
            const index = (y * boxWidth + x) * 4;
            const alpha = pixels[index + 3];
            const red = pixels[index];
            
            // If pixel is lit (white text overlay)
            if (alpha > 128 && red > 150) {
                // Centered coordinates on main canvas
                const canvasX = (canvas.width / 2 - boxWidth / 2) + x;
                const canvasY = (canvas.height / 2 - boxHeight / 2) + y;
                
                // Spawn name particle
                const p = new Particle();
                p.x = canvasX;
                p.y = canvasY;
                
                // Stardust floating dynamics
                p.speedX = Math.random() * 0.5 - 0.25;
                p.speedY = Math.random() * 0.5 - 0.25;
                p.size = Math.random() * 3 + 2;
                p.baseSize = p.size;
                p.color = chosenColor;
                p.shapeOverride = 'circle';
                p.gravityOverride = 0; // Float weightlessly initially
                particlesArray.push(p);
            }
        }
    }
    
    // Trigger supporting fireworks explosion around the name
    setTimeout(() => {
        triggerFireworks();
    }, 400);
}

// Draw network lines (Constellation Mode)
function drawConnections() {
    if (!settings.constellationMode) return;
    const len = particlesArray.length;
    
    // Optimize performance: don't loop if array is excessively large
    if (len > 350) return;
    
    for (let a = 0; a < len; a++) {
        // Skip connection checking for rockets
        if (particlesArray[a].isRocket) continue;
        
        for (let b = a + 1; b < len; b++) {
            if (particlesArray[b].isRocket) continue;
            
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < settings.connectionDist) {
                // Calculate line opacity based on distance and particle sizes
                const sizeFactor = Math.min(particlesArray[a].size, particlesArray[b].size) / settings.size;
                const distanceFactor = 1 - (distance / settings.connectionDist);
                const opacity = distanceFactor * sizeFactor * 0.45;
                
                // Draw connecting line
                ctx.beginPath();
                ctx.lineWidth = 0.8;
                // Extract clean hsl color values to build HSLA strokeStyle
                let baseColor = particlesArray[a].color;
                
                if (baseColor.startsWith('hsl')) {
                    ctx.strokeStyle = baseColor.replace(')', `, ${opacity})`).replace('hsl', 'hsla');
                } else if (baseColor.startsWith('rgb')) {
                    ctx.strokeStyle = baseColor.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
                } else {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                }
                
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        
        // Remove particles when too small
        if (particlesArray[i].size <= 0.2){
            particlesArray.splice(i, 1); 
            i--;
        }
    }
    
    // Draw constellation lines
    drawConnections();
}

function animate(){
    // Draw trail background overlay
    ctx.fillStyle = `rgba(2, 2, 5, ${settings.trailLength})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    handleParticles();
    
    // Advance global color hue wheel
    hue += 1.5;
    if (hue >= 360) hue = 0;
    
    requestAnimationFrame(animate);
}

// Initial triggers
updateUIDisplay();
animate();



