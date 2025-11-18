const mainTrigger = PinToBottom({ element: '.table-section table', });

const sectionEl = document.querySelector('.viewport .table-section');
const pFirst = document.querySelector('.viewport .table-section p:first-of-type');

const arrowEl = document.createElement('div');
arrowEl.classList.add('arrow');

sectionEl.insertBefore(arrowEl, pFirst);

if (true) {
  ScrollTrigger.create({
    trigger: mainTrigger.trigger,   // inherits DOM element
    scroller: mainTrigger.scroller,
    start: mainTrigger.vars.start,  // inherits start value
    end: mainTrigger.vars.end,      // inherits end value
    pin: arrowEl,
    pinSpacing: false,                     // remove leftover spacing
    pinType: "transform",                  // smooth mobile pinning
    anticipatePin: 0,                       // reduces jump at start
    markers: false,
  });
}

HighlightOnFlypast({
  triggers: '.table-section p',
  targets: '.table-section table tbody tr',
  highlightClass: 'highlight',
});
