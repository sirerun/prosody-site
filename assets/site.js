const slides = [
  [29, 'Narrated briefing', 'Ratified Current Blue design: narrated briefing with waveform and playback controls.'],
  [418, 'Supplied audio', 'Ratified Current Blue design: original audio playback in dark mode.'],
  [807, 'Image and narration', 'Ratified Current Blue design: an image accompanied by narration.'],
  [1196, 'Supplied video', 'Ratified Current Blue design: original video playback.']
];
let current = 0;
let timer;
const preview = document.querySelector('.app-preview');
const play = document.getElementById('slide-play');
function show(offset) {
  current = (current + offset + slides.length) % slides.length;
  const [file, title, description] = slides[current];
  const screen = document.getElementById('app-screen');
  screen.style.left = `${-file / 364 * 100}%`;
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
