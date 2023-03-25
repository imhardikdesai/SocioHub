import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect, createContext } from 'react';
import { auth } from '../config/firbase-config';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

    }, []);


    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

