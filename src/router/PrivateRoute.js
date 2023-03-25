import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = () => {
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser)

    return currentUser ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
}

export default PrivateRoute
