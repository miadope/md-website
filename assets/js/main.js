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
