import { createContext, useReducer } from "react";
import { useAuth } from "../../../context/AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { user } = useAuth();
  const INITIAL_STATE = {
    chatId: "null",
    selectedUser: {},
  };
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          selectedUser: action.payload,
          
          chatId:
            user.user_id > action.payload?.uid
              ? user.user_id + action.payload?.uid
              : action.payload?.uid + user.user_id,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
