// script.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('¡El JS está funcionando! 🎉');

  // Ejemplo básico: Cambiar el texto al hacer clic en el <h1>
  const title = document.querySelector('h1');
  title.addEventListener('click', () => {
    title.textContent = '¡JavaScript funciona!';
    title.style.color = '#FF6B6B'; // Cambia el color a rojo pastel
  });
});