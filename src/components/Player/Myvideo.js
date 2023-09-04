import React from 'react'
import styles from '@/styles/Player.module.css'
import Link from 'next/link'
import Image from 'next/image'
function Myvideo({video,handleAsides}) {
  return (
    <>
        <div className={styles.videocontainer}>
            <div className="imag w-[100%] h-[170px] rounded  overflow-hidden">
                {
                    video.Short == 1 ?
                    <Link href={`/short`}>
                        <Image width={100} height={100} src={`/Thumbnails/${video.Image}`} className="w-[100%]  h-[100%] object-cover" alt="short"/>
                    </Link>
                    :
                    <Link href={`/Watch?v=${video.uniid}`}>
                        <Image width={100} height={100} src={`/Thumbnails/${video.Image}`} className="w-[100%]  h-[100%] object-cover" alt="video"/>
                    </Link>
                }
            </div>
            <Link href={`/profile?c=${video.uniid}`}>
                <div className="flex space-x-1 justify-start mb-4">
                {video.Photo ?
                <Image width={80} height={80} alt='profile' className="lg:w-10 w-12 lg:h-10 h-8 my-1 ml-15 rounded-full " src={`/Thumbnails/`+ video.Photo}/>
                :
                <Image width={80} height={80} alt='profile' className="lg:w-10 w-12 lg:h-10 h-8 my-1 ml-15 rounded-full " src="/img/logo.png"/>
                }
                <div className="flex flex-col  space-y-2">
                    <div className="right-1">
                        <h1 className="text-sm font-medium">{video.Title}</h1><br/>
                        <span className="text-sm">{video.PageName}</span>
                    </div>
                </div>
                </div>
            </Link>
        </div> 
    </>
  )
}

export default Myvideo