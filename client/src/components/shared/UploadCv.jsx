import React from "react";
import { FiUpload } from "react-icons/fi";

const UploadCv = ({ selectedFile, setSelectedFile }) => {
  function handleFileChange(event) {
    const uploadedFile = event.target.files[0];
    setSelectedFile(uploadedFile);
  }
  return (
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col items-center justify-center mb-2 w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        {selectedFile ? (
          <p className="text-gray-500 font-bold">{selectedFile.name}</p>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <FiUpload size={24} className="text-gray-500" />
            <p className="text-sm text-gray-500 font-semibold">
              Click to upload
            </p>
            <p className="text-xs text-gray-500">PDF only (MAX. 5MB)</p>
          </div>
        )}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default UploadCv;
