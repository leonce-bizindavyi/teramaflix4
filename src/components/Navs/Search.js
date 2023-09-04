import Link from 'next/link'
import React from 'react'

function Search({search}) {
  return (
    <>
        <Link href={`/results?results=${search}`}>
            <div className="cursor-pointer py-2 px-3 hover:bg-slate-100">
            <p className="searched text-sm font-medium text-gray-600">{search} </p>
            </div> 
        </Link>
    </>
  )
}

export default Search