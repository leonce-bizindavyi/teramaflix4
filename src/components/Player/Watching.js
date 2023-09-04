import Title from '../Title';
import React,{useRef,useState,useEffect,useContext} from 'react';
import { useFormatDuration } from '../Hooks/useFormatDuration';
import { useRouter } from 'next/router';
import { SessionContext } from '../context/Auth';
import Image from 'next/image';
function FormatDuration(time){
  const resul =  useFormatDuration(time)
  return resul
}
function Watching({videoprops}) {
  const router = useRouter()
  const videoRef = useRef(null);
  const auto = useContext(SessionContext)
  const [controls, setControls] = useState(
    {
      currentTime: 0,
      volume: 100,
      progress: { width: `${0}%` }
    }
  )
  let duration = 0
  const player = videoRef.current;
  if(player){
    duration = player.duration
  }
  const toggleMute=() =>{
    const video = videoRef.current;
    video.muted = !video.muted
  }
  const handleCurrentTime = (e)=>{
    const video = videoRef.current;
    
    const time = e.currentTarget.currentTime
    const duration = video.duration
    const progress = (time / duration) * 100; // Calcul du pourcentage de progression
    setControls({...controls, progress: { width: `${progress}%` }}) 
  }

  const handleNext=(next)=>{
      router.push(`/Watch?v=${next}`)
  }
  
  useEffect(() => {
    
    

    const playPauseBtn = document.querySelector(".play-pause-btn")
    const theaterBtn = document.querySelector(".theater-btn")
    const fullScreenBtn = document.querySelector(".full-screen-btn")
    const miniPlayerBtn = document.querySelector(".mini-player-btn")
    const muteBtn = document.querySelector(".mute-btn")
    const speedBtn = document.querySelector(".speed-btn")
    const currentTimeElem = document.querySelector(".current-time")
    const totalTimeElem = document.querySelector(".total-time")
    const volumeSlider = document.querySelector(".volume-slider")
    const videoContainer = document.querySelector(".video-container")
    const timelineContainer = document.querySelector(".timeline-container")
    const video = document.querySelector("video")

    document.addEventListener("keydown", e => {
      const tagName = document.activeElement.tagName.toLowerCase()
      
      if (tagName === "input") return
    
      switch (e.key.toLowerCase()) {
        case " ":
          if (tagName === "button") return
        case "k":
          togglePlay()
          break
        case "f":
          toggleFullScreenMode()
          break
        case "t":
          toggleTheaterMode()
          break
        case "i":
          toggleMiniPlayerMode()
          break
        case "m":
          toggleMute()
          break
        case "arrowleft":
        case "j":
          skip(-5)
          break
        case "arrowright":
        case "l":
          skip(5)
          break
        case "c":
          toggleCaptions()
          break
      }
    })
    

  // Timeline
timelineContainer.addEventListener("mousedown", toggleScrubbing)
document.addEventListener("mouseup", e => {
  if (isScrubbing) toggleScrubbing(e)
})

let isScrubbing = false
let wasPaused
function toggleScrubbing(e) {
  const rect = timelineContainer.getBoundingClientRect()
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
  isScrubbing = (e.buttons & 1) === 1
  videoContainer.classList.toggle("scrubbing", isScrubbing)
  if (isScrubbing) {
    wasPaused = video.paused
    video.pause()
  } else {
    video.currentTime = percent * video.duration
    if (!wasPaused) video.play()
  }

}


// Playback Speed
speedBtn.addEventListener("click", changePlaybackSpeed)

function changePlaybackSpeed() {
  let newPlaybackRate = video.playbackRate + 0.25
  if (newPlaybackRate > 2) newPlaybackRate = 0.25
  video.playbackRate = newPlaybackRate
  speedBtn.textContent = `${newPlaybackRate}x`
}

// Duration
video.addEventListener("loadeddata", () => {
  totalTimeElem.textContent = formatDuration(video.duration)
})

video.addEventListener("timeupdate", () => {
  currentTimeElem.textContent = formatDuration(video.currentTime)
  const percent = video.currentTime / video.duration
  timelineContainer.style.setProperty("--progress-position", percent)
})

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
})
function formatDuration(time) {
  const seconds = Math.floor(time % 60)
  const minutes = Math.floor(time / 60) % 60
  const hours = Math.floor(time / 3600)
  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`
  } else {
    return `${hours}:${leadingZeroFormatter.format(
      minutes
    )}:${leadingZeroFormatter.format(seconds)}`
  }
}

function skip(duration) {
  video.currentTime += duration
}

// Volume
muteBtn.addEventListener("click", toggleMute)
volumeSlider.addEventListener("input", e => {
  video.volume = e.target.value
  video.muted = e.target.value === 0
})

function toggleMute() {
  video.muted = !video.muted
}

video.addEventListener("volumechange", () => {
  volumeSlider.value = video.volume
  let volumeLevel
  if (video.muted || video.volume === 0) {
    volumeSlider.value = 0
    volumeLevel = "muted"
  } else if (video.volume >= 0.5) {
    volumeLevel = "high"
  } else {
    volumeLevel = "low"
  }

  videoContainer.dataset.volumeLevel = volumeLevel
})

// View Modes
theaterBtn.addEventListener("click", toggleTheaterMode)
fullScreenBtn.addEventListener("click", toggleFullScreenMode)
miniPlayerBtn.addEventListener("click", toggleMiniPlayerMode)

function toggleTheaterMode() {
  videoContainer.classList.toggle("theater")
}

function toggleFullScreenMode() {
  if (document.fullscreenElement == null) {
    videoContainer.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

function toggleMiniPlayerMode() {
  if (videoContainer.classList.contains("mini-player")) {
    document.exitPictureInPicture()
  } else {
    video.requestPictureInPicture()
  }
}

document.addEventListener("fullscreenchange", () => {
  videoContainer.classList.toggle("full-screen", document.fullscreenElement)
})

video.addEventListener("enterpictureinpicture", () => {
  videoContainer.classList.add("mini-player")
})

video.addEventListener("leavepictureinpicture", () => {
  videoContainer.classList.remove("mini-player")
})

// Play/Pause
playPauseBtn.addEventListener("click", togglePlay)
video.addEventListener("click", togglePlay)

function togglePlay() {
  video.paused ? video.play() : video.pause()
}

video.addEventListener("play", () => {
  videoContainer.classList.remove("paused")
})

video.addEventListener("pause", () => {
  videoContainer.classList.add("paused")
})


//views and hours 

    const handleAddHours = async () => {
      const user = auto.session
      const currentTime = videoRef.current.currentTime // Récupérer le temps écoulé réel de la vidéo
      const hours = currentTime / 3600 ; // Conversion en heures
      const response = await fetch(`/api/reactions/addHours/${videoprops.ID}/${user.ID}/${hours.toFixed(4)}`);
      const data = await response.json();
    };
    async function insertViews() {
      const user = auto.session
      const timerId = setTimeout(async () => {  // Ajoutez le mot-clé "async" ici
        const response = await fetch(`/api/reactions/addViews/${videoprops.ID}/${user.ID}`);
        const data = await response.json();
      }, 5000);
    }
    insertViews()

    const handleRouteChange = (url, { shallow }) => {
      if (!shallow) {
        handleAddHours();
      }
    };
    router.beforePopState(handleAddHours);
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };

  }, [videoprops,auto.session,router])


if (!videoprops) return null
  return (
    <>
    <Title title={`${videoprops.Title} - TeramaFlix`} />
    <div className={`video-container w-full lg:w-[100%] rounded`} data-volume-level="high">
      
      <div className="video-controls-container">
        <div className="timeline-container">
          <div className="timeline">
            <Image width={100} height={100} alt='Wacthing' src={`/Thumbnails/${videoprops.Image}`} className="preview-img"/>
            <div className="thumb-indicator"  ></div>
          </div>
        </div>
        <div className="controls">
          <button  className="play-pause-btn">
            <svg className="play-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
            <svg className="pause-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          </button>
          <div className="volume-container">
            <button onClick={toggleMute} className="mute-btn">
              <svg className="volume-high-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
              </svg>
              <svg className="volume-low-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
              </svg>
              <svg className="volume-muted-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
              </svg>
            </button>
            <input className="volume-slider" type="range" min="0" max="1" step="any"/>
          </div>
          <div className="duration-container">
            <div className="current-time">{FormatDuration(controls.currentTime)}</div>
            /
            <div className="total-time">{FormatDuration(duration)} </div>
          </div>
          <button className="captions-btn">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z" />
            </svg>
          </button>
          <button className="speed-btn wide-btn">
            1x
          </button>
          <button className="mini-player-btn">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"/>
            </svg>
          </button>
          <button className="theater-btn">
            <svg className="tall" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"/>
            </svg>
            <svg className="wide" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"/>
            </svg>
          </button>
          <button className="full-screen-btn">
            <svg className="open" viewBox="0 0 24 24">
              <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
            <svg className="close" viewBox="0 0 24 24">
              <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
            </svg>
          </button>
        </div>
      </div>
      <video ref={videoRef} 
       onVolumeChange={(e)=>setControls({...controls,volume:e.currentTarget.volume})} 
       onTimeUpdate={(e)=>{handleCurrentTime(e),setControls({...controls,currentTime:e.currentTarget.currentTime})}}  
       src={`/Videos/${videoprops.Video}`} onEnded={()=>handleNext(videoprops.NextVideo)} className='rounded' 
       autoPlay/>
    </div> 
    </>
  )
}

export default Watching