import React, { useContext } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="flex-2">
      <div className="h-16 bg-primary flex items-center justify-between p-4 text-gray-300">
        <span>{data.selectedUser?.displayName}</span>
        <div className="flex gap-4">
          <FiMoreHorizontal size={25} className="cursor-pointer" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
