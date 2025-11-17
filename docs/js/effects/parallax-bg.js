define(
  ['gsap', 'ScrollTrigger', 'effect-broker'],
  function (gsapModule, ScrollTriggerModule, EffectBroker) {

    function ParallaxBG(options) {
      const element = document.querySelector(options.section);

      gsap.fromTo(
        element,
        { backgroundPosition: options.from, },
        {
          backgroundPosition: options.to,  // adjust vertical position for parallax
          ease: "none",
          scrollTrigger: {
            trigger: element,
            scroller: "#viewport",        // your scroll container
            start: "top bottom",          // when section top enters viewport
            end: "bottom top",            // when section bottom leaves viewport
            scrub: true                   // smooth parallax tied to scroll
          }
        });

        
    }
  }
); // end module function