import { equalTo, get, orderByChild, query, ref as dbRef, remove, update } from 'firebase/database';
import { toast } from 'react-hot-toast';
import { database } from '../firebase/firebase-config';


// Delete User in Database
export const deleteUserWithUsername = async (username) => {

    const usersRef = query(
        dbRef(database, "users"),
        orderByChild("username"),
        equalTo(username)
    );
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
        const user = snapshot.val();
        const uid = Object.keys(user)[0]
        const userRef = dbRef(database, `users/${uid}`);
        try {
            await remove(userRef);
            toast.success("User Deleted Successfully!!")
        } catch (error) {
            console.log(error.message)
        }
    }

}
export const updateUser = async (userData, username) => {

    const { firstName,
        lastName,
        bio,
        occupation,
        country,
        state,
        city } = userData
    try {
        const usersRef = query(
            dbRef(database, "users"),
            orderByChild("username"),
            equalTo(username)
        );
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
            const user = snapshot.val();
            const uid = Object.keys(user)[0]
            await update(dbRef(database, "users/" + uid), {
                firstName,
                lastName,
                bio,
                occupation,
                country,
                state,
                city,
            });
            toast.success('Profile Updated Successflly !!!')
        }

    } catch (error) {
        console.error('Failed to update Profile', error);
        toast.error('Failed to update Profile')
        throw error;
    }
}
