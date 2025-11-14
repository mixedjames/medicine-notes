gsap.registerPlugin(ScrollTrigger);

/**
 * 
 * @param {*} options 
 */
function PinToBottom(options) {

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
    markers: true,
    onRefresh: (self) => {
      self.spacer.style.height = "0px";
    },
  });

  RegisterTrigger(trigger);

} // function PinToBottom

function PinToTop(options) {
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

  RegisterTrigger(trigger);
}

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

PinToBottom({ element: 'figure', });
//PinToTop({ element: 'figure', });

ParallaxBG({
  section: 'section.parallax-section.level1',
  from: '0% 0%',
  to: '50% 80%',
});