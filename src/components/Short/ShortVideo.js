import React, { useState,useEffect,useRef,useContext } from 'react';
import styles from '@/styles/Short.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { SessionContext } from '../context/Auth';
import Comments from './Comments';
import Image from 'next/image';
function ShortVideo() {
  const auto = useContext(SessionContext)
  const [videos, setVideos] = useState([]);
  const [muted, setMuted] = useState(false);
  const videoRefs = useRef([]);
  const [limit, setLimit] = useState(2)
  const [start, setStart] = useState(0)
  const [showCmnt, setShowCmnt] = useState(false)
  
  const handleCmnt = (stat) =>{
    setShowCmnt(stat)
  }
  const addVideo = async () => {
    const user = auto.session;
    if(user==='unlogged'){
      const response = await fetch(`/api/short/${0}/${start}/${limit}`)
      const data = await response.json()
      if(data.length!=0) {
        setVideos([...videos, data[0]]);
        setStart(start+1)
      }
    }else{
      const response = await fetch(`/api/short/${user.ID}/${start}/${limit}`)
      const data = await response.json()
      if(data.length!=0) {
        setVideos([...videos, data[0]]);
        setStart(start+1)
      }
    }
  };

  useEffect(() => {
    const fetchVideos = async (user) =>{
      const response = await fetch(`/api/short/${user}/0/2`)
      const data = await response.json()
      console.log(data)
      setStart(2)
      setLimit(1)
      setVideos(data)
      }
    if(!auto.session || auto.session==='unlogged'){
      fetchVideos(0)
    }else{
      fetchVideos(auto.session.ID)
    }
  }, [auto])
  

  
  
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, [videos]);
  

  const handleScroll = () => {
    const element = document.querySelector(`.${styles.videocontainer}`);
    const { scrollTop, clientHeight } = element;
  
    videos.forEach((video, index) => {
      const videoRef = videoRefs.current[index];
      if (videoRef) {
        const { offsetTop, offsetHeight } = videoRef;
        if (offsetTop + offsetHeight < scrollTop || offsetTop > scrollTop + clientHeight) {
          videoRef.pause();
        }
      }
    });
  
    if (scrollTop + clientHeight >= element.scrollHeight) {
      addVideo();
    }
  };
  const handleVideoClick = (event, index) => {
    const video = event.target;
    
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    
    videoRefs.current.forEach((v, i) => {
      if (i !== index && !v.paused) {
        v.pause();
      }
    });
  };

  const handleMute = () => {
    setMuted(!muted);
    videoRefs.current.forEach((v) => {
      v.muted = !muted;
    });
  };
  return (
    <>
      <Head>
        <title>Reels - TeramaFlix</title>
      </Head>
      <div
        className={` ${styles.container} ${styles.new} relative flex flex-col justify-center`}
      >
        <div onScroll={handleScroll} className={` ${styles.videocontainer} relative bg-white w-[100%] max-w-[400px] rounded-md "`}>
          {videos.map((video, index) => (
            <div key={video.ID}  className={`${styles.video}  relative h-[100%] w-[100%] bg-black rounded-md`}>
              <div className={`${styles.channel} z-50 absolute w-[100%] h-[65px] flex  flex-row items-center justify-between p-3`}>
                  <Link href="/">
                      <div className="flex space-x-1 justify-start mb-4">
                          {
                            video.Photo ?
                            <Image width={80} height={80} alt='profile' title={`${video.Nom +' ' +video.Prenom}`} className="lg:w-10 w-9 lg:h-10 h-9 my-1 ml-15 rounded-full " src={`/Thumbnails/${video.Photo}`}/>
                            :
                            <Image width={80} height={80} alt='profile' title={`${video.Nom +' ' +video.Prenom}`} className="lg:w-10 w-9 lg:h-10 h-9 my-1 ml-15 rounded-full " src="/img/logo.png"/>
                          }
                      <div className="flex flex-col  space-y-2">
                          <div className="right-1">
                              <h10 title={`${video.Title}`} className="text-sm text-white font-medium">{video.Title.slice(0, 15) }...</h10><br/>
                              <span className="text-sm text-white">{video.Nom} {video.Prenom}</span>
                          </div>
                      </div>
                      </div>
                  </Link>
                  <span className="bg-[rgba(255,255,255,0.4)] p-1 rounded-md cursor-pointer">Subscribe</span>
              </div>
              <div className="buttons absolute z-50 bottom-0 right-0 h-[40%] w-[70px]  flex flex-col px-2">
                  <div className="likes cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="like z-50 w-9 h-9 ">
                          <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                          </svg> 
                          <span className=" ">200</span>  

                  </div>                          
                      
                      <div className="commentBtn cursor-pointer">
                      <svg  onClick={()=>handleCmnt(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="comments z-50 w-9 h-9 ">
                          <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
                          </svg>
                          <span>200</span>
                      </div>
                      
                      
                      <div className="share cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="share z-50 w-9 h-9">
                          <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
                          </svg>
                          <span>200</span>
                      </div>
                      
                      
              </div>
              <div onClick={handleMute} className="volumeBtn z-50 absolute bottom-2 left-2 m-auto">
                {
                  muted ?
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 off cursor-pointer">
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
                </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 on cursor-pointer">
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                  <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
                </svg>
                }
              </div>
              {
                  showCmnt ? <Comments video={video} handleCmnt={handleCmnt} /> : null
                }
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                onClick={(event) => handleVideoClick(event, index)}
                src={`/Videos/${video.Video}`}
                className="vid object-cover w-[100%] h-[100%]"
              ></video>
          </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ShortVideo;