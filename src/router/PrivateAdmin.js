import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PrivateAdmin() {
    const isAdmin = true
    const { currentUser } = useContext(AuthContext)
    console.log(currentUser)
    return isAdmin ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
}

export default PrivateAdmin