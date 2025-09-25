// Admin Panel JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize admin functionality
    initAdmin();
});

// Admin initialization
function initAdmin() {
    const currentPage = window.location.pathname;

    if (currentPage.includes('login.html')) {
        initLogin();
    } else if (currentPage.includes('dashboard.html')) {
        initDashboard();
    }
}

// Login functionality
function initLogin() {
    const loginForm = document.getElementById('loginForm');
    const passwordToggle = document.getElementById('passwordToggle');
    const emailInput = document.getElementById('email');

    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Real-time email validation
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            const authorizedEmail = '7904084589y@gmail.com';

            if (email && !validateEmail(email)) {
                showNotification('Please enter a valid email address!', 'error');
                this.focus();
                return;
            }

            if (email && email !== authorizedEmail) {
                showNotification('This email is not authorized for admin access.', 'warning');
            }
        });

        emailInput.addEventListener('input', function() {
            const email = this.value;
            const authorizedEmail = '7904084589y@gmail.com';

            // Remove existing classes
            this.classList.remove('authorized-email', 'unauthorized-email');

            if (email === authorizedEmail) {
                this.classList.add('authorized-email');
            } else if (email && validateEmail(email)) {
                this.classList.add('unauthorized-email');
            }
        });
    }

    // Password toggle
    if (passwordToggle) {
        passwordToggle.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const icon = this.querySelector('i');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                passwordInput.type = 'password';
                icon.className = 'fas fa-eye';
            }
        });
    }

    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            // Authorized email check
            const authorizedEmail = '7904084589y@gmail.com';

            if (email === authorizedEmail && password === 'admin123') {
                // Store session
                const sessionData = {
                    email: email,
                    loginTime: new Date().toISOString(),
                    rememberMe: rememberMe,
                    authorized: true
                };

                localStorage.setItem('adminSession', JSON.stringify(sessionData));

                // Show success message
                showNotification('Login successful! Redirecting...', 'success');

                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                if (email !== authorizedEmail) {
                    showNotification('Access Denied! This email is not authorized for admin access.', 'error');
                } else {
                    showNotification('Invalid password!', 'error');
                }
            }
        });
    }
}

// Dashboard functionality
function initDashboard() {
    // Check authentication
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    // Initialize dashboard components
    initSidebar();
    initFashionManagement();
    initAnalytics();
    initSettings();
    loadDashboardData();
}

// Authentication check
function isAuthenticated() {
    const session = localStorage.getItem('adminSession');
    if (!session) return false;

    try {
        const sessionData = JSON.parse(session);
        // Check if email is authorized and session is valid
        const authorizedEmail = '7904084589y@gmail.com';
        return sessionData.email === authorizedEmail && sessionData.authorized === true;
    } catch (e) {
        return false;
    }
}

// Sidebar functionality
function initSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const navItems = document.querySelectorAll('.nav-item');
    const logoutBtn = document.getElementById('logoutBtn');

    // Sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            const sidebar = document.getElementById('adminSidebar');
            sidebar.classList.toggle('active');
        });
    }

    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            const pageId = this.dataset.page;

            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            document.querySelectorAll('.admin-page').forEach(page => page.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Show corresponding page
            const targetPage = document.getElementById(pageId + 'Page');
            if (targetPage) {
                targetPage.classList.add('active');
            }

            // Close sidebar on mobile
            const sidebar = document.getElementById('adminSidebar');
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('adminSession');
            showNotification('Logged out successfully!', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }
}

// T-Shirt management
function initFashionManagement() {
    const addTshirtButton = document.getElementById('addFashionProduct');

    if (addTshirtButton) {
        addTshirtButton.addEventListener('click', () => openProductModal('fashion'));
    }

    // Load existing T-shirt products
    loadProducts('fashion');
}

// Load products from localStorage
function loadProducts(category) {
    const products = getProducts(category);
    const tbody = document.getElementById(category + 'ProductsBody');

    if (!tbody) return;

    tbody.innerHTML = '';

    products.forEach(product => {
        const row = createProductRow(product, category);
        tbody.appendChild(row);
    });

    // Update stats
    updateStats();
}

// Create product table row
function createProductRow(product, category) {
    const row = document.createElement('tr');

    const imageCell = document.createElement('td');
    const image = document.createElement('img');
    image.src = product.image || '../assets/images/placeholder.jpg';
    image.alt = product.name;
    image.className = 'product-image';
    imageCell.appendChild(image);

    const nameCell = document.createElement('td');
    nameCell.innerHTML = `<div class="product-name">${product.name}</div>`;

    const priceCell = document.createElement('td');
    priceCell.innerHTML = `<div class="product-price">$${product.price}</div>`;

    const specsCell = document.createElement('td');
    let specs = '';
    if (category === 'fashion') {
        specs = product.sizes ? `Sizes: ${product.sizes}` : 'No specs';
    } else if (category === 'phones') {
        specs = product.storage ? `Storage: ${product.storage}` : 'No specs';
    } else if (category === 'laptops') {
        specs = product.processor ? `Processor: ${product.processor}` : 'No specs';
    }
    specsCell.innerHTML = `<div class="product-specs">${specs}</div>`;

    const stockCell = document.createElement('td');
    const status = product.stock > 0 ? 'In Stock' : 'Out of Stock';
    const statusClass = product.stock > 0 ? 'status-active' : 'status-out-of-stock';
    stockCell.innerHTML = `<span class="status-badge ${statusClass}">${status} (${product.stock})</span>`;

    const actionsCell = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.className = 'btn-icon btn-edit';
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.onclick = () => editProduct(product, category);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-icon btn-delete';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.onclick = () => deleteProduct(product.id, category);

    actionsCell.appendChild(editBtn);
    actionsCell.appendChild(deleteBtn);

    row.appendChild(imageCell);
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(specsCell);
    row.appendChild(stockCell);
    row.appendChild(actionsCell);

    return row;
}

// Open product modal
function openProductModal(category, product = null) {
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('productForm');

    // Reset form
    form.reset();
    document.getElementById('productId').value = '';
    document.getElementById('productCategory').value = category;

    // Hide all category fields
    document.querySelectorAll('.category-fields').forEach(field => {
        field.style.display = 'none';
    });

    // Show relevant category fields
    const categoryFields = document.getElementById(category + 'Fields');
    if (categoryFields) {
        categoryFields.style.display = 'block';
    }

    if (product) {
        // Edit mode
        modalTitle.textContent = 'Edit Product';
        populateForm(product);
    } else {
        // Add mode
        modalTitle.textContent = 'Add New Product';
    }

    modal.classList.add('active');
}

// Populate form for editing
function populateForm(product) {
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productStatus').value = product.status || 'active';
    document.getElementById('productImage').value = product.image || '';

    // T-shirt-specific fields
    if (product.sizes) document.getElementById('productSizes').value = product.sizes;
    if (product.colors) document.getElementById('productColors').value = product.colors;
    if (product.material) document.getElementById('productMaterial').value = product.material;
    if (product.type) document.getElementById('productType').value = product.type;
    if (product.storage) document.getElementById('productStorage').value = product.storage;
    if (product.ram) document.getElementById('productRam').value = product.ram;
    if (product.display) document.getElementById('productDisplay').value = product.display;
    if (product.processor) document.getElementById('productProcessor').value = product.processor;
    if (product.ramLaptop) document.getElementById('productRamLaptop').value = product.ramLaptop;
    if (product.storageLaptop) document.getElementById('productStorageLaptop').value = product.storageLaptop;
    if (product.displayLaptop) document.getElementById('productDisplayLaptop').value = product.displayLaptop;
}

// Save product
function saveProduct(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const productData = {
        id: document.getElementById('productId').value || generateId(),
        name: formData.get('productName'),
        price: parseFloat(formData.get('productPrice')),
        description: formData.get('productDescription'),
        stock: parseInt(formData.get('productStock')),
        status: formData.get('productStatus'),
        image: formData.get('productImage'),
        category: formData.get('productCategory'),
        createdAt: new Date().toISOString()
    };

    // Add T-shirt-specific data
    const category = formData.get('productCategory');
    if (category === 'fashion') {
        productData.sizes = formData.get('productSizes');
        productData.colors = formData.get('productColors');
        productData.material = formData.get('productMaterial');
        productData.type = formData.get('productType');
    }

    // Save to localStorage
    saveProductData(productData);

    // Close modal and refresh
    closeModal();
    loadProducts(category);
    showNotification('Product saved successfully!', 'success');
}

// Delete product
function deleteProduct(productId, category) {
    if (confirm('Are you sure you want to delete this product?')) {
        const products = getProducts(category);
        const updatedProducts = products.filter(p => p.id !== productId);
        saveProducts(category, updatedProducts);

        // Also remove from combined products list
        removeFromCombinedProducts(productId);

        loadProducts(category);
        showNotification('Product deleted successfully!', 'success');
    }
}

function removeFromCombinedProducts(productId) {
    const combinedKey = 'middleClassProducts';
    const existingProducts = JSON.parse(localStorage.getItem(combinedKey)) || [];
    const updatedProducts = existingProducts.filter(p => p.id !== productId);
    localStorage.setItem(combinedKey, JSON.stringify(updatedProducts));
}

// Edit product
function editProduct(product, category) {
    openProductModal(category, product);
}

// Modal functionality
function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
}

document.getElementById('closeModal')?.addEventListener('click', closeModal);
document.getElementById('cancelProduct')?.addEventListener('click', closeModal);

// Form submission
document.getElementById('productForm')?.addEventListener('submit', saveProduct);

// Product data management
function getProducts(category) {
    const key = `products_${category}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : getDefaultProducts(category);
}

function saveProducts(category, products) {
    const key = `products_${category}`;
    localStorage.setItem(key, JSON.stringify(products));
}

function saveProductData(product) {
    const category = product.category;
    const products = getProducts(category);
    const existingIndex = products.findIndex(p => p.id === product.id);

    if (existingIndex >= 0) {
        products[existingIndex] = product;
    } else {
        products.push(product);
    }

    saveProducts(category, products);

    // Also save to combined products list for homepage
    saveToCombinedProducts(product);
}

function saveToCombinedProducts(product) {
    const combinedKey = 'middleClassProducts';
    const existingProducts = JSON.parse(localStorage.getItem(combinedKey)) || [];
    const existingIndex = existingProducts.findIndex(p => p.id === product.id);

    if (existingIndex >= 0) {
        existingProducts[existingIndex] = product;
    } else {
        existingProducts.push(product);
    }

    localStorage.setItem(combinedKey, JSON.stringify(existingProducts));
}

// Default T-shirt products for demo
function getDefaultProducts(category) {
    const defaults = {
        fashion: [
            {
                id: '1',
                name: 'Classic Cotton T-Shirt',
                price: 299,
                description: 'Premium quality 100% cotton T-shirt, comfortable and breathable.',
                stock: 50,
                status: 'active',
                image: '../assets/images/tshirt1.jpg',
                sizes: 'S,M,L,XL,XXL',
                colors: 'White,Black,Navy Blue,Gray',
                category: 'fashion',
                material: '100% Cotton',
                type: 'Basic T-Shirt'
            },
            {
                id: '2',
                name: 'Printed Graphic T-Shirt',
                price: 399,
                description: 'Trendy printed T-shirt with unique graphic design.',
                stock: 30,
                status: 'active',
                image: '../assets/images/tshirt2.jpg',
                sizes: 'S,M,L,XL,XXL',
                colors: 'White,Black,Red,Blue',
                category: 'fashion',
                material: 'Cotton Blend',
                type: 'Printed T-Shirt'
            },
            {
                id: '3',
                name: 'Premium Polo T-Shirt',
                price: 599,
                description: 'High-quality polo T-shirt perfect for casual and semi-formal wear.',
                stock: 25,
                status: 'active',
                image: '../assets/images/tshirt3.jpg',
                sizes: 'S,M,L,XL,XXL',
                colors: 'White,Black,Navy Blue,Maroon',
                category: 'fashion',
                material: 'Pique Cotton',
                type: 'Polo T-Shirt'
            }
        ]
    };

    return defaults[category] || [];
}

// Update dashboard stats
function updateStats() {
    const fashionCount = getProducts('fashion').length;
    const total = fashionCount;

    document.getElementById('fashionCount').textContent = fashionCount;
    document.getElementById('totalProducts').textContent = total;
}

// Analytics functionality
function initAnalytics() {
    // Simple analytics data (in production, use real analytics)
    const analyticsData = {
        pageViews: Math.floor(Math.random() * 10000) + 5000,
        productViews: Math.floor(Math.random() * 5000) + 1000
    };

    document.getElementById('pageViews').textContent = analyticsData.pageViews.toLocaleString();
    document.getElementById('productViews').textContent = analyticsData.productViews.toLocaleString();

    // Simple chart simulation
    drawSimpleChart('viewsChart', analyticsData.pageViews);
    drawSimpleChart('productChart', analyticsData.productViews);
}

// Simple chart drawing
function drawSimpleChart(canvasId, value) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const maxValue = 10000;
    const barWidth = (value / maxValue) * canvas.width;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw bar
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(0, 0, barWidth, canvas.height);

    // Draw value text
    ctx.fillStyle = '#1f2937';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(value.toLocaleString(), canvas.width / 2, canvas.height / 2 + 5);
}

// Settings functionality
function initSettings() {
    const generalForm = document.getElementById('generalSettings');
    const securityForm = document.getElementById('securitySettings');

    if (generalForm) {
        generalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Settings saved successfully!', 'success');
        });
    }

    if (securityForm) {
        securityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Password changed successfully!', 'success');
        });
    }
}

// Load dashboard data
function loadDashboardData() {
    updateStats();

    // Add some activity
    const activityList = document.getElementById('activityList');
    if (activityList) {
        const activities = [
            { action: 'Added new fashion product', time: '2 minutes ago' },
            { action: 'Updated phone specifications', time: '1 hour ago' },
            { action: 'Modified laptop pricing', time: '3 hours ago' },
            { action: 'System backup completed', time: '6 hours ago' }
        ];

        activityList.innerHTML = '';
        activities.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            item.innerHTML = `
                <div class="activity-icon">
                    <i class="fas fa-plus"></i>
                </div>
                <div class="activity-info">
                    <p>${activity.action}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            `;
            activityList.appendChild(item);
        });
    }
}

// Utility functions
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

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

    .notification {
        z-index: 3000;
    }

    .btn {
        transition: all 0.3s ease;
    }

    .btn:hover {
        transform: translateY(-1px);
    }

    .loading {
        position: relative;
        overflow: hidden;
    }

    .loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        animation: loading 1.5s infinite;
    }

    @keyframes loading {
        0% { left: -100%; }
        100% { left: 100%; }
    }
`;
document.head.appendChild(style);