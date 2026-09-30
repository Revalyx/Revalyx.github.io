const canvas = document.getElementById('canvas-bg');
const context = canvas?.getContext('2d');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const particles = [];
let canvasWidth = 0;
let canvasHeight = 0;
let animationFrame = 0;

function resizeCanvas() {
    if (!canvas || !context) return;
    cancelAnimationFrame(animationFrame);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth * pixelRatio;
    canvas.height = canvasHeight * pixelRatio;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    particles.length = 0;

    const count = Math.min(42, Math.floor(canvasWidth / 28));
    for (let index = 0; index < count; index += 1) {
        particles.push({
            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            radius: Math.random() > 0.88 ? 1.7 : 1
        });
    }
    drawNetwork(!reducedMotion.matches);
}

function drawNetwork(animate = true) {
    if (!context) return;
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    particles.forEach((particle, index) => {
        if (animate) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            if (particle.x < 0 || particle.x > canvasWidth) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvasHeight) particle.vy *= -1;
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = index % 9 === 0 ? 'rgba(255, 128, 103, 0.55)' : 'rgba(201, 243, 106, 0.42)';
        context.fill();

        for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
            const nextParticle = particles[nextIndex];
            const distance = Math.hypot(particle.x - nextParticle.x, particle.y - nextParticle.y);
            if (distance < 120) {
                context.beginPath();
                context.moveTo(particle.x, particle.y);
                context.lineTo(nextParticle.x, nextParticle.y);
                context.strokeStyle = `rgba(201, 243, 106, ${0.075 * (1 - distance / 120)})`;
                context.lineWidth = 1;
                context.stroke();
            }
        }
    });

    if (animate && !document.hidden) animationFrame = requestAnimationFrame(() => drawNetwork(true));
}

function updateTime() {
    const clock = document.getElementById('local-time');
    if (clock) clock.textContent = new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
}

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    });
}, { rootMargin: '-30% 0px -60% 0px' });

document.querySelectorAll('#about, #projects, #education').forEach(section => sectionObserver.observe(section));
window.addEventListener('resize', resizeCanvas, { passive: true });
document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(animationFrame);
    if (document.hidden) return;
    drawNetwork(!reducedMotion.matches);
});
reducedMotion.addEventListener('change', () => {
    cancelAnimationFrame(animationFrame);
    drawNetwork(!reducedMotion.matches);
});

resizeCanvas();
updateTime();
setInterval(updateTime, 30000);