// --- FONDO ANIMADO ---
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let w, h, particles = [];

function initCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 5; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 300 + 200,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            c: Math.random() > 0.5 ? '#0ea5e9' : '#6366f1'
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -p.r) p.x = w + p.r;
        if (p.x > w + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = h + p.r;
        if (p.y > h + p.r) p.y = -p.r;

        let g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, p.c + '15');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(draw);
}

// --- RELOJ EN TIEMPO REAL ---
function updateTime() {
    const timeEl = document.getElementById('local-time');
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString('es-ES', { hour12: false });
}

// --- REVELADO EN SCROLL ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('active');
    });
}, { threshold: 0.1 });

// --- INICIALIZACIÓN ---
window.addEventListener('resize', initCanvas);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

initCanvas();
draw();
setInterval(updateTime, 1000);
updateTime();