import React, { useContext, useState } from "react";
import { HiPhotograph } from "react-icons/hi";
import { IoMdAttach } from "react-icons/io";
import { useAuth } from "../../../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../services/firebaseConfig";
import { v4 as uuid } from "uuid";
import { useStorage } from "../../../context/StorageContext";
import PrimaryButton from "../../../components/buttons/primarybutton";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { user } = useAuth();
  const { uploadFile, downloadUrl } = useStorage();
  const { data } = useContext(ChatContext);
  console.log(data);
  const handleSend = async () => {
    if (img) {
      const path = `chatImages/${data.chatId}/${img.name}`;
      const uploadTask = uploadFile(img, path);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          downloadUrl(path).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: user.user_id,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.user_id,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", user.user_id), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.selectedUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  const handleKeyDown = (e) => {
    e.code === "Enter" && handleSend();
  };

  return (
    <div className="flex justify-between items-center bg-white h-16 px-4">
      <input
        type="text"
        placeholder="Type something..."
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKeyDown}
      />
      <div className="flex items-center space-x-2">
        <IoMdAttach size={22} className="text-primary cursor-pointer" />
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <HiPhotograph size={22} className="text-primary cursor-pointer" />
        </label>
        <PrimaryButton onClick={handleSend}>Send</PrimaryButton>
      </div>
    </div>
  );
};

export default Input;
