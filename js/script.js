document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const buttons = document.querySelectorAll('.btn, .btn-small');
    const cursor = document.querySelector('.cursor');
    const contactForm = document.getElementById('contactForm');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');
    const body = document.body;
    
    // Add preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    body.appendChild(preloader);
    
    // Add theme toggle button
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    body.appendChild(themeToggle);
    
    // Add scroll to top button
    const scrollToTop = document.createElement('div');
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    body.appendChild(scrollToTop);
    
    // Add particles to header
    const particles = document.createElement('div');
    particles.className = 'particles';
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = `${Math.random() * 10 + 5}px`;
        particle.style.height = particle.style.width;
        particle.style.background = getRandomColor();
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particles.appendChild(particle);
    }
    header.appendChild(particles);
    
    // Function to generate random color for particles
    function getRandomColor() {
        const colors = ['#4361ee', '#3a0ca3', '#7209b7', '#4cc9f0', '#38b000', '#fb8500'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Hide preloader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 500);
        }, 1000);
    });
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Scroll to top functionality
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    });
    
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth Scroll for navigation
    buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            if (btn.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const targetId = btn.getAttribute('href')?.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Enhanced Custom Cursor
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    // Change cursor style on hoverable elements
    const hoverElements = document.querySelectorAll('a, button, .btn, .btn-small, .hobby-card, .project-card, .org-item');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Enhanced Hover Effects for cards
    const hobbyCards = document.querySelectorAll('.hobby-card');
    hobbyCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // Contact Form Handling with enhanced validation
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = contactForm.querySelector('input[type="text"]');
        const emailInput = contactForm.querySelector('input[type="email"]');
        const messageInput = contactForm.querySelector('textarea');
        let isValid = true;
        
        // Simple validation
        if (nameInput.value.trim() === '') {
            showInputError(nameInput, 'Nama diperlukan');
            isValid = false;
        } else {
            clearInputError(nameInput);
        }
        
        if (emailInput.value.trim() === '') {
            showInputError(emailInput, 'Email diperlukan');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showInputError(emailInput, 'Email tidak valid');
            isValid = false;
        } else {
            clearInputError(emailInput);
        }
        
        if (messageInput.value.trim() === '') {
            showInputError(messageInput, 'Pesan diperlukan');
            isValid = false;
        } else {
            clearInputError(messageInput);
        }
        
        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Pesan Anda telah berhasil dikirim!';
            successMessage.style.cssText = `
                background: linear-gradient(90deg, #38b000, #4cc9f0);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                margin-top: 20px;
                font-weight: 600;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                transform: translateY(20px);
                opacity: 0;
                transition: all 0.3s ease;
            `;
            
            contactForm.appendChild(successMessage);
            
            // Animate success message
            setTimeout(() => {
                successMessage.style.transform = 'translateY(0)';
                successMessage.style.opacity = '1';
            }, 10);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.style.transform = 'translateY(-20px)';
                successMessage.style.opacity = '0';
                setTimeout(() => successMessage.remove(), 300);
            }, 5000);
        }
    });
    
    // Helper functions for form validation
    function showInputError(input, message) {
        const formGroup = input.parentElement;
        if (formGroup.querySelector('.error-message')) {
            formGroup.querySelector('.error-message').textContent = message;
            return;
        }
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.cssText = `
            color: #ff4e50;
            font-size: 0.8rem;
            margin-top: -15px;
            margin-bottom: 15px;
            text-align: left;
        `;
        
        input.style.borderBottom = '2px solid #ff4e50';
        formGroup.insertBefore(errorMessage, input.nextSibling);
    }
    
    function clearInputError(input) {
        const formGroup = input.parentElement;
        if (formGroup.querySelector('.error-message')) {
            formGroup.querySelector('.error-message').remove();
        }
        input.style.borderBottom = 'none';
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    // Advanced AOS initialization with sequential animations
    document.querySelectorAll('[data-aos]').forEach((el, index) => {
        el.dataset.aosDelay = index * 100;
    });
    
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom'
    });
    
    // Initialize Swiper with enhanced options
    const projectsSlider = new Swiper('.projects-slider', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        centeredSlides: true,
        grabCursor: true,
        loop: true,
        speed: 800,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 5,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        breakpoints: {
            576: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            },
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });
    
    // Enhanced Typing Effect with more text options
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const texts = [
            typingElement.getAttribute('data-text'),
            "Saya Seorang Developer",
            "Saya Seorang Teknisi",
            "Saya Seorang Mahasiswa"
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;
        let pauseEnd = 0;
        
        const typing = () => {
            const currentText = texts[textIndex];
            
            if (isPaused && Date.now() > pauseEnd) {
                isPaused = false;
            }
            
            if (!isPaused) {
                if (!isDeleting) {
                    // Typing text
                    typingElement.innerHTML = currentText.substring(0, charIndex + 1) + '<span class="cursor">|</span>';
                    charIndex++;
                    
                    // If completed typing current text
                    if (charIndex === currentText.length) {
                        isPaused = true;
                        pauseEnd = Date.now() + 2000; // Pause for 2 seconds
                        isDeleting = true;
                    }
                } else {
                    // Deleting text
                    typingElement.innerHTML = currentText.substring(0, charIndex) + '<span class="cursor">|</span>';
                    charIndex--;
                    
                    // If completed deleting current text
                    if (charIndex === 0) {
                        isDeleting = false;
                        textIndex = (textIndex + 1) % texts.length;
                    }
                }
            }
            
            // Call typing function recursively
            const typingSpeed = isDeleting ? 50 : 150;
            setTimeout(typing, typingSpeed);
        };
        
        // Start typing animation
        typing();
    }
    
    // Animate number counter for total users in projects
    const animateCounter = () => {
        const counters = document.querySelectorAll('.count-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounter, 10);
            } else {
                counter.innerText = target;
            }
        });
    };
    
    // Intersection Observer for section animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // If section contains counters, animate them
                if (entry.target.querySelectorAll('.count-number').length > 0) {
                    animateCounter();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
        
        // Add a class for custom animations
        section.classList.add('observed-section');
    });
    
    // Add 3D tilt effect to profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mousemove', (e) => {
            const rect = profileImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 15;
            const angleY = (centerX - x) / 15;
            
            profileImage.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
    
    // Add parallax effect to header
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const headerContent = document.querySelector('.header-content');
        if (headerContent) {
            headerContent.style.transform = `translateY(${scrollY * 0.3}px)`;
            headerContent.style.opacity = 1 - scrollY / 600;
        }
        
        const particles = document.querySelector('.particles');
        if (particles) {
            particles.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
    });
    
// Gallery Animation Fix
document.addEventListener('DOMContentLoaded', function() {
    // Fix gallery animation
    function fixGalleryAnimation() {
        const galleryScroll = document.querySelector('.gallery-scroll');
        if (!galleryScroll) return;
        
        // Clone gallery items for seamless infinite scroll
        const galleryItems = galleryScroll.querySelectorAll('img');
        galleryItems.forEach(item => {
            const clone = item.cloneNode(true);
            galleryScroll.appendChild(clone);
        });
        
        // Add gallery controls
        const galleryWrapper = document.querySelector('.gallery-wrapper');
        if (galleryWrapper) {
            const controls = document.createElement('div');
            controls.className = 'gallery-controls';
            
            const pauseButton = document.createElement('button');
            pauseButton.className = 'gallery-control pause';
            pauseButton.innerHTML = '<i class="fas fa-pause"></i>';
            pauseButton.setAttribute('aria-label', 'Pause gallery');
            
            controls.appendChild(pauseButton);
            galleryWrapper.appendChild(controls);
            
            // Pause/play functionality
            let isPaused = false;
            pauseButton.addEventListener('click', function() {
                if (isPaused) {
                    galleryScroll.style.animationPlayState = 'running';
                    pauseButton.innerHTML = '<i class="fas fa-pause"></i>';
                    pauseButton.setAttribute('aria-label', 'Pause gallery');
                } else {
                    galleryScroll.style.animationPlayState = 'paused';
                    pauseButton.innerHTML = '<i class="fas fa-play"></i>';
                    pauseButton.setAttribute('aria-label', 'Play gallery');
                }
                isPaused = !isPaused;
            });
            
            // Reset animation on page resize to prevent glitches
            window.addEventListener('resize', function() {
                galleryScroll.style.animation = 'none';
                setTimeout(function() {
                    galleryScroll.style.animation = 'galleryScroll 40s linear infinite';
                }, 10);
            });
        }
    }
    
    // Improved mobile responsiveness
    function improveResponsiveness() {
        // Adjust timeline for mobile
        const timeline = document.querySelector('.timeline');
        if (timeline && window.innerWidth <= 992) {
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach(item => {
                item.style.width = '100%';
                item.style.left = '0';
            });
        }
        
        // Disable hover effects on mobile
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.body.classList.add('touch-device');
            
            // Change cursor to auto
            document.body.style.cursor = 'auto';
            
            // Hide custom cursor
            const cursor = document.querySelector('.cursor');
            if (cursor) cursor.style.display = 'none';
        }
    }
    
    // Fix swiper width for better mobile experience
    function fixSwiperWidth() {
        const projectsSlider = document.querySelector('.projects-slider');
        if (!projectsSlider) return;
        
        if (window.innerWidth <= 768) {
            projectsSlider.style.maxWidth = '90%';
        }
    }
    
    // Improve mobile navigation
    function improveMobileNavigation() {
        // Add a mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-btn') && window.innerWidth <= 768) {
            const mobileMenuBtn = document.createElement('div');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.style.cssText = `
                position: fixed;
                top: 20px;
                left: 20px;
                width: 40px;
                height: 40px;
                background: var(--primary-color);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 999;
                cursor: pointer;
                font-size: 1.2rem;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            `;
            
            document.body.appendChild(mobileMenuBtn);
        }
    }
    
    // Initialize all fixes
    fixGalleryAnimation();
    improveResponsiveness();
    fixSwiperWidth();
    improveMobileNavigation();
    
    // Re-run on resize
    window.addEventListener('resize', function() {
        improveResponsiveness();
        fixSwiperWidth();
    });
    
    // Make sure AOS animations work better on mobile
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            disable: 'phone',
            startEvent: 'DOMContentLoaded',
        });
    }
    
    // Fixed Swiper initialization for mobile compatibility
    if (typeof Swiper !== 'undefined') {
        const projectsSlider = new Swiper('.projects-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            grabCursor: true,
            autoHeight: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
        });
    }
    
    // Add scroll to top button functionality
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log("Mobile optimizations and gallery fixes have been applied!");
});
    
    // Add scroll indicator to the header
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = `
        <div class="mouse">
            <div class="wheel"></div>
        </div>
        <div class="arrow">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    scrollIndicator.style.cssText = `
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        opacity: 0;
        animation: fadeIn 1s ease-in-out forwards;
        animation-delay: 1s;
    `;
    
    const mouseStyle = `
        width: 30px;
        height: 50px;
        border: 2px solid rgba(255, 255, 255, 0.8);
        border-radius: 20px;
        position: relative;
    `;
    
    const wheelStyle = `
        width: 8px;
        height: 8px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        animation: scroll 1.5s infinite;
    `;
    
    const arrowStyle = `
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
    `;
    
    const arrowSpanStyle = `
        display: block;
        width: 10px;
        height: 10px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.8);
        border-right: 2px solid rgba(255, 255, 255, 0.8);
        transform: rotate(45deg);
        animation: arrow 1.5s infinite;
        opacity: 0;
    `;
    
    const keyframes = document.createElement('style');
    keyframes.innerHTML = `
        @keyframes scroll {
            0% { transform: translate(-50%, 0); opacity: 0; }
            50% { transform: translate(-50%, 20px); opacity: 1; }
            100% { transform: translate(-50%, 40px); opacity: 0; }
        }
        
        @keyframes arrow {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(keyframes);
    
    const mouseElement = scrollIndicator.querySelector('.mouse');
    mouseElement.style.cssText = mouseStyle;
    
    const wheelElement = scrollIndicator.querySelector('.wheel');
    wheelElement.style.cssText = wheelStyle;
    
    const arrowElement = scrollIndicator.querySelector('.arrow');
    arrowElement.style.cssText = arrowStyle;
    
    const arrowSpans = scrollIndicator.querySelectorAll('.arrow span');
    arrowSpans.forEach((span, index) => {
        span.style.cssText = arrowSpanStyle;
        span.style.animationDelay = `${index * 0.2}s`;
    });
    
    header.appendChild(scrollIndicator);
    
    // Add animated UI elements to enhance the tech feel
    sections.forEach(section => {
        // Add tech pattern to section corners
        const cornerPattern = document.createElement('div');
        cornerPattern.className = 'corner-pattern';
        cornerPattern.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            top: 20px;
            right: 20px;
            background-image: radial-gradient(circle, rgba(67, 97, 238, 0.1) 2px, transparent 2px);
            background-size: 15px 15px;
            opacity: 0.5;
            z-index: 0;
        `;
        
        // Add left bottom corner
        const cornerPatternLeft = document.createElement('div');
        cornerPatternLeft.className = 'corner-pattern left';
        cornerPatternLeft.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            bottom: 20px;
            left: 20px;
            background-image: radial-gradient(circle, rgba(67, 97, 238, 0.1) 2px, transparent 2px);
            background-size: 15px 15px;
            opacity: 0.5;
            z-index: 0;
        `;
        
        if (section.style.position !== 'relative') {
            section.style.position = 'relative';
        }
        
        section.appendChild(cornerPattern);
        section.appendChild(cornerPatternLeft);
    });
    
    // Console welcome message
    console.log('%c👋 Selamat datang di website Wahyu!', 'font-size: 20px; font-weight: bold; color: #4361ee;');
    console.log('%c🚀 Website ini dibuat dengan teknologi modern dan penuh dengan animasi interaktif.', 'font-size: 14px; color: #3a0ca3;');
});