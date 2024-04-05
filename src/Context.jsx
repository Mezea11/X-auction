import { createContext } from "react";
import { useState } from "react";
export const Context = createContext();
export function ContextProvider({ children }) {
  const [LoggedIn, setLoggedIn] = useState(false);

  //obs! exempelfunktioner vi skrev bara för att testa funktionalitet
  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    setLoggedIn(false);
  };

  //obs! denna blev inte riktigt klar men vi har tagit den från riktiga login
  function handleSubmit(e) {
    e.preventDefault(); //stop page reload
    setLoggedIn(true);

    const formData = {
      email: email,
      password: password,
    };

    console.log(LoggedIn, formData);
  }

  return (
    <Context.Provider
      value={{
        LoggedIn,
        logIn,
        logOut,
        handleSubmit,
      }}
    >
      {children}
    </Context.Provider>
  );
}
