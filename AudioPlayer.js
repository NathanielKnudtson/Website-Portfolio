/************************** Playlist **************************/
const playList = [
    {
        id: 0,
        songTitle: "TakeTwo",
        songArtist: "Nathaniel Knudtson",
        songAudio: "AudioFiles/ArtGamesSong1_TakeTwo.wav",
        songCoverArt: null,
    },
    {
        id: 1,
        songTitle: "In the Rain",
        songArtist: "Nathaniel Knudtson",
        songAudio: "AudioFiles/Lost_in_the_Rain.wav",
        songCoverArt: null,
    },
    {
        id: 2,
        songTitle: "Peace",
        songArtist: "Nathaniel Knudtson",
        songAudio: "AudioFiles/Peace.wav",
        songCoverArt: null,
    },
    {
        id: 3,
        songTitle: "Pensive",
        songArtist: "Nathaniel Knudtson",
        songAudio: "AudioFiles/Pensive.wav",
        songCoverArt: null,
    },
    {
        id: 4,
        songTitle: "Dance with The Don",
        songArtist: "Nathaniel Knudtson",
        songAudio: "AudioFiles/GameModSong.wav",
        songCoverArt: null,
    },
    {
        id: 5,
        songTitle: "Space Waves",
        songArtist: "Nathaniel Knudtson",
        songAudio: "AudioFiles/ArtGamesSong5 Project.wav",
        songCoverArt: null,
    },
    {
        id: 6,
        songTitle: "TakeOne",
        songArtist: "Nathaniel Knudtson",
        songAudio: "AudioFiles/ArtGamesSong1.wav",
        songCoverArt: null,
    },
    {
        id: 7,
        songTitle: "Robot Country",
        songArtist: "Nathaniel Knudtson",
        songAudio: "AudioFiles/ArtGamesSong2 Project.wav",
        songCoverArt: null,
    },
];

let currentId = 0;

let songTitle = document.getElementById("song-title");
let songArtist = document.getElementById("song-artist");

let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

let hideContainer = document.getElementById("hidden-c");
let showContainer = document.getElementById("music-c");

let hrSeparator = document.getElementById("separator");
let showPlaylist = document.getElementById("show_playlist");

let acknowledgments = document.getElementById("acknowledgments");
let acknowledgmentsContainer = document.getElementById("acknowledgments-container");

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
}

song.addEventListener('ended', function () {
    next_song();
})

if (song.play()) {
    setInterval(() => {
        progress.value = song.currentTime;
    }, 500);
}

progress.onchange = function () {
    song.play();
    song.currentTime = progress.value;
    if (ctrlIcon.classList.contains("fa-play")) {
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    }
}

let playlistIsOpen = false;

for (i = 0; i < playList.length; ++i) {
    var span = document.createElement('span');
    var li = document.createElement('li');

    if (i === 0) {
        li.style.color = "#FF8551";
        span.style.color = "#FF8551";
    }
    else {
        li.style.color = "#808080";
        span.style.color = "#808080";
    }

    span.style.fontFamily = 'Nunito';
    span.innerText = playList[i].songTitle;

    // For just title
    // li.appendChild(span);

    // For title and artist
    li.innerText = playList[i].songTitle + " by " + playList[i].songArtist;

    showPlaylist.appendChild(li);
}

/************************ Open Playlist *************************/
function openPlaylist() {
    if (showPlaylist.style.display === "none") {
        showPlaylist.style.display = "block";
        hrSeparator.style.display = "block";
    } else {
        showPlaylist.style.display = "none";
        hrSeparator.style.display = "none";
    };
}

/******************* Change Play/Pause Image ********************/
function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
    else if (ctrlIcon.classList.contains("fa-play")) {
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    }
}

/********************** Hide Audio Player ***********************/
function hideAudioPlayer() {
    showContainer.style.display = "none";
    hideContainer.style.display = "block";
}

/********************** Show Audio Player ***********************/
function showAudioPlayer() {
    showContainer.style.display = "block";
    hideContainer.style.display = "none";
}

/************************** Next Song **************************/
let songCoverArt = document.getElementById("song-CoverArt");
let listItems = showPlaylist.getElementsByTagName("li");
let spanItems = showPlaylist.getElementsByTagName("span");

function next_song() {
    if (currentId === playList.length - 1) {
        currentId = 0;
    }
    else {
        currentId++;
    }

    if (ctrlIcon.classList.contains("fa-play")) {
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    }

    songTitle.textContent = playList[currentId].songTitle;
    song.pause();
    song.src = playList[currentId].songAudio;
    song.play();

    for (let i = 0; i < playList.length; i++) {
        if (i === currentId) {
            listItems[i].style.color = "#FF8551";
            spanItems[i].style.color = "#FF8551";
        }
        else {
            listItems[i].style.color = "#808080";
            spanItems[i].style.color = "#808080";
        }
    }


    // Uncomment the following line if you want artist name present
    songArtist.textContent = playList[currentId].songArtist;

    // Uncomment the following line if you want album cover photos
    // songCoverArt.src = playList[currentId].songCoverArt;
}

/************************ Previous Song ************************/
function previous_song() {
    let previousId;
    if (currentId === 0) {
        previousId = playList.length - 1;
    }
    else {
        previousId = currentId - 1;
    }

    currentId = previousId;

    if (ctrlIcon.classList.contains("fa-play")) {
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    }

    songTitle.textContent = playList[previousId].songTitle;
    song.pause();
    song.src = playList[previousId].songAudio;
    song.play();

    for (let i = 0; i < playList.length; i++) {
        if (i === currentId) {
            listItems[i].style.color = "#FF8551";
            spanItems[i].style.color = "#FF8551";
        }
        else {
            listItems[i].style.color = "#808080";
            spanItems[i].style.color = "#808080";
        }
    }
}

/******************** Show Acknowledgments ********************/
function showAcknowledgments() {
    if (acknowledgmentsContainer.style.display === "block") {
        acknowledgmentsContainer.style.display = "none";
    } else {
        acknowledgmentsContainer.style.display = "block";
    };
}