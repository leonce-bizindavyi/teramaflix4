import React,{useState, useEffect,useContext} from 'react'
import { SessionContext } from '../context/Auth'
import Comment from './Comment'

function Comments({video}) {
  const auto = useContext(SessionContext)
  const [comments, setComments] = useState([])
  const [fom, setFom] = useState({
    body: "",
    user:"",
    post: ""
  })


 
  const handleSubmit = async ()=>{
    const user = auto.session
    // Envoyer les données à l'API pour les insérer dans la base de données
    const response = await fetch('/api/comments/comment', {
      method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({body:fom.body,user:user.ID,post:video.ID})
    });
     // Vérifier si la création de la commentaire a réussi
     if (response.ok) {
      setFom({...fom,body:"",post:""})
      fetchComments(video.uniid)
    } else {
      console.error(`Failed to create user: ${response.status} ${response.statusText}`);
    }
  }
  const fetchComments = async (uuid) =>{
    const response = await fetch(`/api/comments/${uuid}`)
    const data = await response.json()
    if(data[0]){
      setComments(data)
    }
  }
  
  useEffect(() => {
    const fetchCommentsInterval = setInterval(() => {
      fetchComments(video.uniid)
    }, 6000000) // Fetch comments every 5 seconds

    fetchComments(video.uniid)

    return () => {
      clearInterval(fetchCommentsInterval)
    }
    
  }, [video.uniid])
  

    // Afficher un message de chargement lorsque uniid est indéfini
    if(!video){
      return (<div>Loading...</div>)
    }
  

  return (
    <>
      <div className="allUserComment lg:flex flex-col overflow-auto">
        {comments?.map(comment => (
          <Comment key={comment.ID} comment={comment} />
        ))} 
      </div>
        <div className="inputBox flex justify-center">
          <div className="inputComment flex flex-row w-[80%]  h-10 border mb-3 rounded-full bg-gray-300">
              <input type="text"  id="" placeholder="Entrer votre commentaire"
               className="Commentinput w-[83%] pl-2 rounded-l-full bg-gray-300"
               value={fom.body}
                onChange={(e)=>setFom({...fom,body:e.target.value})}/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 m-[1%] text-slate-800 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
              <svg onClick={handleSubmit} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" sendButton w-6 h-6 m-[1%] text-slate-800 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
          </div>
        </div>
    </>
  )
}

export default Comments