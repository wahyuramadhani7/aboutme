document.addEventListener('DOMContentLoaded', () => {
      const buttons = document.querySelectorAll('.btn');
      const cursor = document.querySelector('.cursor');
      const contactForm = document.getElementById('contactForm');
  
      // Smooth Scroll
      buttons.forEach((btn) => {
          btn.addEventListener('click', (e) => {
              e.preventDefault();
              const targetId = btn.getAttribute('href')?.substring(1);
              const targetSection = document.getElementById(targetId);
              if (targetSection) {
                  targetSection.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                  });
              }
          });
      });
  
      // Custom Cursor
      document.addEventListener('mousemove', (e) => {
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
      });
  
      // Hover Effects
      const hobbyCards = document.querySelectorAll('.hobby-card');
      hobbyCards.forEach(card => {
          card.addEventListener('mouseover', () => {
              card.style.transform = 'scale(1.05)';
          });
          card.addEventListener('mouseout', () => {
              card.style.transform = 'scale(1)';
          });
      });
  
      // Contact Form Handling
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const nameInput = contactForm.querySelector('input[type="text"]');
          const emailInput = contactForm.querySelector('input[type="email"]');
          const messageInput = contactForm.querySelector('textarea');
  
          if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
              alert('Mohon lengkapi semua field formulir kontak.');
          } else {
              alert('Terima kasih! Pesan Anda akan segera kami proses.');
              contactForm.reset();
          }
      });
  
      // Initialize AOS
      AOS.init();
  
      // Initialize Swiper
      const projectsSlider = new Swiper('.projects-slider', {
          spaceBetween: 30,
          pagination: {
              el: '.swiper-pagination',
              clickable: true,
          },
          navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          },
      });
  
      // Typing Effect
      const typingElement = document.querySelector('.typing-effect');
      const text = typingElement.getAttribute('data-text');
      let i = 0;
      const typing = () => {
          if (i < text.length) {
              typingElement.innerHTML = text.substring(0, i + 1);
              i++;
              setTimeout(typing, 100);
          }
      };
      // Education Timeline Animation
const educationItems = document.querySelectorAll('.timeline-item');

educationItems.forEach((item, index) => {
  item.dataset.aos = 'fade-up';
  item.dataset.aosDelay = index * 100;
  // Experience Fade-in Animation
const experienceItems = document.querySelectorAll('.experience-item');

experienceItems.forEach((item, index) => {
  item.dataset.aos = 'fade-up';
  item.dataset.aosDelay = index * 200;
});
AOS.init({
      delay: 200,
      duration: 600,
      once: true
    });
});
// Initialize AOS for the gallery section
AOS.init({
      delay: 200, 
      duration: 800,
      once: true,
    });
      typing();
  
      console.log('Website is ready with enhanced features!');
  });