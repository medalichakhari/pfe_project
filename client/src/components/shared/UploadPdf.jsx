import { useState } from "react";

function UploadPDF() {
  const [selectedFile, setSelectedFile] = useState(null);


  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setError("");
    } else {
      setSelectedFile(null);
      setError("Please select a valid PDF file");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (selectedFile) {
      // Handle file upload logic here
      console.log("Uploading file: ", selectedFile);
      setSelectedFile(null);
    } else {
      setError("Please select a PDF file to upload");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label htmlFor="pdf-file" className="font-medium">
        Upload PDF file:
      </label>
      <input
        type="file"
        id="pdf-file"
        onChange={handleFileChange}
        accept=".pdf"
        className="border rounded-lg py-2 px-3"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-lg py-2 px-3 hover:bg-blue-600"
      >
        Upload
      </button>
    </form>
  );
}

export default UploadPDF;