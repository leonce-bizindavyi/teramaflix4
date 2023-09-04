import React, { useState,useContext } from 'react'
import { SessionContext } from '../context/Auth';
import { useRouter } from 'next/router'
import Image from 'next/image';

function CreateChannel() {
    const auto = useContext(SessionContext)
    const router=useRouter()
    const [selectedImage,setSelectedImage]=useState('')
    const [photo,setPhoto]=useState(null)
    const [descriptio,setDescriptio]=useState('')
    const [category,setCategory]=useState('')
    const [pageName,setPageName]=useState('')
    const [success,setSuccess]=useState('')
    const [error,setError]=useState('')
    const handleGetpic=(datas)=>{
         setSelectedImage(URL.createObjectURL(datas[0]))
        setPhoto(datas[0])
    }
    const handleSavePage=async()=>{
        if(!photo&&!pageName&&!category&&!descriptio)setError('All fields Are empty')
        else if(!photo)setError('photo field is obligatory ')
        else if(!pageName)setError('pageName field is obligatory ')
        else if(!category)setError('category field is obligatory ')
        else if(!descriptio)setError('Description field is obligatory ')        
        else{
         const user=await auto
         const userId=user.session.User
         const formData=new FormData()
         formData.append("pageName",pageName)
         formData.append("descriptio",descriptio)
         formData.append("category",category)
         formData.append("userId",userId)
         formData.append("image",photo)
       
         
         const res=await fetch(`/api/createChannel`,{method:"POST",body:formData})
         const response=await res.json();         
            if(response.message=='Success')
            {
               const user2=await auto
               setSuccess('Success')
               router.push(`/profile?c=${user2.session.uniid}`)
            }
            else{
               setError(response.message)
               return
            }
        }
    }

  return (
    <>
        <div  className="flex flex-col justify-center items-center">
            <div  className="header-profil flex flex-col justify-center items-center space-y-2">
                <div  className="profil-pic rounded-full overflow-hidden">
                    {photo? <Image src={selectedImage} width={36} height={36}alt="profil"  className="w-36 h-36" /> :
                            <Image src="/img/logo.png" width={36} height={36} alt="profil"  className="w-36 h-36" />}
                </div>
                <label htmlFor='changePic'   className="bg-blue-500 p-1 text-white rounded   ">change profil
                </label>
                    {error? <span className='text-red-600'>{error}</span>: <span className='text-blue-600'>{success}</span>}
                    
                <input type='file' onChange={(e)=>handleGetpic(e.target.files)} id='changePic' className='hidden' />
                <h1  className="font-semibold text-[1.2rem] text-[rgb(100,116,139)]">Information of my page</h1>
            
            </div>
            <div  className="container-channel flex flex-col justify-center mt-4 md:w-[380px] space-y-3">
                <label htmlFor="title">Name of channel</label>
                <input type="text" value={pageName} id="title" onChange={(e)=>{setPageName(e.target.value)}} className=" border-2 border-blue-500 h-10 rounded"/>
                <label htmlFor="Categorie">Type of channel</label>
                <select  id="Categorie" value={category} onChange={(e)=>{setCategory(e.target.value)}} className="border-2 border-blue-500 h-10 rounded">
                    <option value="2">Series</option>
                    <option value="3" >Film</option>
                    <option value="4">Comédie</option>
                    <option value="5">Music</option>
                    <option value="5">Music</option>
                    <option value="1">Other</option>
                </select>
                <label htmlFor="textarea">Description</label>
                <textarea  id="textarea" value={descriptio} onChange={(e)=>{setDescriptio(e.target.value)}} cols="30" rows="3"  className="border-2 border-blue-500  rounded"></textarea>
                <button onClick={handleSavePage} className="bg-blue-500 p-2 text-white rounded ">save</button>
            </div>
        </div>
    </>
  )
}

export default CreateChannel