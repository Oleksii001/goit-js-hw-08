import Player from '@vimeo/player'; 
import throttle from 'lodash.throttle'; 

const iframe = document.querySelector('iframe'); 
const player = new Player(iframe); 
const storageKey = 'videoplayer-current-time'; 

player.on('play', function() {
  console.log('played the video!'); 
});

player.getVideoTitle().then(function(title) {
  console.log('title:', title); 
});

player.on('timeupdate', throttle(saveCurrentTime, 1000)); 

function saveCurrentTime(event) {
  const currentTime = event.seconds; 
  localStorage.setItem(storageKey, currentTime); 
}

function reloadPage(time) {
  if (time) {
    player
      .setCurrentTime(time)
      .then(function (seconds) { })
      .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;

        default:
          break;
      }
    });
  }
}

const currentTime = localStorage.getItem(storageKey);
reloadPage(currentTime);
