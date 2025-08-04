document.addEventListener('DOMContentLoaded', () => {
  const jarBody = document.getElementById('jar-body');
  const jarLid = document.getElementById('jar-lid');
  const invitation = document.getElementById('invitation');
  
  // 1. Palpitación inicial (para llamar la atención)
  jarLid.classList.add('pulse');
  
  // 2. Al tocar el frasco
  jarBody.addEventListener('click', () => {
    // Detener palpitar
    jarLid.classList.remove('pulse');
    
    // Animación de apertura con GSAP
    gsap.to(jarLid, {
      y: -100,          // Mueve la tapa hacia arriba
      rotation: -20,    // Gira ligeramente
      duration: 2,
      ease: "back.out(1.7)",
      onComplete: () => {
        // Mostrar invitación
        invitation.classList.remove('hidden');
        gsap.to(invitation, { opacity: 1 });
      }
    });
  });
});
