import { update, ref as dbRef } from "@firebase/database";
import { toast } from "react-hot-toast";
import { database } from "../firebase/firebase-config";
import { GetAllUserList } from "./utils";

// Update Location When User Give Access 
export const UpdateUserCurrentLocation = async (location, currentUser) => {
    await update(dbRef(database, "users/" + currentUser.uid), {
        location: {
            lat: location.lat,
            lan: location.lan
        }
    }).then(() => {
        toast.success('Location Updated Successfully')
    })
}

// Get All User Location and Create an Array
export const GetAllUserLocation = async () => {
    return new Promise((resolve) => {
        GetAllUserList().then(userList => {
            const userListArr = Object.values(userList)
            const userIdArr = Object.keys(userList)
            const LocationArr = userListArr.map((item, index) => {
                const uid = userIdArr[index]
                const { username, firstName, lastName,profileURL, occupation, location } = item
                return {
                    'type': 'Feature',
                    'properties': {
                        'message': 'Foo',
                        'iconSize': [60, 60],
                        'userData': {
                            uid,
                            name: firstName + ' ' + lastName,
                            username,
                            occupation,
                            profileURL
                        }
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [location.lan, location.lat]
                    }
                }
            })
            resolve(LocationArr)
        })
    })
}