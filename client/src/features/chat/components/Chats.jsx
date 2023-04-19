import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../../../services/firebaseConfig";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { user } = useAuth();
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.user_id), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    user.user_id && getChats();
  }, [user.user_id]);

  const handleSelect = (u) => {
    console.log("woha: ", u);
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="p-4 flex items-center gap-4 text-white cursor-pointer hover:bg-secondary"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img
              src={chat[1]?.userInfo?.photoURL}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <span className="text-lg font-medium">
                {chat[1]?.userInfo?.displayName}
              </span>
              <p className="text-sm text-gray-300">
                {chat[1]?.lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
