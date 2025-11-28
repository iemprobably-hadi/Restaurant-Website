// ===== MOBILE NAVIGATION =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===== STICKY NAVBAR =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-scroll').forEach(element => {
    observer.observe(element);
});

// ===== IMAGE SLIDER =====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

function showSlide(n) {
    if (!slides.length) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (n >= slides.length) {
        currentSlide = 0;
    }
    if (n < 0) {
        currentSlide = slides.length - 1;
    }
    
    slides[currentSlide].classList.add('active');
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide--;
        showSlide(currentSlide);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentSlide++;
        showSlide(currentSlide);
    });
}

// Auto-advance slider
if (slides.length) {
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
}

// ===== MENU FILTERING =====
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        
        menuCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== GALLERY LIGHTBOX =====
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.dataset.image;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== FORM VALIDATION =====
const reservationForm = document.getElementById('reservationForm');
const careerForm = document.getElementById('careerForm');

// Set minimum date to today for reservation form
const dateInput = document.getElementById('resDate');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

// Reservation Form Validation
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const firstName = document.getElementById('resFirstName').value.trim();
        const lastName = document.getElementById('resLastName').value.trim();
        const email = document.getElementById('resEmail').value.trim();
        const phone = document.getElementById('resPhone').value.trim();
        const date = document.getElementById('resDate').value;
        const time = document.getElementById('resTime').value;
        const guests = document.getElementById('resGuests').value;
        
        // Validation
        if (!firstName || !lastName || !email || !phone || !date || !time || !guests) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^\+?[\d\s-()]+$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }
        
        // Date validation
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Please select a future date.');
            return;
        }
        
        // If all validations pass
        alert(`Thank you, ${firstName}! Your reservation for ${guests} guest(s) on ${date} at ${time} has been submitted. We'll send a confirmation email to ${email} shortly.`);
        reservationForm.reset();
    });
}

// Career Form Validation
if (careerForm) {
    careerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const position = document.getElementById('position').value;
        const availability = document.getElementById('availability').value;
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!firstName || !lastName || !email || !phone || !position || !availability || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^\+?[\d\s-()]+$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }
        
        // If all validations pass
        alert(`Thank you for your application, ${firstName}! We have received your application for the ${position} position. We'll review your application and contact you at ${email} or ${phone} soon.`);
        careerForm.reset();
    });
}

// ===== SMOOTH SCROLLING =====
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

// ===== BUTTON HOVER EFFECTS =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--deep-red);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
});

// ===== CONSOLE MESSAGE =====
console.log('%c🍔 Hot Spot Kitchen Website 🍔', 'color: #C4423C; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, JavaScript', 'color: #6B7A3E; font-size: 14px;');
console.log('%cEnjoy your visit!', 'color: #D4A847; font-size: 14px;');