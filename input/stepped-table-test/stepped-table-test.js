const mainTrigger = PinToBottom({ element: '.table-section table', });

const sectionEl = document.querySelector('.viewport .table-section');
const pFirst = document.querySelector('.viewport .table-section p:first-of-type');
const pLast = document.querySelector('.viewport .table-section p:last-of-type');

const arrowEl = document.createElement('div');
arrowEl.classList.add('arrow');

sectionEl.insertBefore(arrowEl, pFirst);

setTimeout(() => {
  ScrollTrigger.create({
    trigger: pFirst,
    scroller: '#viewport',
    start: () => mainTrigger.start,
    end: () => {
      const offset = pLast.offsetTop + pLast.offsetHeight - pFirst.offsetTop - arrowEl.offsetHeight;

      //return mainTrigger.start + 500;
      return mainTrigger.start + offset;
    },
    pin: arrowEl,
    pinSpacing: false,                     // remove leftover spacing
    pinType: "transform",                  // smooth mobile pinning
    anticipatePin: 0,                       // reduces jump at start
    markers: true,
  });
}, 500);

HighlightOnFlypast({
  triggers: '.table-section p',
  targets: '.table-section table tbody tr',
  highlightClass: 'highlight',
});
