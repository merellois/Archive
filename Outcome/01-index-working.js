$('.grid-pane').masonry({
  // options
  itemSelector: '.grid-item',
  columnWidth: 0,
});

/////////////////////////////

const line = document.getElementById('line');
let grid = document.getElementsByClassName('grid-pane');
let posLine = 0;
let timeline = grid[0].clientWidth;
const startAudio = document.getElementById('start-audio');
let isAudioRunning = false;

let audio = new Audio('./media/1.mp3'); // Easier if it is the whole file
let countsSeconds = 0;
const images = document.getElementsByClassName('image-popup');
let trackDuration = 82; // Duration of file 1:20s = 80s; 55m = 3300s

window.addEventListener('resize', () => {
  timeline = grid[0].clientWidth;
  console.log(timeline);
});

startAudio.addEventListener('click', () => {
  goThroughTrack(timeline, trackDuration, isAudioRunning);
  isAudioRunning = !isAudioRunning;
});

function goThroughTrack(timeline, trackDuration, isAudioRunning) {
  if (!isAudioRunning) {
    audio.play();

    let increment = timeline / trackDuration;

    grid[0].addEventListener('mousedown', (e) => {
      posLine = e.screenX - 40; // Hack to compensate for the body
      line.style.left = `${posLine}px`;

      currPercent = getPercentage(posLine, 0, timeline, 0, audio.duration);
      audio.currentTime = currPercent;
      showImagesOnTime(currPercent);
      audio.play();
    });

    interval = setInterval(() => {
      if (posLine > timeline) {
        clearInterval(interval);
        audio.pause();
      }

      line.style.left = `${posLine}px`;
      posLine += increment;

      countsSeconds++;
      showImagesOnTime(countsSeconds);
    }, 1000);
  } else {
    audio.pause();
    clearInterval(interval);
  }
}

const getPercentage = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

function showImagesOnTime(countsSeconds) {
  if (countsSeconds < audio.duration) {
    if (countsSeconds > 5) {
      images[0].style.display = 'block';
    }
    if (countsSeconds > 10) {
      images[1].style.display = 'block';
    } else {
      document.body.style.backgroundColor = '';
    }
  }
}
