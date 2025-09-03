document.addEventListener('DOMContentLoaded', () => {
  const jarLid = document.getElementById('jar-lid');
  const jarBody = document.getElementById('jar-body');
  const blockIntro = document.getElementById('block-intro');
  const blockInvitation = document.getElementById('block-invitation');
  const backgroundMusic = document.getElementById('background-music');
  
  // Variable para controlar si la música ya se reprodujo
  let musicPlayed = false;
  
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
    repeat: -1, // Repetir infinitamente
    yoyo: true, // Ir y volver
    ease: "sine.inOut"
  });

  jarLid.addEventListener('click', () => {
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
        
        // Reproducir música después de la animación (solo una vez)
        if (!musicPlayed) {
          backgroundMusic.play()
            .then(() => {
              console.log('Música reproducida con éxito');
              musicPlayed = true;
            })
            .catch(error => {
              console.log('Error al reproducir música:', error);
              // Algunos navegadores requieren interacción del usuario primero
            });
        }
      }
    });
  });
  
  // Detectar Chrome específicamente para aplicar mejoras adicionales
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if (isChrome) {
    document.body.classList.add('chrome-browser');
  }
  
  // Política de autoplay: intentar reproducir música después de la primera interacción
  document.body.addEventListener('click', function firstInteraction() {
    // Solo intentar reproducir si no se ha reproducido aún
    if (!musicPlayed) {
      backgroundMusic.play()
        .then(() => {
          console.log('Música iniciada después de interacción');
          musicPlayed = true;
          backgroundMusic.pause(); // Pausar inmediatamente
          backgroundMusic.currentTime = 0; // Reiniciar
        })
        .catch(error => {
          console.log('Error en autoplay después de interacción:', error);
        });
    }
    // Remover el event listener después de la primera interacción
    document.body.removeEventListener('click', firstInteraction);
  }, { once: true });
});
