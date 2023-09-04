import React,{useState,useEffect } from 'react'
import Myvideo from './Myvideo'
import { useRouter } from 'next/router';
import InfiniteScroll from "react-infinite-scroll-component";

function MyVideos() {
  const router = useRouter()
  const [myVideos, setMyVideos] = useState([]);
  const [hasMore,setHasMore]=useState(true)
  const getMoreVideos=async()=>{
    const post = router.query.v
    const res=await fetch(`/api/posts/myVideos/${post}/${myVideos.length}/2`)
    const newVideos = await res.json()
    if(newVideos.length==0)setHasMore(false)
      setMyVideos(myVideos=>[...myVideos, ...newVideos])
  }
  useEffect(() => {
   
    const fetchMyVideos = async (post) => {
      const response = await fetch(`/api/posts/myVideos/${post}/0/2`);
      const data = await response.json();
      setMyVideos(data);
    };
    if(router.query.v){
      fetchMyVideos(router.query.v)
    }
  }, [router.query.v]);

  return (
    <>
    <InfiniteScroll
    dataLength={myVideos.length}
    next={getMoreVideos}
    hasMore={hasMore}
    loader={<h4>Loading...</h4>}
    endMessage={
      <p style={{textAlign:"center"}}> </p>
    }>
     <div className={`hidden lg:grid lg:block mt-3  gap-[1rem]`} style={{gridTemplateColumns: 'repeat(auto-fit,minmax('+250+'px, auto))',borderTop: 3+'px solid #3a82f5',paddingTop: 30+'px'}}>
      {
        myVideos?.map(video=>{
          return <Myvideo key={video.ID} video={video}/>
        })
      }        
    </div>
    </InfiniteScroll>   
    </>
  )
}

export default MyVideos