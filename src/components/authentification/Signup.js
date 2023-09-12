import React,{useState} from 'react'
import Link from 'next/link'
import { Formik, Form, Field, ErrorMessage  } from 'formik'
import * as Yup from 'yup'
import 'animate.css';

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
<div  className="flex justify-center">
    <div  className="bg-blue-600 w-80 h-full rounded-lg mt-1">
        <div  className="relative bg-white mx-1 my-3 rounded-sm shadow-inner shadow-blue-700 space-y-4">
            <div  className="flex justify-center">
                <h1  className="font-bold mt-2 text-purple-700">REGISTER</h1>
            </div>
            <hr  className="text-purple-700  border-2 w-64 mx-6 mt-1"/>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
            {/* <!--debut first name--> */}
            <div>
                <div  className="flex-col justify-center">
                    <h2  className="flex justify-center font-bold text-blue-600">First Name</h2>
                </div>       
                <div  className="flex justify-center">
                    <Field id="inputCreateUser" placeholder="Your first name" name="nom" className="rounded-md h-10 w-72 shadow-md ring shadow-blue-500 mt-2 text-blue-600 hover:ring-blue-500
                     p-6 font-medium italic focus:outline-none" />
                </div>
                <ErrorMessage name="nom" className='text-red-600' component="span"/>
            </div>
            {/* <!--fin first name-->
             <!--debut last name--> */}
             <div>
                <div  className="flex-col justify-center">
                    <h2  className="flex justify-center font-bold text-blue-600">Last Name</h2>
                </div>       
                <div  className="flex justify-center">
                    <Field id="inputCreateUser" placeholder="Your last name" name="prenom" 
                    className="rounded-md h-10 w-72 shadow-md ring shadow-blue-500 mt-2 text-blue-600 hover:ring-blue-500
                    p-6 font-medium italic focus:outline-none" />
                    
                </div>
                <ErrorMessage name="prenom" className='text-red-600' component="span"/>
            </div>
            {/* <!--fin last name-->
            <!--debut email or phone number--> */}
            <div>
                <div  className="flex-col justify-center">
                    <h2  className="flex justify-center font-bold text-blue-600">Email or Phone</h2>
                </div>       
                <div  className="flex justify-end mr-4 ">
                    <Field type="email" id="inputCreateUser" placeholder="Your Email" name="mail" 
                    className="rounded-md h-10 w-56 shadow-md ring shadow-blue-500 mt-2 text-blue-600 hover:ring-blue-500 
                    p-4 font-medium italic focus:outline-none" />
                </div>
                <div  className="flex gap-1 -mt-12 ml-2.5 ring shadow-md shadow-blue-500 hover:ring-blue-500 w-14 h-12 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor"  className="w-10 h-10 ml-2 self-center cursor-pointer  text-purple-500 hover:text-blue-600" name="icon_email" id="icon_email_id">
                        <path  strokeLinecap="round"  strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor"  className="w-10 h-10 self-center ml-2 cursor-pointer hidden text-purple-500 hover:text-blue-600" name="icon_phone" id="icon_phone_id">
                        <path  strokeLinecap="round"  strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                </div>
                <ErrorMessage name="mail" className='text-red-600' component="span"/>
            </div>
            {/* <!--fin email or phone number-->
            <!--debut password--> */}
            <div>
                <div  className="flex-col justify-center">
                    <h2  className="flex justify-center font-bold text-blue-600">Password</h2>
                </div>
                <div  className="flex justify-center">
                <Field type={showPassword? "text":"password"} id="inputCreateUser" placeholder="Your password" name="password" 
                    className="rounded-md h-10 w-72 shadow-md ring shadow-blue-500 mt-2 hover:ring-blue-500 p-6
                    font-medium text-blue-700 focus:outline-none" /> 
                    {!showPassword?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor" onClick={handleShowPassword} className="w-8 h-8 absolute right-6 mt-4 cursor-pointer text-blue-700" id="show_password" name="eye_show ">
                        <path  strokeLinecap="round"  strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path  strokeLinecap="round"  strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />                       
                      </svg>
                        :
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={handleShowPassword} className="w-8 h-8 absolute right-6 mt-4 cursor-pointer text-blue-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg> 
                      } 
                </div>
                         
                <ErrorMessage name="password" className='text-red-600' component="span"/>
            </div>
            {/* <!--fin password-->
            <!--debut confirmer mot de pass--> */}
            <div  className="p-2">
                <div  className="flex-col justify-center">
                    <h2  className="flex justify-center font-bold text-blue-600">Confirm password</h2>
                </div>
                <div  className="flex justify-center">
                <Field type={showConfirm? "text":"password"}  id="inputCreateUser" placeholder="Confirm your password" name="confirm" 
                    className="rounded-md h-10 w-72 shadow-md ring shadow-blue-500 mt-2 hover:ring-blue-500 p-6
                    font-medium text-blue-700 focus:outline-none" />  
                    {!showConfirm?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor" onClick={handleShowConfirm} className="w-8 h-8 absolute right-6 mt-4 cursor-pointer text-blue-700" id="show_password" name="eye_show ">
                        <path  strokeLinecap="round"  strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path  strokeLinecap="round"  strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />                       
                      </svg>
                        :
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={handleShowConfirm} className="w-8 h-8 absolute right-6 mt-4 cursor-pointer text-blue-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg> 
                      }  
                </div>            
                <ErrorMessage name="confirm" className='text-red-600' component="span"/>         
            </div>

            {/* <!--fin confirmer mot de pass-->
           <!--debut boutton valider--> */}
            <div className="flex justify-center p-1">
                <button
                    type="submit"
                    className={`bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg w-64 h-10 mt-0.5 ${loading ? 'animate-pulse' : ''}`}
                    
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
              <p className='text-blue-700'>Already have an account?  <Link href="/login" className="text-purple-600 hover:text-purple-700 focus:outline-none focus:underline transition ease-in-out duration-150">Sign in !</Link></p>
            </div>
           <div  className="h-0.5"></div>
        </div>
    </div>
 </div>
      </>
    )
}

export default Signup