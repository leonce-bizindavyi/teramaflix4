import React,{useState,useEffect,useContext} from 'react'
import Video from './Video'
import InfiniteScroll from "react-infinite-scroll-component";
import styles from '@/styles/Home.module.css'
import { SessionContext } from '../context/Auth';
function Videos() {
  const auto = useContext(SessionContext)
  const [videos, setVideos] = useState(null)
  const [hasMore,setHasMore]=useState(true)
  
  useEffect(() => {
    if(auto.session){
      fetchVideos(auto.session)
    }
  }, [auto])
  
  const fetchVideos = async (user) =>{
    const response = await fetch(`/api/posts/${user.ID}/0/6`)
    const data = await response.json()
    if(data[0]) setVideos(data)
}

if(videos==null) return (<div className={`${styles.filmcontainer} mt-3  gap-[1rem] `}>Loading ...</div>)

const getMoreVideos=async()=>{
  const res=await fetch(`/api/posts/${auto.session.ID}/${videos.length}/6`)
  const newVideos = await res.json()
  if(newVideos.length==0)setHasMore(false)
    setVideos(videos=>[...videos, ...newVideos])
}
 
  
  return (
    <>
    <InfiniteScroll
    dataLength={videos.length}
    next={getMoreVideos}
    hasMore={hasMore}
    loader={<h4>Loading...</h4>}
    endMessage={
      <p style={{textAlign:"center"}}><b>You have seen it all</b></p>
    }>
    <div id="load_data" className={`${styles.filmcontainer} mt-3  gap-[1rem] `}>
      {
        videos?.map(video=>{
          return <Video key={video.ID} video={video} />
        })
      }      
    </div>  
    </InfiniteScroll> 
    </>
  )
}

export default Videos