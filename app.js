// Application State
let currentUser = null;
let cart = [];
let products = [];
let allProducts = [];
let currentCategory = 'all';
let selectedProduct = null;
let selectedSize = null;
let selectedColor = null;
let selectedQuantity = 1;
let paymentTimer = null;
let currentTheme = 'light';
let currentSort = 'featured';
let currentPriceFilter = 'all';
let searchQuery = '';

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadTheme();
    loadCartFromStorage();
    loadUserFromStorage();
    initializeEventListeners();
    updateCartUI();
    updateAuthUI();
    applyFilters();
});

// Load products data
function loadProducts() {
    allProducts = [
        {
            id: "1",
            name: "Urban Street Tee",
            price: 799,
            originalPrice: 999,
            category: "tshirts",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
            description: "Comfortable cotton blend street style t-shirt",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Black", "White", "Grey"],
            badge: "Sale"
        },
        {
            id: "2", 
            name: "Classic Cotton Tee",
            price: 649,
            category: "tshirts",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop",
            description: "Essential basic cotton t-shirt for everyday wear",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Black", "Navy", "White"],
            badge: "Trending"
        },
        {
            id: "3",
            name: "Graphic Print Tee", 
            price: 899,
            category: "tshirts",
            image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&h=600&fit=crop",
            description: "Bold graphic design on premium cotton fabric",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Black", "White", "Blue"],
            badge: "New"
        },
        {
            id: "4",
            name: "Designer Kurta",
            price: 1299,
            category: "kurtas", 
            image: "https://images.unsplash.com/photo-1594736797933-d0401ba19527?w=500&h=600&fit=crop",
            description: "Elegant designer kurta with intricate embroidery",
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: ["White", "Cream", "Blue"],
            badge: "Premium"
        },
        {
            id: "5",
            name: "Traditional Kurta",
            price: 999,
            originalPrice: 1199,
            category: "kurtas",
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=600&fit=crop", 
            description: "Classic traditional kurta for special occasions",
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: ["Maroon", "Golden", "Navy"],
            badge: "Sale"
        },
        {
            id: "6",
            name: "Casual Kurta",
            price: 849,
            category: "kurtas",
            image: "https://images.unsplash.com/photo-1564584217132-2271339881b4?w=500&h=600&fit=crop",
            description: "Comfortable casual kurta for daily wear",
            sizes: ["S", "M", "L", "XL"],
            colors: ["White", "Grey", "Black"],
            badge: "Trending"
        },
        {
            id: "7",
            name: "Vintage Tee",
            price: 749,
            category: "tshirts",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
            description: "Retro vintage style t-shirt with soft fabric",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Grey", "Black", "Brown"],
            badge: "New"
        },
        {
            id: "8",
            name: "Premium Polo",
            price: 1099,
            category: "tshirts",
            image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop",
            description: "High-quality polo shirt for smart casual look",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Navy", "White", "Grey"],
            badge: "Premium"
        },
        {
            id: "9",
            name: "Festive Kurta",
            price: 1599,
            category: "kurtas",
            image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500&h=600&fit=crop",
            description: "Special festive kurta with gold embroidery",
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: ["Maroon", "Royal Blue", "Golden"],
            badge: "Premium"
        },
        {
            id: "10",
            name: "Sports Tee",
            price: 599,
            category: "tshirts",
            image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=600&fit=crop",
            description: "Athletic performance t-shirt with moisture-wicking",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Black", "Blue", "Red"],
            badge: "Trending"
        },
        {
            id: "11",
            name: "Linen Kurta",
            price: 1149,
            category: "kurtas",
            image: "https://images.unsplash.com/photo-1506629905607-bb5bdd9c3d71?w=500&h=600&fit=crop",
            description: "Breathable linen kurta for summer comfort",
            sizes: ["S", "M", "L", "XL"],
            colors: ["White", "Beige", "Light Blue"],
            badge: "New"
        },
        {
            id: "12",
            name: "Henley Tee",
            price: 799,
            category: "tshirts",
            image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=600&fit=crop",
            description: "Classic henley style with button placket",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Grey", "Navy", "White"],
            badge: "Trending"
        },
        {
            id: "13",
            name: "Printed Kurta",
            price: 899,
            originalPrice: 1099,
            category: "kurtas",
            image: "https://images.unsplash.com/photo-1583743089695-4b816a340f82?w=500&h=600&fit=crop",
            description: "Stylish printed kurta with modern patterns",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Blue", "Green", "Purple"],
            badge: "Sale"
        },
        {
            id: "14",
            name: "V-Neck Tee",
            price: 699,
            category: "tshirts", 
            image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
            description: "Comfortable v-neck t-shirt in premium cotton",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Black", "White", "Grey"],
            badge: "New"
        },
        {
            id: "15",
            name: "Silk Kurta",
            price: 1799,
            category: "kurtas",
            image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&h=600&fit=crop",
            description: "Luxurious silk kurta for special occasions",
            sizes: ["S", "M", "L", "XL", "XXL"],
            colors: ["Golden", "Silver", "Maroon"],
            badge: "Premium"
        },
        {
            id: "16",
            name: "Oversized Tee",
            price: 849,
            category: "tshirts",
            image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=500&h=600&fit=crop",
            description: "Trendy oversized fit t-shirt for casual wear",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Black", "White", "Beige"],
            badge: "Trending"
        },
        {
            id: "17",
            name: "Embroidered Kurta",
            price: 1399,
            category: "kurtas",
            image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=500&h=600&fit=crop",
            description: "Handcrafted embroidered kurta with artistic details",
            sizes: ["S", "M", "L", "XL"],
            colors: ["White", "Cream", "Light Pink"],
            badge: "Premium"
        },
        {
            id: "18",
            name: "Long Sleeve Tee",
            price: 899,
            category: "tshirts",
            image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&h=600&fit=crop",
            description: "Comfortable long sleeve t-shirt for cooler days",
            sizes: ["S", "M", "L", "XL"],
            colors: ["Navy", "Grey", "Black"],
            badge: "New"
        }
    ];
    
    products = [...allProducts];
    displayProducts();
}

// Initialize event listeners
function initializeEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', toggleSearch);
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('clearSearch').addEventListener('click', clearSearch);

    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });

    // Filters
    document.getElementById('sortFilter').addEventListener('change', handleSortChange);
    document.getElementById('priceFilter').addEventListener('change', handlePriceFilterChange);

    // Cart
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', closeCart);
    document.getElementById('checkoutBtn').addEventListener('click', openPaymentModal);

    // Authentication
    document.getElementById('authBtn').addEventListener('click', openAuthModal);
    document.getElementById('signOutBtn').addEventListener('click', signOut);
    document.getElementById('closeAuth').addEventListener('click', closeAuthModal);
    document.getElementById('signinTab').addEventListener('click', () => switchAuthTab('signin'));
    document.getElementById('signupTab').addEventListener('click', () => switchAuthTab('signup'));
    document.getElementById('signinForm').addEventListener('submit', handleSignIn);
    document.getElementById('signupForm').addEventListener('submit', handleSignUp);

    // Account
    document.getElementById('accountBtn').addEventListener('click', openAccountModal);
    document.getElementById('closeAccount').addEventListener('click', closeAccountModal);
    document.getElementById('profileTab').addEventListener('click', () => switchAccountTab('profile'));
    document.getElementById('ordersTab').addEventListener('click', () => switchAccountTab('orders'));
    document.getElementById('analyticsTab').addEventListener('click', () => switchAccountTab('analytics'));

    // Payment
    document.getElementById('closePayment').addEventListener('click', closePaymentModal);
    document.getElementById('paymentCompleteBtn').addEventListener('click', processPayment);

    // Product modal
    document.getElementById('closeProduct').addEventListener('click', closeProductModal);
    document.getElementById('addToCartBtn').addEventListener('click', addToCartFromModal);
    document.getElementById('decreaseQty').addEventListener('click', () => updateProductQuantity(-1));
    document.getElementById('increaseQty').addEventListener('click', () => updateProductQuantity(1));

    // Success modal
    document.getElementById('whatsappBtn').addEventListener('click', redirectToWhatsApp);
    document.getElementById('continueShoppingBtn').addEventListener('click', closeSuccessModal);

    // Close modals on overlay click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('open');
            }
        });
    });
}

// Theme functions
function loadTheme() {
    const savedTheme = localStorage.getItem('kritiya_theme') || 'light';
    currentTheme = savedTheme;
    applyTheme();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme();
    localStorage.setItem('kritiya_theme', currentTheme);
}

function applyTheme() {
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
}

// Search functions
function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBar.classList.contains('hidden')) {
        searchBar.classList.remove('hidden');
        searchInput.focus();
    } else {
        searchBar.classList.add('hidden');
        clearSearch();
    }
}

function handleSearch(e) {
    searchQuery = e.target.value.toLowerCase();
    applyFilters();
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    searchQuery = '';
    applyFilters();
}

// Filter and sort functions
function filterByCategory(category) {
    currentCategory = category;
    
    // Update active navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-category') === category);
    });
    
    applyFilters();
}

function handleSortChange(e) {
    currentSort = e.target.value;
    applyFilters();
}

function handlePriceFilterChange(e) {
    currentPriceFilter = e.target.value;
    applyFilters();
}

function applyFilters() {
    let filteredProducts = [...allProducts];

    // Filter by category
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === currentCategory);
    }

    // Filter by search query
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchQuery) ||
            p.description.toLowerCase().includes(searchQuery)
        );
    }

    // Filter by price range
    if (currentPriceFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => {
            switch (currentPriceFilter) {
                case '0-500':
                    return p.price <= 500;
                case '500-1000':
                    return p.price > 500 && p.price <= 1000;
                case '1000-1500':
                    return p.price > 1000 && p.price <= 1500;
                case '1500+':
                    return p.price > 1500;
                default:
                    return true;
            }
        });
    }

    // Sort products
    switch (currentSort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Keep original order for featured
            break;
    }

    products = filteredProducts;
    displayProducts();
}

// Product display functions
function displayProducts() {
    const grid = document.getElementById('productGrid');
    
    grid.innerHTML = products.map(product => createProductCard(product)).join('');
    document.getElementById('productCount').textContent = products.length;

    // Add click listeners to product cards
    grid.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            openProductModal(productId);
        });
    });
}

function createProductCard(product) {
    const badgeClass = product.badge ? product.badge.toLowerCase() : '';
    const badge = product.badge ? `<span class="badge badge--${badgeClass}">${product.badge}</span>` : '';

    const originalPriceHtml = product.originalPrice 
        ? `<span class="product-original-price">₹${product.originalPrice}</span>` 
        : '';

    return `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-content">
                <div class="product-header">
                    <h4 class="product-name">${product.name}</h4>
                    <div class="product-badges">${badge}</div>
                </div>
                <div class="product-pricing">
                    <span class="product-price">₹${product.price}</span>
                    ${originalPriceHtml}
                </div>
                <p class="product-description">${product.description}</p>
            </div>
        </div>
    `;
}

// Product modal functions
function openProductModal(productId) {
    // Fix: Don't reset the category when opening product modal
    selectedProduct = allProducts.find(p => p.id === productId);
    if (!selectedProduct) return;

    // Populate modal content
    document.getElementById('productTitle').textContent = selectedProduct.name;
    document.getElementById('productImage').src = selectedProduct.image;
    document.getElementById('productImage').alt = selectedProduct.name;
    document.getElementById('productPrice').textContent = `₹${selectedProduct.price}`;
    document.getElementById('productDescription').textContent = selectedProduct.description;
    
    if (selectedProduct.originalPrice) {
        document.getElementById('productOriginalPrice').textContent = `₹${selectedProduct.originalPrice}`;
        document.getElementById('productOriginalPrice').style.display = 'inline';
    } else {
        document.getElementById('productOriginalPrice').style.display = 'none';
    }

    // Populate badges
    const badgeClass = selectedProduct.badge ? selectedProduct.badge.toLowerCase() : '';
    const badge = selectedProduct.badge ? `<span class="badge badge--${badgeClass}">${selectedProduct.badge}</span>` : '';
    document.getElementById('productBadges').innerHTML = badge;

    // Populate size options
    const sizeContainer = document.getElementById('sizeOptions');
    sizeContainer.innerHTML = selectedProduct.sizes.map(size => 
        `<button class="option-btn" data-size="${size}">${size}</button>`
    ).join('');

    // Populate color options
    const colorContainer = document.getElementById('colorOptions');
    colorContainer.innerHTML = selectedProduct.colors.map(color => 
        `<button class="option-btn" data-color="${color}">${color}</button>`
    ).join('');

    // Reset selections
    selectedSize = null;
    selectedColor = null;
    selectedQuantity = 1;
    document.getElementById('productQuantity').textContent = '1';

    // Add event listeners for options
    sizeContainer.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            sizeContainer.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedSize = this.getAttribute('data-size');
            updateAddToCartButton();
        });
    });

    colorContainer.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            colorContainer.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedColor = this.getAttribute('data-color');
            updateAddToCartButton();
        });
    });

    // Reset add to cart button
    updateAddToCartButton();

    document.getElementById('productModal').classList.add('open');
}

function updateProductQuantity(change) {
    selectedQuantity = Math.max(1, selectedQuantity + change);
    document.getElementById('productQuantity').textContent = selectedQuantity;
}

function updateAddToCartButton() {
    const addBtn = document.getElementById('addToCartBtn');
    if (selectedSize && selectedColor) {
        addBtn.disabled = false;
        addBtn.textContent = 'Add to Cart';
    } else {
        addBtn.disabled = true;
        addBtn.textContent = 'Select Size & Color';
    }
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('open');
    selectedProduct = null;
    selectedSize = null;
    selectedColor = null;
    selectedQuantity = 1;
}

function addToCartFromModal() {
    if (!selectedProduct || !selectedSize || !selectedColor) {
        showError('Please select size and color');
        return;
    }

    addToCart(selectedProduct, selectedSize, selectedColor, selectedQuantity);
    
    // Show success feedback
    const addBtn = document.getElementById('addToCartBtn');
    const originalText = addBtn.textContent;
    addBtn.textContent = 'Added! ✓';
    addBtn.style.background = 'var(--color-success)';
    
    setTimeout(() => {
        addBtn.textContent = originalText;
        addBtn.style.background = '';
        closeProductModal();
    }, 1000);
}

// Cart functions
function addToCart(product, size, color, quantity = 1) {
    const existingItem = cart.find(item => 
        item.id === product.id && item.size === size && item.color === color
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: size,
            color: color,
            quantity: quantity
        });
    }

    updateCartUI();
    saveCartToStorage();
    
    // Show cart count animation
    const cartCount = document.getElementById('cartCount');
    cartCount.style.animation = 'pulse 0.3s ease-in-out';
    setTimeout(() => {
        cartCount.style.animation = '';
    }, 300);
}

function removeFromCart(productId, size, color) {
    cart = cart.filter(item => 
        !(item.id === productId && item.size === size && item.color === color)
    );
    updateCartUI();
    saveCartToStorage();
}

function updateQuantity(productId, size, color, newQuantity) {
    const item = cart.find(item => 
        item.id === productId && item.size === size && item.color === color
    );
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId, size, color);
        } else {
            item.quantity = newQuantity;
            updateCartUI();
            saveCartToStorage();
        }
    }
}

function updateCartUI() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    cartCountElement.textContent = cartCount;
    
    // Show/hide cart count badge
    if (cartCount > 0) {
        cartCountElement.style.display = 'block';
    } else {
        cartCountElement.style.display = 'none';
    }

    const cartItems = document.getElementById('cartItems');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Your cart is empty<br>Add some products to get started!</div>';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => createCartItem(item)).join('');
        checkoutBtn.disabled = false;

        // Add event listeners to cart items
        cartItems.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                const size = this.getAttribute('data-size');
                const color = this.getAttribute('data-color');
                const action = this.getAttribute('data-action');
                const currentQuantity = parseInt(this.getAttribute('data-quantity'));

                const newQuantity = action === 'increase' ? currentQuantity + 1 : currentQuantity - 1;
                updateQuantity(productId, size, color, newQuantity);
            });
        });

        cartItems.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                const size = this.getAttribute('data-size');
                const color = this.getAttribute('data-color');
                removeFromCart(productId, size, color);
            });
        });
    }

    updateCartTotals();
}

function createCartItem(item) {
    return `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-options">Size: ${item.size} | Color: ${item.color}</div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}" data-action="decrease" data-quantity="${item.quantity}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}" data-action="increase" data-quantity="${item.quantity}">+</button>
                    </div>
                    <div class="cart-item-price">₹${item.price * item.quantity}</div>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">×</button>
        </div>
    `;
}

function updateCartTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    document.getElementById('cartSubtotal').textContent = `₹${subtotal}`;
    document.getElementById('cartTax').textContent = `₹${tax}`;
    document.getElementById('cartTotal').textContent = `₹${total}`;
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('open');
}

// Authentication functions
function openAuthModal() {
    document.getElementById('authModal').classList.add('open');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('open');
    clearAuthError();
}

function switchAuthTab(tab) {
    const signinTab = document.getElementById('signinTab');
    const signupTab = document.getElementById('signupTab');
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');
    const authTitle = document.getElementById('authTitle');

    if (tab === 'signin') {
        signinTab.classList.add('active');
        signupTab.classList.remove('active');
        signinForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        authTitle.textContent = 'Sign In to Kritiya';
    } else {
        signupTab.classList.add('active');
        signinTab.classList.remove('active');
        signupForm.classList.remove('hidden');
        signinForm.classList.add('hidden');
        authTitle.textContent = 'Create Account';
    }
    clearAuthError();
}

function handleSignIn(e) {
    e.preventDefault();
    
    const phone = document.getElementById('signinPhone').value;
    const password = document.getElementById('signinPassword').value;

    if (!phone || !password) {
        showAuthError('Please fill in all fields');
        return;
    }

    // Validate phone format
    if (!isValidPhone(phone)) {
        showAuthError('Please enter a valid phone number');
        return;
    }

    const users = getUsers();
    const user = users.find(u => u.phone === phone && u.password === password);

    if (user) {
        currentUser = user;
        updateAuthUI();
        closeAuthModal();
        saveUserToStorage();
        showSuccess('Welcome back! You are now signed in.');
    } else {
        showAuthError('Invalid phone number or password');
    }
}

function handleSignUp(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const phone = document.getElementById('signupPhone').value;
    const upi = document.getElementById('signupUpi').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!name || !phone || !upi || !password || !confirmPassword) {
        showAuthError('Please fill in all fields');
        return;
    }

    if (!isValidPhone(phone)) {
        showAuthError('Please enter a valid phone number');
        return;
    }

    if (!isValidUPI(upi)) {
        showAuthError('Please enter a valid UPI ID');
        return;
    }

    if (password !== confirmPassword) {
        showAuthError('Passwords do not match');
        return;
    }

    if (password.length < 6) {
        showAuthError('Password must be at least 6 characters long');
        return;
    }

    const users = getUsers();
    if (users.find(u => u.phone === phone)) {
        showAuthError('An account with this phone number already exists');
        return;
    }

    const newUser = {
        id: Date.now().toString(),
        name: name,
        phone: phone,
        upi: upi,
        password: password,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    currentUser = newUser;
    updateAuthUI();
    closeAuthModal();
    saveUserToStorage();
    showSuccess('Account created successfully! Welcome to Kritiya.');
}

function signOut() {
    currentUser = null;
    updateAuthUI();
    localStorage.removeItem('kritiya_user');
    showSuccess('You have been signed out.');
}

function updateAuthUI() {
    const authBtn = document.getElementById('authBtn');
    const userProfile = document.getElementById('userProfile');

    if (currentUser) {
        authBtn.classList.add('hidden');
        userProfile.classList.remove('hidden');
        
        document.getElementById('userAvatar').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=21808d&color=fff`;
        document.getElementById('userAvatar').alt = currentUser.name;
        document.getElementById('userName').textContent = currentUser.name;
    } else {
        authBtn.classList.remove('hidden');
        userProfile.classList.add('hidden');
    }
}

// Account management functions
function openAccountModal() {
    if (!currentUser) {
        showError('Please sign in to access your account');
        return;
    }

    populateAccountData();
    document.getElementById('accountModal').classList.add('open');
}

function closeAccountModal() {
    document.getElementById('accountModal').classList.remove('open');
}

function switchAccountTab(tab) {
    const tabs = ['profile', 'orders', 'analytics'];
    
    tabs.forEach(t => {
        document.getElementById(`${t}Tab`).classList.toggle('active', t === tab);
        document.getElementById(`${t}Section`).classList.toggle('hidden', t !== tab);
    });

    if (tab === 'orders') {
        populateOrderHistory();
    } else if (tab === 'analytics') {
        populateAnalytics();
    }
}

function populateAccountData() {
    if (!currentUser) return;

    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profilePhone').textContent = currentUser.phone;
    document.getElementById('profileUpi').textContent = currentUser.upi;
}

function populateOrderHistory() {
    const orders = getUserOrders();
    const ordersList = document.getElementById('ordersList');

    if (orders.length === 0) {
        ordersList.innerHTML = '<div class="cart-empty">No orders yet<br>Start shopping to see your order history!</div>';
        return;
    }

    ordersList.innerHTML = orders.map(order => `
        <div class="order-item">
            <div class="order-header">
                <span class="order-id">Order #${order.id}</span>
                <span class="order-date">${new Date(order.date).toLocaleDateString()}</span>
            </div>
            <div class="order-items">
                ${order.items.map(item => `${item.name} (${item.size}, ${item.color}) - Qty: ${item.quantity}`).join('<br>')}
            </div>
            <div class="order-total">Total: ₹${order.total}</div>
        </div>
    `).join('');
}

function populateAnalytics() {
    const orders = getUserOrders();
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const avgOrder = totalOrders > 0 ? Math.round(totalSpent / totalOrders) : 0;

    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('totalSpent').textContent = `₹${totalSpent}`;
    document.getElementById('avgOrder').textContent = `₹${avgOrder}`;
}

// Payment functions
function openPaymentModal() {
    if (!currentUser) {
        showError('Please sign in to proceed with checkout');
        openAuthModal();
        return;
    }

    if (cart.length === 0) {
        showError('Your cart is empty');
        return;
    }

    closeCart();
    
    // Populate order summary
    const orderItems = document.getElementById('paymentOrderItems');
    orderItems.innerHTML = cart.map(item => `
        <div class="payment-order-item">
            <div class="payment-item-details">
                <div class="payment-item-name">${item.name}</div>
                <div class="payment-item-options">Size: ${item.size} | Color: ${item.color} | Qty: ${item.quantity}</div>
            </div>
            <div class="payment-item-price">₹${item.price * item.quantity}</div>
        </div>
    `).join('');

    // Update totals
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    document.getElementById('paymentSubtotal').textContent = `₹${subtotal}`;
    document.getElementById('paymentTax').textContent = `₹${tax}`;
    document.getElementById('paymentTotal').textContent = `₹${total}`;

    // Start timer
    startPaymentTimer();

    document.getElementById('paymentModal').classList.add('open');
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('open');
    if (paymentTimer) {
        clearInterval(paymentTimer);
        paymentTimer = null;
    }
}

function startPaymentTimer() {
    let timeLeft = 600; // 10 minutes in seconds
    const timerElement = document.getElementById('paymentTimer');

    if (paymentTimer) {
        clearInterval(paymentTimer);
    }

    paymentTimer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(paymentTimer);
            showError('Payment session expired. Please try again.');
            closePaymentModal();
        }
    }, 1000);
}

function processPayment() {
    closePaymentModal();
    
    // Show verification modal
    document.getElementById('verificationModal').classList.add('open');
    
    // Simulate payment verification
    setTimeout(() => {
        document.getElementById('verificationModal').classList.remove('open');
        showPaymentSuccess();
    }, 3000);
}

function showPaymentSuccess() {
    const orderId = 'KRT' + Date.now().toString().slice(-6);
    const orderDate = new Date().toISOString();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    // Create order details
    const orderDetails = {
        id: orderId,
        date: orderDate,
        items: [...cart],
        subtotal: subtotal,
        tax: tax,
        total: total,
        customer: currentUser
    };

    // Save order to user history
    saveOrderToHistory(orderDetails);

    // Populate success modal
    const orderDetailsElement = document.getElementById('orderDetails');
    orderDetailsElement.innerHTML = `
        <h4>Order ID: ${orderId}</h4>
        <p><strong>Date:</strong> ${new Date(orderDate).toLocaleDateString()}</p>
        <div class="order-items">
            ${cart.map(item => `
                <p>• ${item.name} (${item.size}, ${item.color}) - Qty: ${item.quantity} - ₹${item.price * item.quantity}</p>
            `).join('')}
        </div>
        <p><strong>Total Amount:</strong> ₹${total}</p>
    `;

    // Store current order for WhatsApp message
    window.currentOrder = {
        id: orderId,
        date: orderDate,
        items: [...cart],
        total: total,
        customer: currentUser
    };

    // Clear cart
    cart = [];
    updateCartUI();
    saveCartToStorage();

    document.getElementById('successModal').classList.add('open');
}

function redirectToWhatsApp() {
    if (!window.currentOrder) {
        showError('Order details not found');
        return;
    }

    const order = window.currentOrder;
    
    // Create WhatsApp message
    let message = `🎉 NEW ORDER FROM KRITIYA! 🎉\n\n`;
    message += `Customer Details:\n`;
    message += `Name: ${order.customer.name}\n`;
    message += `Phone: ${order.customer.phone}\n`;
    message += `UPI: ${order.customer.upi}\n\n`;
    message += `Order Details:\n`;
    message += `Order ID: ${order.id}\n`;
    message += `Date: ${new Date(order.date).toLocaleDateString()}\n\n`;
    message += `Items:\n`;
    
    order.items.forEach(item => {
        message += `• ${item.name}\n`;
        message += `  Size: ${item.size} | Color: ${item.color}\n`;
        message += `  Quantity: ${item.quantity} | Price: ₹${item.price * item.quantity}\n\n`;
    });
    
    message += `Total Amount: ₹${order.total}\n\n`;
    message += `Please confirm the order and provide delivery details.\n\n`;
    message += `Thank you for shopping with Kritiya! 🛍️`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919142619991?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Close success modal
    closeSuccessModal();
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('open');
    window.currentOrder = null;
}

// Utility functions
function isValidPhone(phone) {
    // Allow Indian phone numbers with or without +91 prefix
    const phoneRegex = /^(\+91[\-\s]?)?[6789]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

function isValidUPI(upi) {
    // Basic UPI format validation
    const upiRegex = /^[\w\.-]+@[\w\.-]+$/;
    return upiRegex.test(upi);
}

function showError(message) {
    alert('Error: ' + message);
}

function showSuccess(message) {
    alert('Success: ' + message);
}

function showAuthError(message) {
    const errorElement = document.getElementById('authError');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function clearAuthError() {
    const errorElement = document.getElementById('authError');
    errorElement.classList.add('hidden');
}

// Storage functions
function saveCartToStorage() {
    try {
        localStorage.setItem('kritiya_cart', JSON.stringify(cart));
    } catch (e) {
        console.warn('Could not save cart to storage:', e);
    }
}

function loadCartFromStorage() {
    try {
        const saved = localStorage.getItem('kritiya_cart');
        if (saved) {
            cart = JSON.parse(saved);
        }
    } catch (e) {
        console.warn('Could not load cart from storage:', e);
        cart = [];
    }
}

function saveUserToStorage() {
    try {
        if (currentUser) {
            localStorage.setItem('kritiya_user', JSON.stringify(currentUser));
        }
    } catch (e) {
        console.warn('Could not save user to storage:', e);
    }
}

function loadUserFromStorage() {
    try {
        const saved = localStorage.getItem('kritiya_user');
        if (saved) {
            currentUser = JSON.parse(saved);
        }
    } catch (e) {
        console.warn('Could not load user from storage:', e);
        currentUser = null;
    }
}

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem('kritiya_users') || '[]');
    } catch (e) {
        console.warn('Could not load users from storage:', e);
        return [];
    }
}

function saveUsers(users) {
    try {
        localStorage.setItem('kritiya_users', JSON.stringify(users));
    } catch (e) {
        console.warn('Could not save users to storage:', e);
    }
}

function getUserOrders() {
    if (!currentUser) return [];
    
    try {
        const allOrders = JSON.parse(localStorage.getItem('kritiya_orders') || '[]');
        return allOrders.filter(order => order.customer.id === currentUser.id);
    } catch (e) {
        console.warn('Could not load orders from storage:', e);
        return [];
    }
}

function saveOrderToHistory(order) {
    try {
        let orders = JSON.parse(localStorage.getItem('kritiya_orders') || '[]');
        orders.unshift(order); // Add to beginning
        
        // Keep only last 50 orders
        if (orders.length > 50) {
            orders = orders.slice(0, 50);
        }
        
        localStorage.setItem('kritiya_orders', JSON.stringify(orders));
    } catch (e) {
        console.warn('Could not save order to storage:', e);
    }
}