import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../config/firbase-config';

 const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            console.log(user);
        });

    }, []);



    return (
        <AuthContext.Provider value={currentUser}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
  }