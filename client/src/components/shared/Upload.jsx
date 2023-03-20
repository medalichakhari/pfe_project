import React from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaFileUpload } from "react-icons/fa";
import classNames from "classnames";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "application/pdf",
    maxFiles: 1,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length) {
        setFileError("Invalid file type. Please select a PDF file.");
      } else {
        setSelectedFile(acceptedFiles[0]);
        setFileError(null);
      }
    },
  });
  return (
    <div className="border-dashed border-2 border-gray-400 rounded-lg p-6">
      <div
        {...getRootProps()}
        className={classNames(
          "cursor-pointer",
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
          "p-10",
          "bg-gray-100",
          { "border-blue-500 border-4": isDragActive },
          { "border-red-500 border-4": fileError }
        )}
      >
        <input {...getInputProps()} />
        <FaFileUpload size={50} />
        <p className="mt-4 text-lg font-medium">
          {selectedFile
            ? selectedFile.name
            : "Drag and drop your CV here or click to select a file"}
        </p>
        {fileError && <p className="text-red-500 mt-4">{fileError}</p>}
      </div>
    </div>
  );
}
export default Upload;