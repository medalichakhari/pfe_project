import React from "react";
import Layout from "@/layout/Layout";
import Sidebar from "../../features/chat/components/Sidebar";
import Chat from "../../features/chat/components/Chat";

const ChatSystem = () => {
  return (
<Layout>
      <div className="flex flex-wrap ">
        <div className=" w-full md:w-1/3">
          <Sidebar />
        </div>
        <div className="w-full md:w-2/3">
          <Chat />
        </div>
      </div>
</Layout>
  );
};

export default ChatSystem;
