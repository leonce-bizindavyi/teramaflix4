import '@/styles/globals.css'
import '@/styles/Player.css'
import '@/styles/Short.css'
import '@/styles/Admin.css'
import '@/styles/swiper.css'
import '@/styles/controls.css'
import '@/styles/fonts.css'
import { SessionProvider } from '@/components/context/Auth'
import Navbar from '@/components/Navs/Navbar'
import Messagerie from '@/components/Messages/Messagerie'
import {toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import LinearIndeterminate from '@/components/Bar'
import { LoadProvider } from '@/components/context/loading'

export default function App({ Component, pageProps }) {
  if(Component.getLayout){
      return Component.getLayout(<Component {...pageProps} />)
    }
  const [blur , setBlur] = useState(false)
  const sideAllOpened = (state) => {
    setBlur(state)
  }
  return (
    <SessionProvider>
      <LoadProvider>
       <div className="font-quicksand">
          <div className="wrapper relative w-full h-full bg-gray-100   pt-1 overflow-x-hidden ">
          <Navbar sideAllOpened = {sideAllOpened} />
        <div className={`Acceuilcontainer ${blur? 'blur': {}}  w-full  justify-center items-center  bg-gray-100 flex flex-col h-full `}>
            <div className={`container w-[100%] h-[100%] lg:px-6    bg-white lg:p-4 lg:rounded  flex flex-col justify-center`}>
              <LinearIndeterminate />
            <Component {...pageProps} />
            <Messagerie />
          </div>
          </div>
        </div>
       </div>
      
      <ToastContainer />
      </LoadProvider>
    </SessionProvider>
  
  )
}
