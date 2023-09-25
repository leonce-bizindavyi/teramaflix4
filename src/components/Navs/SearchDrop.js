import React from 'react'
import Link from 'next/link'
import Search from './Search'
function SearchDrop({searches,searched}) {
  return (
    <div id="searchedprop" className=" sm:w-[40%]  z-20 left-[30%] right-[30%] hidden mt-14 w-[20%] sm:block sm:top-0 sm:fixed  h-auto  overflow-hide bg-slate-100 rounded-md">
        {
          searches?.map(search=>{
            return <Search key={search.ID} search={search.Title}/>
          })
        }
    </div>
  )
}

export default SearchDrop