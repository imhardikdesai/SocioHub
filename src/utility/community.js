import { get, onValue, ref as dbRef, remove, update } from 'firebase/database'
import { database } from '../firebase/firebase-config';

// function for follow and unfollow functionality

export async function UpdateUserFollower(currentPostDetails, targetPostDetails, userData) {
    const targetDetails = {
        uid: currentPostDetails.uid,
        name: userData.firstName + ' ' + userData.lastName,
        username: userData.username,
        profileURL: userData.profileURL,
    }
    const currentDetails = {
        uid: targetPostDetails.userId,
        name: targetPostDetails.firstName + ' ' + targetPostDetails.lastName,
        username: targetPostDetails.username,
        profileURL: targetPostDetails.profileURL,
    }
    return Promise.all([
        //Update Target User Data
        get(dbRef(database, 'users/' + targetPostDetails.userId)).then((snapshot) => {
            const userData = snapshot.val();
            if (userData.followers) {
                if (Object.keys(userData.followers).includes(currentPostDetails.uid)) {
                    remove(dbRef(database, 'users/' + targetPostDetails.userId + '/followers/' + currentPostDetails.uid))
                } else {
                    update(dbRef(database, 'users/' + targetPostDetails.userId + '/followers/' + currentPostDetails.uid), targetDetails)
                }
            } else {
                update(dbRef(database, 'users/' + targetPostDetails.userId + '/followers/' + currentPostDetails.uid), targetDetails)
            }
        }),
        //Update Current User Data
        get(dbRef(database, 'users/' + currentPostDetails.uid)).then((snapshot) => {
            const userData = snapshot.val();
            if (userData.following) {
                if (Object.keys(userData.following).includes(targetPostDetails.userId)) {
                    remove(dbRef(database, 'users/' + currentPostDetails.uid + '/following/' + targetPostDetails.userId))
                } else {
                    update(dbRef(database, 'users/' + currentPostDetails.uid + '/following/' + targetPostDetails.userId), currentDetails)
                }
            } else {
                update(dbRef(database, 'users/' + currentPostDetails.uid + '/following/' + targetPostDetails.userId), currentDetails)
            }
        })
    ])
}

// function for get follower and following numbers

export const GetFollowerAndFollowingNumbers = async (uid) => {
    return new Promise((resolve) => {
        const starCountRef = dbRef(database, 'users/' + uid);
        onValue(starCountRef, (snapshot) => {
            const users = snapshot.val();
            resolve(users)
        })
    });
}


export async function UpdateLikeAndDislike(currentPostDetails, targetPostDetails, userData) {
    const targetDetails = {
        uid: currentPostDetails.uid,
        name: userData.firstName + ' ' + userData.lastName,
        username: userData.username,
        profileURL: userData.profileURL,
    }
    const currentDetails = {
        uid: targetPostDetails.userId,
        name: targetPostDetails.firstName + ' ' + targetPostDetails.lastName,
        username: targetPostDetails.username,
        profileURL: targetPostDetails.profileURL,
    }
    return Promise.all([
        //Update Target User Data
        get(dbRef(database, 'users/' + targetPostDetails.userId)).then((snapshot) => {
            const userData = snapshot.val();
            if (userData.followers) {
                if (Object.keys(userData.followers).includes(currentPostDetails.uid)) {
                    remove(dbRef(database, 'users/' + targetPostDetails.userId + '/followers/' + currentPostDetails.uid))
                } else {
                    update(dbRef(database, 'users/' + targetPostDetails.userId + '/followers/' + currentPostDetails.uid), targetDetails)
                }
            } else {
                update(dbRef(database, 'users/' + targetPostDetails.userId + '/followers/' + currentPostDetails.uid), targetDetails)
            }
        }),
        //Update Current User Data
        get(dbRef(database, 'users/' + currentPostDetails.uid)).then((snapshot) => {
            const userData = snapshot.val();
            if (userData.following) {
                if (Object.keys(userData.following).includes(targetPostDetails.userId)) {
                    remove(dbRef(database, 'users/' + currentPostDetails.uid + '/following/' + targetPostDetails.userId))
                } else {
                    update(dbRef(database, 'users/' + currentPostDetails.uid + '/following/' + targetPostDetails.userId), currentDetails)
                }
            } else {
                update(dbRef(database, 'users/' + currentPostDetails.uid + '/following/' + targetPostDetails.userId), currentDetails)
            }
        })
    ])
}