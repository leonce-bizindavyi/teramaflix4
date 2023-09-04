import React,{useState,useEffect,useContext} from 'react'
import SubBtn from '../subs/SubBtn'
import { useRouter } from 'next/router'
import Title from '../Title'
import { SessionContext } from '../context/Auth'
import Image from 'next/image'

function ProfileHeader({handleSetPage}) {
  const auth = useContext(SessionContext)
  const [abonne, setAbonne] = useState(false)
  const [auto, setAuto] = useState({})
  const [user, setUser] = useState([])
  const router = useRouter()
  //user profile

const handleSub = async (status) =>{
  if(status === true){
    addSub(user.ID,auto.ID)
  }else{
    deleteSub(user.ID,auto.ID)
  }
  
}
const handleEditChannel = () =>{
  router.push('/channel')
}
const handleDetailChannel = () =>{
  router.push('/details/channel')
}
const addSub = async (user,sub) =>{
  const response = await fetch(`/api/reactions/addSubs/${user}/${sub}`)
  const data = await response.json()
  if(data.affectedRows === 1){
    setAbonne(true)
  }
}
const deleteSub = async (user,sub) =>{
  const response = await fetch(`/api/reactions/deleteSub/${user}/${sub}`)
  const data = await response.json()
  if(data.affectedRows === 1){
    setAbonne(false)
  }
}
useEffect(() => {
  if(router.query.c && auth.session){
    setAuto(auth.session)
    const fetchUsers = async (status) =>{
      if(status){
        const response = await fetch(`/api/users/getUser/${status}`)
        const data = await response.json()
        console.log(status,data)
        fetchSubReactions(data[0].ID)
        setUser(data[0])
      }
  }
  const fetchSubReactions = async (user) =>{
    const sub =  auth.session
    const response = await fetch(`/api/reactions/subs/${user}/${sub.ID}`)
    const data = await response.json()
    if(data[0]==undefined){
      setAbonne(false)
    }else{
      setAbonne(true)
    }
    
  }
    fetchUsers(router.query.c,auth.session)
  }
}, [router,auth])

  return (
    <>
    {user.PageName ?
      <Title title={`${user.PageName} - TeramaFlix`} />
      :
      <Title title={`Profile - TeramaFlix`} />
    }
      <div className=" px-12 py-1 z-0">
    <div className="relative md:h-40 h-30 w-full rounded-md overflow-hidden ">
      {
        user.Cover ?
        <Image width={80} height={80} src={`/Thumbnails/${user.Cover}`} alt="cover" className="  w-full  rounded-md" />
        :
        <Image width={80} height={80} src={`/img/cover.jpg`} alt="cover" className="  w-full  rounded-md" />
      }
      {auto.ID === user.ID && (<button className='absolute bottom-2 sm:right-6 right-3 bg-gray-300 text-white p-2 rounded-md cursor-pointer hover:bg-blue-500'>Change Cover</button>)}
    </div>
  </div>
  <div className=" relative bottom-9 flex md:flex-row flex-col items-center justify-center space-y-1 z-0  space-x-12 ">
    <div className=" break:hidden relative bottom-0 left-0 md:left-4 z-20 h-40 w-40 rounded-full border border-gray-100 bg-white p-2">
        {
          user.Photo ?
          <Image width={80} height={80} src={`/Thumbnails/${user.Photo}`} alt="profile" className="h-36 w-36 rounded-full" />
          :
          <Image width={80} height={80} src="/img/logo.png" alt="profile" className="h-36 w-36 rounded-full" />
        }
        
    </div>
    <div className=''>
      <div className="  break:relative break:bottom-12 flex  px-4 justify-start sm:flex-col md:flex-row lg:flex-row flex-col  ">
       
        <div className="flex space-x-3">
          <span className="text-3xl font-normal text-blue-600 ">{user.PageName} </span>
          {auto.ID === user.ID ? null :<SubBtn handleSub={handleSub} abonne={abonne} /> }
        </div>
      </div>
      <div className="flex justify-between px-7 pt-2 space-x-6">
          <span className="text-sm font-semibold text-blue-600"> {user.Posts} Posts</span>
          <span className="text-sm font-semibold text-blue-600"> {user.Abonnes} Abonnés</span>
        <span className="text-sm font-semibold text-blue-600 "> {user.Likes} Likes </span>
      </div>
      {
        auto.ID === user.ID ? (
          <div className='buttons absolute sm:right-20 right-18 ml-10 sm:ml-0 space-x-2'>
            <button onClick={handleEditChannel} className='p-2 bg-gray-400 hover:bg-blue-500 text-white rounded-md'>Edit Channel</button>
            <button onClick={handleDetailChannel} className='p-2 bg-gray-400 hover:bg-blue-500 text-white rounded-md'>Detail Channel</button>
          </div>
        ): null
      }
      
    </div> 
  </div>  
  <div className="flex items-center  justify-center my-1">
        <div className="flex flex-row  xl:space-x-16  break:space-x-4 space-x-8  ml-2    text-xs">
        <span onClick={()=>handleSetPage(1)} className="flex justify-self-center  bg-gray-500  text-white   font-semibold p-2  rounded-lg transform translate-y-1 hover:translate-y-0 duration-500 ease-in-out hover:bg-blue-600 hover:rounded-lg hover:text-white cursor-pointer lg:w-20 justify-center" > HOME </span>
          <span onClick={()=>handleSetPage(2)} className="flex justify-self-center  bg-gray-500  text-white   font-semibold p-2  rounded-lg transform translate-y-1 hover:translate-y-0 duration-500 ease-in-out hover:bg-blue-600 hover:rounded-lg hover:text-white cursor-pointer lg:w-20 justify-center "  >  VIDEOS</span>
            {/* <span className="flex justify-self-center  text-white cursor-progress  font-semibold p-2  rounded-lg transform ease-in-out bg-blue-600 hover:rounded-lg  cursor-default lg:w-20 justify-center" >  VIDEOS </span> */}
          <span onClick={()=>handleSetPage(3)} className="flex justify-self-center  bg-gray-500  text-white   font-semibold p-2  rounded-lg transform translate-y-1 hover:translate-y-0 duration-500 ease-in-out hover:bg-blue-600 hover:rounded-lg hover:text-white cursor-pointer lg:w-20 justify-center "  >  ABOUT</span>
        
        </div>
    </div>
    </>
  )
}

export default ProfileHeader