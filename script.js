// Fondo de Partículas Suaves
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let atoms = [];

class Atom {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = '#38bdf8';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.radius > 0.1) this.radius -= 0.01;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function handleAtoms() {
    for (let i = 0; i < atoms.length; i++) {
        atoms[i].update();
        atoms[i].draw();
        if (atoms[i].radius <= 0.3) {
            atoms.splice(i, 1);
            i--;
        }
    }
}

window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 2; i++) {
        atoms.push(new Atom(e.x, e.y));
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleAtoms();
    requestAnimationFrame(animate);
}
animate();

// Reveal on Scroll
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));