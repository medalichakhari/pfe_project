import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useStorage } from "../../context/StorageContext";
import { updateProfile } from "firebase/auth";
import { db } from "../../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { CreateUser } from "../../lib/fetch";
import UploadImage from "../shared/UploadImage";
import PrimaryButton from "../buttons/primarybutton";
import Radio from "../inputs/Radio";
import { useToast } from "@chakra-ui/react";

const UserForm = () => {
  const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];
  const [selectedValue, setSelectedValue] = useState("");
  const [image, setImage] = useState("");
  const { currentUser, user, token } = useAuth();
  const { uploadFile, downloadUrl } = useStorage();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const toast = useToast();
  console.log("navigate to", from)
  const handleCreateUser = async (values, actions) => {
    let userData = {
      id: user.user_id,
      nom: values.fName,
      prenom: values.lName,
      email: user.email,
      dNaissance: values.birthDate,
      telephone: values.phoneNumber,
      adresse: values.address,
      genre: selectedValue,
    };
    try {
      await CreateUser(userData, token);

      const { fName, lName } = values;
      const { user_id, email } = user;
      const path = `profileImages/${user_id}/${image.name}`;

      await uploadFile(image, path);

      const downloadURL = await downloadUrl(path);

      await Promise.all([
        updateProfile(currentUser, {
          displayName: `${fName} ${lName}`,
          photoURL: downloadURL,
        }),
        setDoc(doc(db, "users", user_id), {
          uid: user_id,
          displayName: `${fName} ${lName}`,
          email,
          photoURL: downloadURL,
        }),
        setDoc(doc(db, "userChats", user_id), {}),
      ]);
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
  });
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form onSubmit={handleSubmit}>
          <h4 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">
            Personal Info:
          </h4>
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Avatar: <span className="text-sm text-gray-400">(optional)</span>
          </label>
          <UploadImage image={image} setImage={setImage} />
          <div className="flex flex-col-2">
            <div className="mr-2">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                First Name:
              </label>
              <input
                value={values.fName}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                name="fName"
                id="fName"
                placeholder="Last Name"
                className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Last Name:
              </label>
              <input
                value={values.lName}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                name="lName"
                id="lName"
                placeholder="Last Name"
                className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              BirthDate:
            </label>
            <input
              value={values.birthDate}
              onChange={handleChange}
              onBlur={handleBlur}
              type="date"
              name="birthDate"
              id="birthDate"
              placeholder="BirthDate"
              className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Gender:
            </label>
            <div className="flex items-center">
              <Radio
                name="gender"
                options={options}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Phone Number:
            </label>
            <input
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone number with country code"
              className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Address:
            </label>
            <input
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="address"
              id="address"
              placeholder="Address with country code"
              className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <PrimaryButton className="w-full" type="submit">
            Create an account
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
