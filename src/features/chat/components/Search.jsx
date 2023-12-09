import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../services/firebaseConfig";
import { useAuth } from "../../../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [err, setErr] = useState(false);

  const { user } = useAuth();

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", ">=", username),
      where("displayName", "<=", username + "\uf8ff")
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setSearchedUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      user.user_id > searchedUser.uid
        ? user.user_id + searchedUser.uid
        : searchedUser.uid + user.user_id;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", user.user_id), {
          [combinedId + ".userInfo"]: {
            uid: searchedUser.uid,
            displayName: searchedUser.displayName,
            photoURL: searchedUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", searchedUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.user_id,
            displayName: user.name,
            photoURL: user.picture,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setSearchedUser(null);
    setUsername("");
  };

  return (
    <div className="search border-b border-gray-400">
      <div className="p-2">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="bg-transparent border-none text-white outline-none placeholder-lightgray w-full"
        />
      </div>
      {err && <span className="text-red-500">User not found!</span>}
      {searchedUser && (
        <div
          className="p-2 flex items-center gap-2 text-white cursor-pointer hover:bg-gray-800"
          onClick={handleSelect}
        >
          <img
            src={searchedUser.photoURL}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="userChatInfo">
            <span className="text-lg font-medium">
              {searchedUser.displayName}
            </span>
            <p className="text-sm text-lightgray">{searchedUser.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
