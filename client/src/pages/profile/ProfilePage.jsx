import React from "react";
import Profile from "./profile";
import { useUser } from "../../context/UserContext";

function ProfilePage() {
  const { userInfo } = useUser();
  console.log("userInfo", userInfo);
  return (
    <div className="ProfilePage">
      <Profile userInfo={userInfo}/>
    </div>
  );
}

export default ProfilePage;
