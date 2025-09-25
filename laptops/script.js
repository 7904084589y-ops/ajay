// Laptops Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initVideoPlayer();
    initScrollEffects();
    initAnimations();
    initPerformanceMeters();
    initNewsletterForm();
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

// Video Player Functionality
function initVideoPlayer() {
    const playButton = document.getElementById('playVideo');
    const videoThumbnail = document.querySelector('.video-thumbnail');

    if (playButton && videoThumbnail) {
        playButton.addEventListener('click', function() {
            showNotification('Video demo would play here in full implementation');
            simulateVideoPlay();
        });

        videoThumbnail.addEventListener('click', function() {
            showNotification('Video demo would play here in full implementation');
            simulateVideoPlay();
        });
    }

    function simulateVideoPlay() {
        const playBtn = document.querySelector('.play-button');
        if (playBtn) {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playBtn.style.background = 'rgba(59, 130, 246, 0.9)';

            setTimeout(() => {
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                playBtn.style.background = 'rgba(255, 255, 255, 0.9)';
            }, 2000);
        }
    }
}

// Performance Meters Animation
function initPerformanceMeters() {
    const meterFills = document.querySelectorAll('.meter-fill');

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const meterFill = entry.target;
                const width = meterFill.style.width;
                meterFill.style.width = '0%';
                setTimeout(() => {
                    meterFill.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    meterFills.forEach(meter => {
        observer.observe(meter);
    });
}

// Scroll Effects
function initScrollEffects() {
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

    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(25px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        }

        lastScrollTop = scrollTop;
    });

    const heroLaptop = document.querySelector('.hero-laptop');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;

        if (heroLaptop) {
            heroLaptop.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Animations
function initAnimations() {
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

    const animateElements = document.querySelectorAll('.spec-card, .review-card, .info-card, .offer-card, .feature-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `
        .spec-card, .review-card, .info-card, .offer-card, .feature-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .spec-card.animate-in, .review-card.animate-in, .info-card.animate-in, .offer-card.animate-in, .feature-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .info-card.animate-in {
            transition-delay: 0.1s;
        }

        .offer-card.animate-in {
            transition-delay: 0.2s;
        }

        .feature-item.animate-in {
            transition-delay: 0.3s;
        }

        .spec-card:nth-child(2).animate-in {
            transition-delay: 0.1s;
        }

        .spec-card:nth-child(3).animate-in {
            transition-delay: 0.2s;
        }

        .spec-card:nth-child(4).animate-in {
            transition-delay: 0.3s;
        }

        .review-card:nth-child(2).animate-in {
            transition-delay: 0.1s;
        }

        .review-card:nth-child(3).animate-in {
            transition-delay: 0.2s;
        }

        .laptop-frame {
            animation: float 8s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: rotateX(20deg) rotateY(-10deg) translateY(0px); }
            50% { transform: rotateX(20deg) rotateY(-10deg) translateY(-10px); }
        }

        .chart-bar {
            animation: growUp 1s ease-out;
        }

        @keyframes growUp {
            from { height: 0; }
            to { height: var(--bar-height); }
        }

        .meter-fill {
            animation: fillMeter 1.5s ease-out;
        }

        @keyframes fillMeter {
            from { width: 0%; }
            to { width: var(--meter-width); }
        }

        .bar-fill {
            animation: fillBar 1.5s ease-out;
        }

        @keyframes fillBar {
            from { width: 0%; }
            to { width: var(--bar-width); }
        }
    `;
    document.head.appendChild(style);
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.signup-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            if (email) {
                showNotification('Thank you for subscribing! You\'ll receive updates about our latest products.');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }
}

// Button interactions
document.addEventListener('DOMContentLoaded', function() {
    const orderBtn = document.querySelector('.btn-primary');
    const demoBtn = document.querySelector('.btn-secondary');

    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            showNotification('Redirecting to order page...');
        });
    }

    if (demoBtn) {
        demoBtn.addEventListener('click', function() {
            document.querySelector('.video-section').scrollIntoView({ behavior: 'smooth' });
        });
    }

    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            sidebarItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.transform = 'scaleY(1.1)';
        });

        bar.addEventListener('mouseleave', function() {
            this.style.transform = 'scaleY(1)';
        });
    });
});

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
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

    .key {
        animation: keyPress 3s ease-in-out infinite;
    }

    .key:nth-child(odd) {
        animation-delay: 0.5s;
    }

    @keyframes keyPress {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(0.95); }
    }

    .demo-interface {
        animation: screenGlow 4s ease-in-out infinite;
    }

    @keyframes screenGlow {
        0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
        50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); }
    }
`;
document.head.appendChild(style);