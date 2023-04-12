import { useContext } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PrivateAdmin() {
    const { isAdmin } = useContext(AuthContext)
    if (isAdmin === null) {
        return (
            <div className='flex'>
                <InfinitySpin width="200" color="#3182CE" />
            </div>
        )
    }
    return isAdmin ? (
        <Outlet />
    ) : (
        <Navigate to="/posts" replace />
    );
}

export default PrivateAdmin