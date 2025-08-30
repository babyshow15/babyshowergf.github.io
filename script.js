document.addEventListener('DOMContentLoaded', () => {
  const jarLid = document.getElementById('jar-lid');
  const jarBody = document.getElementById('jar-body');
  const blockIntro = document.getElementById('block-intro');
  const blockInvitation = document.getElementById('block-invitation');
  
  // Forzar repintado inicial para Chrome
  setTimeout(() => {
    jarBody.style.display = 'none';
    jarBody.offsetHeight; // Trigger reflow
    jarBody.style.display = 'block';
  }, 100);

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
      }
    });
  });
  
  // Detectar Chrome específicamente para aplicar mejoras adicionales
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if (isChrome) {
    document.body.classList.add('chrome-browser');
    // Aplicar estilos específicos para Chrome si es necesario
  }
});
