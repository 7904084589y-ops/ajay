// Mobile Phones Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    init360View();
    initScrollEffects();
    initPurchaseOptions();
    initAnimations();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');

            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// 360° View Functionality
let currentView = 0;
let autoRotateInterval;
let isAutoRotating = false;

function init360View() {
    const phoneImages = document.querySelectorAll('.phone-image');
    const rotateLeftBtn = document.getElementById('rotateLeft');
    const rotateRightBtn = document.getElementById('rotateRight');
    const autoRotateBtn = document.getElementById('autoRotate');

    // Set first image as active
    if (phoneImages.length > 0) {
        phoneImages[0].classList.add('active');
    }

    // Left rotation
    if (rotateLeftBtn) {
        rotateLeftBtn.addEventListener('click', function() {
            rotateView('left');
        });
    }

    // Right rotation
    if (rotateRightBtn) {
        rotateRightBtn.addEventListener('click', function() {
            rotateView('right');
        });
    }

    // Auto rotate toggle
    if (autoRotateBtn) {
        autoRotateBtn.addEventListener('click', function() {
            toggleAutoRotate();
        });
    }

    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            rotateView('left');
        } else if (e.key === 'ArrowRight') {
            rotateView('right');
        } else if (e.key === ' ') {
            e.preventDefault();
            toggleAutoRotate();
        }
    });
}

function rotateView(direction) {
    const phoneImages = document.querySelectorAll('.phone-image');

    if (direction === 'left') {
        currentView = currentView === 0 ? phoneImages.length - 1 : currentView - 1;
    } else {
        currentView = currentView === phoneImages.length - 1 ? 0 : currentView + 1;
    }

    updatePhoneView();
}

function updatePhoneView() {
    const phoneImages = document.querySelectorAll('.phone-image');

    phoneImages.forEach((img, index) => {
        if (index === currentView) {
            img.classList.add('active');
        } else {
            img.classList.remove('active');
        }
    });
}

function toggleAutoRotate() {
    const autoRotateBtn = document.getElementById('autoRotate');
    const icon = autoRotateBtn.querySelector('i');

    if (isAutoRotating) {
        clearInterval(autoRotateInterval);
        icon.className = 'fas fa-play';
        isAutoRotating = false;
    } else {
        autoRotateInterval = setInterval(() => {
            rotateView('right');
        }, 2000);
        icon.className = 'fas fa-pause';
        isAutoRotating = true;
    }
}

// Purchase Options
function initPurchaseOptions() {
    const storageOptions = document.querySelectorAll('.storage-option');
    const paymentPlans = document.querySelectorAll('.payment-plan');
    const selectedConfig = document.querySelector('.selected-config');
    const configPrice = document.querySelector('.config-price');

    let selectedStorage = '256gb';
    let selectedPayment = '24';

    // Storage selection
    storageOptions.forEach(option => {
        option.addEventListener('click', function() {
            storageOptions.forEach(opt => opt.classList.remove('featured'));
            this.classList.add('featured');
            selectedStorage = this.dataset.storage;
            updateSelectedConfig();
        });
    });

    // Payment plan selection
    paymentPlans.forEach(plan => {
        plan.addEventListener('click', function() {
            paymentPlans.forEach(p => p.classList.remove('featured'));
            this.classList.add('featured');
            selectedPayment = this.dataset.plan || '24';
            updateSelectedConfig();
        });
    });

    function updateSelectedConfig() {
        const storagePrices = {
            '128gb': 999,
            '256gb': 1099,
            '512gb': 1299
        };

        const paymentMultipliers = {
            'full': 1,
            '24': 24,
            '12': 12
        };

        const basePrice = storagePrices[selectedStorage] || 1099;
        const monthlyPayments = selectedPayment === 'full' ? 1 : paymentMultipliers[selectedPayment] || 24;
        const finalPrice = selectedPayment === 'full' ? basePrice : (basePrice / monthlyPayments);

        if (selectedConfig && configPrice) {
            selectedConfig.querySelector('h3').textContent = `Selected: ${selectedStorage.toUpperCase()} Model`;
            configPrice.textContent = selectedPayment === 'full' ? `$${basePrice}` : `$${(basePrice / monthlyPayments).toFixed(2)}/mo`;
        }
    }
}

// Scroll Effects
function initScrollEffects() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.style.background = 'rgba(26, 26, 46, 0.98)';
            header.style.backdropFilter = 'blur(25px)';
        } else {
            header.style.background = 'rgba(26, 26, 46, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        }

        lastScrollTop = scrollTop;
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroDevice = document.querySelector('.hero-device');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (heroDevice) {
            heroDevice.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .review-card, .specs-row, .comparison-row');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .review-card, .specs-row, .comparison-row {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .feature-card.animate-in, .review-card.animate-in, .specs-row.animate-in, .comparison-row.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .specs-row.animate-in {
            transition-delay: 0.1s;
        }

        .comparison-row.animate-in {
            transition-delay: 0.2s;
        }

        .feature-card:nth-child(2).animate-in {
            transition-delay: 0.1s;
        }

        .feature-card:nth-child(3).animate-in {
            transition-delay: 0.2s;
        }

        .feature-card:nth-child(4).animate-in {
            transition-delay: 0.3s;
        }

        .review-card:nth-child(2).animate-in {
            transition-delay: 0.1s;
        }

        .review-card:nth-child(3).animate-in {
            transition-delay: 0.2s;
        }

        .phone-image {
            transition: opacity 0.5s ease;
        }

        .phone-image:nth-child(2) {
            transition-delay: 0.1s;
        }

        .phone-image:nth-child(3) {
            transition-delay: 0.2s;
        }
    `;
    document.head.appendChild(style);
}

// Button interactions
document.addEventListener('DOMContentLoaded', function() {
    // Pre-order and buy buttons
    const preOrderBtn = document.querySelector('.btn-primary');
    const buyBtn = document.querySelector('.btn-buy');
    const view360Btn = document.querySelector('.btn-secondary');

    if (preOrderBtn) {
        preOrderBtn.addEventListener('click', function() {
            showNotification('Redirecting to pre-order page...');
        });
    }

    if (buyBtn) {
        buyBtn.addEventListener('click', function() {
            showNotification('Redirecting to checkout...');
        });
    }

    if (view360Btn) {
        view360Btn.addEventListener('click', function() {
            document.getElementById('specs').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Newsletter form (if exists)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            if (email) {
                showNotification('Thank you for subscribing!');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }
});

// Notification system
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, var(--neon-blue), var(--neon-purple));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-glow);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    .device-frame {
        animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
        0%, 100% { transform: rotateY(-10deg) rotateX(5deg) translateY(0px); }
        50% { transform: rotateY(-10deg) rotateX(5deg) translateY(-10px); }
    }

    .feature-icon {
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);