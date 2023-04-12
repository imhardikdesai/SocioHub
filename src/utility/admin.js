import { equalTo, get, orderByChild, query, ref as dbRef, remove } from 'firebase/database';
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