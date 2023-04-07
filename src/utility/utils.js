import { toast } from "react-hot-toast";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, database } from "../firebase/firebase-config";
import { ref as dbRef, equalTo, get, orderByChild, push, query, update, onValue } from 'firebase/database';
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// For Showing Relevant Messages 
export const showRelevantErrorMessage = (error) => {
    switch (error.code) {
        case 'auth/invalid-email':
            toast.error('The provided email is not valid')
            break;
        case 'auth/email-already-in-use':
            toast.error('The email provided already exists')
            break;
        case 'auth/weak-password':
            toast.error('The password provided is too weak.')
            break;
        case 'auth/user-not-found':
            toast.error("User not found. Please check your credentials and try again.")
            break;
        case 'auth/wrong-password':
            toast.error('The provided password is incorrect')
            break;
        case 'auth/user-disabled':
            toast.error("The user's account has been disabled or deleted")
            break;
        case 'auth/invalid-api-key':
            toast.error('Invalid API key.');
            break;
        case 'auth/network-request-failed':
            toast.error('A network error occurred. Please try again later.');
            break;
        case 'auth/user-token-expired':
            toast.error('Your session has expired. Please log in again.');
            break;
        case 'auth/invalid-user-token':
            toast.error('Invalid user token. Please log in again.');
            break;
        default:
            toast.error("Something went wrong")
    }
}

// Define the function that uploads the file and returns a download URL
export async function UploadFileAndGetDownloadUrl(file, currentUser, setLoading) {
    const { postImage, title, description } = file
    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, `post_images/${currentUser.uid}/${postImage.name.replace(/\./g, "-")}`);

    try {
        await uploadBytes(storageRef, postImage);
        const downloadUrl = await getDownloadURL(storageRef);
        const postsRef = dbRef(database, `users/${currentUser.uid}/posts`);
        const postId = new Date().getTime();
        await push(postsRef, {
            postId,
            title,
            description,
            url: downloadUrl
        });
        toast.success('Post Uploaded Successflly !!!')
        setLoading(false)
    } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Post Upload failed')
        setLoading(false)
        throw error;
    }
}

// Define the function that update User existing Profile
export async function UpdateProfileWithData(values, currentUser, setLoading, setisEditProfile) {
    const { firstName, lastName, bio, occupation, profileFile } = values
    try {
        if (profileFile) {
            const profilePicRef = ref(storage, `profile_pics/${currentUser.uid}/${profileFile.name.replace(/\./g, "-")}`);
            await uploadBytes(profilePicRef, profileFile);
            const downloadUrl = await getDownloadURL(profilePicRef);
            await update(dbRef(database, "users/" + currentUser.uid), {
                firstName,
                lastName,
                bio,
                occupation,
                profileURL: downloadUrl,
            });
            toast.success('Profile Updated Successflly !!!')
            setLoading(false)
            setisEditProfile(prev => !prev)
        } else {
            await update(dbRef(database, "users/" + currentUser.uid), {
                firstName,
                lastName,
                bio,
                occupation,
            });
            toast.success('Profile Updated Successflly !!!')
            setLoading(false)
            setisEditProfile(prev => !prev)
        }
    } catch (error) {
        console.error('Failed to update Profile', error);
        toast.error('Failed to update Profile')
        setLoading(false)
        throw error;
    }
}

// Define the function that get user details from URL params
export async function UserDetailsFromURL(username) {

    try {
        const usersRef = query(
            dbRef(database, "users"),
            orderByChild("username"),
            equalTo(username)
        );
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
            const users = snapshot.val();
            const userId = Object.keys(users)[0]
            const { firstName, lastName, email, occupation, followers, following, bio, city, country, state, profileURL, coverURL, username, posts } = Object.values(users)[0];
            const user = {
                userId, firstName, lastName, email, occupation, followers, following, bio, city, country, state, profileURL, coverURL, username, posts
            }
            return user;
        }
    } catch (error) {
        // console.log(error.message)
    }
}

// Define the function that update User Followers and Following
// export async function UpdateUserFollower(currentUserDetail, targetUserDetails) {
//     // const { userDetails } = useContext(AuthContext)
//     // UserDetailsFromURL(targetUserDetails.username).then(user => {
//     //     update(dbRef(database, 'users/' + user.userId), {
//     //         followers: targetUserDetails.followers
//     //     });
//     // })
//     // update(dbRef(database, 'users/' + currentUserDetail.userId), {
//     //     // followers: targetUserDetails.followers
//     //     following: userDetails.following + 1
//     // });
// }

export async function GetAllUserList() {
    return new Promise((resolve) => {
        const starCountRef = dbRef(database, 'users');
        onValue(starCountRef, (snapshot) => {
            const users = snapshot.val();

            // if (!users) {
            //     resolve([]);
            // } else {
            //     const userList = Object.values(users);
            //     resolve(userList);
            // }
            resolve(users)
        });
    });
}