import React, { useState } from "react";
import { useFormik } from "formik";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import UploadImage from "../shared/UploadImage";

const CandidatForm = () => {
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
      grade: "" ,
      skills: "",
    },
  });

  return (
    <div>
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
          Skills
        </label>
        <textarea
          value={values.skills}
          onChange={handleChange}
          onBlur={handleBlur}
          type="textarea"
          name="skills"
          id="skills"
          placeholder="Your skills"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        
/>
      </div>
    </div>
  );
};

export default CandidatForm;
