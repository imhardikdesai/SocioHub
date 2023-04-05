import { toast } from "react-hot-toast";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, database } from "../firebase/firebase-config";


import { ref as dbRef, push } from 'firebase/database';

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
export async function UploadFileAndGetDownloadUrl(file, currentUser, userDetails) {
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
    } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Post Upload failed')
        throw error;
    }
}