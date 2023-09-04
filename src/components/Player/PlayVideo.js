import React,{useContext} from 'react'
import Watching from './Watching'
import { VideoContext } from '../context/video'
import Describe from './Describe'
import MyVideos from './MyVideos'

function PlayVideo() {
  const {video} = useContext(VideoContext)
  if(!video) return null
  return (
    <>
      <div id="played" className="video lg:w-[65%] w-full ">
       <><Watching videoprops={video} /> <Describe video={video}/> </> 
       <MyVideos />
    </div>  
    </>
  )
}

export default PlayVideo