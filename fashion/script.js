// Fashion Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initCountdownTimer();
    initProductInteractions();
    initCart();
    initModal();
    initScrollEffects();
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

// Countdown Timer
function initCountdownTimer() {
    const countdownDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 days from now

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Product Interactions
function initProductInteractions() {
    const quickAddButtons = document.querySelectorAll('.quick-add');

    quickAddButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = this.getAttribute('data-product-id');
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.sale-price, .price span:last-child').textContent;
            const productImage = productCard.querySelector('img').src;

            addToCart(productId, productTitle, productPrice, productImage);
        });
    });
}

// Shopping Cart
let cart = [];
let cartCount = 0;
let cartTotal = 0;

function initCart() {
    const stickyCart = document.getElementById('stickyCart');
    const navCart = document.querySelector('.nav-cart');
    const cartCountElements = document.querySelectorAll('.cart-count');

    // Show/hide sticky cart based on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500 && cart.length > 0) {
            stickyCart.classList.add('show');
        } else {
            stickyCart.classList.remove('show');
        }
    });

    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                alert('Redirecting to checkout...');
                // In a real app, this would redirect to checkout page
            }
        });
    }

    // Nav cart click
    if (navCart) {
        navCart.addEventListener('click', function() {
            if (cart.length > 0) {
                showCartModal();
            }
        });
    }
}

function addToCart(productId, title, price, image) {
    // Check if product already exists
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            title: title,
            price: parseFloat(price.replace('$', '')),
            image: image,
            quantity: 1
        });
    }

    cartCount += 1;
    cartTotal += parseFloat(price.replace('$', ''));

    updateCartDisplay();
    showNotification(`${title} added to cart!`);

    // Animate cart icon
    const navCart = document.querySelector('.nav-cart');
    navCart.style.transform = 'scale(1.2)';
    setTimeout(() => {
        navCart.style.transform = 'scale(1)';
    }, 200);
}

function updateCartDisplay() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const stickyCart = document.getElementById('stickyCart');

    cartCountElements.forEach(element => {
        element.textContent = cartCount;
    });

    if (stickyCart) {
        const cartSummary = stickyCart.querySelector('.cart-summary');
        const itemText = cartCount === 1 ? 'item' : 'items';
        cartSummary.innerHTML = `
            <span class="cart-count">${cartCount} ${itemText}</span>
            <span class="cart-total">$${cartTotal.toFixed(2)}</span>
        `;
    }
}

function showNotification(message) {
    // Create notification element
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
        box-shadow: var(--shadow);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Modal Functionality
function initModal() {
    const modal = document.getElementById('productModal');
    const closeModal = document.querySelector('.close-modal');
    const productCards = document.querySelectorAll('.product-card');

    // Open modal when clicking product image
    productCards.forEach(card => {
        const image = card.querySelector('.product-image');
        image.addEventListener('click', function() {
            const title = card.querySelector('h3').textContent;
            const price = card.querySelector('.sale-price, .price span:last-child').textContent;
            const rating = card.querySelector('.rating').innerHTML;
            const imgSrc = card.querySelector('img').src;

            openProductModal(title, price, rating, imgSrc);
        });
    });

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('show');
        });
    }

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Modal quantity controls
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('modalQuantity');

    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', function() {
            const currentQty = parseInt(quantityInput.value);
            if (currentQty > 1) {
                quantityInput.value = currentQty - 1;
            }
        });
    }

    if (increaseBtn) {
        increaseBtn.addEventListener('click', function() {
            const currentQty = parseInt(quantityInput.value);
            quantityInput.value = currentQty + 1;
        });
    }

    // Add to cart from modal
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const title = document.getElementById('modalProductTitle').textContent;
            const price = document.getElementById('modalProductPrice').textContent;
            const quantity = parseInt(document.getElementById('modalQuantity').value);

            // Find product ID (in a real app, this would be passed to the modal)
            const productId = 'modal-product';

            for (let i = 0; i < quantity; i++) {
                addToCart(productId, title, price, '');
            }

            modal.classList.remove('show');
        });
    }
}

function openProductModal(title, price, rating, image) {
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalProductTitle');
    const modalPrice = document.getElementById('modalProductPrice');
    const modalRating = document.getElementById('modalProductRating');
    const modalImage = document.getElementById('modalProductImage');

    modalTitle.textContent = title;
    modalPrice.textContent = price;
    modalRating.innerHTML = rating;
    modalImage.src = image;

    // Reset quantity
    document.getElementById('modalQuantity').value = 1;

    // Update color swatches (in a real app, this would be dynamic)
    const colorSwatches = document.getElementById('modalColorSwatches');
    colorSwatches.innerHTML = `
        <span class="color-swatch black" data-color="Black"></span>
        <span class="color-swatch white" data-color="White"></span>
        <span class="color-swatch blue" data-color="Navy Blue"></span>
    `;

    modal.classList.add('show');
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
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }

        lastScrollTop = scrollTop;
    });
}

// Newsletter form
document.addEventListener('DOMContentLoaded', function() {
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
`;
document.head.appendChild(style);