/* No framework, build process, tracking, or external services required. */
const entrance = document.querySelector('.entrance');
const art = document.querySelector('.chapel-art');
const main = document.querySelector('main');
const enterButton = document.querySelector('.enter');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const portrait = matchMedia('(max-width: 900px) and (orientation: portrait)');
let opening = false;
let timers = [];

function drawChapel() {
  const mobile = portrait.matches;
  const src = mobile ? 'assets/chapel/portrait.jpg' : 'assets/chapel/landscape.jpg';
  // Paths trace the actual door edges in the two separately composed artworks.
  const left = mobile
    ? 'M 210 793 L 210 403 C 210 358 365 322 500 322 L 500 793 Z'
    : 'M 372 906 L 372 329 C 372 269 435 230 500 230 L 500 906 Z';
  const right = mobile
    ? 'M 500 322 C 635 322 795 358 795 403 L 795 793 L 500 793 Z'
    : 'M 500 230 C 565 230 625 269 625 329 L 625 906 L 500 906 Z';
  const image = `<image href="${src}" width="1000" height="1000" preserveAspectRatio="none"/>`;
  art.innerHTML = `<svg viewBox="0 0 1000 1000" preserveAspectRatio="none"><defs><mask id="facade-mask"><rect width="1000" height="1000" fill="white"/><path d="${left} ${right}" fill="black"/></mask></defs><g mask="url(#facade-mask)">${image}</g></svg>` +
    [['left', left], ['right', right]].map(([side, path]) => `<svg class="door ${side}" viewBox="0 0 1000 1000" preserveAspectRatio="none"><defs><clipPath id="${side}-clip"><path d="${path}"/></clipPath></defs><g clip-path="url(#${side}-clip)">${image}</g></svg>`).join('');
}
function finishEntrance() {
  timers.forEach(clearTimeout); timers = [];
  entrance.hidden = true;
  entrance.classList.remove('opening', 'leaving');
  document.body.classList.remove('intro-active');
  main.inert = false;
  opening = false;
  main.focus({ preventScroll: true });
}
function openDoors(skip = false) {
  if (opening && !skip) return;
  opening = true;
  if (skip || reduceMotion.matches) { finishEntrance(); return; }
  entrance.classList.add('opening');
  timers.push(setTimeout(() => { entrance.classList.add('leaving'); }, 1350));
  timers.push(setTimeout(finishEntrance, 2250));
}
function showEntrance() {
  timers.forEach(clearTimeout); timers = [];
  window.scrollTo({top: 0, behavior: 'instant'});
  opening = false;
  entrance.classList.remove('opening', 'leaving');
  drawChapel();
  entrance.hidden = false;
  main.inert = true;
  document.body.classList.add('intro-active');
  enterButton.focus({preventScroll: true});
}
enterButton.addEventListener('click', () => openDoors());
document.querySelector('.skip-intro').addEventListener('click', () => openDoors(true));
document.querySelector('.replay').addEventListener('click', showEntrance);
// Tapping the doors themselves also opens the entrance.
art.addEventListener('click', () => openDoors());
document.querySelector('.skip-link').addEventListener('click', () => { if (!entrance.hidden) openDoors(true); });
portrait.addEventListener('change', () => { if (!entrance.hidden) drawChapel(); });
document.addEventListener('keydown', (event) => {
  if (entrance.hidden) return;
  if (event.key === 'Escape') openDoors(true);
  if (event.key === 'Tab') {
    const skip = document.querySelector('.skip-intro');
    if (event.shiftKey && document.activeElement === enterButton) { event.preventDefault(); skip.focus(); }
    else if (!event.shiftKey && document.activeElement === skip) { event.preventDefault(); enterButton.focus(); }
  }
});
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  document.documentElement.classList.add('motion');
  const observer = new IntersectionObserver((entries) => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), {threshold: .08});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
const lightbox = document.querySelector('.lightbox');
let lastPhotoButton;
document.querySelectorAll('.photo-button').forEach(button => {
  button.addEventListener('click', () => {
    if (typeof lightbox.showModal !== 'function') { window.open(button.querySelector('img').src, '_blank', 'noopener'); return; }
    const source = button.querySelector('img');
    lastPhotoButton = button;
    lightbox.querySelector('img').src = `assets/photos/${button.dataset.photo}.jpg`;
    lightbox.querySelector('img').alt = source.alt;
    lightbox.querySelector('figcaption').textContent = source.alt;
    lightbox.showModal();
    document.body.classList.add('viewing-photo');
  });
});
document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox || event.target === lightbox.querySelector('figure')) lightbox.close(); });
lightbox.addEventListener('close', () => { document.body.classList.remove('viewing-photo'); lastPhotoButton?.focus({preventScroll:true}); });
showEntrance();

const albumCover = document.querySelector('.album-cover');
const secondRoll = document.querySelector('#second-roll');
function toggleAlbum(open) {
 document.querySelector('.memory-album').classList.toggle('is-open', open);
 albumCover.setAttribute('aria-expanded', String(open));
 secondRoll.hidden = !open;
 if (open) { secondRoll.setAttribute('tabindex', '-1'); secondRoll.focus({preventScroll:true}); secondRoll.scrollIntoView({behavior:reduceMotion.matches ? 'instant' : 'smooth', block:'start'}); }
 else albumCover.focus({preventScroll:true});
}
albumCover.addEventListener('click', () => toggleAlbum(true));
document.querySelector('.close-album').addEventListener('click', () => toggleAlbum(false));
