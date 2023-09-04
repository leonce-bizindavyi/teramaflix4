import React,{useState,useEffect,useContext} from 'react'
import Comment from './Comment'
import { SessionContext } from '../context/Auth'

function Comments({handleCmnt,video}) {
  const auto = useContext(SessionContext)
  const [comments, setComments] = useState()
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
      setFom({...fom,body:""})
      
    } else {
      console.error(`Failed to create user: ${response.status} ${response.statusText}`);
    }
  }
  const fetchComments = async (uuid) =>{
    const response = await fetch(`/api/comments/${uuid}`)
    const data = await response.json()
    setComments(data)
  }

useEffect(() => {
  if(auto.session){
    fetchComments(video.uniid)
  }
}, [auto,video])
  return (
    <>
        <div className="commentsContainer z-50 absolute bottom-2 left-2 h-max max-h-full w-[95%] rounded-lg bg-[rgba(255,255,255,0.5)] ">
            <div onClick={()=>handleCmnt(false)} className="closer ml-[90%]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                
            </div>
            <div className="comments p-4 overflow-y-auto  max-h-[400px]">
                {
                    comments?.map(comment =>{
                        return <Comment key={comment.ID} comment={comment} />
                    })
                }
            </div>
            <div className="inputBox flex justify-center mt-2">
                <div className="inputComment flex flex-row w-[80%]  h-10 border mb-3 rounded-full bg-gray-300">
                    <input type="text" onChange={(e)=>setFom({...fom,body: e.target.value})} value={fom.body} id="" placeholder="Entrer votre commentaire" className="Commentinput w-[83%] pl-2 rounded-l-full bg-gray-300"/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 m-[1%] text-slate-800 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                    </svg>
                    <svg onClick={handleSubmit} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" sendButton w-6 h-6 m-[1%] text-slate-800 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </div>
            </div>
        </div>
    </>
  )
}

export default Comments