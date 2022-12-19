const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl =document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// music

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Demo 3',
        artist: 'Jacinto Design',
    }
];



// check if playing
let isPlaying = false;

// play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

// pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

// play or pause 
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//  update DOM
function loadSong(song) {
    title.textContent =  song.displayName;
    artist.textContent = song.artist;
    music.src =`music/${song.name}.mp3`;
    image.src =`img/${song.name}.jpg`;
}

// current song
let songIndex = 0;

// previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// next song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// on load - select first song
loadSong(songs[songIndex]);

// update progress bar and time

function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        console.log(e);
        // update progress bar width
        const progressPrecentage = (currentTime / duration) * 100;
        progress.style.width = `${progressPrecentage}%`;
        // calculate duration time
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // delay duration time until we get seconds as a number
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // calculate current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        } 
        // delay current time until we get seconds as a number
        if(currentSeconds) {
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
}

// set progress bar
function setProgressBar(e) {
    console.log(e);
    const width = this.clientWidth;
    console.log('width', width);
    const clickX = e.offsetX;
    console.log('clickX', clickX);
    // not entirely sure how this works below
    const { duration } = music; 
    console.log(clickX / width);
    music.currentTime = (clickX / width) * duration;
}


// eventlistener
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);