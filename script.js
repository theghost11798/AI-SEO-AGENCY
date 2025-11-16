// CSS-based 3D Background with floating shapes
function createFloatingShapes() {
    const bgCanvas = document.getElementById('bg-canvas');
    const shapes = ['circle', 'square', 'triangle', 'hexagon'];
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#3b82f6'];
    
    for (let i = 0; i < 30; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 100 + 50;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 5;
        
        shape.style.cssText = `
            position: absolute;
            left: ${left}%;
            top: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            opacity: ${Math.random() * 0.3 + 0.1};
            border-radius: ${shapeType === 'circle' ? '50%' : shapeType === 'triangle' ? '0' : '10%'};
            animation: float-shape ${animationDuration}s ease-in-out infinite;
            animation-delay: ${animationDelay}s;
            transform-style: preserve-3d;
            transform: rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg);
        `;
        
        if (shapeType === 'triangle') {
            shape.style.width = '0';
            shape.style.height = '0';
            shape.style.background = 'transparent';
            shape.style.borderLeft = `${size/2}px solid transparent`;
            shape.style.borderRight = `${size/2}px solid transparent`;
            shape.style.borderBottom = `${size}px solid ${color}`;
        }
        
        bgCanvas.appendChild(shape);
    }
}

// Add floating shape animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .floating-shape {
        transition: transform 0.3s ease;
    }
    
    @keyframes float-shape {
        0%, 100% {
            transform: translateY(0) translateX(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        }
        25% {
            transform: translateY(-30px) translateX(20px) rotateX(90deg) rotateY(90deg) rotateZ(45deg);
        }
        50% {
            transform: translateY(-50px) translateX(-20px) rotateX(180deg) rotateY(180deg) rotateZ(90deg);
        }
        75% {
            transform: translateY(-30px) translateX(30px) rotateX(270deg) rotateY(270deg) rotateZ(135deg);
        }
    }
`;
document.head.appendChild(style);

// Initialize floating shapes
createFloatingShapes();

// Form Submission Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple form validation feedback
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Intersection Observer for fade-in animations
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

// Observe service cards and features
document.querySelectorAll('.service-card, .feature, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});
