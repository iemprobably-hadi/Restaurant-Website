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
    document.querySelector('.navbar')?.classList.toggle('sticky', window.scrollY > 0);
});

// Scroll Animation
const scrollElements = document.querySelectorAll('.fade-in-scroll');
const elementInView = (el, dividend = 1) =>
    el.getBoundingClientRect().top <= (window.innerHeight || document.documentElement.clientHeight) / dividend;

const handleScrollAnimation = () => {
    scrollElements.forEach(el => {
        if (elementInView(el, 1.25)) el.classList.add('visible');
    });
};
window.addEventListener('scroll', handleScrollAnimation);

// Image Slider
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.slider-btn.next');
const prevBtn = document.querySelector('.slider-btn.prev');
let currentSlide = 0;

const showSlide = (n) => {
    if (!slides.length) return;
    slides.forEach(s => s.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
};

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    setInterval(() => showSlide(currentSlide + 1), 5000);
}

// Menu Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        menuCards.forEach(card => {
            const match = cat === 'all' || card.getAttribute('data-category') === cat;
            if (match) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
});

// Gallery Lightbox
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
    const lbImg = document.querySelector('.lightbox-content');
    document.querySelectorAll('.gallery-item img').forEach(item => {
        item.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            setTimeout(() => lightbox.classList.add('active'), 10);
            lbImg.src = item.src;
        });
    });
    const closeLb = () => {
        lightbox.classList.remove('active');
        setTimeout(() => lightbox.style.display = 'none', 300);
    };
    document.querySelector('.lightbox-close')?.addEventListener('click', closeLb);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });
}

// Form Validation
document.querySelectorAll('form').forEach(form => {
    if (form.id === 'checkoutForm') return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        let valid = true;
        form.querySelectorAll('input, textarea').forEach(inp => {
            if (inp.hasAttribute('required') && !inp.value.trim()) {
                valid = false;
                inp.style.borderColor = 'red';
            } else {
                inp.style.borderColor = '#ddd';
            }
        });
        if (valid) {
            alert('Thank you! Your message has been sent.');
            form.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Ripple Effect
const createRipple = (e) => {
    const btn = e.currentTarget;
    const circle = document.createElement("span");
    const d = Math.max(btn.clientWidth, btn.clientHeight);
    const rect = btn.getBoundingClientRect();
    circle.style.width = circle.style.height = `${d}px`;
    circle.style.left = `${e.clientX - rect.left - d / 2}px`;
    circle.style.top = `${e.clientY - rect.top - d / 2}px`;
    circle.classList.add("ripple");
    const old = btn.querySelector('.ripple');
    if (old) old.remove();
    btn.appendChild(circle);
};
document.querySelectorAll('.btn').forEach(btn => btn.addEventListener('click', createRipple));

// Loading & ScrollToTop
window.addEventListener('load', () => document.body.classList.add('loaded'));
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `position:fixed;bottom:20px;right:20px;background:var(--deep-red);color:white;border:none;border-radius:50%;width:40px;height:40px;font-size:20px;cursor:pointer;display:none;z-index:1000;transition:0.3s;`;
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== CART LOGIC =====
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));
const updateCartCount = () => {
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = total;
        el.classList.remove('bump');
        void el.offsetWidth;
        el.classList.add('bump');
    });
};

const sanitizeCart = () => {
    let dirty = false;
    cart = cart.map(item => {
        if (item.basePrice === undefined) { item.basePrice = parseFloat(item.price) || 0; item.optionsPrice = 0; dirty = true; }
        if (!item.quantity || isNaN(item.quantity)) { item.quantity = 1; dirty = true; }
        return item;
    });
    if (dirty) saveCart();
};

let currentItem = {}, currentQty = 1;

function addToCart(name, price) {
    const p = parseFloat(price);
    if (isNaN(p)) return;
    currentItem = { name, price: p };
    currentQty = 1;

    document.getElementById('customizeItemName').textContent = name;
    document.getElementById('customizeItemPrice').textContent = `PKR ${p.toFixed(0)}`;
    document.getElementById('customizeQty').textContent = '1';
    document.querySelectorAll('#customizeModal input[type="checkbox"]').forEach(cb => cb.checked = false);

    const modal = document.getElementById('customizeModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
        confirmAddToCart(true);
    }
}

function confirmAddToCart(skipModal = false) {
    let optTotal = 0, selectedOpts = [];
    if (!skipModal) {
        document.querySelectorAll('#customizeModal input[type="checkbox"]:checked').forEach(cb => {
            optTotal += parseFloat(cb.getAttribute('data-price'));
            selectedOpts.push(cb.parentElement.textContent.trim().split('(')[0].trim());
        });
    }
    const idx = cart.findIndex(i => i.name === currentItem.name && JSON.stringify(i.options) === JSON.stringify(selectedOpts));
    if (idx > -1) {
        cart[idx].quantity += currentQty;
        cart[idx].optionsPrice += optTotal;
    } else {
        cart.push({
            name: currentItem.name, basePrice: currentItem.price, optionsPrice: optTotal, quantity: currentQty, options: selectedOpts
        });
    }
    saveCart();
    updateCartCount();

    const modal = document.getElementById('customizeModal');
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = 'auto'; }
    showToast(`Added ${currentQty} ${currentItem.name} to cart!`);
    const ci = document.getElementById('cartIcon');
    if (ci) { ci.classList.add('shake'); setTimeout(() => ci.classList.remove('shake'), 500); }
}

function updateCustomizeQty(change) {
    const disp = document.getElementById('customizeQty');
    if (!disp) return;
    if (currentQty + change >= 1) {
        currentQty += change;
        disp.textContent = currentQty;
    }
}

// Cart UI
const cartIcon = document.getElementById('cartIcon');
const itemModal = document.getElementById('itemModal');
const closeAll = () => {
    if (itemModal) { itemModal.style.display = 'none'; document.body.style.overflow = 'auto'; }
    const cm = document.getElementById('customizeModal');
    if (cm) { cm.style.display = 'none'; document.body.style.overflow = 'auto'; }
};

if (cartIcon) cartIcon.addEventListener('click', () => { renderCartItems(); itemModal.style.display = 'block'; document.body.style.overflow = 'hidden'; });
['closeModal', 'closeCart', 'closeCustomize'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', closeAll);
});
window.addEventListener('click', e => {
    if (e.target === itemModal || e.target === document.getElementById('customizeModal')) closeAll();
});

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    if (!container) return;
    container.innerHTML = '';
    let total = 0;

    if (!cart.length) container.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
    else {
        cart.forEach((item, i) => {
            const base = parseFloat(item.basePrice) || 0;
            const opt = parseFloat(item.optionsPrice) || 0;
            const qty = parseInt(item.quantity) || 0;
            const lineTotal = (base * qty) + opt;
            total += lineTotal;

            const optHtml = item.options?.length ? `<p class="cart-item-options">+ ${item.options.join(', ')}</p>` : '';
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div class="cart-item-info"><h4>${item.name}</h4>${optHtml}<p>PKR ${lineTotal.toFixed(0)}</p></div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateItemQuantity(${i}, -1)">-</button><span>${qty}</span><button class="qty-btn" onclick="updateItemQuantity(${i}, 1)">+</button>
                    <button onclick="removeFromCart(${i})" class="remove-btn">&times;</button>
                </div>`;
            container.appendChild(div);
        });
    }
    if (totalEl) totalEl.textContent = `PKR ${total.toFixed(0)}`;
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.style.display = cart.length ? 'block' : 'none';
        checkoutBtn.onclick = () => window.location.href = 'checkout.html';
    }
}

function updateItemQuantity(i, chg) {
    if (cart[i].quantity + chg > 0) cart[i].quantity += chg;
    else cart.splice(i, 1);
    saveCart(); updateCartCount(); renderCartItems();
    if (window.location.pathname.includes('checkout')) renderCheckoutItems();
}

function removeFromCart(i) {
    cart.splice(i, 1);
    saveCart(); updateCartCount(); renderCartItems();
    if (window.location.pathname.includes('checkout')) renderCheckoutItems();
}

function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast'; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('show'), 100);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    sanitizeCart(); updateCartCount();
    if (window.location.pathname.includes('checkout')) renderCheckoutItems();
    setupPaymentToggles();
});

// ===== CHECKOUT LOGIC =====
let orderType = 'delivery';
const DELIVERY_FEE = 200;

function renderCheckoutItems() {
    const container = document.getElementById('checkoutItems');
    if (!container) return;
    container.innerHTML = '';
    let subtotal = 0;

    if (!cart.length) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        updateCheckoutUI(0);
        return;
    }

    cart.forEach(item => {
        const lineTotal = ((parseFloat(item.basePrice) || 0) * (parseInt(item.quantity) || 0)) + (parseFloat(item.optionsPrice) || 0);
        subtotal += lineTotal;
        const optHtml = item.options?.length ? `<br><small>+ ${item.options.join(', ')}</small>` : '';
        const div = document.createElement('div');
        div.className = 'checkout-item';
        div.innerHTML = `
            <div class="item-info"><span class="item-name">${item.name} ${optHtml}</span><span class="item-quantity">x${item.quantity}</span></div>
            <span class="item-price">PKR ${lineTotal.toFixed(0)}</span>`;
        container.appendChild(div);
    });

    document.getElementById('checkoutSubtotal').textContent = `PKR ${subtotal.toFixed(0)}`;
    updateCheckoutTotal();
}

function updateCheckoutUI(val) {
    ['checkoutSubtotal', 'checkoutTotal'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = `PKR ${val}`;
    });
}

function updateCheckoutTotal() {
    const subEl = document.getElementById('checkoutSubtotal');
    if (!subEl) return;
    const sub = parseFloat(subEl.textContent.replace('PKR ', '')) || 0;
    let final = sub;
    const feeEl = document.getElementById('checkoutDeliveryFee');

    if (orderType === 'delivery') {
        final += DELIVERY_FEE;
        if (feeEl) { feeEl.parentElement.style.display = 'flex'; feeEl.textContent = `PKR ${DELIVERY_FEE.toFixed(0)}`; }
    } else {
        if (feeEl) feeEl.parentElement.style.display = 'none';
    }
    document.getElementById('checkoutTotal').textContent = `PKR ${final.toFixed(0)}`;
}

const deliveryBtn = document.getElementById('deliveryBtn');
const pickupBtn = document.getElementById('pickupBtn');
if (deliveryBtn && pickupBtn) {
    const toggle = (isDelivery) => {
        orderType = isDelivery ? 'delivery' : 'pickup';
        deliveryBtn.classList.toggle('active', isDelivery);
        pickupBtn.classList.toggle('active', !isDelivery);
        document.getElementById('deliveryFields').style.display = isDelivery ? 'block' : 'none';
        document.getElementById('pickupFields').style.display = isDelivery ? 'none' : 'block';
        updateCheckoutTotal();
    };
    deliveryBtn.addEventListener('click', () => toggle(true));
    pickupBtn.addEventListener('click', () => toggle(false));
}

function setupPaymentToggles() {
    const radios = document.querySelectorAll('input[name="payment"]');
    const sections = { card: 'cardDetails', easypaisa: 'walletDetails', jazzcash: 'walletDetails' };
    const pDetails = document.getElementById('paymentDetails');
    if (!radios.length || !pDetails) return;

    radios.forEach(r => r.addEventListener('change', e => {
        const m = e.target.value;
        pDetails.style.display = 'none';
        pDetails.classList.remove('active');
        document.querySelectorAll('#cardDetails, #walletDetails').forEach(el => el.style.display = 'none');

        if (sections[m]) {
            pDetails.style.display = 'block';
            document.getElementById(sections[m]).style.display = 'block';
            if (m !== 'card') document.getElementById('walletTitle').textContent = m === 'easypaisa' ? 'EasyPaisa Details' : 'JazzCash Details';
            setTimeout(() => pDetails.classList.add('active'), 10);
        }
    }));
}

const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', e => {
        e.preventDefault();
        if (!cart.length) return alert('Your cart is empty!');
        const method = document.querySelector('input[name="payment"]:checked').value;

        if (method === 'card') {
            if (!['cardNumber', 'cardExpiry', 'cardCVC'].every(id => document.getElementById(id).value)) return alert('Please fill in all card details.');
        } else if (['easypaisa', 'jazzcash'].includes(method)) {
            if (!document.getElementById('walletNumber').value) return alert(`Please enter your ${method} account number.`);
        }

        alert(`Order placed successfully! Total: ${document.getElementById('checkoutTotal').textContent}`);
        cart = []; saveCart(); window.location.href = 'index.html';
    });
}
