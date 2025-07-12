// script.js

// JavaScript for mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileProductsButton = document.getElementById('mobile-products-button');
const mobileProductsDropdown = document.getElementById('mobile-products-dropdown');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

if (mobileProductsButton) {
    mobileProductsButton.addEventListener('click', () => {
        mobileProductsDropdown.classList.toggle('hidden');
        // Rotate the arrow icon
        const svg = mobileProductsButton.querySelector('svg');
        if (svg) {
            svg.classList.toggle('rotate-180');
        }
    });
}

// Carousel functionality (only for index.html)
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
let currentSlide = 0;
let slideInterval;

/**
 * Displays a specific slide and updates the active dot.
 * @param {number} index - The index of the slide to display.
 */
function showSlide(index) {
    if (!slides.length) return; // Exit if no slides are found

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
    currentSlide = index;
}

/**
 * Advances to the next slide.
 */
function nextSlide() {
    if (!slides.length) return;
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

/**
 * Goes back to the previous slide.
 */
function prevSlide() {
    if (!slides.length) return;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

/**
 * Starts the automatic slide transition.
 */
function startSlideShow() {
    if (!slides.length) return;
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

/**
 * Stops the automatic slide transition.
 */
function stopSlideShow() {
    clearInterval(slideInterval);
}

// Event listeners for carousel navigation
if (prevButton) {
    prevButton.addEventListener('click', () => {
        stopSlideShow();
        prevSlide();
        startSlideShow(); // Restart slideshow after manual navigation
    });
}

if (nextButton) {
    nextButton.addEventListener('click', () => {
        stopSlideShow();
        nextSlide();
        startSlideShow(); // Restart slideshow after manual navigation
    });
}

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        stopSlideShow();
        const slideIndex = parseInt(e.target.dataset.slide);
        showSlide(slideIndex);
        startSlideShow(); // Restart slideshow after manual navigation
    });
});

// Initialize carousel on window load, only if slides exist (i.e., on index.html)
window.addEventListener('load', function() {
    if (slides.length > 0) {
        showSlide(0); // Show the first slide initially
        startSlideShow(); // Start automatic slideshow
    }
});
