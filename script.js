// Canvas-based 3D Background Animation (No external dependencies)
function initCanvasBackground() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle system
    const particles = [];
    const particleCount = 150;
    
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.speed = 0.5 + Math.random() * 1;
            this.radius = 1 + Math.random() * 2;
            this.opacity = Math.random() * 0.5 + 0.3;
            const hue = 180 + Math.random() * 60; // Cyan to blue range
            this.color = `hsla(${hue}, 100%, 60%, ${this.opacity})`;
        }
        
        update() {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.reset();
            }
            
            // Subtle horizontal drift
            this.x += Math.sin(this.y * 0.01) * 0.5;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            
            // Add glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Floating geometric shapes
    const shapes = [];
    const shapeCount = 8;
    
    class FloatingShape {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = 30 + Math.random() * 60;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            this.type = Math.floor(Math.random() * 3); // 0: cube, 1: diamond, 2: hexagon
            this.opacity = 0.1 + Math.random() * 0.15;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            const hue = 180 + Math.random() * 80;
            this.color = `hsla(${hue}, 70%, 50%, ${this.opacity})`;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotationSpeed;
            
            // Wrap around screen
            if (this.x < -this.size) this.x = canvas.width + this.size;
            if (this.x > canvas.width + this.size) this.x = -this.size;
            if (this.y < -this.size) this.y = canvas.height + this.size;
            if (this.y > canvas.height + this.size) this.y = -this.size;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            
            if (this.type === 0) {
                // Cube (3D effect with perspective)
                this.drawCube();
            } else if (this.type === 1) {
                // Diamond
                this.drawDiamond();
            } else {
                // Hexagon
                this.drawHexagon();
            }
            
            ctx.restore();
        }
        
        drawCube() {
            const s = this.size / 2;
            // Front face
            ctx.beginPath();
            ctx.rect(-s, -s, this.size, this.size);
            ctx.stroke();
            
            // 3D depth lines
            ctx.beginPath();
            ctx.moveTo(-s, -s);
            ctx.lineTo(-s * 0.7, -s * 1.3);
            ctx.moveTo(s, -s);
            ctx.lineTo(s * 1.3, -s * 1.3);
            ctx.moveTo(s, s);
            ctx.lineTo(s * 1.3, s * 0.7);
            ctx.moveTo(-s, s);
            ctx.lineTo(-s * 0.7, s * 0.7);
            ctx.stroke();
            
            // Back face
            ctx.beginPath();
            ctx.moveTo(-s * 0.7, -s * 1.3);
            ctx.lineTo(s * 1.3, -s * 1.3);
            ctx.lineTo(s * 1.3, s * 0.7);
            ctx.lineTo(-s * 0.7, s * 0.7);
            ctx.closePath();
            ctx.stroke();
        }
        
        drawDiamond() {
            const s = this.size / 2;
            ctx.beginPath();
            ctx.moveTo(0, -s);
            ctx.lineTo(s, 0);
            ctx.lineTo(0, s);
            ctx.lineTo(-s, 0);
            ctx.closePath();
            ctx.stroke();
            
            // Inner diamond
            ctx.beginPath();
            ctx.moveTo(0, -s * 0.5);
            ctx.lineTo(s * 0.5, 0);
            ctx.lineTo(0, s * 0.5);
            ctx.lineTo(-s * 0.5, 0);
            ctx.closePath();
            ctx.stroke();
        }
        
        drawHexagon() {
            const s = this.size / 2;
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const x = s * Math.cos(angle);
                const y = s * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
        }
    }
    
    // Initialize shapes
    for (let i = 0; i < shapeCount; i++) {
        shapes.push(new FloatingShape());
    }
    
    // Mouse interaction
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop
    function animate() {
        // Create trail effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Update and draw shapes with mouse interaction
        shapes.forEach(shape => {
            // Mouse repulsion
            const dx = shape.x - mouseX;
            const dy = shape.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 200) {
                const force = (200 - dist) / 200;
                shape.x += (dx / dist) * force * 2;
                shape.y += (dy / dist) * force * 2;
            }
            
            shape.update();
            shape.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// CSS-based 3D Cube for About Section
function initAboutCube() {
    const container = document.getElementById('cube-container');
    if (!container) return;
    
    // Create 3D cube with CSS
    container.innerHTML = `
        <div class="cube-scene">
            <div class="cube">
                <div class="cube-face front"></div>
                <div class="cube-face back"></div>
                <div class="cube-face right"></div>
                <div class="cube-face left"></div>
                <div class="cube-face top"></div>
                <div class="cube-face bottom"></div>
            </div>
        </div>
    `;
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        hamburger.classList.toggle('active');
    });
}

// Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            website: document.getElementById('website').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        // For now, we'll just show an alert
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-card, .stat, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCanvasBackground();
    
    // Delay cube initialization to ensure container is rendered
    setTimeout(() => {
        initAboutCube();
    }, 100);
});

// Prevent scroll jump on page load
window.addEventListener('load', () => {
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }
});
