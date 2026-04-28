// --- 1. Fondo de Lluvia de Datos "Cyberpunk" (Matrix sutil) ---
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = "01101011001KotlinUnityLaravelDAMDAM";
const charArray = characters.split('');
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

// Una gota por columna
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    // Fondo negro translúcido para el efecto de rastro
    ctx.fillStyle = 'rgba(14, 18, 24, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Color del texto (azul eléctrico muy suave)
    ctx.fillStyle = 'rgba(88, 166, 255, 0.2)'; 
    ctx.font = fontSize + 'px monospace';

    // Dibujar los caracteres
    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Resetear la gota cuando llega al final o aleatoriamente
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Ejecutar la animación cada 35ms (puedes ajustarlo)
setInterval(drawMatrix, 35);

// Redimensionar canvas si cambia la ventana
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// --- 2. Efecto de Revelado en Scroll ---
function reveal() {
    const reveals = document.querySelectorAll(".reveal");

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150; // Pixeles antes de que aparezca

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Ejecutar una vez al cargar por si hay elementos visibles
reveal();