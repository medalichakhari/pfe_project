import React from "react";
import {
  BsFillPersonFill,
  BsCameraFill,
  BsFillTrashFill,
} from "react-icons/bs";

const UploadImage = ({ image, setImage }) => {
  const handleDelete = () => {
    setImage("");
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <div className="relative">
      {image ? (
        <div className="relative w-24 h-24">
          <img
            className="w-24 h-24 rounded-full object-cover font-light"
            src={URL.createObjectURL(image)}
            alt="image"
          />
          <button
            onClick={handleDelete}
            className="absolute inset-0 w-full h-full flex justify-center items-center"
          >
            <BsFillTrashFill
              color="darkGray"
              className="cursor-pointer"
              size={24}
            />
          </button>
        </div>
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-300 flex justify-center items-center">
          <label htmlFor="avatar-input">
            <input
              onChange={handleUpload}
              type="file"
              id="avatar-input"
              className="hidden"
            />
            <div className="flex justify-content">
              <BsFillPersonFill color="darkGray" size={24} />
              <BsCameraFill
                color="darkGray"
                className="cursor-pointer"
                size={24}
              />
            </div>
          </label>
        </div>
      )}
    </div>
  );
};
export default UploadImage;
