import { get, onValue, ref as dbRef, remove, update } from 'firebase/database'
import { database } from '../firebase/firebase-config';

// function for follow and unfollow functionality

export async function UpdateUserFollower(currentUserDetail, targetUserDetails, userData) {
    const targetDetails = {
        uid: currentUserDetail.uid,
        name: userData.firstName + ' ' + userData.lastName,
        username: userData.username,
        profileURL: userData.profileURL,
    }
    const currentDetails = {
        uid: targetUserDetails.userId,
        name: targetUserDetails.firstName + ' ' + targetUserDetails.lastName,
        username: targetUserDetails.username,
        profileURL: targetUserDetails.profileURL,
    }
    return Promise.all([
        //Update Target User Data
        get(dbRef(database, 'users/' + targetUserDetails.userId)).then((snapshot) => {
            const userData = snapshot.val();
            if (userData.followers) {
                if (Object.keys(userData.followers).includes(currentUserDetail.uid)) {
                    remove(dbRef(database, 'users/' + targetUserDetails.userId + '/followers/' + currentUserDetail.uid))
                } else {
                    update(dbRef(database, 'users/' + targetUserDetails.userId + '/followers/' + currentUserDetail.uid), targetDetails)
                }
            } else {
                update(dbRef(database, 'users/' + targetUserDetails.userId + '/followers/' + currentUserDetail.uid), targetDetails)
            }
        }),
        //Update Current User Data
        get(dbRef(database, 'users/' + currentUserDetail.uid)).then((snapshot) => {
            const userData = snapshot.val();
            if (userData.following) {
                if (Object.keys(userData.following).includes(targetUserDetails.userId)) {
                    remove(dbRef(database, 'users/' + currentUserDetail.uid + '/following/' + targetUserDetails.userId))
                } else {
                    update(dbRef(database, 'users/' + currentUserDetail.uid + '/following/' + targetUserDetails.userId), currentDetails)
                }
            } else {
                update(dbRef(database, 'users/' + currentUserDetail.uid + '/following/' + targetUserDetails.userId), currentDetails)
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