import React, { useContext, useEffect, useState } from "react";
import ProfileView from "../../components/profile/ProfileView";
import EditUserProfile from "../../components/profile/EditUserProfile";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { UserDetailsFromURL } from "../../utility/utils";
import { InfinitySpin } from "react-loader-spinner";
import UserNotFound from "../../components/common/UserNotFound";

const Profile = () => {
  const [isEditProfile, setisEditProfile] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { userDetails } = useContext(AuthContext);
  const [publicUser, setPublicUser] = useState(null);
  const { username } = useParams();
  useEffect(() => {
    UserDetailsFromURL(username)
      .then((user) => {
        setPublicUser(user);
        console.log(user);
        if (!user) {
          setNotFound(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);
  return (
    <>
      {!username ? (
        // if paramter have not username then show my profile
        isEditProfile ? (
          <ProfileView
            userDetails={userDetails}
            setisEditProfile={setisEditProfile}
          />
        ) : (
          <EditUserProfile setisEditProfile={setisEditProfile} />
        )
      ) : // if paramter have username then that user profile
      publicUser ? (
        <ProfileView
          isPublic={true}
          userDetails={publicUser}
          setisEditProfile={setisEditProfile}
        />
      ) : !notFound ? (
        <div className="d-flex justify-content-center">
          <InfinitySpin width="200" color="#3182CE" />
        </div>
      ) : (
        <UserNotFound />
      )}
    </>
  );
};

export default Profile;
