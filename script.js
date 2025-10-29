// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initMatrixRain();
    initCustomCursor();
    initNavigation();
    initTypewriter();
    initScrollAnimations();
    initStatsCounter();
    initGlitchEffect();
    initParallax();
    initEasterEggs();
});

// ==================== TERMINAL LOADER ====================
function initLoader() {
    const loader = document.querySelector('.terminal-loader');
    
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2500);
}

// ==================== MATRIX RAIN BACKGROUND ====================
function initMatrixRain() {
    const canvas = document.getElementById('matrix-rain');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-={}[]|;:,.<>?/~';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00f3ff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            ctx.fillText(char, x, y);
            
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 50);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ==================== CUSTOM CURSOR ====================
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Cursor interaction with clickable elements
    const clickables = document.querySelectorAll('a, button, .nav-link, .cyber-button, .skill-orb, .contact-card');
    
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = '#ff00e5';
            follower.style.background = '#ff00e5';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = '#00f3ff';
            follower.style.background = '#00f3ff';
        });
    });
}

// ==================== NAVIGATION ====================
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Active section highlighting
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll with offset
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== TYPEWRITER EFFECT ====================
function initTypewriter() {
    const typewriterEl = document.querySelector('.typewriter');
    const texts = [
        'Desarrollador Full-Stack',
        'Estudiante DAM',
        'Tech Enthusiast',
        'Problem Solver',
        'Code Creator'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterEl.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterEl.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 3000);
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger stats counter animation
                if (entry.target.classList.contains('stat-card')) {
                    animateStatValue(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.section-title, .about-card, .stat-card, .timeline-item, .skill-category'
    );
    
    animatedElements.forEach(el => observer.observe(el));
}

// ==================== STATS COUNTER ====================
function initStatsCounter() {
    // Will be triggered by scroll animation
}

function animateStatValue(statCard) {
    const valueEl = statCard.querySelector('.stat-value');
    const target = parseInt(valueEl.getAttribute('data-target'));
    
    if (isNaN(target) || valueEl.textContent === '∞') return;
    
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const stepTime = duration / 50;
    
    const counter = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            valueEl.textContent = target;
            clearInterval(counter);
        } else {
            valueEl.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ==================== GLITCH EFFECT ====================
function initGlitchEffect() {
    const glitchOverlay = document.querySelector('.glitch-overlay');
    
    setInterval(() => {
        glitchOverlay.style.opacity = Math.random() > 0.95 ? '0.2' : '0';
        
        setTimeout(() => {
            glitchOverlay.style.opacity = '0';
        }, 100);
    }, 3000);
    
    // Random glitch on title
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    glitchTexts.forEach(el => {
        setInterval(() => {
            if (Math.random() > 0.9) {
                el.style.animation = 'none';
                setTimeout(() => {
                    el.style.animation = 'glitch 0.3s';
                }, 10);
            }
        }, 5000);
    });
}

// ==================== PARALLAX EFFECT ====================
function initParallax() {
    const hero = document.querySelector('.hero-section');
    const hologramCard = document.querySelector('.hologram-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        if (hologramCard && scrolled < window.innerHeight) {
            hologramCard.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Mousemove parallax
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        if (hologramCard) {
            hologramCard.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
}

// ==================== SKILL ORBS INTERACTION ====================
const skillOrbs = document.querySelectorAll('.skill-orb');

skillOrbs.forEach(orb => {
    orb.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-20px) scale(1.1)';
        const ring = this.querySelector('.orb-ring');
        ring.style.animation = 'none';
        ring.style.transform = 'translate(-50%, -50%) scale(1.3)';
        ring.style.borderColor = '#ff00e5';
        
        // Create particles
        createParticles(this);
    });
    
    orb.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        const ring = this.querySelector('.orb-ring');
        ring.style.animation = 'ringPulse 2s ease-in-out infinite';
        ring.style.borderColor = '#00f3ff';
    });
    
    // Click effect
    orb.addEventListener('click', function() {
        const label = this.querySelector('.orb-label');
        label.style.animation = 'none';
        setTimeout(() => {
            label.style.animation = 'glitch 0.5s';
        }, 10);
    });
});

// ==================== PARTICLE CREATION ====================
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#00f3ff';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.boxShadow = '0 0 10px #00f3ff';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 10;
        const velocity = 3;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = 0;
        let posY = 0;
        let opacity = 1;
        
        function animateParticle() {
            posX += vx;
            posY += vy;
            opacity -= 0.02;
            
            particle.style.transform = `translate(${posX}px, ${posY}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }
        
        animateParticle();
    }
}

// ==================== CYBER BUTTONS EFFECT ====================
const cyberButtons = document.querySelectorAll('.cyber-button');

cyberButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'glitch 0.3s';
        }, 10);
    });
    
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        
        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.width = '300px';
            ripple.style.height = '300px';
            ripple.style.opacity = '0';
            ripple.style.transition = 'all 0.6s';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ==================== TIMELINE INTERACTION ====================
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
    
    item.addEventListener('mouseenter', function() {
        const marker = this.querySelector('.timeline-marker');
        marker.style.transform = 'translateX(-50%) scale(1.5)';
        marker.style.boxShadow = '0 0 30px var(--neon-cyan)';
    });
    
    item.addEventListener('mouseleave', function() {
        const marker = this.querySelector('.timeline-marker');
        marker.style.transform = 'translateX(-50%) scale(1)';
        marker.style.boxShadow = '0 0 20px var(--neon-cyan)';
    });
});

// ==================== COMPETENCIA CHIPS EFFECT ====================
const competenciaChips = document.querySelectorAll('.competencia-chip');

competenciaChips.forEach((chip, index) => {
    chip.style.animationDelay = `${index * 0.1}s`;
    
    chip.addEventListener('click', function() {
        this.style.animation = 'none';
        this.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
        
        // Create a pulse effect
        const pulse = document.createElement('div');
        pulse.style.position = 'absolute';
        pulse.style.top = '0';
        pulse.style.left = '0';
        pulse.style.width = '100%';
        pulse.style.height = '100%';
        pulse.style.border = '2px solid var(--neon-cyan)';
        pulse.style.borderRadius = '50px';
        pulse.style.pointerEvents = 'none';
        pulse.style.animation = 'pulse 0.6s';
        
        this.style.position = 'relative';
        this.appendChild(pulse);
        
        setTimeout(() => {
            pulse.remove();
        }, 600);
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== CONTACT CARDS EFFECT ====================
const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// ==================== EASTER EGGS ====================
function initEasterEggs() {
    // Konami Code Easter Egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                activateMatrixMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    // Double click on logo
    const logo = document.querySelector('.nav-logo');
    let clickCount = 0;
    
    logo.addEventListener('click', () => {
        clickCount++;
        
        if (clickCount === 3) {
            activateGlitchMode();
            clickCount = 0;
        }
        
        setTimeout(() => {
            clickCount = 0;
        }, 1000);
    });
}

function activateMatrixMode() {
    document.body.style.filter = 'hue-rotate(120deg)';
    
    const message = document.createElement('div');
    message.textContent = '🎮 MATRIX MODE ACTIVATED! 🎮';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.fontSize = '2rem';
    message.style.color = '#00ff00';
    message.style.textShadow = '0 0 20px #00ff00';
    message.style.zIndex = '10001';
    message.style.fontFamily = 'Orbitron, sans-serif';
    message.style.animation = 'glitch 0.5s infinite';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
        document.body.style.filter = 'none';
    }, 3000);
}

function activateGlitchMode() {
    const glitchOverlay = document.querySelector('.glitch-overlay');
    
    let glitchInterval = setInterval(() => {
        glitchOverlay.style.opacity = Math.random();
    }, 50);
    
    setTimeout(() => {
        clearInterval(glitchInterval);
        glitchOverlay.style.opacity = '0';
    }, 2000);
}

// ==================== PERFORMANCE OPTIMIZATION ====================
// Throttle function for scroll events
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// Debounce function for resize events
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Optimize scroll animations
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations handled here
}, 100));

// Optimize resize handling
window.addEventListener('resize', debounce(() => {
    // Resize-based recalculations here
}, 250));

// ==================== CONSOLE MESSAGE ====================
console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #00f3ff; font-size: 20px; font-weight: bold;');
console.log('%c💻 Desarrollado por NOMBRE APELLIDO', 'color: #ff00e5; font-size: 14px;');
console.log('%c🎨 Diseño Cyberpunk/Futurista', 'color: #00ff88; font-size: 14px;');
console.log('%c🔧 Tecnologías: HTML5, CSS3, JavaScript', 'color: #9d00ff; font-size: 14px;');
console.log('%c🎮 Easter Egg: Try the Konami Code!', 'color: #ffee00; font-size: 12px;');

// ==================== LAZY LOADING ====================
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==================== ACCESSIBILITY ====================
// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ==================== CONSOLE ART ====================
const asciiArt = `
╔═══════════════════════════════════════════════╗
║                                               ║
║       ____  _______     __                    ║
║      / __ \\/ ____/ |   / /                    ║
║     / / / / __/  | |  / /                     ║
║    / /_/ / /___  | | / /                      ║
║   /_____/_____/  |_|/_/                       ║
║                                               ║
║   Portfolio v1.0 - Desarrollador Software    ║
║                                               ║
╚═══════════════════════════════════════════════╝
`;

console.log(asciiArt);