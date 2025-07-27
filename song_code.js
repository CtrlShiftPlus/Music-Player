console.log("Welcome to TuneZone");
let songIndex=0;
let audioElement = new Audio('songs/Blessed.mp3');
let masterplay = document.getElementById('masterplay');
let masterIcon = document.getElementById('masterIcon');
let myprogressbar=document.getElementById('progressbar');
let gif=document.getElementById('songgif')
let songitems=Array.from(document.getElementsByClassName('songitem'));
let mastersongname=document.getElementById('song_underinfo');

let songs=[
    {songName:"Blessed - Elton John", filePath:"songs/Blessed.mp3",coverPath:"resources/400_600_cover1.webp"},
    {songName:"Can You Feel The Love Tonight", filePath:"songs/Can_You_Feel_The_Love_Tonight.mp3",coverPath:"resources/583_583_cover2.jpg"},
    {songName:"Candle In The Wind", filePath:"songs/Candle_In_The_Wind.mp3",coverPath:"resources/cover3.jpg"},
    {songName:"Nikita - Elton John", filePath:"songs/Nikita.mp3",coverPath:"resources/cover4.webp"},
    {songName:"Please - Elton John", filePath:"songs/Please.mp3",coverPath:"resources/cover5.jpg"},
    {songName:"Sacrifice - Elton John", filePath:"songs/Sacrifice.mp3",coverPath:"resources/cover6.jpg"},
    {songName:"Song For Guy - Elton John", filePath:"songs/Song_For_Guy.mp3",coverPath:"resources/cover7.jpg"},
    {songName:"Waka Waka - Shakira", filePath:"songs/Waka-Waka-Time-For-Africa.mp3",coverPath:"resources/cover8.jpg"},
    {songName:"Your Song - Elton John", filePath:"songs/Your_Song.mp3",coverPath:"resources/cover9.png"}
]

songitems.forEach((element,i) => {
    console.log(element, i)
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("song_title")[0].innerText=songs[i].songName;
});
//audioElement.play();

//handle play click
masterplay.addEventListener('click', ()=>{
    console.log("Play Button clicked");
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        updateSongButtonIcons(songIndex, true);
        masterIcon.src = "resources/pause_button.jpg";
        gif.style.opacity=1;
    } 
    else 
    {
        audioElement.pause();
        updateSongButtonIcons(songIndex, false);
        masterIcon.src = "resources/play_button.jpg";
        gif.style.opacity=0;
    }
})

audioElement.addEventListener('timeupdate', ()=>
{
    console.log('timeupdate');
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value=progress;
})

myprogressbar.addEventListener('input', ()=>{
    audioElement.currentTime=myprogressbar.value * audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songplay')).forEach((element) => {
        element.src = "resources/play_button.jpg";
    });
};

Array.from(document.getElementsByClassName('songplay')).forEach((element,i) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        if (e.target.src.includes("play_button.jpg")) 
        {
            makeAllPlays(); 
            songIndex = i;
            gif.style.opacity=1;
            e.target.src = "resources/pause_button.jpg"; 
            audioElement.src=songs[songIndex].filePath;
            mastersongname.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            updateSongButtonIcons(songIndex, true);
            masterIcon.src = "resources/pause_button.jpg";

        } 
        else 
        {
            gif.style.opacity=0;
            e.target.src = "resources/play_button.jpg";
            audioElement.pause();
            updateSongButtonIcons(songIndex, false);
            masterIcon.src="resources/play_button.jpg";
        }
    });
});

document.getElementById('forward').addEventListener('click', ()=>{
    makeAllPlays();
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src=songs[songIndex].filePath;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updateSongButtonIcons(songIndex, true);
    masterIcon.src = "resources/pause_button.jpg";
})

document.getElementById('previous').addEventListener('click', ()=>{
    makeAllPlays();
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src=songs[songIndex].filePath;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updateSongButtonIcons(songIndex, true);
    masterIcon.src = "resources/pause_button.jpg";
})

const updateSongButtonIcons = (currentIndex, isPlaying) => {
    Array.from(document.getElementsByClassName('songplay')).forEach((btn, index) => {
        if (index === currentIndex && isPlaying) {
            btn.src = "resources/pause_button.jpg";
        } else {
            btn.src = "resources/play_button.jpg";
        }
    });
};


