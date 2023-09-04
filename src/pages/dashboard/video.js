import Videos from '@/components/Dashboard/Videos'
import AdminNav from '@/components/Navs/AdminNav'
import AdminSide from '@/components/Navs/AdminSide'
import React from 'react'
import { useRouter } from 'next/router';

function VideoPage() {
  const router = useRouter();
  const { w } = router.query;
 let uniid= w
  return (
    <>
       <Videos uniid={uniid}/> 
    </>
  )
}

export default VideoPage
VideoPage.getLayout = function pageLayout(page){
    return (
        <>
        <div  className="wrapper relative w-full h-full flex flex-row px-2 md:px-6 bg-gray-100 overflow-x-hidden">
        <AdminSide />
           <div  className="containeradm w-full  h-[100%]  sm:px-6 mt-6 bg-g/ray-100 flex flex-col justify-center ">
              <AdminNav />
              {page}
        </div>
        </div>
        
        </>
    )
  }