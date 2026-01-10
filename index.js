console.log("JS Started")
let songs;
let currFolder;
let currentSong = new Audio()
function SecondstoMinutes(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const Minutes = Math.floor(seconds / 60);
    const remSec = Math.floor(seconds % 60);

    const formattedMinutes = String(Minutes).padStart(2, '0');
    const formattedremSec = String(remSec).padStart(2, '0');
    return `${formattedMinutes}:${formattedremSec}`
}
async function albums() {
    let card = document.querySelector(".SongImage")
    let a = await fetch(`/Songs/playlist.json`)
    let r = await a.json()
    let folders = r.folders;
    // console.log(res)
    // let div = document.createElement("div")
    // div.innerHTML = r;
    // // console.log(div)
    // let anchors = div.getElementsByTagName("a")
    // console.log(anchors)
 card.innerHTML = ""
    let arr = Array.from(anchors)
    for (let fold of folders) {
        // const e = arr[index];
        // console.log(e.href)
       
        // if (e.href.includes("%5CSongs") && !e.href.includes("htaccess")) {
        //     let splitted = e.href.split("/").slice(-2)[0]
        //     console.log(splitted)
        //     let folder = splitted.split("%5C")[2]
        //     console.log(folder)
            let a = await fetch(`/Songs/${fold}/info.json`)
            let b = await a.json();
            card.innerHTML += `<div data-folder="${fold}" class="song1">
                        <svg class="play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="44" height="44"
                            color="black" fill="#05fa1d" stroke="#05fa1d" stroke-width="1.5">
                            <circle cx="12" cy="12" r="10" />
                            <path
                                d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
                                fill="currentColor" />
                        </svg>
                        <img src="/Songs/${fold}/cover.jpg"
                            width="100px" height="200px" alt="">
                        <h3>${b.title}</h3>
                        <p>${b.description}</p>
                    </div>`
        
    }
    Array.from(document.getElementsByClassName("song1")).forEach(e => {
        e.addEventListener("click", async a => {
            //    console.log(a.currentTarget.dataset.folder)
            songs = await getsong(`${a.currentTarget.dataset.folder}`)
            PlayMusic(songs[0])
        })
    })

}
async function getsong(folder) {
    currFolder = folder
    let a = await fetch(`/Songs/${folder}/songs/json`)
    let response = await a.json();

    songs = response.tracks

    // let div = document.createElement("div")
    // div.innerHTML = response
    // let as = div.getElementsByTagName("a")
    // songs = []
    // for (let index = 0; index < as.length; index++) {
    //     const element = as[index];
    //     if (element.href.endsWith(".mp3")) {
    //         songs.push((element.href.split(`/%5CSongs%5C${folder}%5C`))[1])
    //     }
    // }
    // console.log(songs)
    let songli = document.querySelector(".fav")
    songli.innerHTML = " "
    for (const song of songs) {

        songli.innerHTML += `<li>
                        <div class="credit flex">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="34"
                                color="currentColor" fill="#ADD8E6" stroke="currentColor" stroke-width="1.5"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path
                                    d="M4.25276 20.302C5.6554 21.5 7.77027 21.5 12 21.5C16.2297 21.5 18.3446 21.5 19.7472 20.302C19.9464 20.1319 20.1319 19.9464 20.302 19.7472C21.5 18.3446 21.5 16.2297 21.5 12C21.5 7.77027 21.5 5.6554 20.302 4.25276C20.1319 4.05358 19.9464 3.86808 19.7472 3.69797C18.3446 2.5 16.2297 2.5 12 2.5C7.77027 2.5 5.6554 2.5 4.25276 3.69797C4.05358 3.86808 3.86808 4.05358 3.69797 4.25276C2.5 5.6554 2.5 7.77027 2.5 12C2.5 16.2297 2.5 18.3446 3.69797 19.7472C3.86808 19.9464 4.05358 20.1319 4.25276 20.302Z" />
                                <path
                                    d="M9.05181 16.0523L7.44711 16.6596C7.17802 16.7615 7 17.0193 7 17.3071C7 17.7968 7.49439 18.1317 7.94888 17.9498L8.87139 17.5806C9.25105 17.4287 9.5 17.0608 9.5 16.6517V9.5M15.5518 14.5517L13.9471 15.159C13.678 15.2608 13.5 15.5186 13.5 15.8064C13.5 16.2961 13.9944 16.631 14.4489 16.4491L15.3714 16.08C15.751 15.928 16 15.5602 16 15.1511V8.20125M9.5 9.5L16 8.20125M9.5 9.5V8.65872M16 8.20125V7.35063M16 7.35063V6.5L9.5 7.81743V8.65872M16 7.35063L9.5 8.65872" />
                            </svg>
                            <div class="SongName flexC">
                                <div>
                                    ${(song.split("-"))[0].replaceAll("%20", " ")}
                                </div>
                                

                                <div>
                                    ${(song.split("-"))[1].replaceAll("%20", " ")}
                                </div>
                            </div>
                        </div>

                        <div class="PlayNow flex">
                            <div > 
                                Play Now
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28"
                                    color="black" fill="#8B0000" stroke="#FFFFFF" stroke-width="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <path
                                        d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
                                        fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                    </li>`

    }

    return songs

}
const PlayMusic = (track, pause = false) => {
    currentSong.src = `./Songs/${currFolder}/` + track
    if (!pause) {
        currentSong.play()
        played.src = "./img/paused.svg"
    }
    document.querySelector(".Name").innerHTML = decodeURI(track)
    document.querySelector(".SongTime").innerHTML = "00:00 / 00:00"
}
async function main() {
    await getsong("Angry")
    PlayMusic(songs[0], true)
    // console.log(songs);

    await albums()


    Array.from(document.querySelector(".fav").getElementsByTagName("li")).forEach(e => {
        const PlayNow = e.querySelector(".PlayNow")
        if (!PlayNow) return
        PlayNow.addEventListener("click", () => {
            const SongName = e.querySelector(".SongName").children[0].textContent.trim()
            const Artist = e.querySelector(".SongName").children[1].textContent.trim()
            PlayMusic(`${SongName} - ${Artist}`)
        })
    })

    played.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            played.src = "./img/paused.svg"
            played.classList.add("paused")
        }
        else {
            currentSong.pause()
            played.src = "./img/play.svg"
        }
    })
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".SongTime").innerHTML =
            ` ${SecondstoMinutes(currentSong.currentTime)} / ${SecondstoMinutes(currentSong.duration)}`;
        document.querySelector(".dot").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";

        document.querySelector(".timeline").style.background = ` linear-gradient(to right,red ${(currentSong.currentTime / currentSong.duration) * 100 + "%"},transparent ${(currentSong.currentTime / currentSong.duration) * 100 + "%"}`
    })
    document.querySelector(".timeline").addEventListener("click", (e) => {
        let percent = ((e.offsetX / e.target.getBoundingClientRect().width) * 100);
        document.querySelector(".dot").style.left = percent + "%"
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%"
    })
    prev.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            PlayMusic(songs[index - 1])
        }
    })

    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if (index + 1 < songs.length) {
            PlayMusic(songs[index + 1])
        }
    })
    volume.addEventListener("change", (e) => {
        console.log(e, e.target, e.target.value)
        currentSong.volume = parseInt(e.target.value) / 100
    })
    document.querySelector(".vol > img").addEventListener("click",(e)=>{
        if(e.target.src.includes("volume.svg")){
        e.target.src = e.target.src.replace("volume.svg","mute.svg")
        currentSong.volume = 0
        volume.value = 0

        }else{
            e.target.src = e.target.src.replace("mute.svg","volume.svg")
            currentSong.volume = .50
            volume.value = 50
        }
    })
    // let audio = new Audio(songs[0]);
    // // audio.play();

    // audio.addEventListener("loadeddata", () => {
    //     console.log(audio.duration, audio.currentSrc, audio.currentTime)
    // })
}
main()