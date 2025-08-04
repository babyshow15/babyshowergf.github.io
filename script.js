document.addEventListener('DOMContentLoaded', () => {
  const jarLid = document.getElementById('jar-lid');
  const invitation = document.getElementById('invitation');
  
  // 1. Palpitación inicial para llamar la atención
  jarLid.classList.add('pulse');
  
  // 2. Al hacer clic en la tapa
  jarLid.addEventListener('click', () => {
    // Detener palpitar
    jarLid.classList.remove('pulse');
    
    // Animación de apertura (solo hacia arriba)
    gsap.to(jarLid, {
      y: -120,          // Mueve la tapa hacia arriba (ajusta este valor según tu SVG)
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => {
        // Mostrar invitación
        invitation.classList.remove('hidden');
        gsap.to(invitation, { opacity: 1 });
      }
    });
  });
});
