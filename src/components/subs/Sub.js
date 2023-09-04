import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
function Sub({page}) {
  const router = useRouter()
  const handleView = (uuid)=>{
    router.push(`/profile?c=${uuid}`)
  }
  if(!page) return null
  return (
    <>
        <div className="bg-gray-200 w-52 h-64 mt-6 rounded-lg">
          <div className="w-32 ml-10 py-4">
            {
              page.Photo ?
              <Image className="rounded-full w-full h-[8rem] mr-2" src={`/Thumbnails/${page.Photo} `} alt='photo2' width={150} height={150} />
              :
              <Image className="rounded-full w-full mr-2" src="/img/logo.png" alt='photo2' width={150} height={150} />
            }
          </div>
          <label className="text-blue-700 flex justify-center -mt-4 font-bold">{page.PageName}</label>
          <label className="flex justify-center py-1 text-blue-600">{page.Abonnes} subscribers</label>
          <div className="cursor-pointer flex justify-center bg-fuchsia-500 rounded-md mr-16 ml-16 py-1 mt-2 hover:bg-blue-700">
            <button onClick={()=>handleView(page.uniid)} className="font-bold text-white">View</button>
          </div>
        </div>
</>
  )
}

export default Sub