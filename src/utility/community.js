import { get, onValue, ref as dbRef, remove, update } from 'firebase/database'
import { database } from '../firebase/firebase-config';
import { updateChanges } from '../redux/actions/authActions';

// function for follow and unfollow functionality

export async function UpdateUserFollower(currentUserDetail, targetUserDetails, dispatch) {
    const targetDetails = {
        uid: currentUserDetail.uid
    }
    const currentDetails = {
        uid: targetUserDetails.userId
    }

    //Update Target User Data
    get(dbRef(database, 'users/' + targetUserDetails.userId)).then((snapshot) => {
        const userData = snapshot.val();
        if (userData.followers) {
            if (Object.keys(userData.followers).includes(currentUserDetail.uid)) {
                remove(dbRef(database, 'users/' + targetUserDetails.userId + '/followers/' + currentUserDetail.uid)).then(() => {
                    dispatch(updateChanges())
                })
            } else {
                update(dbRef(database, 'users/' + targetUserDetails.userId + '/followers/' + currentUserDetail.uid), targetDetails).then(() => {
                    dispatch(updateChanges())
                })
            }
        } else {
            update(dbRef(database, 'users/' + targetUserDetails.userId + '/followers/' + currentUserDetail.uid), targetDetails).then(() => {
                dispatch(updateChanges())
            })
        }
    }).then(() => {
        dispatch(updateChanges())
    })

    //Update Current User Data
    get(dbRef(database, 'users/' + currentUserDetail.uid)).then((snapshot) => {
        const userData = snapshot.val();
        if (userData.following) {
            if (Object.keys(userData.following).includes(targetUserDetails.userId)) {
                remove(dbRef(database, 'users/' + currentUserDetail.uid + '/following/' + targetUserDetails.userId)).then(() => {
                    dispatch(updateChanges())
                })
            } else {
                update(dbRef(database, 'users/' + currentUserDetail.uid + '/following/' + targetUserDetails.userId), currentDetails).then(() => {
                    dispatch(updateChanges())
                })
            }
        } else {
            update(dbRef(database, 'users/' + currentUserDetail.uid + '/following/' + targetUserDetails.userId), currentDetails).then(() => {
                dispatch(updateChanges())
            })
        }
    }).then(() => {
        dispatch(updateChanges())
    })
}

// function for get follower and following numbers

export const GetFollowerAndFollowingNumbers = async (uid) => {
    return new Promise((resolve) => {
        const starCountRef = dbRef(database, 'users/' + uid);
        onValue(starCountRef, (snapshot) => {
            const users = snapshot.val();
            resolve(users)
        });
    });
}