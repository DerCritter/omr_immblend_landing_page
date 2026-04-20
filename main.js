// Cursor Follower
const follower = document.getElementById('cursor-follower');
const dot = document.getElementById('cursor-dot');

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    follower.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, { duration: 600, fill: 'forwards' });
    dot.style.left = `${clientX}px`;
    dot.style.top = `${clientY}px`;
});

// Particle System
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 1) * 0.8;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < 0) this.reset();
    }
    draw() {
        ctx.fillStyle = `rgba(173, 175, 215, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();

// Cryptic Data Generator
function updateCrypticData() {
    const labels = document.querySelectorAll('.hologram-data');
    labels.forEach(label => {
        // Find random numbers/hex in text and replace them
        let text = label.innerHTML;
        text = text.replace(/\d+\.\d+/g, () => (Math.random() * 100).toFixed(2));
        text = text.replace(/0\.\d+ms/g, () => (Math.random() * 0.5).toFixed(2) + 'ms');
        // Actually, let's just update specific spans if we had them, 
        // but simple random strings work for sci-fi atmosphere
    });
}
setInterval(updateCrypticData, 2000);

// 3D Model Interaction
document.querySelectorAll('.model-container').forEach(container => {
    const viewer = container.querySelector('model-viewer');
    
    // Rotation speed change on hover
    container.addEventListener('mouseenter', () => {
        viewer.setAttribute('rotation-per-second', '90deg');
    });
    container.addEventListener('mouseleave', () => {
        viewer.setAttribute('rotation-per-second', '30deg');
    });

    // Neutral click alert (as requested: show window but don't navigate)
    container.addEventListener('click', () => {
        alert("Sie sind im Begriff, diese Website zu verlassen. (Links werden in Kürze hinzugefügt)");
    });
});

// Project Buttons Navigation (direct access)
// No JS confirmation required for buttons as per user request.

// Form Handling
const contactForm = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');
const submitBtn = document.querySelector('.submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.innerText = 'SENDING...';
        
        // Mock submission
        setTimeout(() => {
            contactForm.reset();
            submitBtn.style.display = 'none';
            feedback.style.display = 'block';
            setTimeout(() => {
                submitBtn.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.innerText = 'SEND MESSAGE';
                feedback.style.display = 'none';
            }, 3000);
        }, 1500);
    });
}

