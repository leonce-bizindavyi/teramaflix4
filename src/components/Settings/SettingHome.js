import React,{useRef ,useState,useEffect} from 'react'
import Pages from './Pages'

function SettingHome() {
    const [page, setPage] = useState("account")

    const toutTitlesRef = useRef(null);
    const svgRef = useRef(null);
    const handleClick = () => {
      if(toutTitlesRef.current.classList.contains('hidden'))
      {
        toutTitlesRef.current.classList.remove('hidden');
      }  
      else{
        toutTitlesRef.current.classList.add('hidden');
      }
    };
    const handlePage = (page) =>{
        setPage(page)
    }
   
  return (
    <>
       <div  className="container relative ">
      <aside  className="py-10 sm:fixed sm:top-[2rem]">
        <div  className=" sm:ml-4 w-full px-2 sm:w-56 rounded-lg lg:w-64 xl:w-80 ">
          <div  className="mt-2 flex items-center justify-between rounded-lg bg-gray-100 px-2 shadow-md shadow-blue-500" id="setting">
            <h1  className="m-2 text-3xl font-extrabold text-blue-700 font-serif">Settings</h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor"  className="visible sm:hidden h-10 w-10 text-blue-700  hover:text-white cursor-pointer pt-1 hover:rounded-lg hover:bg-blue-700" ref={svgRef} onClick={handleClick}  id="setting">
              <path  strokeLinecap="round"  strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"  />
            </svg>
          </div>
          <div  className="ml-1 flex flex-row w-full rounded-lg ">
            <div  className="dropdown dropdown-hover  w-full pr-3 ">
              <ul  className="hidden dropdown-content ml-1 sm:flex    sm:w-48 flex-col space-y-4 rounded-b-lg py-4 pl-3 shadow-md shadow-blue-500 lg:w-56 xl:w-72" id="liste_setting" ref={toutTitlesRef}>
                <li  className="cursor-pointer rounded text-1xl hover:scale-100 hover:bg-blue-600 hover:text-center hover:text-white font-bold text-blue-700" onClick={()=>handlePage("account")}>Account </li>
                <li  className="cursor-pointer rounded text-1xl hover:scale-100 hover:bg-blue-600 hover:text-center hover:text-white font-bold text-blue-700" onClick={()=>handlePage("notify")} >Notifications</li>
                <li  className="cursor-pointer rounded text-1xl hover:scale-100 hover:bg-blue-600 hover:text-center hover:text-white font-bold text-blue-700" onClick={()=>handlePage("perform")}>Performing</li>
                <li  className="cursor-pointer rounded text-1xl hover:scale-100 hover:bg-blue-600 hover:text-center hover:text-white font-bold text-blue-700" onClick={()=>handlePage("privacy")}>Privacy</li>
                <li  className="cursor-pointer rounded text-1xl hover:scale-100 hover:bg-blue-600 hover:text-center hover:text-white font-bold text-blue-700" onClick={()=>handlePage("payments")}>Payments</li>
                <li  className="cursor-pointer rounded text-1xl hover:scale-100 hover:bg-blue-600 hover:text-center hover:text-white font-bold text-blue-700" onClick={()=>handlePage("advanced")}>Advanced Settings</li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
      <Pages page={page} />
        
     </div>
    </>
  )
}

export default SettingHome