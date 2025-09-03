document.addEventListener('DOMContentLoaded', () => {
  const jarLid = document.getElementById('jar-lid');
  const jarBody = document.getElementById('jar-body');
  const blockIntro = document.getElementById('block-intro');
  const blockInvitation = document.getElementById('block-invitation');
  const backgroundMusic = document.getElementById('background-music');
  
  // Elementos de la cuenta regresiva
  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');
  
  // Fecha objetivo: 14 de septiembre de 2025 a las 3:30 PM
  const targetDate = new Date(2025, 8, 14, 15, 30, 0);
  
  // Forzar repintado inicial para Chrome
  setTimeout(() => {
    jarBody.style.display = 'none';
    jarBody.offsetHeight; // Trigger reflow
    jarBody.style.display = 'block';
  }, 100);

  // Agregar animación continua de palpitar
  gsap.to('.jar-container', {
    scale: 1.05,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Función para actualizar la cuenta regresiva
  function updateCountdown() {
    const now = new Date();
    const difference = targetDate - now;
    
    if (difference <= 0) {
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
      return;
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
  }
  
  // Iniciar cuenta regresiva
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Intentar reproducir música automáticamente
  function playMusic() {
    if (backgroundMusic) {
      backgroundMusic.play()
        .then(() => {
          console.log('Música reproduciéndose automáticamente');
        })
        .catch(error => {
          console.log('Error en reproducción automática:', error);
        });
    }
  }

  // Intentar reproducir al cargar
  playMusic();

  jarLid.addEventListener('click', () => {
    // Intentar reproducir música si no se ha podido antes
    playMusic();
    
    // Mejorar rendimiento preparando elementos para animación
    jarLid.style.willChange = 'transform';
    jarBody.style.willChange = 'transform, opacity';
    
    // Animar tapa hacia arriba
    gsap.to(jarLid, {
      y: -200,
      duration: 1.2,
      ease: "power2.out",
      onComplete: () => {
        jarLid.style.willChange = 'auto';
      }
    });

    // Animar frasco hacia abajo y desvanecer
    gsap.to(jarBody, {
      y: 200,
      opacity: 0,
      duration: 1.5,
      ease: "power2.in",
      onComplete: () => {
        jarBody.style.willChange = 'auto';
        // Ocultar bloque 1
        blockIntro.classList.add('hidden');
        // Mostrar bloque 2 (invitación)
        blockInvitation.classList.remove('hidden');
        gsap.fromTo(blockInvitation, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 1.2 }
        );
      }
    });
  });
  
  // Detectar Chrome específicamente para aplicar mejoras adicionales
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if (isChrome) {
    document.body.classList.add('chrome-browser');
  }
});
