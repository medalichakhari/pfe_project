import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import PrimaryButton from "../buttons/primarybutton/PrimaryButton";
import { useTranslation } from "react-i18next";

const Search = ({ allJobs, setFilteredJobs }) => {
  const prevKeyword = useRef("");
  const prevLocation = useRef("");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [keywordSuggestions, setKeywordSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const keywordInputRef = useRef(null);
  const locationInputRef = useRef(null);

  const handleKeywordChange = (e) => {
    const value = e.target.value;
    prevKeyword.current = keyword;
    setKeyword(value);
    if (value !== prevKeyword.current) {
      setKeywordSuggestions(getKeywordSuggestions(value, allJobs));
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    prevLocation.current = location;
    setLocation(value);
    if (value !== prevLocation.current) {
      setLocationSuggestions(getLocationSuggestions(value, allJobs));
    }
  };

  const getKeywordSuggestions = (value, jobs) => {
    const searchedJobs = jobs.filter(
      (job) =>
        job.titre.toLowerCase().includes(value.toLowerCase()) ||
        job.competences.toLowerCase().includes(value.toLowerCase())
    );
    const suggestions = [...new Set(searchedJobs.map((job) => job.titre))];
    return suggestions.slice(0, 10);
  };

  const getLocationSuggestions = (value, jobs) => {
    const searchedJobs = jobs.filter((job) =>
      job.adresse.toLowerCase().includes(value.toLowerCase())
    );
    const suggestions = [...new Set(searchedJobs.map((job) => job.adresse))];
    return suggestions.slice(0, 10);
  };

  const filterJobs = (job) => {
    return (
      job.titre.toLowerCase().includes(keyword.toLowerCase()) ||
      job.competences.toLowerCase().includes(keyword.toLowerCase()) &&
      job.adresse.toLowerCase().includes(location.toLowerCase())
    );
  };

  const handleSearchJobs = (e) => {
    e.preventDefault();
    const filteredJobs = allJobs.filter(filterJobs);
    setFilteredJobs(filteredJobs);
  };

  const handleKeywordSuggestionClick = (suggestion) => {
    setKeyword(suggestion);
    setKeywordSuggestions([]);
  };

  const handleLocationSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setLocationSuggestions([]);
  };

  const handleClickOutside = (e) => {
    if (
      keywordInputRef.current &&
      !keywordInputRef.current.contains(e.target)
    ) {
      setKeywordSuggestions([]);
    }
    if (
      locationInputRef.current &&
      !locationInputRef.current.contains(e.target)
    ) {
      setLocationSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { t } = useTranslation();

  return (
    <form className="flex flex-col items-center my-6">
      <div className="flex flex-col md:flex-row items-center mb-2">
        <div
          ref={keywordInputRef}
          className="relative mb-2 md:mb-0 mx-2 md:mx-2 w-full md:w-auto"
        >
          <input
            type="text"
            placeholder={t("search.keyword")}
            className="bg-white text-gray-800 rounded-full py-2 px-10 pl-10 focus:outline-none focus:shadow-outline w-full md:w-auto"
            value={keyword}
            onChange={handleKeywordChange}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <FaSearch className="text-gray-500" />
          </div>
          {keywordSuggestions.length > 0 && (
            <ul className="w-full absolute z-10 bg-gray-50 mt-1 py-2 rounded-md shadow-lg">
              {keywordSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                  onClick={() => handleKeywordSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div
          ref={locationInputRef}
          className="relative mb-2 md:mb-0 mx-2 md:mx-2 w-full md:w-auto"
        >
          <input
            type="text"
            placeholder={t("search.location")}
            className="bg-white text-gray-800 rounded-full py-2 px-10 pl-10 focus:outline-none focus:shadow-outline w-full md:w-auto"
            value={location}
            onChange={handleLocationChange}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <HiOutlineLocationMarker className="text-gray-500" />
          </div>
          {locationSuggestions.length > 0 && (
            <ul className="w-full absolute z-10 bg-gray-50 mt-1 py-2 rounded-md shadow-lg">
              {locationSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                  onClick={() => handleLocationSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <PrimaryButton onClick={handleSearchJobs} className="w-full md:w-auto">
          {t("search.search")}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default Search;
