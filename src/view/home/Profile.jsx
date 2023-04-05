import React, { useState } from "react";
import ProfileView from "../../components/profile/ProfileView";
import EditUserProfile from "../../components/profile/EditUserProfile";

const Profile = () => {
  const [isEditProfile, setisEditProfile] = useState(true);

  return (
    <>
      {isEditProfile ? (
        <ProfileView setisEditProfile={setisEditProfile} />
      ) : (
        <EditUserProfile setisEditProfile={setisEditProfile} />
      )}
    </>
  );
};

export default Profile;
