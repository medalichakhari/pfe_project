import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import PrimaryButton from "../buttons/primarybutton/PrimaryButton";
import { useTranslation } from "react-i18next";

const Search = ({ jobs, setFilteredJobs }) => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const filterJobs = (job) => {
    return (
      job?.titre?.toLowerCase().includes(keyword.toLowerCase()) ||
      job?.competences?.toLowerCase().includes(keyword.toLowerCase()) ||
      job?.adresse?.toLowerCase().includes(location.toLowerCase())
    );
  };
  const filteredJobs = jobs?.filter(filterJobs);
  const handleSearchJobs = (e) => {
    e.preventDefault();
    setFilteredJobs(filteredJobs);
  };
  const { t } = useTranslation();
  return (
    <form className="flex flex-col items-center my-6">
      <div className="flex flex-col md:flex-row items-center mb-2">
        <div className="relative mb-2 md:mb-0 mx-2 md:mx-2 w-full md:w-auto">
          <input
            type="text"
            placeholder={t("search.keyword")}
            className="bg-white text-gray-800 rounded-full py-2 px-10 pl-10 focus:outline-none focus:shadow-outline w-full md:w-auto"
            onChange={handleKeywordChange}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <FaSearch className="text-gray-500" />
          </div>
        </div>
        <div className="relative mb-2 md:mb-0 mx-2 md:mx-2 w-full md:w-auto">
          <input
            type="text"
            placeholder={t("search.location")}
            className="bg-white text-gray-800 rounded-full py-2 px-10 pl-10 focus:outline-none focus:shadow-outline w-full md:w-auto"
            onChange={handleLocationChange}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <HiOutlineLocationMarker className="text-gray-500" />
          </div>
        </div>
        <PrimaryButton onClick={handleSearchJobs} className="w-full md:w-auto">
          {t("search.search")}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default Search;
