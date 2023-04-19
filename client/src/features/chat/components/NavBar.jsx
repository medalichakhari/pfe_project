import React, { useContext } from "react";
import { useAuth } from "../../../context/AuthContext";
import Slogan from "../../../assets/svg/Slogan";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="navbar flex items-center bg-blue-500 h-16 px-4 justify-between text-gray-200">
      <div>
        <span className="logo font-bold">Jobyssey Chat</span>
      </div>
      <div className="user flex gap-2 items-center">
        <img
          className="h-6 w-6 rounded-full object-cover"
          src={user.picture}
          alt="User profile"
        />
        <span>{user.name}</span>
      </div>
    </div>
  );
};

export default Navbar;
