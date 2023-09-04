import '@/styles/globals.css'
import '@/styles/Player.css'
import '@/styles/Short.css'
import '@/styles/Admin.css'
import '@/styles/swiper.css'
import '@/styles/controls.css'
import { SessionProvider } from '@/components/context/Auth'
import Navbar from '@/components/Navs/Navbar'
import Messagerie from '@/components/Messages/Messagerie'
import {toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  if(Component.getLayout){
      return Component.getLayout(<Component {...pageProps} />)
    }
  return (
    <SessionProvider>
      <div className="wrapper relative w-full h-full bg-gray-100   pt-1 overflow-x-hidden ">
        <Navbar />
        <div className="Acceuilcontainer  w-full mt-[4rem] justify-center items-center  bg-gray-100 flex flex-col h-full ">
          <div className={`container w-[100%] h-[100%] lg:px-6  px-6  bg-white lg:p-4 rounded  flex flex-col justify-center`}>
          <Component {...pageProps} />
           <Messagerie />
        </div>
        </div>
      </div>
      <ToastContainer />
    </SessionProvider>
  
  )
}
