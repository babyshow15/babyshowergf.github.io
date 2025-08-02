document.addEventListener('DOMContentLoaded', () => {
  const jar = document.getElementById('honey-jar');
  const stick = document.getElementById('honey-stick');
  const invitation = document.getElementById('invitation');
  const musicBtn = document.getElementById('music-btn');
  
  // Audio (opcional)
  const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  audio.volume = 0.3;
  
  // Animación al tocar/clickear
  jar.addEventListener('click', animateJar);
  jar.addEventListener('touchstart', animateJar);
  
  // Control de música
  musicBtn?.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      musicBtn.textContent = '🔊 Pausar música';
    } else {
      audio.pause();
      musicBtn.textContent = '🎵 Reproducir música';
    }
  });
  
  function animateJar() {
    // Deshabilitar interacción durante la animación
    jar.style.pointerEvents = 'none';
    
    // 1. Animación del palito
    gsap.to(stick, {
      rotation: 360,
      transformOrigin: "50% 50%",
      duration: 2,
      ease: "power2.inOut"
    });
    
    // 2. Efecto de remolino en la miel
    gsap.to("#honey-liquid", {
      attr: { d: "M50 80 Q100 20 150 80 L150 170 Q100 230 50 170 Z" },
      duration: 2,
      ease: "elastic.out(1, 0.5)"
    });
    
    // 3. Revelar invitación
    setTimeout(() => {
      invitation.classList.remove('hidden');
      gsap.to("#invitation", {
        opacity: 1,
        height: "auto",
        duration: 1
      });
    }, 2000);
  }
});
