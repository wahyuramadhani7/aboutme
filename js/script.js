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
      function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.classList.add('show');
            setTimeout(() => {
              notification.classList.remove('show');
            }, 5000);
          }
      typing();
  
      console.log('Website is ready with enhanced features!');
  });