import { createContext } from 'react';
import { useState } from 'react';
export const Context = createContext();
export function ContextProvider({ children }) {
    const [LoggedIn, setLoggedIn] = useState(false);

    const logIn = () => {
        setLoggedIn(true);
    };

    const logOut = () => {
        setLoggedIn(false);
    };

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
