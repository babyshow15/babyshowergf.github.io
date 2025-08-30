document.addEventListener('DOMContentLoaded', () => {
  const jarLid = document.getElementById('jar-lid');
  const jarBody = document.getElementById('jar-body');
  const blockIntro = document.getElementById('block-intro');
  const blockInvitation = document.getElementById('block-invitation');

  jarLid.addEventListener('click', () => {
    // Animar tapa hacia arriba
    gsap.to(jarLid, {
      y: -200,
      duration: 1.2,
      ease: "power2.out"
    });

    // Animar frasco hacia abajo y desvanecer
    gsap.to(jarBody, {
      y: 200,
      opacity: 0,
      duration: 1.5,
      ease: "power2.in",
      onComplete: () => {
        // Ocultar bloque 1
        blockIntro.classList.add('hidden');
        // Mostrar bloque 2 (invitación)
        blockInvitation.classList.remove('hidden');
        gsap.fromTo(blockInvitation, {opacity: 0}, {opacity: 1, duration: 1.2});
      }
    });
  });
});
