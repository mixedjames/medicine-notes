const mainTrigger = PinToBottom({ element: '.table-section table', });

const sectionEl = document.querySelector('.viewport .table-section');
const pFirst = document.querySelector('.viewport .table-section p:first-of-type');
const pLast = document.querySelector('.viewport .table-section p:last-of-type');

const arrowEl = document.createElement('div');
arrowEl.classList.add('arrow');

sectionEl.insertBefore(arrowEl, pFirst);

ScrollTrigger.create({
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
  anticipatePin: 1,                       // reduces jump at start
  markers: false,
});

function PinFromSharedTrigger(options) {
  ScrollTrigger.create({
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
    anticipatePin: 1,                       // reduces jump at start
    markers: false,
  });
}

let yOffset = 0;
const targets = document.querySelectorAll('.table-section table tbody tr');

document.querySelectorAll('.table-section p').forEach((element, index, array) => {

  let height = 0;
  if (index == array.length - 1) {
    height = element.offsetHeight;
  }
  else {
    height = array[index + 1].offsetTop - element.offsetTop;
  }

  const yOffsetCopy = yOffset;

  ScrollTrigger.create({
    scroller: '#viewport',
    start: () => {
      return mainTrigger.start + yOffsetCopy + 'px';
    },
    end: () => `+=${height}px`,
    markers: true,

    onEnter: () => addHighlight(targets[index]),
    onEnterBack: () => addHighlight(targets[index]),
    onLeave: () => removeHighlight(targets[index]),
    onLeaveBack: () => removeHighlight(targets[index]),

  });

  yOffset += height;

  function addHighlight(e) {
    e.classList.add('highlight');
  }

  function removeHighlight(e) {
    e.classList.remove('highlight');
  }

});

if (false) {
  HighlightOnFlypast({
    triggers: '.table-section p',
    targets: '.table-section table tbody tr',
    highlightClass: 'highlight',
  });
}