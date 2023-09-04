import React, {useState} from 'react'
function PopAddVideo(props) {
  const [isDragged, setDrag] = useState(false)
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const filterfile = files.filter((file) => file.type.includes('video'));
    if (filterfile.length > 0) {
      props.handleUpload(filterfile)
    }
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const filteredFiles = files.filter((file) => file.type.includes('video'));
    if (filteredFiles.length > 0) {
      props.handleUpload(filteredFiles)
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setDrag(true)
  };
  
  
  return (
    <>
       <div onDrop={handleDrop}
        onDragOver={handleDragOver} className="popup-drop-video absolute md:right-8 right-0 top-5 flex flex-col justify-center items-center  bg-blue-500 md:w-[500px] w-full h-[300px] rounded-md">
                <label htmlFor="file" className="file-style cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-32 h-32 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                  {
                    isDragged ?
                    <h2 className="text-white">Drop videos here</h2>
                    :
                    <h2 className="text-white">Upload videos here</h2>
                  }
                </label>   
                <input type="file" id="file" className="hidden ml-10" accept="video/*" multiple onChange={handleFileChange}/>       
              <button className="btn-addvid-closer absolute top-2 right-3" onClick={()=>props.handleaddvid(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="drop-video-closer w-6 h-6 text-white cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>  
    </>
  )
}

export default PopAddVideo