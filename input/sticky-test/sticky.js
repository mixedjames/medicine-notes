gsap.registerPlugin(ScrollTrigger);

(function () {
  // User-defined bottom margin (in pixels)
  const bottomMargin = 0; // adjust as needed

  // Select the figure and parent section
  const figure = document.querySelector("figure");
  const parentSection = figure.closest("section");

  // --- Step 1: Wrap figure dynamically ---
  const wrapper = document.createElement("div");
  wrapper.classList.add("pin-wrap");
  figure.parentNode.insertBefore(wrapper, figure);
  wrapper.appendChild(figure);

  let oldHeight;

  // --- Step 2: Create pinned ScrollTrigger with bottom margin ---
  const trigger = ScrollTrigger.create({
    trigger: wrapper,                     // pin the wrapper
    scroller: "#viewport",                // your scroll container
    start: "bottom bottom-=10em",               // when figure bottom hits viewport bottom
    end: () => {
      // distance from figure bottom to parent bottom minus margin
      const sectionBottom = parentSection.offsetTop + parentSection.offsetHeight;
      const figureBottom = figure.offsetTop + figure.offsetHeight;
      return "+=" + (sectionBottom - figureBottom - bottomMargin - figure.offsetHeight);
    },
    pin: wrapper,                         // pin wrapper, not figure
    pinSpacing: false,                     // remove leftover spacing
    pinType: "transform",                  // smooth mobile pinning
    anticipatePin: 1,                       // reduces jump at start
    onRefresh: (self) => {
      oldHeight = self.spacer.style.height;
      self.spacer.style.height = "0px";
    },
  });

  const newSpacer = trigger.spacer.cloneNode(false);
  parentSection.appendChild(newSpacer);
  if (oldHeight) {
    newSpacer.style.height = oldHeight;
  }

})();

const parallaxSection = document.querySelector("section.parallax-section.level1");

gsap.to(parallaxSection, {
  backgroundPosition: "50% 80%",  // adjust vertical position for parallax
  ease: "none",
  scrollTrigger: {
    trigger: parallaxSection,
    scroller: "#viewport",        // your scroll container
    start: "top bottom",          // when section top enters viewport
    end: "bottom top",            // when section bottom leaves viewport
    scrub: true                   // smooth parallax tied to scroll
  }
});