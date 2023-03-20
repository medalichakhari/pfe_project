import React, { useState } from "react";
import { useFormik } from "formik";
import { useAuth } from "../../context/AuthContext";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import UploadImage from "../shared/UploadImage";
import PrimaryButton from "../buttons/primarybutton";
import { CreateUser } from "../../lib/fetch";

const UserForm = () => {
  const [image, setImage] = useState("");
  const { token } = useAuth();
  console.log("user", token);
  const handleCreateUser = (values, actions) => {
    let userData = {
      nom: values.fName,
      prenom: values.lName,
      email: "useraminea@email.com",
      dNaissance: values.birthDate,
      telephone: values.phoneNumber,
      adresse: values.address,
      photo: image,
      genre: values.gender,
    };
    console.log(image);
    CreateUser(userData, token)
      .then((res) => {
        console.log("res", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
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
          <FormControl className="mb-1">
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              Gender:
            </label>
            <RadioGroup
              row
              name="gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
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
              placeholder="Phone number with country code"
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
