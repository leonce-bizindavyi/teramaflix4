import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { usePeriod } from '@/components/Hooks/usePeriod'

function Sms({sms}) {
    const period = usePeriod(sms.Create_at)
  return (
    <>
        <Link href={`/dashboard/sms?user=${sms.uniid}`}  className="msg1 flex flex-row justify-between items-center px-6 mb-6 cursor-pointer">
            <div  className="flex flex-row space-x-2">
                <div  className=" w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
                    {
                        sms.Photo ?
                        <Image width={100} height={100} src={`/Thumbnails/${sms.Photo}` } className="w-full h-full" alt="profil"/>
                        :
                        <Image width={100} height={100} src="/img/logo.png"  className="w-full h-full" alt="profil"/>
                    }
                </div>
                <div  className="flex flex-col">
                    <h1  className="font-semibold">{sms.PageName}</h1>
                    <p>{sms.Body}</p>
                </div>
            </div>
            <div  className="date items-end">
                <span  className="text-xs md:text-base">{period}</span>
            </div>
        </Link>
    </>
  )
}

export default Sms