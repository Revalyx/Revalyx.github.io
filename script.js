const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

let width, height, mouseX = 0, mouseY = 0;
let blobs = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

class Blob {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 250 + 250;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speed = Math.random() * 0.02 + 0.01;
        this.color = Math.random() > 0.5 ? '#38bdf8' : '#7f52ff';
    }
    draw() {
        ctx.beginPath();
        let grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        grad.addColorStop(0, this.color + '33');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    update() {
        // Sigue al mouse sutilmente
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        this.x += dx * this.speed;
        this.y += dy * this.speed;
    }
}

for(let i=0; i<6; i++) blobs.push(new Blob());

function animate() {
    ctx.clearRect(0,0, width, height);
    blobs.forEach(b => { b.update(); b.draw(); });
    requestAnimationFrame(animate);
}
animate();

// Reveal Logic
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));