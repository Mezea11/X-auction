import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext.jsx';

export default function LogoutButton() {
    const { user, setUser } = useContext(GlobalContext);

    async function logOut() {
        try {
            await fetch('/api/login', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
            //reset user to null
            setUser(null);
        } catch (error) {}
    }

    return (
        <>
            <button type="button" className="btn btn-primary" onClick={logOut}>
                Log out
            </button>
        </>
    );
}
