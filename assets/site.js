const slides = [
  ['inbox', 'Your inbox', 'Inbox mockup showing updates from Claude Code, Codex, and Muse.'],
  ['listening', 'Listen on your time', 'Listening mockup showing a release briefing, waveform, and playback controls.'],
  ['rules', 'Your rules', 'Rules mockup showing notifications for decisions, completed work, and a daily catch-up.']
];
let current = 0;
let timer;
const preview = document.querySelector('.app-preview');
const play = document.getElementById('slide-play');
function show(offset) {
  current = (current + offset + slides.length) % slides.length;
  const [file, title, description] = slides[current];
  const screen = document.getElementById('app-screen');
  screen.src = `/assets/screens/${file}.svg`;
  screen.alt = description;
  document.getElementById('slide-caption').textContent = `${current + 1} / 3 · ${title}`;
}
function stop() {
  clearInterval(timer);
  timer = undefined;
  play.textContent = 'Play slideshow';
  play.setAttribute('aria-pressed', 'false');
  document.getElementById('slide-caption').setAttribute('aria-live', 'polite');
}
document.getElementById('previous-slide').addEventListener('click', () => {stop(); show(-1);});
document.getElementById('next-slide').addEventListener('click', () => {stop(); show(1);});
play.addEventListener('click', () => {
  if (timer) return stop();
  document.getElementById('slide-caption').setAttribute('aria-live', 'off');
  timer = setInterval(() => show(1), 4500);
  play.textContent = 'Pause slideshow';
  play.setAttribute('aria-pressed', 'true');
});
preview.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault(); stop(); show(event.key === 'ArrowRight' ? 1 : -1);
  }
});
document.addEventListener('visibilitychange', () => {if (document.hidden) stop();});
