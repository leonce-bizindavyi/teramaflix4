import React, {useState,useEffect} from 'react'
import Result from './Result'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
function Results() {
  const router = useRouter()
  const search = router.query.results
  const [videos, setVideos] = useState([])
  const [hasMore,setHasMore]=useState(true)
  const fetchResults = async (search) =>{
      const response = await fetch(`/api/results/${search}/0/5`)
      const data = await response.json()
      if(data[0]){
        setVideos(data)
      }
  }
  const getMoreResults=async()=>{
    const res=await fetch(`/api/results/${search}/${videos.length}/4`)
    const newVideos = await res.json()
    if(newVideos.length==0)setHasMore(false)
      setVideos(videos=>[...videos, ...newVideos])
  }
  useEffect(() => {
    fetchResults(search)
  }, [search])
  
  return (
    <>
    <iframe data-aa='2259101' src='//ad.a-ads.com/2259101?size=728x90' style={{width:'100%', height:'100%', border:0+'px', padding:0, overflow:'hidden', backgroundColor: 'transparent'}}></iframe>
    <InfiniteScroll
    dataLength={videos.length}
    next={getMoreResults}
    hasMore={hasMore}
    loader={<h4>Loading...</h4>}
    endMessage={
      <p style={{textAlign:"center"}}><b>You have seen it all</b></p>
    }>
        <div className="Uploads flex flex-col  w-full h-full  bg-white rounded-3xl ">
            <div className=" uploadsContainer w-full h-full pt-6 overflow-y-auto   ">
              {
                videos?.map(video=>{
                  return <Result key={video.ID} video={video} />
                })
              }
            </div>
        </div>
        </InfiniteScroll>
    </>
  )
}

export default Results