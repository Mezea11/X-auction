//reviewed

import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext.jsx';

export default function ProtectedRoute({ children }) {
    const { user, isLoading } = useContext(GlobalContext);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
}
