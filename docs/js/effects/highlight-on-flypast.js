define(
  ['gsap', 'ScrollTrigger'],
  function (gsapModule, ScrollTriggerModule) {

    return function HighlightOnFlypast(options) {

      const viewport = document.getElementById('viewport');
      const triggers = document.querySelectorAll(options.triggers);
      const targets = document.querySelectorAll(options.targets);

      if (triggers.length !== targets.length) {
        throw new Error("Triggers and targets do not have the same number of elements!");
      }

      triggers.forEach((element, index, array) => {
        ScrollTrigger.create({
          trigger: element,
          scroller: viewport,
          start: "top center",
          end: "bottom center",
          onEnter: () => addHighlight(targets[index]),
          onEnterBack: () => addHighlight(targets[index]),
          onLeave: () => removeHighlight(targets[index]),
          onLeaveBack: () => removeHighlight(targets[index]),
          markers: false,
        });

      });

      function addHighlight(e) {
        e.classList.add(options.highlightClass);
      }

      function removeHighlight(e) {
        e.classList.remove(options.highlightClass);
      }
    }
});