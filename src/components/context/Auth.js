import React, { useEffect, useState } from 'react';

const SessionContext = React.createContext();

function SessionProvider(props) {
    const [session, setSession] = useState()
  useEffect(() => {
    async function fetchData() {
        const res = await fetch('/api/verify');
         const donnees = await res.json();
       if(donnees.tokenDecod == undefined){
            return setSession('unlogged')
        }else{
            setSession(donnees.tokenDecod)
        } 
    }
 fetchData()
  }, []);

  return (
    <SessionContext.Provider
      value={{
        session
      }}>
      {props.children}
    </SessionContext.Provider>
  );
}

export { SessionProvider, SessionContext };