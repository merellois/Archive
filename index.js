$('.grid-pane').masonry({
  // options
  itemSelector: '.grid-item',
  columnWidth: 0,
});

//////////////////////////////

var space = 10;
var speed = 2;
var direction = "left";


// create a ticker div
var tickerdiv = $("<div>").attr("id","ticker");
tickerdiv.css({
    "display":"inline-block",
    "white-space": "nowrap",
    "position":"relative"
});

$("#ticker-container").append(tickerdiv);
$("#ticker-container").css("overflow","hidden");

$("#ticker-text").css({
    "display":"inline-block",
    "position":"absolute"
});
tickerdiv.append(  $("#ticker-text") );

var xpos    = $("#ticker-text").width() + space;
var totalw  = $("#ticker-text").width() + $("#ticker-container").width();
while (xpos < totalw ) {
    var clone = $("#ticker-text").clone();
    //clone.addClass("class-" + i);
    clone.css({
        "left":xpos,

    });
    tickerdiv.append( clone );

    xpos += clone.width() + space;

}

animate();

function animate() {

    if (direction === "left") {
        var farright = (tickerdiv.children().length-1) * ($("#ticker-text").width() + space) + space;

        tickerdiv.children().each(function(){
            var pos = $(this).position().left - speed;
            $(this).css("left",pos);
            if ($(this).position().left < -($("#ticker-text").width())) {
                $(this).css("left",farright);
            }
        });
    }
    else {

        var farleft = 0;

        tickerdiv.children().each(function(){
            var pos = $(this).position().left + speed;

            $(this).css("left",pos);
            if ($(this).position().left > $("#ticker-container").width()) {
                $(this).css("left", farleft - $("#ticker-text").width() - space );
                farleft = $(this).position().left;
            }
        });
    }


    window.requestAnimationFrame(animate);
}


/////////////////////////////

const line = document.getElementById('line');
let grid = document.getElementsByClassName('grid-pane');
let posLine = 0;
let timeline = grid[0].clientWidth;
const startAudioBtn = document.getElementById('start-audio-btn');
const hideTextBtn = document.getElementById('hide-text-btn');
let isAudioRunning = false;
let isTextShown = true;

let audio = new Audio('./media/complete record.mp3'); // Easier if it is the whole file
let countsSeconds = 0;
const images = document.getElementsByClassName('image-popup');
let textBlocks = document.getElementsByClassName('text-popup');
let trackDuration = 3480; // Duration of file 1:20s = 80s; 55m = 3300s; 58 X 60 = 3.480s

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
    startAudioBtn.innerHTML = 'Pause Audio';

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
    if (countsSeconds > 0) {
      images[0].classList.add('showImageOrText');
      textBlocks[0].classList.add('showImageOrText');
    }
    if (countsSeconds > 50) {
      images[1].classList.add('showImageOrText');
      textBlocks[1].classList.add('showImageOrText');
    }
    if (countsSeconds > 60) {
      textBlocks[2].classList.add('showImageOrText');
    } else {
      document.body.style.backgroundColor = '';
    }
  }
}
