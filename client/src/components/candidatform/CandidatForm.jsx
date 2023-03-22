import React, { useState } from "react";
import { useFormik } from "formik";
import { useAuth } from "../../context/AuthContext";
import UploadImage from "../shared/UploadImage";


const CandidatForm = ({ values, handleChange, handleBlur, handleSubmit }) => {
  const [image, setImage] = useState("");
  const handleFileUpload = (event) => {
    const file = event.target.files[0];}
  return (
<>
      <h4 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">
        Candidat account:
      </h4>
      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
         Candidat Picture: <span className="text-sm text-gray-400">(optional)</span>
      </label>
      <UploadImage image={image} setImage={setImage} />
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Grade:
        </label>
        <select
          value={values.grade}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="grade"
          id="grade"
          placeholder="Please select your grade"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="">Please select your grade</option>
          <option value="T1">Very early career</option>
          <option value="T2">Early career</option>
          <option value="T3">Seasoned professional</option>
          <option value="T4">Very senior</option>
          <option value="T5">Exceptional</option>
          <option value="T6">Luminary</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Speciality:
        </label>
        <input
          value={values.speciality}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="speciality"
          id="speciality"
          placeholder="Enter your specialities"
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Upload Your Resume:<span className="text-sm text-gray-400">(cv)</span>
        </label>
      <div className="flex items-center justify-center w-full">
  <label
    htmlFor="dropzone-file"
    className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
  >
    <div className="flex flex-col items-center justify-center">
      <svg
        aria-hidden="true"
        className="w-8 h-8 mb-2 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <p className="text-sm text-gray-500">
        <span className="font-semibold">Click to upload</span> or drag and drop
      </p>
      <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
    </div>
    <input id="dropzone-file" type="file" className="hidden" />
  </label>
</div>




</>
  );
};

export default CandidatForm;
