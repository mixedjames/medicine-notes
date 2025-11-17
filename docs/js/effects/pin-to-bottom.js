define(
  ['gsap', 'ScrollTrigger'],
  function (gsapModule, ScrollTriggerModule) {

    /**
     * 
     * @param {*} options 
     */
    return function PinToBottom(options) {

      const element = document.querySelector(options.element);
      const section = element.closest("section");

      // Wrap element dynamically
      const wrapper = document.createElement("div");
      wrapper.classList.add("pin-wrap");
      element.parentNode.insertBefore(wrapper, element);
      wrapper.appendChild(element);

      // Create spacer to maintain layout
      const spacer = document.createElement("div");
      spacer.style.height = window.getComputedStyle(element).height;
      section.appendChild(spacer);

      //
      const trigger = ScrollTrigger.create({
        trigger: wrapper,                     // pin the wrapper
        scroller: "#viewport",                // your scroll container

        start: "bottom bottom",               // when figure bottom hits viewport bottom
        end: () => {
          const spacerRect = spacer.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();
          const offset = spacerRect.top - elementRect.top - elementRect.height;
          return `bottom bottom-=${offset}px`;
        },

        pin: wrapper,                         // pin wrapper, not figure
        pinSpacing: false,                     // remove leftover spacing
        pinType: "transform",                  // smooth mobile pinning
        anticipatePin: 1,                       // reduces jump at start
        markers: false,
      });

      trigger.spacer.style.maxHeight = "0px";

    }; // function PinToBottom

  } // end module function
);