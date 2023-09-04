import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
function Slide({video}) {
  return (
    <>
    <div className='flex justify-center'>
        <div className="swiper-slide ">
        <div className="">
            <div className="imag h-[170px] rounded overflow-hidden ">
              <Link href={`/Watch?v=${video.uniid}`}>
                  <Image src={`/Thumbnails/${video.Image}`} width={100} height={100} alt='video' className="video w-[100%]  h-[100%] object-cover"/>
              </Link>
            </div>
            <p className="text-sm font-medium">{video.Title} </p>
            <Link href={`/profile?c=${video.Uuid}`}>
                <div className="flex  justify-start items-center space-x-2 mb-4">
                  {
                    video.Photo ?
                    <Image width={80} height={10} alt='profile' className="lg:w-10 w-12 lg:h-10 h-8 my-1 ml-15 rounded-full " src={`/Thumbnails/${video.Photo}`} />
                    :
                    <Image width={80} height={10} alt='profile' className="lg:w-10 w-12 lg:h-10 h-8 my-1 ml-15 rounded-full " src="/img/logo.png" />
                  }
                <div className="flex flex-col  space-y-2">
                    <div className="right-1">
                        <h1 className="text-sm  font-medium">{video.PageName}</h1><br/>
                    </div>
                </div>
                </div>
            </Link>
        </div>
      </div>
    </div>
     
    </>
  )
}

export default Slide