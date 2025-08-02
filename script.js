document.addEventListener('DOMContentLoaded', () => {
  const jar = document.getElementById('honey-jar');
  const audio = document.getElementById('honey-audio');

  jar.addEventListener('click', () => {
    // Animación del derrame
    gsap.to("#honey-top", {
      attr: { d: "M60 70 Q100 120 140 70 L140 150 Q100 180 60 150 Z" },
      duration: 1.5,
      ease: "sine.out"
    });

    // Gota de miel cayendo
    gsap.to("#honey-drip", {
      opacity: 1,
      y: 50,
      duration: 1,
      delay: 0.5,
      onComplete: () => {
        // Mostrar invitación y reproducir música
        document.getElementById("invitation").classList.remove("hidden");
        audio.play().catch(e => console.log("Error de audio:", e));
      }
    });
  });
});
