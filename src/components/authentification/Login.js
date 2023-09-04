import React, {useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'


// import jwt_decode from "jwt-decode"
function Login() {
  const router = useRouter()
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [errpass, setErrpass] = useState("")
  const [errmail, setErrmail] = useState("")
  const [showPassword,setShowPassword]=useState(false)
  const handleShowPassword=async(e)=>{
    e.preventDefault();
     setShowPassword(!showPassword)
  }
  const handleLogin = async () => {
    if(mail!==""&&password!==""){
      const response = await fetch(`/api/login/${mail}/${password}`);
      if (response.ok) {
        const data = await response.json();
        console.log('from login:',data)
          if(data){
             router.push('/')
          } 
        }
       else {
        const data = await response.json();
        if(data.message==="Email invalide"){
          setErrmail(data.message)
        }else{
          console.log(data.error)
          setErrpass(data.message)
        }
        
        console.log(`Erreur : ${response.status}${response.statusText} `);
      }
    }
    else{
      setErrpass("Please fill your information")
      setErrmail("Please fill your information")
    }
  }
  return (
    <>
<div  className="flex justify-center">
    <div  className="bg-purple-600 w-80 h-full rounded-lg mt-3">
        <div  className="relative bg-white mx-2 my-2 rounded-lg shadow-inner shadow-purple-700 space-y-3">
            <div  className="flex justify-center">
                <Image src="/logo/TeramaFlixpic.png" width={80} height={80} className="  object-cover rounded-full mt-3" alt=""/>
            </div>
            <hr  className="text-purple-700 border-2 w-64 mx-6"/>
            {/* <!--debut email--> */}
            <div>
                <div  className="flex-col justify-center">
                    <h2  className="flex justify-center font-bold text-purple-600">Email</h2>
                    <div  className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor"  className="w-12 h-12 text-purple-600">
                            <path  strokeLinecap="round"  strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>       
                    </div>
                </div>       
                <div  className="flex justify-center">
                    <input type="email" name="emailinput" onChange={(e)=>setMail(e.target.value)}
                      value={mail} id="emailid" placeholder="Your email" 
                       className="rounded-xl h-10 w-72 shadow-md ring shadow-blue-500 mt-2 hover:ring-blue-500 
                      p-6 italic font-medium text-purple-700 focus:outline-none"/>
                      </div>
                      <span className="text-red-600"> {errmail} </span>  
            </div>
            {/* <!--fin email-->
            <!--debut password--> */}
            <hr  className="text-purple-700 border-2 w-48 mx-14 mt-8"/>
            <div>
                <div  className="flex-col justify-center">
                    <h2  className="flex justify-center font-bold text-purple-600">Password</h2>
                    <div  className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor"  className="w-12 h-12 text-purple-600">
                            <path  strokeLinecap="round"  strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>                          
                    </div>
                </div>       
                <div  className="flex justify-center">
                    <input type={showPassword? "text":"password"} name="passwordinput" id="password_field" 
                     onChange={(e)=>setPassword(e.target.value)}
                     value={password}
                    placeholder="Your password" className="rounded-xl h-10 w-72 shadow-md ring shadow-blue-500
                     mt-3 italic hover:ring-blue-500 p-6 font-medium text-purple-700 focus:outline-none"/>
                     {!showPassword?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor" onClick={handleShowPassword} className="w-8 h-8 absolute right-6 mt-4 cursor-pointer text-purple-600" id="show_password" name="eye_show ">
                        <path  strokeLinecap="round"  strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path  strokeLinecap="round"  strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />                       
                      </svg>
                        :
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={handleShowPassword} className="w-8 h-8 absolute right-6 mt-4 cursor-pointer text-purple-600">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg> 
                      }    
                </div>           
                <span className="text-red-600"> {errpass} </span>       
            </div>
            {/* <!--fin password-->
            <!--debut forget password and remember me--> */}
           <div  className="flex justify-center mt-3">
            <div  className="flex-row">
                <input type="checkbox"  className=" checked:bg-blue-500" />
                <span  className="font-semibold text-blue-700">Remember me</span>
                <span  className="ml-8 font-semibold text-purple-700 cursor-pointer">forget password ?</span>
            </div>
           </div>
           {/* <!--fin forget password and remember me-->
           <!--debut boutton valider--> */}
           <div  className="flex justify-center">
            <button onClick={handleLogin}  className="bg-purple-700 text-white font-bold rounded-lg w-64 h-8">Sign in</button>
           </div>
           {/* <!--fin boutton valider--> */}
           <hr  className="text-purple-700 border-2 w-64 mx-6"/>
            {/* <!--debut haven't account and create it--> */}
          <div  className="flex justify-center space-x-5">
           <span  className="font-semibold text-blue-700">Haven{"'"}t an account?</span>
           <Link href="/signup"> <span  className="font-semibold text-purple-700 cursor-pointer">Create an account</span></Link> 
          </div>
          <div  className="h-0.5"></div>
        {/* <!--fin haven't account and create it--> */}
        </div>
    </div>
 </div>
    </>
  )
}

export default Login