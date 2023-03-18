import React, { useState } from "react";
import { useFormik } from "formik";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import UploadImage from "../shared/UploadImage";

const UserForm = () => {
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
      image: "",
      fName: "",
      lName: "",
      birthDate: "",
      gender: "",
      phoneNumber: "",
      grade: "",
      address: "",
    },
  });
  const [image, setImage] = useState(values.image);
  console.log( "image",image)
  return (
    <div>
      <UploadImage image={image} setImage={setImage} />
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          First Name
        </label>
        <input
          value={values.fName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="name"
          id="name"
          placeholder="First Name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Last Name
        </label>
        <input
          value={values.lName}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="lName"
          id="lName"
          placeholder="Last Name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          BirthDate
        </label>
        <input
          value={values.birthDate}
          onChange={handleChange}
          onBlur={handleBlur}
          type="date"
          name="birthDate"
          id="birthDate"
          placeholder="BirthDate"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <FormControl>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          gender
        </label>
        <RadioGroup
          row
          name="gender"
          value={values.gender}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Phone Number
        </label>
        <input
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Phone number with country code"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Grade
        </label>
        <select
          value={values.grade}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="grade"
          id="grade"
          placeholder="Phone number with country code"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="">Please select employment status</option>
          <option value="Student">Student</option>
          <option value="Employed">Employed</option>
          <option value="notEmployed">Not Employed</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Address
        </label>
        <input
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          type="tcext"
          name="address"
          id="address"
          placeholder="Enter your location"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
    </div>
  );
};

export default UserForm;
