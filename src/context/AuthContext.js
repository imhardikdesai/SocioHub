import { onAuthStateChanged } from 'firebase/auth';
import { get, ref } from 'firebase/database';
import { useState, useEffect, createContext } from 'react';
import { useSelector } from 'react-redux';
import { auth, database } from '../firebase/firebase-config';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const status = useSelector(state => state.auth.status)
    const [currentUser, setCurrentUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            //For set user object for private routes
            setCurrentUser(user);
            setLoading(false);
            if (!user) {
                setUserDetails(null)
                return
            }

            //For Get Details of user from Firebase
            const userId = user.uid;
            const userRef = ref(database, 'users/' + userId);
            get(userRef).then((snapshot) => {
                const userData = snapshot.val();
                setUserDetails(userData);
            });
        });
    }, [status]);


    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, setUserDetails, userDetails, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

