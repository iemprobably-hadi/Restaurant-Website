// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Sticky Navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.toggle('sticky', window.scrollY > 0);
    }
});

// Scroll Animation
const scrollElements = document.querySelectorAll('.fade-in-scroll');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('visible');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Image Slider (Home Page)
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.slider-btn.next');
const prevBtn = document.querySelector('.slider-btn.prev');
let currentSlide = 0;

function showSlide(n) {
    if (!slides.length) return;
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    // Auto slide
    setInterval(() => showSlide(currentSlide + 1), 5000);
}

// Menu Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            menuCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-content');
const lightboxClose = document.querySelector('.lightbox-close');

if (lightbox) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            setTimeout(() => lightbox.classList.add('active'), 10);
            lightboxImg.src = item.src;
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        setTimeout(() => lightbox.style.display = 'none', 300);
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            setTimeout(() => lightbox.style.display = 'none', 300);
        }
    });
}

// Form Validation (Generic)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    if (form.id !== 'checkoutForm') { // Skip checkout form as it has custom logic
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simple validation
            let valid = true;
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    valid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });

            if (valid) {
                alert('Thank you! Your message has been sent.');
                form.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Button Hover Effect (Ripple)
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function (e) {
        const x = e.pageX - btn.offsetLeft;
        const y = e.pageY - btn.offsetTop;
        // Could add ripple effect here if desired
    });
});

// Loading Animation (Simple Fade In)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Scroll to Top Button (Optional)
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--deep-red);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 20px;
    cursor: pointer;
    display: none;
    z-index: 1000;
    transition: 0.3s;
`;
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== CART LOGIC =====
let cart = [];

// Load cart from local storage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}
loadCart();

// Save cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update Cart Count
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

    cartCountElements.forEach(el => {
        el.textContent = totalCount;
        // Bump animation
        el.classList.remove('bump');
        void el.offsetWidth; // trigger reflow
        el.classList.add('bump');
    });
}

// Sanitize Cart (Fix NaN/Undefined issues and migrate old data)
function sanitizeCart() {
    let hasIssues = false;
    cart = cart.map(item => {
        // Ensure basePrice exists
        if (item.basePrice === undefined) {
            // Fallback for old cart data: assume price was basePrice if no options, 
            // but since we can't easily separate, we'll just use price as basePrice 
            // and 0 as optionsPrice to be safe, or reset.
            // Better to reset if it's too messy, but let's try to preserve.
            item.basePrice = parseFloat(item.price) || 0;
            item.optionsPrice = 0;
            hasIssues = true;
        }

        if (!item.quantity || isNaN(parseInt(item.quantity))) {
            item.quantity = 1;
            hasIssues = true;
        }
        return item;
    });
    if (hasIssues) saveCart();
}

// Add to Cart Function (Opens Customization Modal)
let currentItem = {};
let currentQty = 1;

function addToCart(name, price) {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
        console.error('Invalid price for item:', name);
        return;
    }

    currentItem = { name, price: numericPrice };
    currentQty = 1;

    // Reset Modal UI
    const modalName = document.getElementById('customizeItemName');
    const modalPrice = document.getElementById('customizeItemPrice');
    const modalQty = document.getElementById('customizeQty');

    if (modalName) modalName.textContent = name;
    if (modalPrice) modalPrice.textContent = `PKR ${numericPrice.toFixed(0)}`;
    if (modalQty) modalQty.textContent = '1';

    // Uncheck all checkboxes
    document.querySelectorAll('#customizeModal input[type="checkbox"]').forEach(cb => cb.checked = false);

    // Show Modal
    const modal = document.getElementById('customizeModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
        // Fallback if modal doesn't exist (e.g. on home page)
        confirmAddToCart(true);
    }
}

// Confirm Add to Cart (Called from Modal or directly)
function confirmAddToCart(skipModal = false) {
    let optionsTotal = 0;
    let selectedOptions = [];

    if (!skipModal) {
        // Get selected options
        document.querySelectorAll('#customizeModal input[type="checkbox"]:checked').forEach(cb => {
            const optPrice = parseFloat(cb.getAttribute('data-price'));
            const optName = cb.parentElement.textContent.trim().split('(')[0].trim();
            optionsTotal += optPrice;
            selectedOptions.push(optName);
        });
    }

    // Check if item already exists with same options
    const existingItemIndex = cart.findIndex(item =>
        item.name === currentItem.name &&
        JSON.stringify(item.options) === JSON.stringify(selectedOptions)
    );

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += currentQty;
        // If merging, we add the options price for the new batch
        cart[existingItemIndex].optionsPrice += optionsTotal;
    } else {
        cart.push({
            name: currentItem.name,
            basePrice: currentItem.price,
            optionsPrice: optionsTotal,
            quantity: currentQty,
            options: selectedOptions
        });
    }

    saveCart();
    updateCartCount();

    // Close Modal
    const modal = document.getElementById('customizeModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Show Toast
    showToast(`Added ${currentQty} ${currentItem.name} to cart!`);

    // Shake Cart Icon
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.classList.add('shake');
        setTimeout(() => cartIcon.classList.remove('shake'), 500);
    }
}

// Modal Quantity Controls (RENAMED from updateModalQty)
function updateCustomizeQty(change) {
    const qtyDisplay = document.getElementById('customizeQty');
    if (!qtyDisplay) return;

    let newQty = currentQty + change;
    if (newQty >= 1) {
        currentQty = newQty;
        qtyDisplay.textContent = currentQty;
    }
}

// Cart Modal Logic
const cartIcon = document.getElementById('cartIcon');
const itemModal = document.getElementById('itemModal');
const closeModal = document.getElementById('closeModal');
const closeCart = document.getElementById('closeCart');
const closeCustomize = document.getElementById('closeCustomize');
const customizeModal = document.getElementById('customizeModal');

if (cartIcon) {
    cartIcon.addEventListener('click', () => {
        renderCartItems();
        if (itemModal) {
            itemModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        if (itemModal) {
            itemModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

if (closeCart) {
    closeCart.addEventListener('click', () => {
        if (itemModal) {
            itemModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Added Listener for Customize Modal Close Button
if (closeCustomize) {
    closeCustomize.addEventListener('click', () => {
        if (customizeModal) {
            customizeModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === itemModal) {
        itemModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (e.target === customizeModal) {
        customizeModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Render Cart Items in Modal
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            const basePrice = parseFloat(item.basePrice) || 0;
            const optionsPrice = parseFloat(item.optionsPrice) || 0;
            const itemQty = parseInt(item.quantity) || 0;

            // NEW CALCULATION: (Base * Qty) + Options
            const itemTotal = (basePrice * itemQty) + optionsPrice;
            total += itemTotal;

            const optionsHtml = item.options && item.options.length > 0
                ? `<p class="cart-item-options">+ ${item.options.join(', ')}</p>`
                : '';

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    ${optionsHtml}
                    <p>PKR ${itemTotal.toFixed(0)}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateItemQuantity(${index}, -1)">-</button>
                    <span>${itemQty}</span>
                    <button class="qty-btn" onclick="updateItemQuantity(${index}, 1)">+</button>
                    <button onclick="removeFromCart(${index})" class="remove-btn">&times;</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    if (cartTotalElement) {
        cartTotalElement.textContent = `PKR ${total.toFixed(0)}`;
    }

    // Show Checkout Button logic
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.style.display = cart.length > 0 ? 'block' : 'none';
        checkoutBtn.onclick = () => window.location.href = 'checkout.html';
    }
}

// Update Item Quantity
function updateItemQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    updateCartCount();
    renderCartItems();
    if (window.location.pathname.includes('checkout')) {
        renderCheckoutItems();
    }
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    renderCartItems();
    if (window.location.pathname.includes('checkout')) {
        renderCheckoutItems();
    }
}

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Initialize Cart Count on Load
document.addEventListener('DOMContentLoaded', () => {
    sanitizeCart();
    updateCartCount();
    if (window.location.pathname.includes('checkout')) {
        renderCheckoutItems();
    }
});

// ===== CONSOLE MESSAGE =====
console.log('%c🍔 Hot Spot Kitchen Website 🍔', 'color: #C4423C; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, JavaScript', 'color: #6B7A3E; font-size: 14px;');
console.log('%cEnjoy your visit!', 'color: #D4A847; font-size: 14px;');

// ===== CHECKOUT LOGIC =====
let orderType = 'delivery';
const DELIVERY_FEE = 200; // PKR 200

function renderCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkoutItems');
    const checkoutSubtotalElement = document.getElementById('checkoutSubtotal');
    const checkoutDeliveryFeeElement = document.getElementById('checkoutDeliveryFee');
    const checkoutTotalElement = document.getElementById('checkoutTotal');

    if (!checkoutItemsContainer) return;

    checkoutItemsContainer.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        checkoutItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        if (checkoutSubtotalElement) checkoutSubtotalElement.textContent = 'PKR 0';
        if (checkoutTotalElement) checkoutTotalElement.textContent = 'PKR 0';
        return;
    }

    cart.forEach(item => {
        const basePrice = parseFloat(item.basePrice) || 0;
        const optionsPrice = parseFloat(item.optionsPrice) || 0;
        const itemQty = parseInt(item.quantity) || 0;

        // NEW CALCULATION: (Base * Qty) + Options
        const itemTotal = (basePrice * itemQty) + optionsPrice;
        subtotal += itemTotal;

        const optionsHtml = item.options && item.options.length > 0
            ? `<br><small>+ ${item.options.join(', ')}</small>`
            : '';

        const itemElement = document.createElement('div');
        itemElement.className = 'checkout-item';
        itemElement.innerHTML = `
            <div class="item-info">
                <span class="item-name">${item.name} ${optionsHtml}</span>
                <span class="item-quantity">x${itemQty}</span>
            </div>
            <span class="item-price">PKR ${itemTotal.toFixed(0)}</span>
        `;
        checkoutItemsContainer.appendChild(itemElement);
    });

    if (checkoutSubtotalElement) checkoutSubtotalElement.textContent = `PKR ${subtotal.toFixed(0)}`;

    updateCheckoutTotal();
}

function updateCheckoutTotal() {
    const checkoutSubtotalElement = document.getElementById('checkoutSubtotal');
    const checkoutTotalElement = document.getElementById('checkoutTotal');
    const checkoutDeliveryFeeElement = document.getElementById('checkoutDeliveryFee');

    if (!checkoutSubtotalElement || !checkoutTotalElement) return;

    const subtotalText = checkoutSubtotalElement.textContent.replace('PKR ', '');
    const subtotal = parseFloat(subtotalText) || 0;

    let total = subtotal;

    if (orderType === 'delivery') {
        total += DELIVERY_FEE;
        if (checkoutDeliveryFeeElement) {
            checkoutDeliveryFeeElement.parentElement.style.display = 'flex';
            checkoutDeliveryFeeElement.textContent = `PKR ${DELIVERY_FEE.toFixed(0)}`;
        }
    } else {
        if (checkoutDeliveryFeeElement) {
            checkoutDeliveryFeeElement.parentElement.style.display = 'none';
        }
    }

    checkoutTotalElement.textContent = `PKR ${total.toFixed(0)}`;
}

// Order Type Toggle
const deliveryBtn = document.getElementById('deliveryBtn');
const pickupBtn = document.getElementById('pickupBtn');

if (deliveryBtn && pickupBtn) {
    deliveryBtn.addEventListener('click', () => {
        orderType = 'delivery';
        deliveryBtn.classList.add('active');
        pickupBtn.classList.remove('active');
        updateCheckoutTotal();

        // Show/Hide Address Fields
        document.getElementById('deliveryFields').style.display = 'block';
        document.getElementById('pickupFields').style.display = 'none';
    });

    pickupBtn.addEventListener('click', () => {
        orderType = 'pickup';
        pickupBtn.classList.add('active');
        deliveryBtn.classList.remove('active');
        updateCheckoutTotal();

        // Show/Hide Address Fields
        document.getElementById('deliveryFields').style.display = 'none';
        document.getElementById('pickupFields').style.display = 'block';
    });
}

// Payment Method Toggles
function setupPaymentToggles() {
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const paymentDetails = document.getElementById('paymentDetails');
    const cardDetails = document.getElementById('cardDetails');
    const walletDetails = document.getElementById('walletDetails');
    const walletTitle = document.getElementById('walletTitle');

    if (!paymentRadios.length) return;

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const method = e.target.value;

            // Reset visibility
            paymentDetails.style.display = 'none';
            cardDetails.style.display = 'none';
            walletDetails.style.display = 'none';
            paymentDetails.classList.remove('active');

            if (method === 'card') {
                paymentDetails.style.display = 'block';
                cardDetails.style.display = 'block';
                setTimeout(() => paymentDetails.classList.add('active'), 10);
            } else if (method === 'easypaisa' || method === 'jazzcash') {
                paymentDetails.style.display = 'block';
                walletDetails.style.display = 'block';
                walletTitle.textContent = method === 'easypaisa' ? 'EasyPaisa Details' : 'JazzCash Details';
                setTimeout(() => paymentDetails.classList.add('active'), 10);
            }
        });
    });
}

// Initialize Payment Toggles
document.addEventListener('DOMContentLoaded', setupPaymentToggles);

// Checkout Form Submission
const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Validate Payment Details
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        if (paymentMethod === 'card') {
            const cardNum = document.getElementById('cardNumber').value;
            const cardExp = document.getElementById('cardExpiry').value;
            const cardCVC = document.getElementById('cardCVC').value;
            if (!cardNum || !cardExp || !cardCVC) {
                alert('Please fill in all card details.');
                return;
            }
        } else if (paymentMethod === 'easypaisa' || paymentMethod === 'jazzcash') {
            const walletNum = document.getElementById('walletNumber').value;
            if (!walletNum) {
                alert(`Please enter your ${paymentMethod === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'} account number.`);
                return;
            }
        }

        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert(`Order placed successfully! Total: ${document.getElementById('checkoutTotal').textContent}`);

        // Clear cart
        cart = [];
        saveCart();
        window.location.href = 'index.html';
    });
}
