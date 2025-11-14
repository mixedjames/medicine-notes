gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: "figure",
  scroller: "#viewport",      // your scroll container
  start: "bottom bottom",      // when figure's bottom hits viewport bottom
  end: "bottom bottom+=0",     // placeholder, we'll calculate relative to parent
  pin: true,                   // pin the figure
  pinSpacing: true,           // optional, remove extra spacing
  onEnter: () => console.log("Pin started"),
  onLeave: () => console.log("Pin ended"),
  markers: false                // for debugging, can remove in production
});

// Dynamically set `end` relative to parent section
const figure = document.querySelector("figure");
const parentSection = figure.closest("section");
const figureHeight = figure.offsetHeight;
const parentBottom = parentSection.offsetTop + parentSection.offsetHeight;

ScrollTrigger.create({
  trigger: figure,
  scroller: "#viewport",
  start: "bottom bottom",
  end: () => `+=${parentBottom - figure.getBoundingClientRect().bottom}`,
  pin: figure,
  pinSpacing: false,
  markers: false
});

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