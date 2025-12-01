/*
==================================================
MAMA'S HOME KITCHEN - JAVASCRIPT (script.js)
Handles: Mobile Menu, Scroll Animations, Smooth Scroll
==================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        // Initialize mobile icon
        menuToggle.classList.add('fas', 'fa-bars'); 

        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Toggle the icon (Hamburger <-> Close)
            menuToggle.classList.toggle('fa-bars');
            menuToggle.classList.toggle('fa-times');
        });

        // Close menu when a link is clicked (mobile view)
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    mainNav.classList.remove('active');
                    menuToggle.classList.add('fa-bars');
                    menuToggle.classList.remove('fa-times');
                }
            });
        });
    }

    // --- 2. Scroll-Based Fade-In Animations ---
    const animatedElements = document.querySelectorAll('.animated-element');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- 3. Hero Text Animation (Load In) ---
    const heroText = document.querySelector('.hero-content h2');
    const heroPara = document.querySelector('.hero-content p');
    const heroBtn = document.querySelector('.hero-content .btn');

    // Apply animation properties on load for a clean entrance
    if (heroText) heroText.style.animation = 'fadeInSlideUp 0.8s ease-out forwards';
    if (heroPara) heroPara.style.animation = 'fadeInSlideUp 0.8s ease-out 0.2s forwards';
    if (heroBtn) heroBtn.style.animation = 'fadeInSlideUp 0.8s ease-out 0.4s forwards';
});
document.addEventListener('DOMContentLoaded', () => {
    // === 1. LOADING OVERLAY (Hides when content is ready) ===
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => loadingOverlay.style.display = 'none', 500);
            }, 500); // 0.5 second pause after load for better UX
        });
    }

    // === 2. MOBILE MENU TOGGLE ===
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // === 3. HERO CAROUSEL LOGIC ===
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0;

    if (carouselTrack && slides.length > 1) {
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        });

        const allDots = document.querySelectorAll('.carousel-dots .dot');

        const updateCarousel = () => {
            carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                if (index === currentIndex) slide.classList.add('active');
            });
            allDots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === currentIndex) dot.classList.add('active');
            });
        };

        const goToSlide = (index) => {
            currentIndex = (index + slides.length) % slides.length;
            updateCarousel();
        };

        prevButton.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            resetAutoSlide();
        });

        nextButton.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            resetAutoSlide();
        });
        
        // Auto-slide functionality
        let slideInterval = setInterval(() => goToSlide(currentIndex + 1), 6000); // Change slide every 6 seconds

        const resetAutoSlide = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => goToSlide(currentIndex + 1), 6000);
        };
    }
    
    // === 4. SCROLL ANIMATIONS (Fade-Up) ===
    const fadeElements = document.querySelectorAll('.fade-up, .animate-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        // Remove existing inline style for animation-delay and set CSS class for visibility control
        element.style.animationDelay = '';
        observer.observe(element);
    });

    // === 5. TESTIMONIAL SLIDER LOGIC ===
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevTestimonial = document.querySelector('.prev-testimonial');
    const nextTestimonial = document.querySelector('.next-testimonial');
    let currentTestimonialIndex = 0;

    const showTestimonial = (index) => {
        testimonialItems.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });
    };
    
    if (testimonialItems.length > 1) {
        prevTestimonial.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentTestimonialIndex);
        });

        nextTestimonial.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
            showTestimonial(currentTestimonialIndex);
        });

        // Auto-cycle testimonials
        setInterval(() => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
            showTestimonial(currentTestimonialIndex);
        }, 8000); // Change testimonial every 8 seconds
    }


    // === 6. BACK TO TOP BUTTON ===
    const backToTopButton = document.getElementById('backToTop');
    
    const toggleBackToTop = () => {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    };

    if (backToTopButton) {
        window.addEventListener('scroll', toggleBackToTop);
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});
document.addEventListener('DOMContentLoaded', () => {
    
    
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // --- WhatsApp Ordering Feature ---
    const orderButtons = document.querySelectorAll('.btn-order-wa');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemElement = button.closest('.menu-item');
            const itemName = itemElement ? itemElement.getAttribute('data-item') : 'an unknown item';

            // Get constants defined in the HTML head
            const waNumber = WA_NUMBER;
            const waMessage = WA_MESSAGE;

            // Construct the WhatsApp link
            const encodedMessage = encodeURIComponent(waMessage + itemName);
            const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;

            // Open the link in a new tab
            window.open(waLink, '_blank');
        });
    });


    // --- Sidebar Active State on Scroll (Intersection Observer) ---
    const sections = document.querySelectorAll('.menu-category');
    const navItems = document.querySelectorAll('.sidebar-nav-item');

    const options = {
        rootMargin: '-50% 0px -50% 0px', // Center of viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.sidebar-nav-item[href="#${id}"]`);

            if (navLink) {
                // Remove 'active' from all
                navItems.forEach(item => item.classList.remove('active'));

                // Add 'active' to the one in the center of the viewport
                if (entry.isIntersecting) {
                    navLink.classList.add('active');
                }
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Smooth Scrolling for Sidebar ---
    navItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Adjust scroll position to account for the fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const offset = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Animation Trigger (Initial Load & Scroll) ---
    const animateElements = document.querySelectorAll('.fade-in-up');

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        animateObserver.observe(element);
    });

});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // --- Sidebar Active State on Scroll (Intersection Observer) ---
    const sections = document.querySelectorAll('.menu-category');
    const navItems = document.querySelectorAll('.sidebar-nav-item');

    const options = {
        rootMargin: '-50% 0px -50% 0px', // Center of viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.sidebar-nav-item[href="#${id}"]`);

            if (navLink) {
                // Remove 'active' from all
                navItems.forEach(item => item.classList.remove('active'));

                // Add 'active' to the one in the center of the viewport
                if (entry.isIntersecting) {
                    navLink.classList.add('active');
                }
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Smooth Scrolling for Sidebar (using CSS scroll-behavior: smooth) ---
    // Ensure all sidebar links use smooth scrolling
    navItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Adjust scroll position to account for the fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const offset = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Animation Trigger (Initial Load & Scroll) ---
    const animateElements = document.querySelectorAll('.fade-in-up');

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => {
        // Initially pause animations so they only run when visible
        element.style.animationPlayState = 'paused';
        animateObserver.observe(element);
    });

});
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle Logic (Essential for navigation display)
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open'); 
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // --- SCROLL ANIMATIONS REMOVED FOR SIMPLICITY AND RELIABILITY ---

    // 2. Contact Form Submission and Validation 
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const submitButton = contactForm ? contactForm.querySelector('.btn-form-submit') : null;

    if (contactForm && formMessage && submitButton) {
        const displayMessage = (type, message) => {
            formMessage.classList.remove('success', 'error');
            // Assuming success/error styles are still in CSS
            formMessage.classList.add(type); 
            formMessage.textContent = message;
            formMessage.removeAttribute('hidden');
            
            setTimeout(() => {
                formMessage.setAttribute('hidden', true);
                formMessage.classList.remove(type);
            }, 5000);
        };

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredInputs = contactForm.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    const errorText = input.getAttribute('data-error') || 'This field is required.';
                    displayMessage('error', errorText);
                    input.focus();
                }
            });

            if (!isValid) return;

            // Honeypot Check (Spam Protection)
            const honeypotField = document.getElementById('hp_field');
            if (honeypotField && honeypotField.value.length > 0) {
                console.log('Bot detected via honeypot.');
                displayMessage('success', 'Thank you! Your message has been sent.'); 
                contactForm.reset();
                return; 
            }

            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // --- Simulated AJAX Submission ---
            setTimeout(() => {
                const serverSuccess = true; 

                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Inquiry';

                if (serverSuccess) {
                    displayMessage('success', '✅ Message sent successfully! Mama will be in touch soon.');
                    contactForm.reset();
                } else {
                    displayMessage('error', '❌ Submission failed. Please try calling us instead.');
                }
            }, 1500);
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
});