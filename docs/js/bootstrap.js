require.config({
  paths: {
    gsap: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min",
    ScrollTrigger: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min"
  },

  shim: {
    ScrollTrigger: {
      deps: ["gsap"],
      exports: "ScrollTrigger"
    }
  },
});

requirejs(
  ['gsap', 'ScrollTrigger', 'responsive-type'],
  function (gsapModule, ScrollTriggerModule, ResponsiveTypeModule) {

    // 1. Pre-boot tasks go here

    const { gsap } = gsapModule;
    const { ScrollTrigger } = ScrollTriggerModule;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.normalizeScroll({
      allowNestedScroll: true,
      type: "touch,wheel,pointer",
    });

    // 2. Pre-boot state complete 

    OnDOMReady(() => {
      require(['controller']);
    });

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
