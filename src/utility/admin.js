import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { equalTo, get, orderByChild, query, ref as dbRef, remove, update } from 'firebase/database';
import { toast } from 'react-hot-toast';
import { auth, database } from '../firebase/firebase-config';
import { updateChanges } from '../redux/actions/authActions';



/**
 * This function deletes a user from a database by their username.
 * @param username - The username of the user that needs to be deleted from the database.
 */
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

/**
 * This is a JavaScript function that updates a user's profile information in a Firebase Realtime
 * Database based on their username.
 * @param userData - An object containing the updated user data, including firstName, lastName, bio,
 * occupation, country, state, and city.
 * @param username - The username of the user whose profile is being updated.
 */
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


/**
 * This function checks if an email exists in the authentication system and displays an error message
 * if it does not.
 * @param email - The email parameter is a string that represents the email address that needs to be
 * checked for existence in the authentication system.
 */
export async function checkIfEmailExists(email, currentUser, navigate, dispatch) {
    fetchSignInMethodsForEmail(auth, email)
        .then((methods) => {
            if (methods.length > 0) {
                try {
                    const usersRef = query(
                        dbRef(database, "users"),
                        orderByChild("email"),
                        equalTo(email)
                    );
                    get(usersRef).then(res => {
                        const userId = Object.keys(res.val())[0]
                        update(dbRef(database, 'users/' + userId), {
                            isAdmin: true
                        })
                        toast.success("Admin Updated Successfully!!")
                    })
                    update(dbRef(database, 'users/' + currentUser.uid), {
                        isAdmin: false
                    }).then(() => {
                        navigate('/login')
                        dispatch(updateChanges())
                    })
                } catch (error) {
                    toast.error("Failed to Update Email")
                    console.log(error.message)
                }

            } else {
                toast.error("Email ID does not exist");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}