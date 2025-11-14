console.log("Bootstrap JS loaded");

window.addEventListener("load", function () {
  const viewport = document.querySelector('.viewport');

  const baseViewportWidth = 500;
  const baseFontSize = parseInt(getComputedStyle(viewport).getPropertyValue('--base-font-size'));

  new ResizeObserver(entries => {
    
    entries.forEach(entry => {
      const scale = entry.contentRect.width / baseViewportWidth;
      viewport.style.setProperty(
        '--base-font-size',
        new CSSUnitValue(baseFontSize * scale, 'pt')
      );
    });

  }).observe(viewport);
});

