import React from 'react'

function SubBtn({handleSub,abonne}) {
  return (
    <>
    {
        abonne ? 
        <div onClick={()=>handleSub(false)} className="sabonner bg-blue-800 h-[45px] px-[10px] flex justify-center items-center rounded cursor-pointer text-white">
            <span>Subscribed</span>
        </div>
        :
        <div onClick={()=>handleSub(true)} className="sabonner bg-blue-400 h-[45px] px-[10px] flex justify-center items-center rounded cursor-pointer text-white">
            <span>Subscribe</span>
        </div>
    }
        
    </>
  )
}

export default SubBtn