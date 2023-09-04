import React,{useState,useEffect,useContext} from 'react'
import { SessionContext } from '../context/Auth';
import { useRouter } from 'next/router'
import Image from 'next/image';

function AdminNav({handleAside}) {
 const router = useRouter()
  const auth = useContext(SessionContext)
  const [auto, setAuto] = useState(12);
  useEffect(() => {
    async function fetchData() {
        if(auth) setAuto(auth);
    }
    fetchData();
}, [auth]);
if(auto == 'unlogged' ) return (router.push("http://localhost:3000/login"))
else if(auto.Admin  !== 1 && auto.Admin != undefined) return (router.push("http://localhost:3000"))
else 
  return (
    <>
      <div  className="userHead flex flex-row justify-between items-center px-6 w-full h-[60px] md:h-[70px] bg-white rounded-3xl">
          <div  className="flex flex-row items-center  space-x-2">
              <div onClick={handleAside} className="menuCloser cursor-pointer z-50 ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor"  className="w-7 h-7 md:w-10 md:h-10 font-bold">
                      <path  strokeLinecap="round"  strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>                      
              </div>
              <h1  className="font-bold text-[#9442FE] text-[1.2rem] md:text-[1.5rem]">Dashboard</h1>
          </div>
          <div  className="profil w-9 h-9 md:w-12 md:h-12 rounded-full overflow-hidden">
            {
              auto.Photo ?
              <Image src={`/Thumbnails/${auto.Photo} `} width={100} height={100}  className="" alt="profil"/>
              :
              <Image src="/img/logo.png"  width={100} height={100}  className="" alt="profil"/>
            }
          </div>
      </div>
    </>
  )
}

export default AdminNav