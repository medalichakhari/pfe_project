import React, { useRef, useState } from "react";

const Autocomplete = ({ suggestions, qualifications, setQualifications }) => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const onChange = (e) => {
    const qualifications = e.currentTarget.value;
    setQualifications(qualifications);
    const lastChar = qualifications.charAt(qualifications.length - 1);
    const commaIndex = qualifications.lastIndexOf(",");
    const lastSkill =
      commaIndex > -1
        ? qualifications.substr(commaIndex + 1).trim()
        : qualifications.trim();
    let filteredSuggestions = [];

    if (lastChar === "," || lastSkill === "") {
      setShowSuggestions(false);
    } else {
      filteredSuggestions = suggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(lastSkill.toLowerCase()) > -1
      );
      setActiveSuggestion(0);
      setFilteredSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    }
  };

  const inputRef = useRef(null);

  const onClick = (e) => {
    const clickedSuggestion = e.currentTarget.innerText;
    const newInputValue = qualifications.replace(
      /[^,]*$/,
      clickedSuggestion + ","
    );
    setQualifications(newInputValue);
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    inputRef.current.focus();
  };

  const onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = suggestions;
    if (e.keyCode === 13) {
      e.preventDefault();
      const selectedSuggestion = filteredSuggestions[activeSuggestion];
      if (selectedSuggestion) {
        const newInputValue = qualifications.replace(
          /[^,]*$/,
          selectedSuggestion + ","
        );
        setQualifications(newInputValue);
      }
      setActiveSuggestion(0);
      setShowSuggestions(false);
    } else if (e.keyCode === 38) {
      e.preventDefault();
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.keyCode === 40) {
      e.preventDefault();
      if (activeSuggestion + 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  let suggestionsListComponent;

  if (showSuggestions && qualifications) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-lg">
          {filteredSuggestions.map((suggestion, index) => {
            let className;

            if (index === activeSuggestion) {
              className = "bg-gray-200";
            }

            return (
              <li
                className={`px-2 py-1 hover:bg-gray-200 cursor-pointer ${className}`}
                key={suggestion}
                onClick={onClick}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-lg">
          <div className="px-2 py-1 text-gray-500">
            No suggestions available
          </div>
        </div>
      );
    }
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={qualifications}
        placeholder="Type a skill"
      />
      {suggestionsListComponent}
    </div>
  );
};

export default Autocomplete;
