// --- FONDO DE AURORAS ---
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let w, h, blobs = [];

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    blobs = [];
    for(let i=0; i<4; i++) {
        blobs.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 300 + 300,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            color: i % 2 === 0 ? '#38bdf8' : '#6366f1'
        });
    }
}

function render() {
    ctx.clearRect(0, 0, w, h);
    blobs.forEach(b => {
        b.x += b.vx; b.y += b.vy;
        if(b.x < -b.r) b.x = w + b.r; if(b.x > w + b.r) b.x = -b.r;
        if(b.y < -b.r) b.y = h + b.r; if(b.y > h + b.r) b.y = -b.r;

        let g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, b.color + '15');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(render);
}

// --- RELOJ Y REVELADO ---
function updateTime() {
    const el = document.getElementById('local-time');
    if(el) el.textContent = new Date().toLocaleTimeString('es-ES', { hour12: false });
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
}, { threshold: 0.1 });

window.addEventListener('resize', init);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

init();
render();
setInterval(updateTime, 1000);
updateTime();