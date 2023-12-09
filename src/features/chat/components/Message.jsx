import React, { useContext, useEffect, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import moment from "moment";

const Message = ({ message }) => {
  const { user } = useAuth();
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div
      ref={ref}
      className={`flex gap-20 mb-15 ${
        message.senderId === user.user_id && "flex-row-reverse"
      }`}
    >
      <div className="flex flex-col text-gray-500 font-light messageInfo">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={
            message.senderId === user.user_id
              ? user.picture
              : data.selectedUser.photoURL
          }
          alt=""
        />
        <span className="text-sm">
          {moment(message.date.seconds * 1000).fromNow()}
        </span>
      </div>
      <div className="flex flex-col max-w-80 messageContent gap-4">
        <p
          className={`px-4 py-2 max-w-max rounded-lg ${
            message.senderId === user.user_id
              ? "bg-primary text-white"
              : "bg-white"
          }`}
        >
          {message.text}
        </p>
        {message.img && <img className="w-1/2" src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
