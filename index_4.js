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

let audio = new Audio('./media/9.mp3'); // Easier if it is the whole file
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

    if (countsSeconds > 2 ) {
      textBlocks[1].classList.add('showImageOrText');
    }

    if (countsSeconds > 2) {
      textBlocks[2].classList.add('showImageOrText');
    }

    if (countsSeconds > 3) {
      textBlocks[3].classList.add('showImageOrText');
    }

    if (countsSeconds > 10) {
      textBlocks[4].classList.add('showImageOrText');
    }

    if (countsSeconds > 15) {
      textBlocks[5].classList.add('showImageOrText');
    }

    if (countsSeconds > 23) {
      textBlocks[6].classList.add('showImageOrText');
    }

    if (countsSeconds > 32) {
      textBlocks[7].classList.add('showImageOrText');
    }

    if (countsSeconds > 37) {
      textBlocks[8].classList.add('showImageOrText');
    }

    if (countsSeconds > 41) {
      textBlocks[9].classList.add('showImageOrText');
    }

    if (countsSeconds > 53) {
      textBlocks[10].classList.add('showImageOrText');
    }

    if (countsSeconds > 62) {
      textBlocks[11].classList.add('showImageOrText');
    }

    if (countsSeconds > 2.5) {
      textBlocks[12].classList.add('showImageOrText');
    }


    if (countsSeconds > 0) {
      images[0].classList.add('showImageOrText');
    }

    if (countsSeconds > 19) {
      images[1].classList.add('showImageOrText');

    }

    if (countsSeconds > 61) {
      images[2].classList.add('showImageOrText');
    }

    if (countsSeconds > 80) {
      textBlocks[1].classList.add('hideTexts');
      textBlocks[2].classList.add('hideTexts');
      textBlocks[3].classList.add('hideTexts');
      textBlocks[4].classList.add('hideTexts');
      textBlocks[5].classList.add('hideTexts');
      textBlocks[6].classList.add('hideTexts');
      textBlocks[7].classList.add('hideTexts');
      textBlocks[8].classList.add('hideTexts');
      textBlocks[9].classList.add('hideTexts');
      textBlocks[10].classList.add('hideTexts');
      textBlocks[11].classList.add('hideTexts');
      textBlocks[12].classList.add('hideTexts');

    }

    if (countsSeconds > 81) {
      textBlocks[13].classList.add('showImageOrText');
    }

    if (countsSeconds > 81 ) {
      images[3].classList.add('showImageOrText');
      textBlocks[14].classList.add('showImageOrText');
      textBlocks[15].classList.add('showImageOrText');
      textBlocks[16].classList.add('showImageOrText');
    }

    if (countsSeconds > 82 ) {
      textBlocks[17].classList.add('showImageOrText');
    }

    if (countsSeconds > 85.6) {
      images[4].classList.add('showImageOrText');
    }

    if (countsSeconds > 90.2) {
      images[5].classList.add('showImageOrText');
    }

    if (countsSeconds > 94.8) {
      images[6].classList.add('showImageOrText');
      textBlocks[18].classList.add('showImageOrText');
    }

    if (countsSeconds > 99.4) {
      images[7].classList.add('showImageOrText');
    }

    if (countsSeconds > 104) {
      images[8].classList.add('showImageOrText');
      textBlocks[19].classList.add('showImageOrText');
    }

    if (countsSeconds > 108.6) {
      images[9].classList.add('showImageOrText');
      textBlocks[20].classList.add('showImageOrText');
      textBlocks[21].classList.add('showImageOrText');
    }

    if (countsSeconds > 113.2) {
      images[10].classList.add('showImageOrText');
      textBlocks[22].classList.add('showImageOrText');
    }

    if (countsSeconds > 117.8) {
      images[11].classList.add('showImageOrText');
      textBlocks[23].classList.add('showImageOrText');
    }

    if (countsSeconds > 122.4) {
      images[12].classList.add('showImageOrText');

    }


    if (countsSeconds > 127) {
      images[13].classList.add('showImageOrText');
      textBlocks[24].classList.add('showImageOrText');
    }


    if (countsSeconds > 131.6) {
      images[14].classList.add('showImageOrText');
      textBlocks[25].classList.add('showImageOrText');
    }

    if (countsSeconds > 136.2) {
      images[15].classList.add('showImageOrText');

    }

    if (countsSeconds > 141) {
      textBlocks[14].classList.add('hideTexts');
      textBlocks[15].classList.add('hideTexts');
      textBlocks[16].classList.add('hideTexts');
      textBlocks[17].classList.add('hideTexts');
      textBlocks[18].classList.add('hideTexts');
      textBlocks[19].classList.add('hideTexts');
      textBlocks[20].classList.add('hideTexts');
      textBlocks[21].classList.add('hideTexts');
      textBlocks[22].classList.add('hideTexts');
      textBlocks[23].classList.add('hideTexts');
      textBlocks[24].classList.add('hideTexts');
      textBlocks[25].classList.add('hideTexts');

    }

    if (countsSeconds > 142) {
      images[16].classList.add('showImageOrText');
      textBlocks[26].classList.add('showImageOrText');
      textBlocks[27].classList.add('showImageOrText');
      textBlocks[28].classList.add('showImageOrText');

    }

// 1
      if (countsSeconds > 143) {
      textBlocks[29].classList.add('showImageOrText');
      textBlocks[30].classList.add('showImageOrText');
      textBlocks[31].classList.add('showImageOrText');
    }

    if (countsSeconds > 157.5) {
      images[17].classList.add('showImageOrText');
    }
// 2
    if (countsSeconds > 172) {
      images[18].classList.add('showImageOrText');
      textBlocks[32].classList.add('showImageOrText');
      textBlocks[33].classList.add('showImageOrText');
      textBlocks[34].classList.add('showImageOrText');
      textBlocks[29].classList.add('hideTexts');
      textBlocks[30].classList.add('hideTexts');
      textBlocks[31].classList.add('hideTexts');

    }

    if (countsSeconds > 186.5) {
      images[19].classList.add('showImageOrText');
    }
// 3
    if (countsSeconds > 201) {
      images[20].classList.add('showImageOrText');
      textBlocks[35].classList.add('showImageOrText');
      textBlocks[36].classList.add('showImageOrText');
      textBlocks[37].classList.add('showImageOrText');
      textBlocks[32].classList.add('hideTexts');
      textBlocks[33].classList.add('hideTexts');
      textBlocks[34].classList.add('hideTexts');
    }

    if (countsSeconds > 215.5) {
      images[21].classList.add('showImageOrText');

    }
// 4
    if (countsSeconds > 230.1) {
      images[22].classList.add('showImageOrText');
      textBlocks[38].classList.add('showImageOrText');
      textBlocks[39].classList.add('showImageOrText');
      textBlocks[40].classList.add('showImageOrText');
      textBlocks[35].classList.add('hideTexts');
      textBlocks[36].classList.add('hideTexts');
      textBlocks[37].classList.add('hideTexts');
    }
// 5
    if (countsSeconds > 244.7) {
      images[23].classList.add('showImageOrText');
      textBlocks[41].classList.add('showImageOrText');
      textBlocks[42].classList.add('showImageOrText');
      textBlocks[44].classList.add('showImageOrText');
      textBlocks[38].classList.add('hideTexts');
      textBlocks[39].classList.add('hideTexts');
      textBlocks[40].classList.add('hideTexts');

    }

    if (countsSeconds > 259.2) {
      images[24].classList.add('showImageOrText');

    }
// 6
    if (countsSeconds > 273.8) {
      images[25].classList.add('showImageOrText');
      textBlocks[44].classList.add('showImageOrText');
      textBlocks[45].classList.add('showImageOrText');
      textBlocks[46].classList.add('showImageOrText');
      textBlocks[41].classList.add('hideTexts');
      textBlocks[42].classList.add('hideTexts');
      textBlocks[43].classList.add('hideTexts');
    }
// 7
    if (countsSeconds > 288.5) {
      images[26].classList.add('showImageOrText');
      textBlocks[47].classList.add('showImageOrText');
      textBlocks[48].classList.add('showImageOrText');
      textBlocks[49].classList.add('showImageOrText');
      textBlocks[44].classList.add('hideTexts');
      textBlocks[45].classList.add('hideTexts');
      textBlocks[46].classList.add('hideTexts');
    }
// 8
    if (countsSeconds > 302.8) {
      images[27].classList.add('showImageOrText');
      textBlocks[50].classList.add('showImageOrText');
      textBlocks[51].classList.add('showImageOrText');
      textBlocks[52].classList.add('showImageOrText');
      textBlocks[47].classList.add('hideTexts');
      textBlocks[48].classList.add('hideTexts');
      textBlocks[49].classList.add('hideTexts');
    }

    if (countsSeconds > 317.3) {
      images[28].classList.add('showImageOrText');

    }

    if (countsSeconds > 331.9) {
      images[29].classList.add('showImageOrText');
      textBlocks[53].classList.add('showImageOrText');
      textBlocks[54].classList.add('showImageOrText');
      textBlocks[55].classList.add('showImageOrText');
      textBlocks[50].classList.add('hideTexts');
      textBlocks[51].classList.add('hideTexts');
      textBlocks[52].classList.add('hideTexts');
    }

    if (countsSeconds > 343.8) {
      textBlocks[56].classList.add('showImageOrText');
      textBlocks[53].classList.add('hideTexts');
      textBlocks[54].classList.add('hideTexts');
      textBlocks[55].classList.add('hideTexts');
      textBlocks[27].classList.add('hideTexts');
      textBlocks[28].classList.add('hideTexts');

    }


    if (countsSeconds > 360) {
      textBlocks[57].classList.add('showImageOrText');
      textBlocks[58].classList.add('showImageOrText');

    }

    if (countsSeconds > 361) {
      textBlocks[59].classList.add('showImageOrText');
      textBlocks[60].classList.add('showImageOrText');
    }

    if (countsSeconds > 363) {
      textBlocks[61].classList.add('showImageOrText');
      textBlocks[62].classList.add('showImageOrText');
    }

    if (countsSeconds > 365) {
      textBlocks[63].classList.add('showImageOrText');
      textBlocks[64].classList.add('showImageOrText');
    }

    if (countsSeconds > 367) {
      textBlocks[65].classList.add('showImageOrText');
      textBlocks[66].classList.add('showImageOrText');
    }

    if (countsSeconds > 370) {
      textBlocks[67].classList.add('showImageOrText');
      textBlocks[68].classList.add('showImageOrText');
    }

    if (countsSeconds > 373) {
      textBlocks[69].classList.add('showImageOrText');
      textBlocks[70].classList.add('showImageOrText');
    }
      if (countsSeconds > 360) {
      images[30].classList.add('showImageOrText');
    }

    if (countsSeconds > 380) {
      textBlocks[71].classList.add('showImageOrText');
    }

      if (countsSeconds > 380) {
        textBlocks[57].classList.add('hideTexts');
        textBlocks[58].classList.add('hideTexts');
        textBlocks[59].classList.add('hideTexts');
        textBlocks[60].classList.add('hideTexts');
        textBlocks[61].classList.add('hideTexts');
        textBlocks[62].classList.add('hideTexts');
        textBlocks[63].classList.add('hideTexts');
        textBlocks[64].classList.add('hideTexts');
        textBlocks[65].classList.add('hideTexts');
        textBlocks[66].classList.add('hideTexts');
        textBlocks[67].classList.add('hideTexts');
        textBlocks[68].classList.add('hideTexts');
        textBlocks[69].classList.add('hideTexts');
        textBlocks[70].classList.add('hideTexts');
      }

      if (countsSeconds > 382) {
        textBlocks[72].classList.add('showImageOrText');
        textBlocks[73].classList.add('showImageOrText');
      }

      if (countsSeconds > 384) {
        textBlocks[74].classList.add('showImageOrText');
        textBlocks[75].classList.add('showImageOrText');
        textBlocks[76].classList.add('showImageOrText');
      }

      if (countsSeconds > 380) {
      images[31].classList.add('showImageOrText');

      }

      if (countsSeconds > 390) {
        textBlocks[77].classList.add('showImageOrText');

      }

      if (countsSeconds > 390) {
        textBlocks[72].classList.add('hideTexts');
        textBlocks[73].classList.add('hideTexts');
        textBlocks[74].classList.add('hideTexts');
        textBlocks[75].classList.add('hideTexts');
        textBlocks[76].classList.add('hideTexts');
      }

      if (countsSeconds > 392) {
      textBlocks[78].classList.add('showImageOrText');
      textBlocks[79].classList.add('showImageOrText');
}

      if (countsSeconds > 390) {
        images[32].classList.add('showImageOrText');
        images[33].classList.add('showImageOrText');
}

      if (countsSeconds > 394) {
        images[34].classList.add('showImageOrText');


      }else {
      document.body.style.backgroundColor = '';
    }
  }
}
