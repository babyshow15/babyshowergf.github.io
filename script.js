document.addEventListener('DOMContentLoaded', () => {
  const jarLid = document.getElementById('jar-lid');
  const jarBody = document.getElementById('jar-body');
  const blockIntro = document.getElementById('block-intro');
  const blockInvitation = document.getElementById('block-invitation');
  
  // Variables para el audio
  let backgroundMusic = null;
  let musicPlayed = false;
  let audioContext = null;
  
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

  // Función para inicializar y reproducir audio
  function playBackgroundMusic() {
    if (musicPlayed) return;
    
    // Crear contexto de audio si no existe
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Cargar y reproducir el audio
    fetch('./media/music.mp3')
      .then(response => response.arrayBuffer())
      .then(data => audioContext.decodeAudioData(data))
      .then(buffer => {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        source.connect(audioContext.destination);
        source.start(0);
        musicPlayed = true;
        console.log('Música reproduciéndose en bucle');
      })
      .catch(error => {
        console.error('Error al cargar o reproducir el audio:', error);
        
        // Fallback: usar elemento de audio tradicional pero oculto
        backgroundMusic = new Audio('./media/music.mp3');
        backgroundMusic.loop = true;
        backgroundMusic.style.display = 'none';
        document.body.appendChild(backgroundMusic);
        
        // Intentar reproducir
        backgroundMusic.play()
          .then(() => {
            musicPlayed = true;
            console.log('Música reproduciéndose (fallback)');
          })
          .catch(fallbackError => {
            console.error('Error en el fallback de audio:', fallbackError);
          });
      });
  }

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
        
        // Reproducir música después de la animación
        playBackgroundMusic();
      }
    });
  });
  
  // Política de autoplay: preparar audio después de la primera interacción
  function initAudioOnFirstInteraction() {
    // Solo necesitamos que el usuario interactúe una vez
    document.body.addEventListener('click', function firstInteraction() {
      // Inicializar el contexto de audio después de la interacción del usuario
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        // Solo necesitamos suspenderlo inicialmente
        if (audioContext.state === 'running') {
          audioContext.suspend();
        }
      }
      
      // Remover el event listener después de la primera interacción
      document.body.removeEventListener('click', firstInteraction);
    }, { once: true });
  }
  
  initAudioOnFirstInteraction();
  
  // Detectar Chrome específicamente para aplicar mejoras adicionales
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if (isChrome) {
    document.body.classList.add('chrome-browser');
  }
});
