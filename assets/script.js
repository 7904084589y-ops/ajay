// Shared JavaScript for All Landing Pages

// Utility Functions
const utils = {
    // Debounce function for performance
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format currency
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    // Format number with commas
    formatNumber: function(num) {
        return new Intl.NumberFormat('en-US').format(num);
    },

    // Generate random ID
    generateId: function() {
        return Math.random().toString(36).substr(2, 9);
    },

    // Local storage helpers
    storage: {
        get: function(key) {
            try {
                return JSON.parse(localStorage.getItem(key)) || null;
            } catch (e) {
                return null;
            }
        },

        set: function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                return false;
            }
        },

        remove: function(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                return false;
            }
        }
    },

    // Cookie helpers
    cookies: {
        get: function(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        },

        set: function(name, value, days = 30) {
            const expires = new Date();
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
        }
    }
};

// DOM Manipulation Utilities
const dom = {
    // Create element with classes and attributes
    create: function(tag, options = {}) {
        const element = document.createElement(tag);

        if (options.classes) {
            element.className = Array.isArray(options.classes)
                ? options.classes.join(' ')
                : options.classes;
        }

        if (options.attributes) {
            Object.entries(options.attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }

        if (options.text) {
            element.textContent = options.text;
        }

        if (options.html) {
            element.innerHTML = options.html;
        }

        if (options.children) {
            options.children.forEach(child => {
                if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child));
                } else {
                    element.appendChild(child);
                }
            });
        }

        return element;
    },

    // Add event listener with options
    on: function(element, event, handler, options = {}) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }

        if (element && element.addEventListener) {
            element.addEventListener(event, handler, options);
        }

        return element;
    },

    // Remove event listener
    off: function(element, event, handler, options = {}) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }

        if (element && element.removeEventListener) {
            element.removeEventListener(event, handler, options);
        }

        return element;
    },

    // Find element(s) within a parent
    find: function(parent, selector) {
        if (typeof parent === 'string') {
            parent = document.querySelector(parent);
        }

        if (!parent) return null;

        return parent.querySelector(selector);
    },

    findAll: function(parent, selector) {
        if (typeof parent === 'string') {
            parent = document.querySelector(parent);
        }

        if (!parent) return [];

        return Array.from(parent.querySelectorAll(selector));
    }
};

// Animation Utilities
const animations = {
    // Fade in elements on scroll
    fadeInOnScroll: function(selector, options = {}) {
        const elements = document.querySelectorAll(selector);
        const observerOptions = {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px 0px -50px 0px',
            ...options
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    if (options.once) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        elements.forEach(el => {
            observer.observe(el);
        });
    },

    // Add CSS for fade-in animation
    addFadeInStyles: function() {
        if (!document.getElementById('fade-in-styles')) {
            const style = document.createElement('style');
            style.id = 'fade-in-styles';
            style.textContent = `
                .fade-in-visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }

                [class*="fade-in"] {
                    opacity: 0 !important;
                    transform: translateY(30px) !important;
                    transition: opacity 0.6s ease, transform 0.6s ease !important;
                }
            `;
            document.head.appendChild(style);
        }
    },

    // Smooth scroll to element
    scrollTo: function(selector, offset = 0) {
        const element = document.querySelector(selector);
        if (!element) return;

        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

// Form Utilities
const forms = {
    // Validate email
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validate phone
    isValidPhone: function(phone) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    },

    // Serialize form data
    serialize: function(form) {
        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        return data;
    },

    // Show form message
    showMessage: function(form, message, type = 'success') {
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageEl = dom.create('div', {
            classes: `form-message form-message--${type}`,
            text: message
        });

        form.insertBefore(messageEl, form.firstChild);

        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }
};

// API Utilities
const api = {
    // Simple fetch wrapper
    fetch: async function(url, options = {}) {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await window.fetch(url, {
                ...defaultOptions,
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // POST request
    post: function(url, data) {
        return this.fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    // GET request
    get: function(url) {
        return this.fetch(url);
    }
};

// Performance Utilities
const performance = {
    // Lazy load images
    lazyLoadImages: function() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    },

    // Preload critical resources
    preload: function(resources) {
        resources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;

            if (resource.type) {
                link.type = resource.type;
            }

            document.head.appendChild(link);
        });
    }
};

// Accessibility Utilities
const a11y = {
    // Announce to screen readers
    announce: function(message, priority = 'polite') {
        const announcement = dom.create('div', {
            classes: 'sr-only',
            attributes: {
                'aria-live': priority,
                'aria-atomic': 'true'
            },
            text: message
        });

        document.body.appendChild(announcement);

        setTimeout(() => {
            if (announcement.parentNode) {
                announcement.remove();
            }
        }, 1000);
    },

    // Focus trap for modals
    trapFocus: function(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );

        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }

            if (e.key === 'Escape') {
                // Close modal logic here
            }
        });
    }
};

// Initialize common functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in styles
    animations.addFadeInStyles();

    // Lazy load images
    performance.lazyLoadImages();

    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Add loading states to forms
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;

                // Re-enable after 3 seconds (in case of no response)
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key to close modals
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active, .modal-overlay.active');
            if (activeModal) {
                // Close modal logic here
            }
        }
    });

    // Add focus styles for better accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
});

// Export utilities for use in other scripts
window.LandingPageUtils = {
    utils,
    dom,
    animations,
    forms,
    api,
    performance,
    a11y
};