// --- CONFIGURACIÓN DEL CANVAS (AURORAS) ---
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let w, h, particles = [];

function initCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    // Creamos 5 manchas de color grandes y lentas
    for (let i = 0; i < 5; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 400 + 300,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            color: i % 2 === 0 ? '#38bdf8' : '#6366f1'
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Rebote suave en los bordes
        if (p.x < -p.r) p.x = w + p.r;
        if (p.x > w + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = h + p.r;
        if (p.y > h + p.r) p.y = -p.r;

        let gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        gradient.addColorStop(0, p.color + '15'); // Opacidad baja para el blur
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animate);
}

// --- RELOJ EN TIEMPO REAL ---
function updateClock() {
    const clockEl = document.getElementById('local-time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}:${seconds}`;
}

// --- REVELADO AL HACER SCROLL ---
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// --- ARRANQUE ---
window.addEventListener('resize', initCanvas);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

initCanvas();
animate();
setInterval(updateClock, 1000);
updateClock();

// Efecto sutil de movimiento en las cards con el ratón (opcional)
document.querySelectorAll('.bento-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});