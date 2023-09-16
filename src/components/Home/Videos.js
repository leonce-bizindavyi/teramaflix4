import React,{useState,useEffect,useContext} from 'react'
import Video from './Video'
import InfiniteScroll from "react-infinite-scroll-component";
import styles from '@/styles/Home.module.css'
import { SessionContext } from '../context/Auth';
import Adsense from '../Adsense/Adsense';
function Videos() {
  const auto = useContext(SessionContext)
  const [videos, setVideos] = useState(null)
  const [hasMore,setHasMore]=useState(true)
  
  useEffect(() => {
    if(auto.session){
      if(auto.session === 'unlogged'){
        fetchVideos(0)
      }else{
        fetchVideos(auto.session.ID)
      }
    }
  }, [auto])
  
  const fetchVideos = async (user) =>{
    const response = await fetch(`/api/posts/${user}/0/6`)
    const data = await response.json()
    if(data[0]) setVideos(data)
  }

if(videos==null) return (<div className={`${styles.filmcontainer} mt-3  gap-[1rem] `}>Loading ...</div>)

const getMoreVideos=async()=>{
  if(auto.session === 'unlogged'){
    const res=await fetch(`/api/posts/${0}/${videos.length}/6`)
    const newVideos = await res.json()
    if(newVideos.length==0)setHasMore(false)
      setVideos(videos=>[...videos, ...newVideos])
  }else{
    const res=await fetch(`/api/posts/${auto.session.ID}/${videos.length}/6`)
    const newVideos = await res.json()
    if(newVideos.length==0)setHasMore(false)
      setVideos(videos=>[...videos, ...newVideos])
  }
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
    <div className={styles.videocontainer}>
    <iframe
      data-aa="2259087"
      src="//ad.a-ads.com/2259087?size=728x90"
      style={{
        width: '100%',
        height: '170px',
        border: '0px',
        padding: '0',
        overflow: 'hidden',
        backgroundColor: 'transparent'
      }}
    ></iframe>
      </div>
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