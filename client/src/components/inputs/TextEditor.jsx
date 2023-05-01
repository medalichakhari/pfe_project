import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";

const TextEditor = ({ value, setValue }) => {
  const handleEditorChange = (v) => {
    setValue(v);
  };
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={handleEditorChange}
      className=" bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-blue-500 block w-full h-full p-2.5 dark:bg-gray-600 dark:text-white"
    />
  );
};

export default TextEditor;
