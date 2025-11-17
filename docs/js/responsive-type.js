define(
  [],
  function (EffetBroker) {

    OnDOMReady(setupResponsiveTypography);

    function setupResponsiveTypography() {

      const viewport = document.querySelector('.viewport');

      const baseViewportWidth = 450;
      const baseFontSize = parseInt(getComputedStyle(viewport).getPropertyValue('--base-font-size'));

      new ResizeObserver(entries => {

        entries.forEach(entry => {
          const scale = entry.contentRect.width / baseViewportWidth;
          viewport.style.setProperty(
            '--base-font-size',
            new CSSUnitValue(baseFontSize * scale, 'pt')
          );

        });

        ScrollTrigger.refresh();

      }).observe(viewport);
    }

    function OnDOMReady(F) {
      if (document.readyState === "loading") {
        // Loading hasn't finished yet
        document.addEventListener("DOMContentLoaded", F);
      } else {
        // `DOMContentLoaded` has already fired
        F();
      }
    }


  }
);