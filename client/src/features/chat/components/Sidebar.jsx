import React from "react";
import Navbar from "./NavBar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full bg-gray-700">
      <Navbar />
      <div className="p-4">
        <Search />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Chats />
      </div>
    </div>
  );
};

export default Sidebar;
