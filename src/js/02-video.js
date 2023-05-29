import Player from '@vimeo/player'; 
import throttle from 'lodash.throttle'; 

const iframe = document.querySelector('iframe'); 
const player = new Player(iframe); 
const storageKey = 'videoplayer-current-time'; 

player.on('timeupdate', throttle(saveCurrentTime, 1000)); 

function saveCurrentTime(event) {
  const currentTime = event.seconds; 
  localStorage.setItem(storageKey, currentTime); 
}

function reloadPage(time) {
  if (time) {
    player.setCurrentTime(time)
    };
};

const currentTime = localStorage.getItem(storageKey);
reloadPage(currentTime);
