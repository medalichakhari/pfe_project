import React, { useState } from "react";
import UserForm from "../../components/userform/UserForm";
import { useAuth } from "../../context/AuthContext";
import { useStorage } from "../../context/StorageContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { CreateUser } from "../../lib/fetch";
import { useFormik } from "formik";
import PrimaryButton from "../../components/buttons/primarybutton/PrimaryButton";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { useTranslation } from "react-i18next";
import { userSchema } from "../../utils/validationSchemas";

const UserAccount = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [image, setImage] = useState("");
  const { currentUser, user, token, refreshUser } = useAuth();
  const { uploadFile, downloadUrl } = useStorage();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const toast = useToast();
  const handleCreateUser = async (values, actions) => {
    try {
      setIsLoading(true);
      const { fName, lName } = values;
      const { user_id, email } = user;
      let downloadURL = "";
      if (image) {
        const path = `profileImages/${user_id}/${image.name}`;
        await uploadFile(image, path);
        downloadURL = await downloadUrl(path);
      }
      await Promise.all([
        // updateProfile(currentUser, {
        //   displayName: `${fName} ${lName}`,
        //   ...(downloadURL && { photoURL: downloadURL }),
        // }),
        setDoc(doc(db, "users", user_id), {
          uid: user_id,
          displayName: `${fName} ${lName}`,
          email,
          ...(downloadURL && { photoURL: downloadURL }),
        }),
        setDoc(doc(db, "userChats", user_id), {}),
      ]);
      let userData = {
        id: user.user_id,
        ...(downloadURL ? { photo: downloadURL } : {photo: user?.picture}),
        nom: values.fName,
        prenom: values.lName,
        email: user.email,
        dNaissance: values.birthDate,
        telephone: values.phoneNumber,
        adresse: values.address,
        genre: selectedValue,
      };
      await CreateUser(userData, token);
      await refreshUser();
      setIsLoading(false);
      navigate(from, { replace: true });
      toast({
        description: "User created.",
        position: "bottom-left",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        description: err.message,
        position: "bottom-left",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(err);
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      birthDate: "",
      gender: "",
      phoneNumber: "",
      address: "",
    },
    onSubmit: handleCreateUser,
    validationSchema: userSchema,
  });
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form onSubmit={handleSubmit}>
          <UserForm
            image={image}
            setImage={setImage}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
          />
          <PrimaryButton className="w-full" type="submit" isLoading={isLoading}>
            {t("createAccount")}
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default UserAccount;
