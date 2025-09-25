// Advanced T-Shirt Store JavaScript with High-Level Configuration

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality with enhanced features
    initCurrencyConverter();
    initCountdownTimer();
    initAdvancedCart();
    initAdvancedSearch();
    initProductInteractions();
    initMobileMenu();
    initSmoothScrolling();
    initLoadingStates();
    initAccessibilityFeatures();
    initPerformanceOptimizations();
    loadProductsFromAdmin();

    // Add smooth page load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Currency conversion rates (relative to INR)
const exchangeRates = {
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0095,
    JPY: 1.8
};

// Currency symbols
const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥'
};

// Currency names
const currencyNames = {
    INR: 'Indian Rupee',
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    JPY: 'Japanese Yen'
};

// Currency conversion functionality
function initCurrencyConverter() {
    const currencySelect = document.getElementById('currencySelect');
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const convertBtn = document.getElementById('convertBtn');
    const swapBtn = document.querySelector('.swap-btn');
    const resultAmount = document.getElementById('resultAmount');
    const resultCurrency = document.getElementById('resultCurrency');
    const exchangeRate = document.getElementById('exchangeRate');

    // Update prices when currency changes
    if (currencySelect) {
        currencySelect.addEventListener('change', function() {
            const selectedCurrency = this.value;
            updateAllPrices(selectedCurrency);
            updateExchangeRate();
        });
    }

    // Convert button
    if (convertBtn) {
        convertBtn.addEventListener('click', function() {
            performConversion();
        });
    }

    // Swap currencies
    if (swapBtn) {
        swapBtn.addEventListener('click', function() {
            const fromValue = fromCurrency.value;
            const toValue = toCurrency.value;

            fromCurrency.value = toValue;
            toCurrency.value = fromValue;

            updateExchangeRate();
            if (amountInput.value) {
                performConversion();
            }
        });
    }

    // Auto convert on input change
    if (amountInput) {
        amountInput.addEventListener('input', performConversion);
    }

    if (fromCurrency) {
        fromCurrency.addEventListener('change', function() {
            updateExchangeRate();
            if (amountInput.value) {
                performConversion();
            }
        });
    }

    if (toCurrency) {
        toCurrency.addEventListener('change', function() {
            updateExchangeRate();
            if (amountInput.value) {
                performConversion();
            }
        });
    }

    function performConversion() {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (!amount || amount <= 0) {
            resultAmount.textContent = '0.00';
            return;
        }

        // Convert to base currency (INR) first, then to target currency
        const amountInINR = from === 'INR' ? amount : amount / exchangeRates[from];
        const convertedAmount = amountInINR * exchangeRates[to];

        resultAmount.textContent = formatCurrency(convertedAmount, to);
        resultCurrency.textContent = currencySymbols[to];
    }

    function updateExchangeRate() {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const rate = exchangeRates[to] / exchangeRates[from];

        exchangeRate.textContent = `1 ${currencySymbols[from]} = ${formatCurrency(rate, to)} ${currencySymbols[to]}`;
    }

    function updateAllPrices(targetCurrency) {
        // Update product prices
        const priceElements = document.querySelectorAll('.current-price, .original-price');
        priceElements.forEach(element => {
            const priceText = element.textContent;
            const priceMatch = priceText.match(/₹([\d,]+)/);

            if (priceMatch) {
                const inrPrice = parseFloat(priceMatch[1].replace(/,/g, ''));
                const convertedPrice = inrPrice * exchangeRates[targetCurrency];
                const formattedPrice = formatCurrency(convertedPrice, targetCurrency);

                element.textContent = element.classList.contains('current-price')
                    ? formattedPrice
                    : priceText.replace(/₹[\d,]+/, formattedPrice);
            }
        });

        // Update EMI information
        const emiElements = document.querySelectorAll('.emi-info');
        emiElements.forEach(element => {
            const emiText = element.textContent;
            const emiMatch = emiText.match(/₹([\d]+)/);

            if (emiMatch) {
                const inrEmi = parseFloat(emiMatch[1]);
                const convertedEmi = inrEmi * exchangeRates[targetCurrency];
                const formattedEmi = formatCurrency(convertedEmi, targetCurrency);

                element.textContent = emiText.replace(/₹[\d]+/, formattedEmi);
            }
        });
    }

    // Initialize with default values
    updateExchangeRate();
}

// Format currency based on currency type
function formatCurrency(amount, currency) {
    const roundedAmount = Math.round(amount * 100) / 100;

    switch (currency) {
        case 'INR':
            return '₹' + roundedAmount.toLocaleString('en-IN');
        case 'USD':
            return '$' + roundedAmount.toLocaleString('en-US');
        case 'EUR':
            return '€' + roundedAmount.toLocaleString('en-US');
        case 'GBP':
            return '£' + roundedAmount.toLocaleString('en-US');
        case 'JPY':
            return '¥' + Math.round(roundedAmount).toLocaleString('en-US');
        default:
            return roundedAmount.toLocaleString('en-US');
    }
}

// Countdown timer for sales
function initCountdownTimer() {
    const countdownDate = new Date().getTime() + (2 * 24 * 60 * 60 * 1000); // 2 days from now

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

// Advanced Shopping Cart with Enhanced UX
function initAdvancedCart() {
    const cartBtn = document.querySelector('.cart-btn');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');

    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('tshirtCart')) || [];
    updateCartCount();

    addToCartBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const productCard = this.closest('.deal-card');
            const productId = this.dataset.productId || index;
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const productImage = productCard.querySelector('img').src;

            // Add product to cart
            const cartItem = {
                id: Date.now() + Math.random(),
                productId: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1,
                timestamp: new Date().toISOString()
            };

            cart.push(cartItem);
            localStorage.setItem('tshirtCart', JSON.stringify(cart));
            updateCartCount();

            // Enhanced animations
            this.style.transform = 'scale(0.95)';
            this.innerHTML = '<i class="fas fa-check"></i> Added!';

            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.innerHTML = 'Add to Cart';
            }, 1000);

            // Add ripple effect
            addRippleEffect(this);

            // Show enhanced notification
            showEnhancedNotification(`${productName} added to cart!`, 'success', {
                showCartButton: true,
                autoHide: true,
                duration: 3000
            });

            // Animate cart count
            animateCartCount();
        });
    });

    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showCartModal();
        });
    }

    function updateCartCount() {
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = itemCount;
            cartCount.classList.toggle('has-items', itemCount > 0);
        }
    }

    function animateCartCount() {
        if (cartCount) {
            cartCount.classList.add('updated');
            setTimeout(() => {
                cartCount.classList.remove('updated');
            }, 600);
        }
    }

    function addRippleEffect(element) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';

        element.style.position = 'relative';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    function showCartModal() {
        if (cart.length === 0) {
            showEnhancedNotification('Your cart is empty', 'info');
            return;
        }

        // Create cart modal
        const modal = document.createElement('div');
        modal.className = 'cart-modal-overlay';
        modal.innerHTML = `
            <div class="cart-modal">
                <div class="cart-modal-header">
                    <h3>Shopping Cart (${cart.length} items)</h3>
                    <button class="cart-modal-close">&times;</button>
                </div>
                <div class="cart-modal-body">
                    ${cart.map(item => `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}" onerror="this.src='../assets/images/placeholder.jpg'">
                            <div class="cart-item-details">
                                <h4>${item.name}</h4>
                                <p class="cart-item-price">${item.price}</p>
                                <div class="cart-item-quantity">
                                    <button class="quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
                                    <span class="quantity-value">${item.quantity}</span>
                                    <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
                                </div>
                            </div>
                            <button class="cart-item-remove" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
                <div class="cart-modal-footer">
                    <div class="cart-total">
                        <strong>Total: ₹${calculateTotal().toLocaleString('en-IN')}</strong>
                    </div>
                    <button class="btn-checkout">Proceed to Checkout</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listeners
        modal.querySelector('.cart-modal-close').addEventListener('click', () => closeCartModal());
        modal.querySelector('.btn-checkout').addEventListener('click', () => {
            showEnhancedNotification('Checkout functionality coming soon!', 'info');
            closeCartModal();
        });

        // Quantity controls
        modal.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const action = btn.dataset.action;
                const itemId = btn.dataset.id;
                updateQuantity(itemId, action);
            });
        });

        // Remove items
        modal.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = btn.dataset.id;
                removeCartItem(itemId);
            });
        });
        
        // Advanced CSS Animations and Smooth Transitions
        function initAdvancedAnimations() {
            // Add advanced keyframe animations
            const animationStyles = document.createElement('style');
            animationStyles.textContent = `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
        
                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
        
                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
        
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
        
                @keyframes shimmer {
                    0% { background-position: -200px 0; }
                    100% { background-position: calc(200px + 100%) 0; }
                }
        
                @keyframes bounceIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.3);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.05);
                    }
                    70% {
                        transform: scale(0.9);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
        
                @keyframes slideInUp {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
        
                @keyframes slideOutDown {
                    from {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                }
        
                @keyframes rotateIn {
                    from {
                        transform: rotate(-180deg);
                        opacity: 0;
                    }
                    to {
                        transform: rotate(0deg);
                        opacity: 1;
                    }
                }
        
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
        
                @keyframes loadingDots {
                    0%, 20% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 0; }
                }
        
                .loading-dots span {
                    animation: loadingDots 1.4s infinite ease-in-out both;
                }
        
                .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
                .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
                .loading-dots span:nth-child(3) { animation-delay: 0s; }
        
                .card-hover-effect {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
        
                .card-hover-effect:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                }
        
                .btn-advanced {
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
        
                .btn-advanced:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
                }
        
                .btn-advanced:active {
                    transform: translateY(0);
                }
        
                .glass-effect {
                    backdrop-filter: blur(10px);
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
        
                .shimmer-effect {
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                    background-size: 200px 100%;
                    animation: shimmer 2s infinite;
                }
        
                .pulse-animation {
                    animation: pulse 2s infinite;
                }
        
                .bounce-in {
                    animation: bounceIn 0.6s ease-out;
                }
        
                .fade-in-up {
                    animation: fadeInUp 0.6s ease-out;
                }
        
                .fade-in-left {
                    animation: fadeInLeft 0.6s ease-out;
                }
        
                .fade-in-right {
                    animation: fadeInRight 0.6s ease-out;
                }
        
                .slide-in-up {
                    animation: slideInUp 0.3s ease-out;
                }
        
                .slide-out-down {
                    animation: slideOutDown 0.3s ease-out;
                }
        
                .rotate-in {
                    animation: rotateIn 0.5s ease-out;
                }
        
                .smooth-transition {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
        
                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid #28a745;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                }
        
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
        
                .loading-dots {
                    display: inline-block;
                    text-align: center;
                }
        
                .loading-dots span {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: #28a745;
                    display: inline-block;
                    margin: 0 2px;
                }
        
                .error-shake {
                    animation: shake 0.5s ease-in-out;
                }
        
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
        
                .success-checkmark {
                    animation: checkmark 0.6s ease-in-out;
                }
        
                @keyframes checkmark {
                    0% { transform: scale(0); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
        
                .nav-link {
                    position: relative;
                    transition: all 0.3s ease;
                }
        
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #28a745;
                    transition: width 0.3s ease;
                }
        
                .nav-link:hover::after {
                    width: 100%;
                }
        
                .product-card {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
        
                .product-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                }
        
                .search-input {
                    transition: all 0.3s ease;
                }
        
                .search-input:focus {
                    transform: scale(1.02);
                    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.2);
                }
        
                .modal-overlay {
                    animation: fadeIn 0.3s ease-out;
                }
        
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
        
                .modal-content {
                    animation: slideInUp 0.3s ease-out;
                }
        
                .notification {
                    animation: slideInRight 0.3s ease-out;
                }
        
                .notification.hide {
                    animation: slideOutRight 0.3s ease-out;
                }
        
                .page-transition {
                    transition: all 0.5s ease-in-out;
                }
        
                .page-transition.fade-out {
                    opacity: 0;
                    transform: translateY(20px);
                }
        
                .page-transition.fade-in {
                    opacity: 1;
                    transform: translateY(0);
                }
            `;
            document.head.appendChild(animationStyles);
        
            // Add animation classes to existing elements
            const cards = document.querySelectorAll('.deal-card, .product-card, .category-card');
            cards.forEach((card, index) => {
                card.classList.add('card-hover-effect');
                setTimeout(() => {
                    card.classList.add('fade-in-up');
                }, index * 100);
            });
        
            const buttons = document.querySelectorAll('.btn, .add-to-cart, .shop-now-btn');
            buttons.forEach(btn => {
                btn.classList.add('btn-advanced', 'smooth-transition');
            });
        }
        
        // Smooth Scrolling and Navigation
        function initSmoothScrolling() {
            // Smooth scroll for anchor links
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
        
            // Add smooth scroll behavior to window
            window.scrollTo = new Proxy(window.scrollTo, {
                apply: function(target, thisArg, argumentsList) {
                    if (argumentsList.length >= 2) {
                        argumentsList[2] = argumentsList[2] || {};
                        argumentsList[2].behavior = 'smooth';
                    }
                    return target.apply(thisArg, argumentsList);
                }
            });
        
            // Navigation enhancement
            const navLinks = document.querySelectorAll('.nav-link, .nav-menu a');
            navLinks.forEach(link => {
                link.classList.add('nav-link', 'smooth-transition');
            });
        
            // Add scroll-based navigation effects
            let lastScrollTop = 0;
            const header = document.querySelector('.header, .navbar');
        
            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
                if (header) {
                    if (scrollTop > lastScrollTop && scrollTop > 100) {
                        // Scrolling down
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        // Scrolling up
                        header.style.transform = 'translateY(0)';
                    }
                }
        
                lastScrollTop = scrollTop;
            });
        }
        
        // Enhanced Loading States and Micro-interactions
        function initLoadingStates() {
            // Create global loading overlay
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.innerHTML = `
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <p>Loading...</p>
                </div>
            `;
            loadingOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.9);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                backdrop-filter: blur(5px);
            `;
            document.body.appendChild(loadingOverlay);
        
            // Show/hide loading functions
            window.showGlobalLoading = function() {
                loadingOverlay.style.display = 'flex';
                loadingOverlay.classList.add('fade-in');
            };
        
            window.hideGlobalLoading = function() {
                loadingOverlay.classList.add('fade-out');
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                    loadingOverlay.classList.remove('fade-in', 'fade-out');
                }, 300);
            };
        
            // Add loading states to buttons
            const buttons = document.querySelectorAll('button, .btn');
            buttons.forEach(btn => {
                const originalText = btn.textContent;
                btn.addEventListener('click', function() {
                    if (this.classList.contains('loading')) return;
        
                    this.classList.add('loading');
                    this.disabled = true;
        
                    // Add loading spinner to button
                    const spinner = document.createElement('span');
                    spinner.className = 'button-spinner';
                    spinner.innerHTML = '<div class="loading-spinner" style="width: 16px; height: 16px; border-width: 2px;"></div>';
                    this.textContent = 'Loading...';
                    this.appendChild(spinner);
        
                    // Reset after 2 seconds (for demo)
                    setTimeout(() => {
                        this.classList.remove('loading');
                        this.disabled = false;
                        this.textContent = originalText;
                        if (spinner.parentNode) {
                            spinner.remove();
                        }
                    }, 2000);
                });
            });
        
            // Add micro-interactions to interactive elements
            const interactiveElements = document.querySelectorAll('.product-card, .deal-card, .category-card, .btn');
            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                });
        
                element.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                });
            });
        }
        
        // Performance Optimizations
        function initPerformanceOptimizations() {
            // Lazy loading for images
            const images = document.querySelectorAll('img[loading="lazy"]');
        
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.classList.add('fade-in-up');
                            observer.unobserve(img);
                        }
                    });
                });
        
                images.forEach(img => imageObserver.observe(img));
            }
        
            // Service Worker for caching (basic implementation)
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').then(function(registration) {
                        console.log('SW registered: ', registration);
                    }).catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                    });
                });
            }
        
            // Preload critical resources
            const criticalResources = [
                '../assets/images/placeholder.jpg',
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
            ];
        
            criticalResources.forEach(resource => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource;
                link.as = resource.endsWith('.css') ? 'style' : 'image';
                document.head.appendChild(link);
            });
        
            // Debounce function for performance
            function debounce(func, wait) {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            }
        
            // Optimized scroll handler
            const optimizedScrollHandler = debounce(function() {
                // Handle scroll-based animations or effects here
                const scrollTop = window.pageYOffset;
        
                // Parallax effect for hero section
                const hero = document.querySelector('.hero-section');
                if (hero) {
                    hero.style.transform = `translateY(${scrollTop * 0.5}px)`;
                }
            }, 16); // ~60fps
        
            window.addEventListener('scroll', optimizedScrollHandler);
        
            // Memory management for event listeners
            const originalAddEventListener = EventTarget.prototype.addEventListener;
            EventTarget.prototype.addEventListener = function(type, listener, options) {
                originalAddEventListener.call(this, type, listener, options);
                // Store reference for cleanup if needed
                this._listeners = this._listeners || {};
                this._listeners[type] = this._listeners[type] || [];
                this._listeners[type].push(listener);
            };
        }
        
        // Enhanced Accessibility Features
        function initAccessibilityFeatures() {
            // Add ARIA labels and roles
            const products = document.querySelectorAll('.deal-card, .product-card');
            products.forEach((product, index) => {
                product.setAttribute('role', 'article');
                product.setAttribute('aria-label', `Product ${index + 1} of ${products.length}`);
                product.setAttribute('tabindex', '0');
            });
        
            // Add skip navigation link
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.textContent = 'Skip to main content';
            skipLink.className = 'skip-link';
            skipLink.style.cssText = `
                position: absolute;
                top: -40px;
                left: 6px;
                background: #28a745;
                color: white;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                z-index: 10000;
                transition: top 0.3s;
            `;
        
            skipLink.addEventListener('focus', function() {
                this.style.top = '6px';
            });
        
            skipLink.addEventListener('blur', function() {
                this.style.top = '-40px';
            });
        
            document.body.insertBefore(skipLink, document.body.firstChild);
        
            // Add main content landmark
            const mainContent = document.querySelector('.main-content') || document.querySelector('.container');
            if (mainContent) {
                mainContent.id = 'main-content';
                mainContent.setAttribute('role', 'main');
            }
        
            // Keyboard navigation
            document.addEventListener('keydown', function(e) {
                // Escape key to close modals
                if (e.key === 'Escape') {
                    const modals = document.querySelectorAll('.modal, .cart-modal-overlay');
                    modals.forEach(modal => {
                        modal.classList.remove('active');
                        setTimeout(() => modal.remove(), 300);
                    });
                }
        
                // Arrow key navigation for products
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    const products = Array.from(document.querySelectorAll('.deal-card, .product-card'));
                    const currentIndex = products.indexOf(document.activeElement);
        
                    if (currentIndex !== -1) {
                        e.preventDefault();
                        let nextIndex;
        
                        if (e.key === 'ArrowRight') {
                            nextIndex = (currentIndex + 1) % products.length;
                        } else {
                            nextIndex = (currentIndex - 1 + products.length) % products.length;
                        }
        
                        products[nextIndex].focus();
                    }
                }
            });
        
            // Focus management
            const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
            const modal = document.querySelector('.modal');
        
            if (modal) {
                modal.addEventListener('keydown', function(e) {
                    if (e.key === 'Tab') {
                        const focusable = modal.querySelectorAll(focusableElements);
                        const firstFocusable = focusable[0];
                        const lastFocusable = focusable[focusable.length - 1];
        
                        if (e.shiftKey) {
                            if (document.activeElement === firstFocusable) {
                                lastFocusable.focus();
                                e.preventDefault();
                            }
                        } else {
                            if (document.activeElement === lastFocusable) {
                                firstFocusable.focus();
                                e.preventDefault();
                            }
                        }
                    }
                });
            }
        
            // Screen reader announcements
            window.announceToScreenReader = function(message) {
                const announcement = document.createElement('div');
                announcement.setAttribute('aria-live', 'polite');
                announcement.setAttribute('aria-atomic', 'true');
                announcement.style.cssText = `
                    position: absolute;
                    left: -10000px;
                    width: 1px;
                    height: 1px;
                    overflow: hidden;
                `;
                announcement.textContent = message;
        
                document.body.appendChild(announcement);
        
                setTimeout(() => {
                    document.body.removeChild(announcement);
                }, 1000);
            };
        }
        
        // Enhanced Error Handling and User Feedback
        function initErrorHandling() {
            // Global error handler
            window.addEventListener('error', function(e) {
                console.error('Global error:', e.error);
                showEnhancedNotification('An error occurred. Please try again.', 'error');
            });
        
            // Promise rejection handler
            window.addEventListener('unhandledrejection', function(e) {
                console.error('Unhandled promise rejection:', e.reason);
                showEnhancedNotification('Something went wrong. Please refresh the page.', 'error');
            });
        
            // Network error handling
            window.addEventListener('offline', function() {
                showEnhancedNotification('You are currently offline. Some features may not work.', 'warning');
            });
        
            window.addEventListener('online', function() {
                showEnhancedNotification('You are back online!', 'success');
            });
        
            // Form validation with enhanced feedback
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
                    let hasErrors = false;
        
                    inputs.forEach(input => {
                        if (!input.value.trim()) {
                            showFieldError(input, 'This field is required');
                            hasErrors = true;
                        } else {
                            clearFieldError(input);
                        }
                    });
        
                    if (hasErrors) {
                        e.preventDefault();
                        showEnhancedNotification('Please fill in all required fields', 'error');
                    }
                });
            });
        
            function showFieldError(input, message) {
                clearFieldError(input);
        
                input.classList.add('error-shake');
                input.setAttribute('aria-invalid', 'true');
        
                const errorElement = document.createElement('div');
                errorElement.className = 'field-error';
                errorElement.textContent = message;
                errorElement.style.cssText = `
                    color: #dc3545;
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                    animation: slideInUp 0.3s ease-out;
                `;
        
                input.parentNode.appendChild(errorElement);
        
                setTimeout(() => {
                    input.classList.remove('error-shake');
                }, 500);
            }
        
            function clearFieldError(input) {
                input.classList.remove('error-shake');
                input.setAttribute('aria-invalid', 'false');
        
                const existingError = input.parentNode.querySelector('.field-error');
                if (existingError) {
                    existingError.remove();
                }
            }
        }
        
        // Product Filtering and Sorting
        function initProductFiltering() {
            const productsContainer = document.getElementById('featuredProducts');
            let allProducts = [];
        
            // Get all products
            function getAllProducts() {
                const products = JSON.parse(localStorage.getItem('middleClassProducts')) || [];
                allProducts = products;
                return products;
            }
        
            // Create filter controls
            function createFilterControls() {
                const filterContainer = document.createElement('div');
                filterContainer.className = 'filter-controls';
                filterContainer.innerHTML = `
                    <div class="filter-section">
                        <label for="sortBy">Sort by:</label>
                        <select id="sortBy" class="filter-select">
                            <option value="name">Name</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="newest">Newest First</option>
                        </select>
                    </div>
                    <div class="filter-section">
                        <label for="filterMaterial">Material:</label>
                        <select id="filterMaterial" class="filter-select">
                            <option value="all">All Materials</option>
                            <option value="Cotton">Cotton</option>
                            <option value="Cotton Blend">Cotton Blend</option>
                            <option value="Pique Cotton">Pique Cotton</option>
                            <option value="Polyester">Polyester</option>
                        </select>
                    </div>
                    <div class="filter-section">
                        <label for="filterPrice">Price Range:</label>
                        <select id="filterPrice" class="filter-select">
                            <option value="all">All Prices</option>
                            <option value="0-500">₹0 - ₹500</option>
                            <option value="500-1000">₹500 - ₹1000</option>
                            <option value="1000-2000">₹1000 - ₹2000</option>
                            <option value="2000+">₹2000+</option>
                        </select>
                    </div>
                    <div class="filter-section">
                        <button id="clearFilters" class="btn-secondary">Clear Filters</button>
                    </div>
                `;
        
                // Insert before products container
                const dealsSection = document.querySelector('.deals-section');
                if (dealsSection) {
                    dealsSection.insertBefore(filterContainer, productsContainer);
                }
        
                // Add event listeners
                document.getElementById('sortBy').addEventListener('change', applyFilters);
                document.getElementById('filterMaterial').addEventListener('change', applyFilters);
                document.getElementById('filterPrice').addEventListener('change', applyFilters);
                document.getElementById('clearFilters').addEventListener('click', clearAllFilters);
            }
        
            function applyFilters() {
                let filteredProducts = [...allProducts];
        
                // Apply material filter
                const materialFilter = document.getElementById('filterMaterial').value;
                if (materialFilter !== 'all') {
                    filteredProducts = filteredProducts.filter(product =>
                        product.material && product.material.includes(materialFilter)
                    );
                }
        
                // Apply price filter
                const priceFilter = document.getElementById('filterPrice').value;
                if (priceFilter !== 'all') {
                    filteredProducts = filteredProducts.filter(product => {
                        const price = product.price;
                        switch (priceFilter) {
                            case '0-500': return price >= 0 && price <= 500;
                            case '500-1000': return price > 500 && price <= 1000;
                            case '1000-2000': return price > 1000 && price <= 2000;
                            case '2000+': return price > 2000;
                            default: return true;
                        }
                    });
                }
        
                // Apply sorting
                const sortBy = document.getElementById('sortBy').value;
                filteredProducts.sort((a, b) => {
                    switch (sortBy) {
                        case 'name':
                            return a.name.localeCompare(b.name);
                        case 'price-low':
                            return a.price - b.price;
                        case 'price-high':
                            return b.price - a.price;
                        case 'newest':
                            return new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
                        default:
                            return 0;
                    }
                });
        
                // Display filtered products
                displayFilteredProducts(filteredProducts);
            }
        
            function displayFilteredProducts(products) {
                if (products.length === 0) {
                    productsContainer.innerHTML = '<p class="no-products">No products match your filters</p>';
                    return;
                }
        
                productsContainer.innerHTML = '';
                products.forEach((product, index) => {
                    setTimeout(() => {
                        const productCard = createEnhancedProductCard(product, index);
                        productsContainer.appendChild(productCard);
        
                        setTimeout(() => {
                            productCard.classList.add('loaded');
                        }, 50);
                    }, index * 100);
                });
            }
        
            function clearAllFilters() {
                document.getElementById('sortBy').value = 'name';
                document.getElementById('filterMaterial').value = 'all';
                document.getElementById('filterPrice').value = 'all';
                applyFilters();
            }
        
            // Initialize filtering
            getAllProducts();
            createFilterControls();
            applyFilters();
        }
        
        // Enhanced notification system
        function showEnhancedNotification(message, type = 'info', options = {}) {
            const {
                showCartButton = false,
                autoHide = true,
                duration = 4000,
                showCloseButton = true
            } = options;
        
            // Remove existing notifications
            const existingNotifications = document.querySelectorAll('.enhanced-notification');
            existingNotifications.forEach(notification => notification.remove());
        
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `enhanced-notification notification-${type}`;
        
            const colors = {
                success: '#10b981',
                error: '#ef4444',
                warning: '#f59e0b',
                info: '#3b82f6'
            };
        
            notification.innerHTML = `
                <div class="notification-icon">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-message">${message}</div>
                    ${showCartButton ? '<button class="notification-cart-btn">View Cart</button>' : ''}
                </div>
                ${showCloseButton ? '<button class="notification-close">&times;</button>' : ''}
            `;
        
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${colors[type] || colors.info};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
                z-index: 3000;
                display: flex;
                align-items: center;
                gap: 1rem;
                min-width: 300px;
                max-width: 500px;
                animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                backdrop-filter: blur(10px);
            `;
        
            document.body.appendChild(notification);
        
            // Add event listeners
            if (showCartButton) {
                notification.querySelector('.notification-cart-btn').addEventListener('click', () => {
                    showCartModal();
                    notification.remove();
                });
            }
        
            if (showCloseButton) {
                notification.querySelector('.notification-close').addEventListener('click', () => {
                    removeNotification();
                });
            }
        
            // Auto hide
            if (autoHide) {
                setTimeout(removeNotification, duration);
            }
        
            function removeNotification() {
                notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 400);
            }
        
            // Announce to screen readers
            if (window.announceToScreenReader) {
                window.announceToScreenReader(`${type}: ${message}`);
            }
        }
        
        // Initialize all advanced features
        document.addEventListener('DOMContentLoaded', function() {
            initAdvancedAnimations();
            initSmoothScrolling();
            initLoadingStates();
            initPerformanceOptimizations();
            initAccessibilityFeatures();
            initErrorHandling();
            initProductFiltering();
        
            // Add page transition effects
            document.body.classList.add('page-transition', 'fade-in');
        
            // Add loading screen for initial page load
            const loadingScreen = document.createElement('div');
            loadingScreen.className = 'loading-screen';
            loadingScreen.innerHTML = `
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <h2>Loading T-Shirt Store...</h2>
                    <div class="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
            loadingScreen.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                color: white;
                flex-direction: column;
                gap: 1rem;
            `;
        
            document.body.appendChild(loadingScreen);
        
            // Remove loading screen after a delay
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transform = 'translateY(-100%)';
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 1500);
        });

        // Animate modal in
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);

        function updateQuantity(itemId, action) {
            const item = cart.find(item => item.id == itemId);
            if (item) {
                if (action === 'increase') {
                    item.quantity++;
                } else if (action === 'decrease' && item.quantity > 1) {
                    item.quantity--;
                }

                localStorage.setItem('tshirtCart', JSON.stringify(cart));
                updateCartCount();
                refreshCartModal();
                showEnhancedNotification('Cart updated!', 'success');
            }
        }

        function removeCartItem(itemId) {
            cart = cart.filter(item => item.id != itemId);
            localStorage.setItem('tshirtCart', JSON.stringify(cart));
            updateCartCount();
            refreshCartModal();
            showEnhancedNotification('Item removed from cart', 'info');
        }

        function calculateTotal() {
            return cart.reduce((total, item) => {
                const price = parseInt(item.price.replace(/[^\d]/g, ''));
                return total + (price * item.quantity);
            }, 0);
        }

        function refreshCartModal() {
            const modalBody = modal.querySelector('.cart-modal-body');
            const modalFooter = modal.querySelector('.cart-modal-footer');

            if (cart.length === 0) {
                modalBody.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
                modalFooter.style.display = 'none';
                return;
            }

            modalFooter.style.display = 'block';
            modalFooter.querySelector('.cart-total strong').textContent = `Total: ₹${calculateTotal().toLocaleString('en-IN')}`;
        }

        function closeCartModal() {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }
}

// Advanced Search with Auto-complete and Filters
function initAdvancedSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchInput && searchBtn) {
        let searchTimeout;
        let searchSuggestions = [];

        // Create search suggestions dropdown
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'search-suggestions';
        suggestionsContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid var(--border-color);
            border-top: none;
            border-radius: 0 0 var(--border-radius) var(--border-radius);
            box-shadow: var(--shadow-lg);
            max-height: 300px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
        `;
        searchInput.parentElement.style.position = 'relative';
        searchInput.parentElement.appendChild(suggestionsContainer);

        // Search functionality
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value.trim());
        });

        searchInput.addEventListener('input', function() {
            const query = this.value.trim();

            // Clear previous timeout
            clearTimeout(searchTimeout);

            if (query.length < 2) {
                suggestionsContainer.style.display = 'none';
                return;
            }

            // Debounce search suggestions
            searchTimeout = setTimeout(() => {
                showSearchSuggestions(query);
            }, 300);
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value.trim());
            }
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.parentElement.contains(e.target)) {
                suggestionsContainer.style.display = 'none';
            }
        });

        function showSearchSuggestions(query) {
            const products = JSON.parse(localStorage.getItem('middleClassProducts')) || [];
            const suggestions = [];

            // Filter products based on query
            products.forEach(product => {
                if (product.name.toLowerCase().includes(query.toLowerCase()) ||
                    (product.material && product.material.toLowerCase().includes(query.toLowerCase())) ||
                    (product.colors && product.colors.toLowerCase().includes(query.toLowerCase()))) {
                    suggestions.push(product);
                }
            });

            if (suggestions.length === 0) {
                suggestionsContainer.style.display = 'none';
                return;
            }

            suggestionsContainer.innerHTML = suggestions.slice(0, 5).map(product => `
                <div class="search-suggestion" data-product-id="${product.id}">
                    <img src="${product.image || '../assets/images/placeholder.jpg'}"
                         alt="${product.name}" onerror="this.src='../assets/images/placeholder.jpg'">
                    <div class="suggestion-details">
                        <div class="suggestion-name">${product.name}</div>
                        <div class="suggestion-price">${product.price ? '₹' + product.price.toLocaleString('en-IN') : ''}</div>
                    </div>
                </div>
            `).join('');

            suggestionsContainer.style.display = 'block';

            // Add click handlers to suggestions
            suggestionsContainer.querySelectorAll('.search-suggestion').forEach(suggestion => {
                suggestion.addEventListener('click', function() {
                    const productId = this.dataset.productId;
                    showProductDetails(productId);
                    suggestionsContainer.style.display = 'none';
                    searchInput.value = '';
                });
            });
        }

        function performSearch(query) {
            if (!query) {
                showEnhancedNotification('Please enter a search term', 'warning');
                return;
            }

            showEnhancedNotification(`Searching for "${query}"...`, 'info');

            // Filter and display search results
            const products = JSON.parse(localStorage.getItem('middleClassProducts')) || [];
            const results = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                (product.material && product.material.toLowerCase().includes(query.toLowerCase())) ||
                (product.colors && product.colors.toLowerCase().includes(query.toLowerCase()))
            );

            if (results.length === 0) {
                showEnhancedNotification(`No results found for "${query}"`, 'info');
                return;
            }

            // Scroll to products section
            const productsSection = document.querySelector('.deals-section');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }

            showEnhancedNotification(`Found ${results.length} result(s) for "${query}"`, 'success');
        }

        function showProductDetails(productId) {
            const products = JSON.parse(localStorage.getItem('middleClassProducts')) || [];
            const product = products.find(p => p.id == productId);

            if (product) {
                showEnhancedNotification(`Viewing: ${product.name}`, 'info');
                // In a real app, this would open a product detail modal
            }
        }
    }
}

// Product interactions
function initProductInteractions() {
    const productCards = document.querySelectorAll('.product-card, .deal-card, .category-card');

    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                return;
            }

            // Add hover effect
            this.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);

            showNotification('Product details would open here', 'info');
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const categoryBtn = document.querySelector('.category-btn');

    if (categoryBtn) {
        categoryBtn.addEventListener('click', function() {
            showNotification('Categories menu would open here', 'info');
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
        max-width: 300px;
        word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
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

    .notification {
        z-index: 3000;
    }

    .search-input:focus {
        box-shadow: 0 0 0 2px rgba(56, 178, 172, 0.2);
    }

    .product-card:hover {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .deal-card:hover {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .category-card:hover {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .add-to-cart:active {
        transform: scale(0.95);
    }

    .cart-btn:hover {
        background: #e7f1ff;
    }

    .login-btn:hover {
        background: #1a73e8;
    }

    .category-btn:hover {
        background: #1a73e8;
    }

    .shop-now-btn:hover {
        background: #f8f9fa;
        color: #2874f0;
    }

    .convert-btn:hover {
        background: #1a73e8;
    }

    .swap-btn:hover {
        background: #1a73e8;
    }

    .search-btn:hover {
        background: #1a73e8;
    }

    .view-all:hover {
        color: #1a73e8;
    }

    .nav-menu a:hover {
        color: #2874f0;
    }

    .nav-link:hover {
        color: #2874f0;
    }
`;
document.head.appendChild(style);

// Utility functions
function formatIndianPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

function calculateEMI(price, months = 3) {
    const monthlyAmount = Math.round(price / months);
    return `No Cost EMI from ${formatIndianPrice(monthlyAmount)}/month`;
}

// Advanced Product Loading with Performance Optimizations
function loadProductsFromAdmin() {
    const featuredProductsContainer = document.getElementById('featuredProducts');
    const noProductsMessage = document.getElementById('noProductsMessage');

    // Show loading state
    showLoadingState(featuredProductsContainer);

    // Get T-shirts from localStorage (uploaded by admin)
    const products = JSON.parse(localStorage.getItem('middleClassProducts')) || [];

    // Simulate async loading for better UX
    setTimeout(() => {
        if (products.length === 0) {
            hideLoadingState();
            noProductsMessage.style.display = 'block';
            noProductsMessage.style.animation = 'fadeInUp 0.5s ease-out';
            return;
        }

        // Hide no products message
        noProductsMessage.style.display = 'none';

        // Clear existing products
        featuredProductsContainer.innerHTML = '';

        // Display T-shirts with staggered animation
        products.forEach((product, index) => {
            setTimeout(() => {
                const productCard = createEnhancedProductCard(product, index);
                featuredProductsContainer.appendChild(productCard);

                // Trigger animation
                setTimeout(() => {
                    productCard.classList.add('loaded');
                }, 50);
            }, index * 100); // Stagger animation
        });

        hideLoadingState();

        // Re-initialize cart functionality for new buttons
        initAdvancedCart();
    }, 800); // Simulate loading time
}

function createEnhancedProductCard(product, index) {
    const discount = product.originalPrice > product.price ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    const productCard = document.createElement('div');
    productCard.className = 'deal-card card-hover-effect';
    productCard.setAttribute('role', 'article');
    productCard.setAttribute('aria-label', `T-shirt: ${product.name}`);

    productCard.innerHTML = `
        ${discount > 0 ? `<div class="deal-badge" aria-label="${discount}% discount">${discount}% OFF</div>` : ''}
        <div class="product-image">
            <img src="${product.image || '../assets/images/placeholder.jpg'}"
                 alt="${product.name}"
                 loading="lazy"
                 onerror="this.src='../assets/images/placeholder.jpg'">
        </div>
        <div class="deal-info">
            <h3>${product.name}</h3>
            <div class="price-info">
                <span class="current-price">₹${product.price.toLocaleString('en-IN')}</span>
                ${product.originalPrice > product.price ? `<span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                ${discount > 0 ? `<span class="discount">${discount}% off</span>` : ''}
            </div>
            <div class="tshirt-details">
                ${product.material ? `<div class="tshirt-material"><strong>Material:</strong> ${product.material}</div>` : ''}
                ${product.sizes ? `<div class="tshirt-sizes"><strong>Sizes:</strong> ${product.sizes}</div>` : ''}
                ${product.colors ? `<div class="tshirt-colors"><strong>Colors:</strong> ${product.colors}</div>` : ''}
            </div>
            <div class="rating" role="img" aria-label="4.5 out of 5 stars">
                <i class="fas fa-star" aria-hidden="true"></i>
                <i class="fas fa-star" aria-hidden="true"></i>
                <i class="fas fa-star" aria-hidden="true"></i>
                <i class="fas fa-star" aria-hidden="true"></i>
                <i class="fas fa-star-half-alt" aria-hidden="true"></i>
                <span>(4.5)</span>
            </div>
            <div class="offers">
                <div class="offer">Free delivery</div>
                <div class="offer">Size exchange available</div>
            </div>
            <button class="add-to-cart btn-advanced" data-product-id="${index}" aria-label="Add ${product.name} to cart">
                Add to Cart
            </button>
        </div>
    `;

    return productCard;
}

function showLoadingState(container) {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-state';
    loadingDiv.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Loading T-shirts...</p>
    `;
    loadingDiv.style.cssText = `
        text-align: center;
        padding: 3rem;
        animation: fadeInUp 0.3s ease-out;
    `;
    container.appendChild(loadingDiv);
}

function hideLoadingState() {
    const loadingState = document.querySelector('.loading-state');
    if (loadingState) {
        loadingState.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => loadingState.remove(), 300);
    }
}

// Initialize product prices with Indian currency
document.addEventListener('DOMContentLoaded', function() {
    // Set initial prices in INR
    const priceElements = document.querySelectorAll('.current-price, .original-price');
    priceElements.forEach(element => {
        if (!element.textContent.includes('₹')) {
            const priceMatch = element.textContent.match(/(\d+)/);
            if (priceMatch) {
                const price = parseInt(priceMatch[1]);
                element.textContent = formatIndianPrice(price);
            }
        }
    });

    // Set EMI information
    const emiElements = document.querySelectorAll('.emi-info');
    emiElements.forEach(element => {
        if (!element.textContent.includes('₹')) {
            const card = element.closest('.deal-card');
            if (card) {
                const priceElement = card.querySelector('.current-price');
                if (priceElement) {
                    const priceMatch = priceElement.textContent.match(/₹([\d,]+)/);
                    if (priceMatch) {
                        const price = parseInt(priceMatch[1].replace(/,/g, ''));
                        element.textContent = calculateEMI(price);
                    }
                }
            }
        }
    });
});