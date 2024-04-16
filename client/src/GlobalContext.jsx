import { createContext, useEffect, useState } from 'react';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            setIsLoading(true);
            const response = await fetch('/api/login');

            if (response.status === 200) {
                const result = await response.json();
                setUser(result);
            } else {
                setUser(null);
            }
            setIsLoading(false);
        };

        getUser();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                user,
                setUser,
                isLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalProvider };
