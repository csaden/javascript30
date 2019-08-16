/* get the input elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggleButton = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');

/* write the functions */

async function playVideo() {
  try {
    await video.play();
  } catch (err) {
    console.error(err);
  }
}

function togglePlay() {
  if (video.paused) {
    playVideo();
  } else {
    video.pause();
  }
}

function updateToggleButton() {
  toggleButton.textContent = this.paused ? '►' : '❚ ❚';
}

function skipTo() {
  video.currentTime += parseInt(this.dataset.skip, 10);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${progress}%`;
}

function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

let mousedown = false;

/* hook up the event listeners */
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggleButton);
video.addEventListener('pause', updateToggleButton);
toggleButton.addEventListener('click', togglePlay);
skipButtons.forEach(skipButton => {
  skipButton.addEventListener('click', skipTo);
});
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
});
ranges.forEach(range => {
  range.addEventListener('mousemove', handleRangeUpdate);
});
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
