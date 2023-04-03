import { createContext, useContext } from "react";
import { storage } from "../services/firebaseConfig";

export const StorageContext = createContext();
export const useStorage = () => useContext(StorageContext);

export const StorageContextProvider = ({ children }) => {
  const uploadFile = (file, path) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(path);
    const uploadFile = fileRef.put(file);
    return uploadFile;
  };

  const downloadUrl = (path) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(path);
    return fileRef.getDownloadURL();
  };

  return (
    <StorageContext.Provider
      value={{
        uploadFile,
        downloadUrl,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};