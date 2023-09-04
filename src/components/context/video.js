import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { SessionContext } from './Auth';
const VideoContext = React.createContext();

function VideoProvider(props) {
  const auto = useContext(SessionContext)
  const router = useRouter()
  const [video, setVideo] = useState(null);

  useEffect(() => {
    async function fetchData(post, user) {
      const response = await fetch(`/api/posts/watch/${post}/0/${user.ID}`);
      const data = await response.json();
      if (data[0]) setVideo(data[0]);
    }
    if (router.query.v && auto.session) {
      fetchData(router.query.v, auto.session)
    }
  }, [router.query.v,auto]); // Ajout des dépendances router.query.v et auto.session

  return (
    <VideoContext.Provider
      value={{
        video,
      }}>
      {props.children}
    </VideoContext.Provider>
  );
}

export { VideoProvider, VideoContext };