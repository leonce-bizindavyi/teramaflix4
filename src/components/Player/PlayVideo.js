import React,{useContext} from 'react'
import Watching from './Watching'
import { VideoContext } from '../context/video'
import { SessionContext } from '../context/Auth'
import Describe from './Describe'
import MyVideos from './MyVideos'
import UnDescribe from './UnDescribe'

function PlayVideo() {
  const auto = useContext(SessionContext)
  const {video} = useContext(VideoContext)
  console.log(auto.session )
  if(!video) return null
  return (
    <>
      <div id="played" className="video lg:w-[65%] w-full ">
       <><Watching videoprops={video} /> 
       {!auto.session || auto.session === "unlogged" ? <UnDescribe  video={video}/> : <Describe video={video}/>} </> 
       <MyVideos />
    </div>  
    </>
  )
}

export default PlayVideo