import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export const getUnreadMessageCount = async (userId) => {
  try {
    const q = query(
      collection(db, "userChats", userId, "messages"),  // Add "messages" as the subcollection name
      where("isRead", "==", false)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Error retrieving unread message count:", error);
    return 0;
  }
};
