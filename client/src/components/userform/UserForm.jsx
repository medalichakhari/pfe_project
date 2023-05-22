import React, { useState } from "react";
import UploadImage from "../shared/UploadImage";
import Radio from "../inputs/Radio";
import { useTranslation } from "react-i18next";

const UserForm = ({
  image,
  setImage,
  selectedValue,
  setSelectedValue,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
}) => {
  const { t } = useTranslation();
  const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  return (
    <>
      <h4 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">
        {t("userForm.personalInformation")}
      </h4>
      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {t("userForm.userPicture")}{" "}
        <span className="text-sm text-gray-400">(optional)</span>
      </label>
      <UploadImage image={image} setImage={setImage} />
      <div className="flex flex-col-2">
        <div className="mr-2">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            {t("userForm.firstName")}
          </label>
          <input
            value={values.fName}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="fName"
            id="fName"
            placeholder="Last Name"
            className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
              touched.fName && errors.fName
                ? "focus:ring-red-500 focus:border-red-500 border-red-500"
                : "focus:ring-blue-500 focus:border-blue-500"
            }`}
          />
          {touched.fName && errors.fName && (
            <div className="text-red-500 text-sm">{errors.fName}</div>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            {t("userForm.lastName")}
          </label>
          <input
            value={values.lName}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="lName"
            id="lName"
            placeholder="Last Name"
            className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
              touched.lName && errors.lName
                ? "focus:ring-red-500 focus:border-red-500 border-red-500"
                : "focus:ring-blue-500 focus:border-blue-500"
            }`}
          />
          {touched.lName && errors.lName && (
            <div className="text-red-500 text-sm">{errors.lName}</div>
          )}
        </div>
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          {t("userForm.birthdate")}:
        </label>
        <input
          value={values.birthDate}
          onChange={handleChange}
          onBlur={handleBlur}
          type="date"
          name="birthDate"
          id="birthDate"
          placeholder="BirthDate"
          className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            touched.birthDate && errors.birthDate
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        {touched.birthDate && errors.birthDate && (
          <div className="text-red-500 text-sm">{errors.birthDate}</div>
        )}
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          {t("userForm.gender")}:
        </label>
        <div className="flex items-center">
          <Radio
            name="gender"
            options={options}
            selectedValue={selectedValue || "male"}
            setSelectedValue={setSelectedValue}
          />
        </div>
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          {t("userForm.phoneNumber")}
        </label>
        <input
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Phone number with country code"
          className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            touched.phoneNumber && errors.phoneNumber
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        {touched.phoneNumber && errors.phoneNumber && (
          <div className="text-red-500 text-sm">{errors.phoneNumber}</div>
        )}
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          {t("userForm.address")}
        </label>
        <input
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="address"
          id="address"
          placeholder="Address with country code"
          className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            touched.address && errors.address
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        {touched.address && errors.address && (
          <div className="text-red-500 text-sm">{errors.address}</div>
        )}
      </div>
    </>
  );
};

export default UserForm;
