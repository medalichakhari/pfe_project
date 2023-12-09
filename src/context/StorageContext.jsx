import { createContext, useContext } from "react";
import { storage } from "../services/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const StorageContext = createContext();
export const useStorage = () => useContext(StorageContext);

export const StorageContextProvider = ({ children }) => {
  const uploadFile = (file, path) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return uploadTask;
  };

  const downloadUrl = async (path) => {
    const storageRef = ref(storage, path);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
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
