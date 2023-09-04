import React,{useState,useEffect} from 'react'
import styles from '@/styles/Home.module.css'
import Title from '../Title'
import { usePeriod } from '../Hooks/usePeriod'
import { useRouter } from 'next/router'

function About() {
  const router  = useRouter()
  const [user, setUser] = useState({})
  const fetchUsers = async (unid) =>{
    const response = await fetch(`/api/users/getUser/${unid}`)
    const data = await response.json()
    setUser(data[0])
}

useEffect(() => {
  if(router.query.c) fetchUsers(router.query.c);

}, [router])
  return (
    <>
    <Title title={`About ${user.PageName} -TeramaFlix`} />
     <div className={`${styles.filmcontainer}  `}>
        <div>
      <h1>Description</h1>
          <hr style={{width:100+"%",height:8+"px",textAlign:"center",color:"#3a82f5"}} className="mt-4"/>
          {user.Description}
        </div>
        <div>
            <h2>Statistique</h2>
            <hr style={{width:100+"%",height:8+"px",textAlign:"center",color:"#3a82f5"}} className="mt-4"/>
            <h2>{user.Posts} Posts</h2>
            <hr style={{width:100+"%",height:8+"px",textAlign:"center",color:"#3a82f5"}} className="mt-4"/>
            <h2>{user.Views} views</h2>
            <hr style={{width:100+"%",height:8+"px",textAlign:"center",color:"#3a82f5"}} className="mt-4"/>
            <h2>{user.Abonnes} Abonnes</h2>
            <hr style={{width:100+"%",height:8+"px",textAlign:"center",color:"#3a82f5"}} className="mt-4"/>
            <h2>joined {usePeriod(user.Created_at)} </h2>
            <hr style={{width:100+"%",height:8+"px",textAlign:"center",color:"#3a82f5"}} className="mt-4"/>
        </div>
    </div>   
    </>
  )
}

export default About