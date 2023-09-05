import Link from 'next/link'
import React,{useState,useEffect,useContext,useCallback} from 'react'
import SubBtn from '../subs/SubBtn'
import { usePeriod } from '../Hooks/usePeriod'
import { SessionContext } from '../context/Auth'
import Image from 'next/image'
import { useRouter } from 'next/router'

function Describe({video}) {
  const router = useRouter()
  const auto = useContext(SessionContext)
  const period = usePeriod(video.Created_at)
  const [liked, setLiked] = useState(2)
  const [likes, setLikes] = useState()
  const [abonne, setAbonne] = useState(true)
  const [yesColor, setYesColor] = useState('bg-gray-200')
  const [noColor, setNoColor] = useState('bg-gray-200')
  const [isCopied, setCopied] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const urlRef = React.useRef(null);
  // like the video begin
  // like clik
  const handleLike = (vidid,stats,like) =>{
    const user = auto.session
    if(like !=2){
      if(like === stats){
        deleteLike(vidid,likes.ID)
      }else{
        deleteLike(vidid,likes.ID)
        addLike(vidid,user.ID,stats)
      }
    }else{
      addLike(vidid,user.ID,stats)
    }
  }
  
 // add like api endpoint
  const addLike = async (post,user,etat) =>{
    const response = await fetch(`/api/reactions/addLikes/${post}/${user}/${etat}`)
    const data = await response.json()
    if(data.affectedRows === 1){
      setLiked(etat)
      fetchLikesReactions(post)
    }
}
//delete like api endpoint
  const deleteLike = async (post,id) =>{
    const response = await fetch(`/api/reactions/deleteLikes/${id}`)
    const data = await response.json()
    if(data.affectedRows === 1){
      setLiked(2)
      fetchLikesReactions(post)
    }
    
}
// test if liked api endpoint
const fetchLikesReactions = useCallback(async (id) => {
  const user = auto.session;
  const response = await fetch(`/api/reactions/likes/${id}/${user.ID}`);
  const data = await response.json();
  if (data[0] == undefined) {
    setYesColor('bg-gray-200');
    setNoColor('bg-gray-200');
    setLiked(2);
  } else {
    if (data[0].Etat == 0) {
      setNoColor('bg-blue-700');
      setYesColor('bg-gray-200');
      setLiked(0);
      setLikes(data[0]);
    } else {
      setNoColor('bg-gray-200');
      setYesColor('bg-blue-700');
      setLiked(1);
      setLikes(data[0]);
    }
  }
}, [auto.session]);

// channel sub begin
const fetchSubReactions = useCallback(async (user) => {
  const sub = auto.session;
  const response = await fetch(`/api/reactions/subs/${user}/${sub.ID}`);
  const data = await response.json();
  if (data[0] == undefined) {
    setAbonne(false);
  } else {
    setAbonne(true);
  }
}, [auto.session]);

useEffect(() => {
  fetchLikesReactions(video.ID);
  fetchSubReactions(video.User);
}, [auto, video, fetchLikesReactions, fetchSubReactions]);
  const handleSub = async (status) =>{
    const user = auto.session
    if(status === true){
      addSub(video.User,user.ID)
    }else{
      deleteSub(video.User,user.ID)
    }
    
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
  //channel sub end
  useEffect(() => {
    fetchLikesReactions(video.ID)
    fetchSubReactions(video.User)
  }, [auto,video,fetchLikesReactions,fetchSubReactions])
 

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCopied(false)
  };


  const videoUrl = `${process.env.NEXT_PUBLIC_URL}/Watch?v=${video.uniid}`; 
  
  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`;
    window.open(url, '_blank');
  };

  const shareOnYouTube = () => {
    const url = `https://www.youtube.com/watch?v=${encodeURIComponent(videoUrl)}`;
    window.open(url, '_blank');
  };

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(videoUrl)}`;
    window.open(url, '_blank');
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}`;
    window.open(url, '_blank');
  };

  const shareOnTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(videoUrl)}`;
    window.open(url, '_blank');
};


const handleCopyClick = () => {
  if (urlRef.current) {
    urlRef.current.select(); // Sélectionnez le texte
    document.execCommand('copy'); // Copiez le texte sélectionné
    window.getSelection().removeAllRanges(); // Désélectionnez le texte
    // Optionnel : afficher une notification indiquant que l'URL a été copiée
    setCopied(true)
  }
};


  return (
    <>
        <div id="description">
                <div className="description  pb-4 px-[3%] lg:px-0 w-full border-b-[2px] ">
                    <div className="p-[2%] pl-0 lg:text-[22px] text-[18px] font-semibold">{video.Title}</div>
                    <div className="reaction flex flex-col justify-between  space-y-2  text-white">
                       <div className="vuesAndDate flex flex-row space-x-2">
                        <div className="vues  text-black space-x-1 lg:text-base text-[13px] flex flex-row justify-center">
                        </div>
                       </div>
                       <div className="vuesAndDate flex flex-row space-x-2">
                        <div className="vues  text-black space-x-1 lg:text-base text-[13px] flex flex-row justify-center">
                            <div className="nbrVues ">{video.Views}</div>
                            <div className="">vues</div>
                        </div>
                        <div className="dateSortie  text-black lg:text-base text-[13px]">
                            <span className="date lg:text-base text-[13px]">{period}</span>
                        </div>
                       </div>
                       <div className="reaction flex flex-row justify-between">
                          <div onClick={()=>handleLike(video.ID,1,liked)} className={`hover:text-blue-500 jaime cursor-pointer  ${yesColor} p-2 rounded-3xl h-[45px] text-black flex lg:flex-row flex-col justify-center items-center lg:space-x-2 lg:text-[18px] font-semibold lg:text-base text-[13px]`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-6 lg:h-6 w-4 h-4 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                            </svg>
                            <span className="liked ">Like</span>
                          </div>
                          <div  onClick={()=>handleLike(video.ID,0,liked)} className={`jaimepas hover:text-blue-500  cursor-pointer ${noColor} p-2 rounded-3xl h-[45px] text-black flex lg:flex-row justify-center items-center  lg:space-x-2 lg:text-[18px] lg:text-base text-[13px] font-semibold flex-col`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-6 lg:h-6 w-4 h-4 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                              </svg>
                              <span className="">Unlike</span>
                          </div>
                        <div title='Share' onClick={openModal} className="partager hover:text-blue-500 cursor-pointer  bg-gray-200 p-2 rounded-3xl h-[45px] text-black flex lg:flex-row justify-center items-center lg:space-x-2 text-[18px] font-semibold flex-col">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="hover:text-blue-500  lg:w-6 lg:h-6 w-4 h-4 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                              </svg>
                              <span className="lg:text-base text-[13px] ">Share</span>
                        </div>
                        <div title='Download' className="telecharger p-[10px] h-[45px] text-white bg-blue-500 rounded-[50%] lg:text-base text-[13px]  " >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                              </svg>
                            </div>
                       </div>
                         
                    </div>
                </div>
                <div className="profil  flex flex-row justify-between lg:px-0 px-[3%] items-center ">
                  <Link href="/profile">
                    <div className="profilChannel  flex justify-start items-center space-x-2  cursor-pointer ">
                      {
                        video.Photo ?
                        <Image width={80} height={80} src={`/Thumbnails/${video.Photo}`} className="w-10 h-10 my-1  rounded-full " alt="logo"/>
                        :
                        <Image width={80} height={80} src="/img/logo.png" className="w-13 h-12 my-1  rounded-full " alt="logo"/>
                      }
                       
                        <h1 className= "font-bold text-[20px] cursor-pointer">{video.PageName}</h1>
                    </div>
                    </Link>
                    {
                      video.User === auto.ID ? null:<SubBtn handleSub={handleSub} abonne={abonne} />
                    }
                    
                </div>
              </div>
              {isModalOpen && (
        <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
          <div className="modal-overlay absolute w-full h-full   opacity-50"></div>

          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              {/* -- Titre du modal -- */}

              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold text-bg-light">Share video</p>
                <button
                  className="modal-close cursor-pointer z-50"
                  onClick={closeModal}
                >
                  <svg
                    className="fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M18 1.8L16.2 0 9 7.2 1.8 0 0 1.8 7.2 9 0 16.2 1.8 18 9 10.8l7.2 7.2 1.8-1.8-7.2-7.2z" />
                  </svg>
                </button>
              </div>

              {/* <!-- Contenu du modal --> */}

        <div className="my-3">
          <div className="flex justify-around my-4">
            {/* <!--FACEBOOK ICON--> */}
            <div
            onClick={shareOnFacebook}
              className="border hover:bg-[#1877f2] w-12 h-12 fill-[#1877f2] hover:fill-white border-blue-200 rounded-full flex items-center justify-center shadow-xl   hover:shadow-blue-500/50 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"
                ></path>
              </svg>
            </div>
            {/* <!--TWITTER ICON--> */}
            <div
            onClick={shareOnTwitter}
              className="border hover:bg-[#1d9bf0] w-12 h-12 fill-[#1d9bf0] hover:fill-white    border-blue-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-sky-500/50 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                ></path>
              </svg>
            </div>
            {/* <!--YOUTUBE ICON--> */}
            <div
              onClick={shareOnYouTube}
              className="border hover:bg-[#bc2a8d] w-12 h-12 fill-[#bc2a8d] hover:fill-white   border-pink-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-pink-500/50 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                  <path  d="M23.495 7.204s-.187-1.352-.76-1.945c-.799-.799-1.685-.8-2.09-.847-2.917-.21-7.285-.21-7.285-.21h-.9s-4.368 0-7.285.21c-.404.047-1.29.048-2.09.847-.573.593-.76 1.945-.76 1.945S0 8.85 0 10.498v2.004c0 1.647.22 3.294.22 3.294s.187 1.352.76 1.945c.8.798 1.846.775 2.315.855 1.68.15 6.98.21 6.98.20h.9s4.367 0 7.284-.21c.404-.046 1.29-.047 2.09-.846.573-.593.76-1.945.76-1.945s.22-1.647.22-3.294v-2.004c-.01-1.648-.23-3.295-.23-3.295zm-14.29 7.702V8.09l6.315 3.406-6.315 3.4z" ></path>
              </svg>

            </div>

            {/* <!--WHATSAPP ICON--> */}
            <div
            onClick={shareOnWhatsApp}
              className="border hover:bg-[#25D366] w-12 h-12 fill-[#25D366] hover:fill-white   border-green-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-green-500/50 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"
                ></path>
              </svg>
            </div>

           {/*  <!--TELEGRAM ICON--> */}
            <div
              onClick={shareOnTelegram}
              className="border hover:bg-[#229ED9] w-12 h-12 fill-[#229ED9] hover:fill-white border-sky-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-sky-500/50   cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"
                ></path>
              </svg>
            </div>
          </div>
 
          {/* <!--BOX LINK--> */}
          <div className="border-2 border-gray-200 flex justify-between items-center mt-4 py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-gray-500 ml-2"
            >
              <path
                d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"
              ></path>
              <path
                d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"
              ></path>
            </svg>

            <input ref={urlRef}  className="w-full outline-none bg-transparent" type="text" value={videoUrl} placeholder="link" />

            {
              isCopied ?
              <button className="bg-green-600 text-white rounded text-sm py-2 px-1 mr-2">
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='w-[30px] h-[15px]'>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                </svg>
            </button>
              :
              <button  onClick={handleCopyClick} className="bg-indigo-500 text-white rounded text-sm py-2 px-1 mr-2 hover:bg-indigo-600">
                Copy
            </button>
            }
          </div>
        </div>
 
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Describe