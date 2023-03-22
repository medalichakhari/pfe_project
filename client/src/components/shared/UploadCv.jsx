import React, { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'

function UploadCv() {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  }

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center">
          <AiOutlineCloudUpload size={24} />
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
          <p className="text-xs text-gray-500">PDF only (MAX. 5MB)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" accept="application/pdf" onChange={handleFileUpload} />
      </label>
      {file ? (<label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
       ><p className="text-xs text-gray-500">{file.name}</p></label> 
        ) : (null)}
    </div>
  )
}

export default UploadCv;
