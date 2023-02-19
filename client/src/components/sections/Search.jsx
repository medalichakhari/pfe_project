import React from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import PrimaryButton from "../buttons/PrimaryButton";

const Search = () => {
  return (
    <form className="flex flex-col items-center mb-8">
      <div className="flex items-center mb-2">
        <div className="relative mr-2">
          <input
            type="text"
            placeholder="Job title, Skills, company ..."
            className="bg-white text-gray-800 rounded-full py-2 px-10 pl-10 focus:outline-none focus:shadow-outline w-full"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <FaSearch className="text-gray-500" />
          </div>
        </div>
        <div className="relative mr-2">
          <input
            type="text"
            placeholder="Location"
            className="bg-white text-gray-800 rounded-full py-2 px-10 pl-10 focus:outline-none focus:shadow-outline w-full"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <HiOutlineLocationMarker className="text-gray-500" />
          </div>
        </div>
        <PrimaryButton>Search</PrimaryButton>
      </div>
    </form>
  );
};

export default Search;
