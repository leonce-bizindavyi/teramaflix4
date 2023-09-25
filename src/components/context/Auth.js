import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

const SessionContext = React.createContext();

function SessionProvider(props) {
    const [session, setSession] = useState()
  useEffect(() => {
  async function decodeJWT(token) {
    try {
      if(token){
        const decoded = jwt.decode(token);
        console.log(decoded)
        return setSession(decoded);
      }else{
      return setSession('ce');
      }
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return setSession('cd');
    }
  }

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    console.log(token)
      decodeJWT(token);
  }
}, [typeof window !== 'undefined' && localStorage.getItem('token')]);

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