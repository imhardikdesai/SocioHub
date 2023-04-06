import { onAuthStateChanged } from 'firebase/auth';
import { get, ref } from 'firebase/database';
import { useState, useEffect, createContext } from 'react';
import { auth, database } from '../firebase/firebase-config';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            //For set user object for private routes
            setCurrentUser(user);
            setLoading(false);

            //For Get Details of user from Firebase
            const userId = user.uid;
            const userRef = ref(database, 'users/' + userId);
            get(userRef).then((snapshot) => {
                const userData = snapshot.val();
                setUserDetails(userData);
            });
        });
    });


    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, userDetails, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

