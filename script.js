// script.js
document.addEventListener('DOMContentLoaded', () => {
  const jar = document.getElementById('honey-jar');
  const audio = document.getElementById('honey-audio');
  
  jar.addEventListener('click', startAnimation);
  jar.addEventListener('touchstart', startAnimation);
  
  function startAnimation() {
    // Deshabilitar interacción durante la animación
    jar.style.pointerEvents = 'none';
    
    // 1. Miel se mueve hacia abajo
    gsap.to("#honey-top", {
      attr: { d: "M60 70 Q100 120 140 70 L140 150 Q100 180 60 150 Z" },
      duration: 1.5,
      ease: "sine.out"
    });
    
    // 2. Gota de miel aparece y cae
    gsap.to("#honey-drip", {
      opacity: 1,
      y: 50,
      duration: 1,
      delay: 0.5
    });
    
    // 3. Gotas adicionales
    gsap.to(["#drop1", "#drop2"], {
      opacity: 1,
      y: 30,
      duration: 1,
      delay: 0.8,
      stagger: 0.2,
      onComplete: () => {
        // 4. Revelar invitación y reproducir música
        document.getElementById("invitation").classList.remove("hidden");
        audio.play().catch(e => console.log("Autoplay bloqueado:", e));
        
        // Efecto de aparición suave
        gsap.to("#invitation", { opacity: 1, duration: 1 });
      }
    });
  }
});
