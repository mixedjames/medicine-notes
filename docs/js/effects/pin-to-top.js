define(
  ['gsap', 'ScrollTrigger'],
  function (gsapModule, ScrollTriggerModule) {

    return function PinToTop(options) {
      const element = document.querySelector(options.element);
      const section = element.closest("section");

      // Wrap element dynamically
      const wrapper = document.createElement("div");
      wrapper.classList.add("pin-wrap");
      element.parentNode.insertBefore(wrapper, element);
      wrapper.appendChild(element);

      //
      const trigger = ScrollTrigger.create({
        trigger: wrapper,                     // pin the wrapper
        scroller: "#viewport",                // your scroll container

        start: "top top",               // when figure top hits viewport top
        end: () => {
          // "top+=100px top"
          const sectionRect = section.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();
          const offset = sectionRect.bottom - elementRect.top - elementRect.height;
          return `top+=${offset}px top`;
        },

        pin: wrapper,                         // pin wrapper, not figure
        pinSpacing: false,
        pinType: "transform",                  // smooth mobile pinning
        anticipatePin: 1,                       // reduces jump at start
        markers: true,
      });
      
    }

  }
);