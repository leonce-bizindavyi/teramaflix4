import React,{useState} from 'react'
import Link from 'next/link'
import { Formik, Form, Field, ErrorMessage  } from 'formik'
import * as Yup from 'yup'
import 'animate.css';
import Image from 'next/image'

function Signup() {
    const [showPassword,setShowPassword]=useState(false)
    const [showConfirm,setShowConfirm]=useState(false)
    const [loading, setLoading] = useState(false);
    const [inserted,setInserted]=useState(false)
    const initialValues = {
        nom: "",
        prenom: "",
        mail: "",
        password: "",
        confirm: ""
    }
    const handleShowPassword=async(e)=>{
        e.preventDefault();
        setShowPassword(!showPassword)
      }
      const handleShowConfirm=async(e)=>{
        e.preventDefault();
        setShowConfirm(!showConfirm)
      }
    const validationSchema = Yup.object().shape({
        nom: Yup.string().required("You must input a nom !").min(3, "Nom must be at least 3 characters!"),
        prenom: Yup.string().required("You must input a prenom !").min(3, "Prenom must be at least 3 characters!"),
        mail: Yup.string().required("You must input a mail !").email("Invalid email address!"),
        password: Yup.string()
            .required("You must input a password !")
            .min(7, "Password must be at least 7 characters!")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]+$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character!"
            ),
        confirm: Yup.string()
            .required("You must input a confirm !")
            .oneOf([Yup.ref("password")], "Confirm password must match the password!"),
    })
    const onSubmit = async(data)=>{
        setLoading(true);
        const addData={
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify(data)
          };
          const res= await fetch(`/api/signup`,addData);
          const response=await res.json()
          setLoading(false);
          if(response.response.data === "errorMail"){

          }else if(response.response.message !=="success"){
            setInserted(true)
            router.push('/login')
          }
    }
    
    return (
      <>
<div  className="flex flex-col items-center justify-center   h-screen lg:flex-row bg-no-repeat lg:bg-repeat bg-[url('/logo/loginwall.jpg')] bg-contain bg-bottom  lg:bg-left bg-white font-quicksand">

<div className= "image w-[100%] lg:w-[50%] h-max  lg:h-screen flex justify-center items-center">
      <Image src="/logo/TeramaFlixpic.png" width={280} height={280} className="  object-cover w-[180px] sm:w-[280px]  h-[180px] sm:h-[280px] mt-3" alt=""/>
      <Image src="/logo/TeramaFlixnam.png" width={280} height={280} className=" hidden lg:block   object-cover  mt-3" alt=""/>
    </div>
    <div  className="w-[90%] h-[80%] overflow-auto sm:h-[45%] lg:w-[30%] lg:h-screen shadow-lg shadow-blue-300  flex justify-center items-center  rounded-lg mt-3">
    <div  className="flex lg:justify-center flex-col items-center space-y-2 w-full h-full lg:h-[400px] bg-gray-100  mx-2 my-2 rounded-lg  ">
          
      <h1 className='text-[1.5rem] sm:text-[3rem] lg:text-[2rem] text-blue-500 font-semibold'>Register</h1>

            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
            {/* <!--debut first name--> */}
            <div className='loginContainer  relative flex flex-col justify-center  space-y-4 w-full h-full'>
            <h2  className="text-xl sm:text-3xl lg:text-lg text-slate-600  font-semibold">First Name</h2>       
                
               <Field id="inputCreateUser" placeholder="Your first name" name="nom" className="rounded-md sm:h-20 lg:h-10 h-12  w-64 sm:w-[27rem] lg:w-64 p-3 text-md sm:text-xl lg:text-sm font-semibold text-slate-600 shadow-md ring shadow-blue-500   hover:ring-blue-500
                      focus:outline-none" />
                <ErrorMessage name="nom" className='text-red-800 text-xs sm:text-xl  lg:text-xs' component="span"/>
                {/* <!--fin first name-->
             <!--debut last name--> */}
                    <h2  className="text-xl sm:text-3xl lg:text-lg text-slate-600  font-semibold">Last Name</h2>
                    <Field id="inputCreateUser" placeholder="Your last name" name="prenom" 
                    className="rounded-md sm:h-20 lg:h-10 h-12  w-64 sm:w-[27rem] lg:w-64 p-3 text-md sm:text-xl lg:text-sm font-semibold text-slate-600 shadow-md ring shadow-blue-500   hover:ring-blue-500
                    focus:outline-none" />
                   <ErrorMessage name="prenom" className='text-red-800 text-xs sm:text-xl  lg:text-xs' component="span"/>
            
            {/* <!--fin last name-->
            
            
            <!--debut email or phone number--> */}
             <h2  className="text-xl sm:text-3xl lg:text-lg text-slate-600  font-semibold">Email or Phone</h2>
                      
                      <div  className="flex flex-row px-1 bg-white space-x-1 justify-center w-max items-center shadow-md ring shadow-blue-500 hover:ring-blue-500 rounded-md overflow-hidden">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor"  className="sm:w-8 w-6 lg:w-6 sm:h-8 h-6 lg:h-6 text-slate-500 font-bold" name="icon_email" id="icon_email_id">
                              <path  strokeLinecap="round"  strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                          <Field type="email" id="inputCreateUser" placeholder="Your Email" name="mail" 
                          className="rounded-xl sm:h-20 lg:h-10 h-12  w-64 sm:w-[27rem] lg:w-64 p-3 text-md sm:text-xl lg:text-sm font-semibold text-slate-600 focus:outline-none" />
                      </div>
                      
                      <ErrorMessage name="mail" className='text-red-800 text-xs sm:text-xl  lg:text-xs' component="span"/>
                   
            
            {/* <!--fin email or phone number-->
            <!--debut password--> */}
                    <h2  className="text-xl sm:text-3xl lg:text-lg text-slate-600  font-semibold">Password</h2>
                
                <div  className="flex flex-row relative h-10 w-64  bg-white  justify-center items-center shadow-md ring shadow-blue-500 hover:ring-blue-500 rounded-md overflow-hidden">
                <Field type={showPassword? "text":"password"} id="inputCreateUser" placeholder="Your password" name="password" 
                    className="sm:h-20 lg:h-10 h-12  w-64 sm:w-[27rem] lg:w-64 p-3 text-md sm:text-xl lg:text-sm
                     font-semibold   focus:outline-none" /> 
                    {!showPassword?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor" onClick={handleShowPassword} className="w-6 h-6 absolute right-2 cursor-pointer hover:text-blue-500  text-slate-500" id="show_password" name="eye_show ">
                        <path  strokeLinecap="round"  strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path  strokeLinecap="round"  strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />                       
                      </svg>
                        :
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={handleShowPassword} className="w-6 h-6 absolute right-2 cursor-pointer hover:text-blue-500  text-slate-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg> 
                      } 
                </div>
                <div className='w-64'>
                      <ErrorMessage name="password" className='text-red-800 text-xs sm:text-xl  lg:text-xs ' component="span"/>
                </div>
                
                    
               
                
           
            {/* <!--fin password-->
            <!--debut confirmer mot de pass--> */}
                    <h2  className="text-xl sm:text-3xl lg:text-lg text-slate-600  font-semibold">Confirm password</h2>
              
                <div  className="flex flex-row relative h-10 w-64  bg-white  justify-center items-center shadow-md ring shadow-blue-500 hover:ring-blue-500 rounded-md overflow-hidden">
                <Field type={showConfirm? "text":"password"}  id="inputCreateUser" placeholder="Confirm your password" name="confirm" 
                    className="sm:h-20 lg:h-10 h-12  w-64 sm:w-[27rem] lg:w-64 p-3 text-md sm:text-xl lg:text-sm
                   font-semibold    focus:outline-none" />  
                    {!showConfirm?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor" onClick={handleShowConfirm} className="w-6 h-6 absolute right-2 cursor-pointer hover:text-blue-500  text-slate-500" id="show_password" name="eye_show ">
                        <path  strokeLinecap="round"  strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path  strokeLinecap="round"  strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />                       
                      </svg>
                        :
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={handleShowConfirm} className="w-6 h-6 absolute right-2 cursor-pointer hover:text-blue-500  text-slate-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg> 
                      }  
                </div>            
                <div className='w-64'>
                  <ErrorMessage name="confirm" className='text-red-800 text-xs sm:text-xl  lg:text-xs' component="span"/>
                </div>
                         
            </div>

            {/* <!--fin confirmer mot de pass-->
           <!--debut boutton valider--> */}
            <div className="flex justify-center ">
                <button
                    type="submit"
                    className={`bg-purple-600 hover:bg-purple-700 text-white text-lg sm:text-2xl  lg:text-sm font-bold rounded-lg w-64 h-8 sm:h-10 lg:h-8 ${loading ? 'animate-pulse' : ''}`}
                    
                    disabled={loading}
                >
                    {loading ? 'Signing...' : 'REGISTER'}
                </button>
            </div>
           </Form>
           </Formik>
           {inserted ? <span className="">inserted </span> : null } 
           {/* <!--fin boutton valider--> */}
           <div className="ml-8 font-semibold text-md">
              <p className='text-md sm:text-2xl lg:text-sm font-semibold text-blue-700'>Already have an account?  <Link href="/login" className="text-purple-600 hover:text-purple-700 focus:outline-none focus:underline transition ease-in-out duration-150">Sign in !</Link></p>
            </div>
           <div  className="h-0.5"></div>
        </div>
    </div>
 </div>
      </>
    )
}

export default Signup