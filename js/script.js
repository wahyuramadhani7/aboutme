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
          alert('Terima kasih! Pesan Anda akan segera kami proses.');
          contactForm.reset();
      });
  
      console.log('Website is ready with enhanced features!');
  });