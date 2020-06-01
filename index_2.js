$('.grid-pane').masonry({
  // options
  itemSelector: '.grid-item',
  columnWidth: 0,
});

const line = document.getElementById('line');
let grid = document.getElementsByClassName('grid-pane');
let posLine = 0;
let timeline = grid[0].clientWidth;
const startAudioBtn = document.getElementById('start-audio-btn');
const hideTextBtn = document.getElementById('hide-text-btn');
const video = document.getElementById('video-popup');
let isAudioRunning = false;
let isTextShown = true;

let audio = new Audio('./media/2.mp3'); // Easier if it is the whole file
let countsSeconds = 0;
const images = document.getElementsByClassName('image-popup');
let textBlocks = document.getElementsByClassName('text-popup');
// let trackDuration = 2107.2; // Duration of file 1:20s = 80s; 55m = 3300s; 58 X 60 = 3.480s
// let trackDuration = audio.duration;
// console.log(trackDuration)

setTimeout(() => {
trackDuration = audio.duration;
}, 100)

window.addEventListener('resize', () => {
  timeline = grid[0].clientWidth;
  // console.log(timeline);
});

startAudioBtn.addEventListener('click', () => {
  goThroughTrack(timeline, trackDuration, isAudioRunning);
  isAudioRunning = !isAudioRunning;
});

hideTextBtn.addEventListener('click', function() {
  isTextShown = !isTextShown;

  if (isTextShown) {
    hideTextBtn.innerHTML = 'Hide Text'}
  else {
    hideTextBtn.innerHTML = 'Show Text'
  };

  textBlocks = Array.from(textBlocks);
  textBlocks.forEach((textBlock) => {
    textBlock.classList.toggle('hideTexts');
  });

})


function goThroughTrack(timeline, trackDuration, isAudioRunning) {
  if (!isAudioRunning) {
    audio.play();
    video.play();
    startAudioBtn.innerHTML = 'Pause Audio';

    let increment = timeline / trackDuration;

    grid[0].addEventListener('mousedown', (e) => {
      posLine = e.screenX - 40; // Hack to compensate for the body
      line.style.left = `${posLine}px`;

      currPercent = getPercentage(posLine, 0, timeline, 0, audio.duration);
      audio.currentTime = currPercent;
      showImagesOnTime(currPercent);
      audio.play();
      video.play();
    });

    interval = setInterval(() => {
      if (posLine > timeline) {
        clearInterval(interval);
        audio.pause();
        video.pause();
      }

      line.style.left = `${posLine}px`;
      posLine += increment;

      countsSeconds++;
      showImagesOnTime(countsSeconds);
    }, 1000);
  } else {

    audio.pause();
    video.pause();
    startAudioBtn.innerHTML = 'Start Audio';
    clearInterval(interval);
  }
}

const getPercentage = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

function showImagesOnTime(countsSeconds) {
  if (countsSeconds < audio.duration) {
    // console.log(textBlocks[1])
    // textBlocks[0].classList.add('showImageOrText');

    if (countsSeconds > 0) {
      textBlocks[0].classList.add('showImageOrText');
    }


      if (countsSeconds > 394) {
        images[34].classList.add('showImageOrText');


      }else {
      document.body.style.backgroundColor = '';
    }
  }
}
