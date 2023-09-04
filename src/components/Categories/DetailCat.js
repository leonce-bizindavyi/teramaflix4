import React,{useState,useEffect} from 'react'
import Video from './Video'
import { useRouter } from 'next/router'

function DetailCat({catType}) {
    const router = useRouter()
    const [videos, setVideos] = useState(null)
    const fetchVideos = async (Uniid) =>{
    const response = await fetch(`/api/categorie/${Uniid}/0/25`)
    const data = await response.json()
    console.log(data)
    if(data[0]) setVideos(data)
  }
  const handlePush = ()=>{
    router.push(`/categorie`)
  }
  useEffect(() => {
    fetchVideos(catType)
  }, [catType])
  return (
    <div className="flex-row space-y-0">
            <div className="flex flex-row justify-between items-center px-6 py-3" >
                <div>{catType}</div>
                <div onClick={()=>handlePush()}><button className="text-blue-500 hover:bg-gray-200 rounded-2xl px-2 cursor-pointer">All Categories</button></div>
            </div>
            <div className="filmcontainerCat  mt-3 gap-[1rem]">
                {
                  videos?.map(video=>{
                    return <Video key={video} video={video} />
                  })
                }
            </div>
        </div>
  )
}

export default DetailCat