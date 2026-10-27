// Mobile menu: below 900px the burger opens the main nav as a panel under the header.
const burger = document.querySelector('.burger');
const nav = document.getElementById('site-nav');

function setMenu(open){
  nav.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', String(open));
}

if(burger && nav){
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.addEventListener('click', e => { if(e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') setMenu(false); });
}

// Motion: only when the inline script in <head> switched it on (not for reduced motion).
const root = document.documentElement;

if(root.classList.contains('motion')){
  root.classList.add('motion-on');

  // Wrap every word of [data-split] headings in a mask so it can rise into place.
  document.querySelectorAll('[data-split]').forEach(el => {
    let n = 0;
    const walk = node => {
      [...node.childNodes].forEach(child => {
        if(child.nodeType === Node.ELEMENT_NODE){ walk(child); return; }
        if(child.nodeType !== Node.TEXT_NODE) return;
        const frag = document.createDocumentFragment();
        // split after hyphens too, so "ADHD-founder" can still wrap like plain text
        child.textContent.split(/(\s+)|(?<=-)/).forEach(part => {
          if(!part) return;
          if(/^\s+$/.test(part)){ frag.append(part); return; }
          const mask = document.createElement('span');
          const word = document.createElement('span');
          mask.className = 'w';
          word.className = 'wi';
          word.style.setProperty('--wi', Math.min(n++, 16));
          word.textContent = part;
          mask.append(word);
          frag.append(mask);
        });
        child.replaceWith(frag);
      });
    };
    walk(el);
    el.classList.add('is-split');
  });

  document.querySelectorAll('[data-stagger]').forEach(group => {
    [...group.children].forEach((child, i) => child.style.setProperty('--i', i));
  });

  // Reveal once, as each block comes into view.
  // Photo wipes wait until their images have loaded: the large photos are lazy,
  // and a wipe that runs on an empty frame ends with the photo popping in.
  const imagesReady = el => Promise.all([...el.querySelectorAll('img')].map(img =>
    img.complete ? null : new Promise(done => {
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    })));
  const show = el => {
    if(el.dataset.reveal === 'clip') imagesReady(el).then(() => el.classList.add('is-in'));
    else el.classList.add('is-in');
  };
  // How much of a block must be on screen before it starts: text as it enters,
  // photo wipes once a third of the screen shows the frame (otherwise a tall photo
  // wipes open below the fold and is never seen). data-reveal-at="100" overrides
  // this with a distance in pixels.
  const thresholdFor = el => el.dataset.revealAt ? `${el.dataset.revealAt}px`
    : el.dataset.reveal === 'clip' ? '35%' : '10%';
  const observers = new Map();
  const observe = (el, threshold) => {
    if(!observers.has(threshold)){
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if(!entry.isIntersecting) return;
          show(entry.target);
          io.unobserve(entry.target);
        });
      }, { rootMargin: `0px 0px -${threshold} 0px` });
      observers.set(threshold, io);
    }
    observers.get(threshold).observe(el);
  };
  const shownPx = threshold => threshold.endsWith('%')
    ? innerHeight * parseFloat(threshold) / 100 : parseFloat(threshold);
  // What is already on screen starts at once, without waiting for the observer;
  // reading the rect first commits the hidden state, so the transition still plays.
  document.querySelectorAll('[data-split], [data-reveal], [data-stagger]').forEach(el => {
    const threshold = thresholdFor(el);
    if(el.getBoundingClientRect().top < innerHeight - shownPx(threshold)) show(el);
    else observe(el, threshold);
  });

  // Pointer effects, only with a real mouse.
  if(matchMedia('(hover: hover) and (pointer: fine)').matches){
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.25;
        const y = (e.clientY - r.top - r.height / 2) * 0.35;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });

    document.querySelectorAll('[data-spot]').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }
}
