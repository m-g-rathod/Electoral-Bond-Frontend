import React, { createContext, useState, useContext } from 'react';

//creating a context for login check and exporting it
export const AuthContext = createContext();

//this will serve as the AuthContext provider 

// we have to wrap this context in the App.js so that every component in our application can access the states
// defined in it

export function ContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);

  return (
    // passing the state as well as the setter functions 
    <AuthContext.Provider value={{ isAuth, setIsAuth }}> 
      {children}
    </AuthContext.Provider>
  );
}