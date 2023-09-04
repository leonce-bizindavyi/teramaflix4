import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { usePeriod } from '../Hooks/usePeriod'
import Image from 'next/image'
function Video({video}) {
  const period = usePeriod(video.Created_at)
  return (
    <>
       <div className={styles.videocontainer}>
          <div className="imag w-[100%] h-[170px] rounded  overflow-hidden">
             {
              video.Short == 1 ?
              <Link href={`/short`}> 
                <Image src={`/Thumbnails/`+ video.Image} width={100} height={100} className="w-[100%]  h-[100%] object-cover" alt="videos"/>
              </Link>
              :
              <Link href={`/Watch?v=${video.uniid}`}> 
                <Image src={`/Thumbnails/`+ video.Image} width={100} height={100} className="w-[100%]  h-[100%] object-cover" alt="videos"/>
              </Link>
             }
          </div>
          <h1 className="text-sm font-medium">{video.Title} </h1><br></br>
            <Link href={`/profile?c=${video.Uuid}`}>
            <div className="flex gap-2 justify-start mb-4">
              {video.Photo ?
              <Image width={80} height={80} className="lg:w-10 w-12 lg:h-10 h-8 my-1 ml-15 rounded-full " src={`/Thumbnails/`+ video.Photo} alt='profile'/>
              :
              <Image width={80} height={80} className="lg:w-10 w-12 lg:h-10 h-8 my-1 ml-15 rounded-full " src="/img/logo.png" alt='profile'/>
              }
             
             
                  
            <div className="flex flex-col  space-y-2">
                <div className="right-5">
                    <div className="text-sm font-medium">{video.PageName}</div>
                    <span className="text-sm">{video.Views} Views  {period}</span>
                </div>
            </div>
            </div>
        </Link>
    </div> 
    </>
  )
}

export default Video