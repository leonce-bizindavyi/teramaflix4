import React, { useState,useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';

export default function SwipperSlide() {
  const [videos, setVideos] = useState([])

  const fetchVideos = async () =>{
      const response = await fetch(`/api/posts/slides/0/20`)
      const data = await response.json()
      if(data[0]) setVideos(data)
  }
  useEffect(() => {
    fetchVideos()
  }, [])
  
  return (
    <>
      <Swiper
        autoplay={{
            delay: 3500,
            disableOnInteraction: false,
        }}
        navigation={true} 
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 7,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 8,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >

        {
            videos.map((video,id)=>{
                return (
                  <>
                  {id == 5 ? 
                  <SwiperSlide  key={video.ID}><iframe data-aa='2259101' src='//ad.a-ads.com/2259101?size=728x90' style={{width:'100%', height:'100%', border:0+'px', padding:0, overflow:'hidden', backgroundColor: 'transparent'}}></iframe></SwiperSlide>
                  :
                  <SwiperSlide  key={video.ID}><Slide video={video} /></SwiperSlide>
                  }
                  </>
                )
            })
        }
      </Swiper>
    </>
  );
}
