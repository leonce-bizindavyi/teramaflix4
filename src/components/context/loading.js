import React, { useEffect, useState } from 'react';

const LoadContext = React.createContext();

function LoadProvider(props) {
    const [loaded, setLoaded] = useState(false)
  useEffect(() => {
  setLoaded(true)
}, []);

function handleLoading(status) {
    setLoaded(status)
  }
  return (
    <LoadContext.Provider
      value={{
        loaded,
        setLoading: handleLoading
      }}>
      {props.children}
    </LoadContext.Provider>
  );
}

export { LoadProvider, LoadContext };